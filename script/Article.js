const artAPI_URL = 'https://sprint-mission-api.vercel.app/articles';

async function getArticleList({ page = 1, pageSize = 10, keyword = '' }) {
  const params = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });

  const url = `${artAPI_URL}?${params.toString()}`;  // 수정됨

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const data = await response.json();
    console.log('받은 기사 목록:', data); 
    return data;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return [];
  }
}

function renderMainArticle(article) {
  const box = document.getElementById('article-box');
  box.innerHTML = `
    <h3>${article.title}</h3>
    <p>${article.content}</p>
  `;
}

getArticleList({ page: 1, pageSize: 5 }).then(articles => {
  if (articles.length > 0) {
    renderArticleList(articles); 
  } else {
    document.getElementById('article-box').innerText = '기사가 없습니다.';
  }
});


async function getArticle(id) {
  const url = `${artAPI_URL}/${id}`; 

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`서버 오류: ${response.status}`);
    const article = await response.json();
    return article;
  } catch (error) {
    console.error('단일 기사 불러오기 오류:', error);
    return null;
  }
}

function renderArticleList(articles) {
  const list = document.getElementById('article-list');
  list.innerHTML = '';

  articles.forEach(article => {
    const div = document.createElement('div');
    div.className = 'article-item';

    div.innerHTML = `<strong class="article-title">${article.title}</strong>`;
    
    div.addEventListener('click', () => {
      getArticle(article.id).then(renderMainArticle);
    });

    list.appendChild(div);
  });
}




