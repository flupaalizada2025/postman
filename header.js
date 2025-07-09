function search() {
  const input = document.getElementById("searchWorkspace").value.toLowerCase();
  const spans = document.querySelectorAll("#resultBtn");
  const noResultDiv = document.querySelector("#noResultDiv");

  let matchFound = false;

  spans.forEach((span) => {
    const text = span.textContent.toLowerCase();

    if (text.includes(input)) {
      span.closest("button").parentElement.style.display = "block";
      matchFound = true;
    } else {
      span.closest("button").parentElement.style.display = "none";
    }
  });

  if (!matchFound && input.trim() !== "") {
    noResultDiv.style.setProperty("display", "flex", "important");
  } else {
    noResultDiv.style.display = "none";
  }
}
