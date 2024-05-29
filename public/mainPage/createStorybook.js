const createNewStoryModal = new bootstrap.Modal(document.getElementById('createNewStoryModal'), {});

const characterSelection = document.querySelector("#new-storybook-character")

export async function createStorybook(characterId = -1) {

    //TODO: if no character is created under this user, prompt user to create a character

    const characterData = await loadCharacters()

    for (let data of characterData) {
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