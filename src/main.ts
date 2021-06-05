import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import PrimeVue from 'primevue/config'

import BaseCard from './components/BaseCard.vue'

import MovieDetail from "@/components/MovieDetail.vue";

import InputText from "primevue/inputtext";
import Knob from "primevue/knob";

import Button from 'primevue/button';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DataView from 'primevue/dataview';


import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/bootstrap4-light-purple/theme.css'
import 'primevue/resources/primevue.min.css'

import 'reflect-metadata';
import 'es6-shim';

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue)

app.component('InputText' , InputText)
app.component('base-card' , BaseCard)
app.component('movie-detail' , MovieDetail)
app.component('Knob' , Knob)
app.component('Button' , Button)
app.component('DataTable' , DataTable)
app.component('DataView',DataView)
app.component('Column', Column)

app.mount('#app')