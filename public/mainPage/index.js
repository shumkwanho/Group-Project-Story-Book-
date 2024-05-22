window.addEventListener("load", async (e) => {
    await loadCharacters()
})

const loadCharacters = async () => {
    const res = await fetch("./character")
    const data = (await res.json()).data
    console.log(data);
}

const loadBooks = () => {

}