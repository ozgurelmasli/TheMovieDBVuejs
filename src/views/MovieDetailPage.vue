<template>
  <movie-detail
    v-if="movieData.movie !== null"
    :movie="movieData.movie"
    :title="movieData.title"
  >
  </movie-detail>

  <hr class="solid">
  <movie-list
    v-if="similarMoviesData.movies !== null"
    :movies="similarMoviesData.movies"
    :title="similarMoviesData.title"
  >
  </movie-list>

</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import MovieList from "@/components/MovieList";

export default defineComponent({
  components: { MovieList },
  props: ["movieId"],
  computed: {
    ...mapGetters({
      getMovie: "movie",
      getSimilarMovies: "similarMovies",
    }),
    movieData() {
      return {
        title: "Movie Detail",
        movie: this.getMovie,
      };
    },
    similarMoviesData() {
      return {
        title: "Similar Movies",
        movies: this.getSimilarMovies,
      };
    },
  },
  methods: {
    ...mapActions({
      getMovieById: "getMovieById",
      clearMovie: "clearMovie",
      getSimilarMoviesByMovieId: "getSimilarMovies",
    }),
  },
  watch: {
    $route(){
      this.getMovieById({
        movieId: this.movieId,
      });
      this.getSimilarMoviesByMovieId({
        movieId: this.movieId,
      });
      window.scrollTo(0,0);
    }
  },
  unmounted() {
    this.clearMovie();
  },
});
</script>
