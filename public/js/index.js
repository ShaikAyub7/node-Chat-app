const form = document.getElementById("form");
const input = document.getElementById("input");
const user = document.querySelector(".user");
const logout = document.querySelector(".logout");
const messages = document.getElementById("messages");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.post("/login", data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  const token = localStorage.getItem("authToken");

  if (!token) {
    window.location.href = "/login.html";
  } else {
    window.location.href = "/";
  }
});
logout.addEventListener("click", function () {
  const token = localStorage.getItem("authToken");
  if (token) {
    localStorage.removeItem("authToken");

    window.location.href = "/login.html";
    console.log("logout successfully");
  } else {
    window.location.href = "/";
  }
});
