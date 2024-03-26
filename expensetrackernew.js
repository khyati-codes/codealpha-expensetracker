const balance = document.getElementById("Balance");

const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("Text");
const amount = document.getElementById("Amount");

let Transaction = [];

//add transaction

function addTransaction(e) {
  e.preventDefault();
  console.log(text.value);
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please Enter Text And Values");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    Transaction.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

//generate id
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

function addTransactionDOM(transaction) {
  console.log(transaction);
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add;
  transaction.amount < 0 ? "minus" : "plus";

  item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;

  list.appendChild(item);
}

//remove transaction
function removeTransaction(id) {
  Transaction = Transaction.filter((transaction) => transaction.id !== id);
  Init();
}

//update updatevalue
function updateValues() {
  // e.preventDefault();
  console.log("Hello Transaction" + Transaction[0].amount);
  const amounts = Transaction.map((transaction) => transaction.amount);

  console.log("Amounts" + amounts);
  const total = amounts.reduce((acc, val) => acc + val, 0);
  console.log("Sum of all the    values: " + total);
  // const total = amounts.reduce((acc, item) => (acc += item), 0).tofixed(2);
  // var total = 0;
  // const newTotal = amounts.map((amount) => {
  //   total += amount;
  // });
  // console.log(newTotal);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) *
    -1;

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//init app
function Init() {
  list.innerHTML = "";
  Transaction.forEach(addTransactionDOM);
  updateValues();
}

form.addEventListener("submit", addTransaction);

Init();