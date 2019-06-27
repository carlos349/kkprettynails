<template>
  <div id="app">
    <navbar ></navbar>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar"
  import EventBus from './components/eventBus'
  export default {
    name: 'App',
    components: {
      'Navbar': Navbar
    }
  }
</script>
