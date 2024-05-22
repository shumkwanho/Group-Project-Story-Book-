window.addEventListener("load", async (e) => {
    await loadCharacters()
    await loadStorybooks()
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

const loadStorybooks = async() => {
    const res = await fetch("./storybook")
    const data = (await res.json()).data
    const storybookArea = document.querySelector(".storybook-area")
    for (let storybook of data){

        storybookArea.innerHTML +=
            `<div class="book border" id="storybook_${storybook.id}">
                <div class="book-img border">img</div>
                <div class="book-title">${storybook.bookname}</div>
                <div class="book-description">${storybook.description}</div>
                <div class="suitable-age">${storybook.target_age} years old</div>
            </div>`
    }
}