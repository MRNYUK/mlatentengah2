// Cek jika user sudah login, arahkan ke dashboard
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "dashboard.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const togglePassword = document.getElementById('togglePassword');
    const togglePasswordReg = document.getElementById('togglePasswordReg');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    // =============================================================
    // Logika LOGIN
    // =============================================================
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputUserOrPhone = document.getElementById('usernameOrPhone').value.trim();
            const password = document.getElementById('password').value;
            const loginMovieSeries = document.getElementById('loginMovieSeries').value;

            // Ambil data dari localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            const validUser = users.find(
              user =>
                (user.username === inputUserOrPhone || user.phone === inputUserOrPhone) &&
                user.password === password &&
                user.movieSeries === loginMovieSeries
            );

            if (validUser) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", validUser.username);
                localStorage.setItem("phone", validUser.phone);
                localStorage.setItem("fullname", validUser.fullname);
                localStorage.setItem("movieSeries", validUser.movieSeries);
                window.location.href = "dashboard.html";
            } else {
                const box = document.getElementById("loginBox");
                box.classList.add("shake");
                setTimeout(() => box.classList.remove("shake"), 500);
                alert("Username/No HP, password, atau pilihan filter salah!");
            }
        });
    }

    // =============================================================
    // Logika REGISTER
    // =============================================================
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value.trim();
            const username = document.getElementById('username').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            const movieSeries = document.getElementById('movie_series').value;

            // Validasi password
            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok!');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Cek apakah username atau nomor HP sudah ada
            const usernameExists = users.some(u => u.username === username);
            if (usernameExists) {
                alert('Username sudah terdaftar. Silakan gunakan username lain.');
                return;
            }
            const phoneExists = users.some(u => u.phone === phone);
            if (phoneExists) {
                alert('Nomor HP sudah terdaftar. Silakan gunakan nomor lain.');
                return;
            }

            // Buat objek user baru
            const newUser = {
                fullname,
                username,
                phone,
                email,
                password,
                movieSeries
            };

            // Simpan user baru ke array dan localStorage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Akun berhasil dibuat! Silakan login.');
            window.location.href = "index.html";
        });
    }

    // =============================================================
    // Fitur "Lihat Password"
    // =============================================================
    if (togglePassword && document.getElementById('password')) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('bi-eye');
        });
    }
    
    if (togglePasswordReg && document.getElementById('password')) {
      togglePasswordReg.addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
      });
    }

    if (toggleConfirmPassword && document.getElementById('confirm_password')) {
      toggleConfirmPassword.addEventListener('click', function() {
        const passwordInput = document.getElementById('confirm_password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
      });
    }
});

// Fungsi untuk login dengan Google
function handleCredentialResponse(response) {
  console.log("Encoded JWT ID token: " + response.credential);
  alert("Login berhasil dengan akun Google!");
  localStorage.setItem("googleToken", response.credential);
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
    // Fungsi untuk pendaftaran
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const fullname = document.getElementById("fullname").value;
            const username = document.getElementById("username").value;
            const phone = document.getElementById("phone").value;
            const movieSeries = document.getElementById("movie_series").value;
            const password = document.getElementById("password").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some(u => u.username === username || u.phone === phone);

            if (userExists) {
                alert("Username atau Nomor HP sudah terdaftar!");
            } else {
                users.push({ fullname, username, phone, password, movieSeries });
                localStorage.setItem("users", JSON.stringify(users));
                alert("Pendaftaran berhasil! Silakan login.");
                window.location.href = "index.html";
            }
        });
    }

    // Fungsi untuk login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("usernameOrPhone").value.trim();
            const password = document.getElementById("password").value;
            const loginMovieSeries = document.getElementById("loginMovieSeries").value;

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const validUser = users.find(
                u =>
                (u.username === username || u.phone === username) &&
                u.password === password &&
                u.movieSeries === loginMovieSeries
            );

            if (validUser) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("currentUser", JSON.stringify(validUser));
                localStorage.setItem("fullname", validUser.fullname);
                alert("Login berhasil! Selamat datang, " + validUser.fullname);
                window.location.href = "dashboard.html";
            } else {
                const box = document.querySelector('.login-container');
                box.classList.add('shake');
                setTimeout(() => box.classList.remove('shake'), 500);
                alert("Username, password, atau posisi salah!");
            }
        });
    }

    // Fungsi untuk tombol logout (biasanya di dashboard.html)
    window.logout = function() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("fullname");
        window.location.href = "index.html";
    }

    // Fitur "Lihat Password"
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function(e) {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('bi-eye-slash');
            this.classList.toggle('bi-eye');
        });
    }

    const togglePasswordReg = document.getElementById('togglePasswordReg');
    const passwordInputReg = document.getElementById('password');
    if (togglePasswordReg && passwordInputReg) {
        togglePasswordReg.addEventListener('click', function(e) {
            const type = passwordInputReg.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInputReg.setAttribute('type', type);
            this.classList.toggle('bi-eye-slash');
            this.classList.toggle('bi-eye');
        });
    }

    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirm_password');
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function(e) {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.classList.toggle('bi-eye-slash');
            this.classList.toggle('bi-eye');
        });
    }
});