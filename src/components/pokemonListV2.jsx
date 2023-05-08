import { React, useState } from "react";
import { getPokes } from "./../api/pokemon";
import { getPokeDetail, getPokeSpeciesDetail } from "./../api/pokemon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import "../index.css";

const PokemonListV2 = (props) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [id, setId] = useState();

  const {
    status,
    data: poke,
    error,
    isFetching,
    nextPage,
  } = useQuery(["pokemonList", page], () => getPokes(page), {
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const getID = (url) => {
    return url.substring(34).replace("/", "");
  };

  return (
    <>
      <h1>Pokes</h1>
      {isFetching && <p>Loading...</p>}
      {!isFetching && error && <p>{error.message}</p>}
      {!isFetching && !error && (
        <ListGroup style={{ fontSize: "2em" }}>
          {poke.results.results.map((pokemon) => (
            <ListGroup.Item key={pokemon.url}>
              <Link to={`/pokemon/${getID(pokemon.url)}`}>
                {getID(pokemon.url)} {pokemon.name}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <button
        onClick={() => setPage((page) => page - 20)}
        disabled={page === 0}
      >
        previous
      </button>
      <button onClick={() => setPage((page) => page + 20)}>next</button>
    </>
  );
};

export default PokemonListV2;
