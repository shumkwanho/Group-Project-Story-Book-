export function login(userId) {
    
    console.log("hahah")

    //1) show a popup window

    //2) get event listener from the form

    //3) fetch login API with body (username, email, password)

    //4) check res.ok

    //4.1) if ok => tell user login successful
    //4.2) if not ok => login not successful => tell user about the error
        // check (if result.message === 'Invalid credentials password not match')


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
        return null;
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

