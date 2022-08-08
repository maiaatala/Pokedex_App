import {
  Bug,
  Dark,
  Dragon,
  Electric,
  Fairy,
  Fighting,
  Fire,
  Flying,
  Ghost,
  Grass,
  Ground,
  Ice,
  Normal,
  Poison,
  Psychic,
  Rock,
  Star,
  Steel,
  Water,
} from "../../assets/svg"

const PokemonTypeIcon = (props) => {
  let comp = null

  switch (props) {
    case "grass":
      comp = <Grass key={props} />
      break
    case "poison":
      comp = comp = <Poison key={props} />
      break
    case "fire":
      comp = <Fire key={props} />
      break
    case "bug":
      comp = <Bug key={props} />
      break
    case "dark":
      comp = <Dark key={props} />
      break
    case "dragon":
      comp = <Dragon key={props} />
      break
    case "electric":
      comp = <Electric key={props} />
      break
    case "fighting":
      comp = <Fighting key={props} />
      break
    case "flying":
      comp = <Flying key={props} />
      break
    case "ghost":
      comp = <Ghost key={props} />
      break
    case "normal":
      comp = <Normal key={props} />
      break
    case "psychic":
      comp = <Psychic key={props} />
      break
    case "rock":
      comp = <Rock key={props} />
      break
    case "star":
      comp = <Star key={props} />
      break
    case "steel":
      comp = <Steel key={props} />
      break
    case "water":
      comp = <Water key={props} />
      break
    case "fairy":
      comp = <Fairy key={props} />
      break
    case "ground":
      comp = <Ground key={props} />
      break
    case "ice":
      comp = <Ice key={props} />
      break
    default:
      comp = null
      break
  }
  return comp
}

export default PokemonTypeIcon
