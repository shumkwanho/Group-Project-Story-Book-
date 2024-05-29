const characterCardModal = new bootstrap.Modal(document.getElementById('characterCardModal'), {});

const characterContentBody = document.querySelector("#character-content-body");
const characterContentHeader = document.querySelector(".character-content-header");
const deleteBtn = document.querySelector(".delete-btn");
const createStoryWithCharacterBtn = document.querySelector(".create-story-with-character-btn");

export async function showCharacterCard(characterId) {

    const characterData = await getCharacterData(characterId)
    const characterName = characterData[0].name;
    const characterImage = characterData[0].image

    characterContentHeader.innerHTML = `Character Name: ${characterName}`
    characterContentBody.innerHTML = `<img src="../uploads/characterImg/${characterImage}" alt="${characterName}">`

    characterCardModal.show()

    deleteBtn.addEventListener('click', () => {
        deleteCharacter(characterId)
        //TODO: add confirmation pop up
        window.location.reload()
    })

    createStoryWithCharacterBtn.addEventListener('click', () => {
        createStoryWithCharacter(characterId)
    })
}

async function getCharacterData(id) {
    let res = await fetch(`/character?id=${id}`, {
        method: 'GET',
    })

    if (res.ok) {
        let response = await res.json()
        return response.data
    }
}

async function deleteCharacter(id) {
    let res = await fetch(`/character?id=${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (res.ok) {
        let response = await res.json()
        return response.data
    }
}

function createStoryWithCharacter(id) {
    //TODO
}