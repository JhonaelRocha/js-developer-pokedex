
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
   const pokemon = new Pokemon()
   pokemon.number = pokeDetail.id
   pokemon.name = pokeDetail.name

   const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
   const [type] = types

   pokemon.types = types
   pokemon.type = type

   pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
   /* Minha Adição */
   const stats = pokeDetail.stats.map((StatSlot) => StatSlot.base_stat) /* Array */

   pokemon.stats = stats;
   pokemon.HP = stats[0];
   pokemon.Atack = stats[1];
   pokemon.Defense = stats[2];
   pokemon.Sp_Atack = stats[3];
   pokemon.Sp_Defense = stats[4];
   pokemon.Speed = stats[5];

   const _abilities = [];
   const abilities = pokeDetail.abilities.map((AbilitySlot) => AbilitySlot.ability.name) /* Array */

   const isHidden = pokeDetail.abilities.map((AbilitySlot) => AbilitySlot.is_hidden)
   for (let i = 0; i < abilities.length; i++) {
      if (isHidden[i]) {
         pokemon.hidden_ability = abilities[i].replace(/-/g, " ");
      } else {
         _abilities.push(abilities[i]);
      }
   }
   pokemon.abilities = _abilities.map((ability) => ability.replace(/-/g, " ")).join("<br>");
   
   
   /* */
   return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
      .then((response) => response.json())
      .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

   return fetch(url)
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .then((pokemonsDetails) => pokemonsDetails)
}

