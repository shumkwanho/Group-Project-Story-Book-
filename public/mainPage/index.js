import { createStorybook } from '../helpers/createStorybook.js';
import { bookReader } from '../helpers/bookReader.js'

import { login } from './login.js';
import { register } from './register.js';

window["logout"] = logout;
window["login"] = login;
window["toggleLike"] = toggleLike;
window["closeForm"] = closeForm;

window["createStorybook"] = createStorybook;
window["bookReader"] = bookReader;

window.addEventListener("load", async (e) => {
    const userId = await checkLogin();
    // await loadCharacters();
    // await loadCharacters();
    const data = await getAllStorybook();
    loadStorybooks(data);
    const bookTypeData = await storybookType();
    loadFilter(bookTypeData);
    if (userId) {
        await displayLike();
    }
});

// const loadCharacters = async () => {
//     const res = await fetch("/characters")
//     const data = (await res.json()).data
//     const characterArea = document.querySelector(".character-area")
//     for (let character of data) {
//         characterArea.innerHTML +=
//             `<div class="character border" id="character_${character.id}" onclick="showCharacterCard(${character.id})">
//                 <div class="character-image">image</div>
//                 <div class="character-name">${character.name}</div>
//             </div>`
//     }
// }

const loadStorybooks = (data) => {
    const storybookArea = document.querySelector(".storybook-area")

    //TODO: only show when logged in
    storybookArea.innerHTML = `   
    <div class="create-storybook border" style="width:300px; height: 800px;" onclick="createStorybook()">
        <img src="./img/readbook.png" class="border img-fluid w-100 h-100" >
        
        <p class="textAbsolute">Create Story Book</p>
    </div>`

    //TODO: show public books when logged out
    for (let storybook of data) {
        storybookArea.innerHTML +=
            `<div class="book border" id="book_${storybook.id}" onclick= "window.location.href ='../book/?id=${storybook.id}'">
                <div class="book-img border">img</div>
                <div class="book-title"><p class="p2">${storybook.bookname}</p></div>
                <div class="book-description"><p class="p2">${storybook.description}</p></div>
                <div class="suitable-age"><p class="p2">${storybook.target_age} years old</p></div>
                <img src="./img/tiger.png" class="image1 style="width: 3px ;height: 3px;">
            </div>`
    }
}
async function getAllStorybook() {
    const res = await fetch("/storybooks")
    const response = await res.json()

    if (res.ok) {
        return response.data
    } else {
        console.log("error")
    }
}

async function toggleLike(e, bookId) {

    e.target.classList.toggle('fa-regular')
    e.target.classList.toggle('fa-solid')
    const isLiked = e.target.classList.contains('fa-solid')
    if (isLiked) {
        const res = await fetch('/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({ bookId }),
        })
        return
    }

    const res = await fetch('/dislike', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ bookId }),
    })
    return
}

const displayLike = async () => {
    const res = await fetch("/like")
    const data = (await res.json()).data
    const bookIds = data.map(elem => elem.id)
    const books = document.querySelectorAll(".book")
    for (let book of books) {
        if (book.classList.contains("create-storybook")) {
            continue
        }
        const bookId = parseInt(book.id.slice(5, 7))
        const isLiked = bookIds.includes(bookId)
        if (isLiked) {
            book.innerHTML += `<i class="fa-solid fa-heart like-btn" onclick=toggleLike(event,${bookId})></i>`
            continue
        }
        book.innerHTML += `<i class="fa-regular fa-heart like-btn" onclick=toggleLike(event,${bookId})></i>`
    }
}

const checkLogin = async () => {
    const res = await fetch("/checkLogin")
    const data = await res.json()
    const navbar = document.querySelector(".navbar")
    if (data.data) {
        navbar.innerHTML += `<button id="logout" onclick="logout()" type="button" class="btn btn-primary" >Logout</button>`
        document.querySelector(".search-bar").addEventListener("input", search)
        return data.data
    }
    navbar.innerHTML += `
        <button id="login" onclick=login() type="button" class="btn btn-primary">Login</button>
        <button id="register" onclick="register()" type="button" class="btn btn-primary">Register</button>
        `
    document.querySelector(".search-bar").addEventListener("input", search)
    return null
}

async function search(e) {

    const searchResult = document.querySelector(".search-result-container")
    searchResult.innerHTML = ""
    const search = e.target.value
    if (search.length == 0) {
        searchResult.classList.add("hide")
        return
    }
    searchResult.classList.remove("hide")
    const res = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ search }),
    })
    const data = (await res.json()).data
    for (let book of data) {
        let bookname = book.bookname.replace(search, `<b>${search}</b>`)
        let description = book.description.replace(search, `<b>${search}</b>`)
        searchResult.innerHTML += `
        <div class="search-result border">
            <div class="book-detail" onclick=>
                <div class="search-bookname">${bookname}</div>
                <div class="search-book-description">${description}</div>
            </div>
            <img src="" alt="" class="search-image">
        </div>
        `
    }
}

async function logout() {
    const res = await fetch("/logout")
    const data = await res.json()
    window.location.reload()
}

async function storybookType() {
    const res = await fetch("/booktype")
    const data = (await res.json()).data
    return data
}

function loadFilter(list) {
    for (let type in list) {
        if (type == "all") {
            continue
        }
        const filterForm = document.querySelector(`.filter-${type}`)
        filterForm.innerHTML += `
        <div class="option">
            <label class="type">All</label>
            <input type="checkbox" name="all" value="filter-all">
        </div>
        `
        for (let i = 0; i < list[type].length; i++) {
            filterForm.innerHTML += `
            <div class="option">
                <label class="type">${type == "total_page" ? list[type][i][type] + " Pages" : type == "target_age" ? "Age " + list[type][i][type] : list[type][i][type]}</label>
                <input type="checkbox" name="${type}" value="${list[type][i][type]}">
            </div>
            `
        }
        filterForm.innerHTML += `<input type="submit">`
    }
    const selectAllBtns = document.querySelectorAll("input[name=all]").forEach((btn) => {
        btn.addEventListener("click", selectAll)
    })
    const filterForms = document.querySelectorAll(".filter").forEach((form) => {
        form.addEventListener("submit", submitFilterForm)
    })
}

function selectAll(e) {
    const targetForm = e.target.parentElement.parentElement
    const category = targetForm.classList[0].slice(7)
    const checkboxes = Array.from(document.getElementsByName(category))
    for (let checkbox of checkboxes) {
        if (e.target.checked) {
            checkbox.checked = true
            continue
        }
        checkbox.checked = false
    }
}

document.querySelectorAll(".toggle-filter").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        btn.parentElement.querySelector("div").classList.toggle("hide")
        e.stopPropagation()
    })
})

async function submitFilterForm(e) {
    e.preventDefault()

    if (e.target.all.checked) {
        const data = await getAllStorybook()
        loadStorybooks(data)
        return
    }
    const submitTarget = e.target.querySelector("label").id
    const checkboxes = Array.from(document.getElementsByName(submitTarget))
    const condition = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    let obj = { key: submitTarget, condition }
    if (!obj.condition[0]) {
        return
    }
    const res = await fetch('/filter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ obj }),
    })
    const data = (await res.json()).data
    await loadStorybooks(data)
}

document.querySelector("#sort").addEventListener("change", sort)

async function sort(e) {
    const category = e.target.value
    if (category == "") {
        return
    }
    const res = await fetch('/sort', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ category }),
    })

    const data = (await res.json()).data
    loadStorybooks(data)
}