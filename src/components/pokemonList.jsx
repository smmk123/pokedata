import React from "react";
import { getPokes } from "./../api/pokemon";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import InfiniteScroll from "react-infinite-scroller";
import "../index.css";

const PokemonList = () => {
  const queryClient = useQueryClient();

  const {
    status,
    data: poke,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["pokemonList"],
    ({ pageParam = 0 }) => getPokes(pageParam),

    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  const getID = (url) => {
    return url.substring(34).replace("/", "");
  };

  return (
    <>
      <h1>Pokes</h1>

      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {isFetching && <p>Loading...</p>}
        {!isFetching && error && <p>{error.message}</p>}
        {!isFetching && !error && (
          <ListGroup style={{ fontSize: "2em" }}>
            {poke.pages.map((page) =>
              page.results.results.map((pokemon) => (
                <ListGroup.Item key={pokemon.url}>
                  <Link to={`/pokemon/${getID(pokemon.url)}`}>
                    {getID(pokemon.url)} {pokemon.name}
                  </Link>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        )}
      </InfiniteScroll>

      <button
        onClick={() => {
          fetchNextPage();
        }}
      >
        next
      </button>
    </>
  );
};

export default PokemonList;
