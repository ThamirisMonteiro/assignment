let accounts = [];
accounts.push({ id: 100, balance: 20 });
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
        return { destination: account };
      }
    case "withdraw":
      const orig = event.origin;
      const acct = accounts.find((acc) => acc.id === parseInt(orig));
      if (typeof (acct) == "undefined") {
        return 0;
      }
      else {
        accounts = accounts.filter(acc => acc.id != orig);
        acct.balance = acct.balance - amount;
        accounts.push(acct);
        return { origin: acct };
      }
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