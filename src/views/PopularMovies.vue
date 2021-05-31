<template>
  <movie-list
    v-if="movieData.movies !== null"
    :movies="movieData.movies"
    :title="movieData.title"
    @loadNewPage="loadNewPage"
  >
  </movie-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import MovieList from "@/components/MovieList.vue";

export default defineComponent({
  components: { MovieList },
  computed: {
    ...mapGetters({
      getMovies: "popularMovies",
    }),
    movieData() {
      return {
        title: "Popular Movies",
        movies: this.getMovies,
      };
    },
  },
  methods: {
    ...mapActions({
      getPopularMovies: "getPopularMovies",
      clear: "clearPopularMovies",
    }),
    loadNewPage(page) {
      this.getPopularMovies({
        page: page,
      });
    },
  },
  mounted() {
    this.getPopularMovies({
      page: 1,
    });
  },
});
</script>
