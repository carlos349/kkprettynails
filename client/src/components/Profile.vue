<template>
	<div v-bind:style="{ 'background-color': '#fff'}" class="infoBasic container-fluid m-5 p-3">
		<div class="row">
			<div  class="col-sm-3 ">
				<div v-bind:style="{ 'background-color': '#1f5673'}" class="col-sm-12 m-1 text-white p-3 text-center infoBasic">
					<h2>{{first_name}} {{last_name}}</h2>
				</div>
				<div v-bind:style="{ 'background-color': '#ded22f'}" class="col-sm-12 m-1  p-3 text-center infoBasic">
					<h2 v-if="status == 1">Gerencia</h2>
					<h2 v-if="status == 2">Personal de caja</h2>
					<h2 v-if="status == 3">Prestador</h2>
				</div>
				<div v-bind:style="{ 'background-color': '#f0eeeb'}" class="col-sm-12 m-1  p-3 text-center infoBasic">
					<h2>Ultima conexión</h2>
					<h4>{{formatDate(access)}}</h4>
				</div>
			
			</div>
			<div class="col-sm-3">
				<img class="infoBasic" style="width: 80%;height:30vh;" :src="image" alt="">
				<input type="file" id="file" ref="file" v-on:change="handleFileUpload" class="btn m-1 w-75 ml-2 add pb-1" style="cursor:pointer;">
				<button class="btn m-1 w-75 ml-2 add" v-on:click="editImage">Editar foto de perfil</button>
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
		<div class="col-md-12">
            <div class="shadow pl-5">
				<div class="row pl-3">
					<div class="col-md-2 col-sm-5 metricss first">
					<p>Total de ventas</p>
					<h2>{{ventas.length}}</h2>
					</div>	
					<div class="col-md-2 col-sm-5 metricss second">
						<p>Comision total</p>
						<h2>{{yourComision}}</h2>
					</div>
				</div>
				
              <v-client-table class="text-center"  :data="ventas" :columns="columns" :options="optionsT">
                <div slot="print"  slot-scope="props">
                  <button v-if="props.row.status" style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-colorsPrint"><font-awesome-icon icon="copy" /></button>
                  <button v-else style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-danger"><font-awesome-icon icon="copy" /></button>
                </div>
                
                
                <p slot="descuentoo" slot-scope="props">{{props.row.descuento}}%</p>
                <p slot="comisionn" slot-scope="props">{{formatPrice(props.row.comision)}}</p>
                <p slot="locall" slot-scope="props">{{formatPrice(props.row.ganancialocal)}}</p>
                <p slot="totall" slot-scope="props">{{formatPrice(props.row.total)}}</p>
                <!-- <a slot="edit" slot-scope="props" class="fa fa-edit" :href="pasarDatosEdit(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row._id)">Hola </a> -->
              </v-client-table>
            </div>
          </div>
	</div>
</template>

<script>
	import jwtDecode from 'jwt-decode'
	import router from '../router'
	import axios from 'axios'
	import EventBus from './eventBus'
	import LineChart from '../plugins/LineChart.js'
	
	export default {
		components:{
			LineChart
		},
		data() {
			const token = localStorage.userToken
			const decoded = jwtDecode(token)
			
			return {
				columns:['fecha' , 'servicios' , 'cliente' , 'descuentoo' , 'comisionn' , 'totall', 'print'],
				optionsT: {
					filterByColumn: true,
					texts: {
						filter: "Filtrar:",
						filterBy: 'Filtrar por {column}',
						count:' '
					},
					headings: {
						fecha: 'Fecha ',
						servicioss: 'Servicios ',
						cliente: 'Cliente ',
						manicurista: 'Prestador ',
						descuentoo: 'Descuento ',
						comisionn: 'Comision ',
						locall: 'Local ',
						totall: 'Total',
						print: 'Reporte'
					},
					pagination: { chunk:10 },
					pagination: { dropdown:true },
					pagination: { nav: 'fixed' },
					pagination: { edge: true },
					sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
					sortable: ['fecha'],
					filterable: ['fecha']
				},
				first_name: '',
				last_name: '',
				email: '',
				status: '',
				access: '',
				id: decoded._id,
				changeFirst: true,
				changeLast: true,
				changeEmail: true,
				lastPass: '',
				newPass:'',
				image: '',
				file: '',
				ventas:[],
				yourComision:0
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
			this.getYourSales();
		},
		methods: {
			async getData() {
				const config = {headers: {'x-access-token': localStorage.userToken}}
				try{
					const data = await axios.get('users/data/'+this.id, config)
					this.first_name = data.data.first_name
					this.last_name = data.data.last_name
					this.email = data.data.email
					this.status = data.data.status
					this.access = data.data.LastAccess
					this.image = 'http://localhost:4200/static/users/'+data.data.userImage
				}catch(err) {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'Login'})	
				}
				
			},
			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			},
			async getYourSales(){
				const ident = localStorage.userToken
				const decoded = jwtDecode(ident)
				const link = decoded.linkLender
				if (link != '') {
					const split = link.split("/")
					const sales = await axios.get('manicuristas/SalesByPrest/'+split[0]+":"+split[1])
					this.ventas = sales.data
					
					let fechaBien = ''
					for (let index = 0; index < this.ventas.length; index++) {
					let fech = new Date(this.ventas[index].fecha)
					fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ fech.getMinutes()+")"
					this.ventas[index].fecha = fechaBien
					let servicio = ''
					this.yourComision = this.yourComision + this.ventas[index].comision
					for (let indexTwo = 0; indexTwo < this.ventas[index].servicios.length; indexTwo++) {
						servicio = servicio +'\n'+ this.ventas[index].servicios[indexTwo].servicio
					}
					this.ventas[index].servicios = servicio
					}
					console.log(this.salesByUser)
				}
				

			},

			async editImage() {
				
				let formData = new FormData();
				formData.append('image', this.file)
				try {
					const image = await axios.post('users/registerImage/'+this.id, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
							'x-access-token': localStorage.userToken
						}
					})
					this.emitMethod(image.data.status)
					this.getData()
				} catch(err)  {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'Login'})
				}
			},
			emitMethod(image) {
				console.log(image)
				EventBus.$emit('ChangeImage', image)
				localStorage.removeItem('imageUser')
				localStorage.setItem('imageUser', image)
				console.log(localStorage)
			},
			handleFileUpload(){
				this.file = this.$refs.file.files[0];
				console.log(this.file)
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
				const config = {headers: {'x-access-token': localStorage.userToken}}
				try{
					const editData = await axios.put('users/editData/'+this.id, {
						data:this.email,
						type:'email'
					}, config)
					if (editData.data.status == 'ok') {
						this.changeEmail = true
						this.$swal({
							type: 'success',
							title: 'Correo editado',
							showConfirmButton: false,
							timer: 1000
						})
					}
				}catch(err)  {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'Login'})
				}
			},
			async EditDataLast(){
				const config = {headers: {'x-access-token': localStorage.userToken}}
				try{
					const editData = await axios.put('users/editData/'+this.id, {
						data:this.last_name,
						type:'last'
					}, config)
					if (editData.data.status == 'ok') {
						this.changeLast = true
						this.$swal({
							type: 'success',
							title: 'Primer nombre editado',
							showConfirmButton: false,
							timer: 1000
						})
					}
				}catch(err)  {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'Login'})
				}
			},
			async EditDataFirst() {
				const config = {headers: {'x-access-token': localStorage.userToken}}
				try{
					const editData = await axios.put('users/editData/'+this.id, {
						data:this.first_name,
						type:'first'
					}, config)
					if (editData.data.status == 'ok') {
						this.changeFirst = true
						this.$swal({
							type: 'success',
							title: 'Segundo nombre editado',
							showConfirmButton: false,
							timer: 1000
						})
					}
				}catch(err)  {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'Login'})
				}
			},
			async EditPass(){
				const config = {headers: {'x-access-token': localStorage.userToken}}
				try{
					const pass = await axios.put('users/changePass/'+this.id, {
						newPass:this.newPass,
						lastPass: this.lastPass
					}, config)
					if (pass.data.status == 'ok') {
						this.$swal({
							type: 'success',
							title: 'Contraseña cambiada',
							showConfirmButton: false,
							timer: 1500
						})
						this.newPass = ''
						this.lastPass = ''
						$('#ModalEditPass').modal('hide')
					}else{
						this.$swal({
							type: 'error',
							title: 'Contraseña incorrecta',
							showConfirmButton: false,
							timer: 1500
						})
						this.newPass = ''
						this.lastPass = ''
					}
				}catch(err)  {
					this.$swal({
						type: 'error',
						title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
						showConfirmButton: false,
						timer: 2500
					})
					router.push({name: 'Login'})
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
	.metricss{
		height: auto;
		margin:10px;
    padding: auto;
    margin-top: 20px;
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
	}
	.metricss p{
		font-size: 1.3em;
		margin-top: 10px;
		
	}
	.first{
		background:#1F5673; /* fallback for old browsers */
	}
	.second{
		background:#1F5673; /* fallback for old browsers */
	}
</style>