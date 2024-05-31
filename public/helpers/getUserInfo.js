export async function getUserInfo() {
    const res = await fetch("../user")
    const data = (await res.json()).data
    return data
}