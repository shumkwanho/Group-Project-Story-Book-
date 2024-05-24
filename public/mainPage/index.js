import { bookReader } from './bookReader.js';
window["logout"] = logout;
window["login"] = login;
window["toggleLike"] = toggleLike;

const searchBar = document.querySelector(".search-bar")

window.addEventListener("load", async (e) => {
    const userId = await checkLogin()
    await loadCharacters()
    await loadStorybooks()
    if (userId) {
        await displayLike()
    }
})

searchBar.addEventListener("input", async (e) => {
    const value = e.target.value

    const res = await fetch('/searchBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ value }),
    })
})

const loadCharacters = async () => {
    const res = await fetch("/character")
    const data = (await res.json()).data
    const characterArea = document.querySelector(".character-area")
    for (let character of data) {
        characterArea.innerHTML +=
            `<div class="character border" id="character_${character.id}">
                <div class="character-image">image</div>
                <div class="character-name">${character.name}</div>
            </div>`
    }
}

window["bookReader"] = bookReader;

const loadStorybooks = async (userId = null) => {
    const res = await fetch("/storybooks")
    const data = (await res.json()).data
    const storybookArea = document.querySelector(".storybook-area")
    for (let storybook of data) {
        storybookArea.innerHTML +=
            `<div class="book border" id="book_${storybook.id}" onclick="bookReader(${storybook.id})">
                <div class="book-img border">img</div>
                <div class="book-title">${storybook.bookname}</div>
                <div class="book-description">${storybook.description}</div>
                <div class="suitable-age">${storybook.target_age} years old</div>
            </div>`
    }
}


async function toggleLike (e, bookId) {

    e.target.classList.toggle('fa-regular')
    e.target.classList.toggle('fa-solid')
    const isLiked = e.target.classList.contains('fa-solid')
    if (isLiked) {
        const res = await fetch('/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({bookId }),
        })
        console.log("liked");
        return
    }

    const res = await fetch('/dislike', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({bookId }),
    })
    console.log("disliked");
    return
}

const displayLike = async () => {
    const res = await fetch("/like")
    const data = (await res.json()).data
    const bookIds = data.map(elem => elem.storybook_id)
    const books = document.querySelectorAll(".book")
    for (let book of books){
        if (book.classList.contains("create-storybook")) {
            continue
        }
        const bookId = book.id.slice(5,7)
        const isLiked = bookIds.includes(bookId)
        if(isLiked){
            book.innerHTML+=`<i class="fa-solid fa-heart like-btn" onclick=toggleLike(event,${bookId})></i>`
            continue
        }
        book.innerHTML+=`<i class="fa-regular fa-heart like-btn" onclick=toggleLike(event,${bookId})></i>`
    }
}

const checkLogin = async () => {
    const res = await fetch("/checkLogin")
    const data = await res.json()
    const navbar = document.querySelector("#navbar")
    if (data.data) {
        navbar.innerHTML += `<button id="logout" onclick="logout()" type="button" class="btn btn-primary" >Logout</button>`
        return data.data
    }
    navbar.innerHTML += `<button id="login" onclick=login() type="button" class="btn btn-primary">Login</button>`
    return null
}

function login () {
    window.location.href = "../login"
}

async function logout (){
    const res = await fetch("/logout")
    const data = await res.json()
    console.log(data);
    window.location.reload()
}

