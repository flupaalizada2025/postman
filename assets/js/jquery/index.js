$(document).ready(function () {
  // Workspace setup
  let workspaceName = $("#workspaceName");
  let data = localStorage.getItem("workSpacesData");
  let datas = JSON.parse(data);
  workspaceName.text(`${datas.inputName}'s Workspace`);

  // Set initial collection data
  let collectionData = [
    (folders = [{ id: 1, name: "New Folder" }]),
    (requests = [
      { id: 1, name: "New Request", type: "GET" },
      { id: 2, name: "New Request 2", type: "POST" },
    ]),
  ];

  localStorage.setItem("collectionData", JSON.stringify(collectionData));

  // Create collection button
  $("#createCollectionButton").on("click", function () {
    $("#emptyContent").addClass("d-none");
    $("#collectionContent").removeClass("d-none");
    collectionContentFunction();
  });

  // Search Collection
  function searchCollection() {

    console.log("Salam")
    let input = $("#searchCollectionInput").val().toLowerCase();
    let noResult = $(".noCollectionResult");
    let emptyContent = $(".emptyContent");
    let notFoundText = $("#notFoundText");

    if (input === "") {
      noResult.addClass("d-none");
      emptyContent.removeClass("d-none");
    } else {
      noResult.removeClass("d-none");
      notFoundText.text(`No results found for "${input}"`);
      emptyContent.addClass("d-none");
    }
  }
  // searchCollection();
  // Render folders and requests
  function renderrequst() {
    const foldersArray = collectionData.find(
      (item) => Array.isArray(item) && item[0]?.name && !item[0]?.type
    );
    const requestsArray = collectionData.find(
      (item) => Array.isArray(item) && item[0]?.type
    );

    const collectDescElement = $("#collectDesc");
    collectDescElement.empty();

    if (foldersArray?.length > 0) {
      foldersArray.forEach((folder) => {
        collectDescElement.append(
          `<div class="folder-item"><i class="bi bi-folder-fill me-2"></i>${folder.name}</div>`
        );
      });
    }

    if (requestsArray?.length > 0) {
      requestsArray.forEach((request) => {
        collectDescElement.append(
          `<div class="request-item"><strong>${request.type}</strong>: ${request.name}</div>`
        );
      });
    }

    if (
      (!foldersArray || foldersArray.length === 0) &&
      (!requestsArray || requestsArray.length === 0)
    ) {
      collectDescElement.html(`
          This collection is empty.
          <a href="#" class="text-primary">Add a request</a>
          or
          <a href="#" class="text-primary">Add a folder</a>
          to start working.
        `);
    }
  }

  renderrequst();

  // Add request
  $("#addRequest").on("click", function () {
    const requests = collectionData[1];
    const maxId = Math.max(...requests.map((r) => r.id));
    const newId = maxId + 1;

    const newRequest = {
      id: newId,
      name: `New Request ${newId}`,
      type: "GET",
    };

    requests.push(newRequest);
    localStorage.setItem("collectionData", JSON.stringify(collectionData));
    renderrequst();
  });

  // Add folder
  $("#addFolder").on("click", function () {
    const folders = collectionData[0];
    const maxId = Math.max(...folders.map((f) => f.id));
    const newId = maxId + 1;

    const newFolder = {
      id: newId,
      name: `New Folder ${newId}`,
    };

    folders.push(newFolder);
    localStorage.setItem("collectionData", JSON.stringify(collectionData));
    renderrequst();
  });

  // Method button toggle
  $(".methodBtn").on("click", function () {
    const selectedMethod = $(this).text().trim();
    const methodInput = $("#methodInput");

    methodInput
      .val(selectedMethod)
      .removeClass(
        "getMethodColor postMethodColor putMethodColor patchMethodColor deleteMethodColor headMethodColor optionsMethodColor"
      );

    const colorClass = {
      GET: "getMethodColor",
      POST: "postMethodColor",
      PUT: "putMethodColor",
      PATCH: "patchMethodColor",
      DELETE: "deleteMethodColor",
      HEAD: "headMethodColor",
      OPTIONS: "optionsMethodColor",
    }[selectedMethod];

    if (colorClass) methodInput.addClass(colorClass);
  });

  // Send request
  $("#sendBtn").on("click", function () {
    let method = $("#methodInput").val().toUpperCase();
    let url = $("#urlInput").val().trim();
    let body = $("#bodyInput").val() || "";

    if (["GET", "DELETE"].includes(method)) {
      const params = getParams();
      if (params) {
        url += (url.includes("?") ? "&" : "?") + params;
      }
    }

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: ["GET", "DELETE"].includes(method) ? null : body,
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const jsonData = await response.json();
          return { type: "json", data: JSON.stringify(jsonData, null, 2) };
        } else if (contentType.includes("text/html")) {
          const textData = await response.text();
          return { type: "html", data: textData };
        } else {
          const textData = await response.text();
          return { type: "text", data: textData };
        }
      })
      .then(({ type, data }) => {
        $("#responseRaw").text(data);

        if (type === "html") {
          let iframeDoc =
            $("#responseRendered")[0].contentDocument ||
            $("#responseRendered")[0].contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(data);
          iframeDoc.close();
        } else {
          $("#responseRendered").attr(
            "srcdoc",
            `<pre style="white-space: pre-wrap; color:#ccc; background:#222; padding:10px;">${escapeHtml(
              data
            )}</pre>`
          );
        }
      })
      .catch((err) => {
        $("#responseRaw").text(`Error: ${err.message}`);
        $("#responseRendered").attr(
          "srcdoc",
          `<pre style="color:red;">Error: ${escapeHtml(err.message)}</pre>`
        );
      });
  });

  // Escape HTML
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Get URL params
  function getParams() {
    let keys = $(".paramKey")
      .map(function () {
        return $(this).val().trim();
      })
      .get();
    let values = $(".paramValue")
      .map(function () {
        return $(this).val().trim();
      })
      .get();

    let paramsArr = [];

    for (let i = 0; i < keys.length; i++) {
      if (keys[i]) {
        paramsArr.push(
          `${encodeURIComponent(keys[i])}=${encodeURIComponent(values[i])}`
        );
      }
    }

    return paramsArr.join("&");
  }

  // Theme toggle
  const toggleBtn = $("#themeToggleBtn");

  localStorage.setItem("theme", "light");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    $("body").addClass("dark");
  } else {
    $("body").removeClass("dark");
  }

  toggleBtn.on("click", function () {
    $("body").toggleClass("dark");

    if ($("body").hasClass("dark")) {
      localStorage.setItem("theme", "light");
      toggleBtn.html('<i class="bi bi-sun"></i>');
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.html('<i class="bi bi-moon-stars"></i>');
    }
  });

  if ($("body").hasClass("light")) {
    toggleBtn.html('<i class="bi bi-moon-stars"></i>');
  } else {
    toggleBtn.html('<i class="bi bi-sun"></i>');
  }

  // Placeholder if needed
  function collectionContentFunction() {
    // Define if needed
  }
});
