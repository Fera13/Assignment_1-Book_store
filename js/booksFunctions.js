let books;

export async function start() {
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    books = await (await fetch('/json/books.json')).json();
    displayAllBooks();
  }
  
}

function displayAllBooks() {
  let shopRowContents = ``;
  for (let i = 0; i < books.length; i++) {
    shopRowContents += `
      <div class="book-col col-5 col-sm-4 col-lg-3 col-xxl-2">
        <div class="book align-self-stretch border border-primary p-2 mb-2 rounded-2 border-opacity-15">    
          <img class="object-fit-cover photo mb-4 border rounded-4 border-dark-subtle"
            src="https://source.unsplash.com/random/?books">
          <section class="title text-wrap text-break">
            <a href="/description">${books[i].title}<a>
          </section>
          <section class="author">
            <span> Author: ${books[i].author}</span>
          </section>
          <section class="price">
            <span> Price: ${books[i].price}$</span>
          </section>
          <section class="catagory">
            <span> Catagory: ${books[i].catagory}</span>
            <button class="buybtn rounded float-end border-primary border-opacity-15">Buy</button>
          </section>
        </div>
      </div>`
  }
  document.querySelector('.shop-row').innerHTML = shopRowContents
}