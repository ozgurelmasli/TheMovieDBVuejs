import { createStore } from "vuex";

import Service from "@/Service/ServiceLayer/Service";
import { ServerURLs ,ServerImageURLs } from "@/Service/ServiceLayer/ServiceModels";
import { Movie, Movies } from "@/Models/Movies";


export interface  State {
  movie : null
  topRatedMovies: null
}

export default createStore({
  state() {
    return {
      movie: null,
      topRatedMovies : null
    };
  },
  getters: {
    movie(state: State) {
      return state.movie;
    },
    movies(state: State) {
      return state.topRatedMovies;
    },
    imageUrl : () => (path : string) => {
      return ServerImageURLs.w500.valueOf() + path
    }
  },
  mutations: {
    setMovie(state , payload){
      state.movie = payload.movie
    },
    setTopRatedMovies(state , payload){
      const movies : Movies = payload.movies
      if (state.topRatedMovies !== null){
        movies.results.forEach( (movie) => {
          (state.topRatedMovies! as Movies).results.push(movie)
        })
      }else {
        state.topRatedMovies = payload.movies
      }
    },
    clearTopRatedMovies(state){
      state.topRatedMovies = null
    }
  },
  actions: {
    clearTopRatedMovies(context){
      context.commit('clearTopRatedMovies')
    },
    async getTopRatedMovies(context , payload) {
      const service = new Service();
      const response: Movies = await service.requestToServer(Movies, {
        baseURLConfig: {
          url: ServerURLs.topRatedMovies,
          language: true,
          sorting: false,
          query: false,
          page: payload.page
        },
        method: "GET",
      });
      console.log(response)
      context.commit('setTopRatedMovies', {
        movies: response
      })
    },
    async getLatestMovies(context) {
      const service = new Service();
      const response: Movie = await service.requestToServer(Movie, {
        baseURLConfig: {
          url: ServerURLs.latestMovies,
          language: false,
          sorting: false,
          query: false,
        },
        method: "GET",
      });
      console.log(response)
      context.commit('setMovie', {
        movie: response
      })
    },
    async getPopularMovies() {
      const service = new Service();
      const response: Movies = await service.requestToServer(Movies, {
        baseURLConfig: {
          url: ServerURLs.popularMovies,
          language: false,
          sorting: false,
          query: false,
        },
        method: "GET",
      });
      return response;
    },
    async getUpcomingMovies() {
      const service = new Service();
      const response: Movies = await service.requestToServer(Movies, {
        baseURLConfig: {
          url: ServerURLs.upcomingMovies,
          language: true,
          sorting: false,
          query: false,
        },
        method: "GET",
      });
      return response;
    },
    async getDiscoverMovies() {
      const service = new Service();
      const response: Movies = await service.requestToServer(Movies, {
        baseURLConfig: {
          url: ServerURLs.discoverMovies,
          language: false,
          sorting: true,
          query: false,
        },
        method: "GET",
      });
      return response;
    },
    async search(_, data): Promise<Movies> {
      const service = new Service();
      const response: Movies = await service.requestToServer(Movies, {
        baseURLConfig: {
          url: ServerURLs.search,
          language: false,
          sorting: false,
          query: true,
        },
        method: "GET",
        query: data.text,
      });
      return response;
    },
  },
});
