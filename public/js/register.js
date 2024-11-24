const form = document.querySelector(".form");
const btn = document.querySelector(".btn");
const formDataContainer = document.querySelector(".form-data");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const response = await axios.post("/register", data);
    formDataContainer.innerHTML = `${data.name} ${data.email} ${data._id}`;
    console.log("Success:", response.data);
    const userName = data.name;
    localStorage.setItem("username", userName);
    window.location.href = "/login.html";
  } catch (err) {
    console.log(err);
  }
});
