import React from "react"

import { useParams, useNavigate } from "react-router-dom"
import {
  LoadingPokeball,
  RippleContainer,
  PokemonTypeIcon,
} from "../../components"
import { useGlobalContext } from "../../context"
import pokeball from "../../assets/images/pokeballWhite.png"

import { FaArrowLeft, FaWeightHanging, FaInfoCircle } from "react-icons/fa"
import { GiBodyHeight } from "react-icons/gi"

import "./style.scss"

const Pokemon = () => {
  const { pokeCardsRawData, theme } = useGlobalContext()
  const [pokemon, setPokemon] = React.useState(null)
  const [selectedButton, setSelectedButton] = React.useState(0)
  const navigate = useNavigate()
  const { id } = useParams()

  React.useEffect(() => {
    if (pokeCardsRawData) {
      let wantedPokemon = pokeCardsRawData.find((poke) => {
        return poke.id == id
      })

      if (wantedPokemon) {
        setPokemon(wantedPokemon)
      } else {
        setPokemon(-1)
      }
    }
  }, [pokeCardsRawData])

  console.log(pokemon)

  if (!pokeCardsRawData || !pokemon) {
    return (
      <div>
        <LoadingPokeball />
      </div>
    )
  }

  if (pokeCardsRawData && pokemon === -1) {
    return <div>who's that pokemon</div>
  }

  if (!pokemon) {
    return <div>something went wrong</div>
  }

  return (
    <div
      className="pokemonPageContainer"
      style={{
        color: theme.palette.types[pokemon.type[0]].background,
      }}
    >
      <div
        className="header"
        style={{ color: theme.palette.types[pokemon.type[0]].foreground }}
      >
        <div className="backArrow">
          <RippleContainer onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </RippleContainer>
        </div>
        <div className="nameAndId">
          <h2 className="name">{pokemon.fancyName}</h2>
          <h3 className="id">#{pokemon.pokedexIndex}</h3>
        </div>
      </div>

      <div className="spriteAndType">
        <div
          className="type"
          style={{
            color: theme.palette.types[pokemon.type[0]].foregroundText,
          }}
        >
          {pokemon.type.map((type) => {
            return (
              <div className="nameIconContainer" key={type}>
                <div className="typeIcon">{PokemonTypeIcon(type)}</div>
                <h4 className="typeName">{type}</h4>
              </div>
            )
          })}
        </div>
        <div className="sprite">
          <img src={pokemon.sprite} alt={`${pokemon.fancyName} sprite`} />
        </div>
        <div className="pokeball">
          <img src={pokeball} alt="pokeball" />
        </div>
      </div>

      <div
        className="buttons"
        style={{
          color: theme.palette.types[pokemon.type[0]].outsideText,
        }}
      >
        <div
          className={`btn ${selectedButton === 0 ? "active" : ""}`}
          onClick={() => setSelectedButton(0)}
        >
          <RippleContainer>About</RippleContainer>
        </div>
        <div
          className={`btn ${selectedButton === 1 ? "active" : ""}`}
          onClick={() => setSelectedButton(1)}
        >
          <RippleContainer>Stats</RippleContainer>
        </div>
        <div
          className={`btn ${selectedButton === 2 ? "active" : ""}`}
          onClick={() => setSelectedButton(2)}
        >
          <RippleContainer>Ability</RippleContainer>
        </div>
      </div>
      <div className="divider" />

      <div className="contentContainer" style={{ color: "black" }}>
        <PokemonContentPages currInfoPage={selectedButton} pokemon={pokemon} />
      </div>
    </div>
  )
}

const PokemonContentPages = (props) => {
  const { currInfoPage, pokemon } = props
  const { theme } = useGlobalContext()

  if (currInfoPage === 0) {
    return (
      <div className="aboutPage">
        <h4 className="flavorText">{pokemon.flavorText}</h4>
        <h5 className="habitat">{pokemon.habitat}</h5>
        <div
          className="weightHeightContainer"
          style={{
            color: theme.palette.types[pokemon.type[0]].outsideText,
          }}
        >
          <div className="weightContainer">
            <div className="value">{pokemon.weight / 10}Kg</div>
            <div className="weightIcon">
              <FaWeightHanging />
            </div>
          </div>
          <div className="heightContainer">
            <div className="value">{pokemon.height / 10}m</div>
            <div className="heightIcon">
              <GiBodyHeight />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currInfoPage === 1) {
    return (
      <div className="statsPage">
        {pokemon.stats.map((attrb) => {
          let attrName = Object.keys(attrb)[0]
          let statsColor = theme.palette.stats[attrName]
          console.log(statsColor)
          const attrValueNormalized = (value) => {
            if (value >= 100) {
              return value
            }
            if (value >= 10) {
              return `0${value}`
            }
            if (value < 10) {
              return `00${value}`
            }
          }
          return (
            <div className="barContainer" key={attrName}>
              <div
                className="label"
                content={attrValueNormalized(attrb[attrName])}
              >
                {attrName}:
              </div>
              <div className="bar" s>
                <div
                  className="coloredBar"
                  style={{
                    backgroundColor: statsColor,
                    maxWidth: `${(attrb[attrName] * 100) / 255}%`,
                  }}
                />
                <div className="backgroundBar" />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (currInfoPage === 2) {
    return (
      <div className="abilityPage">
        {pokemon.ability.map((ability) => {
          const backgroundColor =
            theme.palette.types[pokemon.type[0]].background
          const foregroundText =
            theme.palette.types[pokemon.type[0]].foregroundText

          const foreground = `${
            theme.palette.types[pokemon.type[0]].foreground
          }9d`
          return (
            <AbilityPage
              key={ability.fancyName}
              ability={ability}
              backgroundColor={backgroundColor}
              foregroundText={foregroundText}
              foreground={foreground}
            />
          )
        })}
      </div>
    )
  }
}

const AbilityPage = (props) => {
  const { ability, backgroundColor, foregroundText, foreground } = props

  const [isFullText, setIsFulltext] = React.useState(false)

  let effectText = ability.effectText
  let buttonText = "Read More"
  const isTextTooBig = ability.effectText.length > 100

  if (isTextTooBig) {
    if (isFullText) {
      buttonText = "Read Less."
      effectText = ability.effectText
    } else {
      buttonText = "Read More"
      effectText = `${ability.effectText.slice(0, 80)}...`
    }
  }

  return (
    <div className="abilityContainer">
      <div
        className="fancyName"
        style={{
          color: backgroundColor,
        }}
      >
        <h2
          style={{
            color: foregroundText,
          }}
        >
          {ability.fancyName}
        </h2>
      </div>
      <div
        className="flavorText"
        style={{
          color: foreground,
        }}
      >
        <h4
          className="flavorTextText"
          style={{
            color: "black",
          }}
        >
          {ability.flavorText}
        </h4>
      </div>
      <div className="effectText">
        <FaInfoCircle />
        <div className="textContainer">
          <h6>
            {effectText}
            {isTextTooBig && (
              <button onClick={() => setIsFulltext(!isFullText)}>
                {buttonText}
              </button>
            )}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default Pokemon
