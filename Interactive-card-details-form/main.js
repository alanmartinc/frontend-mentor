window.onload = function () {
  const cardNumberContainer = document.getElementById("cardNumberContainer");
  const cardholderContainer = document.getElementById("cardholderContainer");
  const expDateMMContainer = document.getElementById("expDateMMContainer");
  const expDateYYContainer = document.getElementById("expDateYYContainer");
  const cvvNumberContainer = document.getElementById("cvvNumberContainer");

  const cardholderInput = document.getElementById("cardholderInput");
  const cardNumberInput = document.getElementById("cardNumberInput");
  const monthInput = document.getElementById("MM");
  const yearInput = document.getElementById("YY");
  const cvvNumberInput = document.getElementById("cvvNumberInput");

  function addBorderRed(element) {
    element.classList.add("border-red");
  }

  function removeBorderRed(element) {
    element.classList.remove("border-red");
  }

  function isValid(element) {
    element.classList.add("valid");
  }

  function removeValidation(element) {
    element.classList.remove("valid");
  }

  cardholderInput.addEventListener("input", function () {
    cardholderContainer.innerHTML = cardholderInput.value.toUpperCase();
    if (cardholderInput.value.match(/[0-9]/g)) {
      addBorderRed(cardholderInput);
    } else {
      removeBorderRed(cardholderInput);
      isValid(cardholderInput);
    }
    if (cardholderInput.value == "" || cardholderInput.value.match(/[0-9]/g)) {
      cardholderInput.classList.remove("valid");
      addBorderRed(cardholderInput);
    }
  });

  cardNumberInput.addEventListener("input", function () {
    cardNumberContainer.innerHTML = cardNumberInput.value;
    if (
      cardNumberInput.value.length == 4 ||
      cardNumberInput.value.length == 9 ||
      cardNumberInput.value.length == 14
    ) {
      cardNumberInput.value += " ";
    }
    if (cardNumberInput.value.match(/[a-zA-Z]/g)) {
      addBorderRed(cardNumberInput);
    } else {
      removeBorderRed(cardNumberInput);
      isValid(cardNumberInput);
    }
    if (
      cardNumberInput.value == "" ||
      cardNumberInput.value.match(/[a-zA-Z]/g) ||
      cardNumberInput.value.length !== 19
    ) {
      cardNumberInput.classList.remove("valid");
      addBorderRed(cardNumberInput);
    }
  });

  monthInput.addEventListener("input", function () {
    expDateMMContainer.innerHTML = monthInput.value;
    if ((monthInput.value.length = 2)) {
      expDateMMContainer.innerHTML += "/";
    }
    if (monthInput.value.match(/[a-zA-Z]/g) || monthInput.value.length < 2) {
      addBorderRed(monthInput);
    } else {
      removeBorderRed(monthInput);
      isValid(monthInput);
    }
    if (
      monthInput.value == "" ||
      monthInput.value.match(/[a-zA-Z]/g) ||
      monthInput.value.length < 2
    ) {
      monthInput.classList.remove("valid");
      addBorderRed(monthInput);
    }
  });

  yearInput.addEventListener("input", function () {
    expDateYYContainer.innerHTML = yearInput.value;

    if (yearInput.value.match(/[a-zA-Z]/g) || yearInput.value.length < 2) {
      addBorderRed(yearInput);
    } else {
      removeBorderRed(yearInput);
      isValid(yearInput);
    }
    if (
      yearInput.value == "" ||
      yearInput.value.match(/[a-zA-Z]/g) ||
      yearInput.value.length < 2
    ) {
      yearInput.classList.remove("valid");
      addBorderRed(yearInput);
    }
  });

  cvvNumberInput.addEventListener("input", function () {
    cvvNumberContainer.innerHTML = cvvNumberInput.value;
    if (
      cvvNumberInput.value.match(/[a-zA-Z]/g) ||
      cvvNumberInput.value.length < 3
    ) {
      addBorderRed(cvvNumberInput);
    } else {
      removeBorderRed(cvvNumberInput);
      isValid(cvvNumberInput);
    }
    if (
      cvvNumberInput.value == "" ||
      cvvNumberInput.value.length < 3 ||
      cvvNumberInput.value.match(/[a-zA-Z]/g)
    ) {
      cvvNumberInput.classList.remove("valid");
      addBorderRed(cvvNumberInput);
    }
  });

  let confirmBtn = document.getElementById("confirmBtn");
  let form = document.getElementById("cardDataForm");
  let thanksMessage = document.querySelector(".thanks-message");

  confirmBtn.addEventListener("click", function () {
    if (
      cardNumberInput.classList.contains("valid") &&
      cardholderInput.classList.contains("valid") &&
      yearInput.classList.contains("valid") &&
      monthInput.classList.contains("valid") &&
      cvvNumberInput.classList.contains("valid")
    ) {
      form.style.display = "none";
      thanksMessage.style.display = "block";
    } else {
      confirmBtn.classList.add("problem-popup");
      setTimeout(function () {
        confirmBtn.classList.remove("problem-popup");
      }, 3000);
    }
  });

  let continueBtn = document.getElementById("continueBtn");

  continueBtn.addEventListener("click", function () {
    thanksMessage.style.display = "none";
    form.style.display = "block";
    form.reset();
    removeValidation(cardNumberInput);
    removeValidation(cardholderInput);
    removeValidation(yearInput);
    removeValidation(monthInput);
    removeValidation(cvvNumberInput);
  });
};
