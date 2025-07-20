// $(document).ready(function () {
//   // Metod düymələrinə klik olduqda
//   $(".methodBtn").click(function () {
//     var selectedMethod = $(this).text().trim();

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
//   // Metod, URL, Parametrlər, Body input-larını götür (sənin HTML-ə uyğun)
//   $("#sendBtn").click(function () {
//     let method = $("#methodInput").val().toUpperCase(); // GET, POST, PUT, DELETE
//     let url = $("#urlInput").val();
//     let params = $("#paramsInput").val(); // key=value&key2=value2 formatında ola bilər
//     let body = $("#bodyInput").val(); // JSON kimi

//     // Əgər GET-dirsə, parametrləri url-ə əlavə et
//     if (method === "GET" && params) {
//       url += (url.includes("?") ? "&" : "?") + params;
//     }

//     $.ajax({
//       url: url,
//       method: method,
//       data: method === "GET" || method === "DELETE" ? null : body,
//       contentType: "application/json",
//       success: function (response) {
//         // Cavabı "yazir" adlı sahədə göstər
//         $("#yazir").text(JSON.stringify(response, null, 2));
//       },
//       error: function (xhr) {
//         $("#yazir").text("Error: " + xhr.status + " " + xhr.statusText);
//       },
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const methodInput = document.getElementById("methodInput");
  const urlInput = document.getElementById("urlInput");
  const paramsInput = document.getElementById("paramsInput");
  const bodyInput = document.getElementById("bodyInput");
  const yazir = document.getElementById("yazir");

  sendBtn.addEventListener("click", () => {
    let method = methodInput.value.toUpperCase();
    let url = urlInput.value;
    let params = paramsInput.value.trim();
    let body = bodyInput.value.trim();

    // GET metodunda parametrləri URL-ə əlavə et
    if (method === "GET" && params) {
      url += (url.includes("?") ? "&" : "?") + params;
    }

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
      // Cavabı HTML response hissəsində göstər
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
      localStorage.setItem("theme", "dark");
      toggleBtn.innerHTML = '<i class="bi bi-sun"></i>'; // Günəş ikonuna dəyiş
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.innerHTML = '<i class="bi bi-moon-stars"></i>'; // Ay ikonuna dəyiş
    }
  });

  // Başlanğıcda düymənin ikonunu doğru göstər
  if (document.body.classList.contains("dark")) {
    toggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
  } else {
    toggleBtn.innerHTML = '<i class="bi bi-moon-stars"></i>';
  }
});
