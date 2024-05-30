import { getCharacterData } from "./characterCard.js";

const createNewStoryModal = new bootstrap.Modal(document.getElementById('createNewStoryModal'), {});

const characterImage = document.querySelector(".new-story-character-image")
const characterSelection = document.querySelector("#new-storybook-character")

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

    //TODO: show image in card when selected

    createNewStoryModal.show();

    document.querySelector("#new-storybook-form")
        .addEventListener('submit', async (e) => {
            e.preventDefault();

            const characterId = characterSelection.value;
            const category = document.querySelector("#new-storybook-category").value;
            const targetAge = document.querySelector("#new-storybook-target-age").value;
            const totalPage = document.querySelector("#new-storybook-total-page").value;

            document.querySelector("#new-storybook-submit-btn").setAttribute("disabled", "");
            document.querySelector("#create-storybook-footer")
                .insertAdjacentHTML(
                    "afterbegin",
                    `<i class="fa-solid fa-spinner fa-spin-pulse" style="color: #74C0FC;"></i>`
                )

            let res = await fetch('/storybook', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ characterId, category, targetAge, totalPage })
            })

            let result = await res.json()

            if (res.ok) {
                //create storybook successful
                //TODO: better user experience
                window.location.reload();
            } else {
                console.log(result);
            }
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