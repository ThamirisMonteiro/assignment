let accounts = [];
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
      const { destination } = event;
      const account = accounts.find((acc) => acc.id === parseInt(destination));
      return account;
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