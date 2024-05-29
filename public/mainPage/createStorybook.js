const createNewStoryModal = new bootstrap.Modal(document.getElementById('createNewStoryModal'), {});

const characterSelection = document.querySelector("#new-storybook-character")

export function createStorybook(characterId = -1) {

    createNewStoryModal.show();

}

async function loadCharacters() {
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