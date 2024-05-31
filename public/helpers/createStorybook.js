import { getCharacterData } from "./getCharacterData.js";
import { bookReader } from "./bookReader.js";

window["bookReader"] = bookReader

const createNewStoryModal = new bootstrap.Modal(document.getElementById('createNewStoryModal'), {});

const characterImage = document.querySelector(".new-story-character-image")
const characterSelection = document.querySelector("#new-storybook-character")
const createStatus = document.querySelector(".create-story-book-status")
const createDoneStatus = document.querySelector(".create-story-book-done-status")
const createInProgressIcon = document.getElementById("create-story-book-in-progress-icon")
const createDoneIcon = document.getElementById("create-story-book-done-icon")
const createStorybookFooter = document.querySelector("#create-storybook-footer")

characterSelection.setAttribute("onchange", 'displayCharacterImage(this.value)')

window["displayCharacterImage"] = displayCharacterImage

export async function createStorybook(characterId = -1) {

    //TODO: if no character is created under this user, prompt user to create a character

    const characterData = await loadCharacters()

    let hasDisplayFirstCharacterImage = false;
    for (let data of characterData) {
        if (!hasDisplayFirstCharacterImage) {
            displayCharacterImage(data.id);
            hasDisplayFirstCharacterImage = true;
        }
        characterSelection.insertAdjacentHTML(
            "beforeend",
            `<option value="${data.id}">${data.name}</option>`
        )
    }

    createNewStoryModal.show();

    document.querySelector("#new-storybook-form")
        .addEventListener('submit', async (e) => {
            e.preventDefault();

            const characterId = characterSelection.value;
            const category = document.querySelector("#new-storybook-category").value;
            const targetAge = document.querySelector("#new-storybook-target-age").value;
            const totalPage = document.querySelector("#new-storybook-total-page").value;

            document.querySelector("#new-storybook-submit-btn").setAttribute("disabled", "");

            generateStoryPlot(characterId, category, targetAge, totalPage)
        })
}

async function loadCharacters() {
    const res = await fetch("/characters")
    let result = await res.json()
    return result.data;
}

async function displayCharacterImage (id) {
    let characterData = await getCharacterData(id)

    characterImage.innerHTML = `<img src="../uploads/characterImg/${characterData[0].image}" id="character-image">`
}

async function generateStoryPlot(characterId, category, targetAge, totalPage) {
    createInProgressIcon.classList.toggle("hidden");
    createStatus.innerHTML = "Generating Plots ... "

    let res = await fetch("/storybook-plot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ characterId, category, targetAge, totalPage }),
    });

    let result = await res.json()

    if (res.ok) {
        createDoneStatus.innerHTML = "Plots Completed! "

        let storybookContentJSON = result.data.plot
        let storybookId = result.data.id

        for (let page = 1; page <= totalPage; page++) {
            await generatePage(characterId, storybookContentJSON, storybookId, page)
        }

        createStatus.innerHTML = ""
        createStatus.innerHTML = "All Done!"
        createInProgressIcon.classList.toggle("hidden")
        createDoneIcon.classList.toggle("hidden")
        createStorybookFooter.insertAdjacentHTML(
            'beforeend',
            `<button class="btn btn-primary" id="read-now-btn" onclick="bookReader(${storybookId})">Read Now</button>`
        )

    } else {
        console.log(result);
    }
}

async function generatePage(characterId, storybookContentJSON, storybookId, pageNumber) {

    let storybookContentJSONStr = JSON.stringify(storybookContentJSON)
    
    createStatus.innerHTML = `Now Generating Page ${pageNumber} ... `

    let res = await fetch("/page", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ characterId, storybookContentJSONStr, storybookId, pageNumber }),
    });

    let result = await res.json();

    if (res.ok) {
        createDoneStatus.innerHTML = `Page ${pageNumber} Completed! `
    } else {
        console.log(result);
    }
}