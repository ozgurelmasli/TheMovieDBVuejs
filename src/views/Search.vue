<template>
  <h1>Search</h1>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText type="text" v-model="searchText" placeholder="Search" />
  </span>
</template>

<script lang="ts">
import { mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  data(){
    return {
      searchText :  ""
    }
  },
  watch:{
    async searchText(){
      if (this.searchText === '') { return }
      const data = await this.search({
        text : this.searchText
      })
      console.log(data)
    }

  },
  methods: {
    ...mapActions({
      search: "search",
    }),
  },
});
</script>
