// BLUEPRINT CLASS FOR ALL OF USERS INPUT

class userSummary {
  constructor() {
    this.personalInfo = {
      name: "",
      email: "",
      phone: "",
    };
    this.plan = "arcade";
    this.calendarPlan = "monthly";
    this.addOns = [];
  }
}

// HIGHLIGHT THE CURRENT STEP NUMBERBY GIVING IT ACTIVE CLASS

const highlightCurrentStepNumber = (step) => {
  const allSteps = document.querySelectorAll(`.step-number`);

  const currentStep = allSteps[step - 1];
  allSteps.forEach((e) => {
    e.classList.remove(`active`);
  });

  currentStep.classList.add(`active`);
};

// SHOWS THE APPROPRIATE BUTTONS FOR EACH STEP I.E HIDES THE BACK BUTTON ON STEP 1

const showAppropriateButtons = (step) => {
  const buttonSection = document.querySelector(`#button-section`);
  const nextButton = document.querySelector(`#next-btn`);
  const backButton = document.querySelector(`#back-btn`);
  const confirmButton = document.querySelector(`#confirm-btn`);

  if (step > 1 && step < 4) {
    backButton.classList.remove(`hidden`);
    nextButton.classList.remove(`hidden`);
    confirmButton.classList.add(`hidden`);
    buttonSection.classList.remove(`justify-end`);
    buttonSection.classList.add(`justify-between`);
  } else if (step == 4) {
    nextButton.classList.add(`hidden`);
    confirmButton.classList.remove(`hidden`);
  } else {
    backButton.classList.add(`hidden`);
    nextButton.classList.remove(`hidden`);
    confirmButton.classList.add(`hidden`);
    buttonSection.classList.add(`justify-end`);
    buttonSection.classList.remove(`justify-between`);
  }
};

// HIDES OTHER STEP AND DISPLAYS THE CURRENT STEP

const showCurrentStep = (step) => {
  const sections = document.querySelectorAll(`section`);
  const currrentSection = document.getElementById(`${step}`);
  sections.forEach((e) => {
    e.classList.replace(`flex`, `hidden`);
  });

  currrentSection.classList.replace(`hidden`, `flex`);
};

// GET THE USER'S PERSONAL INFO FROM THE FIRST STEP AND STORE IN LOCAL STORAGE

const getPersonalInfo = () => {
  const nameInput = document.querySelector(`#name`);
  const mailInput = document.querySelector(`#mail`);
  const phoneInput = document.querySelector(`#phone`);

  const userInfo = getInfo();

  userInfo.personalInfo.name = nameInput.value;
  userInfo.personalInfo.email = mailInput.value;
  userInfo.personalInfo.phone = phoneInput.value;

  storeInfo(userInfo);
};

// GETS THE USER'S SELECTED GAME PLAN AND STORES IN LOCAL STORAGE

const getGamePlan = () => {
  const allPlans = document.querySelectorAll(`.game-plan`);

  allPlans.forEach((e, index, array) => {
    e.onclick = () => {
      for (i = 0; i < array.length; i++) {
        array[i].classList.remove(`selected`);
      }

      e.classList.add(`selected`);

      const userInfo = getInfo();
      userInfo.plan = e.id;

      storeInfo(userInfo);

      updateUserPlan();
      updateUserPlanPrice();
    };
  });
};

// UPDATE THE USER PLAN IN THE SUMMARY SECTION

const updateUserPlan = () => {
  const userInfo = getInfo();

  const summaryPlan = document.querySelector(`#userPlan`);
  const planString = `${toProperCase(userInfo.plan)} (${toProperCase(
    userInfo.calendarPlan
  )})`;

  summaryPlan.innerHTML = planString;
};

// UPDATE USER PLAN PRICE IN THE SUMMARY SECTION

const updateUserPlanPrice = () => {
  const userInfo = getInfo();

  const userPlan = userInfo.plan;

  const selectedPlan = document.querySelector(`#${userPlan}`);
  const price = selectedPlan.querySelector(`.price`);
  const summaryPrice = document.querySelector(`#userPlanPrice`);
  summaryPrice.innerHTML = price.innerHTML;
};

// CHANGES THE PRICE OF THE PLANS BASED ON THE CALENDAR PLAN SELECTED

const changePrices = (calendarPlan) => {
  const allPlans = document.querySelectorAll(`.game-plan`);

  allPlans.forEach((e) => {
    const price = e.querySelector(`.price`);
    const discount = e.querySelector(`.discount`);
    const selectedPrice = e.getAttribute(`data-${calendarPlan}`);

    price.innerHTML = selectedPrice;
    discount.classList.toggle(`hidden`);
  });
};

// TOGGLES BETWEEN MONTHLY AND YEARLY PLANS. I REFER TO THEM AS CALENDAR PLANS
// TOGGLES THE RESPECTIVE PART IN THE SUMMARY SECTION ALSO

const toggleCalendarPlan = () => {
  const checkbox = document.querySelector(`#plan-toggle`);

  let calendarPlan;

  checkbox.oninput = () => {
    const status = checkbox.checked;
    if (status) {
      calendarPlan = `yearly`;
    } else {
      calendarPlan = `monthly`;
    }

    changePrices(calendarPlan);

    const userInfo = getInfo();
    userInfo.calendarPlan = calendarPlan;
    storeInfo(userInfo);

    updateUserPlan();
    updateUserPlanPrice();
  };
};

// SHOW THE APPROPRIATE PRICES FOR ADDONS DEPENDING ON WHAT CALENDAR PLAN WAS SELECTED IN THE PREVIOUS STEP
// ALSO SHWOS THE APPROPRIATE PRICES FOR SELECTE ADDONS IN THE SUMMARY SECTION

const showCorrectPrice = () => {
  const userInfo = getInfo();
  const prices = document.querySelectorAll(`.addon-price`);
  const summaryPrices = document.querySelectorAll(`.summary-addon-price`);

  let i = 0;
  prices.forEach((e) => {
    const calendarPlan = userInfo.calendarPlan;
    const correctPrice = e.getAttribute(`data-${calendarPlan}`);
    e.innerHTML = correctPrice;
    summaryPrices[i].innerHTML = correctPrice;

    i++;
  });
};

// GETS THE SELECTED ADD ONS AND STORES THEM IN LOCAL STORAGE
// SHOWS AND HIDES THE RESPECTIVE ADDONS IN THE SUMMARY SECTION

const getAddOns = () => {
  showCorrectPrice();
  const allCheckboxes = document.querySelectorAll(`input[name="add-ons"]`);

  allCheckboxes.forEach((e) => {
    const label = e.parentElement;

    e.oninput = () => {
      const status = e.checked;

      const userInfo = getInfo();

      if (status) {
        label.classList.add(`selected`);
        userInfo.addOns.push(e.value);

        const summaryAddOn = document.querySelector(`#summary-${e.id}`);
        summaryAddOn.classList.replace(`hidden`, `flex`);
      } else {
        label.classList.remove(`selected`);

        const index = userInfo.addOns.indexOf(e.value);
        if (index >= 0) {
          userInfo.addOns.splice(index, 1);
        }

        const summaryAddOn = document.querySelector(`#summary-${e.id}`);
        summaryAddOn.classList.replace(`flex`, `hidden`);
      }

      storeInfo(userInfo);
    };
  });
};

// REMOVES THE NUMBER FROM THE PRICE LISTING SO IT CAN BE USED FOR CALCULATING THE TOTAL

const removeNumber = (price) => {
  const index = price.indexOf(`$`);
  const index2 = price.indexOf(`/`);
  const number = price.slice(index + 1, index2);

  return Number.parseInt(number);
};

// CALCULATES THE USER'S TOTAL

const calculateTotal = () => {
  const userInfo = getInfo();
  const calendarPlan = userInfo.calendarPlan;
  const totalLabel = document.querySelector(`#total-label`);
  const totalPrice = document.querySelector(`#total-price`);

  let total = 0;

  const selectedPlan = document.querySelector(`#${userInfo.plan}`);
  const planPrice = selectedPlan.getAttribute(`data-${calendarPlan}`);
  total = total + removeNumber(planPrice);

  let i = 0;
  const addOns = userInfo.addOns;
  const length = addOns.length;
  for (; i < length; i++) {
    const addOnPrice = document.querySelector(
      `#summary-${addOns[i]} .summary-addon-price`
    );
    const price = addOnPrice.innerHTML;
    total = total + removeNumber(price);
  }

  if (calendarPlan == `monthly`) {
    totalLabel.innerHTML = `Total(per month)`;
    totalPrice.innerHTML = `$${total}/mo`;
  } else {
    totalLabel.innerHTML = `Total(per year)`;
    totalPrice.innerHTML = `$${total}/yr`;
  }
};

// SHOWS THE THANK YOU SCREEN

const showThankYou = () => {
  const sections = document.querySelectorAll(`section`);
  const currrentSection = document.getElementById(`thank-you`);
  sections.forEach((e) => {
    e.classList.add(`hidden`);
  });

  currrentSection.classList.remove(`hidden`);

  const btnSection = document.querySelector(`#button-section`);
  btnSection.classList.add(`hidden`);
};

// CONVERTS STRINGS TO PROPER CASE

const toProperCase = (string) => {
  const properString =
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  return properString;
};

// GOES TO THE NEXT STEP

const toNextStep = (step) => {
  step++;

  return step;
};

// GOES TO THE PREVIOUS STEP

const toPreviousStep = (step) => {
  const prev = step - 1;

  return prev;
};

// STORES THE USER INFO IN LOCAL STORAGE

const storeInfo = (infoObj) => {
  const stringInfo = JSON.stringify(infoObj);

  localStorage.setItem(`userSummary`, stringInfo);
};

// GETS THE USER INFO FROM LOCAL STORAGE

const getInfo = () => {
  const stringInfo = localStorage.getItem(`userSummary`);
  const infoObj = JSON.parse(stringInfo);

  return infoObj;
};

// MAIN FUNCTION

const initApp = (step) => {
  highlightCurrentStepNumber(step);
  showAppropriateButtons(step);
  showCurrentStep(step);

  getGamePlan();
  toggleCalendarPlan();

  getAddOns();

  calculateTotal();

  const nextButton = document.querySelector(`#next-btn`);

  nextButton.onclick = () => {
    if (step == 1) {
      getPersonalInfo();
    }

    const nextStep = toNextStep(step);

    initApp(nextStep);
  };

  const backButton = document.querySelector(`#back-btn`);
  backButton.onclick = () => {
    const prevStep = toPreviousStep(step);

    initApp(prevStep);
  };

  const confirmButton = document.querySelector(`#confirm-btn`);
  confirmButton.onclick = () => {
    showThankYou();
  };
};

const resetLocalStorage = () => {
  const userInfo = new userSummary();

  storeInfo(userInfo);

  initApp(1);
};

resetLocalStorage();
