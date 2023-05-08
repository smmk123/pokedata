import axios from "axios";

const pokeApi=axios.create({
    baseURL : "https://pokeapi.co/api/v2/"
})


export const getPokes = async (params) => { 
    const response = await pokeApi.get(`pokemon/?limit=20&offset=${params}`);
    const results= response.data;
    return {results, nextPage: params+20, totalPages: [results.count]}
};

export const getPokeDetail = async (id) => { 
    const response = await pokeApi.get(`pokemon/${id}`);
    return response.data;
};

export const getPokeSpeciesDetail = async (id) => { 
    const response = await pokeApi.get(`pokemon-species/${id}`);
    return response.data;
};