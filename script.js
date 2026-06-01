// Role selection and login functionality
const roleSelect = document.getElementById("role");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const registerLink = document.getElementById("registerLink");

// Show/hide password toggle
togglePassword.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});

// Role-based register link visibility
roleSelect.addEventListener("change", () => {
  if (roleSelect.value === "student") {
    registerLink.style.display = "inline";
  } else {
    registerLink.style.display = "none";
  }
});

// Login button click
loginBtn.addEventListener("click", async () => {
  const role = roleSelect.value;
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        role: role
      })
    });

    const data = await response.json();
    console.log(data);   // 🔥 check this in console

    if (data.status === "success") {
      alert("Login Success ✅");

      if (data.role === "student") {
        window.location.href = "student-dashboard.html";
      } else if (data.role === "faculty") {
        window.location.href = "faculty-dashboard.html";
      } else {
        window.location.href = "admin-dashboard.html";
      }

    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
});
// LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password, role})
    });

    const data = await res.json();
    alert(data.status);
});

// REGISTER
document.getElementById("registerLink").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const res = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password, role})
    });

    const data = await res.json();
    alert(data.message);
});