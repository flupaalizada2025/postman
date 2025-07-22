function search() {
  const input = $("#searchWorkspace").val().toLowerCase();
  const spans = $("#resultBtn");
  const noResultDiv = $("#noResultDiv");

  let matchFound = false;

  spans.each(function () {
    const text = $(this).text().toLowerCase();

    if (text.includes(input)) {
      $(this).closest("button").parent().show();
      matchFound = true;
    } else {
      $(this).closest("button").parent().hide();
    }
  });

  if (!matchFound && input.trim() !== "") {
    noResultDiv.css("display", "flex");
  } else {
    noResultDiv.hide();
  }
}
