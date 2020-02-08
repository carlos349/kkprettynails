<template>
	<div  class=" container-fluid p-3">
		<div class="row">
			
			<div style="background-color:rgba(238, 238, 238, 0.623);height:93vh;border-radius:5px" class="col-sm-3 m-3 mt-0">
				<center>
					<img class="infoBasic" style="width: 60%;height:30vh;" :src="image" alt="">
				</center>
				
				<!-- <input type="file" id="file" ref="file" v-on:change="handleFileUpload" class="btn m-1 w-75 ml-2 addPerfil pb-1" style="cursor:pointer;">
				<button class="btn m-1 w-75 ml-2 addPerfil" v-on:click="editImage">Editar foto de perfil</button> -->
				<div  class="col-sm-12 m-1 p-1 text-left infoBasic">
				<h1><b>{{first_name}} {{last_name}}</b></h1>
				<h5>{{email}}</h5>
				</div>
				<div  class="col-sm-12 m-1 p-1  text-left infoBasic">
					<h4 v-if="status == 1"> <b>Cargo:</b>  Gerencia</h4>
					<h4 v-if="status == 2"> <b>Cargo:</b>  Personal de caja</h4>
					<h4 v-if="status == 3"> <b>Cargo:</b>  Prestador</h4>
				</div>
				<div  class="col-sm-12 m-1  p-1 text-left infoBasic">
					<h4><b>Última conexión:</b>  {{formatDate(access)}}</h4>
					
				</div>
			</div>
			<div style="height:93vh;" class="col-md-8 mt-3 mx-auto infoBasic p-3">
				
				<div class="">
					<div v-if="link != ''" class="col-sm-12">
						<div  class="row pl-1">
					<div class="col-sm-4 ">
						<div class="first metricss">
							<p><b>Total de ventas</b> </p>
							<h3>{{ventas.length}}</h3>
						</div>
					
					</div>	
					<div class="col-sm-4">
						<div class="metricss first">
							<p><b>Comision total</b> </p>
							<h3>$ {{formatPrice(yourComision)}}</h3>
						</div>
						
					</div>
					<div class="col-sm-4 ">
						<div class="metricss first">
							<p><b>Adelantos</b> </p>
						<h3>Adelanto</h3>
						</div>
						
					</div>
				</div>
							<v-client-table v-if="link != ''" class="text-center tablePerfilVenta"  :data="ventas" :columns="columns" :options="optionsT">
							<div slot="print"  slot-scope="props">
							<button v-if="props.row.status" style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-colorsPrint"><font-awesome-icon icon="copy" /></button>
							<button v-else style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-danger"><font-awesome-icon icon="copy" /></button>
							</div>
							
							
							<p slot="descuentoo" slot-scope="props">{{props.row.descuento}}%</p>
							<p slot="clientNombre" slot-scope="props">{{justName(props.row.cliente)}}</p>
							<p slot="comisionn" slot-scope="props">{{formatPrice(props.row.comision)}}</p>
							<p slot="locall" slot-scope="props">{{formatPrice(props.row.ganancialocal)}}</p>
							<p slot="totall" slot-scope="props">{{formatPrice(props.row.total)}}</p>
							<!-- <a slot="edit" slot-scope="props" class="fa fa-edit" :href="pasarDatosEdit(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row._id)">Hola </a> -->
						</v-client-table>
					</div>
				
				<div v-else class="col-sm-12">
					<div class="row sectionmetricsInMetricsPerfil">
						<div class="col-md-12">
							<h1 class="text-center ml-5">Control de ventas</h1>
							<div class="metricsInMetricsPerfil ">
							<p class="text-center"> <b>Diarias</b> </p>
							<div class="row">
								<div class="col-sm-4 text-center">
									<h2>Ventas</h2>
									<p>0</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Servicios</h2>
									<p>0</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Gastos</h2>
									<p>0</p>
								</div>
							</div>
							
							</div> 
						</div>
						<div class="col-md-12">
							<div class="metricsInMetricsPerfil ">
							<p class="text-center"><b>Semanales</b> </p>
							<div class="row">
								<div class="col-sm-4 text-center">
									<h2>Ventas</h2>
									<p>0</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Servicios</h2>
									<p>0</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Gastos</h2>
									<p>0</p>
								</div>
							</div>
							</div>
						</div>
						<div class="col-md-12">
							<div class="metricsInMetricsPerfil">
							<p class="text-center"><b>Mensuales</b> </p>
							<div class="row">
								<div class="col-sm-4 text-center">
									<h2>Ventas</h2>
									<p>0</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Servicios</h2>
									<p>0</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Gastos</h2>
									<p>0</p>
								</div>
							</div>

							</div>
						</div>
					</div>
				</div>
              
            </div>
				<!-- <table style="background-color:rgba(238, 238, 238, 0.623);border-radius:5px;" class="table mx-auto tablePerfil">
					<tbody>
						<tr>
							<td>Nombre</td>
							<td>
								<p v-if="changeFirst">{{first_name}}</p> 
								<input v-else type="text" class="form-control w-75" v-model="first_name">
							</td>
							<td>
								<button v-if="changeFirst" class="btn w-75 addPerfil" v-on:click="change('first')">Editar</button>
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
								<button v-if="changeLast" class="btn w-75 addPerfil" v-on:click="change('last')">Editar</button>
								<button v-else class="btn w-75 btn-success" v-on:click="EditDataLast()">Editar</button>
							</td>
						</tr>
						<tr>
							<td>Contraseña</td>
							<td>**********</td>
							<td><button class="btn w-75 addPerfil" v-on:click="openModal">Editar</button></td>
						</tr>
						<tr>
							<td>Correo</td>
							<td>
								<p v-if="changeEmail">{{email}}</p> 
								<input v-else type="text" class="form-control w-75" v-model="email">
							</td>
							<td>
								<button v-if="changeEmail" class="btn w-75 addPerfil" v-on:click="change('email')">Editar</button>
								<button v-else class="btn w-75 btn-success" v-on:click="EditDataEmail()">Editar</button>
							</td>
						</tr>
					</tbody>
				</table> -->
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
				columns:['fecha' , 'servicios' , 'clientNombre' , 'descuentoo' , 'comisionn' , 'totall', 'print'],
				optionsT: {
					filterByColumn: false,
					texts: {
						filter: "Filtrar:",
						filterBy: 'Filtrar por {column}',
						count:' '
					},
					headings: {
						fecha: 'Fecha ',
						servicioss: 'Servicios ',
						clientNombre: 'Cliente ',
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
				yourComision:0,
				link:''
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
			justName(value){
				const split = value.split('-')
				return split[0]
			},
			async getYourSales(){
				const ident = localStorage.userToken
				const decoded = jwtDecode(ident)
				const link = decoded.linkLender
				this.link = decoded.linkLender
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
		color: #353535;
		font-size: 2em;
		border-radius: 5px;
	}
	.addPerfil{
		background-color:#353535;
		color: azure;
		transition: all 0.5s ease-out;
		font-family: 'Roboto', sans-serif !important;
		font-weight:600;
		letter-spacing: 1px;
		border-radius:5px;
    }
	.addPerfil:hover{
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
	.tablePerfilVenta th{
	border:none !important;
	}
	.table-bordered tbody{
		background-color: white;
	}
	.tablePerfilVenta table{
		font-size: 0.5em;
	
	}
	.table-bordered {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		border-radius: 10px !important; 
	}
	.tablePerfilVenta thead {
			background-color: rgba(238, 238, 238, 0.623);
			color: #353535;
			text-align: center
	}
	.tablePerfilVenta thead th {
			border-left: 1px black !important;
	}

	.metricss{
		padding-left: 15px;
		color:#353535;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
	}
	.metricss p{
		font-size: 1em;
		margin-top: 10px;
		
	}

	.tablePerfil  td{
		border: none !important;
	}
	.first{
	  background-color: rgba(238, 238, 238, 0.623)
	}
	.metricsInMetricsPerfil{
		height: auto;
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
		padding: 15px;
		width: 104%;
		margin: auto;
		margin-top: 50px;
		background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
    	color: #353535 !important;
	}
	.metricsInMetricsPerfil p{
		font-size: 0.8em;
		margin-top: 10px;
		
	}
	
</style>