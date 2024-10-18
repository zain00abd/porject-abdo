
export async function  SetTransaction(today, mode, money, user){
  console.log(today)
  const baseURL = window.location.origin;
  const response = await fetch(`${baseURL}/api/settransaction`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: today,
      mode: mode,
      money: Number(money),
      user: user,
    }),
  });

  const objFromFrontEnd = await response.json();


  
};



