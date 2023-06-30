const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 151;
let offset = 0;
/*Botão removido */
loadMoreButton.parentElement.removeChild(loadMoreButton)

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="pokemon_status">
               <div class="status_bar">
                  <span class="name">HP</span>
                  <div class="bar_container">
                     <div class="bar_fill" style="width: ${pokemon.HP / 150 * 100}%;"></div>
                  </div>
                  <span class="value">${pokemon.HP}</span>
               </div>
               <div class="status_bar">
                  <span class="name">At</span>
                  <div class="bar_container">
                     <div class="bar_fill" style="width: ${pokemon.Atack / 150 * 100}%;"></div>
                  </div>
                  <span class="value">${pokemon.Atack}</span>
               </div>
               <div class="status_bar">
                  <span class="name">Def</span>
                  <div class="bar_container">
                     <div class="bar_fill" style="width: ${pokemon.Defense / 150 * 100}%;"></div>
                  </div>
                  <span class="value">${pokemon.Defense}</span>
               </div>
               <div class="status_bar">
                  <span class="name">Sp.At</span>
                  <div class="bar_container">
                     <div class="bar_fill" style="width: ${pokemon.Sp_Atack / 150 * 100}%;"></div>
                  </div>
                  <span class="value">${pokemon.Sp_Atack}</span>
               </div>
               <div class="status_bar">
                  <span class="name">Sp.Def</span>
                  <div class="bar_container">
                     <div class="bar_fill" style="width: ${pokemon.Sp_Defense / 150 * 100}%;"></div>
                  </div>
                  <span class="value">${pokemon.Sp_Defense}</span>
               </div>
               <div class="status_bar">
                  <span class="name">Speed</span>
                  <div class="bar_container">
                     <div class="bar_fill" style="width: ${pokemon.Speed / 150 * 100}%;"></div>
                  </div>
                  <span class="value">${pokemon.Speed}</span>
               </div>
               <div class="ability_text">Ability</div>
               <div class="ability"> ${pokemon.abilities}</div>
               <div class="ability_text">Hidden Ability</div>
               <div class="ability hidden"> ${pokemon.hidden_ability}</div>
            </div>

        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})