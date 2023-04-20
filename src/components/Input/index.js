import "./CssInput.scss";

function Input(root, type = "text", value = "") {
  const FormGroup = document.createElement("div");
  FormGroup.className= "form-group";
  FormGroup.innerHTML = `<input type="${type}"/>`;
  
  
  root.appendChild(FormGroup);
}

export default Input;
