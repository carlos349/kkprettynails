<template>
	<nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-info ">

		<a class="navbar-brand" href="#">K · PRETTY · NAILS</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    	</button>

		<div class="collapse navbar-collapse justify-content-md-center" id="navbarToggleExternalContent">
			<ul class="navbar-nav">
				<li v-if="auth=='loggedin-admin'" class="nav-item">
					<a class="font-weight-bold text-uppercase nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	          Usuarios
	        </a>
	        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
						<router-link class="dropdown-item font-weight-bold text-uppercase" to="/register">Registrar usuario</router-link>
						<router-link class="dropdown-item font-weight-bold text-uppercase" to="/Usuarios">Ver usuarios</router-link>
	        </div>
				</li>
				<li v-if="auth=='loggedin-admin'" class="nav-item dropdown">
	        <a class="font-weight-bold text-uppercase nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	          Venta
	        </a>
	        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
						<router-link class="dropdown-item font-weight-bold text-uppercase" to="/venta">Realizar venta</router-link>
						<router-link  class="dropdown-item font-weight-bold text-uppercase" to="/verventas">Resumen de ventas</router-link>
	        </div>
      	</li>
				<li v-if="auth=='loggedin'" class="nav-item">
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/venta">Ventas</router-link>
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
					<router-link class="nav-link text-white font-weight-bold text-uppercase" to="/metricas">Métricas</router-link>
				</li>
				<li v-if="auth=='loggedin'" class="nav-item">
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
			user: ''
		}
	},

	methods: {
		logout() {
			localStorage.removeItem('userToken')
		},
	},

	mounted() {
		EventBus.$on('logged-in', status => {
			this.auth = status
		})
	}
}
</script>
<style media="screen">
	.dropdown-menu{
		left:auto !important;
	}
</style>
