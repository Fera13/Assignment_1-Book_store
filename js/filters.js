export function fillCatagoryFilters(books) {
  const catagorySet = new Set();
  for (let i = 0; i < books.length; i++) {
    catagorySet.add(books[i].catagory);
  }
  let bookCatagories = `<option id="all">All</option>`
  catagorySet.forEach(function(value) {
    bookCatagories += `
        <option id="${value}">${value}</option>`
  });
  document.querySelector('#category-filter').innerHTML = bookCatagories
}

export function fillAuthorFilters(books) {
  const authorSet = new Set();
  for (let i = 0; i < books.length; i++) {
    authorSet.add(books[i].author);
  }
  let bookAuthors = `<option id="all">All</option>`
  authorSet.forEach(function(value) {
    bookAuthors += `
        <option id="${value}">${value}</option>`
  });
  document.querySelector('#author-filter').innerHTML = bookAuthors
}

export function fillPriceFilters() {
  let bookPrice = `<option id="all">All</option>`
  bookPrice += `
      <option id="$0-$150">$0 - $150</option>
      <option id="$150-$300">$150 - $300</option>
      <option id="$300-$500">$300 - $500</option>
      <option id="$500-$2000">$500 - $2000</option>`
  document.querySelector('#price-filter').innerHTML = bookPrice
}