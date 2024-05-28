const readerModal = new bootstrap.Modal(document.getElementById('readerModal'), {});

const storybookContentBody = document.querySelector("#storybook-content-body");
const storybookContentHeader = document.querySelector(".storybook-content-header");
const nextPageBtn = document.querySelector(".next-page-btn");
const prevPageBtn = document.querySelector(".prev-page-btn");

export async function bookReader(storybookId) {

    const storybookData = await getStorybookData(storybookId)
    const coverData = storybookData.cover[0]
    const pagesData = storybookData.pages

    readerModal.show();

    let currentPage = 0;

    runBookReader(currentPage, coverData, pagesData)


    nextPageBtn.addEventListener("click", () => {
        currentPage++
        runBookReader(currentPage, coverData, pagesData);
    })


    prevPageBtn.addEventListener("click", () => {
        currentPage--
        runBookReader(currentPage, coverData, pagesData);
    })


    function runBookReader(page, coverData, pagesData) {
        const totalPage = parseInt(coverData.total_page);

        if (page === 0) {
            printCover(coverData)
            prevPageBtn.setAttribute("disabled", "")
            return;
        }

        if (page <= totalPage && page > 0) {
            printPage(pagesData, page)
            prevPageBtn.removeAttribute("disabled")
            nextPageBtn.removeAttribute("disabled")
            return;
        }

        if (page === totalPage + 1) {
            printEndPage()
            nextPageBtn.setAttribute("disabled", "")
            return;
        }
    }
}

async function getStorybookData(id) {
    let res = await fetch(`/storybook?id=${storybookId}`, {
        method: 'GET',
    })

    if (res.ok) {
        let response = await res.json()
        return response.data
    }
}

function printCover(coverData) {
    storybookContentHeader.innerHTML = `Book Name: ${coverData.bookname}`;

    storybookContentBody.innerHTML =
        `
<p>Book Description: ${coverData.description}</p>
<p>Category: ${coverData.category}</p>
<p>Main Character: ${coverData.character_name}</p>
<p>Target Age:  ${coverData.target_age}</p>
`
}

function printPage(pagesData, page) {
    let currentPageData = pagesData[page - 1]

    storybookContentBody.innerHTML =
        `
<img src="../../uploads/pageImg/${currentPageData.image}" height="360" width="640">
<p>${currentPageData.caption}</p>
<p>Page ${page} / ${pagesData.length}</p>
`
}


function printEndPage() {
    storybookContentBody.innerHTML =
        `
<p>Story Book End</p>
`
}