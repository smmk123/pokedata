import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const PokemonListV3 = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => {
        setPokemons(response.data.results);
        setNextUrl(response.data.next);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    observer.current = new IntersectionObserver(handleObserver, options);
    if (loading) return;
    if (observer.current) observer.current.observe(document.querySelector("#infinite-scroll"));
  }, [loading]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setLoading(true);
      axios
        .get(nextUrl)
        .then((response) => {
          setPokemons([...pokemons, ...response.data.results]);
          setNextUrl(response.data.next);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      observer.current.unobserve(target);
    }


  };
  const getID = (url) => {
    return url.substring(34).replace("/", "");
  };

  return (
    <>
      <ListGroup style={{ fontSize: "2em" }}>
        {pokemons.map((pokemon, index) => (
            <ListGroup.Item key={pokemon.url}>
        <Link to={`/pokemon/${getID(pokemon.url)}`}>
          {pokemon.name}
          </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div id="infinite-scroll" style={{ height: "10px" }}>
        {loading && <p>Loading...</p>}
      </div>

    </>
  );
};

export default PokemonListV3;