let friends = [];
let expenses = [];

function addFriend() {
  let name = document.getElementById("friendName").value;
  if (name === "") return;

  friends.push(name);
  document.getElementById("friendName").value = "";

  renderFriends();
  updateDropdown();
}

function renderFriends() {
  let list = document.getElementById("friendList");
  list.innerHTML = "";

  friends.forEach(f => {
    let li = document.createElement("li");
    li.textContent = f;
    list.appendChild(li);
  });
}

function updateDropdown() {
  let select = document.getElementById("paidBy");
  select.innerHTML = "";

  friends.forEach(f => {
    let option = document.createElement("option");
    option.value = f;
    option.textContent = f;
    select.appendChild(option);
  });
}

function addExpense() {
  let desc = document.getElementById("desc").value;
  let amount = parseFloat(document.getElementById("amount").value);
  let paidBy = document.getElementById("paidBy").value;

  if (!desc || !amount) return;

  expenses.push({ desc, amount, paidBy });

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";

  calculateBalances();
}

function calculateBalances() {
  let balance = {};

  friends.forEach(f => balance[f] = 0);

  expenses.forEach(exp => {
    let share = exp.amount / friends.length;

    friends.forEach(f => {
      if (f === exp.paidBy) {
        balance[f] += exp.amount - share;
      } else {
        balance[f] -= share;
      }
    });
  });

  renderBalances(balance);
}

function renderBalances(balance) {
  let list = document.getElementById("balances");
  list.innerHTML = "";

  for (let person in balance) {
    let li = document.createElement("li");

    if (balance[person] > 0) {
      li.textContent = person + " gets ₹" + balance[person].toFixed(2);
    } else {
      li.textContent = person + " owes ₹" + Math.abs(balance[person]).toFixed(2);
    }

    list.appendChild(li);
  }
}
