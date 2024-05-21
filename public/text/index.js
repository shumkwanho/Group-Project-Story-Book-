const form = document.querySelector("form")
console.log(form);
form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    formData.append("userId", "1",)
    formData.append("characterName", "pikachu",)
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    const res = await fetch('http://localhost:8080/character', {
        method: 'POST',
        body: formData,
    })
})