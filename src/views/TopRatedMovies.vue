<template>
  <movie-list
    v-if="movieData.movies !== null"
    :title="movieData.title"
    :movies="movieData.movies"
    @loadNewPage="loadNewPage"
  >

  </movie-list>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import MovieList from "@/components/MovieList.vue";

export default defineComponent ({
  components: { MovieList },
  computed:{
    ...mapGetters({
      getMovies : 'movies'
    }),
    movieData(){
      console.log(this.getMovies)
      return {
        title:  'Top Rated Movies',
        movies : this.getMovies
      }
    },
  },
  methods:{
    ...mapActions({
      getTopRatedMovies : 'getTopRatedMovies',
      clear: 'clearTopRatedMovies'
    }),
    loadNewPage(page){
      this.getTopRatedMovies({
        page: page
      })
    }
  },
  mounted() {
     this.getTopRatedMovies({
       page:1
     })
  },
  unmounted() {
    this.clear()
  }
})

</script>
