import React from "react"

import { useGlobalContext } from "../../context"
import "./style.scss"

import { PokemonTypeIcon } from "../index"

import { useNavigate } from "react-router-dom"

import pokeball from "../../assets/images/pokeballWhite.png"

const PokemonCard = (props) => {
  const { pokemon } = props
  const { theme } = useGlobalContext()
  const navigate = useNavigate()

  // console.log(pokemon.id)

  return (
    <div
      className="cardContainer"
      style={{
        backgroundColor: theme.palette.types[pokemon.type[0]].background,
        color: theme.palette.types[pokemon.type[0]].foreground,
      }}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      <div className="firstLine">
        <h3>{pokemon.fancyName}</h3>
      </div>
      <div
        className="typeIconsContainer"
        style={{
          color: theme.palette.types[pokemon.type[0]].foregroundText,
        }}
      >
        {pokemon.type.map((type) => {
          return PokemonTypeIcon(type)
        })}
      </div>

      <div
        className="pokemonIndex"
        style={{
          color: theme.palette.types[pokemon.type[0]].foregroundText,
        }}
      >
        <h4>#{pokemon.pokedexIndex}</h4>
      </div>

      <div className="sprite">
        <img src={pokemon.sprite} alt={`${pokemon.fancyName} sprite`} />
      </div>

      <div className="pokeball">
        <img src={pokeball} alt="pokeball" />
      </div>
    </div>
  )
}

export default PokemonCard
