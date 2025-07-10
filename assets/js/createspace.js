function nextButton() {
  // Steps
  let step1 = document.getElementById("step1");
  let step2 = document.getElementById("step2");

  // Options

  step1.classList.add("d-none");
  step2.classList.remove("d-none");
}

function dallas() {
  console.log(this.value);
}
// let options = document.querySelectorAll("#option");

// const data = [(option = ""), (name = ""), (type = ""), (access = "")];

// localStorage.setItem("workSpacesData", JSON.stringify(data));
