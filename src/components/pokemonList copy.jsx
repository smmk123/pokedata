import React from "react";
import { getPokes } from "./../api/pokemon";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { useInView } from "react-intersection-observer";

const PokemonList = () => {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  // // const offset = "&offset=3";
  // const offset = "";

  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: poke,
  // } = useQuery(["pokemonList", offset], () => getPokes(offset), {
  //   staleTime: Infinity,
  // });

  const {
    status,
    data: poke,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ["pokemonList"],
    ({ pageParam = 0 }) => getPokes(`&offset=${pageParam}`),

    {
      // getPreviousPageParam: (firstPage) => {
      //   return firstPage.previous
      //     .substring(34)
      //     .replaceAll("?offset=", "")
      //     .replaceAll("&limit=20", "");
      // },
      getNextPageParam: (lastPage) => {
        return lastPage.next
          .substring(34)
          .replaceAll("?offset=", "")
          .replaceAll("&limit=20", "");
      },
    }
    // {
    //    keepPreviousData: true,
    //   staleTime: 50000,
    // }
  );

  const getID = (url) => {
    //console.log("getID=" + url.substring(34));
    return url.substring(34).replace("/", "");
  };

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // React.useEffect(
  //   (poke) => {
  //     renderAll(poke);
  //   },
  //   [poke]
  // );

  // function skipTo(page) {
  //   fetchNextPage({ pageParam: `${page}` });
  // }

  const renderList = (pokemon) => {
    return (
      <ListGroup.Item key={pokemon.url}>
        <Link to={`/pokemon/${getID(pokemon.url)}`}>
          {getID(pokemon.url)} {pokemon.name}
        </Link>
      </ListGroup.Item>
    );
  };

  const renderAll = (poke) => {
    content = poke.pages.map((pages) => {
      return (
        <React.Fragment key={pages.next}>
          {pages.results.map((pokemon) => {
            return renderList(pokemon);
          })}
        </React.Fragment>
      );
    });
    return content;
  };

  let content;
  if (isFetching) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error.message}</p>;
  } else {
    content = renderAll(poke);
    // content = poke.pages[0].results.map((pokemon) => {
    //   return renderList(pokemon);
    //   // <ListGroup.Item key={pokemon.url}>
    //   //   <Link to={`/pokemon/${getID(pokemon.url)}`}>
    //   //     {getID(pokemon.url)} {pokemon.name}
    //   //   </Link>
    //   // </ListGroup.Item>
    // });
  }

  return (
    <>
      <h1>Pokes</h1>
      <p>{status}</p>
      <p>{isFetchingNextPage}</p>
      <ListGroup>{content}</ListGroup>
      <button
        ref={ref}
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
