const fetchPokemon = async (url) => {
try {
  const res = await fetch(url);
  const pokemon = await res.json();
  return pokemon;
} catch (error) {
    console.log(error);
}
};

