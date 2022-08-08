import axios from "axios"

import { normalizeAPITexts } from "../utils"

/* 
todo: tratativas de erro
*/

axios.defaults.timeout = 2000

const numberOfPokemonsInPokedex = 200

export const getPokemon = async (pokemon) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}pokemon/${pokemon}`
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.log("error: ", error)
  }
}

export const getFromLinks = async (link) => {
  try {
    let data = await axios.get(link)
    return data.data
  } catch (error) {
    if (error.response) {
      console.log(link, error.response.data, error.response.status)
    } else if (error.request) {
      console.log(link, error.request)
    } else {
      console.log(link, error)
    }
    return null
  }
}

export const getPokemonsPointers = (
  limit = numberOfPokemonsInPokedex,
  offset = 0
) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}pokemon?limit=${limit}&offset=${offset}`
    return getFromLinks(url)
  } catch (error) {
    console.log("error: ", error)
  }
}

export const buildCardDataFromPointers = async (pointersArray) => {
  try {
    let PokemonsData = []
    for (let i = 0; i < pointersArray.length; i++) {
      if (pointersArray[i].url) {
        let data = await buildPokemonData(pointersArray[i].url)
        if (data) PokemonsData.push(data)
      }
    }
    return PokemonsData
  } catch (error) {
    console.log("error in build: ", error)
    return null
  }
}

export const buildPokemonData = async (url) => {
  try {
    let pokemonData = {
      id: "",
      fancyName: "",
      flavorText: "",
      habitat: "",
      pokedexIndex: "",
      height: "",
      weight: "",
      sprite: "",
      type: [],
      ability: [],
      stats: [
        { hp: "" },
        { atk: "" },
        { def: "" },
        { satk: "" },
        { sdef: "" },
        { spd: "" },
      ],
    }

    const getData = await getFromLinks(url)
    pokemonData.id = getData.id
    pokemonData.height = getData.height
    pokemonData.weight = getData.weight
    pokemonData.pokedexIndex = getData.game_indices[0].game_index
    pokemonData.sprite = getData.sprites.other.dream_world.front_default
    pokemonData.stats[0].hp = getData.stats[0].base_stat
    pokemonData.stats[1].atk = getData.stats[1].base_stat
    pokemonData.stats[2].def = getData.stats[2].base_stat
    pokemonData.stats[3].satk = getData.stats[3].base_stat
    pokemonData.stats[4].sdef = getData.stats[4].base_stat
    pokemonData.stats[5].spd = getData.stats[5].base_stat
    pokemonData.type = getData.types.map((type) => {
      return type.type.name
    })

    const getSpeciesData = await getFromLinks(getData.species.url)
    pokemonData.fancyName = getSpeciesData.names.find(
      (version) => version.language.name === "en"
    ).name
    pokemonData.flavorText = normalizeAPITexts(
      getSpeciesData.flavor_text_entries.find(
        (version) => version.language.name === "en"
      ).flavor_text
    )
    pokemonData.habitat = getSpeciesData.habitat.name.replace("-", " ")

    for (let i = 0; i < getData.abilities.length; i++) {
      let getAbilitiesData = await getFromLinks(
        getData.abilities[i].ability.url
      )
      let ability = {
        fancyName: "",
        flavorText: "",
        effectText: "",
      }

      ability.fancyName = normalizeAPITexts(
        getAbilitiesData.names.find((version) => version.language.name === "en")
          .name
      )
      ability.flavorText = normalizeAPITexts(
        getAbilitiesData.flavor_text_entries.find(
          (version) => version.language.name === "en"
        ).flavor_text
      )
      ability.effectText = normalizeAPITexts(
        getAbilitiesData.effect_entries.find(
          (version) => version.language.name === "en"
        ).effect
      )

      pokemonData.ability.push({ ...ability })
    }

    return { ...pokemonData }
  } catch (error) {
    console.log("missing pokemon card:", url)
  }
  return null
}
