import React from "react"

import { FaArrowLeft, FaFilter, FaDiceD6 } from "react-icons/fa"

import { useGlobalContext } from "../../context"

import {
  RippleContainer,
  PokemonCard,
  LoadingPokeball,
  Pagination,
} from "../../components"

import { quickSort } from "../../utils"

import "./style.scss"

const pokeCardsPerPage = 20

export const Pokedex = () => {
  const { pokeCardsRawData, theme } = useGlobalContext()
  const [filteredPokemons, setFilteredPokemons] =
    React.useState(pokeCardsRawData)

  const scrollContainer = React.useRef(null)

  React.useEffect(() => {
    if (pokeCardsRawData) setFilteredPokemons(pokeCardsRawData)
  }, [pokeCardsRawData])

  console.log(pokeCardsRawData)

  return (
    <div className="PokedexContainer">
      <div className="header" style={{ color: theme.palette.base.blue.darker }}>
        <div className="backArrow">
          <FaArrowLeft />
        </div>
        <div className="pokedexMenu">
          <h1>Pokedex</h1>
          <RippleContainer>
            <FaFilter />
          </RippleContainer>
          <RippleContainer>
            <FaDiceD6 />
          </RippleContainer>
        </div>
      </div>
      <div className="contentContainer" ref={scrollContainer}>
        {pokeCardsRawData ? (
          <PokedexContent
            scrollContainer={scrollContainer}
            data={filteredPokemons}
          />
        ) : (
          <LoadingPokeball />
        )}
      </div>
    </div>
  )
}

const PokedexContent = (props) => {
  const { data, scrollContainer } = props
  const { currPage, setCurrPage } = useGlobalContext()

  React.useEffect(() => {
    scrollContainer.current.scrollTop = 0
  }, [currPage])

  if (data) {
    const totalNumberOfPages = Math.ceil(data.length / pokeCardsPerPage)
    if (currPage > totalNumberOfPages) {
      setCurrPage(0)
    }

    let currShowcaseData = data.slice(
      currPage * pokeCardsPerPage,
      currPage * pokeCardsPerPage + pokeCardsPerPage
    )
    return (
      <>
        <div className="cardListContainer">
          {currShowcaseData.map((pokemon) => {
            return (
              <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
            )
          })}
        </div>
        <div className="pagination">
          <Pagination
            currPage={currPage}
            setCurrPage={setCurrPage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </div>
      </>
    )
  }
  return <div>who is that pokemon</div>
}

export default Pokedex
