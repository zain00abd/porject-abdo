

export async function GetData() {
  const res = await fetch(`https://nextback-seven.vercel.app/abdodata`);
  if (!res.ok) {
    // notFound();
  }
  const result = await res.json();

  // console.log(result[0]);

  return result[0]
}

