import { bookReader } from "../helpers/bookReader.js";
import { login } from "../helpers/login.js";
import { register } from "../helpers/register.js";
import { getUserInfo } from "../helpers/auth.js";

const createComment = document.querySelector("#create-comment")
const commentArea = document.querySelector(".comment-area")

var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

window["bookReader"] = bookReader;
window["editComment"] = editComment;
window["deleteComment"] = deleteComment;
window["confirmEdit"] = confirmEdit;
window["login"] = login
window["register"] = register
window["logout"] = logout
window["search"] = search
window["toBookPage"] = toBookPage
window["toggleLike"] = toggleLike;

window.addEventListener("load", async (e) => {
    const userId = await checkLogin()
    await getStoryBook(id)
    await loadComment()
    if (userId) {
        await loadBtn()
    }
})

async function getStoryBook(id) {
    let res = await fetch(`/storybookByid?id=${id}`)
    let data = (await res.json()).data
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
                <button id="read" type="button" class="btn btn-primary btn-lg" data-bs-toggle="button" onclick="bookReader(${id})">
                <img src="./img/stars.gif" style="width: 50px; height: 30px;" alt="grc">Read Now
                </button>
            </div>
            `
    }
}

async function toggleLike(e, bookId) {
    e.stopPropagation()
    e.target.classList.toggle('fa-regular')
    e.target.classList.toggle('fa-solid')
    const isLiked = e.target.classList.contains('fa-solid')
    let likeCount = document.querySelector(".like-count")
    if (isLiked) {
        likeCount.innerHTML = parseInt(likeCount.innerHTML) + 1
        const res = await fetch('../like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({ bookId }),
        })

        return
    }
    likeCount.innerHTML = parseInt(likeCount.innerHTML) - 1
    const res = await fetch('../dislike', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ bookId }),
    })
    return
}


const loadComment = async () => {
    const res = await fetch(`/comment?id=${id}`)
    const data = (await res.json()).data
    for (let comment of data) {
        const date = comment.updated_at.slice(0, 10)
        commentArea.innerHTML += `
        <div class="comment-container" id="comment_${comment.id}">
            <div class="comment">
                <div class="comment-detail">
                    <div class="user">${comment.username ? comment.username : "Anonymous"}</div>
                    <div class="comment-content">${comment.content}</div>
                </div>
                <div class="created-at">${date}</div>
            </div>
        </div>`
    }
}

const checkLogin = async () => {
    const res = await fetch("/checkLogin")
    const data = await res.json()

    if (data.data) {

        const userInfo = await getUserInfo()

        console.log(userInfo)

        document.querySelector("#username-display").innerHTML = userInfo.username;

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

    // const likeRes = await fetch("../like")
    // const likeData = (
    //     await likeRes.json()).data.map(
    //         elem => elem.id
    //     )
    // const isLiked = likeData.includes(parseInt(id))
    
    // document.querySelector(".function").innerHTML += `
    //         <div class="like-container">
    //             <i class="fa-${isLiked ? "solid" : "regular"} fa-heart like-btn" style="color: #9ECDFF;" onclick=toggleLike(event,${id})></i>
    //             <span class="like-count">${data.likeCount}</span>
    //         </div>`

    return null
}

async function search(e) {
    console.log(e.target.value);
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

async function logout() {
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

async function loadBtn() {
    const res = await fetch("/comment-user")
    const data = (await res.json()).data
    const commentIds = data.map(e => e.id)
    for (let id of commentIds) {
        document.querySelector(`#comment_${id}`).innerHTML += `
        <div class="btn-group">
            <div id="editComment" onclick=editComment(${id})> <i class="fa-solid fa-pen" style="color: #48A0FF;"></i> </div>
            <div id="deleteComment" onclick=deleteComment(${id})> <i class="fa-solid fa-trash" style="color: #48A0FF;"></i> </div>
        </div>
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