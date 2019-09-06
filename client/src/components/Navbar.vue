<template>
	<div v-on:click="marcarNav()" v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(' + require('../assets/sidebar.jpg') + ')' , 'background-size': 'cover', 'height': '100vh', 'position': 'fixed' }" id="mySidenav" class="col-sm-2 pl-4 menuVertical">
		<div style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);" class="p-3 text-center col-md-12"><img src="../assets/logoNew.png" style="margin:auto;width:45%;" alt=""></div>

		<div style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);" class="text-white p-2 mx-auto col-md-12">
			<div v-on:click="moverFU()" data-toggle="collapse" href="#collapseUser" class="col-md-12 usuarioP">
				<img style="width:20%" :src="require('../assets/cris.png')" alt="">
				{{nombre}} {{apellido}}<span class="fOneU" style="margin-top:5%;float:right;font-size:1em">↓</span><span class="fTwoU" style="margin-top:5%;float:right;display:none;font-size:1em;">↑</span>
			</div>
			<div class="collapse" id="collapseUser">
				<ul class="listaMenu">
					<router-link class="text-white" to="/Usuarios"> <li>Editar perfil</li> </router-link>
					<router-link class="text-white" to="/Usuarios"> <li>Generar cita propia</li> </router-link>
					<router-link class="text-white" to="/"><li v-on:click="logout">Cerrar Sesión</li> </router-link>
				</ul>
			</div>
			
		</div>
		<div v-if="auth=='loggedin-admin'"  style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);">
				<div v-on:click="moverF('user')" data-toggle="collapse" href="#collapseExample" style="text-decoration:none !important" class="user usuarioP text-white" role="button" >
					<div  class="user nav-item">Usuarios <span class="fOne" style="float:right;font-size:1em;margin:auto">↓</span><span class="fTwo" style="float:right;display:none;font-size:1em;margin:auto">↑</span>
					</div>
				</div>
				<div class="collapse" id="collapseExample">
					<ul class="listaMenu">
						<router-link class="text-white" to="/register"> <li>Registrar usuario</li> </router-link>
						<router-link class="text-white" to="/Usuarios"> <li>Ver usuarios</li> </router-link>
					</ul>
				</div>
			</div>
		<ul  class="listaMenu">
			
			<router-link v-on:click="marcarNav('Ventas')" id="Ventas" v-if="auth=='loggedin-admin'" class=" text-white" to="/verventas">
				<li>Ventas</li>
			</router-link>
			
			<router-link v-on:click="marcarNav('Servicios')" id="Servicios" v-if="auth=='loggedin-admin'" class=" text-white" to="/servicios">
				<li class="nav-item">Servicios</li>
			</router-link>
			
			<router-link v-on:click="marcarNav('Empleadas')" id="Empleadas"  v-if="auth=='loggedin-admin'" class=" text-white " to="/empleadas">
				<li  class="nav-item">Manicuristas</li>
			</router-link>

			<router-link v-on:click="marcarNav('Inventario')" id="Inventario" v-if="auth=='loggedin-admin'" class="text-white" to="/inventario">
				<li  class="nav-item">Inventario</li>
			</router-link>

			<router-link v-on:click="marcarNav('Gastos')" id="Gastos" v-if="auth=='loggedin-admin'" class="text-white " to="/gastos">					
				<li  class="nav-item">Gastos</li>
			</router-link>
			
			<router-link v-on:click="marcarNav('Metricas')" id="Metricas" v-if="auth=='loggedin-admin'" class=" text-white " to="/metricas">
				<li  class="nav-item">Métricas</li>
			</router-link>
			
			<router-link v-on:click="marcarNav('Citas')" id="Citas" v-if="auth=='loggedin' || auth=='loggedin-admin'" class=" text-white " to="/citas">
				<li  class="nav-item">Citas</li>
			</router-link>
			
			<router-link v-on:click="marcarNav('Caja')" id="Caja" v-if="auth=='loggedin-admin' || auth=='loggedin-admin'" class=" text-white " to="/caja">
				<li  class="nav-item">Caja</li>
			</router-link>
			
		</ul>

          <!-- <vue-cal  class="calendarioo vuecal--rounded-theme vuecal--green-theme"
                   xsmall
                   hide-view-selector
                   :time="false"
                   events-count-on-year-view
                   default-view="month"
                   :locale="locale"
                   :events="eventos"
                   :disable-views="['week']">
          </vue-cal> -->
        </div>
	
</template>

<script>
import EventBus from './eventBus'
import router from '../router'
import jwtDecode from 'jwt-decode'

export default {
	data() {
		
		return {
			auth: 'no-loggedin',
			user: '',
			fecha: new Date(),
			nombre:localStorage.nombre,
			apellido: localStorage.apellido,
		}
	},
	created(){
		this.marcarNav()
		console.log(localStorage)
		
	},

	methods: {
		logout() {
			localStorage.removeItem('userToken')
			localStorage.setItem('logged-in', 'no-loggedin')
			localStorage.removeItem('nombre')
			localStorage.removeItem('apellido')
			localStorage.removeItem('image')
			localStorage.removeItem('email')
			$(".menuVertical").hide()
		},
		marcarNav(name){
			setTimeout(() => {
			var rout = router.app._route.name
			$("li").removeClass("act")
			$("#"+rout).children().addClass("act")
			}, 200);
			
		},
		moverF(nam){
			$(".fOne").toggle()
			$(".fTwo").toggle()
			
		},
		moverFU(nam){
			$(".fOneU").toggle()
			$(".fTwoU").toggle()
			
		}
	},

	mounted() {

		EventBus.$on('logged-in', status => {
			this.auth = status
			this.nombre = localStorage.nombre
			this.apellido = localStorage.apellido
			this.image = localStorage.image
		})
		const User = localStorage.getItem('logged-in')
		console.log(User)
		if (User === 'no-admin') {
			this.auth = 'loggedin'
		}else if(User === 'admin'){
			this.auth = 'loggedin-admin'
		}else{
			this.auth = 'no-loggedin'
		}
	}
}
</script>
<style media="screen">
	.dropdown-menu{
		left:auto !important;
	}
	.listaMenu li{
	text-decoration: none !important;
    padding:10px;
	border-radius: 5px;
    margin-top:5px;
    list-style-type: none;
    cursor:pointer;
    margin-left:-15%;
    height:5vh;
  }
  .act{
	  background-color: rgba(91, 91, 90, .5);
  }
  .listaMenu li:hover{
    background-color: rgba(91, 91, 90, .5);
  }
  .rout{
    color:white;
    text-decoration:none !important;

  }
  .rout:hover{
    color:white !important;
  }
  .listaMenu{
    color:white;
    margin-top:5%;
    margin-bottom:10%;
  }
  .text-white{
	  text-decoration: none !important;
  }
  .usuarioP{
	  border-radius: 5px;
	  cursor: pointer;
	  padding: 10px;
  }
  .usuarioP:hover{
	  background-color: rgba(91, 91, 90, .5);
	  
  }
</style>
