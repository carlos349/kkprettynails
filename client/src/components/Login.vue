<template>

		<div class="card cardLogin">
			<div class="row">
				<div class="col-md-12  max-auto">
					<form v-on:submit.prevent="login">
						<img style="width:20%;margin-left:40%;margin-bottom:4%" src="../assets/logoNew.png" alt="">
						<!-- <span class="logoLetra">Syswa</span> -->
						
						<div class="form-group">
							<label for="email">Dirección de correo</label>
							<input type="email" v-model="email" class="inputLogin w-100" name="email" placeholder="Ingrese su correo">
						</div>
						<div class="form-group">
							<label for="password">Contraseña</label>
							<input type="password" v-model="password" class="inputLogin w-100" name="password" placeholder="Ingrese su contraseña">
						</div>
						<button class="btn btn-lg btn-block botonLogin" type="submit">Iniciar sesión</button>
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
		background-color:rgba(238, 238, 238, 0.623);
		color:black;
		width:30%;
		-webkit-box-shadow: 0px 14px 30px 4px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px 14px 30px 4px rgba(0,0,0,0.75);
		box-shadow: 0px 14px 30px 4px rgba(0,0,0,0.75);
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
		background-color:#353535;
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
	.inputLogin{
		background-color: white !important;
		-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		border: none !important;
		border-radius: 5px;
		padding: 10px;
		width: 50% ;
		color: black !important;
		outline: none !important;
	}

</style>
