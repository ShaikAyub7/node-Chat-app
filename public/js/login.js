const form = document.querySelector(".form");
const btn = document.querySelector(".btn");

const formDataContainer = document.querySelector(".form-data");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    // name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const response = await axios.post("/login", data);
    formDataContainer.innerHTML = `${data.name} ${data.email}`;
    console.log("Success:", response.data);
    const { token } = response.data.user;
    console.log(token);
    console.log(token);
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Token stored:", token);

      // Redirect to a protected route
      window.location.href = "/";
    } else {
      console.error("No token received");
    }
  } catch (err) {
    console.log(err);
    alert("Login failed! Please check your credentials.");
  }
});
