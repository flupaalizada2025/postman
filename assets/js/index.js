let workspaceName = document.querySelector("#workspaceName");
let data = localStorage.getItem("workSpacesData");
let createCollectionButton = document.querySelector("#createCollectionButton");
let emptyContent = document.querySelector("#emptyContent");
let collectionContent = document.querySelector("#collectionContent");

// Get Ohter datas
let datas = JSON.parse(data);
workspaceName.textContent = `${datas.inputName}'s Workspace `;

// SET COLLECTION DATA
let collectionData = [
  (folders = [
    {
      id: 1,
      name: "New Folder",
    },
  ]),
  (requests = [
    {
      id: 1,
      name: "New Request",
      type: "GET",
    },
    {
      id: 2,
      name: "New Request 2",
      type: "POST",
    },
  ]),
];

localStorage.setItem("collectionData", JSON.stringify(collectionData));

// Create Collection
createCollectionButton.addEventListener("click", () => {
  emptyContent.classList.add("d-none");
  collectionContent.classList.remove("d-none");
  collectionContentFunction();
});

// Search Colleciton Function
function searchCollection() {
  let searchCollectionInput = document
    .querySelector("#searchCollectionInput")
    .value.toLowerCase();
  let noResult = document.getElementsByClassName("noCollectionResult");
  let emptyContent = document.querySelector(".emptyContent");
  let notFoundText = document.querySelector("#notFoundText");

  if (searchCollectionInput == "") {
    noResult[0].classList.add("d-none");
    emptyContent.classList.remove("d-none");
  } else {
    noResult[0].classList.remove("d-none");
    notFoundText.textContent = `No results found for "${searchCollectionInput}"`;
    emptyContent.classList.add("d-none");
  }
}

// collectionContent Function
function collectionContentFunction() {}

// Requset and folder body

const collectDescElement = document.getElementById("collectDesc");
let collectDesc = document.querySelector("#collectDesc");

function renderrequst() {
  const foldersArray = collectionData.find(
    (item) => Array.isArray(item) && item[0] && item[0].name && !item[0].type
  );

  const requestsArray = collectionData.find(
    (item) => Array.isArray(item) && item[0] && item[0].type
  );

  collectDescElement.innerHTML = "";

  // Əvvəl folderləri göstər
  if (foldersArray && foldersArray.length > 0) {
    const folderHeader = document.createElement("h5");
    collectDescElement.appendChild(folderHeader);

    foldersArray.forEach((folder) => {
      const folderItem = document.createElement("div");
      folderItem.className =
        "folder-item d-flex justify-content-between align-items-center";
      folderItem.innerHTML = `
        <span><i class="bi bi-folder-fill me-2"></i>${folder.name}</span>
        <div class="dropdown">
          <button class="btn btn-sm border-0 text-light dropdown-toggle" type="button" id="dropdownMenuButton${folder.id}" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-bars" aria-hidden="true"></i>
          </button>
          <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton${folder.id}">
            <li><a class="dropdown-item text-light" href="#">Add Request</a></li>
            <li><a class="dropdown-item text-light" href="#">Add Folder</a></li>
            <li><a class="dropdown-item text-light border-top border-bottom py-2" href="#">Run</a></li>
            <li>
              <button
               type="button"
               data-bs-target="#shareFolderModal"
               class="bg-transparent border-0 w-100 text-start dropdown-item text-light"
               id="folderPath"
               data-bs-toggle="modal"
              >
                Share
              </button>
            </li>
            <li><a class="dropdown-item text-light border-bottom" href="#">Copy Link</a></li>
            <li><a class="dropdown-item text-light " href="#">Rename</a></li>
            <li><a class="dropdown-item text-light " href="#">Ducliacte</a></li>
            <li><a class="dropdown-item text-light " href="#">Delete</a></li>
          </ul>
        </div>
      `;
      collectDescElement.appendChild(folderItem);

      const folderPath = document.querySelector("#folderPath");
      const folderPathInput = document.querySelector("#folderPathInput");
      const copyBtn = document.querySelector("#copyBtn");
      folderPath.addEventListener("click", () => {
        folderPathInput.value = `${window.location.host}/New Collection/${folder.name}/${folder.id}`;
      });

      copyBtn.addEventListener("click", () => {
        const folderValue = folderPathInput.value;
        navigator.clipboard.writeText(folderValue);
      });
    });
  }

  // Sonra requestləri göstər
  if (requestsArray && requestsArray.length > 0) {
    const requestHeader = document.createElement("h5");
    requestHeader.classList.add("mt-3");
    collectDescElement.appendChild(requestHeader);

    requestsArray.forEach((request) => {
      const requestItem = document.createElement("div");
      requestItem.className = "request-item";
      requestItem.innerHTML = `<strong>${request.type}</strong>: ${request.name}`;
      collectDescElement.appendChild(requestItem);
    });
  }

  // Hər ikisi boşdursa
  if (
    (!foldersArray || foldersArray.length === 0) &&
    (!requestsArray || requestsArray.length === 0)
  ) {
    collectDescElement.innerHTML = `
        This collection is empty.
        <a href="#" class="text-primary">Add a request</a>
        or
        <a href="#" class="text-primary">Add a folder</a>
        to start working.
    `;
  }

  const dropdownElements = document.querySelectorAll(".dropdown-toggle");
  dropdownElements.forEach((dropdown) => {
    new bootstrap.Dropdown(dropdown);
  });
}

renderrequst();

// ADD REQUSET
let addRequest = document.getElementById("addRequest");
addRequest.addEventListener("click", () => {
  const requests = collectionData[1];

  const maxId = requests.reduce((max, request) => Math.max(max, request.id), 0);
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

let addFolder = document.querySelector("#addFolder");

addFolder.addEventListener("click", () => {
  const folders = collectionData[0];

  const maxId = folders.reduce((max, folder) => Math.max(max, folder.id), 0);
  const newId = maxId + 1;

  const newFolder = {
    id: newId,
    name: `New Folder ${newId}`,
  };

  folders.push(newFolder);
  localStorage.setItem("collectionData", JSON.stringify(collectionData));
  renderrequst();
});

document.addEventListener("DOMContentLoaded", () => {
  const methodInput = document.querySelector("#methodInput");
  const methodButtons = document.querySelectorAll(".methodBtn");

  methodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedMethod = btn.textContent.trim();

      // Input dəyərini dəyişdir
      methodInput.value = selectedMethod;

      // Bütün rəng classlarını təmizlə
      methodInput.classList.remove(
        "getMethodColor",
        "postMethodColor",
        "putMethodColor",
        "patchMethodColor",
        "deleteMethodColor",
        "headMethodColor",
        "optionsMethodColor"
      );

      // Yeni metodun rəng classını əlavə et
      switch (selectedMethod) {
        case "GET":
          methodInput.classList.add("getMethodColor");
          break;
        case "POST":
          methodInput.classList.add("postMethodColor");
          break;
        case "PUT":
          methodInput.classList.add("putMethodColor");
          break;
        case "PATCH":
          methodInput.classList.add("patchMethodColor");
          break;
        case "DELETE":
          methodInput.classList.add("deleteMethodColor");
          break;
        case "HEAD":
          methodInput.classList.add("headMethodColor");
          break;
        case "OPTIONS":
          methodInput.classList.add("optionsMethodColor");
          break;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const methodInput = document.getElementById("methodInput");
  const urlInput = document.getElementById("urlInput");
  const paramsInput = document.getElementById("paramsInput");
  const bodyInput = document.getElementById("bodyInput");
  const yazir = document.getElementById("yazir");
  const paramsKeys = document.querySelector("#paramsKey");

  sendBtn.addEventListener("click", () => {
    let method = methodInput.value.toUpperCase();
    let url = urlInput.value;
    let params = paramsInput.value.trim();
    let body = bodyInput.value.trim();

    // Fetch API istifadə edirik
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      // GET və DELETE metodlarında body göndərməyək
      body: method === "GET" || method === "DELETE" ? null : body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status + " " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // JSON-u gözəl formatda göstər
        yazir.textContent = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        yazir.textContent = "Error: " + error.message;
      });
  });

  paramsKeys.addEventListener("input", () => {
    const paramValuee = document.querySelector("#paramValue");
    let baseUrl = urlInput.value.split("?")[0];
    let paramKeysValue = paramsKeys.value.trim();
    let paramValue = paramValuee.value.trim();

    if (paramKeysValue !== "" && paramValue !== "") {
      urlInput.value =
        baseUrl + "?" + "paramKeys=" + paramKeysValue + "&" + paramValue;
    } else if (paramKeysValue !== "") {
      urlInput.value = baseUrl + "?" + paramKeysValue;
    } else if (paramValue !== "") {
      urlInput.value = baseUrl + "?" + "&" + paramValue;
    } else {
      urlInput.value = baseUrl;
    }
  });
});

document.getElementById("sendBtn").addEventListener("click", () => {
  let method = document.getElementById("methodInput").value.toUpperCase();
  let url = document.getElementById("urlInput").value.trim();

  // Body üçün (POST, PUT, PATCH üçün textarea varsa ona bax)
  // Misal üçün, əgər Body tabında textarea varsa:
  let body = null;
  const bodyTextarea = document.querySelector(".bodyTabContent textarea");
  if (bodyTextarea && ["POST", "PUT", "PATCH"].includes(method)) {
    body = bodyTextarea.value;
  }

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" || method === "DELETE" || !body ? null : body,
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
      const responseRaw = document.getElementById("responseRaw");
      const responseRendered = document.getElementById("responseRendered");

      responseRaw.textContent = data;

      if (type === "html") {
        const iframeDoc =
          responseRendered.contentDocument ||
          responseRendered.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(data);
        iframeDoc.close();
      } else {
        responseRendered.srcdoc = `<pre style="white-space: pre-wrap; color:#ccc; background:#222; padding:10px;">${escapeHtml(
          data
        )}</pre>`;
      }
    })
    .catch((err) => {
      const responseRaw = document.getElementById("responseRaw");
      const responseRendered = document.getElementById("responseRendered");
      responseRaw.textContent = `Error: ${err.message}`;
      responseRendered.srcdoc = `<pre style="color:red;">Error: ${escapeHtml(
        err.message
      )}</pre>`;
    });
});

// HTML escape funksiyası
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getParams() {
  const keys = [...document.querySelectorAll(".paramKey")];
  const values = [...document.querySelectorAll(".paramValue")];
  let paramsArr = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i].value.trim();
    const value = values[i].value.trim();
    if (key) {
      paramsArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return paramsArr.join("&");
}

document.getElementById("sendBtn").addEventListener("click", () => {
  let method = document.getElementById("methodInput").value.toUpperCase();
  let url = document.getElementById("urlInput").value.trim();
  let body = document.getElementById("bodyInput")
    ? document.getElementById("bodyInput").value
    : "";

  // GET və ya DELETE metodunda params url-ə əlavə olunur
  if (method === "GET" || method === "DELETE") {
    const params = getParams();
    if (params) {
      url += (url.includes("?") ? "&" : "?") + params;
    }
  }

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "GET" || method === "DELETE" ? null : body,
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("yazir").innerHTML = data;
    })
    .catch((error) => {
      document.getElementById("yazir").textContent = "Error: " + error.message;
    });
});

// theme toggle funksiyası
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggleBtn");

  // LocalStorage-dan mövcud mövzunu oxu
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  // Düyməyə click olunca mövzunu dəyiş
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "light");
      toggleBtn.innerHTML = '<i class="bi bi-sun"></i>'; // Günəş ikonuna dəyiş
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.innerHTML = '<i class="bi bi-moon-stars"></i>'; // Ay ikonuna dəyiş
    }
  });

  // Başlanğıcda düymənin ikonunu doğru göstər
  if (document.body.classList.contains("light")) {
    toggleBtn.innerHTML = '<i class="bi bi-moon-stars"></i>';
  } else {
    toggleBtn.innerHTML = ' <i class="bi bi-sun"></i>';
  }
});
