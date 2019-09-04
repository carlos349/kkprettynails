<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12 mt-5 max-auto">
				<form v-on:submit.prevent="register">
					<h1 class="h3 mb-3 font-weight-normal">Registro</h1>
					<div class="form-group">
						<label for="first_name">Nombre</label>
						<input type="text" v-model="first_name" class="form-control" name="first_name" placeholder="Coloque su nombre">
					</div>
					<div class="form-group">
						<label for="last_name">Apellido</label>
						<input type="text" v-model="last_name" class="form-control" name="last_name" placeholder="Coloque su apellido">
					</div>
					<div class="form-group">
						<label for="email">Direccion de correo</label>
						<input type="email" v-model="email" class="form-control" name="email" placeholder="Coloque su correo">
					</div>
					<div class="form-group">
						<label for="password">Contraseña</label>
						<input type="password" v-model="password" class="form-control" name="password" placeholder="Coloque su contraseña">
					</div>
					<button class="btn btn-lg btn-primary btn-block" type="submit">Registrar</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import router from '../router'
	import EventBus from './eventBus'

	export default {
		data(){
			return {
				first_name: '',
				last_name: '',
				email: '',
				password: ''
			}
		},
		beforeCreate() {
			if (!localStorage.getItem('userToken')) {
				this.$swal({
					type: 'error',
					title: 'URL restringida',
					showConfirmButton: false,
					timer: 1500
				})
				router.push({name: 'Login'})
			}
		},
		methods: {
			register () {
				axios.post('users/register', {
					first_name: this.first_name,
					last_name: this.last_name,
					email: this.email,
					password: this.password
				}).then(res => {
					this.$swal({
						type: 'success',
						title: 'Usuario registrado como admin',
						showConfirmButton: false,
						timer: 1500
					})
					router.push({name: 'Users'})
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>
