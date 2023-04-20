import "./CssCountDown.less";
function CountDown(root, hoursContdown, minutesContdown = "00") {
  const boxCountDown = document.createElement("div");

  if (parseInt(hoursContdown) === 0 && parseInt(minutesContdown) === 0) {
    return;
  }

  let ptrcB = hoursContdown.slice(0, hoursContdown.length - 1);
  if (parseInt(ptrcB) > 0) {
    hoursContdown = `${parseInt(hoursContdown) - 1}`;
    console.log(hoursContdown);
  }
  if (parseInt(ptrcB) <= 0) {
    hoursContdown = `0${parseInt(hoursContdown) - 1}`;
  }
  ptrcB = hoursContdown.slice(0, hoursContdown.length - 1);

  let msau = minutesContdown[1] == "0" ? 10 : parseInt(minutesContdown[1]);
  let mtrc = minutesContdown[0] == "0" ? 6 : parseInt(minutesContdown[0]);

  let ptrc = parseInt(ptrcB);
  let psau =
    hoursContdown[hoursContdown.length - 1] == "0"
      ? 10
      : parseInt(hoursContdown[hoursContdown.length - 1]);

  let time = parseInt(
    `${ptrc}${psau === 10 ? 0 : psau}${mtrc === 10 ? 0 : mtrc < 0 ? 5 : mtrc}${
      msau === 10 ? 0 : msau
    }`
  );

  let x = setInterval(() => {
    let timeCurrent = parseInt(
      `${ptrc}${psau === 10 ? 0 : psau}${
        mtrc === 10 ? 0 : mtrc < 0 ? 5 : mtrc
      }${msau === 10 ? 0 : msau}`
    );

    let PtTime = Math.round((timeCurrent / time) * 100);

    let ClassClor;
    if (PtTime <= 100 && PtTime >= 50) {
      ClassClor = "";
    } else if (PtTime <= 50 && PtTime > 15) {
      ClassClor = "timeGanHet";
    } else {
      ClassClor = "timeHet";
    }

    if (msau <= 0) {
      msau = 10;
    }
    if (mtrc < 0) {
      mtrc = 5;
    }
    if (psau <= 0) {
      psau = 10;
    }

    if (ptrc <= 0 && psau === 10 && mtrc <= 0 && msau === 10) {
      clearInterval(x);
      return;
    }

    const html = `
       <div  class="pomodoro ${ClassClor} ${
      ClassClor == "timeHet" ? "colorWhite" : ""
    } " >
            <div  ${
              ptrc >= 10 && 'style = "width: 20%"'
            } data-current-number="${ptrc}" data-change-number=${
      psau === 10 && mtrc === 0 && msau === 10 ? --ptrc : ptrc
    } class = ${
      psau === 10 && mtrc === 0 && msau === 10 ? "active" : ""
    }  ></div>
            <div data-current-number=${psau === 10 ? 0 : psau} class="${
      mtrc === 0 && msau === 10 ? "active" : ""
    }"  data-change-number="${mtrc === 0 && msau === 10 ? --psau : psau}"></div>
            <span>:</span>
            <div class = "${
              msau === 10 ? "active" : ""
            }" data-current-number="${mtrc}"  data-change-number="${
      msau === 10 ? (--mtrc < 0 ? 5 : mtrc) : mtrc
    }"></div>
            <div class="active" data-current-number="${
              msau === 10 ? 0 : msau
            }"  data-change-number="${--msau}"></div>
       </div>
    </div>
  
    `;

    boxCountDown.innerHTML = html;
  }, 1);

  root.appendChild(boxCountDown);
}

export default CountDown;
