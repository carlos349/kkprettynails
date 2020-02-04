<template>
  <div class="container-fluid row pt-5">
    <div class="col-md-4">
		<h2 class="p-3 m-0" v-bind:style="{ 'background-color': 'rgba(238, 238, 238, 0.623)', 'color':'#1C1C1C', 'border-radius':'5px 5px 0 0'}">Registrar usuario</h2>
		<div class="formsUsers m-0" v-bind:style="{ 'background-color': '#fff'}">
			<form v-on:submit.prevent="register">
				<div class="form-group">
					<label for="name">Nombre del usuario <span style="color:red;">*</span></label>
					<input type="text" v-model="first_name" class="inputsClientes w-100" placeholder="Nombre del usuario">
				</div>
				<div class="form-group">
					<label for="name">Apellido del usuario <span style="color:red;">*</span></label>
					<input type="text" v-model="last_name" class="inputsClientes w-100" placeholder="Apellido del usuario">
				</div>
				<div class="form-group">
					<label for="name">Imagen de perfil</label>
					<input type="file" id="file" ref="file" v-on:change="handleFileUpload()" class="inputsClientes w-100" >
				</div>
				<div class="form-group">
					<label for="name">Correo del usuario <span style="color:red;">*</span></label>
					<input type="email" v-model="email" class="inputsClientes w-100" placeholder="Correo del usuario">
				</div>
				<div v-if="emailValidator" v-on:keyup="validadorIgualE()" class="form-group">
					<label for="name">Confirme correo <span style="color:red;">*</span></label>
					<input type="email" v-model="emailConfirm" class="inputsClientes w-100" placeholder="Correo del usuario">
				</div>
				<div v-else v-on:keyup="validadorIgualE()" class="form-group">
					<label for="name">Confirme correo <span style="color:red;">*</span></label>
					<input type="email" v-model="emailConfirm" class="inputsClientes w-100 badPass" placeholder="Correo del usuario">
				</div>
				<div class="form-group">
					<label for="name">Contraseña <span style="color:red;">*</span></label>
					<input type="password" v-model="password" class="inputsClientes w-100" placeholder="Contraseña">
				</div>
				<div v-if="passwordValidator" v-on:keyup="validadorIgualP()" class="form-group">
					<label for="name">Confirme contraseña <span style="color:red;">*</span></label>
					<input type="password" v-model="passwordConfirm" class="inputsClientes w-100" placeholder="Contraseña">
				</div>
				<div v-else v-on:keyup="validadorIgualP()" class="form-group">
					<label for="name">Confirme contraseña <span style="color:red;">*</span></label>
					<input type="password" v-model="passwordConfirm" class="inputsClientes w-100 badPass" placeholder="Contraseña">
				</div>
				<button type="submit" class="btn w-100 add">Agregar</button>
			</form>
		</div>
	</div>
    <div class="col-md-8">
			<div class="shadow">
				<v-client-table class="text-center tableUsers" :data="users" :columns="columns" :options="optionsT">
					
					<p slot="nombres"  slot-scope="props">{{props.row.first_name }} {{props.row.last_name }}</p>
					<p slot="last"  slot-scope="props">{{formatDate(props.row.LastAccess)}}</p>
					<div slot="edit" slot-scope="props">
						<div class="dropdown" v-if="props.row.status == 1">
							<button style="background-color:#7ec365" class="btn text-white font-weight-bold w-100 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Gerencia
							</button>
							<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 1, 'no-prestador')">Gerencia</a>
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 2, 'no-prestador')">Personal de caja</a>
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 3, 'prestador')">Prestadora</a>
							</div>
						</div>
						<div class="dropdown" v-if="props.row.status == 2">
							<button style="background-color:#F0F2A6" class="btn font-weight-bold w-100 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Personal de caja
							</button>
							<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 1, 'no-prestador')">Gerencia</a>
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 2, 'no-prestador')">Personal de caja</a>
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 3, 'prestador')">Prestadora</a>
							</div>
						</div>
						<div class="dropdown" v-if="props.row.status == 3">
							<button style="background-color:#FED766" class="btn font-weight-bold w-100 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Prestadora
							</button>
							<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 1, 'no-prestador')">Gerencia</a>
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 2, 'no-prestador')">Personal de caja</a>
								<a class="dropdown-item" v-on:click="editarEstado(props.row._id, 3, 'prestador')">Prestadora</a>
							</div>
						</div>
						<!-- <button class="btn btn-success font-weight-bold w-100" v-if="props.row.status == 1" v-on:click="editarEstado(props.row._id, props.row.admin)">Gerencia</button> -->
						<!-- <button class="btn btn-warning font-weight-bold w-100" v-if="props.row.status == 2" v-on:click="editarEstado(props.row._id, props.row.admin)">Cajera</button> -->
						<!-- <button class="btn btn-warning font-weight-bold w-100" v-if="props.row.status == 3" v-on:click="editarEstado(props.row._id, props.row.admin)">Prestadora</button> -->
					</div>
					<div slot="delete" slot-scope="props">
						<button  class="btn w-100 btn-inactive" v-on:click="eliminarUsuario(props.row._id, props.row.status)"><font-awesome-icon icon="trash" /></button>
						
					</div>
				</v-client-table>	
			</div>
		</div>
		<div class="modal fade" id="ModalLinkLender" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered"  >
				<div class="modal-content pt-3 pl-3 pr-3" v-bind:style="{ 'background-color': '#ffffff'}">
					<div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
						<h4 class="modal-title font-weight-bold text-white" id="exampleModalCenterTitle">Vincular prestador con usuario</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" >
						<span aria-hidden="true" class="text-white" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
						</button>
					</div>
					<div  class="modal-body">
						<div class="form-group row">
							<div class="form-group w-100">
								<label for="recomendacion">Vincule el prestador</label>
								<div v-on:click="clearInput">
									<autocomplete
										ref="autocomplete"
										placeholder="Buscar cliente"
										:source="arregloManicuristas"
										input-class="form-control esteqlq"
										results-property="data"
										:results-display="formattedDisplay"
										@selected="addDistributionGroup">
									</autocomplete>
									<span v-on:click="clearInput" style="position:absolute;top:55px;left:35px;background-color:#FBF5F3;">{{prestador}}</span>
								</div>
							</div>
							<button class="btn w-100 add" v-on:click="editarEstado(idSelect, 3, 'no-prestador')">Vincular</button>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>	
  
</template>

<script type="text/javascript">	
	import axios from 'axios'
	import router from '../router'
	import Autocomplete from 'vuejs-auto-complete'

  export default {
	components: {
		Autocomplete
	},
    data(){
      return {
		columns:['nombres' , 'email' , 'last' , 'edit' , 'delete'],
		optionsT: {
			filterByColumn: false,
			texts: {
				filter: "Filtrar:",
				filterBy: 'Filtrar por {column}',
				count:' '
			},
			headings: {
				nombres: 'Nombre y Apellido ',
				email: 'Correo ',
				last: 'Último acceso ',
				edit: 'Estado ',
				delete: 'Borrar '
			},
			pagination: { chunk:10 },
			pagination: { dropdown:true },
			pagination: { nav: 'fixed' },
			pagination: { edge: true },
			sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
			sortable: ['nombres', 'email'],
			filterable: ['nombres', 'email']
		},
        users: [],
        first_name: '',
		last_name: '',
		email: '',
        password: '',
		file: '',
		prestador: '',
		arregloManicuristas: [],
		idSelect: '',
		emailConfirm: '',
		emailValidator: true,
		passwordConfirm: '',
		passwordValidator: true,
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
	  this.getUsers();
	  this.getManicuristas();
    },
    methods: {
		getUsers(){
			const config = {headers: {'x-access-token': localStorage.userToken}}
			axios.get('users', config)
			.then(res => {
			this.users = res.data
			})
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
					showConfirmButton: false,
					timer: 2500
				})
				router.push({name: 'Login'})
			})
		},
		formattedDisplay (result) {
			console.log(result)
			return result.nombre+"/"+result.documento
		},
		addDistributionGroup (group) {
			setTimeout(() => {
				this.prestador = group.display
			}, 100);
			
		},
		clearInput(){
			this.prestador = ''
			$('.esteqlq').focus()
		},
	    getManicuristas(){
			axios.get('manicuristas')
			.then(res => {
				this.arregloManicuristas = res.data
			})
		},

		editarEstado(id, status, type){
			console.log(type)
			if (type == 'prestador') {
				$('#ModalLinkLender').modal('show')
				this.idSelect = id
			}else{
				const config = {headers: {'x-access-token': localStorage.userToken}}
				axios.put('users/'+id, {
					status: status,
					employe: this.prestador
				}, config)
				.then(res => {
					this.getUsers()
					this.prestador = ''
					$('#ModalLinkLender').modal('hide')
				})
				.catch(err => {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'Login'})
				})
			}
		},
		handleFileUpload(){
			this.file = this.$refs.file.files[0];
			console.log(this.file)
		},
		register() {
			if (this.first_name == '' || this.last_name == '' || this.email == '' || this.password == '') {
				this.$swal({
					type: 'error',
					title: 'Llene los campos requeridos',
					showConfirmButton: false,
					timer: 1500
				})
			}else{
				if (this.password != this.passwordConfirm) {
					this.$swal({
						type: 'error',
						title: 'Las contraseñas no coinciden',
						showConfirmButton: false,
						timer: 1500
					})
					this.passwordValidator = false
				}else if (this.email != this.emailConfirm) {
					this.$swal({
						type: 'error',
						title: 'Los correos no coinciden',
						showConfirmButton: false,
						timer: 1500
					})
					this.emailValidator = false
				}else{
					let formData = new FormData();
					formData.append('image', this.file)
					const configToken = {headers: {'x-access-token': localStorage.userToken}}
					axios.post('users/register',
					{
						first_name: this.first_name,
						last_name: this.last_name,
						email: this.email,
						password: this.password,
					}, configToken).then(res => {
						this.$swal({
							type: 'success',
							title: 'Usuario registrado como admin',
							showConfirmButton: false,
							timer: 1500
						})
						this.users =  []
						this.first_name =  ''
						this.last_name =  ''
						this.email =  ''
						this.password =  ''
						this.file =  ''
						this.emailConfirm = ''
						this.passwordConfirm = ''
						this.passwordValidator = true
						this.emailValidator = true
						this.getUsers()
						const id = res.data.status
						const config = {headers: {'Content-Type': 'multipart/form-data', 'x-access-token': localStorage.userToken}}
						axios.post(`users/registerImage/${id}`, formData, config)
						.then(resData => {
							console.log(resData)
						})
						.catch(err => {
							console.log(err)
						})
					}).catch(err => {
						this.$swal({
							type: 'error',
							title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
							showConfirmButton: false,
							timer: 2500
						})
						router.push({name: 'Login'})
					})
				}
			}
		},
		validadorIgualE(){
			console.log("y entonc?")
			if (this.emailConfirm != this.email) {
				this.emailValidator = false
			}
			else{
				this.emailValidator = true
			}
		},
		validadorIgualP(){
			console.log("y entonc?")
			if (this.passwordConfirm != this.password) {
				this.passwordValidator = false
			}
			else{
				this.passwordValidator = true
			}
		},
		formatDate(date) {
			let dateFormat = new Date(date)
			return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
		},
		eliminarUsuario(id, admin){
			if(admin == 1){
				this.$swal({
					type: 'error',
					title: 'No puede borrar un gerente',
					showConfirmButton: false,
					timer: 1500
				})
			}else{
				const configToken = {headers: {'x-access-token': localStorage.userToken}}
				axios.delete('users/' + id, configToken)
				.then(res => {
					this.$swal({
						type: 'success',
						title: res.data.first_name+' '+res.data.last_name+' ha sido Borrado',
						showConfirmButton: false,
						timer: 1500
					})
					
					this.getUsers()
				})
				.catch(err => {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'Login'})
				})
			}
		}
    }
  }
</script>
<style >
  .formsUsers{
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 90vh;
		height:auto;
		border-radius:0 0 5px 5px;
	}
	.formsUsers::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
  .add{
		background-color:#353535;
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
  label{
    color: #001514;
  }
  .ListaUsers{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 75vh;
		height:auto;
		border-radius:5px;
	}
  	.maxHeightInvent{
		max-height: 200px;
	}
	.ListaUsers::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.btn-success{
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.btn-warning{
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.btn-inactive{
		background-color: #FC7753;
		color:#fff;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.VueTables--client .row{
		display:none
	}
	.VuePagination {
		text-align: center;
		display:block !important;
	}

	.vue-title {
		text-align: center;
		margin-bottom: 10px;
	}

	.vue-pagination-ad {
		text-align: center;
	}

	.glyphicon.glyphicon-eye-open {
		width: 16px;
		display: block;
		margin: 0 auto;
	}

	th:nth-child(3) {
	text-align: center;
	}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}
.badPass{
	-webkit-box-shadow: inset 0px 0px 20px 4px rgba(250, 4, 4, 0.315) !important;
		-moz-box-shadow: inset 0px 0px 20px 4px rgba(250, 4, 4, 0.315)  !important;
		box-shadow: inset 0px 0px 20px 4px rgba(250, 4, 4, 0.315)  !important;
}

[v-cloak] {
  display:none;
}
/* Tabla css Start */
.tableUsers th{
	border:none !important;
}
.table-bordered tbody{
	background-color: white;
}
.tableUsers table{

 
}
.table-bordered {
	
	border-radius: 10px !important; 
}
.tableUsers thead {
		background-color: rgba(238, 238, 238, 0.623);
		color: #353535;
		text-align: center
}
.tableUsers thead th {
		border-left: 1px black !important;
}
/* Tabla css end */
.dropdown-item{
	cursor: pointer !important;
}
.autocomplete__box{
	background-color: transparent !important;
	-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	border: none !important;
	border-radius: 5px;
	padding: 10px;
	width: 50% ;
	color: black !important;
	width: 100%;
	outline: none !important;
}
.esteqlq{
	outline: none !important;
	background-color: transparent !important;
	border: none !important;
	border-radius: 5px;
	padding: 10px;
	width: 50% ;
	color: black !important;
	width: 100%;
}
.autocomplete__results{
	outline: none !important;
	overflow: hidden !important;
	max-height: 100px !important;
	background-color: white !important;
	-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	color: #000 !important;
	border:none !important;
	border-radius: 5px;
}
.autocomplete__results__item{
	outline: none !important;
	padding: 13px !important;
}
.inputsClientes{
		background-color: transparent !important;
		-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		border: none !important;
		border-radius: 5px;
		padding: 10px;
		width: 50% ;
		color: black !important;
	}
</style>
