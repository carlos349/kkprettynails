<template>
	<nav class="navbar navbar-expand-lg sticky-top navbar-dark" style="background-color:#213b45;-webkit-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);">
		<img src="../assets/syswa2.png" style="width:6%;" alt="">
		<a class="navbar-brand" href="#"></a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    	</button>

		<div class="collapse navbar-collapse justify-content-md-center" id="navbarToggleExternalContent">
			<ul class="navbar-nav">
				<li style="color:#fff">{{fecha}}</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<a class="font-weight-bold text-uppercase nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Usuarios
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
								<router-link class="dropdown-item font-weight-bold text-uppercase" to="/register">Registrar usuario</router-link>
								<router-link class="dropdown-item font-weight-bold text-uppercase" to="/Usuarios">Ver usuarios</router-link>
					</div>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/verventas">Ventas</router-link>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/servicios">Servicios</router-link>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/empleadas">Manicuristas</router-link>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/inventario">Inventario</router-link>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/gastos">Gastos</router-link>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/metricas">Métricas</router-link>
				</li>
				<li v-if="auth=='loggedin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/citas">Citas</router-link>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/citas">Citas</router-link>
				</li>
				<li v-if="auth=='loggedin'" class="nav-item">
					<a class="nav-link text-white font-weight-bold text-uppercase" href="/" v-on:click="logout">Cerrar Sesion</a>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<a class="nav-link text-white font-weight-bold text-uppercase" href="/" v-on:click="logout">Cerrar Sesion</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import EventBus from './eventBus'


export default {
	data() {
		return {
			auth: 'no-loggedin',
			user: '',
			fecha: new Date()
		}
	},

	methods: {
		logout() {
			localStorage.removeItem('userToken')
			localStorage.setItem('logged-in', 'no-loggedin')
		},
	},

	mounted() {
		EventBus.$on('logged-in', status => {
			this.auth = status
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
</style>
