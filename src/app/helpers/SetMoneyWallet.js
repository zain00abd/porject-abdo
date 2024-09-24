

export async function SetMoneyWallet(money) {
  const baseURL = window.location.origin;
  const response = await fetch(`${baseURL}/api/addwallet`, {
    method: `PUT`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      money: Number(money),
    }),
  });

  const dataFromBackend = await response.json();
  if(response.ok){
    return true
  }
}


