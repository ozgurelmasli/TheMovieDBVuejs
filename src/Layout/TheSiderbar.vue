<template>
  <div
    :class="{
      'sidebar active': menuActive,
      'sidebar passive': !menuActive
    }"
  >

    <span class="version">v{{ appVersion }}</span>
    <div class="sidebar-menu">
      <sidebar-menu :items="menu" :root="true"> </sidebar-menu>
    </div>
  </div>
</template>
<script>
import SidebarMenu from './SidebarMenu'

export default {
  props: ['menuActive'],
  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION,
      menu: [
        {
          label: 'Movies',
          icon: 'pi pi-fw pi-home',
          items: [
            { label: 'Latest Movies', icon: 'pi pi-fw pi-home', to: '/latest-movies' },
            { label: 'Top Rated Movies' , icon: 'pi pi-fw pi-chart-line' , to :'/top-rated-movies'},
            { label: 'Popular Movies' , icon: 'pi pi-fw pi-heart' , to :'/popular-movies'},
            { label: 'Upcoming Movies' , icon: 'pi pi-fw pi-bell' , to :'/upcoming-movies'}
          ]
        },
        {
          label:'Discover',
          items: [
            { label: 'Discover' , icon: 'pi pi-fw pi-compass' , to:'/discover'},
            { label: 'Search' , icon: 'pi pi-fw pi-search', to:'/search' }
          ]
        },
        { separator: true }
      ]
    }
  },
  components: {
    SidebarMenu
  }
}
</script>

<style scoped>
.active {
  width: 16rem;
}
.passive {
  width: 0rem;
}
.version {
  text-align: center;
  margin-bottom: 0.6rem;
  color: rgb(92, 91, 117);
}
.sidebar {
  background: rgb(56, 53, 76);

  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
  0 1px 10px 0 rgba(0, 0, 0, 0.12);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  user-select: none;
  transition: transform 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);

  vertical-align: middle;
}
.app-logo {
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
.sidebar-menu {
  overflow: auto;
  flex: 1;
  padding: 1rem;
}
</style>
