const advice = document.getElementById("advice");
const adNumber = document.getElementById("ad-num");
const dice = document.getElementById("dice");

window.addEventListener("load", fetchAdvice);

async function fetchAdvice() {
  const result = await fetch("https://api.adviceslip.com/advice");
  const resultParse = await result.json();
  adNumber.textContent = resultParse.slip.id;
  advice.textContent = resultParse.slip.advice;
}
dice.addEventListener("click", fetchAdvice);
