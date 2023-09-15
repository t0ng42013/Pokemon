const form = document.getElementById('form');
const inputNumber= document.getElementById('inputNumber');
const card = document.querySelector('.myCard');
const bgCard = document.getElementById("bg-pokemon");



BASE_URL = `https://pokeapi.co/api/v2/pokemon/`;


const renderCard = (pokemonInfo) => {
    if(pokemonInfo !== undefined){
        
        card.innerHTML =  templateCard(pokemonInfo);
        const divFrontSide = document.querySelector(".frontSide");
        const dataset = divFrontSide.dataset;
        divFrontSide.style.background = `url(${dataset.image}) center/cover`;          
    }else{        
        card.innerHTML =  `
        <div id="bg-pokemon" class="innerCard">
            <div class="frontSide" >
                <h1 class="title">No se encontro el Pokemon</h1>
                <div class="typePoke">
              
                </div>
               
             </div>
                <div class="backSide">
                <p class="title">Caracteristicas</p>
                <div class="hwPoke">
                <span>Altura:</span>--- <span></span>
                <span>Peso:</span>---<span></span>
                </div>
                <p>Movimientos</p>
                <div class="movePoke">

                </div>

            </div>
        </div>
    `;
    }
   
}


const showError = (errorMessage) => {
    
  
  card.innerHTML = `
  <div id="error-message">
    <div class="error">
      <div class="error__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
          height="24"
          fill="none"
        >
          <path
            fill="#393a37"
            d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
          ></path>
        </svg>
      </div>
      <div class="error__title">${errorMessage}</div>
      <div class="error__close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 20 20"
          height="20"
        >
          <path
            fill="#393a37"
            d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
          ></path>
        </svg>
      </div>
    </div>
     </div>`;
    
};

const valid = (input) => {
  const inputValue = parseFloat(input);


  if (isNaN(inputValue)) {
    showError("El input debe ser un número válido");
    return false;
  }

  if (inputValue < 1 || inputValue > 1281) {
    showError("El número debe estar entre 1 y 1281");
    return false;
  }


  return true;
};

const formPoke = async (e) => {
  e.preventDefault();

  // Valida el input
  const isInputValid = valid(inputNumber.value);

  // Si el input es válido, envía el formulario
  if (isInputValid) {
    // Hace una petición a la API de Pokémon
    const pokemon = await fetchPokemon(`${BASE_URL}${inputNumber.value}`);

    // Muestra la carta del Pokémon
    renderCard(pokemon);
  }
};



const createType = (types) => {  
    return types.map(arr => {
       return `<span class="${arr.type.name}">${arr.type.name}</span>`;
    }).join('');
};

const createMoves = (moves) => {
   const primerosCinco = moves.slice(0,5);
   return primerosCinco.map(arr=> `<span>${arr.move.name}</span>`).join(' ');
};

const renderImg =(img1,img2)=>{
    if(img1 === null){
        return img2;
    }
return img1;
}


const pokemonTemplate = (pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name.toUpperCase(),
      image: pokemon.sprites.other.home.front_default,
      image2: pokemon.sprites.other['official-artwork'].front_default,
      height: pokemon.height / 10,
      weight: pokemon.weight / 10,
      types: pokemon.types,
      moves: pokemon.moves,
    };
};

const templateCard = (pokemon) => {
    const { name,image, image2, height, weight, types, moves }= pokemonTemplate(pokemon)

    return `
        <div id="bg-pokemon" class="innerCard">
            <div class="frontSide" data-image="${renderImg(image,image2)}">
                <h1 class="title">${name}</h1>
                <div class="typePoke">
                ${createType(types)}
                </div>
               
             </div>
                <div class="backSide">
                <p class="title">Caracteristicas</p>
                <div class="hwPoke">
                <span>Altura:</span> <span>${height}</span>
                <span>Peso:</span> <span>${weight}</span>
                </div>
                <p>Movimientos</p>
                <div class="movePoke">
                ${createMoves(moves)}
                </div>

            </div>
        </div>
    `;
};



const init = () => {
   
    form.addEventListener('submit', formPoke);

};

init();