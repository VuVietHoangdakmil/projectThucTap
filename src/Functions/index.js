const GetValueSelect = (classname) => {
  const select = document.querySelector(`.${classname}`);
  if (select.options[select.selectedIndex]) {
    return select.options[select.selectedIndex].value;
  }
};

const GetTextSelect = (classname) => {
  const select = document.querySelector(`.${classname}`);
  if (select.options[select.selectedIndex]) {
    return select.options[select.selectedIndex].text;
  }
};

const getDate = (date) => {
  const Ndate = new Date(date);

  return `${Ndate.getFullYear()}-${Ndate.getMonth() + 1}-${Ndate.getDate()}`;
};

const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export {
  GetValueSelect,
  GetTextSelect,
  getDate,
  getStorage,
  setStorage,
};
