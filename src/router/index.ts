import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LatestMovies from '@/views/LatestMovies.vue'
import TopRatedMovies from '@/views/TopRatedMovies.vue'
import PopularMovies from '@/views/PopularMovies.vue'
import UpcomingMovies from '@/views/UpComingMovies.vue'

import DiscoverMovies from '@/views/Discover.vue'
import SearchMovie from '@/views/Search.vue'

import MainLayout from '../Layout/MainLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect : "/latest-movies",
    component:  MainLayout,
    children : [
      {
        path : '/latest-movies',
        name : 'LatestMovies',
        component: LatestMovies,
        meta : { label  : 'Latest Movies' }
      },
      {
        path : '/top-rated-movies',
        name : 'TopRatedMovies',
        component: TopRatedMovies,
        meta : { label  : 'Top Movies' }
      },
      {
        path : '/popular-movies',
        name : 'PopularMovies',
        component: PopularMovies,
        meta : { label  : 'Popular Movies' }
      },
      {
        path : '/upcoming-movies',
        name : 'UpcomingMovies',
        component: UpcomingMovies,
        meta : { label  : 'Upcoming Movies' }
      },
      {
        path : '/discover',
        name : 'Discover',
        component: DiscoverMovies,
        meta : { label  : 'Discover' }
      },
      {
        path : '/search',
        name : 'Search',
        component: SearchMovie,
        meta : { label  : 'Search' }
      }
    ]

  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
