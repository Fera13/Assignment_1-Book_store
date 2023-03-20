import { fillCatagoryFilters, fillAuthorFilters, fillPriceFilters } from './filters.js';

let books;

export async function start() {
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    books = await (await fetch('/json/books.json')).json();
    filterBooks()
    displayBooks(books);
    fillCatagoryFilters(books)
    fillAuthorFilters(books)
    fillPriceFilters()

    const categoryFilter = document.querySelector('#category-filter');
    const priceFilter = document.querySelector('#price-filter');
    const authorFilter = document.querySelector('#author-filter');
    
    categoryFilter.addEventListener('change', filterBooks);
    priceFilter.addEventListener('change', filterBooks);
    authorFilter.addEventListener('change', filterBooks);
  }
}

function filterBooks() {
  const categoryFilter = document.querySelector('#category-filter').value;
  const priceFilter = document.querySelector('#price-filter').value;
  const authorFilter = document.querySelector('#author-filter').value;
  
  let filteredBooks = books.filter(book => {
    // filter by category
    if (categoryFilter !== 'all' && book.catagory !== categoryFilter) {
      return false;
    }
    // filter by price
    if (priceFilter !== 'all') {
      const priceRange = priceFilter.split('-');
      if (book.price < priceRange[0] || book.price > priceRange[1]) {
        return false;
      }
    }
    // filter by author
    if (authorFilter !== 'all' && book.author !== authorFilter) {
      return false;
    }
    // book passes all filters
    return true;
  });
  displayBooks(filteredBooks);
}

function displayBooks(booksToShow) {
  console.log(booksToShow)
  let shopRowContents = ``;
  for (let i = 0; i < booksToShow.length; i++) {
    shopRowContents += `
      <div class="book-col col-5 col-sm-4 col-lg-3 col-xxl-2">
        <div class="book align-self-stretch border border-primary p-2 mb-2 rounded-2 border-opacity-15">    
          <img class="object-fit-cover photo mb-4 border rounded-4 border-dark-subtle"
            src="https://source.unsplash.com/random/?books">
          <section class="title text-wrap text-break">
            <a href="/description">${booksToShow[i].title}<a>
          </section>
          <section class="author">
            <span> Author: ${booksToShow[i].author}</span>
          </section>
          <section class="price">
            <span> Price: ${booksToShow[i].price}$</span>
          </section>
          <section class="catagory">
            <span> Catagory: ${booksToShow[i].catagory}</span>
            <button class="buybtn rounded float-end border-primary border-opacity-15">Buy</button>
          </section>
        </div>
      </div>`
  }
  document.querySelector('.shop-row').innerHTML = shopRowContents
}