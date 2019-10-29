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
					<table  class="table table-dark" style="color:#fff !important" >
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
		    <div v-bind:style="{ 'background-color': '#29323c'}" class="modal-content">
		      <div class="modal-header">
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
						<input v-model="documentoPrestadorEdit" type="numbre" class="form-control inputs" placeholder="Identificación">
					</div>
					<div class="form-group">
						<label for="name">Porcentaje de ganancia</label>
						<input v-model="porcentajePrestadorEdit" type="text" class="form-control inputs" placeholder="Porcentaje">
					</div>
					<button class="btn w-100 add">Editar prestador</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="ModalCreateEmploye" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content" v-bind:style="{ 'background-color': '#29323c'}">
		      <div class="modal-header">
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
						<input v-model="documento" type="numbre" class="form-control inputs" placeholder="Identificación">
					</div>
					<div class="form-group">
						<label for="name">Porcentaje de ganancia</label>
						<input v-model="porcentaje" type="text" class="form-control inputs" placeholder="Porcentaje">
					</div>
					<button class="btn w-100 add">Agregar prestador</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="box">
			<button class="createService btn-white btn-animation-1" v-on:click="openModalCreateEmploye">
				<font-awesome-icon style="font-size: 1.6em;" icon="user-plus" />
			</button>
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
			manicurista: new Manicurista(),
			manicuristas: [],
			venta: new Venta(),
			ventas: [],
			nombrePrestador: '',
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
		},
		sacarReporte(id) {
            localStorage.setItem('reportePrestador', id)
            router.push({name:'reporteprestador'})
        },
		registroPrestador(){
			axios.post('manicuristas', {
				nombreManicurista: this.nombrePrestador,
				documentoManicurista: this.documento,
				porcentajeManicurista: this.porcentaje
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
		},
		openModalCreateEmploye(){
			$('#ModalCreateEmploye').modal('show')
		},
		actualizarPrestador(){
			axios.put('manicuristas/' + this.idPrestadorEdit, {
				nombre: this.nombrePrestadorEdit,
				documento: this.documentoPrestadorEdit,
				porcentaje: this.porcentajePrestadorEdit
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
		},
		pasarDatosEdit(nombre, documento, porcentaje, id){
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
	table{
		border:none !important;
		margin-bottom:0 !important;
		table-layout: fixed;
		color:#102229 !important
	}
	.first{
		background: #505970;  /* fallback for old browsers */
	}
	.second{
		background: #6A7693;  /* fallback for old browsers */
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
		color:#fff;
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
		border-bottom:2px solid azure !important;
		background-color:transparent !important;
		color:#fff !important;
		font-family: 'Roboto', sans-serif !important;
		letter-spacing: .09em;
	}
	.add{
		background-color:#ccc;
		color: #102229;
		transition: all 0.5s ease-out;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	.add:hover{
		background-color:#102229;
		color:#ccc;
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
		background-color: #343a40;
		color:#fff;
	}
	.btn-colorsEdit{
		background-color:#495057;
		color:#fff;
	}
	.btn-colorsPrint{
		background-color:#495057;
		color:#fff;
	}
	.box{
    	position:fixed;
		top:90%;
		right:2%;
    	transform : translate(-50% ,-50%);
  	}
	.createService:link,
	.createService:visited{
		text-decoration: none;
		text-transform:uppercase;
		position:relative;
		top:0;
		left:0;
		font-size: 1.6em;
		padding:20px 40px;
		border-radius:100px;
		display:inline-block;
		transition: all .6s;
	}

	.btn-white{
		padding: 15px;
		border-radius:10px;
		background-color:#fff;
		color: #102229;
		border:2px solid #102229;
		font-size: 1em;
		outline: none !important;
	}
	.btn-white:focus{
		outline: none !important;
	}

	.createService:hover{
		box-shadow:0px 10px 10px rgba(0,0,0,0.2);
		transform : translateY(-3px);
	}

	.createService:active{
		box-shadow:0px 5px 10px rgba(0,0,0,0.2);
		transform:translateY(-1px);
	}

	.btn-bottom-animation-1{
		animation:comeFromBottom 2s ease-out .8s;
	}

	.createService::after{
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

	.btn-white::after {
		background:#102229;
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
</style>
