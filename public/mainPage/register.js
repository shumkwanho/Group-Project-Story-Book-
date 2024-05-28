export function register() {

    console.log("hehehe")

    //1) show a popup window

    //2) get event listener from the form

    //3) fetch login API with body (username, email, password)

    //4) check res.ok

    //4.1) if ok => tell user register successful
    //4.2) if not ok => tell user

    window.addEventListener("load", async (e) => {
        const userId = await checkRegister();
        await loadCharacters();
        const data = await getAllStorybook();
        loadStorybooks(data);
        const bookTypeData = await storybookType();
        loadFilter(bookTypeData);
        if (userId) {
            await displayLike();
        }
    });

    const checkRegister = async () => {
        const res = await fetch("/register");
        const data = await res.json();
        const navbar = document.querySelector("#navbar");
        if (data.data) {
            navbar.innerHTML += `<button id="logout" onclick="logout()" type="button" class="btn btn-primary">Logout</button>`;
            return data.data;
        }
        const registerButton = document.createElement('button');
        registerButton.id = 'register';
        registerButton.type = 'button';
        registerButton.className = 'btn btn-primary';
        registerButton.textContent = 'register';
        registerButton.addEventListener('click', showRegisterWindow);
        navbar.appendChild(registerButton);
        return null;
    };
}

const showRegisterButton = document.getElementById('show-register');
const registerWindow = document.getElementById('register-window');
const closeButton = document.getElementById('close-register');

function showRegisterWindow() {
    registerWindow.style.display = 'block';
}

function hideRegisterWindow() {
    registerWindow.style.display = 'none';
}

showRegisterButton.addEventListener('click', showRegisterWindow);

closeButton.addEventListener('click', hideRegisterWindow);

