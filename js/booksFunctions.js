//import { fillCatagoryFilters, fillAuthorFilters, fillPriceFilters } from './filters.js';
//import { fillPriceSort, fillAuthorSort, fillTitleSort } from './sorters.js';
let books;

export async function start() {
  books = await (await fetch("/json/books.json")).json();

  displayBooks(books);

  fillCatagoryFilters(books);
  fillAuthorFilters(books);
  fillPriceFilters();

  fillSorts();

  filterAndSortBooks();

  /*document.addEventListener('DOMContainerLoaded', filterAndSortBooks);
  document.addEventListener('DOMContainerLoaded', fillCatagoryFilters);
  document.addEventListener('DOMContainerLoaded', fillAuthorFilters);
  document.addEventListener('DOMContainerLoaded', fillPriceFilters);
  
  document.addEventListener('DOMContainerLoaded', fillSorts);*/
}

function filterAndSortBooks() {
  const categoryFilter = document.querySelector("#category-filter").value;
  const priceFilter = document.querySelector("#price-filter").value;
  const authorFilter = document.querySelector("#author-filter").value;
  const allSort = document.querySelector("#all-sorts").value;

  let filteredCataBooks = books.filter((book) => {
    if (categoryFilter !== "all" && book.catagory !== categoryFilter) {
      return false;
    }

    if (priceFilter !== "all") {
      const priceRange = priceFilter.split("-");
      if (book.price < priceRange[0] || book.price > priceRange[1]) {
        return false;
      }
    }

    if (authorFilter !== "all" && book.author !== authorFilter) {
      return false;
    }
    // book passes all filters
    return true;
  });

  let sortedBooks = filteredCataBooks.slice();
  if (allSort === "titleAscending") {
    sortedBooks.sort((a, b) => (a.title > b.title ? 1 : -1));
  } else if (allSort === "titleDescending") {
    sortedBooks.sort((a, b) => (a.title < b.title ? 1 : -1));
  } else if (allSort === "priceAscending") {
    console.log(sortedBooks);
    sortedBooks.sort((a, b) => a.price - b.price);
  } else if (allSort === "priceDescending") {
    sortedBooks.sort((a, b) => b.price - a.price);
  } else if (allSort === "authorAscending") {
    sortedBooks.sort((a, b) => (a.author > b.author ? 1 : -1));
  } else if (allSort === "authorDescending") {
    sortedBooks.sort((a, b) => (a.author < b.author ? 1 : -1));
  }

  displayBooks(sortedBooks);
}

function displayBooks(booksToShow) {
  const shopRow = document.querySelector("#shop-row");
  let shopRowContents = ``;
  for (let i = 0; i < booksToShow.length; i++) {
    shopRowContents += `
      <div class="book-col col-5 col-sm-4 col-lg-3 col-xxl-3">
        <div class="book align-self-stretch border border-primary p-2 mb-2 rounded-2 border-opacity-15">    
          <img class="object-fit-cover photo mb-4 border rounded-4 border-dark-subtle"
            src="https://source.unsplash.com/random/?books">
          <section class="title text-wrap text-break">
            <a class="overflow-hide fw-semibold" href="/description">${booksToShow[i].title}</a>
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
      </div>`;
  }
  shopRow.innerHTML = shopRowContents;
}

export function fillCatagoryFilters(books) {
  const catagorySet = new Set();

  for (let i = 0; i < books.length; i++) {
    catagorySet.add(books[i].catagory);
  }
  let bookCatagories = `<option value="all">All</option>`;
  catagorySet.forEach(function (value) {
    bookCatagories += `
        <option value="${value}">${value}</option>`;
  });
  const categoryFilter = document.querySelector("#category-filter");
  categoryFilter.innerHTML = bookCatagories;
  categoryFilter.addEventListener("change", filterAndSortBooks);
}

export function fillAuthorFilters(books) {
  const authorSet = new Set();
  for (let i = 0; i < books.length; i++) {
    authorSet.add(books[i].author);
  }
  let bookAuthors = `<option value="all">All</option>`;
  authorSet.forEach(function (value) {
    bookAuthors += `
        <option value="${value}">${value}</option>`;
  });
  const authorFilter = document.querySelector("#author-filter");
  authorFilter.innerHTML = bookAuthors;
  authorFilter.addEventListener("change", filterAndSortBooks);
}

export function fillPriceFilters() {
  let bookPrice = `<option value="all">All</option>`;
  bookPrice += `
      <option value="$0-150">$0 - $150</option>
      <option value="150-300">$150 - $300</option>
      <option value="300-500">$300 - $500</option>
      <option value="500-2000">$500 - $2000</option>`;
  const priceFilter = document.querySelector("#price-filter");
  priceFilter.innerHTML = bookPrice;
  priceFilter.addEventListener("change", filterAndSortBooks);
}

export function fillSorts() {
  let insideSort = `
        <option value="priceAscending">Price ascending</option>
        <option value="priceDescending">Price descending</option>
        <option value="authorAscending">Author ascending</option>
        <option value="authorDescending">Author descending</option>
        <option value="titleAscending">Title ascending</option>
        <option value="titleDescending">Title descending</option>`;
  const allSort = document.querySelector("#all-sorts");
  allSort.innerHTML = insideSort;
  allSort.addEventListener("change", filterAndSortBooks);
}
