<template>
  <div class="row" id="app">
    <navbar class="col-md-2" ></navbar>
    <router-view style="margin-left:18%" class="col-md-9"/>
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
