import { bookReader } from "../helpers/bookReader.js";


const createComment = document.querySelector("#create-comment")
const commentArea = document.querySelector(".comment-area")

var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

window["bookReader"] = bookReader;
window["editComment"] = editComment;
window["deleteComment"] = deleteComment;
window["confirmEdit"] = confirmEdit;
window["logout"] = logout
window["search"] = search
window["toBookPage"] = toBookPage

window.addEventListener("load", async (e) => {
    const userId = await checkLogin()
    await getStoryBook(id)
    await loadComment()
    if (userId) {
        await loadBtn(userId)
    }
})



async function getStoryBook(id) {
    let res = await fetch(`/storybookByid?id=${id}`)
    let data = (await res.json()).data[0]
    console.log(data);
    if (res.ok) {
        let target = document.querySelector(".upper-part");
        target.innerHTML += `
            <img src="../../uploads/pageImg/${data.image}" alt="" class="book-cover border">
            <div class="book-detail">
                <div class="book-name">Book Name:  <h class="textcolor"> ${data.bookname}</h></div>
                <div class="author">Author By:</div>
                <div class="description">About Story: <h class="textcolor">${data.description}</h></div>
            </div>
            <div class="function">
                
                <button id="read" type="button" class="btn btn-primary btn-lg" data-bs-toggle="button" onclick="bookReader(${id})"> <img src="./img/stars.gif" style="width: 50px; height: 30px; alt="grc">Read Now</button>
            </div>
            `
    }
}

const loadComment = async () => {
    const res = await fetch(`/comment?id=${id}`)
    const data = (await res.json()).data
    for (let comment of data) {
        const date = comment.updated_at.slice(0, 10)
        commentArea.innerHTML += `
        <div class="comment-container border" id="comment_${comment.id}">
            <div class="comment-detail">
                <div class="user">${comment.username ? comment.username : "Anonymous"}</div>
                <div class="comment">${comment.content}</div>
            </div>
            <div class="created-at">${date}</div>
        </div>`
    }
}

const checkLogin = async () => {
    const res = await fetch("/checkLogin")
    const data = await res.json()
    const navbar = document.querySelector("#navbar")
    if (data.data) {
        navbar.innerHTML += `<button id="logout" type="button" class="btn btn-primary" onclick=logout()>Logout</button>`
        document.querySelector(".search-bar").addEventListener("input", search)
        return data.data
    }
    navbar.innerHTML += `<button id="login" type="button" class="btn btn-primary" onclick=login()>Login</button>`
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

function toBookPage(bookId) {
    window.location.href = `../book/?id=${bookId}`
}

async function logout ()  {
    const res = await fetch("/logout")
    const data = await res.json()
    window.location.reload()
}

createComment.addEventListener("click", async (e) => {
    const newComment = document.querySelector("#new-comment").value
    const res = await fetch('/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ newComment }),
    })
    if (res.ok) {
        window.location.reload()
    }
})

async function loadBtn(userId) {
    const res = await fetch("/comment-user")
    const data = (await res.json()).data
    const commentIds = data.map(e => e.id)
    for (let id of commentIds) {
        document.querySelector(`#comment_${id}`).innerHTML += `
        <button id="read" type="button" onclick=deleteComment(${id}) class="btn btn-primary">Delete </button>
        <button id="read" type="button" onclick=editComment(${id}) class="btn btn-primary">Edit </button>
        `
    }
}

async function deleteComment(commentId) {
    const res = await fetch('/comment', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ commentId }),
    })
    const data = await res.json()
    if (res.ok) {
        window.location.reload()
    }
}

function editComment(commentId) {
    const targetComment = document.querySelector(`#comment_${commentId}`)
    const content = targetComment.querySelector(".comment").innerHTML
    targetComment.innerHTML = `
        <textarea cols="85">${content}</textarea>
        <button type="button" onclick=confirmEdit(event,${commentId}) class="btn btn-primary">Confirm</button>
    `


}

async function confirmEdit(event, commentId) {
    const comment = event.target.parentElement
    const content = comment.querySelector("textarea").value
    const res = await fetch('/comment', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ content, commentId }),
    })
    if (res.ok) {
        window.location.reload()
    }
}