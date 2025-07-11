const data = {
  option: "",
  inputName: "",
  type: "",
  access: "",
};
//
localStorage.setItem("workSpacesData", JSON.stringify(data));

// Next Button
function nextButton() {
  // Steps
  let step1 = document.getElementById("step1");
  let step2 = document.getElementById("step2");

  // Options classnames change event
  step1.classList.add("d-none");
  step2.classList.remove("d-none");
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
