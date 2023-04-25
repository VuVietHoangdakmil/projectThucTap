import "./CssInput.less";
import $ from "jquery";
function Input(root, type, id, value, length) {
  switch (type) {
    case "text":
      startInput();
      break;
    case "date":
      break;
    case "Select":
      startSingleSelect();
      break;
    default:
      alert("khong co truong hop nao");
      break;
  }

  function startInput() {
    const FormGroup = document.createElement("div");
    const ToolTips = document.createElement("span");
    ToolTips.className = `toolTipsp ${id}`;
    FormGroup.className = "form-group";
    FormGroup.innerHTML = `<input  id="${id}"  value="${value}" />`;
    root.appendChild(FormGroup);

    $(document).ready(() => {
      let valueInput = value;
      const elementInput = $(`#${id}`);
      elementInput.val(ToolTipsF(valueInput, length));
      $(`.${id}`).css({ bottom: `100%` });
      elementInput.focus(function () {
        $(this).val(valueInput);
        $(`.${id}`).remove();
      });
      elementInput.focusout(function () {
        $(this).val(ToolTipsF(valueInput, length));
      });
      elementInput.mousemove(function () {
        
        const element = $(`.${id}`);
        element.show();

        if (element.is(":visible")) {
          const rect = element[0].getBoundingClientRect();
          if (
            rect.top < 0 ||
            rect.left < 0 ||
            rect.bottom > $(window).height() ||
            rect.right > $(window).width()
          ) {
            // bi an
            console.log("bi an");
            const h = element.height();
            const hInput = elementInput.height();
            if (rect.top < 0) {
              element.css({ bottom: `-${(h + hInput)-10}px` });
              return;
            }
            if (rect.left < 0) {
              element.css({ left: `${100}%`, bottom: `-${h / 2}px` });
              return;
            }
            if (rect.bottom > $(window).height()) {
              element.css({ bottom: `100%` });
              return;
            }
            if (rect.right > $(window).height()) {
              element.css({ left: `-${100}%`, bottom: `-${h / 2}px` });
              return;
            }
          }
        }
      });
      elementInput.mouseout(function () {
        $(`.${id}`).hide();
      });
      elementInput.on("input", function () {
        valueInput = $(this).val();
      });
    });

    function ToolTipsF(str, length) {
      if (str.length > length) {
        ToolTips.innerHTML = str;
        FormGroup.appendChild(ToolTips);
        $(`.${id}`).hide();
        return str.slice(0, length) + "...";
      }
      ToolTips.remove();
      return str;
    }
  }
 
  function startSingleSelect() {
    const dataOpions = [
      { key: 1, value: "vu viet hoang" },
      { key: 2, value: "vu viet hoang 1" },
      { key: 3, value: "vu viet hoang 24444444444444444444444444444" },
      { key: 4, value: "vu vi" },
    ];
    const FormGroup = document.createElement("div");
    const ToolTips = document.createElement("span");
    ToolTips.className = "toolTipsp";
    FormGroup.className = "form-group";
    FormGroup.innerHTML = `<select >
      ${dataOpions.map(
        ({ key, value }) => `<option value="${key}"> ${value}</option>`
      )}
      
    </select>`;

    root.appendChild(FormGroup);

    function ToolTipsF(str, length) {
      if (str.length > length) {
        ToolTips.innerHTML = str;
        FormGroup.appendChild(ToolTips);
        const h = $(".toolTipsp").height();
        $(".toolTipsp").css("top", `-${h + 20}px`);
        return str.slice(0, length) + "...";
      }
      ToolTips.remove();
      return str;
    }
    $(document).ready(function () {
      $("select").change(function () {
        $("option:selected", $(this)).text(
          ToolTipsF($("option:selected", $(this)).text(), 14)
        );
        $("option").each(function (index) {
          if (dataOpions[index]?.key !== parseInt($("option:selected").val())) {
            $(this).text(dataOpions[index]?.value);
          }
        });
        console.log($(".toolTipsp").is(":hidden"));
      });

      $("select").mouseover(function () {
        const element = $(".toolTipsp");
        element.show();

        if (element.is(":visible")) {
          const rect = element[0].getBoundingClientRect();
          if (
            rect.top < 0 ||
            rect.left < 0 ||
            rect.bottom > $(window).height() ||
            rect.right > $(window).width()
          ) {
            // bi an
            const h = element.height();
            if (rect.top < 0) {
              element.css({ top: "100%", left: "0" });
              return;
            }
            if (rect.left < 0) {
              element.css({ right: `-${h + 110}px` });
              return;
            }
            if (rect.bottom > $(window).height()) {
              element.css({ top: "-100%", left: "0" });
              return;
            }
            if (rect.right > $(window).height()) {
              element.css({ left: `-${h + 110}px` });
              return;
            }
          }
        }
      });

      $("select").mouseout(function () {
        $(".toolTipsp").hide();
      });

      const selectedText = $("option:selected").text();
      $("option:selected").text(ToolTipsF(selectedText, 14));
    });
  }
}

export default Input;
