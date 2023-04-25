import Select2 from "./components/select2.js";
import "./StylesGlobal/Css.scss";

import $ from "jquery";
import ToolTips from "./components/Tooltips/index.js";
import Input from "./components/Input/index.js";
import ScrollTop from "./components/ScrollTop";
import Countdown from "./components/Countdown";
import { GetValueSelect, GetTextSelect, getStorage } from "./Functions";
const root = document.getElementById("select");

// ScrollTop(root);
// Countdown(root, 5);
// ToolTips(root, "vu viet hoangf1", 10, "id1");
Input(root, "text", "ok1", "vu viet hoang", 6);

const start = async () => {
  await Select2(root, {
    type: "https://64337c34582420e231653899.mockapi.io/api/seacrh/country",
    idSelect: "TKTK",
    lengthStr: 6,
  });
  await Select2(root, {
    type: "https://64337c34582420e231653899.mockapi.io/api/seacrh/country",
    idSelect: "TKTK5",
    lengthStr: 5,
  });
  await Select2(root, {
    type: "https://64337c34582420e231653899.mockapi.io/api/seacrh/country?search=21",
    idSelect: "TKTK6",
    lengthStr: 10,
  });
  await Select2(root, {
    type: "https://64337c34582420e231653899.mockapi.io/api/seacrh/country?search=3",
    idSelect: "TKTK68",
    lengthStr: 10,
  });
  await Select2(root, {
    type: "https://64337c34582420e231653899.mockapi.io/api/seacrh/country?search=1",
    idSelect: "TKTK686",
    lengthStr: 10,
  });
};
start();

// Input(root, "Select");
