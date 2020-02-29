<template style="background-color:black;">
  <div  class="row"  id="app">
    <navbar v-on:mouseover="mouseOver()" v-on:mouseleave="mouseLeave()" ></navbar>
    <router-view style="margin-left:5%" class="bod col-md-11"/>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar"
  import EventBus from './components/EventBus'
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  export default {
    name: 'App',
    components: {
      'Navbar': Navbar,
      vueCustomScrollbar
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
    background-color: rgb(238, 238, 238) !important;
    z-index:2;
  }
  .menuVer{
    z-index:2;
  }
  .modal-backdrop{
    width: 167vw;
    height: 167vh;;
  }
  .animate {
  transition-delay: .1s;
  transition-duration: .25s;
  transition-timing-function: ease-in;
}
 
.slide-up {
  transform: translateY(0)
}
 
.slide-up.animate-active {
  transform: translateY(-100px)
}
</style>
