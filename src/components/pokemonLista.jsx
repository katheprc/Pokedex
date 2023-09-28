import { useEffect, useState } from "react";
import axios from "axios";
import "./pokemonCard.css";

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonList = response.data.results;
        const promises = pokemonList.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        });
        const pokemonDetails = await Promise.all(promises);
        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);
  return (
    <div className="Principal">
      <h1 className="bx-tada-hover">First Generation Pokemon</h1>
      <div className="contenedor">
        {pokemonData.map((pokemon) => (
          <div className="pokemonCard grid-item" key={pokemon.id}>
            <div className="id">#{pokemon.id}</div>
            <div className="name">{pokemon.name}</div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="data">
              <div className="baseExp">
                Base Experience: {pokemon.base_experience}
              </div>
              <div className="weight">Weight: {pokemon.weight}</div>
              <div className="height">Height: {pokemon.height}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
