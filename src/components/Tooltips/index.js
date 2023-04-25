import "./CssTooltips.scss";
import $ from "jquery";
function ToolTips(root, str, length, id) {
  const boxToolTips = document.createElement("div");
  boxToolTips.className = "boxToolTipsCha";
  boxToolTips.innerHTML = ToolTipsF(str, length);
  root.appendChild(boxToolTips);

  function ToolTipsF(str, length) {
    if (str.length > length) {
      return `<span class="boxToolTips"  id="${id}"> ${
        str.slice(0, length) + "..."
      } 
      <span class="textHiden ${id} ">${str}</span>
    </span> `;
    }
    return `<span class="boxToolTips noHover"> ${str} </span> `;
  }

  $(document).ready(function () {
    
    $(`#${id}`).mousemove(function () {
      const h = $(`.${id}`).height();
      const h2 = $(".boxToolTips").height();

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
          if (rect.top < 0) {
            element.css({ bottom: `-${h + h2}px` });
            return;
          }
          if (rect.left < 0) {
           element.css({ left: `${100}%`, bottom: `-${h/2}px` });
            return;
          }
          if (rect.bottom > $(window).height()) {
            element.css({ bottom: `100%` });
            return;
          }
          if (rect.right > $(window).height()) {
              element.css({ left: `-${100}%`, bottom: `-${h/2}px` });
            return;
          }
        }
      }
    });
    $(`#${id}`).mouseout(function () {
      $(`.${id}`).hide();
    });
  });
}

export default ToolTips;
