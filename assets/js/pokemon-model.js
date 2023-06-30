
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
    stats = [];
    HP;
    Atack;
    Sp_Atack;
    Defense;
    Sp_Defense;
    Speed;
    abilities = [];
    hidden_ability = " ... ";

}
function searchPokemon() {
   
   const searchTerm = document.getElementById("searchInput").value.toLowerCase();
   const pokemons = document.getElementsByClassName("pokemon");
 
   for (let i = 0; i < pokemons.length; i++) {
     const pokemonName = pokemons[i].querySelector(".name").textContent.toLowerCase();
 
     if (pokemonName.includes(searchTerm)) {
       pokemons[i].style.display = "";
     } else {
       pokemons[i].style.display = "none";
     }
   }
 }
 document.getElementById("searchInput").addEventListener("input", function() {
   searchPokemon();
 });
 