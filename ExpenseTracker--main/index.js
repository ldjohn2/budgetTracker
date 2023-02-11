const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

/* const dumtrans = [
  { id: 1, text: 'flower', amount: -20 },
  { id: 1, text: 'salary', amount: 300 },
  { id: 1, text: 'book', amount: -10 },
  { id: 1, text: 'camera', amount: 150 }
] */

const localStorageTrans = JSON.parse(localStorage.getItem('trans'))

let trans = localStorage.getItem('trans') != null
  ? localStorageTrans : []

// add trans

function addTrans (e) {
  e.preventDefault()

  if (text.value === '' || amount.value === '') {
    alert('please add text and amount')
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value
    }
    trans.push(transaction)
    addTransDom(trans)
    updateVaules()
    updateLocalStorage()
    text.vaule = ''
    amount.vaule = ''
  }
}
// geneate id
function generateId () {
  return Math.floor(Math.random() * 1000)
}

// add trans to dom list
function addTransDom (trans) {
  // getsign
  const sign = trans.amount < 0 ? '-' : '+'

  const item = document.createElement('li')

  // add class based on vaule
  item.classList.add(trans.amount < 0 ? 'minus' : 'plus')
  item.innerHTML = `
    ${trans.text} <span>${sign}${Math.abs(trans.amount)} 
    </span> <button class='delete-btn' onclick='removeTrans(${trans.id})'>X</button>
  `
  list.appendChild(item)
}

// update balance income and expense
function updateVaules () {
  const amount = trans.map(trans => trans.amount)

  const total = amount.reduce((acc, item) => (acc += item), 0)
    .toFixed(2)
  const income = amount
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)

  const expense = amount
    .filter(item => item < 0)
    .reduce((acc, item) => (acc -= item), 0)
    .toFixed(2)

  balance.innerHTML = `${total} `
  money_plus.innerHTML = `${income}`
  money_minus.innerHTML = `${expense}`
}

// remove trans by id
function removeTrans (id) {
  trans = trans.filter(trans => trans.id !== id)
  updateLocalStorage()
  init()
}
// update local storage transaction
function updateLocalStorage () {
  localStorage.setItem(trans, JSON.stringify(trans))
}

// init app
function init () {
  list.innerHTML = ''
  trans.forEach(addTransDom)
  updateVaules()
}
init()

form.addEventListener('submit', addTrans)
