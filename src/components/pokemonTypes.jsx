export default function PokemonTypes(props) {
  const typesColors = {
    grass: "green",
    poison: "purple",
    fire: "red",
    flying: "DeepSkyBlue",
    water: "blue",
    bug: "LawnGreen",
    electric: "yellow",
    ground: "brown",
    normal: "darkKhaki",
    fairy: "pink",
    psychic: "deepPink",
    rock: "saddlebrown",
    dark: "midnightblue",
    ghost: "indigo",
    steel: "grey",
    fighting: "orangered",
    dragon: "lightseagreen",
    ice: "turquoise",
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (props.type in typesColors) {
    return (
      <b style={{ color: `${typesColors[props.type]}` }}>
        {capitalizeFirstLetter(props.type)}
      </b>
    );
  } else {
    return props.type;
  }
}
