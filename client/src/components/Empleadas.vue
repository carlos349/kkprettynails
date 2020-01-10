<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12 row sectionMetricsPrestador">
				<div class="col-md-5 metrics first">
					<p>Total prestadores</p>
					<h1>{{manicuristas.length}}</h1>
				</div>
				<div class="col-md-5 metrics second">
					<p>Servicio mensuales</p>
					<h1>{{TotalCantidadServicios}}</h1>
				</div>
			</div>
			<div class="col-md-12">
				<div class="shadow">	
					<v-client-table class="text-center" :data="manicuristas" :columns="columns" :options="optionsT">
						
						<p slot="porcentaje"  slot-scope="props">{{props.row.porcentaje }}%</p>
						<p slot="comision"  slot-scope="props">{{formatPrice(props.row.comision)}}</p>
						<p slot="advancement"  slot-scope="props">{{formatPrice(props.row.advancement)}}</p>
						<p slot="rest"  slot-scope="props">{{formatPrice(props.row.comision - props.row.advancement)}}</p>
						<button slot="edit"  slot-scope="props" style="width:100%;" v-on:click="pasarDatosEdit(props.row.nombre,props.row.documento,props.row.porcentaje, props.row.restTime, props.row.restDay, props.row._id)" class=" btn btn-colorsEdit"><font-awesome-icon icon="edit" /></button>
						<button slot="delete" style="width:100%;"  slot-scope="props" v-on:click="deletePrestador(props.row._id)" class=" btn btn-colorsTrash"><font-awesome-icon icon="trash" /></button>
						<button slot="report" style="width:100%;"  slot-scope="props" v-on:click="sacarReporte(props.row._id)" class=" btn btn-colorsPrint"><font-awesome-icon icon="copy" /></button>
						<!-- <a slot="edit" slot-scope="props" class="fa fa-edit" :href="pasarDatosEdit(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row._id)">Hola </a> -->
					</v-client-table>
					<!-- <table  class="table table-dark" style="color:#fff !important; background-color: #1F5673" >
						<thead>
							<tr>
								<th>
									Nombre
								</th>
								<th>
									Porcentaje
								</th>
								<th>
									Identificación
								</th>
								<th>
									Comision mensual
								</th>
								<th>
									Adelantos o bonos
								</th>
								<th>
									Total pago
								</th>
								<th class="text-center">
									Funciones
								</th>	
							</tr>
						</thead>
					</table>
					<div class="ListaPrestador tbl-content">
						<table class="table table-light table-borderless table-striped">
							<tbody>
								<tr v-for="manicurista of manicuristas">
									<td class="font-weight-bold">
										{{manicurista.nombre}}
									</td>
									<td class="font-weight-bold">
										{{manicurista.porcentaje}}
									</td>
									<td class="font-weight-bold">
										{{manicurista.documento}}
									</td>
									<td class="font-weight-bold">
										{{formatPrice(manicurista.comision)}}
									</td>
									<td class="font-weight-bold">
										{{formatPrice(manicurista.advancement)}}
									</td>
									<td class="font-weight-bold">
										{{formatPrice(manicurista.comision - manicurista.advancement)}}
									</td>
									<td class="font-weight-bold text-center">
										<button style="width:30%;" v-on:click="deletePrestador(manicurista._id)" class=" btn btn-colorsTrash"><font-awesome-icon icon="trash" /></button>
										<button style="width:30%;" v-on:click="pasarDatosEdit(manicurista.nombre, manicurista.documento, manicurista.porcentaje, manicurista._id)" class=" btn btn-colorsEdit"><font-awesome-icon icon="edit" /></button>
										<button style="width:30%;" v-on:click="sacarReporte(manicurista._id)" class=" btn btn-colorsPrint"><font-awesome-icon icon="copy" /></button>
									</td>
								</tr>
							</tbody>
						</table> -->
					<!-- </div> -->
				</div>
			</div>
			<div class="col-md-4" style="margin-top:20px;">
				<div class="box">
					<button class="btn-white" v-on:click="openModalCreateEmploye">
						Registrar prestador
					</button>
				</div>
				<div class="shadow">
					<table  class="table table-dark" style="color:#fff !important; background-color: #1F5673" >
						<thead>
							<tr>
								<th>
									Prestador
								</th>
								<th class="text-right">
									Cantidad de servicios
								</th>				
							</tr>
						</thead>
					</table>
					<div class="ListaPrestadorTwo">
						<table class="table table-light table-borderless table-striped">
							<tbody>
								<tr v-for="PrestadorQuantityPerMonth of PrestadorQuantityPerMonths">
									<td class="font-weight-bold">
										{{PrestadorQuantityPerMonth.nombre}}
									</td>
									<td class="font-weight-bold text-center">
										{{PrestadorQuantityPerMonth.cantidad}}
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
		<div class="modal fade" id="ModalEditPrestador" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div v-bind:style="{ 'background-color': '#ffffff'}" class="modal-content p-3">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Editar Prestador</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body letters">
				<form v-on:submit.prevent="actualizarPrestador">
					<div class="form-group">
						<label for="name">Nombre del prestador</label>
						<input v-model="nombrePrestadorEdit" type="text" class="form-control inputs" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="name">Documento de identificación</label>
						<input v-model="documentoPrestadorEdit" type="numbre" class="form-control inputs" placeholder="Identificación" v-on:change="changeRutEdit()" v-on:click="changeToEdit()">
					</div>
					<div class="form-group">
						<label for="name">Porcentaje de ganancia</label>
						<input v-model="porcentajePrestadorEdit" type="text" class="form-control inputs" placeholder="Porcentaje">
					</div>
					<div class="form-group row">
						<label for="name" class="col-12">Horario de descanso</label>
						<select class="form-control col-6" v-model="restTimeEdit" >
							<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
							<option style="color:black;" value="12:00">12:00</option>
							<option style="color:black;" value="12:30">12:30</option>
							<option style="color:black;" value="13:00">13:00</option>
							<option style="color:black;" value="13:30">13:30</option>
							<option style="color:black;" value="14:00">14:00</option>
						</select>
						<select class="form-control col-6" v-model="restTimeEndEdit" >
							<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
							<option style="color:black;" value="12:30">12:30</option>
							<option style="color:black;" value="13:00">13:00</option>
							<option style="color:black;" value="13:30">13:30</option>
							<option style="color:black;" value="14:00">14:00</option>
							<option style="color:black;" value="14:30">14:30</option>
						</select>
					</div>
					<div class="form-group">
						<label>Día libre</label>
						<select class="form-control" v-model="restDayEdit" >
							<option style="color:black;" selected value="Seleccione el dia">Seleccione el dia</option>
							<option style="color:black;" value="1">Lunes</option>
							<option style="color:black;" value="2">Martes</option>
							<option style="color:black;" value="3">Miercoles</option>
							<option style="color:black;" value="4">Jueves</option>
							<option style="color:black;" value="5">Viernes</option>
							<option style="color:black;" value="6">Sábado</option>
							<option style="color:black;" value="0">Domingo</option>
						</select>
					</div>
					<button class="btn w-100 add">Editar prestador</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="ModalCreateEmploye" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content p-3" v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar prestador</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <form v-on:submit.prevent="registroPrestador">
					<div class="form-group">
						<label for="name">Nombre del prestador</label>
						<input v-model="nombrePrestador" type="text" class="form-control inputs" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="name">Documento de identificación</label>
						<input v-model="documento" type="text" class="form-control inputs" placeholder="Identificación" v-on:change="changeRut()" v-on:click="changeTo()">
					</div>
					<div class="form-group">
						<label for="name">Porcentaje de ganancia</label>
						<input v-model="porcentaje" type="text" class="form-control inputs" placeholder="Porcentaje">
					</div>
					<div class="form-group row">
						<label for="name" class="col-12">Horario de descanso</label>
						<select class="form-control col-6" v-model="restTime" >
							<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
							<option style="color:black;" value="12:00">12:00</option>
							<option style="color:black;" value="12:30">12:30</option>
							<option style="color:black;" value="13:00">13:00</option>
							<option style="color:black;" value="13:30">13:30</option>
							<option style="color:black;" value="14:00">14:00</option>
						</select>
						<select class="form-control col-6" v-model="restTimeEnd" >
							<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
							<option style="color:black;" value="12:30">12:30</option>
							<option style="color:black;" value="13:00">13:00</option>
							<option style="color:black;" value="13:30">13:30</option>
							<option style="color:black;" value="14:00">14:00</option>
							<option style="color:black;" value="14:30">14:30</option>
						</select>
					</div>
					<div class="form-group">
						<label>Día libre</label>
						<select class="form-control" v-model="restDay" >
							<option style="color:black;" selected value="Seleccione el dia">Seleccione el día</option>
							<option style="color:black;" value="1">Lunes</option>
							<option style="color:black;" value="2">Martes</option>
							<option style="color:black;" value="3">Miercoles</option>
							<option style="color:black;" value="4">Jueves</option>
							<option style="color:black;" value="5">Viernes</option>
							<option style="color:black;" value="6">Sábado</option>
							<option style="color:black;" value="0">Domingo</option>
						</select>
					</div>
					<button class="btn w-100 add">Agregar prestador</button>
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
class Venta{
	constructor(servicios, cliente, comision, total) {
		this.servicios = servicios;
		this.cliente = cliente;
		this.comision = comision;
		this.total = total;
	}
}

export default {
	components: {
		LineChart
	},
	data(){
		return {
			columns:['nombre' , 'documento' , 'porcentaje' , 'comision' , 'advancement', 'rest', 'edit', 'delete', 'report'],
			optionsT: {
				filterByColumn: true,
				texts: {
					filter: "Filtrar:",
					filterBy: 'Filtrar por {column}',
					count:' '
				},
				headings: {
					nombre: 'Nombre',
					documento: 'Identidad',
					porcentaje: 'Porcentaje',
					comision: 'Comisión',
					advancement: 'Avances',
					rest: 'Total',
					edit: 'Editar',
					delete: 'Borrar',
					report: 'Reporte'
				},
				pagination: { chunk:10 },
				pagination: { dropdown:true },
				pagination: { nav: 'fixed' },
				pagination: { edge: true },
				sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
				sortable: ['nombre', 'documento'],
				filterable: ['nombre', 'documento']
			},
			manicurista: new Manicurista(),
			manicuristas: [],
			venta: new Venta(),
			ventas: [],
			nombrePrestador: '',
			restTime: 'Seleccione el tiempo',
			restTimeEnd: 'Seleccione el tiempo',
			restTimeEdit: 'Seleccione el tiempo',
			restTimeEndEdit: 'Seleccione el tiempo',
			restDay: 'Seleccione el dia',
			restDayEdit: 'Seleccione el dia',
			documento:'',
			porcentaje:'',
			idManicuristaEditar: '',
			PrestadorQuantityPerMonths: [],
			loaded: false,
			chartdata: null,
			TotalCantidadServicios:0,
			height:360,
			options: {
				responsive: true,
				maintainAspectRatio: false
			},
			nombrePrestadorEdit: '',
			documentoPrestadorEdit: '',
			porcentajePrestadorEdit: '',
			idPrestadorEdit: ''
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
		this.getManicuristas();
		this.ServicesQuantityPerMonthFunc();
		this.ServicesQuantityChartFunc();
	},
	methods: {
		getManicuristas(){
			axios.get('manicuristas')
			.then(res => {
				this.manicuristas = res.data
			})
		},
		deletePrestador(id){
			this.$swal({
          title: '¿Seguro que desea eliminar?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCloseButton: true,
          showLoaderOnConfirm: true
        })
        .then(result => {
          if (result.value) {
            axios.delete('manicuristas/' + id)
			.then(res => {
				if(res.data.status = 'Prestador borrado'){
					this.$swal({
						type: 'success',
						title: 'Manicurista eliminado',
						showConfirmButton: false,
						timer: 1500
					})
					this.getManicuristas()
				}
			})
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'Hubo un problema',
					showConfirmButton: false,
					timer: 1500
				})
			})
          }
          else{
            
          }
        })
			
		},
		sacarReporte(id) {
            localStorage.setItem('reportePrestador', id)
            router.push({name:'reporteprestador'})
        },
		registroPrestador(){
			const restTime = this.restTime+"/"+this.restTimeEnd
			if (this.nombrePrestador == '') {
				this.$swal({
						type: 'error',
						title: 'Debe escribir el nombre del prestador',
						showConfirmButton: false,
						timer: 1500
					})
			}
			else if (this.documento == '') {
				this.$swal({
						type: 'error',
						title: 'Debe escribir el documento del prestador',
						showConfirmButton: false,
						timer: 1500
					})
			}
			else if (this.porcentaje == '') {
				this.$swal({
						type: 'error',
						title: 'Debe escribir el porcentaje del prestador',
						showConfirmButton: false,
						timer: 1500
					})
			}
			else {
				axios.post('manicuristas', {
				nombreManicurista: this.nombrePrestador,
				documentoManicurista: this.documento,
				porcentajeManicurista: this.porcentaje,
				restTime: restTime,
				restDay: this.restDay
			})
			.then(res => {
				if(res.data.status == 'Manicurista ingresada'){
					this.$swal({
						type: 'success',
						title: 'prestador ingresada',
						showConfirmButton: false,
						timer: 1500
					})
					this.getManicuristas()
					this.nombrePrestador = ''
					this.documento = ''
					this.porcentaje = ''
					$('#ModalCreateEmploye').modal('hide')
				}else{
					this.$swal({
						type: 'error',
						title: 'prestador ya existe',
						showConfirmButton: false,
						timer: 1500
					})
				}
			})
			}
			
		},
		openModalCreateEmploye(){
			$('#ModalCreateEmploye').modal('show')
		},
		actualizarPrestador(){
			const restTime = this.restTimeEdit+"/"+this.restTimeEndEdit
			if (this.nombrePrestadorEdit == '') {
				this.$swal({
						type: 'error',
						title: 'Debe escribir el nombre del prestador',
						showConfirmButton: false,
						timer: 1500
					})
			}
			else if (this.documentoPrestadorEdit == '') {
				this.$swal({
						type: 'error',
						title: 'Debe escribir el documento del prestador',
						showConfirmButton: false,
						timer: 1500
					})
			}
			else if (this.porcentajePrestadorEdit == '') {
				this.$swal({
						type: 'error',
						title: 'Debe escribir el porcentaje del prestador',
						showConfirmButton: false,
						timer: 1500
					})
			}
			else{
				axios.put('manicuristas/' + this.idPrestadorEdit, {
				nombre: this.nombrePrestadorEdit,
				documento: this.documentoPrestadorEdit,
				porcentaje: this.porcentajePrestadorEdit,
				restTime: restTime,
				restDay: this.restDayEdit
			})
			.then(res => {
				if(res.data.status == "Manicurista Editada"){
					this.$swal({
						type: 'success',
						title: 'Prestador actualizado',
						showConfirmButton: false,
						timer: 1500
					})
					$('#ModalEditPrestador').modal('hide')
					this.getManicuristas()
				}else{
					this.$swal({
						type: 'error',
						title: 'Prestador ya existe',
						showConfirmButton: false,
						timer: 1500
					})
				}
			})
			}
			
		},
		pasarDatosEdit(nombre, documento, porcentaje, restTime, restDay, id){
			if (restTime) {
				const splitRest = restTime.split('/')
				this.restTimeEdit = splitRest[0]
				this.restTimeEndEdit = splitRest[1]
			}else{
				this.restTimeEdit = "Seleccione el tiempo"
				this.restTimeEndEdit = "Seleccione el tiempo"
			}
			if (restDay) {
				this.restDayEdit = restDay
			}else{
				this.restDayEdit = "Seleccione el dia"
			}
			this.nombrePrestadorEdit = nombre
			this.documentoPrestadorEdit = documento
			this.porcentajePrestadorEdit = porcentaje
			
			
			this.idPrestadorEdit = id
			$('#ModalEditPrestador').modal('show')
		},
		ServicesQuantityPerMonthFunc(){
			axios.get('/servicios/PrestadorQuantityPerMonth')
			.then(res => {
				console.log(res.data)
				for (let index = 0; index < res.data.length; index++) {
					this.PrestadorQuantityPerMonths.push(res.data[index].registro)
					this.TotalCantidadServicios = parseFloat(this.TotalCantidadServicios) + parseFloat(this.PrestadorQuantityPerMonths[index].cantidad)
				}
			})
		},
		ServicesQuantityChartFunc(){
			this.loaded = false
			axios.get('/servicios/PrestadorChartQuantity')
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
		formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		formatRut(value) {
			let around = value.length - 3
			let concat = ''
			for (let index = 0; index < value.length; index++) {
				concat = concat + value[index]
				if (around == index) {
					concat = concat + '.'
				}
			} 
			let val = concat.replace('.', '-')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		changeRut(){
			this.documento = this.formatRut(this.documento)
		},
		changeTo(){
			this.documento = ''
		},
		changeRutEdit(){
			this.documentoPrestadorEdit = this.formatRut(this.documentoPrestadorEdit)
		},
		changeToEdit(){
			this.documentoPrestadorEdit = ''
		}
		
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
<style media="screen">
	
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
	.sectionMetricsPrestador{
		margin-left: 8%;
	}
	
	.first{
		background:#1F5673; /* fallback for old browsers */
	}
	.second{
		background:rgb(38, 91, 119); /* fallback for old browsers */
	}
	.formsPrestadores{
		background-color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 470px;
		color:#fff;
		height:auto;
		border-radius:5px;
		border-radius:5px;
	}
	label{
		color:#001514;
	}
	.formsPrestadores::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.formsPrestadores h2{
		font-family: 'Raleway', sans-serif;
	}
	.inputs{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #001514 !important;
		background-color:transparent !important;
		color:#001514 !important;
		font-family: 'Roboto', sans-serif !important;
	}
	.add{
		background-color:#1F5673;
		color: azure;
		
		font-family: 'Roboto', sans-serif !important;
		font-weight:600;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
		letter-spacing: 1px;
		border-radius:5px;
	}
	.add:hover{
		background-color:#ccc;
		color:#001514;
	}
	@media (max-width: 700px) {
		.respons{
		font-size: 2vw;
		}
	}
	@media (max-width: 400px) {
		.respons{
		font-size: 1.5vw;
		}
	}
	.report{
		cursor:pointer;
	}
	.reporteIndividual{
		display:none
	}
	.small{
		background-color: #fff;
		margin-top: 20px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
	.ListaPrestador{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 330px;
		height:auto;
		border-radius:5px;
	}
	.ListaPrestador::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.ListaPrestadorTwo{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 300px;
		height:auto;
		border-radius:5px;
	}
	.ListaPrestadorTwo::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.btn-colorsTrash{
		background-color: #FC7753;
		color:#fff;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.btn-colorsEdit{
		background-color:#28a745;
		color:#fff;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.btn-colorsPrint{
		background-color:#495057;
		color:#fff;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.btn-colorsPrint:hover{
		background-color:#ccc;
		color:#001514;
	}
	.box{
    	width: 100%;
  	}

	.btn-white{
		padding: 5px;
		width: 100%;
		margin-bottom: 5px;
		background-color: #28a745;
		color: #fff;
		border: none;
		font-size: 1.3em;
		outline: none !important;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.btn-white:hover{
		background-color: #218838;
	}
	.btn-white:focus{
		outline: none !important;
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
