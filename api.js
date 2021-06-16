const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Couldn't fetch ${url}, status ${res.status}`);
  }
  
  return await res.json();
};