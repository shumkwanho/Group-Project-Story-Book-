export function login(userId) {
    const checkLogin = async () => {
        const res = await fetch("/checkLogin");
        const data = await res.json();
        const navbar = document.querySelector("#navbar");
        if (data.data) {
            navbar.innerHTML += `<button id="logout" onclick="logout()" type="button" class="btn btn-primary">Logout</button>`;
            return data.data;
        }
        const loginButton = document.createElement('button');
        loginButton.id = 'login';
        loginButton.type = 'button';
        loginButton.className = 'btn btn-primary';
        loginButton.textContent = 'Login';
        loginButton.addEventListener('click', showLoginWindow);
        navbar.appendChild(loginButton);
        return;
    };
}

const showLoginButton = document.getElementById('show-login');
const loginWindow = document.getElementById('login-window');
const closeButton = document.getElementById('close-login');

function showLoginWindow() {
  loginWindow.style.display = 'block';
}

function hideLoginWindow() {
  loginWindow.style.display = 'none';
}

showLoginButton.addEventListener('click', showLoginWindow);

closeButton.addEventListener('click', hideLoginWindow);

