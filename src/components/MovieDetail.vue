<template>
  <base-card v-if="isMovieAdult && !filterAccepted">
    <p v-if="!isFilterDenied">This movie for +18 persons , Are you older than 18 ?</p>
    <p v-else> You can't see this movie</p>
    <Button
      v-if="!isFilterDenied"
      label="YES"
      @click="filterAccept"
      class="p-button-raised p-button-warning"
    />
    <Button
      v-if="!isFilterDenied"
      label="NO"
      @click="filterDenied"
      class="p-button-raised p-button-danger"
    />
  </base-card>
  <base-card v-else>
    <h2 class="title">
      {{ title }}
    </h2>
    <img :src="getUrl" class="backdrop_image" />

    <h3>Movie name : {{ movie.original_title }}</h3>

    <hr class="solid" />
    <h5>Overwiew</h5>
    <p>
      {{ movie.overview }}
    </p>

    <hr class="solid" />
    <h5>Genres</h5>
    <div
      v-if="
        typeof movie.genre_ids !== 'undefined' && movie.genre_ids.length !== 0
      "
    >
      <p v-for="item in movie.genre_ids" :key="item.valueOf()">
        {{ item }}
      </p>
    </div>
    <div v-else>
      <p>Unspecified Genres</p>
    </div>

    <hr class="solid" />
    <h5>Original Language</h5>
    <p v-if="typeof movie.original_language !== 'undefined'">
      {{ movie.original_language.toUpperCase() }}
    </p>
    <p v-else>Unspecified Genres</p>

    <hr class="solid" />
    <p>Type</p>
    <div v-if="typeof movie.adult !== 'undefined'">
      <p v-if="movie.adult" style="color: red">+18</p>
      <p v-else style="color: green">General</p>
    </div>

    <hr class="solid" />
    <h5>Popularity</h5>
    <Knob
      v-if="typeof movie.popularity !== 'undefined'"
      v-model="popularity"
      :max="maxValueOfPopularity"
      :min="0"
      :size="100"
      readonly
    >
    </Knob>

    <hr class="solid" />
    <h5>Production Companies</h5>
    <div
      v-if="
        typeof movie.production_companies !== 'undefined' &&
        movie.production_companies.length !== 0
      "
    >
      <p v-for="item in movie.production_companies" :key="item.id">
        {{ item.name }}
      </p>
    </div>
    <div v-else>
      <p>Unspecified Companies</p>
    </div>

    <hr class="solid" />
    <h5>Movies Status</h5>
    <p>
      {{ movie.status }}
    </p>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Movie } from "@/Models/Movies";
export default defineComponent({
  data() {
    return {
      filterAccepted: false,
      isFilterDenied : false
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    movie: {
      type: Movie,
      required: true,
      default: null,
    },
  },
  methods: {
    filterAccept() {
      this.filterAccepted = true;
    },
    filterDenied() {
      this.filterAccepted = false;
      this.isFilterDenied = true
    },
  },
  computed: {
    isMovieAdult(): boolean {
      return typeof this.movie.adult === "undefined" ? false : this.movie.adult;
    },
    popularity(): number {
      return typeof this.movie.popularity === "undefined"
        ? 0
        : this.movie.popularity;
    },
    maxValueOfPopularity(): number {
      return typeof this.movie.popularity === "undefined"
        ? 100
        : this.movie.popularity + 200;
    },
    getUrl(): string {
      const imageURL =
        this.movie === null
          ? ""
          : this.movie.poster_path === null
          ? this.movie.backdrop_path === null
            ? ""
            : this.movie.backdrop_path
          : this.movie.poster_path;
      return this.$store.getters["imageUrl"](imageURL);
    },
  },
});
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.backdrop_image {
  width: 40%;
  border-radius: 20px;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
</style>
