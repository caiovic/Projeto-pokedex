
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const butttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

 const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  } 
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'carregando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
       pokemonName.innerHTML = "Não encontrado!"
       pokemonNumber.innerHTML = "";
       pokemonImage.src = 'https://66.media.tumblr.com/f4918498af34c8764de970a2ca76795b/tumblr_mvzj2elEQA1rfjowdo1_500.gif';
    };
    
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

butttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});


renderPokemon(searchPokemon);