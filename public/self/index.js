window.addEventListener("load", async (e) => {
    const user = await getUserInfo()
    console.log(user);
    loadUserInfo(user)
    await getcharacter()
})

async function getUserInfo() {
    const res = await fetch("../user")
    const data = (await res.json()).data
    return data
}

function loadUserInfo(user) {
    document.querySelector(".user-name").innerHTML = user.username
}

async function getcharacter() {
    const res = await fetch("../character")
    const data = (await res.json()).data
    console.log(data);
    return data
}

