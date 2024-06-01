import { createStorybook } from '../helpers/createStorybook.js';
import { login } from '../helpers/login.js';
import { register } from '../helpers/register.js';
import { convertDisplayAge } from '../helpers/convertDisplayAge.js';
import { getUserInfo, checkIsMember, hasFirstAttempt } from '../helpers/auth.js';

const storybookArea = document.querySelector(".storybook-area")

window["logout"] = logout;
window["login"] = login;
window["toggleLike"] = toggleLike;
window["register"] = register;
window["createStorybook"] = createStorybook;
window["requirePayment"] = requirePayment
window["toBookPage"] = toBookPage

window.addEventListener("load", async (e) => {
    const userId = await checkLogin();
    const data = await getAllStorybook();
    loadStorybooks(data);
    const bookTypeData = await storybookType();
    loadFilter(bookTypeData);
    if (!userId) {
        return
    }
    await displayLike();
});

const loadStorybooks = (data) => {

    storybookArea.innerHTML = ""    //only showing public books
    for (let storybook of data) {
        if (storybook.is_public === true) {
            
            let displayAge = convertDisplayAge(storybook.target_age);
            
            storybookArea.innerHTML +=
                `<div class="book border" id="book_${storybook.id}" onclick="window.location.href ='../book/?id=${storybook.id}'">
                <img src="../../uploads/pageImg/${storybook.image}" class="book-img border">
                <div class="book-title"><p class="p2">${storybook.bookname}</p></div>
                <div class="suitable-age"><p class="p2">Age: ${displayAge}</p></div>          
                <img src="./img/icons/${randomNum(12)}.png" class="image1 style="width: 3px ;height: 3px;">
            </div>`
        }
    }
}

async function getAllStorybook() {
    const res = await fetch("../storybooks")
    const response = await res.json()

    if (res.ok) {
        return response.data
    } else {
        console.log("error")
    }
}

async function toggleLike(e, bookId) {
    e.stopPropagation()
    e.target.classList.toggle('fa-regular')
    e.target.classList.toggle('fa-solid')
    const isLiked = e.target.classList.contains('fa-solid')
    if (isLiked) {
        const res = await fetch('../like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({ bookId }),
        })
        return
    }

    const res = await fetch('../dislike', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ bookId }),
    })
    return
}

const displayLike = async () => {
    const res = await fetch("../like")
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
            book.innerHTML += `<i class="fa-solid fa-heart like-btn" style="color: #efad5c;" onclick=toggleLike(event,${bookId})></i>`
            continue
        }
        book.innerHTML += `<i class="fa-regular fa-heart like-btn" style="color: #efad5c;" onclick=toggleLike(event,${bookId})></i>`
    }
}

const checkLogin = async () => {
    const res = await fetch("/checkLogin")
    const data = await res.json()

    if (data.data) {
        const userInfo = await getUserInfo()
        document.querySelector("#username-display").innerHTML = userInfo.username;

        const isMember = await checkIsMember()
        const isAttemped = await hasFirstAttempt()
        const ableToCreateStorybook = !isAttemped || isMember

        if (ableToCreateStorybook) {
            document.querySelector(".create-storybook").setAttribute(
                "onclick",
                "createStorybook()"
            )
        } else {
            document.querySelector(".create-storybook").setAttribute(
                "onclick",
                "requirePayment()"
            )
        }

        document.querySelector("#user-page-redirect").classList.toggle("hide")
        document.querySelector("#logout").classList.toggle("hide")
        document.querySelector(".search-bar").addEventListener("input", search)
        
        document.querySelector("#user-page-redirect")
            .addEventListener("click", () => {
                window.location.href = '../member';
            });

        return data.data
    }

    document.querySelector("#login").classList.toggle("hide")
    document.querySelector("#register").classList.toggle("hide")

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
    const res = await fetch('../search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ search }),
    })
    const data = (await res.json()).data

    for (let book of data) {
        console.log(book);
        let bookname = book.bookname.replace(search, `<b>${search}</b>`)

        searchResult.innerHTML += `
        <div class="search-result border">
            <div class="book-detail" onclick="toBookPage(${book.id})">
                <div class="search-bookname">${bookname}</div>
            </div>
            <img src="../../uploads/pageImg/${book.image}" alt="" class="search-image">
        </div>
        `
    }
}

async function logout() {
    const res = await fetch("../logout")
    const data = await res.json()
    window.location.reload()
}

async function storybookType() {
    const res = await fetch("../booktype")
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
            let displayAge = convertDisplayAge(list[type][i][type])
            filterForm.innerHTML += `
            <div class="option">
                <label class="type">${type == "total_page" ? list[type][i][type] + " Pages" : type == "target_age" ? "Age " + displayAge : list[type][i][type]}</label>
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
    const res = await fetch('../filter', {
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
    const res = await fetch('../sort', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ category }),
    })

    const data = (await res.json()).data
    loadStorybooks(data)
}

function randomNum(num) {
    return Math.floor(Math.random() * num)
}

function requirePayment(e) {
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'), {});
    paymentModal.show()

}

function toBookPage(bookId) {
    window.location.href = `../book/?id=${bookId}`
}

document.addEventListener("click", (e) => {
    const searchResult = document.querySelector(".search-result-container")
    const searchBar = document.querySelector(".search-bar")

    let isClickTargetArea = document.activeElement === searchBar || document.activeElement === searchResult
    let isDisplaying = !searchResult.classList.contains("hide")

    if (isDisplaying && !isClickTargetArea) {
        searchResult.classList.add("hide")
        searchBar.value = ""
    }
})

// document.addEventListener("click", (e) => {
//     const toggleFilter = Array.from(document.querySelectorAll(".toggle-filter"))
//     const option = Array.from(document.querySelectorAll(".option"))
//     const filterList = document.querySelectorAll(".filter-list")
//     //display ture when click outside
//     const clickOutside = e.target in toggleFilter == false && e.target in option == false
//     filterList.forEach((list) => {
//         if (!list.classList.contains("hide")) {
//             if (clickOutside) {
//                 list.classList.add("hide")
//             }
//         }
//     })
// })