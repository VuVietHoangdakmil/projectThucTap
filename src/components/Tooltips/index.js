import "./CssTooltips.scss";
import $ from "jquery";
function ToolTips(root, str, length) {
  const boxToolTips = document.createElement("div");
  boxToolTips.className = "boxToolTipsCha";
  boxToolTips.innerHTML = ToolTipsF(str, length);
  root.appendChild(boxToolTips);

  function ToolTipsF(str, length) {
    if (str.length > length) {
      return `<span class="boxToolTips"> ${str.slice(0, length) + "..."} 
      <span class="textHiden">${str}</span>
    </span> `;
    }
    return `<span class="boxToolTips noHover"> ${str} </span> `;
  }

  $(document).ready(function () {
    $(".boxToolTips").mousemove(function (event) {
      const rect = this.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const h = $(".textHiden").height();

      if (x > 80) {
        $(".textHiden").css({
          left: "100%",
          top: `-${h/2}px`,
          transformOrigin: " 0% 25%",
        });
      } else {
        console.log($(".textHiden").height());

        $(".textHiden").css({
          left: "0%",
          top: `-${h + 20}px`,
          transformOrigin: " 50% bottom",
        });
      }
      // console.log(x)
    });
  });
}

export default ToolTips;
