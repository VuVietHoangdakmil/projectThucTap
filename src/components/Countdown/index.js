import "./CssCountDown.less";

function CountDown(root, hoursContdown, minutesContdown = "00") {
  hoursContdown = hoursContdown < 10 ? `0${hoursContdown}` : `${hoursContdown}`;
  const boxCountDown = document.createElement("div");
  console.log(hoursContdown);
  startTime(hoursContdown, minutesContdown);

  if (Number(hoursContdown) === 0 && Number(minutesContdown) === 0) {
    return;
  }
  console.log(hoursContdown.slice(0, hoursContdown.length - 1));
  let ptrcB = isNaN(hoursContdown.slice(0, hoursContdown.length - 1))
    ? hoursContdown.slice(0, hoursContdown.length - 1)
    : 0;

  if (Number(ptrcB) > 0) {
    hoursContdown = `${Number(hoursContdown) - 1}`;
    console.log(hoursContdown);
  }
  if (Number(ptrcB) <= 0) {
    hoursContdown = `0${Number(hoursContdown) - 1}`;
  }
  ptrcB = hoursContdown.slice(0, hoursContdown.length - 1);

  let msau = minutesContdown[1] == "0" ? 10 : Number(minutesContdown[1]);
  let mtrc = minutesContdown[0] == "0" ? 6 : Number(minutesContdown[0]);

  let ptrc = Number(ptrcB);
  console.log(ptrc);
  let psau =
    hoursContdown[hoursContdown.length - 1] == "0"
      ? 10
      : Number(hoursContdown[hoursContdown.length - 1]);

  let time = Number(
    `${ptrc}${psau === 10 ? 0 : psau}${mtrc === 10 ? 0 : mtrc < 0 ? 5 : mtrc}${
      msau === 10 ? 0 : msau
    }`
  );

  let x = setInterval(() => {
    let timeCurrent = Number(
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
              ptrc >= 10 && ptrc < 100
                ? 'style = "width: 20%"'
                : ptrc >= 100 && 'style = "width: 28%"'
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
  }, 1000);

  root.appendChild(boxCountDown);

  function startTime(hoursContdown, minutesContdown) {
    let ptrcB = hoursContdown.slice(0, hoursContdown.length - 1);
    let msau = Number(minutesContdown[1]);
    let mtrc = Number(minutesContdown[0]);

    let ptrc = Number(ptrcB);
    let psau =
      hoursContdown[hoursContdown.length - 1] == "0"
        ? 10
        : Number(hoursContdown[hoursContdown.length - 1]);
    if (msau <= 0) {
      msau = 10;
    }
    if (mtrc < 0) {
      mtrc = 5;
    }
    if (psau <= 0) {
      psau = 10;
    }
    boxCountDown.innerHTML = Hmtlstart(ptrc, psau, mtrc, msau);

    function Hmtlstart(ptrc, psau, mtrc, msau, ClassClor = "") {
      const html = `
       <div  class="pomodoro ${ClassClor} ${
        ClassClor == "timeHet" ? "colorWhite" : ""
      } " >
            <div  ${
              ptrc >= 10 && ptrc < 100
                ? 'style = "width: 20%"'
                : ptrc >= 100 && 'style = "width: 28%"'
            } data-current-number="${ptrc}" data-change-number=${ptrc}  ></div>
            <div data-current-number=${psau === 10 ? 0 : psau} 
      }"  data-change-number="${psau}"></div>
            <span>:</span>
            <div  data-current-number="${mtrc}"  data-change-number="${mtrc}"></div>
            <div data-current-number="${
              msau === 10 ? 0 : msau
            }"  data-change-number="${msau}"></div>
       </div>
    </div>
  
    `;
      return html;
    }
  }
}

export default CountDown;
