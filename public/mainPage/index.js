const searchBar = document.querySelector(".search-bar")
window.addEventListener("load", async (e) => {
    await loadCharacters()
    await loadStorybooks()
})

searchBar.addEventListener("input", async (e) => {
    const value = e.target.value

    const res = await fetch('./searchBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ value }), // Specify the Request Body
    })
})

const loadCharacters = async () => {
    const res = await fetch("./character")
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

const loadStorybooks = async () => {
    const res = await fetch("./storybook")
    const data = (await res.json()).data
    const storybookArea = document.querySelector(".storybook-area")
    for (let storybook of data) {
        storybookArea.innerHTML +=
            `<div class="book border" id="storybook_${storybook.id}">
                <i class="fa-regular fa-heart like-btn"></i>
                <div class="book-img border">img</div>
                <div class="book-title">${storybook.bookname}</div>
                <div class="book-description">${storybook.description}</div>
                <div class="suitable-age">${storybook.target_age} years old</div>
            </div>`
    }

    const likeBtns = document.querySelectorAll(".like-btn").forEach((likeBtn) => {
        likeBtn.addEventListener("click", (e) => {
            likeBtn.classList.toggle('fa-regular')
            likeBtn.classList.toggle('fa-solid')

            if (likeBtn.classList.contains('fa-solid')) {
                console.log("good");
                //update like table
            } else {
                console.log("bad")
                //update like table
            }
        })
    })
}