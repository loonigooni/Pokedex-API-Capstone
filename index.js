/*
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)} = ${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
*/

function getPokemon(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then(response => response.json())
      .then(responseJson => 
        displayResults(responseJson))
      .catch(error => alert('Something went wrong :('));
      console.log(pokemonName);
}

function displayResults(responseJson) {
  console.log(responseJson);
  let results = [];
//name, weight, height, pkmn img
  results.push(`
    <h3>${responseJson.name.toUpperCase()}</h3>
      <p class="poke-height">Height: ${responseJson.height / 10}m</p>
      <p class="poke-weight">Weight: ${responseJson.weight /10}kg</p>
    <img src="${responseJson.sprites.front_default}" class="poke-img" >
    `)
//abilities
  results.push(`<h4 class="abilities">Abilities</h4>`)
  for (let i = 0; i < responseJson.abilities.length; i++) {
    results.push(`
      <p class="poke-abilities">${responseJson.abilities[i].ability.name}</p>`)
  }
//type
  results.push(`<h4 class="type">TYPE </h4>`)
  for (let i = 0; i < responseJson.types.length; i++) {
    results.push(`<h5 class="poke-type"> ${responseJson.types[i].type.name.toUpperCase()}</h5>`)
  }
  $('.results').html(results);
  $('.section').removeClass('hidden');
}
function watchForm() {
    $('#js-form').submit(event => {
      event.preventDefault();
      let pokemonName = $('input[type="text"]').val()
      getPokemon(pokemonName);
    });
}

$(watchForm);