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
      getMovies: "upcomingMovies",
    }),
    movieData() {
      return {
        title: "Upcoming Movies",
        movies: this.getMovies,
      };
    },
  },
  methods:{
    ...mapActions({
      getUpcomingMovies : 'getUpcomingMovies',
      clear: "clearPopularMovies",
    }),
    loadNewPage(page) {
      this.getUpcomingMovies({
        page: page,
      });
    },
  },
   mounted() {
     this.getUpcomingMovies({
       page: 1
     })
  }
})

</script>