const Api_Key= "53440d0495c04a41a9e39049feeae1d6";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews("India"));
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${Api_Key}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}
function reload(){
    window.location.reload();
}
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');
    cardsContainer.innerHTML='';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillData(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillData(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    });
}
let curr=null;
function onNav(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curr?.classList.remove('active');
    curr=navItem;
    curr.classList.add('active')
}
const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');
searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curr?.classList.remove('active');
    curr=null;
})