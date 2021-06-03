<template>
  <movie-detail
    v-if="movieData.movie !== null"
    :title="movieData.title"
    :movie="movieData.movie"
  >
  </movie-detail>
</template>


<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  props : ['movieId'],
  computed: {
    ...mapGetters({
      getMovie : 'movie'
    }),
    movieData(){
      return {
        title:  'Movie Detail',
        movie : this.getMovie
      }
    },
  },
  methods : {
    ...mapActions({
      getMovieById : 'getMovieById',
      clearMovie : 'clearMovie'
    })
  },
  mounted() {
    this.getMovieById({
      movieId : this.movieId
    })
  },
  unmounted() {
    this.clearMovie()
  }
})

</script>