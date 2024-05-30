import { showCharacterCard } from "../helpers/characterCard.js"
import { createCharacter } from "../helpers/createCharacter.js"

window["showCharacterCard"] = showCharacterCard
window["createCharacter"] = createCharacter

const displayArea = document.querySelector(".display-area")

window.addEventListener("load", async (e) => {
    const user = await getUserInfo()
    loadUserInfo(user)
    const storybooks = await getStorybookByUserId()
    loadStorybooks(storybooks)
})

async function getUserInfo() {
    const res = await fetch("../user")
    const data = (await res.json()).data
    return data
}

function loadUserInfo(user) {
    document.querySelector(".user-name").innerHTML = user.username
    document.querySelector(".email").innerHTML = user.email
    document.getElementsByName("username")[0].value = user.username
    document.getElementsByName("email")[0].value = user.email
    document.querySelector(".edit-user-info").addEventListener("submit",editUserInfo)
    document.querySelector(".edit-password").addEventListener("submit",changePassword)
}

async function getcharacter() {
    const res = await fetch("../characters")
    const data = (await res.json()).data
    return data
}

function loadCharacter(charactersData) {

    displayArea.innerHTML = `<div class="create-character card" onclick="createCharacter()">Create Character</div>`

    for (let character of charactersData) {
        displayArea.innerHTML +=
            `
        <div class="card border character" onclick="showCharacterCard(${character.id})">
            <div class="character-img">
                <img src="../uploads/characterImg/${character.image}" alt="">
            </div>
            <div class="character-name">${character.name}</div>
        </div>
            `
    }
}

async function getStorybookByUserId() {
    const res = await fetch("/user-storybooks")
    const data = (await res.json()).data
    return data
}

function loadStorybooks(storybooksData) {
    displayArea.innerHTML = `<div class="create-storybook card">Create Storybook</div>`
    for (let storybook of storybooksData) {
        displayArea.innerHTML += `
        <div class="book card border" onclick="bookReader(${storybook.id})" >
                <div class="book-img border">img</div>
                <div class="book-detail border">
                    <div class="book-title">${storybook.bookname}</div>
                    <div class="suitable-age">${storybook.target_age} years old</div>
                </div>
        </div>
        `
    }
}

async function loadLikes() {
    const res = await fetch("../like")
    const data = (await res.json()).data
    return data
}

function displayLikes(likesData) {
    displayArea.innerHTML = ""
    for (let like of likesData) {
        displayArea.innerHTML += `
        <div class="like card border" onclick="bookReader(${like.id})" >
            <div class="book-img border">img</div>
            <div class="book-detail border">
                <div class="book-title">${like.bookname}</div>
                <div class="suitable-age">${like.target_age} years old</div>
            </div>    
        </div>
            `
    }
}

document.querySelectorAll(".collection div").forEach((selection) => {
    selection.addEventListener("click", async (e) => {
        const selectedDiv = document.querySelector(".selected")
        let target = e.target.classList.value
        if (target == "storybooks") {
            selectedDiv.style.left = "43px"
            selectedDiv.style.width = "130px"
            const storybooks = await getStorybookByUserId()
            loadStorybooks(storybooks)
            return
        }
        if (target == "characters") {
            selectedDiv.style.left = "213px"
            selectedDiv.style.width = "130px"
            const characters = await getcharacter()
            loadCharacter(characters)
            return
        }
        if (target == "likes") {
            selectedDiv.style.left = "375px"
            selectedDiv.style.width = "70px"
            const likes = await loadLikes()
            displayLikes(likes)
            return
        }
    })
})

async function editUserInfo(e){
    e.preventDefault()
    let username = e.target.username.value
    const res = await fetch('/username', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ username }),
    })
    const data = await res.json()
    const editUserMessage = document.querySelector(".edit-user-message")
    if(res.ok){
        editUserMessage.style.color = "green"
        editUserMessage.innerHTML = data.message
    }
}

async function changePassword(e){
    e.preventDefault()
    const orginalPassword = e.target.originalPassword.value
    const newPassword = e.target.newPassword.value
    const confirmPassword = e.target.confirmPassword.value

    const res = await fetch('/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ orginalPassword, newPassword, confirmPassword }),
    })
    const data = await res.json()
    const passwordMessage = document.querySelector(".password-message")
    if (res.ok) {
        passwordMessage.style.color = "green"
        passwordMessage.innerHTML = data.message
        return
    }
    passwordMessage.style.color = "red"
    passwordMessage.innerHTML = data.message
}