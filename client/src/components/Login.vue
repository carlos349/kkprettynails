<template>

		<div class="card cardLogin">
			<div class="row">
				<div class="col-md-12  max-auto">
					<form v-on:submit.prevent="login">
						<img style="width:12%;margin-left:-3%" src="../assets/syswa.png" alt=""><span class="logoLetra">Syswa</span>
						<h1 class="h3 font-weight-normal">Iniciar sesión</h1>
						<div class="form-group">
							<label for="email">Dirección de correo</label>
							<input type="email" v-model="email" class="inputLogin" name="email" placeholder="Ingrese su correo">
						</div>
						<div class="form-group">
							<label for="password">Contraseña</label>
							<input type="password" v-model="password" class="inputLogin" name="password" placeholder="Ingrese su contraseña">
						</div>
						<button class="btn btn-lg btn-block botonLogin" type="submit">Ingresar</button>
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

<style media="screen">
	.cardLogin{
		position:absolute;
		top:30%;
		left:38%;
		padding:20px;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
		background-color:#2c5363;
		color:white;
		width:30%;
		-webkit-box-shadow: 0px 14px 30px 4px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px 14px 30px 4px rgba(0,0,0,0.75);
		box-shadow: 0px 14px 30px 4px rgba(0,0,0,0.75);
	}

	.inputLogin{
		width:100%;
		padding:5px;
		border:none;
		border-bottom: 2px solid #213b45;
		background-color:transparent;
		outline:none;
		transition: all 0.5s ease-out;
	}
	.logoLetra{
		/* font-family: 'Beth Ellen', cursive; */
		font-family: 'Lexend Exa', sans-serif;
		font-size:20px;
	}
	.inputLogin:focus{
		border-bottom: 2px solid white;
		transition: all 0.5s ease-out;
	}
	.botonLogin{
		background-color:#102229;
		color:#fff;
	}
	.botonLogin:hover{
		background-color:#fff;
		color:#102229;
		transition: all 0.5s ease-out;
	}

</style>
