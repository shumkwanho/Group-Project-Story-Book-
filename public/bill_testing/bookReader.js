console.log("hello reader page")

//hardcode storybookId for testing
let storybookId = 2;

const storybookContentBody = document.querySelector("#storybook-content-body");
const storybookContentHeader = document.querySelector(".storybook-content-header");
const nextPageBtn = document.querySelector(".next-page-btn");

async function main() {

    let currentPage = 0;

    const storybookData = await getStorybookData(storybookId)
    const coverData = storybookData.cover[0]
    const pagesData = storybookData.pages

    printCover(coverData)

    nextPageBtn.addEventListener("click", () => {
        currentPage++
    
        if (currentPage <= coverData.total_page) {
            printPage(pagesData, currentPage)
        } else {
            printEndPage()
        }
    })
}


async function getStorybookData(storybookId) {
    let res = await fetch (`http://localhost:8080/storybook?id=${storybookId}`, {
        method: 'GET',
    })

    if (res.ok) {
        let response = await res.json()
        return response.data
    }
}

async function printCover(coverData) {
    storybookContentHeader.innerHTML = `Book Name: ${coverData.bookname}`;

    storybookContentBody.innerHTML = 
    `
    <p>Book Description: ${coverData.description}</p>
    <p>Category: ${coverData.category}</p>
    <p>Main Character: ${coverData.character_name}</p>
    <p>Target Age:  ${coverData.target_age}</p>
    `
}

async function printPage(pagesData, currentPage) {
    let currentPageData = pagesData[currentPage - 1]

    storybookContentBody.innerHTML = 
    `
    <img src="../../uploads/${currentPageData.image}" height="360" width="640">
    <p>${currentPageData.caption}</p>
    <p>Page ${currentPage} / ${pagesData.length}</p>
    `
}

async function printEndPage() {
    storybookContentBody.innerHTML = 
    `
    <p>Story Book End</p>
    `
}

main()