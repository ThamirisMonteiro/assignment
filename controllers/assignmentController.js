let accounts = [];
let accountId = 0;
accounts.push({ id: 100, balance: 0 });
accounts.push({ id: 101, balance: 10 });

async function getBalance(id) {
  const account = accounts.find((acc) => acc.id === parseInt(id));
  return account.balance;
}

async function postEvent(event) {
  const { type, amount } = event;
  switch (type) {
    case "deposit":
      const dest = event.destination;
      const account = accounts.find((acc) => acc.id === parseInt(dest));
      if (typeof (account) == "undefined") {
        const destination = { id: parseInt(dest), balance: amount };
        accounts.push(destination);
        return { destination };
      }
      else {
        accounts = accounts.filter(acc => acc.id != dest);
        account.balance = account.balance + amount;
        accounts.push(account);
        return { account };
      }
    case "withdraw":
      const { origin } = event;
      break;
    case "transfer":
      break;
  }
}

async function resetAccounts() {
  accounts = [];
}

export {
  getBalance,
  postEvent,
  resetAccounts
};