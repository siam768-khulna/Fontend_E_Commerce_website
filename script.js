// 1️⃣ Navbar Toggle for Mobile
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.toggle('active'); // CSS এ .active লেখা থাকতে হবে
    });
}

// 2️⃣ Remove Product from Cart
const removeButtons = document.querySelectorAll('#cart .fa-trash-alt');

removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        row.remove();
        updateTotal();
    });
});

// 3️⃣ Quantity Change
const qtyInputs = document.querySelectorAll('#cart input[type="number"]');

qtyInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        const qty = parseInt(e.target.value);
        if (qty < 1) {
            e.target.value = 1;
        }
        updateSubtotal(e.target);
        updateTotal();
    });
});

// Update Subtotal of a single row
function updateSubtotal(input) {
    const row = input.closest('tr');
    const priceText = row.querySelector('td:nth-child(4)').innerText;
    const price = parseFloat(priceText.replace('BDT ', ''));
    const subtotalCell = row.querySelector('td:nth-child(6)');
    subtotalCell.innerText = 'BDT ' + (price * input.value);
}

// Update Cart Total
function updateTotal() {
    const subtotalCells = document.querySelectorAll('#cart tbody tr td:nth-child(6)');
    let total = 0;
    subtotalCells.forEach(cell => {
        total += parseFloat(cell.innerText.replace('BDT ', ''));
    });

    document.querySelector('#subtotal table tr:nth-child(1) td:nth-child(2)').innerText = 'BDT ' + total;
    document.querySelector('#subtotal table tr:nth-child(3) td:nth-child(2)').innerText = 'BDT ' + total;
}

// 4️⃣ Apply Coupon (Optional, Basic Static)
const couponBtn = document.querySelector('#coupon button');
couponBtn.addEventListener('click', () => {
    const input = document.querySelector('#coupon input').value.trim();
    let totalCell = document.querySelector('#subtotal table tr:nth-child(3) td:nth-child(2)');
    let subtotalCell = document.querySelector('#subtotal table tr:nth-child(1) td:nth-child(2)');
    let subtotal = parseFloat(subtotalCell.innerText.replace('BDT ', ''));

    if (input === 'SAVE10') {
        let discount = subtotal * 0.10;
        let newTotal = subtotal - discount;
        totalCell.innerText = 'BDT ' + newTotal.toFixed(2);
        alert('Coupon applied! 10% discount.');
    } else {
        alert('Invalid coupon code.');
    }
});

