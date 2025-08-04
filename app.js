document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulasi login sederhana
    if (email === "user@example.com" && password === "password123") {
        alert("Login berhasil!");
        // Redirect ke halaman dashboard jika perlu
    } else {
        alert("Email atau password salah.");
    }
    
    function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  alert("Login berhasil dengan akun Google!");
  
  // Contoh: simpan status login Google di localStorage
  localStorage.setItem("googleToken", response.credential);

  // Redirect ke dashboard atau halaman lain jika perlu
  window.location.href = "dashboard.html";
}

});
