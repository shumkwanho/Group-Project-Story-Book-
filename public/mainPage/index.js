import { bookReader } from './bookReader.js';
import { login } from './login.js';
import { register } from './register.js';
window["logout"] = logout;
window["toggleLike"] = toggleLike;

login();
register();
const searchBar = document.querySelector(".search-bar")

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

const loadStorybooks = (data) => {
    const storybookArea = document.querySelector(".storybook-area")
    storybookArea.innerHTML = `   
    <div class="book create-storybook border">
        <div>Create Story Book</div>
    </div>`
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
async function getAllStorybook(){
    const res = await fetch("/storybooks")
    const data = (await res.json()).data
    return data
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
        console.log("liked");
        return
    }

    const res = await fetch('/dislike', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ bookId }),
    })
    console.log("disliked");
    return
}

const displayLike = async () => {
    const res = await fetch("/like")
    const data = (await res.json()).data
    const bookIds = data.map(elem => elem.storybook_id)
    const books = document.querySelectorAll(".book")
    for (let book of books) {
        if (book.classList.contains("create-storybook")) {
            continue
        }
        const bookId = book.id.slice(5, 7)
        const isLiked = bookIds.includes(bookId)
        if (isLiked) {
            book.innerHTML += `<i class="fa-solid fa-heart like-btn" onclick=toggleLike(event,${bookId})></i>`
            continue
        }
        book.innerHTML += `<i class="fa-regular fa-heart like-btn" onclick=toggleLike(event,${bookId})></i>`
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
            <span class="count">${list.all}</span>
        </div>
        `
        for (let i = 0; i < list[type].length; i++) {
            filterForm.innerHTML += `
            <div class="option">
                <label class="type">${type == "total_page" ? list[type][i][type] + " Pages" : type == "target_age" ? "Age "+list[type][i][type] : list[type][i][type]}</label>
                <input type="checkbox" name="${type}" value="${list[type][i][type]}">
                <span class="count">${list[type][i].count}</span>
            </div>
            `
        }
        filterForm.innerHTML += `<input type="submit">`
    }
    const selectAllBtns = document.querySelectorAll(".all").forEach((btn)=>{
        btn.addEventListener("change",selectAll)
    })
    const filterForms = document.querySelectorAll(".filter").forEach((form) => {
        form.addEventListener("submit", submitFilterForm)
    })
}

function selectAll(e){}

async function submitFilterForm(e) {
    e.preventDefault()
    if (e.target.all.checked) {
        const data = await getAllStorybook()
        loadStorybooks(data)
        return
    }
    const submitTarget = e.target.classList[1].slice(7)
    const checkboxes = Array.from(document.getElementsByName(submitTarget))
    const condition = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    let obj = {key:submitTarget, condition}
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




document.querySelector("#sort").addEventListener("change",sort)

async function sort(e) {
    const category = e.target.value
    if(category == ""){
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
