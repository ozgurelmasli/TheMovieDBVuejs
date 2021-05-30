<template>
  <base-card>
    <h2 class="title">
      {{ title }}
    </h2>

    <DataTable
      :value="movies.results"
      :row-hover="true"
      v-model:filters="filters"
      :paginator="true"
      @page="pageChanged"
      :rows="10"
    >
      <template #header>
        <div class="p-d-flex p-jc-between p-ai-center">
          <h5 class="p-m-0">Movies</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>
      <template #empty> No movies found </template>

      <template #loading> Loading movies... Please wait. </template>
      <Column field="original_title" sortable header="Title" />
      <Column field="popularity" sortable header="Popularity" />
      <Column field="original_language" sortable header="Original Language" />
      <Column field="vote_average" sortable header="Vote" />
      <Column field="vote_count" sortable header="Vote count" />
      <Column headerStyle="width: 8rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
        <template #body>
          <Button type="button" @click="detailButtonTapped" label="Detail"></Button>
        </template>
      </Column>


    </DataTable>
  </base-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Movies } from "@/Models/Movies";
import { FilterMatchMode } from "primevue/api";

export default defineComponent({
  emits: ['loadNewPage'],
  props: {
    title: {
      type: String,
      required: true,
    },
    movies: {
      type: Movies,
      required: true,
    },
  },
  data() {
    return {
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  methods: {
    pageChanged(event: any) {
      const currentPage = event.page
      const lastPageIndex = event.pageCount - 1
      const nextPageIndex = lastPageIndex + 2
      const condition = (currentPage === lastPageIndex) && (nextPageIndex <= this.movies.total_pages)
      if (condition){
        this.$emit('loadNewPage' , nextPageIndex)
      }
    },
    detailButtonTapped(){
      console.log('sadad')
    }
  },
});
</script>
