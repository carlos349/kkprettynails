<template>
<div>
	<div v-if="showNav"  v-on:click="marcarNav()" v-bind:style="{ 'background-color': 'rgba(238, 238, 238, 0.623)', 'height': '167vh', 'position': 'fixed', 'z-index' : '1000', 'color': 'black !important' }"  class=" pl-2 menuVer navS" v-on:mouseenter="mouseOver()" v-on:mouseleave="mouseLeave()">
		<div style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);" class="p-3  text-center col-md-12"><img src="../assets/logoNew.png" class="logoNonHover"  alt=""></div>

			<div style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);color:black" class=" p-2 pb-1 pt-1 mx-auto col-md-12 paddingName">
				<div v-on:click="moverFU()" data-toggle="collapse" href="#collapseUser" class="col-md-12 usuarioP ">
					<div class="row">
						<div class="col-sm-3">
							<img class="imgHover" v-bind:src="image" style="width:50px;height:50px;border-radius:40px;">
						</div>
						<div class="menuText col-sm-9">
							<span class="infoUser align-bottom">{{nombre}} {{apellido}}</span>
							<span style="background-color:#ded22f;padding:3px;color:black;border-radius:5px;" v-if="auth == 1" class="tipoUser align-bottom">Gerencia</span>
							<span style="background-color:#ded22f;padding:3px;color:black;border-radius:5px;" v-if="auth == 2" class="tipoUser align-bottom">Personal de caja</span>
							<span style="background-color:#ded22f;padding:3px;color:black;border-radius:5px;" v-if="auth == 3" class="tipoUser align-bottom">Prestadora</span>
							<font-awesome-icon icon="caret-down" class="fOneU nonHover" style="float:right;font-size:1em;margin:auto;margin-top:8%" /><font-awesome-icon class="fTwoU" style="float:right;display:none;font-size:1em;margin:auto;margin-top:8%" icon="caret-up"  />
						</div>
					</div>
				</div>
				<div class="collapse" id="collapseUser">
					<ul style="color:black !important" class="listaMenuP">
						<router-link style="text-decoration: none !important;" class="menuText" to="/profile"> <li><font-awesome-icon class="icons mr-3" icon="edit" />Perfil de usuario</li> </router-link>
						<router-link style="text-decoration: none !important;" class="menuText" to="/"><li v-on:click="logout"><font-awesome-icon class="icons mr-3" icon="sign-out-alt" />Cerrar Sesión</li> </router-link>
					</ul>
				</div>
				
			</div>
			<div v-if="auth == 1"  style="border-bottom:1.5px solid  rgba(91, 91, 90, .5);">
				<div v-on:click="moverF('user')" data-toggle="collapse" href="#collapseExample" style="text-decoration:none !important" class="user usuarioP " role="button" >
					
					<div style="color: black;" class=" user nav-item"><font-awesome-icon class="ml-3" style="margin-right:4%;font-size:1.5em;margin-left:5.5%;" icon="users" /><span class="menuText nonHover">Usuarios 
					
					<font-awesome-icon icon="caret-down" class="fOne  nonHover" style="float:right;font-size:1em;margin:auto;margin-top:3%" />

					<font-awesome-icon class="fTwo" style="float:right;display:none;font-size:1em;margin:auto;margin-top:3%" icon="caret-up"  /></span>
					 
					</div>
				</div>
				<div style="color: black;" class="collapse" id="collapseExample">
					<ul class="listaMenu menuText">
						<router-link style="text-decoration: none !important;" class="align-middle" to="/Usuarios"> <li><font-awesome-icon class="icons" icon="user-lock" /> Usuarios</li> </router-link>
					</ul>
				</div>
			</div>
			<div id="procesarVentas" v-if="auth == 1 || auth == 2 " class="col-sm-12">
				
				<span style="cursor:pointer;color: black !important;" v-on:click="processOpen" to="/caja">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="tags" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Procesar venta</span> </div>
						</div>
				</span>
			</div>
			<div id="Ventas" v-on:click="marcarNav('Ventas')" v-if="auth == 1" class="col-sm-12">
				
				<router-link style="text-decoration: none !important;"  class=" " to="/verventas">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="clipboard-check" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Ventas</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Servicios" v-on:click="marcarNav('Servicios')" v-if="auth == 1" class="col-sm-12">
				
				<router-link style="text-decoration: none !important;"  class=" " to="/servicios">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="poll-h" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Servicios</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Empleadas" v-on:click="marcarNav('Empleadas')" v-if="auth == 1" class="col-sm-12">
				
				<router-link style="text-decoration: none !important;" class=" " to="/empleadas">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="user-tag" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Personal</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Clientes" v-on:click="marcarNav('Clientes')" v-if="auth == 1" class="col-sm-12">
				
				<router-link style="text-decoration: none !important;" class=" " to="/clientes">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="address-book" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Clientes</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Inventario" v-on:click="marcarNav('Inventario')" v-if="auth == 1" class="col-sm-12">
				
				<router-link style="text-decoration: none !important;" class=" " to="/inventario">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="box-open" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Inventario</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Gastos" v-on:click="marcarNav('Gastos')" v-if="auth == 1" class="col-sm-12">
				
				<router-link style="text-decoration: none !important;" class=" " to="/gastos">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="search-dollar" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Gastos</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Citas" v-on:click="marcarNav('Citas')" v-if="auth == 1 || auth == 2 || auth == 3 " class="col-sm-12">
				
				<router-link style="text-decoration: none !important;" class=" " to="/citas">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="tasks" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Citas</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Metricas" v-on:click="marcarNav('Metricas')" v-if="auth == 1" class="col-sm-12">
				
				<router-link style="text-decoration: none !important;" class=" " to="/metricas">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="chart-line" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Metricas</span> </div>
						</div>
				</router-link>
			</div>
			<div id="Caja" v-on:click="marcarNav('Caja')" v-if="auth== 1" class="col-sm-12">
				
				<router-link style="text-decoration: none !important;" class=" " to="/caja">
						<div class="listaMenu row p-3">
							<div class="col-sm-1">
								<font-awesome-icon class="icone" icon="cash-register" />
							</div>
							<div class=" menuText pl-4 col-sm-10 ">
								<span class="nonHover">Caja</span> </div>
						</div>
				</router-link>
			</div>
			
        </div>
		<div v-if="showNav" class="modal fade bd-example-modal-xl" id="myModalThree" tabindex="-1"  aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-lg " role="document">
		    <div v-bind:style="{ 'background-color': 'white'}"  class="modal-content p-0">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#6BB2E5'}">
				  <img src="" alt="">
				  <div class=" text-center p-0 col-md-12">
					  <img src="../assets/logokk.png" class="logoVenta"  alt="">
					   <b style="font-size:1.5em;color:white" class="">KKPrettyNails</b>
					  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true" class="">&times;</span>
					  </button>
				  </div>
		        <!-- <h5 class="modal-title " id="exampleModalCenterTitle">Procesar venta</h5> -->
		        
		      </div>
		      <div class="modal-body pb-0">
		        <procesar></procesar>
		      </div>
		    </div>
		  </div>
		</div>

<!-- <div id="mydiv">
  <div id="mydivheader">Click here to move</div>
  <div class="col-sm-12">
	  <div class="row">
		  <div class="col-sm-12 p-1">
			  <input class="calcuPantalla" type="text">
		  </div>
	  </div>
  </div>
</div> -->
</div>
</template>

<script>
import Procesar from "./Procesar"
import EventBus from './EventBus'
import router from '../router'
import jwtDecode from 'jwt-decode'
import endPoint from '../../config-endpoint/endpoint.js'
export default {
	components: {
      'Procesar': Procesar
    },
	data() {
		
		return {
			auth: 'no-loggedin',
			user: '',
			fecha: new Date(),
			nombre:localStorage.nombre,
			apellido: localStorage.apellido,
			image:endPoint.imgEndpoint+localStorage.imageUser,
			authTwo: true,
			showNav: false
		}
	},
	created(){
		this.marcarNav()
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
			localStorage.removeItem('imageUser')
			this.nombre = ''
			this.apellido = ''
			this.image = ''
			this.email = ''
			$(".menuVer").hide()
		},
		processOpen(){
			$('#myModalThree').modal('show')
			// EventBus.$emit('borrar-services')
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
			
			$(".collapse").removeClass("show")
			$(".fOne").show()
			$(".fTwo").hide()
			$(".fOneU").show()
			$(".fTwoU").hide()
			setTimeout(() => {
				if ($(".navS").width() > "200" ) {
				$('.menuText').show("slow")
				
			}
			}, 500);
			
		},
		mouseLeave(){
			
			$(".collapse").removeClass("show")
			$(".fOne").show()
			$(".fTwo").hide()
			$(".fOneU").show()
			$(".fTwoU").hide()
			$('.menuText').hide()		
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
			this.image = endPoint.imgEndpoint+localStorage.getItem('imageUser')
			this.showNav = true
		})
		EventBus.$on('ChangeImage', status => {
			this.image = endPoint.imgEndpoint+status
		})
		EventBus.$on('logged-out', status => {
			this.showNav = status
		})
		EventBus.$on('data-change', status => {
			this.nombre = status.nombre
			this.apellido = status.apellido
		})
		EventBus.$on('change-status', status => {
			console.log(status)
			this.auth = status
		})
		const User = localStorage.getItem('logged-in')
		this.auth = User
	}

	
}
</script>
<style media="screen">
	.menuText{
		display: none;
		color: black !important;
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
    height:8.35vh;
	transition: all 0.5s ease-out;
	color: black !important;
  }
  .act{
	  background-color: #6BB2E5;
	
  }
  .listaMenu li:hover{
    background-color: #6BB2E5;
	transition: all 0.5s ease-out;
  }
  .listaMenuP li{
	text-decoration: none !important;
    padding:10px;
	padding-left: 28%;
	border-radius: 5px;
    margin-top:5px;
    list-style-type: none;
    cursor:pointer;
    margin-left:-15%;
    height:8.35vh;
	transition: all 0.5s ease-out;
	color: black !important;
  }

  .listaMenuP li:hover{
    background-color: #6BB2E5;
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
    background-color: #6BB2E5;
	transition: all 0.5s ease-out;
  }
  .{
	  text-decoration: none !important;
  }
  
  .usuarioP{
	  
	  cursor: pointer;
	  padding: 10px;
	  
	  transition: all 0.5s ease-out;
  }
  .usuarioP:hover{
	  background-color:#6BB2E5;
	  transition: all 0.5s ease-out;
	  
  }
  .icone{
	  font-size: 1.5em;
	  transition: all 0.5s ease-out;
	  color: black
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
  .logoVenta{
	  width: 7%;
	  transition: all 0.5s ease-out;
	  float: left;
  }

  #mydiv {
  position: absolute;
  width: 30%;
  z-index: 9;
  background-color: #f1f1f1;
  text-align: center;
  border: 1px solid #d3d3d3;
}

#mydivheader {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
}
.calcuPantalla{
	background-color: #becd94;
	width: 80%;
	padding: 10px;
}

font-awesome-icon{
	color: black !important;
}

</style>

