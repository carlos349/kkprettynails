<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12 row sectionMetrics">
				<div class="col-md-3 metrics first">
					<p>Total Servicios</p>
					<h1>{{TotalServicios}}</h1>
				</div>
				<div class="col-md-3 metrics second">
					<p>Servicios mensuales</p>
					<h1>{{TotalCantidadServicios}}</h1>
				</div>
				<div class="col-md-3 metrics three">
					<p>Prestadores</p>
					<h1>{{TotalPrestadores}}</h1>
				</div>
			</div>
			<div class="col-md-4">
				<div class="forms">
					<h2>Crear Servicio</h2>
					<form v-on:submit.prevent="registroServicio">
						<div class="form-group">
							<label for="name">Nombre del servicio</label>
							<input v-model="nombreServi" type="text" class="form-control inputs" placeholder="Nombre servicio">
						</div>
						<div class="form-group">
							<label for="name">Tiempo</label>
							<input v-model="tiempoServi" type="numbre" class="form-control inputs" placeholder="0 min">
						</div>
						<div class="form-group">
							<label for="name">Precio</label>
							<input v-model="precioServi" type="text" class="form-control inputs" placeholder="Precio">
						</div>
						<label for="name">Prestador</label>
						<div class="form-group row" >
								<label v-for="(manicurista, index) of manicuristas" class="conCheck col-sm-2">{{manicurista.nombre}}
								<input :id="index" class="checkFirst" v-on:click="presSelect(manicurista.documento,index)" type="checkbox">
								<span class="checkmark"></span>
								</label>
						</div>
						<button class="btn w-100 add">Agregar</button>
					</form>
				</div>
			</div>
			<div class="col-md-8 ">
				<div class="shadow">
					
				<table  class="table table-dark" style="color:#fff !important" >
					<thead>
						<tr>
							 <th>
								 Nombre
							 </th>
							 <th>
								 Tiempo
							 </th>
							 <th>
								 Precio
							 </th>
							 <th>
								 Prestadores
							 </th>
							 <th class="text-center">
								 Funciones
							 </th>
							 
						 </tr>
					</thead>
				</table>
				
				<div class="Lista tbl-content">
					<table class="table table-light table-borderless table-striped">
						<tbody>
							<tr v-for="servicio of servicios">
								<td class="font-weight-bold">
									{{servicio.nombre}}
								</td>
								<td class="font-weight-bold">
									{{servicio.tiempo}}
								</td>
								<td class="font-weight-bold">
									{{servicio.precio}}
								</td>
								<td class="font-weight-bold">
									{{servicio.prestadores.length}}
								</td>
								<td class="font-weight-bold text-center">
									<button style="width:40%;" v-on:click="desactivarServicio(servicio._id)" v-if="servicio.active" class=" btn btn-success">Activo</button>
									<button style="width:40%;" v-on:click="desactivarServicio(servicio._id)" v-if="!servicio.active" class=" btn btn-danger">Inactivo</button>
									<button style="width:40%;" v-on:click="pasarDatosEdit(servicio.nombre, servicio.tiempo, servicio.precio, servicio.prestadores, servicio._id)" class=" btn btn-warning">Editar</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				</div>
			</div>
			<div class="col-md-4" style="margin-top:20px;">
				<div class="shadow">
					<table  class="table table-dark" style="color:#fff !important" >
						<thead>
							<tr>
								<th>
									Servicio
								</th>
								<th class="text-center">
									Cantidad
								</th>				
							</tr>
						</thead>
					</table>
					<div class="ListaTwo">
						<table class="table table-light table-borderless table-striped">
							<tbody>
								<tr v-for="servicesQuantityPerMonth of servicesQuantityPerMonths">
									<td class="font-weight-bold">
										{{servicesQuantityPerMonth.nombre}}
									</td>
									<td class="font-weight-bold text-center">
										{{servicesQuantityPerMonth.cantidad}}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="col-md-8 chart">
				<div class="small">
					<line-chart v-if="loaded" :chartdata="chartdata" :options="options" :styles="myStyles"/>
				</div>
			</div>
		</div>
		<div class="modal fade" id="myModal2" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content">
		      <div class="modal-header bg-info">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registro cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <form v-on:submit.prevent="actualizacionServicios">
					<div class="form-group">
						<label for="nombre">Nombre del servicio</label>
						<input type="text" v-model="nombreServicio" class="form-control" name="nombreServicio" placeholder="Nombre del servicio" >
					</div>
					<div class="form-group">
						<label for="nombre">Tiempo</label>
						<input type="text" v-model="tiempoServicio" class="form-control" name="nombreServicio" placeholder="0 min" >
					</div>
					<div class="form-group">
						<label for="nombre">Precio del servicio</label>
						<input type="text" v-model="precioServicio" class="form-control" name="nombreServicio" placeholder="Precio del servicio" >
					</div>
					<div class="form-group row" >
						<label v-for="(manicurista, index) of manicuristas" class="conCheck col-sm-2">{{manicurista.nombre}}

						<input :class="manicurista.documento" class="desMarc" v-on:click="presSelectTwo(manicurista.documento,index)"  type="checkbox">
						
						<span class="checkmark"></span>
						</label>
					</div>
					<button class="btn btn-lg btn-info btn-block" type="submit">Actualizar servicio</button>
		        </form>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	import axios from 'axios'
	import LineChart from '../plugins/LineChart.js'
	import router from '../router'

	class Manicurista{
		constructor(nombre, documento, porcentaje, comision) {
			this.nombre = nombre;
			this.documento = documento;
			this.porcentaje = porcentaje;
			this.comision = comision;
		}
	}

	class Servicio{
		constructor(nombre, tiempo, precio, prestadores ) {
			this.nombre = nombre;
			this.tiempo = tiempo;
			this.precio = precio;
			this.prestadores = prestadores;
		}
	}

	class PrestadoresSeleccionados{
		constructor(prestador){
			this.prestador = prestador;
		}
	}

	class PrestadoresSeleccionadosTwos{
		constructor(prestador){
			this.prestador = prestador;
		}
	}

	class ServicesQuantityPerMonths{
		constructor(nombre, cantidad){
			this.nombre = nombre;
			this.cantidad = cantidad;
		}
	}
	export default {
		components: {
			LineChart
		},
		data() {
			return {
				manicurista: new Manicurista(),
				manicuristas: [],
				servicio: new Servicio(),
 			 	servicios: [],
				nombreServicio: '',
				tiempoServicio: '',
				precioServicio: '',
				prestadoresEdit: '',
				idServicioEditar: '',
				prestadorSelect:'',
				prestadoresSeleccionado : new PrestadoresSeleccionados(),
				prestadoresSeleccionadoTwo : new PrestadoresSeleccionadosTwos(),
				prestadoresSeleccionados:[],
				prestadoresSeleccionadosTwos:[],
				nombreServi:'',
				tiempoServi:'',
				precioServi:'',
				servicesQuantityPerMonth: new ServicesQuantityPerMonths(),
				servicesQuantityPerMonths: [],
				loaded: false,
				chartdata: null,
				height:360,
				options: {
					responsive: true,
					maintainAspectRatio: false
				},
				TotalServicios:'0',
				TotalCantidadServicios:'0',
				TotalPrestadores: '0'
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
			 this.getServicios();
			 this.getManicuristas();
			 this.ServicesQuantityPerMonthFunc();
			 this.ServicesQuantityChartFunc();
			 
 		},
		methods: {
			getServicios() {
				axios.get('servicios')
				.then(res => {
					this.servicios = res.data
					this.TotalServicios = res.data.length
				})
				this.nombreServicio = ' '
				this.precioServicio = ' '
			},
			desactivarServicio(id){
				axios.put('servicios/changeActive/' + id)
				.then(res => {
					this.getServicios();
				})
				.catch(err => {
					this.$swal({
						type: 'error',
						title: 'Hubo un problema',
						showConfirmButton: false,
						timer: 1500
					})
				})
			},
			registroServicio(){
				if (this.nombreServi == '' && this.precioServi == '' && this.tiempoServi == '') {
					this.$swal({
						type: 'error',
						title: 'Llene todos los campos',
						showConfirmButton: false,
						timer: 1500
					})
				}else{
					if (this.prestadoresSeleccionados.length == 0) {
						this.$swal({
							type: 'error',
							title: 'Seleccione almenos un prestador',
							showConfirmButton: false,
							timer: 1500
						})
					}else{
						axios.post('servicios', {
							nombreServicio: this.nombreServi,
							precioServicio: this.precioServi,
							tiempoServicio: this.tiempoServi,
							prestadores: this.prestadoresSeleccionados

						})
						.then(res => {
							if(res.data.status == 'Servicio creado'){
								this.$swal({
								type: 'success',
								title: 'Servicio creado',
								showConfirmButton: false,
								timer: 1500
								})
								this.getServicios();
								this.nombreServi = ''
								this.precioServi = ''
								this.tiempoServi = ''
								this.prestadoresSeleccionados = []
								$('.checkFirst').prop('checked', false)
							}else{
								this.$swal({
								type: 'error',
								title: 'El servicio ya existe',
								showConfirmButton: false,
								timer: 1500
								})
							}
						})
					}
				}
			},
			presSelect(prestador,index){
				if ($(".checkFirst").is(":checked") == false ) {
					this.prestadoresSeleccionados = []
				}
				if ($("#"+index).prop("checked")!=true ) {
					for (let i = 0; i < this.prestadoresSeleccionados.length; i++) {
						if (this.prestadoresSeleccionados[i] == prestador ) {
							this.prestadoresSeleccionados.splice(i, 1)
							break
						}
					}
				}
				else{
					let select = prestador
					this.prestadoresSeleccionados.push(prestador)
				}
			},
			presSelectTwo(prestador,index){
				if ($("."+prestador).prop("checked")!=true ) {
					for (let i = 0; i < this.prestadoresSeleccionadosTwos.length; i++) {
						if (this.prestadoresSeleccionadosTwos[i] == prestador ) {
							this.prestadoresSeleccionadosTwos.splice(i, 1)
							break
						}
					}
				}
				else{
						let select = prestador
						const prestadorSelect = {"prestador": select}
						this.prestadoresSeleccionadosTwos.push(prestador)
					}
					console.log(this.prestadoresSeleccionadosTwos)
			},
			abrirModalRegistro(){
				$('#myModal').modal('show')
			},
			actualizacionServicios(){
				const id = this.idServicioEditar
				axios.put('servicios/' + id, {
					nombreServicio: this.nombreServicio,
					tiempoServicio: this.tiempoServicio,
					precioServicio: this.precioServicio,
					prestadores: this.prestadoresSeleccionadosTwos,
				})
				.then(res => {
					console.log(res)
					if(res.data.status == 'Servicio actualizado'){
						this.$swal({
						  type: 'success',
						  title: 'Servicio actualizado',
						  showConfirmButton: false,
						  timer: 1500
						})
						this.getServicios()
						$('#myModal2').modal('hide')
					}else{
						this.$swal({
						  type: 'error',
						  title: 'El servicio ya existe',
						  showConfirmButton: false,
						  timer: 1500
						})
						this.getServicios()
						$('#myModal2').modal('hide')
					}
				})
			},
			pasarDatosEdit(nombre,tiempo, precio, prestadores, id){
				this.prestadoresSeleccionadosTwos = []
				$(".desMarc").prop("checked", false)
				this.nombreServicio = nombre
				this.tiempoServicio = tiempo
				this.precioServicio = precio
				this.prestadoresEdit = prestadores
				this.idServicioEditar = id
				for (let i = 0; i < this.prestadoresEdit.length; i++) {
					if ($("."+this.prestadoresEdit[i])) {

						$("."+this.prestadoresEdit[i]).prop("checked", "true")
						this.prestadoresSeleccionadosTwos.push(this.prestadoresEdit[i])
					}
					
				}
				$('#myModal2').modal('show')
			},
			getManicuristas(){
				axios.get('manicuristas')
				.then(res => {
					this.manicuristas = res.data
					this.TotalPrestadores = res.data.length
				})
				
			},
			ServicesQuantityPerMonthFunc(){
				axios.get('/servicios/ServicesQuantityPerMonth')
				.then(res => {
					for (let index = 0; index < res.data.length; index++) {
						this.servicesQuantityPerMonths.push(res.data[index].servicio.servicio)
						this.TotalCantidadServicios = parseFloat(this.TotalCantidadServicios) + parseFloat(this.servicesQuantityPerMonths[index].cantidad)
					}
				})
			},
			ServicesQuantityChartFunc(){
				this.loaded = false
				axios.get('/servicios/ServicesChartQuantity')
				.then(res => {	
					console.log(res.data)
					const userlist = res.data
					this.chartdata = userlist
					this.loaded = true
				})
				.catch(err => {
					console.error(err)
				})
			},
			
			
		},
		computed: {
			myStyles () {
				return {
					height: `${this.height}px`,
					position: 'relative'
				}
			}
		}
	}
</script>
<style>
	.metrics{
		height: auto;
		background-color: #fff;
		margin:20px;
		color:#fff;
		padding: 10px;
		padding-right: 15px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
	}
	.metrics p{
		font-size: 1em;
		margin-top: 10px;
		
	}
	.metrics h1{
		float: right;
		margin-top: -55px;
	}
	.sectionMetrics{
		margin-left: 8%;
	}
	table{
		border:none !important;
		margin-bottom:0 !important;
		table-layout: fixed;
		color:#102229 !important
	}
	.forms{
		background-color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 470px;
		height:auto;
		border-radius:5px;
		border-radius:5px;
	}
	.forms::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.Lista{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 420px;
		height:auto;
		border-radius:5px;
	}
	.Lista::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.ListaTwo{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 310px;
		height:auto;
		border-radius:5px;
	}
	.ListaTwo::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.inputs{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #102229 !important;
		background-color:transparent !important;
		color:#102229 !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	label{
		color:#102229
	}
	.selectMani{
		background-color:#355461 !important;
		color:#fff !important;
		border:none !important;
		border-bottom:2px solid #102229 !important;
	}
	.add{
		background-color:#102229;
		color:#fff;
		transition: all 0.5s ease-out;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	.add:hover{
		background-color:#ccc;
		
	}

	.conCheck {
		display: inline-block;
		margin-left: 5%;
		position: relative;
		padding-left: 35px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 0.8em;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

		/* Hide the browser's default checkbox */
	.conCheck input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: #eee;
	}

	/* On mouse-over, add a grey background color */
	.conCheck:hover input ~ .checkmark {
		background-color: #ccc;
	}

	/* When the checkbox is checked, add a blue background */
	.conCheck input:checked ~ .checkmark {
		background-color: #102229;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.conCheck input:checked ~ .checkmark:after {
		display: inline-block;
	}

	/* Style the checkmark/indicator */
	.conCheck .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
	.first{
		background: #a73737;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #7a2828, #a73737);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #7a2828, #a73737); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


	}
	.second{
		background: #FF512F;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to left, #F09819, #FF512F);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to left, #F09819, #FF512F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	}
	.three{
		background: #3CA55C;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to left, #B5AC49, #3CA55C);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to left, #B5AC49, #3CA55C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	.forms h2{
		font-family: 'Raleway', sans-serif;
	}
	.small{
		background-color: #fff;
		margin-top: 20px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
</style>