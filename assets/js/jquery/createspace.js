$(document).ready(function () {
  // Initial workspace data setup
  const data = {
    inputName: "",
    option: "",
    type: "",
    access: "",
  };

  localStorage.setItem("workSpacesData", JSON.stringify(data));

  // Next Button Function
  function nextButton() {
    if (data.option !== "") {
      $("#step1").addClass("d-none");
      $("#step2").removeClass("d-none");
    } else {
      alert("Fill your workspace type");
    }
  }

  // Option buttons click handler
  $("[id='option']").on("click", function () {
    $("[id='option']").removeAttr("id");
    $(this).attr("id", "active");

    data.option = $(this).text();
    localStorage.setItem("workSpacesData", JSON.stringify(data));
  });

  // Type button selection + access display logic
  const typeBtns = $("[id='typeBtn']");
  const acsesPropertys = $("[id='acsesProperty']");

  typeBtns.each(function (index) {
    $(this).on("click", function () {
      const h6Text = $(this).find("h6").text();
      data.type = h6Text;
      localStorage.setItem("workSpacesData", JSON.stringify(data));

      // Access section display logic
      acsesPropertys.addClass("d-none");
      acsesPropertys.eq(index).removeClass("d-none");
    });
  });

  // Workspace name input live check
  $("#name").on("input", function () {
    const inputVal = $(this).val().trim();
    data.inputName = inputVal;
    localStorage.setItem("workSpacesData", JSON.stringify(data));

    if (inputVal !== "") {
      $("#createButton").removeClass("disabled");
    } else {
      $("#createButton").addClass("disabled");
    }
  });

  // Access level button example
  $(".internalAcses").on("click", function () {
    const selectedAccess = $(this).text().trim();
    data.access = selectedAccess;
    localStorage.setItem("workSpacesData", JSON.stringify(data));

    // Highlight active button (optional)
    $(".internalAcses").removeClass("active-access");
    $(this).addClass("active-access");
  });

  // Export nextButton if needed globally
  window.nextButton = nextButton;
});
