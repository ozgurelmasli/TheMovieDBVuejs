import { createStore } from "vuex";

import Service from "@/Service/ServiceLayer/Service";
import { ServerURLs ,ServerImageURLs } from "@/Service/ServiceLayer/ServiceModels";
import { Movie, Movies } from "@/Models/Movies";


export interface  State {
  movie : null
  topRatedMovies: null,
  popularMovies : null,
  upcomingMovies : null
}

export default createStore({
  state() {
    return {
      movie: null,
      topRatedMovies : null,
      popularMovies : null,
      upcomingMovies : null
    };
  },
  getters: {
    movie(state: State) {
      return state.movie;
    },
    topRatedMovies(state: State) {
      return state.topRatedMovies;
    },
    popularMovies(state: State) {
      return state.popularMovies;
    },
    upcomingMovies(state: State) {
      return state.upcomingMovies
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
    },
    setPopularMovies(state , payload){
      const movies : Movies = payload.movies
      if (state.popularMovies !== null){
        movies.results.forEach( (movie) => {
          (state.popularMovies! as Movies).results.push(movie)
        })
      }else {
        state.popularMovies = payload.movies
      }
    },
    clearPopularMovies(state){
      state.popularMovies = null
    },
    setUpcomingMovies(state , payload){
      const movies : Movies = payload.movies
      if (state.upcomingMovies !== null){
        movies.results.forEach( (movie) => {
          (state.upcomingMovies! as Movies).results.push(movie)
        })
      }else {
        state.upcomingMovies = payload.movies
      }
    },
    clearUpcomingMovies(state){
      state.upcomingMovies = null
    },
  },
  actions: {
    clearTopRatedMovies(context){
      context.commit('clearTopRatedMovies')
    },
    clearPopularMovies(context){
      context.commit('clearPopularMovies')
    },
    clearUpcomingMovies(context){
      context.commit('clearUpcomingMovies')
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
    async getPopularMovies(context , payload) {
      const service = new Service();
      const response: Movies = await service.requestToServer(Movies, {
        baseURLConfig: {
          url: ServerURLs.popularMovies,
          language: false,
          sorting: false,
          query: false,
          page: payload.page
        },
        method: "GET",
      });
      context.commit('setPopularMovies', {
        movies: response
      })
      return response;
    },
    async getUpcomingMovies(context , payload) {
      const service = new Service();
      const response: Movies = await service.requestToServer(Movies, {
        baseURLConfig: {
          url: ServerURLs.upcomingMovies,
          language: true,
          sorting: false,
          query: false,
          page: payload.page
        },
        method: "GET",
      });
      context.commit('setUpcomingMovies', {
        movies: response
      })
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
