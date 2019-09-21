<template>
  <div class="row" id="app">
    <navbar v-on:mouseover="mouseOver()" v-on:mouseleave="mouseLeave()" ></navbar>
    <router-view style="margin-left:5%" class="bod col-md-11"/>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar"
  import EventBus from './components/eventBus'
  export default {
    name: 'App',
    components: {
      'Navbar': Navbar
    },

    methods: {
      mouseOver(){
			console.log("hover!")
			$(".navS").addClass("col-md-2")
      },

      mouseLeave(){
        console.log("leave!")
      }
    }
  }
</script>

<style>
  .menuVer:hover{
	  width:270px;
    z-index:2;
  }
  .menuVer{
    z-index:2;
  }
</style>
