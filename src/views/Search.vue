<template>
  <h1>Search</h1>
  <hr class="solid" />
  <span class="p-input-icon-left" style="width: 70%">
    <i class="pi pi-search" />
    <InputText
      v-model="searchText"
      placeholder="Search Movie"
      style="width: 100%"
      type="text"
      v-on:keyup.enter="onEnterTapped"
    />
  </span>

  <div v-if="movieData.movies === null">
    <Button
      v-if="keywords.length !== 0"
      class="p-button-danger , p-button-text"
      label="Delete All"
      style="margin-top: 20px"
      @click="onDeleteTapped"
    />
    <hr class="solid" style="width: 20%" />
    <p v-for="(item, index) in keywords" :key="index">
      <Button
        :label="item"
        class="p-button-raised p-button-text"
        @click="onKeywordTapped(index)"
      />
    </p>
  </div>
  <div v-else>
    <movie-list
      v-if="movieData.movies !== null"
      :movies="movieData.movies"
      :title="movieData.title"
      style="margin-top: 40px"
    >
    </movie-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";
import MovieList from "@/components/MovieList.vue";

export default defineComponent({
  components: { MovieList },
  data() {
    return {
      searchText: "",
      keywords: [],
      localStorageKey: "keywords"
    };
  },
  computed: {
    ...mapGetters({
      getMovies: "searchMovies"
    }),
    movieData() {
      return {
        title: "Searching Result",
        movies: this.getMovies
      };
    }
  },
  watch: {
    searchText() {
      if (this.searchText === "") {
        this.clearSearch();
        return;
      }
      this.search({
        text: this.searchText
      });
    }
  },
  mounted() {
    const val = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (val !== null) { this.keywords = val }
  },
  methods: {
    ...mapActions({
      search: "search",
      clearSearch: "clearSearchingMovies"
    }),
    onKeywordTapped(index) {
      this.searchText = this.keywords[index];
    },
    onDeleteTapped() {
      localStorage.removeItem(this.localStorageKey);
      this.keywords = [];
    },
    onEnterTapped() {
      if (this.searchText === "") {
        return;
      }
      if (this.keywords.length > 0) {
        this.keywords.push(this.searchText)
        localStorage.setItem(
          this.localStorageKey,
          this.keywords
        );
      } else {
        this.keywords = [this.searchText]
        localStorage.setItem(this.localStorageKey, JSON.stringify([this.searchText]));
      }
    }
  }
});
</script>
