<template>

		<div class="card cardLogin">
			<div class="row">
				<div class="col-md-12  max-auto">
					<form v-on:submit.prevent="login">
						<img style="width:20%;margin-left:40%;margin-bottom:4%" src="../assets/logoNew.png" alt="">
						<!-- <span class="logoLetra">Syswa</span> -->
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
	import jwtDecode from 'jwt-decode'
	export default {
		data(){
			return {
				email: '',
				password: ''
			}
		},
		beforeCreate(){
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
			EventBus.$emit('logged-out', false)
		},
		created(){
			localStorage.setItem('logged-in', 'no-logged')
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
						const token = localStorage.userToken
						const decoded = jwtDecode(token)
						localStorage.setItem('nombre', decoded.first_name)
						localStorage.setItem('apellido', decoded.last_name)
						localStorage.setItem('imageUser', decoded.userImage)
						localStorage.setItem('showNav', true)
						localStorage.setItem('_id', decoded._id)
						router.push({name: 'Citas'})
						this.emitMethod(decoded.status)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			emitMethod(status) {
				EventBus.$emit('logged-in', status)
				localStorage.setItem('logged-in', status)
			},
			
		}
	}
</script>

<style media="screen">
	.cardLogin{
		position:absolute;
		top:30%;
		left:33%;
		padding:20px;
		font-family: 'Roboto', sans-serif;
		font-weight:600;
		background-color:#fff;
		color:black;
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
		font-family: 'Roboto', sans-serif;
		outline:none;
		transition: all 0.5s ease-out;
	}
	.logoLetra{
		/* font-family: 'Beth Ellen', cursive; */
		font-family: 'Lexend Exa', sans-serif;
		font-size:20px;
	}
	.inputLogin:focus{
		border-bottom: 2px solid #1F5673;
		transition: all 0.5s ease-out;
	}
	.botonLogin{
		background-color:#1F5673;
		color: azure;
		transition: all 0.5s ease-out;
		font-family: 'Roboto', sans-serif !important;
		font-weight:600;
		letter-spacing: 1px;
		border-radius:5px;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		
	}
	.botonLogin:hover{
		background-color:#ccc;
		color:#102229;
		transition: all 0.5s ease-out;
	}
	

</style>
