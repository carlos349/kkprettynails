<template>
	<div  class=" container-fluid p-3">
		<div class="row">
			
			<div style="background-color:rgba(238, 238, 238, 0.623);height:auto;border-radius:5px" class="col-sm-3 m-3 mt-0 mb-3">
				<center>
					<img class="infoBasic" style="width: 60%;height:30vh;" :src="image" alt="">
				</center>
				
				
				<!-- <button class="btn m-1 w-75 ml-2 addPerfil" v-on:click="editImage">Editar foto de perfil</button> -->
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
				<div>
					<button class="btn addPerfil w-75 ml-5" data-toggle="collapse" data-target="#collapseEdit" aria-expanded="false" aria-controls="collapseExample">Editar datos</button>
					<div class="collapse" id="collapseEdit">
						<div class="formsProfile mt-2 mb-3" v-bind:style="{ 'background-color': '#fff'}">
							<form v-on:submit.prevent="editProfile">
								<div class="form-group">
									<label>Nombres</label>
									<input v-model="first_name" type="text" class="form-control w-100 inputsProfile" placeholder="Escriba su nombre">
								</div>
								<div class="form-group">
									<label>Apellidos</label>
									<input v-model="last_name" type="text" class="form-control w-100 inputsProfile" placeholder="Escriba su apellido">
								</div>
								<div class="form-group">
									<label>Correo</label>
									<input v-model="email" type="text" class="form-control w-100 inputsProfile" placeholder="Escriba su correo">
								</div>
								<div class="form-group">
									<label>Imagen de perfil</label>
									<input type="file" id="file" ref="file" v-on:change="handleFileUpload" class="btn w-100 btn-img" style="cursor:pointer;">
								</div>
								<button class="btn addPerfil w-100 mb-2">Editar datos</button>
								
								
									<input type="button" v-on:click="openModal" class="btn w-100 btn-img" value="Cambiar contraseña">
								
							</form>	
						</div>
					</div>
				</div>
			</div>
			<div style="height:93vh;" class="col-md-8 mt-3 mx-auto infoBasic p-3">
				
				<div class="">
					<div v-if="status == 2" >
						<div class="col-md-12 row sectionMetricssExpense mb-3">
						<div class="col-md-6 col-sm-12 ">
							<div class="metricssExpensePerfil firstExpensesPerfil">
								<p class="text-center">Monto del fondo de caja</p>
								<h2 class="text-center">{{formatPrice(fund)}}</h2>
							</div>
						</div>
						<div class="col-md-6 col-sm-12">
							<div class="metricssExpensePerfil firstExpensesPerfil">
								<p class="text-center">Nombre del cajero</p>
								<h2 class="text-center">{{checker}}</h2>
							</div>
						</div>
							<v-client-table  class="text-center tablePerfilVenta w-100 mt-2"  :data="dataChecker" :columns="columns" :options="optionsT">
								<!-- <div slot="print"  slot-scope="props">
								<button v-if="props.row.status" style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-colorsPrint"><font-awesome-icon icon="copy" /></button>
								<button v-else style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-danger"><font-awesome-icon icon="copy" /></button>
								</div>
								 -->
								<p slot="servicios" slot-scope="props">{{props.row.servicios}}</p>
								<p slot="descuentoo" slot-scope="props">{{props.row.descuento}}%</p>
								<p slot="clientNombre" slot-scope="props">{{justName(props.row.cliente)}}</p>
								<p slot="comisionn" slot-scope="props">{{formatPrice(props.row.comision)}}</p>
								<p slot="locall" slot-scope="props">{{formatPrice(props.row.ganancialocal)}}</p>
								<p slot="totall" slot-scope="props">{{formatPrice(props.row.total)}}</p>
								<!-- <a slot="edit" slot-scope="props" class="fa fa-edit" :href="pasarDatosEdit(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row._id)">Hola </a> -->
							</v-client-table>
        </div>

		
			</div>
					<div v-if="status == 3" class="col-sm-12">
						<div  class="row pl-1">
							<div class="col-sm-4 ">
								<div class="first metricss p-1 pl-3 mb-2">
									<p><b>Total de ventas</b> </p>
									<h3>{{ventas.length}}</h3>
								</div>
							
							</div>	
							<div class="col-sm-4">
								<div class="metricss first p-1 pl-3 mb-2">
									<p><b>Comision total</b> </p>
									<h3>$ {{formatPrice(yourComision)}}</h3>
								</div>
								
							</div>
							<div class="col-sm-4 ">
								<div class="metricss first p-1 pl-3 mb-2">
									<p><b>Adelantos</b> </p>
									<h3>$ {{formatPrice(advancement)}}</h3>
								</div>
								
							</div>
							
						</div>
							<v-client-table v-if="link != ''" class="text-center tablePerfilVenta"  :data="ventas" :columns="columns" :options="optionsT">
								<!-- <div slot="print"  slot-scope="props">
								<button v-if="props.row.status" style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-colorsPrint"><font-awesome-icon icon="copy" /></button>
								<button v-else style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-danger"><font-awesome-icon icon="copy" /></button>
								</div> -->
								

								<p slot="descuentoo" slot-scope="props">{{props.row.descuento}}%</p>
								<p slot="clientNombre" slot-scope="props">{{justName(props.row.cliente)}}</p>
								<p slot="comisionn" slot-scope="props">{{formatPrice(props.row.comision)}}</p>
								<p slot="locall" slot-scope="props">{{formatPrice(props.row.ganancialocal)}}</p>
								<p slot="totall" slot-scope="props">{{formatPrice(props.row.total)}}</p>
								
							</v-client-table>
					</div>
				
				<div v-if="status == 1" class="col-sm-12">
					<div class="row sectionmetricsInMetricsPerfil">
						<div class="col-md-12">
							<h1 class="text-center ml-5">Control de ventas</h1>
							<div class="metricsInMetricsPerfil ">
							<p class="text-center"> <b>Diarias</b> </p>
							<div class="row">
								<div class="col-sm-4 text-center">
									<h2>Ventas</h2>
									<p>{{formatPrice(DailyManage.Sale)}}</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Servicios</h2>
									<p>{{DailyManage.Services}}</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Gastos</h2>
									<p>{{formatPrice(DailyManage.Expenses)}}</p>
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
									<p>{{formatPrice(WeeklyManage.Sale)}}</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Servicios</h2>
									<p>{{WeeklyManage.Services}}</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Gastos</h2>
									<p>{{formatPrice(WeeklyManage.Expenses)}}</p>
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
									<p>{{formatPrice(MonthlyManage.Sale)}}</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Servicios</h2>
									<p>{{MonthlyManage.Services}}</p>
								</div>
								<div class="col-sm-4 text-center">
									<h2>Gastos</h2>
									<p>{{formatPrice(MonthlyManage.Expenses)}}</p>
								</div>
							</div>

							</div>
						</div>
					</div>
				</div>
              
            </div>
				
				</div>
				
			</div>
			
		
			<div class="container">
				<div class="row p-5">
					<div class="col-sm-12 mx-auto"></div>
				</div>
			</div>
		<div class="modal fade" id="ModalEditPass" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content" v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header" v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h4 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Cambiar contraseña</h4>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <form v-on:submit.prevent="EditPass" class="p-3">
					<div class="form-group">
						<label for="name">Contraseña antigua</label>
						<input v-model="lastPass" type="password" class="form-control inputsProfile w-100" placeholder="Antigua contraseña">
					</div>
					<div class="form-group">
						<label for="identidad">Nueva contraseña</label>
						<input v-model="newPass" type="password" class="form-control inputsProfile w-100" placeholder="Nueva contraseña">
					</div>
					<div class="form-group">
						<label for="identidad">Verifique contraseña</label>
						<input v-model="newPassVerify" type="password" class="form-control inputsProfile w-100" placeholder="Nueva contraseña">
					</div>
					<button class="btn w-100 addPerfil">Cambiar</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
		
		<div v-if="status == 2 || status == 1" class="boxCloses">
			<button class="CierreDia btn-whiteDates btn-animation-1" v-on:click="daySaleClose">
				<font-awesome-icon icon="cloud-upload-alt" />
			</button>
		</div>
		<div v-if="inspector && status == 2" class="boxFunds">
            <button class="FondoDia btn-whiteFunds btn-animation-1" v-on:click="openFunds">
                <font-awesome-icon icon="cash-register" />
            </button>
        </div>
		<div v-if="inspector && status == 1" class="boxFunds">
            <button class="FondoDia btn-whiteFunds btn-animation-1" v-on:click="openFunds">
                <font-awesome-icon icon="cash-register" />
            </button>
        </div>
		<div class="modal fade" id="myModalRegisterFundss" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content p-1" >
		      <div class="modal-header"  v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h5 class="modal-title text-white text-center font-weight-bold" id="exampleModalCenterTitle">Fondo de caja</h5>
		      </div>
		      <div class="modal-body mt-2">
		        <form v-on:submit.prevent="registroFondo">
					<div class="row">
						<div class="form-group col-6">
							<label for="name">Nombre del cajero</label>
							<input v-model="nombreCaja" type="text" class="form-control inputsVenta w-100" placeholder="Ingrese su nombre">
						</div>
						<div class="form-group col-6">
							<label for="name">Fondo de caja</label>
							<input v-model="montoCaja" type="text" class="form-control inputsVenta w-100" placeholder="0 $">
						</div>
						<button class="btn w-75 addPerfil ml-5 mt-2">Ingresar</button>
					</div>
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
	import EventBus from './EventBus'
	import LineChart from '../plugins/LineChart.js'
	import endPoint from '../../config-endpoint/endpoint.js'
	
	export default {
		components:{
			LineChart
		},
		data() {
			const token = localStorage.userToken
			const decoded = jwtDecode(token)
			
			return {
				columns:['fecha' , 'servicios' , 'clientNombre' , 'descuentoo' , 'comisionn' , 'totall'],
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
						totall: 'Total'
					},
					pagination: { chunk:10 },
					pagination: { dropdown:true },
					pagination: { nav: 'fixed' },
					pagination: { edge: true },
					sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
					sortable: ['fecha'],
					filterable: ['fecha']
				},
				nombreCaja:'',
				montoCaja:'',	
				first_name: '',
				last_name: '',
				email: '',
				status: '',
				advancement:0,
				access: '',
				id: decoded._id,
				changeFirst: true,
				changeLast: true,
				changeEmail: true,
				lastPass: '',
				newPass:'',
				newPassVerify:'',
				image: '',
				file: '',
				ventas:[],
				yourComision:0,
				link:'',
				DailyManage: {},
				WeeklyManage: {},
				MonthlyManage: {},
				dataChecker: [],
				fund:0,
				checker:'',
				inspector: false
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
			}else{
				setTimeout(() => {
					EventBus.$emit('logged-out', true)
				}, 500);
			}
		},
		created(){
			this.getData();
			this.getYourSales();
			this.getDataManagement();
			this.getDataChecker();
			this.getFunds()
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
					this.image = endPoint.imgEndpoint+data.data.userImage
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
			openFunds(){
				$('#myModalRegisterFundss').modal('show')
			},
			registroFondo(){
				axios.post('ventas/registerFund', {
					userRegister: this.nombreCaja,
					amount: this.montoCaja
				}).then(res => {
					if (res.data.status == 'ok') {
						this.$swal({
							type: 'success',
							title: '¡Ya puede ingresar ventas!',
							showConfirmButton: false,
							timer: 1500
						})
						$('#myModalRegisterFundss').modal('hide')
						this.montoCaja = ''
						this.nombreCaja= ''
						this.getFunds()
						this.inspector = false
					}
				})
			},
			async getDataManagement(){
				try {
					const dataManagement = await axios.get('ventas/dataSectionManagement')
					this.DailyManage = dataManagement.data.Daily
					this.WeeklyManage = dataManagement.data.Weekly
					this.MonthlyManage = dataManagement.data.Monthly
				}catch(err){
					console.log(err)
				}
			},
			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			},
			justName(value){
				const split = value.split('/')
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
					const advancements = await axios.get('manicuristas/advancementsProfile/'+split[1])
					this.advancement = advancements.data[0].advancement
				}
			},
			getFunds(){
				axios.get('ventas/getFund')
				.then(res => {
					this.fund = res.data[0].amount
					this.checker = res.data[0].userRegister 
					console.log(this.inspector)
					if (this.fund == 0 || this.checker == '') {
						this.inspector = true
						this.fund = 0
						this.checker = 'No hay cajero registrado'
					}
				})
			},
			async getDataChecker(){
				const dataChecker = await axios.get('ventas/dataChecker')
				this.dataChecker = dataChecker.data
				let fechaBien = ''
					for (let index = 0; index < this.dataChecker.length; index++) {
						let fech = new Date(this.dataChecker[index].fecha)
						fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ fech.getMinutes()+")"
						this.dataChecker[index].fecha = fechaBien
						let servicio = ''
						
						for (let indexTwo = 0; indexTwo < this.dataChecker[index].servicios.length; indexTwo++) {
							servicio = servicio +'\n'+ this.dataChecker[index].servicios[indexTwo].servicio
						}
						this.dataChecker[index].servicios = servicio
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
			async editProfile(){
				let formData = new FormData();
				formData.append('image', this.file)
				formData.append('first_name', this.first_name)
				formData.append('last_name', this.last_name)
				formData.append('email', this.email)
				const dataChange = {
					nombre: this.first_name,
					apellido: this.last_name
				}
				try {
					const image = await axios.post('users/editData/'+this.id, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
							'x-access-token': localStorage.userToken
						}
					})
					this.$swal({
						type: 'success',
						title: 'Datos editados',
						showConfirmButton: false,
						timer: 2500
					})
					// this.emitMethod(image.data.status)
					localStorage.setItem('nombre', dataChange.nombre)
					localStorage.setItem('apellido', dataChange.apellido)
					EventBus.$emit('data-change', dataChange)
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
			async EditPass(){
				if (this.newPassVerify == this.newPass) {
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
							this.newPassVerify = ''
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
						$('#ModalEditPass').modal('hide')
						this.$swal({
							type: 'error',
							title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
							showConfirmButton: false,
							timer: 2500
						})
						router.push({name: 'Login'})
					}
				}else{
						this.$swal({
							type: 'error',
							title: 'Las contraseñas deben conincidir',
							showConfirmButton: false,
							timer: 2500
						})
				}
				
			},
			openModal(){
				$('#ModalEditPass').modal('show')
			},
			formatDate(date) {
				let dateFormat = new Date(date)
				return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
			},
			daySaleClose(){
				axios.get('ventas/getFund')
				.then(res => {
					const fondo = res.data[0].amount
					const egresoSistema = res.data[0].amount
					axios.get('ventas/getClosingDay')
					.then(res => {
						if (res.data.status === 'bad') {
						this.$swal({
							type: 'error',
							title: 'Sin ventas el dia no se puede cerrar',
							showConfirmButton: false,
							timer: 1500
						})
						}else{
						const efectivo = res.data.efectivo
						const redCompraDebito = res.data.redCompraDebito
						const redCompraCredito = res.data.redCompraCredito
						const transferencia = res.data.transferencia
						const otros = res.data.otros
						const total = res.data.total
						this.$swal({
							title: 'Por favor, registre el monto egresado de la caja',
							input: 'number',
							inputPlaceholder: 'Monto egreso',
							showCloseButton: true,
						})
						.then(result => {
							const egresoManual = result.value 
							
							this.$swal({
							title: 'Verificación de ventas',
							html: `
								<form>
								<div class="row">
									<div class="form-group col-6" style="width:100%;">
									<label style="float:left;">Fondo de la caja</label>
									<input type="number" class="form-control classFondo" value="${fondo}" readonly requerid>
									</div>
									<div class="form-group col-6" style="width:100%;">
									<label style="float:left;">Efectivo</label>
									<input type="number" class="form-control classEfectivo" placeholder="$ 0" requerid>
									</div>
									<div class="form-group col-6" style="width:100%;">
									<label style="float:left;">Débito</label>
									<input type="number" class="form-control classRedcompreD" placeholder="$ 0" requerid>
									</div>
									<div class="form-group col-6" style="width:100%;">
									<label style="float:left;">Crédito</label>
									<input type="number" class="form-control classRedcompreC" placeholder="$ 0" requerid>
									</div>
									<div class="form-group col-6" style="width:100%;">
									<label style="float:left;">Transferencias</label>
									<input type="number" class="form-control classTransferencia" placeholder="$ 0" requerid>
									</div>
									<div class="form-group col-6" style="width:100%;">
									<label style="float:left;">Otros</label>
									<input type="number" class="form-control classOtros" placeholder="$ 0" requerid>
									</div>
								</div>
								</form>
							`,
							type: 'warning',
							showCancelButton: true,
							confirmButtonText: 'Confirmar',
							cancelButtonText: 'Cerrar',
							showCloseButton: true,
							showLoaderOnConfirm: true
							})
							.then((result) => {
								if(result.value) {
								const fondoManual = $('.classFondo').val()
								const efectivoManual = $('.classEfectivo').val()
								const redCompreDManual = $('.classRedcompreD').val()
								const redCompreCManual = $('.classRedcompreC').val()
								const transferenciaManual = $('.classTransferencia').val()
								const otrosManual = $('.classOtros').val()
								const totalManual = parseFloat(efectivoManual) + parseFloat(redCompreDManual) + parseFloat(redCompreCManual) + parseFloat(transferenciaManual) + parseFloat(otrosManual)
								console.log(totalManual)
								if (fondoManual == '' || efectivoManual == '' || redCompreDManual == '' || redCompreCManual == '' || otrosManual == '' || totalManual == '' || transferenciaManual == '') {
									this.$swal({
									type: 'error',
									title: 'Complete todos los campos',
									showConfirmButton: false,
									timer: 1500
									})
								}else{
									this.$swal({
									title: 'Por favor, escriba su nombre ^^',
									input: 'text',
									inputPlaceholder: 'Escriba su nombre aquí',
									showCloseButton: true,
									})
									.then(result => {
									if (result.value == '') {
										this.$swal({
										type: 'error',
										title: 'Debe escribir su nombre',
										showConfirmButton: false,
										timer: 1500
										})
									}else if(result.dismiss){
										this.$swal({
										type: 'info',
										title: 'Aborto cierre',
										showConfirmButton: false,
										timer: 1500
										})
									}else{
										var totalEfectivoSistema = parseFloat(fondo) + parseFloat(efectivo) - parseFloat(egresoManual)
										var totalEfectivoManual = parseFloat(fondoManual) + parseFloat(efectivoManual) - parseFloat(egresoManual)
								
										const identificacionCierre = result.value
										axios.post('ventas/closeDay/'+identificacionCierre, {
										efectivoSistema: parseFloat(efectivo),
										redCompraDebitoSistema: parseFloat(redCompraDebito),
										redCompraCreditoSistema: parseFloat(redCompraCredito),
										transferenciaSistema: parseFloat(transferencia),
										otrosSistema: parseFloat(otros),
										totalSistema: parseFloat(total),
										fondoSistema: parseFloat(fondo),
										egresoSistema: parseFloat(egresoManual),
										totalEfectivoSistema: parseFloat(totalEfectivoSistema),
										
										totalEfectivoManual: parseFloat(totalEfectivoManual),
										fondoManual: parseFloat(fondoManual),
										egresoManual: parseFloat(egresoManual),
										efectivoManual: parseFloat(efectivoManual),
										redCompreDManual: parseFloat(redCompreDManual),
										redCompreCManual: parseFloat(redCompreCManual),
										transferenciaManual: parseFloat(transferenciaManual),
										otrosManual: parseFloat(otrosManual),
										totalManual: parseFloat(totalManual)
										})
										.then(res => {
										if (res.data.status == 'ok') {
											this.$swal({
												type: 'success',
												title: 'Cierre hecho correctamente',
												showConfirmButton: false,
												timer: 1500
											})
											this.inspector = true
										}
										})
										.catch(err => {
										console.log(err)
										})
									}
									})
								}
								}else{
								this.$swal({
									type: 'info',
									title: 'Aborto cierre',
									showConfirmButton: false,
									timer: 1500
								})
								}
							})
						})
						}
					})
				})
			},
		},
		mounted() {
			EventBus.$on('reloadVenta', status => {
				console.log('status')
				this.getYourSales()
				this.getDataChecker()
			})
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
	.btn-img{
		background-color:#5a5858;
		color: azure;
		transition: all 0.5s ease-out;
		font-family: 'Roboto', sans-serif !important;
		font-weight:600;
		letter-spacing: 1px;
		border-radius:5px;
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
	.inputsProfile{
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
	.formsProfile{
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		max-height: 80vh;
		height:auto;
		border-radius:5px;
	}
	
	.formsProfile::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.boxFunds{
    	position:fixed;
		top:90%;
		right:2%;
		z-index: 1000;
		transform : translate(-50% ,-50%);
	}
	.FondoDia:link,
	.FondoDia:visited{
		text-decoration: none;
		text-transform:uppercase;
		position:relative;
		top:0;
		left:0;
		padding:20px 40px;
		border-radius:100px;
		display:inline-block;
		transition: all .6s;
	}

	.btn-whiteFunds{
		padding: 15px;
		border-radius:10px;
		background-color:#fff;
		color: #353535;
		border:2px solid #353535;
		font-size: 1em;
		outline: none !important;
	}
	.btn-whiteFunds:focus{
		outline: none !important;
	}

	.FondoDia:hover{
		box-shadow:0px 10px 10px #353535;
		transform : translateY(-3px);
	}

	.FondoDia:active{
		box-shadow:0px 5px 10px #353535;
		transform:translateY(-1px);
	}

	.btn-bottom-animation-1{
		animation:comeFromBottom 2s ease-out .8s;
	}

	.FondoDia::after{
		content:"";
		text-decoration: none;
		text-transform:uppercase;
		position:absolute;
		width:100%;
		height:100%;
		top:0;
		left:0;
		border-radius:10px;
		display:inline-block;
		z-index:-1;
		transition: all .5s;
	}

	.btn-whiteFunds::after {
		background:#353535;
	}

	.btn-animation-1:hover::after {
		transform: scaleX(1.6) scaleY(1.8);
		opacity: 0;
	}

	@keyframes comeFromBottom{
		0%{
		opacity:0;
		transform:translateY(40px);
		} 
		100%{
		opacity:1;
		transform:translateY(0);
		}
	}

	.boxCloses{
    	position:fixed;
		top:90%;
		right:6%;
		z-index: 1000;
		transform : translate(-50% ,-50%);
	}
	.CierreDia:link,
	.CierreDia:visited{
		text-decoration: none;
		text-transform:uppercase;
		position:relative;
		top:0;
		left:0;
		padding:20px 40px;
		border-radius:100px;
		display:inline-block;
		transition: all .6s;
	}

	.btn-whiteDates{
		padding: 15px;
		border-radius:10px;
		background-color:#fff;
		color: #353535;
		border:2px solid #353535;
		font-size: 1em;
		outline: none !important;
	}
	.btn-whiteDates:focus{
		outline: none !important;
	}

	.CierreDia:hover{
		box-shadow:0px 10px 10px #353535;
		transform : translateY(-3px);
	}

	.CierreDia:active{
		box-shadow:0px 5px 10px #353535;
		transform:translateY(-1px);
	}

	.btn-bottom-animation-1{
		animation:comeFromBottom 2s ease-out .8s;
	}

	.CierreDia::after{
		content:"";
		text-decoration: none;
		text-transform:uppercase;
		position:absolute;
		width:100%;
		height:100%;
		top:0;
		left:0;
		border-radius:10px;
		display:inline-block;
		z-index:-1;
		transition: all .5s;
	}

	.btn-whiteDates::after {
		background:#353535;
	}

	.btn-animation-1:hover::after {
		transform: scaleX(1.6) scaleY(1.8);
		opacity: 0;
	}

	@keyframes comeFromBottom{
		0%{
		opacity:0;
		transform:translateY(40px);
		} 
		100%{
		opacity:1;
		transform:translateY(0);
		}
	}

	.metricssExpensePerfil{
        padding: auto;
        width: 70%;
        margin: auto;
        margin-top: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        color:#fff;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
        border-radius:5px;
    }
	.metricssExpensePerfil p{
		font-size: 0.7em;
		margin-top: 10px;
	}
	.firstExpensesPerfil{
		background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
		color:#353535;
	} 
</style>