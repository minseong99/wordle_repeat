const currect = "APPLE";
let index = 0;
let attempts = 0;
let timer;

function appStart() {
  //add
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:42%; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("mousedown", handleMouseDown);
    displayGameOver();
    //remove timer
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5) return gameOver();
    attempts += 1;
    index = 0;
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
      index -= 1;
    }
  };

  const handleEnterKey = () => {
    // correct check
    let currectCount = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const blockChar = block.innerText;
      const currectChar = currect[i];
      // keyboard color
      const keyboardBlock = document.querySelector(
        `.key-board-block[data-key=${blockChar}`
      );

      if (blockChar === currectChar) {
        currectCount += 1;
        block.style.background = "#6AAA64";
        keyboardBlock.style.background = "#6AAA64";
        keyboardBlock.dataset.currect = "true";
      } else if (currect.includes(blockChar)) {
        block.style.background = "#C9B458";
        if (keyboardBlock.dataset.currect !== "true") {
          keyboardBlock.style.background = "#C9B458";
          keyboardBlock.dataset.exist = "true";
        }
      } else {
        block.style.background = "#787C7E";

        if (
          keyboardBlock.dataset.currect !== "true" &&
          keyboardBlock.dataset.exist !== "true"
        )
          keyboardBlock.style.background = "#787C7E";
      }
      block.style.color = "white";
      keyboardBlock.style.color = "white";
    }
    if (currectCount === 5) gameOver();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index="${attempts}${index}"]`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const handleMouseDown = (event) => {
    const keyboardBlock = event.target;

    if (
      keyboardBlock.className === "key-board-block" ||
      keyboardBlock.id === "back"
    ) {
      const thisBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );
      const key = keyboardBlock.dataset.key;
      if (key === "Backspace") handleBackspace();
      else if (index === 5) {
        if (key === "Enter") handleEnterKey();
        else return;
      } else {
        thisBlock.innerText = key;
        index++;
      }
    }
  };

  const startTimer = () => {
    const startTime = new Date();
    function setTime() {
      const curTime = new Date();
      const passedTime = new Date(curTime - startTime);

      const minutes = passedTime.getMinutes().toString().padStart(2, "0");
      const seconds = passedTime.getSeconds().toString().padStart(2, "0");
      const timerBlock = document.querySelector("#timer");
      timerBlock.innerText = `${minutes} : ${seconds}`;
    }
    timer = setInterval(setTime, 1000); //setInterval의 id 리턴
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", handleMouseDown);
}

appStart();
