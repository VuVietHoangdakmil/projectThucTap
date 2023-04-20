function BTN(text,className) {
  const btn = document.createElement("button");
  btn.setAttribute("class", `btn ${className}`);
  btn.innerText = text;

  return btn;
}

export default BTN;
