
function prevuselyClicked(Prompt) {
  if (document.getElementById("bt" + Number(Prompt)).innerHTML == "X" || document.getElementById("bt" + Number(Prompt)).innerHTML == "O") {
    alert("Already Clicked");
    return true;
  }
}



(async function playGame() {
  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", reset);
  function clickChecker() {
    return new Promise((resolve) => {
      document.addEventListener("click", function handler(e) {
        const dataValue = e.target.getAttribute("data-value");
        if (dataValue) {
          document.removeEventListener("click", handler);
          resolve(dataValue);
        }
      })
    })
  }

  function checkWin(mainArray, subArrays) {
    return subArrays.some(subArray => subArray.every(num => mainArray.includes(num)));
  }

  let aChoose = [];
  let bChoose = [];
  const subArrays = [[3, 6, 9], [1, 5, 9], [3, 5, 7], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8]];
  let toggle = "a";
  let aPrompt;
  let bPrompt;
  let gameOver = false;
  const message = document.getElementById("message");
  const winMessage = document.getElementById("winMessage");
  for (let i = 0; i <= 8; i++) {
    if (gameOver) break; 0
    if (toggle == "a") {
      message.innerHTML = "Player A's turn";
      aPrompt = await clickChecker();

      if (prevuselyClicked(aPrompt)) {
        i--;
        continue;
      } else {
        aChoose.push(Number(aPrompt));
        let bts = document.getElementById("bt" + Number(aPrompt));
        bts.innerHTML = "X";
        toggle = "b";
        if (checkWin(aChoose, subArrays)) {
          winMessage.innerHTML = "Player A wins";
          gameOver = true;
          message.innerHTML = "Game Over";
          break;
        }
      }
      aChoose.push(Number(aPrompt));
      let bts = document.getElementById("bt" + Number(aPrompt));
      bts.innerHTML = "X";
      toggle = "b";
      if (checkWin(aChoose, subArrays)) {
        winMessage.innerHTML = "Player A wins";
        gameOver = true;
        message.innerHTML = "Game Over";
        break;
      }
    } else if (toggle == "b") {
      message.innerHTML = "Player B's turn";
      bPrompt = await clickChecker();
      if (prevuselyClicked(bPrompt)) {
        i--;
        continue;
      } else {
        bChoose.push(Number(bPrompt));

        let bts = document.getElementById("bt" + Number(bPrompt));
        bts.innerHTML = "O";
        toggle = "a";
        if (checkWin(bChoose, subArrays)) {
          winMessage.innerHTML = "Player B wins";
          gameOver = true;
          message.innerHTML = "Game Over";
          break;
        }
      }
    }
  }
  checkWin(aChoose, subArrays)
})();

function reset() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById("bt" + i).innerHTML = "[]";
  }
  document.getElementById("message").innerHTML = "";
  document.getElementById("winMessage").innerHTML = "";
  location.reload();
}