<template>
	<div  v-on:click="marcarNav()" v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(' + require('../assets/sidebar.jpg') + ')' , 'background-size': 'cover', 'height': '100vh', 'position': 'fixed' }"  class=" pl-2 menuVer navS" v-on:mouseenter="mouseOver()" v-on:mouseleave="mouseLeave()">
		<div style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);" class="p-3  text-center col-md-12"><img src="../assets/logoNew.png" class="logoNonHover"  alt=""></div>

		<div style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);" class="text-white p-2 mx-auto col-md-12">
			<div v-on:click="moverFU()" data-toggle="collapse" href="#collapseUser" class="col-md-12 usuarioP">
				<div class="row">
					<div class="col-sm-3">
						<img class="imgHover" :src="require('../assets/cris.png')" alt="">
					</div>
					<div class="menuText col-sm-9">
						<span class="infoUser align-bottom">{{nombre}} {{apellido}}</span>
						<span style="background-color:#ded22f;padding:3px;color:black;border-radius:5px;" v-if="auth=='loggedin-admin'" class="tipoUser align-bottom">Administrador</span>
						<span style="background-color:#ded22f;padding:3px;color:black;border-radius:5px;" v-if="auth=='loggedin'" class="tipoUser align-bottom">Trabajador</span>
						<font-awesome-icon icon="caret-down" class="fOneU nonHover" style="float:right;font-size:1em;margin:auto;margin-top:8%" /><font-awesome-icon class="fTwoU" style="float:right;display:none;font-size:1em;margin:auto;margin-top:8%" icon="caret-up"  />
					</div>
				</div>
				

					
			</div>
			<div class="collapse" id="collapseUser">
				<ul class="listaMenu">
					<router-link class="text-white menuText" to="/Usuarios"> <li>Editar perfil</li> </router-link>
					<router-link class="text-white menuText" to="/Usuarios"> <li>Generar cita propia</li> </router-link>
					<router-link class="text-white menuText" to="/"><li v-on:click="logout">Cerrar Sesión</li> </router-link>
				</ul>
			</div>
			
		</div>
		<div v-if="auth=='loggedin-admin'"  style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);">
				<div v-on:click="moverF('user')" data-toggle="collapse" href="#collapseExample" style="text-decoration:none !important" class="user usuarioP text-white" role="button" >
					
					<div style="color: rgba(250, 248, 248, .8);" class=" user nav-item"><font-awesome-icon class="ml-3" style="margin-right:4%;font-size:1.5em;margin-left:5.5%;" icon="users" /><span class="menuText nonHover">Usuarios 
					
					<font-awesome-icon icon="caret-down" class="fOne  nonHover" style="float:right;font-size:1em;margin:auto;margin-top:3%" />

					<font-awesome-icon class="fTwo" style="float:right;display:none;font-size:1em;margin:auto;margin-top:3%" icon="caret-up"  /></span>
					 
					</div>
				</div>
				<div class="collapse" id="collapseExample">
					<ul class="listaMenu menuText">
						<router-link class="text-white align-middle" to="/register"> <li class="align-middle"><font-awesome-icon class="icons" icon="plus" /> <span class="align-top">Registrar usuario</span> </li> </router-link>
						<router-link class="text-white align-middle" to="/Usuarios"> <li><font-awesome-icon class="icons" icon="user-lock" />Ver usuarios</li> </router-link>
					</ul>
				</div>
			</div>
			<div id="Ventas" v-on:click="marcarNav('Ventas')" v-if="auth=='loggedin-admin'" class="col-sm-12">
				
				<router-link  class=" text-white" to="/verventas">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="clipboard-check" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Ventas</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Servicios" v-on:click="marcarNav('Servicios')" v-if="auth=='loggedin-admin'" class="col-sm-12">
				
				<router-link  class=" text-white" to="/servicios">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="poll-h" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Servicios</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Empleadas" v-on:click="marcarNav('Empleadas')" v-if="auth=='loggedin-admin'" class="col-sm-12">
				
				<router-link  class=" text-white" to="/empleadas">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="user-tag" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Personal</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Inventario" v-on:click="marcarNav('Inventario')" v-if="auth=='loggedin-admin'" class="col-sm-12">
				
				<router-link  class=" text-white" to="/inventario">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="box-open" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Inventario</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Gastos" v-on:click="marcarNav('Gastos')" v-if="auth=='loggedin-admin'" class="col-sm-12">
				
				<router-link  class=" text-white" to="/gastos">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="search-dollar" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Gastos</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Citas" v-on:click="marcarNav('Citas')" v-if="auth=='loggedin-admin'|| auth == 'loggedin'" class="col-sm-12">
				
				<router-link  class=" text-white" to="/citas">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="tasks" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Citas</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Metricas" v-on:click="marcarNav('Metricas')" v-if="auth=='loggedin-admin'" class="col-sm-12">
				
				<router-link  class=" text-white" to="/metricas">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="chart-line" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Metricas</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Caja" v-on:click="marcarNav('Caja')" v-if="auth=='loggedin-admin' " class="col-sm-12">
				
				<router-link  class=" text-white" to="/caja">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="cash-register" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Caja</span> </div>
						</div>
				</router-link>
			</div>

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
			authTwo: true
		}
	},
	created(){
		this.marcarNav()
		console.log(localStorage)
		this.intervalM()
		
	},

	methods: {
		logout() {
			localStorage.removeItem('userToken')
			localStorage.setItem('logged-in', 'no-loggedin')
			localStorage.removeItem('nombre')
			localStorage.removeItem('apellido')
			localStorage.removeItem('image')
			localStorage.removeItem('email')
			$(".menuVer").hide()
		},
		marcarNav(name){
			setTimeout(() => {
			var rout = router.app._route.name
			$("div").removeClass("act")
			$("#"+rout).addClass("act")
			}, 200);
			
		},
		moverF(nam){
			$(".fOne").toggle()
			$(".fTwo").toggle()
			
		},
		moverFU(nam){
			$(".fOneU").toggle()
			$(".fTwoU").toggle()
			
		},
		mouseOver(){
			console.log($(".navS").width())
			setTimeout(() => {
				if ($(".navS").width() > "200" ) {
				$('.menuText').show("slow")
				
			}
			}, 500);
			
			
		},
		mouseLeave(){
			$('.menuText').hide()
			console.log("leave!")
			
		},
		intervalM(){
			setInterval(() => {
				if ($(".navS").width() < "100" ) {
				$('.menuText').hide("slow")
				
			}
			}, 500);
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
	.menuText{
		display: none;
	}
	.all{
		font-weight: 300;
		overflow: hidden;
	}
	.menuVer{
		transition: all 0.5s ease-out;
		overflow: hidden !important;
	}
	.navS{
    width: 85px;
	overflow: hidden;
  	}
	.dropdown-menu{
		left:auto !important;
	}
	.listaMenu li{
	text-decoration: none !important;
    padding:10px;
	padding-left: 28%;
	border-radius: 5px;
    margin-top:5px;
    list-style-type: none;
    cursor:pointer;
    margin-left:-15%;
    height:5vh;
	transition: all 0.5s ease-out;
	color: rgba(250, 248, 248, .8);
  }
  .act{
	  background-color: rgba(91, 91, 90, .5);
	
  }
  .listaMenu li:hover{
    background-color: rgba(91, 91, 90, .5);
	transition: all 0.5s ease-out;
  }
  .rout{
    color:white;
    text-decoration:none !important;
	transition: all 0.5s ease-out;

  }
 
  .rout:hover{
    color:white !important;
	transition: all 0.5s ease-out;
  }
  
  .listaMenu:hover{
    background-color: rgba(91, 91, 90, .5);
	transition: all 0.5s ease-out;
  }
  .text-white{
	  text-decoration: none !important;
  }
  .usuarioP{
	  border-radius: 5px;
	  cursor: pointer;
	  padding: 10px;
	  transition: all 0.5s ease-out;
  }
  .usuarioP:hover{
	  background-color: rgba(91, 91, 90, .5);
	  transition: all 0.5s ease-out;
	  
  }
  .icone{
	  font-size: 1.5em;
	  transition: all 0.5s ease-out;
	  color: rgba(152, 152, 152, 1)
  }
 
  span{
	  overflow: hidden;
	  transition: all 2s ease;
  }
  
  .imgHover{
	  width: 50px;
	  transition: all 0.5s ease-out;
  }
 
  .logoHover{
	  width: 45%;
	  transition: all 0.5s ease-out;
  }
  .logoNonHover{
	  width: 50px;
	  transition: all 0.5s ease-out;
  }
</style>
