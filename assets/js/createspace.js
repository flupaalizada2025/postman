const data = {
  inputName: "",
  option: "",
  type: "",
  access: "",
};

localStorage.setItem("workSpacesData", JSON.stringify(data));

// Next Button Function
let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");

function nextButton() {
  // Options classnames change event
  // if (data.option !== " ") {
  //   alert("Please, fill the type");
  // } else {
  step1.classList.add("d-none");
  step2.classList.remove("d-none");
  // }
}

// Option buttons
let options = document.querySelectorAll("#option");

options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((opt) => opt.removeAttribute("id"));
    option.setAttribute("id", "active");

    // Upate Selected option on my data
    data.option = option.innerText;
    localStorage.setItem("workSpacesData", JSON.stringify(data));
  });
});

// Type Buttons

document.addEventListener("DOMContentLoaded", () => {
  const typeBtns = document.querySelectorAll("#typeBtn");

  typeBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      const h6element = event.currentTarget.querySelector("h6");

      if (h6element) {
        const h6Value = h6element.textContent;
        data.type = h6Value;
        localStorage.setItem("workSpacesData", JSON.stringify(data));
      }
    });
  });
});

// WorkspaseName button function

let nameInput = document.getElementById("name");
let createButton = document.getElementById("createButton");
function workspaceName() {
  // control the input
  if (nameInput.value !== " ") {
    createButton.classList.remove("disabled");
  } else {
    createButton.classList.add("disabled");
  }
  data.inputName = nameInput.value;
  localStorage.setItem("workSpacesData", JSON.stringify(data));
}

// acsesProperty buttons display

let typeBtns = document.querySelectorAll("#typeBtn");
let acsesPropertys = document.querySelectorAll("#acsesProperty");

typeBtns[0].addEventListener("click", () => {
  acsesPropertys[0].classList.remove("d-none");
  acsesPropertys[1].classList.add("d-none");
  acsesPropertys[2].classList.add("d-none");
});

typeBtns[1].addEventListener("click", () => {
  acsesPropertys[1].classList.remove("d-none");
  acsesPropertys[0].classList.add("d-none");
  acsesPropertys[2].classList.add("d-none");
});

typeBtns[2].addEventListener("click", () => {
  acsesPropertys[2].classList.remove("d-none");
  acsesPropertys[1].classList.add("d-none");
  acsesPropertys[0].classList.add("d-none");
});

// AcsesBtn
let internalAcses = document.querySelectorAll(".internalAcses");

// console.log(internalAcses);
