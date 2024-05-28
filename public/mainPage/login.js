export function login(userId) {
    window.addEventListener("load", async (e) => {
        const userId = await checkLogin();
        await loadCharacters();
        const data = await getAllStorybook();
        loadStorybooks(data);
        const bookTypeData = await storybookType();
        loadFilter(bookTypeData);
        if (userId) {
            await displayLike();
        }
    });

    const checkLogin = async () => {
        const res = await fetch("/checkLogin");
        const data = await res.json();
        const navbar = document.querySelector("#navbar");
        if (data.data) {
            navbar.innerHTML += `<button id="logout" onclick="logout()" type="button" class="btn btn-primary">Logout</button>`;
            return data.data;
        }
        navbar.innerHTML += `<button id="login" onclick="window['login']();" type="button" class="btn btn-primary">Login</button>`;
        return null;
    };
}
