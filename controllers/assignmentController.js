let accounts = [];

async function getBalance(id) {
  const a = accounts.find((acc) => acc.id == id);
  console.log(a);
  const account = accounts.find((acc) => acc.id == id);
  return JSON.stringify(account.balance);
}

async function postEvent(event) {
  const { type, amount } = event;
  switch (type) {
    case "deposit":
      const dest = event.destination;
      const account = accounts.find((acc) => acc.id === dest);
      if (typeof (account) == "undefined") {
        const destination = { id: dest, balance: amount };
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
      let orig = event.origin;
      const acct = accounts.find((acc) => acc.id === orig);
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
      const newOrigin = event.origin;
      const newDestination = event.destination;
      const acc = accounts.find((a) => a.id === newOrigin);
      const accDest = accounts.find((a) => a.id === newDestination);
      if (typeof (acc) == "undefined") {
        return 0;
      }
      else {
        acc.balance = acc.balance - amount;
        accounts = accounts.filter(acc => acc.id != newOrigin);
        accounts.push(acc);
        if (typeof (accDest) == "undefined") {
          const newDest = { id: newDestination, balance: amount };
          accounts.push(newDest);
          return { origin: acc, destination: newDest };
        }
        else {
          accounts = accounts.filter(acc => acc.id != newDestination);
          accDest.balance = accDest.balance + amount;
          accounts.push(accDest);
          return { origin: acc, destination: accDest };
        }
      }
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