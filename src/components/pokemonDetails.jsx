import { useEffect, useState } from "react";
import { getPokeDetail, getPokeSpeciesDetail } from "./../api/pokemon";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import PokemonTypes from "./pokemonTypes";
import Button from "react-bootstrap/Button";

export default function PokemonDetail() {
  const queryClient = useQueryClient();
  let [id, setId] = useState(parseInt(useParams().id));
  let content;

  const {
    isLoading,
    isError,
    error,
    data: pokemonData,
  } = useQuery(["pokemonDate", id], () => getPokeDetail(id), {
    staleTime: Infinity,
  });

  const {
    isLoadingSpecies,
    isErrorSpecies,
    errorSpecies,
    data: pokemonSpeciesData,
  } = useQuery(["pokemonSpeciesData", id], () => getPokeSpeciesDetail(id), {
    staleTime: Infinity,
    keepPreviousData: true,
  });

  useEffect(() => {}, [id]);

  if (isLoading || isLoadingSpecies) {
    content = <div>Loading...</div>;
  } else if (isError || isErrorSpecies) {
    content = <div>{error.message}</div>;
  } else {
    content = (
      <Card.Body>
        <Card.Title style={{ fontSize: "4em" }}>
          #{pokemonData.id} {capitalizeFirstLetter(pokemonData.name)}
        </Card.Title>
        <Card.Img
          src={pokemonData.sprites.front_default}
          style={{ width: "20%", height: "auto" }}
          alt="pokemon sprite"
        ></Card.Img>
        <div style={{ fontSize: "1.5em" }}>
          <Card.Text>
            {pokemonSpeciesData?.flavor_text_entries[0]?.flavor_text}
          </Card.Text>
          <ListGroup variant="flush">
            Types:
            {pokemonData.types.map((arry) => (
              <ListGroup.Item key={arry.type.url}>
                <PokemonTypes type={arry.type.name}></PokemonTypes>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <ListGroup variant="flush">
            <ListGroup.Item>
              Habitat: {pokemonSpeciesData?.habitat?.name}
            </ListGroup.Item>
            <ListGroup.Item>Weight: {pokemonData?.weight}kg</ListGroup.Item>
            <ListGroup.Item>Height: {pokemonData?.height}m</ListGroup.Item>
          </ListGroup>

          <Link
            to={`/pokemon/${id - 1}`}
            onClick={() => {
              setId(id - 1);
            }}
          >
            <Button
              style={{ margin: "1vh" }}
              variant="primary"
              disabled={id === 1}
            >
              Previous
            </Button>
          </Link>
          <Link
            to={`/pokemon/${id + 1}`}
            onClick={() => {
              setId(id + 1);
            }}
          >
            <Button style={{ margin: "1vh" }} variant="primary">
              Next
            </Button>
          </Link>
        </div>
      </Card.Body>
    );
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Card>{content}</Card>
    </>
  );
}
