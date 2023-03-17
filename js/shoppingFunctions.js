
export function addToCart(event) {
    let btn = event.target.closest('.buybtn');
    let parent = btn.parentElement.parentElement
    let bookName = parent.querySelector('.name').innerText
    let price = parent.querySelector('.price').innerText
    addItemToCart(bookName, price)
    updateSubtotalTotal()
}

function addItemToCart(title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.querySelector('.cart-items')
    let cartItemNames = cartItems.getElementsByClassName('book-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column text-wrap text-break " style="width: 140px">
            <span class="book-name">${title}</span>
        </div>
        <span class="book-price cart-column">${price}</span>
        <div class="book-amount cart-column">
            <input class="book-amount-input" type="number" value="1">
        </div>
        <span class="book-subTotal cart-column"></span>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.querySelector('.book-amount-input').addEventListener('change', changeAmount)
}

function changeAmount(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateSubtotalTotal()
}

function updateSubtotalTotal() {
    let cartItemContainer = document.querySelector('.cart-items')
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    let subTotal = 0
    for (var i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.querySelector('.book-price')
        let amountElement = cartRow.querySelector('.book-amount-input')
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let amount = amountElement.value
        subTotal = price * amount
        total = total + (price * amount)
    }
    total = Math.round(total * 100) / 100
    subTotal = Math.round(subTotal * 100) / 100
    document.querySelector('.total').innerText = '$' + total
    document.querySelector('.book-subTotal').innerText = '$' + subTotal
}