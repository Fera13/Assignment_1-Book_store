
export function addToCart(event) {
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        let btn = event.target.closest('.buybtn');
        let parent = btn.parentElement.parentElement.parentElement
        let bookName = parent.querySelector('.title').innerText
        console.log(bookName)
        let price = parent.querySelector('.price').innerText
        price = price.replace('$', '')
        price = price.replace('Price: ', '')
        console.log(price)
        let numPrice = parseFloat(price)
        console.log(numPrice)
        addItemToCart(bookName, numPrice)
        updateSubtotalTotal()
    }
}

function addItemToCart(title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.querySelector('.cart-items')
    let cartItemNames = cartItems.getElementsByClassName('book-name')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column text-wrap text-break" style="width: 140px">
            <span class="book-name">${title}</span>
        </div>
        <span class="book-price cart-column">${price}$</span>
        <div class="book-amount cart-column">
            <input class="book-amount-input" type="number" value="1">
        </div>
        <span class="book-subTotal cart-column">${price}$</span>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    updateSubtotalTotal()
    cartRow.querySelector('.book-amount-input').addEventListener('change', changeAmount)
    
}

function changeAmount(event) {
    let input = event.target
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
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.querySelector('.book-price')
        let amountElement = cartRow.querySelector('.book-amount-input')
        let subTotalElement = cartRow.querySelector('.book-subTotal')
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let amount = amountElement.value
        let itemSubTotal = price * amount
        subTotal = subTotal + itemSubTotal
        subTotalElement.innerText = '$' + itemSubTotal.toFixed(2)
    }
    total = Math.round(subTotal * 100) / 100
    document.querySelector('.total').innerText = '$' + total.toFixed(2)
}