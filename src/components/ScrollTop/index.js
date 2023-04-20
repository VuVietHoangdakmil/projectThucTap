import { icon } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./CssScrollTop.scss";
function ScrollTop(root) {
  const faArrowUpB = icon(faArrowUp);

  const ScrollTop = document.createElement("div");

  ScrollTop.setAttribute("id", "scrollTop");
  ScrollTop.appendChild(faArrowUpB.node[0]);
  root.appendChild(ScrollTop);

  const heightWindow = window.screen.height;

  window.onscroll = () => {
    scrollFunction();
  };
  function scrollFunction() {
    if ((document.documentElement.scrollTop / heightWindow) * 100 > 40) {
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
