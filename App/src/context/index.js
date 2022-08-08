import React, { useState, useContext, useEffect } from "react"
import { getPokemonsPointers, buildCardDataFromPointers } from "../api"
import theme from "../Theme"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [pokePointersArr, setPokePointersArr] = useState(null)
  const [pokeCardsRawData, setPokeCardsRawData] = useState(null)
  const [currPage, setCurrPage] = React.useState(0)

  useEffect(() => {
    getPokemonsPointers().then((result) => setPokePointersArr(result.results))
  }, [])

  useEffect(() => {
    if (pokePointersArr) {
      buildCardDataFromPointers(pokePointersArr).then((result) =>
        setPokeCardsRawData(result)
      )
    }
  }, [pokePointersArr])

  return (
    <AppContext.Provider
      value={{ pokeCardsRawData, currPage, setCurrPage, theme }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
