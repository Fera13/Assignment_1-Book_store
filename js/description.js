function startDescription(event) {
  const button = event.target;
  const book = button.parentElement.parentElement;
  const title = book.querySelector(".bookTitle").innerText;
  const price = book.querySelector(".price").innerText;
  const author = book.querySelector(".author").innerText;
  const catagory = book.querySelector(".catagory").innerText;
  const imageSrc = book.querySelector(".image").src;
  
}
