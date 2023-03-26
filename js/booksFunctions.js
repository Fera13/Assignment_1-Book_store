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
  let randNum = 1;
  for (let i = 0; i < booksToShow.length; i++) {
    const randomNumber = Math.random();
    shopRowContents += `
      <div class="book-col col-6 col-sm-4 col-lg-3 col-xxl-2">
        <div class="book align-self-stretch border border-primary p-2 mb-2 rounded-2 border-opacity-15">    
          <img class="image object-fit-cover photo mb-4 border rounded-4 border-dark-subtle"
            src="https://source.unsplash.com/random/?book&${randNum}">
          <section>
            <button class="buybtn justify-content-center rounded border-primary border-opacity-15">Buy</button>
          <section>
          <section class="title">
            <a class="bookTitle fw-semibold" href="/description">${booksToShow[i].title}</a>
          </section>
          <section class="author">
            <span> Author: ${booksToShow[i].author}</span>
          </section>
          <section class="price">
            <span> Price: ${booksToShow[i].price}$</span>
          </section>
          <section class="catagory">
            <span> Catagory: ${booksToShow[i].catagory}</span>
          </section>
        </div>
      </div>`;
    randNum += 1;
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

export function titleClicked(event) {
  event.preventDefault();
  const button = event.target;
  const randomNumber = Math.random();

  const bookSelected = button.parentElement.parentElement.parentElement;
  const title = bookSelected.querySelector(".bookTitle").innerText;
  const price = bookSelected.querySelector(".price").innerText;
  const author = bookSelected.querySelector(".author").innerText;
  const catagory = bookSelected.querySelector(".catagory").innerText;
  const description = getDescription(title);

  const infoPut = document.querySelector("#book-info");
  const descriptionPut = document.querySelector("#description");
  const imagePut = document.querySelector(".dec-image");

  //const decContents = `<h4 class="fw-bold text-wrap" id="title">${title}</h4>${author}<br>${catagory}<br>${price}`;
  const fill = `
                  <div class="des-box align-self-stretch border border-primary p-2 mb-2 rounded-2 border-opacity-15">
                    <section>
                      <button class="buybtn justify-content-center rounded border-primary border-opacity-15">Buy</button>
                    <section>
                    <section class="title fw-semibold">
                      ${title}
                    </section>
                    <section class="author">
                      <span> ${author}</span>
                    </section>
                    <section class="catagory">
                      <span> ${catagory}</span>
                    </section>
                    <section class="price">
                      <span> ${price}</span>
                    </section>
                  </div>`;
  const descriptionContents = `<h3>Description</h3> ${description} `;
  let image = `https://source.unsplash.com/random/?book&${randomNumber}`;

  descriptionPut.innerHTML = descriptionContents;
  infoPut.innerHTML = fill;
  imagePut.setAttribute("src", image);
}

function getDescription(titleToFind) {
  const foundBook = books
    .filter((book) => book.title === titleToFind)
    .find((book) => book);
  return foundBook.description;
}
