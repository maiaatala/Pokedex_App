import React from "react"

import "./style.scss"

import pokeball from "../../assets/images/pokeballColored.png"

const LoadingPokeball = () => {
  return (
    <div className="loadingContainer">
      <div className="imageContainer">
        <img src={pokeball} alt="a spinning pokeball" />
      </div>
    </div>
  )
}

export default LoadingPokeball
