import Request from "./request.js";

const search = document.getElementById('search');
const sub = document.getElementById('sub');
const listBox = document.getElementById('list');
const btnList = document.getElementById('btnlist');

const param = new URLSearchParams(window.location.search);

let pageNumber = +param.get('page') * 10;
pageNumber = pageNumber ? pageNumber : 10;
const pageTitle = param.get('title');

const request = new Request({
    baseURL: 'https://newsapi.org/v2/everything',
    headers: {
        "Content-type": "application/json",
        'x-api-key': 'a350fa8dbaee4df9a4b9494e4f57c9fd'
    }
});

const getNews = async (title) => {
    const res = await request.get(`?q=${title}`);
    createBoxList(res.articles);
}
if (pageTitle) getNews(pageTitle);


sub.addEventListener('click', () => {
    window.location.href = `index.html?page=1` + `&title=${search.value}`;
});


function createBoxList(list) {
    listBox.innerHTML = "";
    const boxs = list.slice(pageNumber - 10, pageNumber).map(item => createBox(item));
    listBox.append(...boxs);
    pagination(list.length);
}

function createBox(item) {
    const section = document.createElement('section');
    section.classList = 'box';
    section.innerHTML = `
        <figure><img src="${item.urlToImage}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${item.title}</h2>
            <p>${item.description}</p>
            <div class="card-actions justify-end">
                <span>${item.publishedAt}</span>
            </div>
        </div>`
    return section;
}

function pagination(number) {
    const p = pageNumber / 10;
    number = Math.ceil(number / 10);
    btnList.innerHTML = "";
    for (let i = 1; i <= number; i++) {
        const button = document.createElement('a');
        button.href = `index.html?page=${i}` + `&title=${pageTitle}`;
        button.classList = `btn ${p === i ? 'btn-active' : ""}`;
        button.innerHTML = i;
        btnList.append(button);
    }
}