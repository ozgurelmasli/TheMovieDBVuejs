<template>
  <movie-detail
    v-if="movieData.movie !== null"
    :title="movieData.title"
    :movie="movieData.movie"
  >
  </movie-detail>
</template>



<script lang="ts">

import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    ...mapGetters({
      getMovie : 'movie'
    }),
    movieData(){
      return {
        title:  'Latest Movies',
        movie : this.getMovie
      }
    },
  },
  methods:{
    ...mapActions({
      getLatestMovies : 'getLatestMovies'
    })
  },
  mounted() {
    this.getLatestMovies()
  }
})

</script>


<style scoped>
h1 {
  text-align: center;
}


</style>