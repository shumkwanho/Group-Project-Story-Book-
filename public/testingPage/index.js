const form = document.querySelector("form")

// form.addEventListener("submit", async (e) => {
//     e.preventDefault()

//     const form = e.target
//     const formData = new FormData(form)
//     formData.append("userId", "1",)
//     formData.append("characterName", "pikachu",)
//     const res = await fetch('http://localhost:8080/character', {
//         method: 'POST',
//         body: formData,
//     })
// })


form.addEventListener("submit",async (e) =>{
    e.preventDefault()

    const form = e.target
    let req = {
        characterName: form.characterName.value,
        description: form.description.value
    }

    const res = await fetch('http://localhost:8080/character/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        body: JSON.stringify(req),
    })
})