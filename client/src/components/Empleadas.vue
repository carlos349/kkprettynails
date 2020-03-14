<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12 row sectionMetricsPrestador">
				<div class="col-md-5 metrics first">
					<p>Total prestadores</p>
					<h1>{{manicuristas.length}}</h1>
				</div>
				<div class="col-md-5 metrics first">
					<p>Servicio mensuales</p>
					<h1>{{TotalCantidadServicios}}</h1>
				</div>
			</div>
			<div class="col-md-12">
				<div>	
					<ul class="nav nav-tabs tabPerso w-100" id="myTab" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><font-awesome-icon class="mr-2" icon="table" />Tabla de datos</a>
						</li>
						
						<li class="nav-item">
							<a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><font-awesome-icon class="mr-2" icon="chart-line" />Métricas</a>
						</li>
						<li class="navButtonPerso" v-on:click="openModalCreateEmploye">
							<a class="nav-link" ><font-awesome-icon class="mr-2" icon="plus" />Registro</a>
						</li>
						<li class="navButtonPerso" v-on:click="toggleFilters()">
							<a class="nav-link" >
								<font-awesome-icon style="color:rgba(238, 238, 238, 0.623) !important" v-if="toggleFilter == false" class="mr-2" icon="filter" />
								<font-awesome-icon v-else class="mr-2" icon="filter" />Filtrar</a>
						</li>	
							
						
					</ul>
					<div class="tab-content" id="myTabContent">
						<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
							<v-client-table class="text-center pt-2 tablePresta" :data="manicuristas" :columns="columns" :options="optionsT">
						
						<p slot="porcentaje"  slot-scope="props">{{props.row.porcentaje }}%</p>
						<p slot="comision"  slot-scope="props">{{formatPrice(props.row.comision)}}</p>
						<p slot="advancement"  slot-scope="props">{{formatPrice(props.row.advancement)}}</p>
						<p slot="rest"  slot-scope="props">{{formatPrice(props.row.comision - props.row.advancement)}}</p>
						<button slot="edit"  slot-scope="props" style="width:100%;" v-on:click="pasarDatosEdit(props.row.nombre,props.row.documento,props.row.porcentaje, props.row.restTime, props.row.restDay, props.row._id, props.row.comision)" class=" btn btn-colorsEditLender"><font-awesome-icon icon="edit" /></button>
						<button slot="delete" style="width:100%;"  slot-scope="props" v-on:click="deletePrestador(props.row._id)" class=" btn btn-colorsTrashLender"><font-awesome-icon icon="trash" /></button>
						<button slot="report" style="width:100%;"  slot-scope="props" v-on:click="sacarReporte(props.row._id)" class=" btn btn-colorsPrintLender"><font-awesome-icon icon="copy" /></button>
					</v-client-table></div>
						<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
							
						</div>
						<div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
							<div style="margin-top:1.8%" class="col-sm-12 row" id="collapseExample">
								<div class="col-md-4" style="margin-top:20px;">
									
									<div>
										<table  class="table mb-0" style="color:black !important; background-color: rgba(238, 238, 238, 0.623);border-radius:5px 5px 0 0 !important;border:none !important" >
											<thead>
												<tr>
													<th style="border:none !important">
														Prestador
													</th>
													<th  style="border:none !important" class="text-right">
														Cantidad de servicios
													</th>				
												</tr>
											</thead>
										</table>
										<div class="ListaPrestadorTwo mt-0">
											<table class="table table-light table-striped">
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
						</div>
					</div>
					
					
				</div>
			</div>
			
		</div>
		<div class="modal fade" id="ModalEditPrestador" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div  class="modal-content ">
		      <div class="modal-header" v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h5 class="modal-title font-weight-bold text-white" id="exampleModalCenterTitle">Editar Prestador</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body letters">
				<form v-on:submit.prevent="actualizarPrestador" class="p-3">
					<div class="form-group">
						<label for="name">Nombre del prestador</label>
						<input v-model="nombrePrestadorEdit" type="text" class="form-control inputsLender w-100" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="name">Documento de identificación</label>
						<input v-model="documentoPrestadorEdit" type="numbre" class="form-control inputsLender w-100" placeholder="Identificación" v-on:change="changeRutEdit()" v-on:click="changeToEdit()">
					</div>
					<div class="form-group">
						<label for="name">Comisión del mes</label>
						<currency-input
							v-model="comisionEdit"
							locale="de"
							placeholder="Comision"
							class="form-control inputsLender w-100"
						/>
					</div>
					<div class="form-group row">
						<label for="name" class="col-12">Horario de descanso</label>
						<select class="form-control col-5 ml-3 inputsLender" v-model="restTimeEdit" >
							<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
							<option style="color:black;" value="12:00">12:00</option>
							<option style="color:black;" value="12:30">12:30</option>
							<option style="color:black;" value="13:00">13:00</option>
							<option style="color:black;" value="13:30">13:30</option>
							<option style="color:black;" value="14:00">14:00</option>
							<option style="color:black;" value="14:30">14:30</option>
							<option style="color:black;" value="15:00">15:00</option>
							<option style="color:black;" value="15:30">15:30</option>
							<option style="color:black;" value="16:00">16:00</option>
						</select>
						<select class="form-control col-6 ml-1 inputsLender" v-model="restTimeEndEdit" >
							<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
							<option style="color:black;" value="12:30">12:30</option>
							<option style="color:black;" value="13:00">13:00</option>
							<option style="color:black;" value="13:30">13:30</option>
							<option style="color:black;" value="14:00">14:00</option>
							<option style="color:black;" value="14:30">14:30</option>
							<option style="color:black;" value="15:00">15:00</option>
							<option style="color:black;" value="15:30">15:30</option>
							<option style="color:black;" value="16:00">16:00</option>
							<option style="color:black;" value="16:30">16:30</option>
						</select>
					</div>
					<div class="form-group">
						<label>Día libre</label>
						<select class="form-control inputsLender w-100" v-model="restDayEdit" >
							<option style="color:black;" selected value="Seleccione el dia">Seleccione el día</option>
							<option style="color:black;" value="1">Lunes</option>
							<option style="color:black;" value="2">Martes</option>
							<option style="color:black;" value="3">Miércoles</option>
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
		    <div class="modal-content " v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header" v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar prestador</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <form v-on:submit.prevent="registroPrestador" class="p-3">
					<div class="form-group">
						<label for="name">Nombre del prestador</label>
						<input v-model="nombrePrestador" type="text" class="form-control inputsLender w-100" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="name">Documento de identificación</label>
						<input v-model="documento" type="text" class="form-control inputsLender w-100" placeholder="Identificación" v-on:change="changeRut()" v-on:click="changeTo()">
					</div>
					<div class="form-group row">
						<label for="name" class="col-12">Horario de descanso</label>
						<select class="form-control col-5 ml-3 inputsLender" v-model="restTime" >
							<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
							<option style="color:black;" value="12:00">12:00</option>
							<option style="color:black;" value="12:30">12:30</option>
							<option style="color:black;" value="13:00">13:00</option>
							<option style="color:black;" value="13:30">13:30</option>
							<option style="color:black;" value="14:00">14:00</option>
							<option style="color:black;" value="14:30">14:30</option>
							<option style="color:black;" value="15:00">15:00</option>
							<option style="color:black;" value="15:30">15:30</option>
							<option style="color:black;" value="16:00">16:00</option>
						</select>
						<select class="form-control col-6 ml-2 inputsLender" v-model="restTimeEnd" >
							<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
							<option style="color:black;" value="12:30">12:30</option>
							<option style="color:black;" value="13:00">13:00</option>
							<option style="color:black;" value="13:30">13:30</option>
							<option style="color:black;" value="14:00">14:00</option>
							<option style="color:black;" value="14:30">14:30</option>
							<option style="color:black;" value="15:00">15:00</option>
							<option style="color:black;" value="15:30">15:30</option>
							<option style="color:black;" value="16:00">16:00</option>
							<option style="color:black;" value="16:30">16:30</option>
						</select>
					</div>
					<div class="form-group">
						<label>Día libre</label>
						<select class="form-control inputsLender w-100" v-model="restDay" >
							<option style="color:black;" selected value="Seleccione el dia">Seleccione el día</option>
							<option style="color:black;" value="1">Lunes</option>
							<option style="color:black;" value="2">Martes</option>
							<option style="color:black;" value="3">Miércoles</option>
							<option style="color:black;" value="4">Jueves</option>
							<option style="color:black;" value="5">Viernes</option>
							<option style="color:black;" value="6">Sábado</option>
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
import EventBus from './EventBus'

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
			columns:['nombre' , 'documento' , 'comision' , 'advancement', 'rest', 'edit', 'delete', 'report'],
			optionsT: {
				filterByColumn: true,
				perPage: 10,
				perPageValues:[10,15,20,25,50],
				texts: {
					filter: "Filtrar:",
					filterBy: 'Filtrar por {column}',
					count:' '
				},
				headings: {
					nombre: 'Nombre',
					documento: 'Identidad',
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
				filterable: ['nombre', 'documento'],
				texts: {
                count: "Mostrando {from} - {to} de {count} Registros |{count} Registros|Un solo registro",
                filter: "Filtro:",
                limit: "Registros:",
                page: "Pagina:",
                noResults: "No se encuentran resultados",
                filterBy: "Filtrar por {column}",
                loading: 'Cargando...',
            }
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
			comisionEdit: 0,
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
			idPrestadorEdit: '',
			toggleFilter: false
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
					this.emitMethod()
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
		emitMethod() {
			EventBus.$emit('reload-services', 'updated')
		},
		sacarReporte(id) {
            localStorage.setItem('reportePrestador', id)
            router.push({name:'reporteprestador'})
        },
		registroPrestador(){
			const nombre = this.nombrePrestador.replace(/\s*$/,"");
			const documento = this.documento.replace(/\s*$/,"");
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
		
			else {
				axios.post('manicuristas', {
				nombreManicurista: nombre,
				documentoManicurista:documento,
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
					$('#ModalCreateEmploye').modal('hide')
					this.emitMethod()
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
			const nombre = this.nombrePrestadorEdit.replace(/\s*$/,"");
			const documento = this.documentoPrestadorEdit.replace(/\s*$/,"");
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
			
			else{
				axios.put('manicuristas/' + this.idPrestadorEdit, {
					nombre: nombre,
					documento: documento,
					porcentaje: this.porcentajePrestadorEdit,
					restTime: restTime,
					restDay: this.restDayEdit,
					comision: this.comisionEdit
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
						this.emitMethod()
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
		pasarDatosEdit(nombre, documento, porcentaje, restTime, restDay, id, comision){
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
			this.comisionEdit = comision
			
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
			let around = value.length - 2
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
		scrollBot() {
				$(".arrowUp").toggle()
				$(".arrowBot").toggle()
				setTimeout( function() {
					$(document).scrollTop(9999,'slow');
				},500) 
				
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
		},
		toggleFilters(){
				$(".VueTables__filters-row").toggle('slow')
				if (this.toggleFilter == false) {
					this.toggleFilter = true
				}
				else{
					this.toggleFilter = false
				}
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
		color:#001514 !important;
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
		background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
		color: #001514 !important;
	}
	.second{
		background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
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
	.inputsLender{
		background-color: transparent !important;
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
	.add{
		background-color: #353535;
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
	.btn-colorsTrashLender{
		background-color: #FC7753;
		color:#fff;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.btn-colorsEditLender{
		background-color:#7ec365;
		color:#fff;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.btn-colorsPrintLender{
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

	.botonCrearPrestador{
		z-index:100;
		position: absolute;
		top: 130%;
		right: 1%;
		padding: 5px;
		width: 21.9%;
		background-color: #353535;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1.3em;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		-webkit-transition: all 0.5s ease-out;
		outline: none !important;
	}
	.botonOcultarInfoPrestadores{
		z-index:100;
		position: absolute;
		top: 140%;
		right: 50.6%;
		padding: 5px;
		
		background-color: rgba(238, 238, 238, 0.623);
		color: #353535;
		border: none;
		border-radius: 5px 5px 0 0;
		font-size: 2em;
		
		-webkit-transition: all 0.5s ease-out;
		outline: none !important;
	}
	.VueTables__limit-field label{
		display:inline-block;
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


.tablePresta th{
	border:none !important;
	}
	.table-bordered tbody{
		background-color: white;
	}
	.tablePresta{
		height: 82.5vh;
		font-size: 1em;
		-webkit-transition: all 0.5s ease-out;
	
	}
	.table-bordered {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		border-radius: 10px !important; 
	}
	.tablePresta thead {
			background-color: rgba(238, 238, 238, 0.623);
			color: #353535;
			text-align: center
	}
	.tablePresta thead th {
			border-left: 1px black !important;
	}

.page-link{
	color: black !important;
	background-color: rgba(238, 238, 238, 0.623) !important;
}
.modal{
	background-color: rgba(107, 178, 229, 0.2)
}
.filterTablesPerso{
		background-color: #353535;
		cursor: pointer;
		-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		top: -7%;
		left: 1.5%;
		color: azure;
		position: absolute;
		padding: 15px;
		border-radius:5px 5px 0 0;
		-webkit-transition: all 0.5s ease-out; 
	}
	.filterTablesPerso:hover{
		color: #353535;
		background-color: #fff;
	}
	.VueTables__filters-row{
		display: none;
		-webkit-transition: all 0.5s ease-out; 
	}
	.arrowFilter{
		-webkit-transition: all 0.5s ease-out;
	}
    .table th, .table td {
    padding: 0.4rem;
    padding-bottom: -1px;
    vertical-align: inherit !important;
    border-top: 1px solid #dee2e6;
	}
	.tabPerso a{
		background-color: rgba(238, 238, 238, 0.623);
		color: #353535 !important;
		font-weight: bold;
	}
	.tabPerso .navButtonPerso{
		float: right !important;
	}
	.navButtonPerso a{
		cursor: pointer;
		background-color: #353535;
		color: white !important;
	}
	
</style>
