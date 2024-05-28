import { bookReader } from './bookReader.js';
import { showCharacterCard } from './showCharacterCard.js';

import { login } from './login.js';
import { register } from './register.js';
window["logout"] = logout;
window["toggleLike"] = toggleLike;

window["showCharacterCard"] = showCharacterCard;
window["bookReader"] = bookReader;

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
    const res = await fetch("/characters")
    const data = (await res.json()).data
    const characterArea = document.querySelector(".character-area")
    for (let character of data) {
        characterArea.innerHTML +=
            `<div class="character border" id="character_${character.id}" onclick="showCharacterCard(${character.id})">
                <div class="character-image">image</div>
                <div class="character-name">${character.name}</div>
            </div>`
    }
}

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
async function getAllStorybook() {
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
            <!--<span class="count">${list.all}</span>-->
        </div>
        `
        for (let i = 0; i < list[type].length; i++) {
            filterForm.innerHTML += `
            <div class="option">
                <label class="type">${type == "total_page" ? list[type][i][type] + " Pages" : type == "target_age" ? "Age " + list[type][i][type] : list[type][i][type]}</label>
                <input type="checkbox" name="${type}" value="${list[type][i][type]}">
                <!--<span class="count">${list[type][i].count}</span>-->
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

document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        btn.querySelector("div").classList.toggle("hide")
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

document.querySelector('#new-character-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault()

        const name = document.querySelector("#new-character-name").value;
        const speciesType = document.querySelector("#new-character-species-type").value;
        const gender = document.querySelector("#character-preference-gender").value;
        const age = document.querySelector("#character-preference-age").value;
        const bodyShape = document.querySelector("#character-preference-body-shape").value;
        const heightSize = document.querySelector("#character-preference-height-size").value;

        document.querySelector("#new-character-submit-btn").setAttribute("disabled", "");
        document.querySelector("#new-character-content-footer")
            .insertAdjacentHTML(
                "afterbegin", 
                `<i class="fa-solid fa-spinner fa-spin-pulse" style="color: #74C0FC;"></i>`
            )

        let res = await fetch('/character', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, speciesType, gender, age, bodyShape, heightSize })
        })

        let result = await res.json()

        if (res.ok) {
            //create character successful
            //TODO: better user experience
            window.location.reload();
        } else {
            console.log(result);
        }
    })

    const sourceStr = 'I learned to play the Ukulele in Lebanon.';
    const searchStr = 'le';
    const indexes = [...sourceStr.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
    console.log(indexes);