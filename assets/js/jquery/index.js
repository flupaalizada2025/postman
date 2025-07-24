$(document).ready(function () {
  // Əsas DOM elementləri
  let $workspaceName = $("#workspaceName");
  let data = localStorage.getItem("workSpacesData");
  let datas = JSON.parse(data);
  $workspaceName.text(`${datas.inputName}'s Workspace `);

  // İlkin collection məlumatları
  let collectionData = [
    [{ id: 1, name: "New Folder" }],
    [
      { id: 1, name: "New Request", type: "GET" },
      { id: 2, name: "New Request 2", type: "POST" },
    ],
  ];
  localStorage.setItem("collectionData", JSON.stringify(collectionData));

  // Kolleksiya yarat düyməsi
  $("#createCollectionButton").on("click", function () {
    $("#emptyContent").addClass("d-none");
    $("#collectionContent").removeClass("d-none");
    renderCollection();
  });

  // Kolleksiya axtarışı
  $("#searchCollectionInput").on("input", function () {
    let value = $(this).val().toLowerCase();
    if (value === "") {
      $(".noCollectionResult").addClass("d-none");
      $(".emptyContent").removeClass("d-none");
    } else {
      $(".noCollectionResult").removeClass("d-none");
      $("#notFoundText").text(`No results found for "${value}"`);
      $(".emptyContent").addClass("d-none");
    }
  });

  // Kolleksiyanı göstər
  function renderCollection() {
    let data = JSON.parse(localStorage.getItem("collectionData"));
    let folders = data[0];
    let requests = data[1];
    let $desc = $("#collectDesc");
    $desc.empty();

    if (folders.length) {
      $desc.append("<h5>Folders</h5>");
      folders.forEach((folder) => {
        $desc.append(`
          <div class="folder-item d-flex justify-content-between align-items-center">
            <span><i class="bi bi-folder-fill me-2"></i>${folder.name}</span>
            <div class="dropdown">
              <button class="btn btn-sm border-0 text-light dropdown-toggle" data-bs-toggle="dropdown">
                <i class="fa-solid fa-bars"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item text-light" href="#">Add Request</a></li>
                <li><a class="dropdown-item text-light" href="#">Add Folder</a></li>
                <li><a class="dropdown-item text-light border-top border-bottom py-2" href="#">Run</a></li>
                <li>
                  <button class="dropdown-item text-light share-folder" data-id="${folder.id}" data-name="${folder.name}" data-bs-toggle="modal" data-bs-target="#shareFolderModal">Share</button>
                </li>
                <li><a class="dropdown-item text-light border-bottom" href="#">Copy Link</a></li>
                <li><a class="dropdown-item text-light" href="#">Rename</a></li>
                <li><a class="dropdown-item text-light" href="#">Duplicate</a></li>
                <li><a class="dropdown-item text-light" href="#">Delete</a></li>
              </ul>
            </div>
          </div>
        `);
      });
    }

    if (requests.length) {
      $desc.append("<h5 class='mt-3'>Requests</h5>");
      requests.forEach((r) => {
        $desc.append(
          `<div class="request-item"><strong>${r.type}</strong>: ${r.name}</div>`
        );
      });
    }

    if (!folders.length && !requests.length) {
      $desc.html(
        `This collection is empty. <a href="#" class="text-primary">Add a request</a> or <a href="#" class="text-primary">Add a folder</a> to start working.`
      );
    }
  }

  renderCollection();

  // Share folder path
  $(document).on("click", ".share-folder", function () {
    const name = $(this).data("name");
    const id = $(this).data("id");
    $("#folderPathInput").val(
      `${window.location.host}/New Collection/${name}/${id}`
    );
  });

  $("#copyBtn").on("click", function () {
    const val = $("#folderPathInput").val();
    const $btn = $(this);

    navigator.clipboard.writeText(val);
    $btn.addClass("show-tooltip");
    setTimeout(() => {
      $btn.removeClass("show-tooltip");
    }, 3000);
  });

  // Add Request
  $("#addRequest").on("click", function () {
    let data = JSON.parse(localStorage.getItem("collectionData"));
    let requests = data[1];
    let maxId = Math.max(...requests.map((r) => r.id));
    requests.push({
      id: maxId + 1,
      name: `New Request ${maxId + 1}`,
      type: "GET",
    });
    localStorage.setItem("collectionData", JSON.stringify(data));
    renderCollection();
  });

  // Add Folder
  $("#addFolder").on("click", function () {
    let data = JSON.parse(localStorage.getItem("collectionData"));
    let folders = data[0];
    let maxId = Math.max(...folders.map((f) => f.id));
    folders.push({ id: maxId + 1, name: `New Folder ${maxId + 1}` });
    localStorage.setItem("collectionData", JSON.stringify(data));
    renderCollection();
  });

  // Metod seçimi
  $(".methodBtn").on("click", function () {
    let selected = $(this).text().trim();
    let $input = $("#methodInput")
      .val(selected)
      .removeClass()
      .addClass("form-control");

    const classes = {
      GET: "getMethodColor",
      POST: "postMethodColor",
      PUT: "putMethodColor",
      PATCH: "patchMethodColor",
      DELETE: "deleteMethodColor",
      HEAD: "headMethodColor",
      OPTIONS: "optionsMethodColor",
    };

    if (classes[selected]) {
      $input.addClass(classes[selected]);
    }
  });

  // Parametr formalaşdır
  function getParams() {
    let keys = $(".paramKey")
      .map((_, el) => $(el).val().trim())
      .get();
    let values = $(".paramValue")
      .map((_, el) => $(el).val().trim())
      .get();
    return keys
      .map((key, i) =>
        key
          ? `${encodeURIComponent(key)}=${encodeURIComponent(values[i])}`
          : null
      )
      .filter(Boolean)
      .join("&");
  }

  // HTML təhlükəsiz göstərmə
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Sorğu göndər
  $("#sendBtn").on("click", function () {
    let method = $("#methodInput").val().toUpperCase();
    let url = $("#urlInput").val().trim();
    let body = $("#bodyInput").val();

    console.log(body);

    if (["GET", "DELETE"].includes(method)) {
      const params = getParams();
      if (params) url += (url.includes("?") ? "&" : "?") + params;
      body = null;
    }

    $.ajax({
      url: url,
      method: method,
      contentType: "application/json",
      data: body,
      success: function (data) {
        $("#yazir").text(data);
        $("#responseRaw").text(data);
        if (data.startsWith("<")) {
          $("#responseRendered").attr("srcdoc", data);
        } else {
          $("#responseRendered").attr(
            "srcdoc",
            `<pre>${escapeHtml(data)}</pre>`
          );
        }
      },
      error: function (xhr, status, err) {
        $("#yazir").text("Error: " + err);
        $("#responseRendered").attr(
          "srcdoc",
          `<pre style="color:red;">Error: ${escapeHtml(err)}</pre>`
        );
      },
    });
  });

  // Tema dəyişmə
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    $("body").addClass("dark");
    $("#themeToggleBtn").html('<i class="bi bi-sun"></i>');
  } else {
    $("body").removeClass("dark");
    $("#themeToggleBtn").html('<i class="bi bi-moon-stars"></i>');
  }

  $("#themeToggleBtn").on("click", function () {
    $("body").toggleClass("dark");
    const isDark = $("body").hasClass("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    $(this).html(
      isDark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>'
    );
  });
});
