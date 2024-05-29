import { bookReader } from "../mainPage/bookReader.js";


const createComment = document.querySelector("#create-comment")
const commentArea = document.querySelector(".comment-area")

var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

// console.log(id)

window["bookReader"] = bookReader;
window["editComment"]= editComment;
window["deleteComment"]= deleteComment;
window["confirmEdit"]= confirmEdit;

async function getStoryBook (id) {
    let res = await fetch(`/storybookByid?id=${id}`)
    let response = await res.json()
    if(res.ok){
        let target = document.querySelector(".upper-part");
            target.innerHTML += `
            <img src="" alt="" class="book-cover border">
            <div class="book-detail border ">
                <div class="book-name border">${response.data[0].bookname}</div>
                <div class="author border">Author</div>
                <div class="description border">${response.data[0].description}</div>
            </div>
            <div class="function border">
                <button id="read" type="button" class="btn btn-primary" onclick="bookReader(${id})">Read Now</button>
            </div>
            `
        }
        console.log()
    }
getStoryBook(id)


window.addEventListener("load", async (e) => {
    const userId = await checkLogin()
    await loadComment()
    if (userId) {
        await loadBtn()
    }
})

const loadBookInfo = async () => {
    const res = await fetch("/")
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
        return data.data
    }
    navbar.innerHTML += `<button id="login" type="button" class="btn btn-primary" onclick=login()>Login</button>`
    return null
}


const login = () => {
    window.location.href = "../login"
}

const logout = async () => {
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
        body: JSON.stringify({ content,commentId }),
    })
    if (res.ok) {
        window.location.reload()
    }
}