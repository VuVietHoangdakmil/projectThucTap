import { icon } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./CssScrollTop.less";
function ScrollTop(root) {
  const faArrowUpB = icon(faArrowUp);

  const ScrollTop = document.createElement("div");

  ScrollTop.setAttribute("id", "scrollTop");
  ScrollTop.appendChild(faArrowUpB.node[0]);
  root.appendChild(ScrollTop);

  const heightWindow = document.documentElement.getBoundingClientRect().height;

  window.onscroll = () => {
    scrollFunction();
  };
  function scrollFunction() {
    const Ysrcool =
      Math.abs(
        Math.round(document.documentElement.getBoundingClientRect().top)
      ) +
        150 <=
      150
        ? 0
        : Math.abs(
            Math.round(document.documentElement.getBoundingClientRect().top)
          ) + 150;

    if ((Ysrcool / heightWindow) * 100 > 30) {
      ScrollTop.style.display = "block";
    } else {
      ScrollTop.style.display = "none";
    }
  }

  ScrollTop.addEventListener("click", backToTop);

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

export default ScrollTop;
