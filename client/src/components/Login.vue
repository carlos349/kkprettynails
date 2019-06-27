<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12 mt-5 max-auto">
				<form v-on:submit.prevent="login">
					<h1 class="h3 mb-3 font-weight-normal">Acceder</h1>
					<div class="form-group">
						<label for="email">Direccion de correo</label>
						<input type="email" v-model="email" class="form-control" name="email" placeholder="Coloque su correo">
					</div>
					<div class="form-group">
						<label for="password">Contraseña</label>
						<input type="password" v-model="password" class="form-control" name="password" placeholder="Coloque su contraseña">
					</div>
					<button class="btn btn-lg btn-info btn-block" type="submit">Ingresar</button>
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
				email: '',
				password: ''
			}
		},

		methods: {
			login() {
				axios.post('users/login', {
					email: this.email,
					password: this.password
				}).then(res => {
					console.log(res)
					if(res.data.error == 'pass incorrecto'){
						this.$swal({
							type: 'error',
							title: 'Contraseña incorrecta',
							showConfirmButton: false,
							timer: 1500
						})
					}else if(res.data.error == 'User does not exist'){
						this.$swal({
							type: 'error',
							title: 'No esta registrado',
							showConfirmButton: false,
							timer: 1500
						})
					}else{
						localStorage.setItem('userToken', res.data.token)
						this.email = ''
						this.password = ''
						router.push({name: 'Home'})
						if(res.data.admin){
							this.emitMethodTwo()
						}else{
							this.emitMethod()
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			emitMethod() {
				EventBus.$emit('logged-in', 'loggedin')
			},
			emitMethodTwo() {
				EventBus.$emit('logged-in', 'loggedin-admin')
			}
		}
	}
</script>
