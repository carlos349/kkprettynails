<template>
  <div class="container-fluid row pt-5">
    <div class="col-md-4">
				<div class="forms" v-bind:style="{ 'background-color': '#fff'}">
					<h2 class="p-3" v-bind:style="{ 'background-color': '#1f5673'}">Registrar usuario</h2>
					<form v-on:submit.prevent="register">
						<div class="form-group">
							<label for="name">Nombre del usuario</label>
							<input type="text" v-model="first_name" class="form-control inputs" placeholder="Nombre del usuario">
						</div>
            			<div class="form-group">
							<label for="name">Apellido del usuario</label>
							<input type="text" v-model="last_name" class="form-control inputs" placeholder="Apellido del usuario">
						</div>
           			 	<div class="form-group">
							<label for="name">Correo del usuario</label>
							<input type="file" id="file" ref="file" v-on:change="handleFileUpload()" class="form-control inputs" placeholder="Correo del usuario">
						</div>
            			<div class="form-group">
							<label for="name">Correo del usuario</label>
							<input type="email" v-model="email" class="form-control inputs" placeholder="Correo del usuario">
						</div>
            			<div class="form-group">
							<label for="name">Contraseña</label>
							<input type="password" v-model="password" class="form-control inputs" placeholder="Contraseña">
						</div>
						<button type="submit" class="btn w-100 add">Agregar</button>
					</form>
				</div>
		</div>
    <div class="col-md-8">
				<div class="shadow">
					<v-client-table class="text-center" :data="users" :columns="columns" :options="optionsT">
						
						<p slot="nombres"  slot-scope="props">{{props.row.first_name }} {{props.row.last_name }}</p>
						<p slot="last"  slot-scope="props">{{formatDate(props.row.LastAccess)}}</p>
						<div slot="edit" slot-scope="props">
							<button class="btn btn-success font-weight-bold w-100" v-if="props.row.admin" v-on:click="editarEstado(props.row._id, props.row.admin)">Admin</button>
							<button class="btn btn-warning font-weight-bold w-100" v-else v-on:click="editarEstado(props.row._id, props.row.admin)">Normal</button>
						</div>
						<div slot="delete" slot-scope="props">
							<button  class="btn w-100 btn-inactive" v-if="props.row.admin" v-on:click="eliminarUsuario(props.row._id, props.row.admin)"><font-awesome-icon icon="trash" /></button>
							<button class="btn w-100 btn-inactive" v-else v-on:click="eliminarUsuario(props.row._id, props.row.admin)"><font-awesome-icon icon="trash" /></button>
						</div>
					</v-client-table>	
					<!-- <table  class="table" style="color:#fff !important" v-bind:style="{ 'background-color': '#1f5673'}" >
						<thead>
							<tr>
								<th>
									Nombre y Apellido
								</th>
								<th>
									Correo
								</th>
								<th>
									Ultimo acceso
								</th>
								<th>
									Estado
								</th>	
                				<th>
									Borrar
								</th>
							</tr>
						</thead>
					</table>	
					<div class="ListaUsers tbl-content">
						<table class="table table-light table-borderless table-striped text-left" style="font-size:.8em">
							<tbody>
								<tr v-for="user in users" v-bind:key="user._id">
									<td>
										{{user.first_name}} {{user.last_name}}
									</td>
									<td>
										{{user.email}}
									</td>
									<td>
										{{formatDate(user.LastAccess)}}
									</td>
									<td >
										<button class="btn btn-success font-weight-bold" v-if="user.admin" v-on:click="editarEstado(user._id, user.admin)">Admin</button>
										<button class="btn btn-warning font-weight-bold" v-else v-on:click="editarEstado(user._id, user.admin)">Normal</button>
									</td>
									<td>
										<button  class="btn w-25 btn-inactive" v-if="user.admin" v-on:click="eliminarUsuario(user._id, user.admin)">
										<font-awesome-icon icon="trash" />
										</button>
										<button class="btn w-25 btn-inactive" v-else v-on:click="eliminarUsuario(user._id, user.admin)">
										<font-awesome-icon icon="trash"  />
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div> -->
				</div>
			</div>
  </div>
  
</template>

<script type="text/javascript">
  import axios from 'axios'
  import router from '../router'

  export default {
    data(){
      return {
		columns:['nombres' , 'email' , 'last' , 'edit' , 'delete'],
		optionsT: {
			filterByColumn: true,
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
        file: ''
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
      editarEstado(id, admin){
		const config = {headers: {'x-access-token': localStorage.userToken}}
        axios.put('users/'+id, {
          admin: admin
        }, config)
        .then(res => {
			console.log(res)
			
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
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        
      },
      register() {
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
					this.first_name =  '',
					this.last_name =  '',
					this.email =  '',
					this.password =  '',
					this.file =  ''
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
			},
			formatDate(date) {
               let dateFormat = new Date(date)
               return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
            },
			eliminarUsuario(id, admin){
				if(admin){
					this.$swal({
						type: 'error',
						title: 'No puede borrar un administrador',
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
  .forms{
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 90vh;
		height:auto;
		border-radius:5px;
	}
	.forms::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
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

[v-cloak] {
  display:none;
}

thead {
		background-color: #1f5673;
		color: #fff;
		text-align: center
	}
</style>
