export function fillCatagoryFilters(books) {
  const catagorySet = new Set();
  for (let i = 0; i < books.length; i++) {
    catagorySet.add(books[i].catagory);
  }
  let bookCatagories = `<option value="all">All</option>`
  catagorySet.forEach(function(value) {
    bookCatagories += `
        <option value="${value}">${value}</option>`
  });
  document.querySelector('#category-filter').innerHTML = bookCatagories
}

export function fillAuthorFilters(books) {
  const authorSet = new Set();
  for (let i = 0; i < books.length; i++) {
    authorSet.add(books[i].author);
  }
  let bookAuthors = `<option value="all">All</option>`
  authorSet.forEach(function(value) {
    bookAuthors += `
        <option value="${value}">${value}</option>`
  });
  document.querySelector('#author-filter').innerHTML = bookAuthors
}

export function fillPriceFilters() {
  let bookPrice = `<option value="all">All</option>`
  bookPrice += `
      <option value="$0-150">$0 - $150</option>
      <option value="150-300">$150 - $300</option>
      <option value="300-500">$300 - $500</option>
      <option value="500-2000">$500 - $2000</option>`
  document.querySelector('#price-filter').innerHTML = bookPrice
}