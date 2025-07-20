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

  collectDescElement.innerHTML = ""; // Təmizləyirik

  // Əvvəl folderləri göstər
  if (foldersArray && foldersArray.length > 0) {
    const folderHeader = document.createElement("h5");
    // folderHeader.textContent = "Folders";
    collectDescElement.appendChild(folderHeader);

    foldersArray.forEach((folder) => {
      const folderItem = document.createElement("div");
      folderItem.className = "folder-item";
      folderItem.innerHTML = `<i class="bi bi-folder-fill me-2"></i>${folder.name}`;
      collectDescElement.appendChild(folderItem);
    });
  }

  // Sonra requestləri göstər
  if (requestsArray && requestsArray.length > 0) {
    const requestHeader = document.createElement("h5");
    requestHeader.classList.add("mt-3");
    // requestHeader.textContent = "Requests";
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
}

renderrequst();
// ADD REQUSET
let addRequest = document.getElementById("addRequest");
addRequest.addEventListener("click", () => {
  const requests = collectionData[1]; // requests array

  // MaxID ile requset IDleri andle etmek
  const maxId = requests.reduce((max, request) => Math.max(max, request.id), 0);
  const newId = maxId + 1;

  const newRequest = {
    id: newId,
    name: `New Request ${newId}`,
    type: "GET",
  };

  requests.push(newRequest);

  // Guncellemek localStorage
  localStorage.setItem("collectionData", JSON.stringify(collectionData));

  renderrequst();
});

let addFolder = document.querySelector("#addFolder");

addFolder.addEventListener("click", () => {
  const folders = collectionData[0]; // folders array

  // Find the maximum ID to generate a unique new ID
  const maxId = folders.reduce((max, folder) => Math.max(max, folder.id), 0);
  const newId = maxId + 1;

  const newFolder = {
    id: newId,
    name: `New Folder ${newId}`,
  };

  folders.push(newFolder);
  console.log(`New folder added:`, newFolder);
  console.log(`Updated collectionData:`, collectionData);

  // Update localStorage
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

// $(document).ready(function () {
//   // Metod düymələrinə klik olduqda
//   $(".methodBtn").click(function () {
//     console.log("Method button", $(this).text().trim(), "clicked.");
//     var selectedMethod = $(this).text().trim();

//     console.log("Selected method:", selectedMethod);

//     // Inputun dəyərini dəyişirik
//     $("#methodInput").val(selectedMethod);

//     // Butonun rəngini dəyişmək üçün əvvəlki classları təmizləyirik
//     $("#methodInput").removeClass(
//       "getMethodColor postMethodColor putMethodColor patchMethodColor deleteMethodColor headMethodColor optionsMethodColor"
//     );

//     // Yeni metoda uyğun class əlavə edirik
//     switch (selectedMethod) {
//       case "GET":
//         $("#methodInput").addClass("getMethodColor");
//         break;
//       case "POST":
//         $("#methodInput").addClass("postMethodColor");
//         break;
//       case "PUT":
//         $("#methodInput").addClass("putMethodColor");
//         break;
//       case "PATCH":
//         $("#methodInput").addClass("patchMethodColor");
//         break;
//       case "DELETE":
//         $("#methodInput").addClass("deleteMethodColor");
//         break;
//       case "HEAD":
//         $("#methodInput").addClass("headMethodColor");
//         break;
//       case "OPTIONS":
//         $("#methodInput").addClass("optionsMethodColor");
//         break;
//     }
//   });
// });

// let $workspaceName = $("#workspaceName");
// let data = localStorage.getItem("workSpacesData");
// let $createCollectionButton = $("#createCollectionButton");
// let $emptyContent = $("#emptyContent");
// let $collectionContent = $("#collectionContent");

// // Get Other datas
// let datas = JSON.parse(data);
// $workspaceName.text(`${datas.inputName}'s Workspace `);

// // SET COLLECTION DATA
// let collectionData = [
//   (folders = [
//     {
//       id: 1,
//       name: "New Folder",
//     },
//   ]),
//   (requests = [
//     {
//       id: 1,
//       name: "New Request",
//       type: "GET",
//     },
//     {
//       id: 2,
//       name: "New Request 2",
//       type: "POST",
//     },
//   ]),
// ];

// localStorage.setItem("collectionData", JSON.stringify(collectionData));

// // Create Collection
// $createCollectionButton.on("click", function () {
//   $emptyContent.addClass("d-none");
//   $collectionContent.removeClass("d-none");
//   collectionContentFunction();
// });

// // Search Collection Function
// function searchCollection() {
//   let searchCollectionInput = $("#searchCollectionInput").val().toLowerCase();
//   let $noResult = $(".noCollectionResult");
//   let $emptyContent = $(".emptyContent");
//   let $notFoundText = $("#notFoundText");

//   if (searchCollectionInput === "") {
//     $noResult.addClass("d-none");
//     $emptyContent.removeClass("d-none");
//   } else {
//     $noResult.removeClass("d-none");
//     $notFoundText.text(`No results found for "${searchCollectionInput}"`);
//     $emptyContent.addClass("d-none");
//   }
// }

// // collectionContent Function
// function collectionContentFunction() {}

// // Requset and folder body

// let $collectDesc = $("#collectDesc");

// function renderrequst() {
//   const foldersArray = collectionData.find(
//     (item) => Array.isArray(item) && item[0] && item[0].name && !item[0].type
//   );

//   const requestsArray = collectionData.find(
//     (item) => Array.isArray(item) && item[0] && item[0].type
//   );

//   $collectDesc.empty(); // Təmizləyirik

//   // Folderləri göstər
//   if (foldersArray && foldersArray.length > 0) {
//     const $folderHeader = $("<h5></h5>");
//     $collectDesc.append($folderHeader);

//     foldersArray.forEach((folder) => {
//       const $folderItem = $(
//         `<div class="folder-item"><i class="bi bi-folder-fill me-2"></i>${folder.name}</div>`
//       );
//       $collectDesc.append($folderItem);
//     });
//   }

//   // Requestləri göstər
//   if (requestsArray && requestsArray.length > 0) {
//     const $requestHeader = $("<h5></h5>").addClass("mt-3");
//     $collectDesc.append($requestHeader);

//     requestsArray.forEach((request) => {
//       const $requestItem = $(
//         `<div class="request-item"><strong>${request.type}</strong>: ${request.name}</div>`
//       );
//       $collectDesc.append($requestItem);
//     });
//   }

//   // Hər ikisi boşdursa
//   if (
//     (!foldersArray || foldersArray.length === 0) &&
//     (!requestsArray || requestsArray.length === 0)
//   ) {
//     $collectDesc.html(`
//         This collection is empty.
//         <a href="#" class="text-primary">Add a request</a>
//         or
//         <a href="#" class="text-primary">Add a folder</a>
//         to start working.
//     `);
//   }
// }

// renderrequst();

// ADD REQUEST
// let $addRequest = $("#addRequest");

// $addRequest.on("click", function () {
//   const requests = collectionData[1];

//   const maxId = requests.reduce((max, request) => Math.max(max, request.id), 0);
//   const newId = maxId + 1;

//   const newRequest = {
//     id: newId,
//     name: `New Request ${newId}`,
//     type: "GET",
//   };

//   requests.push(newRequest);

//   localStorage.setItem("collectionData", JSON.stringify(collectionData));

//   renderrequst();
// });

// ADD FOLDER
// let $addFolder = $("#addFolder");

// $addFolder.on("click", function () {
//   const folders = collectionData[0];

//   const maxId = folders.reduce((max, folder) => Math.max(max, folder.id), 0);
//   const newId = maxId + 1;

//   const newFolder = {
//     id: newId,
//     name: `New Folder ${newId}`,
//   };

//   folders.push(newFolder);
//   console.log("New folder added:", newFolder);
//   console.log("Updated collectionData:", collectionData);

//   localStorage.setItem("collectionData", JSON.stringify(collectionData));

//   renderrequst();
// });
