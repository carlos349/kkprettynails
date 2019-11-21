<template>
	<div v-bind:style="{ 'background-color': '#fff'}" class="infoBasic container-fluid m-5 p-3">
		<div class="row">
			<div  class="col-sm-3 ">
				<div v-bind:style="{ 'background-color': '#1f5673'}" class="col-sm-12 m-1 text-white p-3 text-center infoBasic">
					<h2>{{first_name}} {{last_name}}</h2>
				</div>
				<div v-bind:style="{ 'background-color': '#ded22f'}" class="col-sm-12 m-1  p-3 text-center infoBasic">
					<h2 v-if="admin">Administrador</h2>
					<h2 v-else>Trabajador</h2>
				</div>
				<div v-bind:style="{ 'background-color': '#f0eeeb'}" class="col-sm-12 m-1  p-3 text-center infoBasic">
					<h2>Ultima conexión</h2>
					<h4>{{formatDate(access)}}</h4>
				</div>
			
			</div>
			<div class="col-sm-3">
				<img class="infoBasic" style="width: 80%;" src="../assets/silueta-mujer.jpg" alt="">
				<button class="btn m-1 w-75 ml-2 add">Editar foto de perfil</button>
			</div>
			<div v-bind:style="{ 'background-color': '#fff'}" class="col-md-6 infoBasic p-3">
				<h2 style="color:#1f5673" class="text-center" >Información Básica</h2>
				<table class="table mx-auto">
					<tbody>
						<tr>
							<td>Nombre</td>
							<td>
								<p v-if="changeFirst">{{first_name}}</p> 
								<input v-else type="text" class="form-control w-75" v-model="first_name">
							</td>
							<td>
								<button v-if="changeFirst" class="btn w-75 add" v-on:click="change('first')">Editar</button>
								<button v-else class="btn w-75 btn-success" v-on:click="EditDataFirst()">Editar</button>
							</td>
						</tr>
						<tr>
							<td>Apellido</td>
							<td>
								<p v-if="changeLast">{{last_name}}</p> 
								<input v-else type="text" class="form-control w-75" v-model="last_name">
							</td>
							<td>
								<button v-if="changeLast" class="btn w-75 add" v-on:click="change('last')">Editar</button>
								<button v-else class="btn w-75 btn-success" v-on:click="EditDataLast()">Editar</button>
							</td>
						</tr>
						<tr>
							<td>Contraseña</td>
							<td>**********</td>
							<td><button class="btn w-75 add" v-on:click="openModal">Editar</button></td>
						</tr>
						<tr>
							<td>Correo</td>
							<td>
								<p v-if="changeEmail">{{email}}</p> 
								<input v-else type="text" class="form-control w-75" v-model="email">
							</td>
							<td>
								<button v-if="changeEmail" class="btn w-75 add" v-on:click="change('email')">Editar</button>
								<button v-else class="btn w-75 btn-success" v-on:click="EditDataEmail()">Editar</button>
							</td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>
		
			<div class="container">
				<div class="row p-5">
					<div class="col-sm-12 mx-auto"></div>
				</div>
			</div>
			<div class="modal fade" id="ModalEditPass" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content p-3" v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <form v-on:submit.prevent="EditPass">
					<div class="form-group">
						<label for="name">Contraseña antigua</label>
						<input v-model="lastPass" type="password" class="form-control inputs" placeholder="Antigua contraseña">
					</div>
					<div class="form-group">
						<label for="identidad">Nueva contraseña</label>
						<input v-model="newPass" type="password" class="form-control inputs" placeholder="Nueva contraseña">
					</div>
					<button class="btn w-100 add">Agregar cliente</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script>
	import jwtDecode from 'jwt-decode'
	import router from '../router'
	import axios from 'axios'

	export default {
		data() {
			const token = localStorage.userToken
			const decoded = jwtDecode(token)
			
			return {
				first_name: '',
				last_name: '',
				email: '',
				admin: '',
				access: '',
				id: decoded._id,
				changeFirst: true,
				changeLast: true,
				changeEmail: true,
				lastPass: '',
				newPass:''
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
		created(){
			this.getData();
		},
		methods: {
			async getData() {
				const data = await axios.get('users/data/'+this.id)
				this.first_name = data.data.first_name
				this.last_name = data.data.last_name
				this.email = data.data.email
				this.admin = data.data.admin
				this.access = data.data.LastAccess

			},
			change(type){
				if (type == 'first') {
					this.changeFirst = false
				}else if(type == 'last'){
					this.changeLast = false
				}else{
					this.changeEmail = false
				}
			},
			async EditDataEmail(){
				const editData = await axios.put('users/editData/'+this.id, {
					data:this.email,
					type:'email'
				})
				if (editData.data.status == 'ok') {
					this.changeEmail = true
					this.$swal({
						type: 'success',
						title: 'Correo editado',
						showConfirmButton: false,
						timer: 1000
					})
				}
			},
			async EditDataLast(){
				const editData = await axios.put('users/editData/'+this.id, {
					data:this.last_name,
					type:'last'
				})
				if (editData.data.status == 'ok') {
					this.changeLast = true
					this.$swal({
						type: 'success',
						title: 'Primer nombre editado',
						showConfirmButton: false,
						timer: 1000
					})
				}
			},
			async EditDataFirst() {
				const editData = await axios.put('users/editData/'+this.id, {
					data:this.first_name,
					type:'first'
				})
				if (editData.data.status == 'ok') {
					this.changeFirst = true
					this.$swal({
						type: 'success',
						title: 'Segundo nombre editado',
						showConfirmButton: false,
						timer: 1000
					})
				}
			},
			async EditPass(){
				const pass = await axios.put('users/changePass/'+this.id, {
					newPass:this.newPass,
					lastPass: this.lastPass
				})
				if (pass.data.status == 'ok') {
					this.$swal({
						type: 'success',
						title: 'Contraseña cambiada',
						showConfirmButton: false,
						timer: 1500
					})
				}else{
					this.$swal({
						type: 'error',
						title: 'Contraseña incorrecta',
						showConfirmButton: false,
						timer: 1500
					})
				}
			},
			openModal(){
				 $('#ModalEditPass').modal('show')
			},
			formatDate(date) {
				let dateFormat = new Date(date)
				return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
			}
		}
	}
</script>
<style>
	.infoBasic{
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
	.add{
		background-color:#1F5673;
		color: azure;
		transition: all 0.5s ease-out;
		font-family: 'Roboto', sans-serif !important;
		font-weight:600;
		letter-spacing: 1px;
		border-radius:5px;
    }
	.add:hover{
		background-color:#ccc;
		color:#001514;
    }

</style>