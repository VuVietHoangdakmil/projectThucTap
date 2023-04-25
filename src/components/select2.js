import $ from "jquery";
import "select2";
import DB from "../database";
import {
  GetTextSelect,
  GetValueSelect,
  getDate,
  getSessionStorage,
  setSessionStorage,
} from "../Functions";

async function Select2Main(root, { type, idSelect, lengthStr, Width }) {
  function Select2(root, type, idSelect) {
    const select2 = document.createElement("select");
    select2.setAttribute("class", idSelect);
    root.appendChild(select2);

    const data = isURL(type) ? loadApi : loadData;
    start(type, data);

    function start(type, load) {
      load(type);
      $(document).ready(function () {
        $(`.${idSelect}`).on("select2:open", function () {
          $(".select2-search__field").focus(function () {
            this.focus();
          });
        });
      });
    }

    function loadApi(type) {
      $(`.${idSelect}`).select2({
        ajax: {
          url: type,
          dataType: "json",
          delay: 250,
          data: function (params) {
            return {
              q: params.term,
              page: params.page || 1,
              limit: 10,
            };
          },
          processResults: function (data, params) {
            console.log(params);

            params.page = params.page || 1;

            const returnData = {
              results: data,
              pagination: {
                more: data.length > 0,
              },
            };

            return returnData;
          },
          cache: true,
        },

        placeholder: "Search for a repository",
        minimumInputLength: 1,
        dropdownCssClass: "CssDropdown",
        allowClear: true,
        width: Width ? "100%" : "auto",
        templateResult: formatRepo,
        templateSelection: formatRepoSelection,
      });
      function formatRepo(repo) {
        console.log(repo);
        if (repo.loading) {
          return repo.text;
        }

        const $container = $(
          `<div class='select2-result-repository__title' >${
            repo.country || repo.text
          }</div>`
        );
        $container
          .find(".select2-result-repository__title")
          .text(repo.country || repo.text);
        return $container;
      }
      function formatRepoSelection(repo) {
        return repo.country || repo.text;
      }
    }

    function loadData(type) {
      $(`.${idSelect}`).select2({
        data: type,
        allowClear: true,
        debug: true,
        width: Width ? "100%" : "auto",
        placeholder: "",
      });
    }

    function isURL(str) {
      const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }

    function ToolTipsF(str, length) {
      if (str.length > length) {
        return str.slice(0, length) + "...";
      }
      return str;
    }

    $(document).ready(function () {
      const domValue = $(`.${idSelect}+.select2`).find(
        ".select2-selection__rendered"
      );
      domValue.text(ToolTipsF(domValue.text(), lengthStr));
      $(`.${idSelect}`).on("change", function () {
        domValue.text(ToolTipsF(domValue.text(), lengthStr));
        console.log(GetValueSelect(`${idSelect}`));
        console.log(GetTextSelect(`${idSelect}`));
      });
    });
  }

  async function startAPI(Select2, api, nameDB) {
    // kiểm tra ListApi
    if (!getSessionStorage("ListApi") || !getSessionStorage("ListApi")[api]) {
      setSessionStorage("ListApi", {
        ...getSessionStorage("ListApi"),
        [api]: { count: 1, nameDB: nameDB },
      });
    } else {
      setSessionStorage("ListApi", {
        ...getSessionStorage("ListApi"),
        [api]: {
          ...getSessionStorage("ListApi")[api],
          count: getSessionStorage("ListApi")[api].count + 1,
        },
      });
    }

    // sessionStorage.removeItem("ListApi");

    const nameDBH = getSessionStorage("ListApi")[api].nameDB;

    const { openRequest, createObjectStore, getAllstore, reloadStore } =
      await DB(nameDBH);

    return new Promise((resolve, reject) => {
      openRequest.onsuccess = async (event) => {
        try {
          // update name db

          const db = event.target.result;
          const res = await getAllstore(db);
          const isDate =
            res.length > 0 || !res ? new Date(res[0].created) : false;

          // add api
          if (res.length <= 0 || !res) {
            resolve(getApi(api, db, "add"));
            Select2(root, api, nameDB);
            // db.close();
            return;
          }

          // update theo datetime
          if (isDate) {
            const timeHT = new Date().getHours();
            const DayHt = getDate(new Date());
            const DayLocal = getDate(isDate);

            const dkDay = new Date(DayHt) > new Date(DayLocal);
            const timelocal = isDate.getHours();

            if (timeHT - timelocal >= 6 || dkDay) {
              resolve(getApi(api, db, "update"));
              Select2(root, api, nameDB);
              // db.close();
              return;
            }
          }

          //update data
          if (getSessionStorage("ListApi")[api].count >= 2) {
            console.log("update data", res);
            const datanew = res.map((item) => {
              return { id: item.id, text: item.country || item.text };
            });
            Select2(root, datanew, nameDB);
            resolve("yes");
            return;
          }

          //  update api
          if (getSessionStorage("ListApi")[api].count < 2) {
            resolve(getApi(api, db, "update"));
            Select2(root, api, nameDB);
            setSessionStorage(nameDB, api);
            // db.close();
            return;
          }

          // khong co dk nao
          const datanew = res.map((item) => {
            return { id: item.id, text: item.country || item.text };
          });
          Select2(root, datanew, nameDB);
          resolve("yes");
        } catch (err) {
          console.log(err);
        }
      };

      const getApi = async (api, db, type) => {
        try {
          const res = await fetch(api);
          const data = await res.json();
          if (type == "add") {
            createObjectStore(db, data);
          } else {
            reloadStore(db, data);
          }
          console.log("callApi");
        } catch (err) {
          console.error(err);
          alert(err);
        }
      };
    });
  }
  return Promise.resolve(startAPI(Select2, type, idSelect));
}

export default Select2Main;
