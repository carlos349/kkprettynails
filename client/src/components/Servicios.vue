<template>
	<div class="container-fluid">
		
		<div class="row">
			<div class="col-md-12 row sectionMetrics">
				<div class="col-md-3 metricsServices first">
					<p>Total Servicios</p>
					<h1>{{TotalServicios}}</h1>
				</div>
				<div class="col-md-3 metricsServices first">
					<p>Servicios mensuales</p>
					<h1>{{TotalCantidadServicios}}</h1>
				</div>
				<div class="col-md-3 metricsServices first">
					<p>Prestadores</p>
					<h1>{{TotalPrestadores}}</h1>
				</div>
			</div>
			<div class="col-md-12 ">
				<div class="">
					<ul class="nav nav-tabs tabServis w-100" id="myTab" role="tablist">
						<li class="nav-item">
							<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><font-awesome-icon class="mr-2" icon="table" />Tabla de datos</a>
						</li>
						
						<li class="nav-item">
							<a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"><font-awesome-icon class="mr-2" icon="chart-line" />Métricas</a>
						</li>
						<li class="navButtonServis" v-on:click="openModalCreateServices">
							<a class="nav-link" ><font-awesome-icon class="mr-2" icon="plus" />Registro</a>
						</li>
						<li class="navButtonServis" v-on:click="toggleFilters()">
							<a class="nav-link" >
								<font-awesome-icon style="color:rgba(238, 238, 238, 0.623) !important" v-if="toggleFilter == false" class="mr-2" icon="filter" />
								<font-awesome-icon v-else class="mr-2" icon="filter" />Filtrar</a>
						</li>	
							
						
					</ul>
					<div class="tab-content" id="myTabContent">
						<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
							<v-client-table class="text-center pt-2 tableServis"  :data="servicios" :columns="columns" :options="optionsT">
								<p slot="prestadoress"  slot-scope="props">{{props.row.prestadores.length}}</p>
								<p slot="precio"  slot-scope="props">{{formatPrice(props.row.precio)}}</p>
								<p slot="comision"  slot-scope="props">{{props.row.comision}}%</p>
								<p slot="tiempoo"  slot-scope="props">{{props.row.tiempo}} min</p>
								<div slot="activee"  slot-scope="props">
									<button style="background-color:#E6E6EA;color:#618B25" v-on:click="desactivarServicio(props.row._id)" v-if="props.row.active" class="font-weight-bold btn btn-success w-100 p-0 m-0">Activo</button>
									<button v-on:click="desactivarServicio(props.row._id)" v-if="!props.row.active" class="font-weight-bold btn btn-inactive w-100 p-0 m-0">Inactivo</button>
								</div>
								<button style="background-color:#353535;color:white" slot="edit"  slot-scope="props"  v-on:click="pasarDatosEdit(props.row.nombre, props.row.tiempo, props.row.precio, props.row.prestadores, props.row._id, props.row.comision)" class="btn add w-100 p-0 m-0"><font-awesome-icon icon="edit" /></button>
								<!-- <a slot="edit" slot-scope="props" class="fa fa-edit" :href="pasarDatosEdit(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row._id)">Hola </a> -->
							</v-client-table>
						</div>
						<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
							
						</div>
						<div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
						<div style="margin-top:0.5%" class="col-sm-12 row" >
						
							<div class="col-md-4" style="margin-top:20px;">
							<div class="box">
								
							</div>
							<div class="shadow">
								<table  class="table" style="color:#353535 !important; background-color: rgba(238, 238, 238, 0.623)" >
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
								<line-chart v-bind:style="{ 'color': 'red !important'}" v-if="loaded" :chartdata="chartdata" :options="options" :styles="myStyles"/>
							</div>
						</div>
									
									
								</div>
						</div>
					</div>
					
					
					
				</div>
			</div>
				
					
			
		</div>
		<div class="modal fade" id="myModal2" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content " v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header"  v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h4 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Actualizar servicio</h4>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body ">
		        <form v-on:submit.prevent="actualizacionServicios" class="p-3">
					<div class="form-group row">
						<label for="nombre">Nombre del servicio</label>
						<input type="text" v-model="nombreServicio" class="inputServi w-100" name="nombreServicio" placeholder="Nombre del servicio" >
					</div>
					<div class="form-group row">
						<label for="nombre">Tiempo</label>
						<select class="inputServi w-100" v-model="tiempoServicio">
							<option style="color:black;" value="Seleccione el tiempo" selected>Seleccione el tiempo</option>
							<option style="color:black;" value="15">15 Minutos</option>
							<option style="color:black;" value="30">30 Minutos</option>
							<option style="color:black;" value="45">45 Minutos</option>
							<option style="color:black;" value="60">60 Minutos (1 Hr)</option>
							<option style="color:black;" value="90">90 Minutos (1:30 Hr)</option>
							<option style="color:black;" value="120">120 Minutos (2 Hr)</option>
							<option style="color:black;" value="150">150 Minutos (2:30 Hr)</option>
							<option style="color:black;" value="180">180 Minutos (3 Hr)</option>
							<option style="color:black;" value="210">210 Minutos (3:30 Hr)</option>
							<option style="color:black;" value="240">240 Minutos (4 Hr)</option>
						</select>
					</div>
					<div class="form-group row">
						<label for="nombre">Precio del servicio</label>
						<input type="text" v-model="precioServicio" class="inputServi w-100" name="nombreServicio" placeholder="Precio del servicio" >
					</div>
					<div class="form-group row">
							<label for="name">Comisión</label>
							<input v-model="comisionServicio" type="text" class="inputServi w-100" placeholder="Comisión">
						</div>
					<div class="form-group row mt-4">
						<input type="text" v-model="searchingTwo" id="myInputServEdit" v-on:keyup="myFunctionServEdit()" class="inputServi w-100 buscar" placeholder="Buscar prestadores"/>
						<table class="table mt-2 table-light table-borderless table-striped">
							<tbody>
								<tr >
										<td class="font-weight-bold">
											Marcar todos
										</td>
										<td class="font-weight-bold text-right">
											<label class="conCheck mb-3 col-sm-2">
											<input  class="desMarc" v-on:click="presSelectAll()" type="checkbox">
											<span class="checkmark"></span>
											</label>
										</td>
									</tr>
							</tbody>
						</table>
						<div class="ListaProcesar maxHeightEdit w-100">
							<table class="table table-light table-borderless table-striped" id="myTableServEdit">
								<tbody>
									
									<tr v-for="(manicurista, index) of manicuristas" >
										<td class="font-weight-bold">
											{{manicurista.nombre}}
										</td>
										<td class="font-weight-bold text-right">
											<label class="conCheck mb-3 col-sm-2">
											<input :id="manicurista._id" class="desMarc" v-on:click="presSelectTwo(manicurista._id,index)" type="checkbox">
											<span class="checkmark"></span>
											</label>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<button class="btn mx-auto add btn-block w-75" type="submit">Actualizar servicio</button>
		        </form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="ModalCreateService" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content" v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header" v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h3 class="modal-title font-weight-bold text-white" id="exampleModalCenterTitle">Registro de servicio</h3>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
		          <span aria-hidden="true" class="text-white" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body ">
		        <form v-on:submit.prevent="registroServicio" class="p-3">
						<div class="form-group row">
							<label for="name">Nombre del servicio</label>
							<input v-model="nombreServi" type="text" class="inputServi w-100" placeholder="Nombre servicio">
						</div>
						<div class="form-group row">
							<label for="nombre">Tiempo</label>
							<select class="inputServi w-100" v-model="tiempoServi">
								<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
								<option style="color:black;" value="15">15 Minutos</option>
								<option style="color:black;" value="30">30 Minutos</option>
								<option style="color:black;" value="45">45 Minutos</option>
								<option style="color:black;" value="60">60 Minutos (1 Hr)</option>
								<option style="color:black;" value="90">90 Minutos (1:30 Hr)</option>
								<option style="color:black;" value="120">120 Minutos (2 Hr)</option>
								<option style="color:black;" value="150">150 Minutos (2:30 Hr)</option>
								<option style="color:black;" value="180">180 Minutos (3 Hr)</option>
								<option style="color:black;" value="210">210 Minutos (3:30 Hr)</option>
								<option style="color:black;" value="240">240 Minutos (4 Hr)</option>
							</select>
						</div>
						<div class="form-group row">
							<label for="name">Precio</label>
							<input v-model="precioServi" type="text" class="inputServi w-100" placeholder="Precio">
						</div>
						<div class="form-group row">
							<label for="name">Comisión</label>
							<input v-model="comisionServicioEdit" type="text" class="inputServi w-100" placeholder="Comisión">
						</div>
						<div class="form-group row" style="margin-top:-15px;">
							<div class="w-100">
							<input type="text" v-model="searching" id="myInputServ" v-on:keyup="myFunctionServ()" class="inputServi buscar mt-4 mb-1 w-100" placeholder="Buscar prestadores"/>
							<font-awesome-icon class="lupa-modalServices" icon="search"/></div>
							<div class="ListaProcesar maxHeight">
								<table class="table mt-2 table-light table-borderless table-striped">
							<tbody>
								<tr >
										<td class="font-weight-bold">
											Marcar todos
										</td>
										<td class="font-weight-bold text-right">
											<label class="conCheck mb-3 col-sm-2">
											<input  class="checkFirst" v-on:click="presSelectAllReg()" type="checkbox">
											<span class="checkmark"></span>
											</label>
										</td>
									</tr>
							</tbody>
						</table>
								<table class="table table-light table-borderless table-striped" id="myTableServ">
									<tbody>
										<tr  v-for="(manicurista, index) of manicuristas" >
											<td>
												{{manicurista.nombre}}
											</td>
											<td class="text-right">
												<label class="conCheck mb-3 col-sm-2">
												<input :class="manicurista._id" class="checkFirst" v-on:click="presSelect(manicurista.documento,manicurista._id)" type="checkbox">
												<span class="checkmark"></span>
												</label>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<button class="btn w-100 add">Agregar</button>
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
				columns:['nombre' , 'precio' , 'comision', 'tiempoo' , 'prestadoress' , 'activee' , 'edit'],
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
						nombre: 'Nombre ',
						precio: 'Costo ',
						comision: 'Comisión',
						tiempoo: 'Tiempo ',
						prestadoress: 'Prestadores ',
						activee: 'Activación ',
						edit: 'Editar '
					},
					pagination: { chunk:10 },
					pagination: { dropdown:true },
					pagination: { nav: 'fixed' },
					pagination: { edge: true },
					sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
					sortable: ['nombre', 'precio' , 'tiempoo'],
					filterable: ['nombre', 'precio'],
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
				servicio: new Servicio(),
 			 	servicios: [],
				searching:'',
				searchingTwo: '',
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
				tiempoServi:'Seleccione el tiempo',
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
				TotalPrestadores: '0',
				comisionServicio: '',
				comisionServicioEdit: '',
				toggleFilter:false
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
					// console.log(this.servicios)
				})
				
				this.nombreServicio = ' '
				this.precioServicio = ' '
			},
			desactivarServicio(id){
				axios.put('servicios/changeActive/' + id)
				.then(res => {
					this.getServicios();
					this.emitMethod()
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
			openModalCreateServices(){
				$('#ModalCreateService').modal('show')
			},
			registroServicio(){
				if (this.nombreServi == '' || this.precioServi == '' || this.tiempoServi == '') {
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
							comisionServicio: this.comisionServicioEdit,
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
								this.searching = ''
								this.comisionServicioEdit = ''
								this.tiempoServi = 'Seleccione el tiempo'
								this.prestadoresSeleccionados = []
								$('.checkFirst').prop('checked', false)
								this.emitMethod()
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
			emitMethod() {
				EventBus.$emit('reload-services', 'updated')
			},
			presSelect(prestador, id){
				console.log(prestador)
				console.log($("."+id).prop("checked"))

				if ($(".checkFirst").is(":checked") == false ) {
					this.prestadoresSeleccionados = []
				}
				if ($("."+id).prop("checked")!=true ) {
					for (let i = 0; i < this.prestadoresSeleccionados.length; i++) {
						if (this.prestadoresSeleccionados[i] == id ) {
							this.prestadoresSeleccionados.splice(i, 1)
							break
						}
					}
					console.log('entry here')
				}
				else{
					let select = prestador
					this.prestadoresSeleccionados.push(id)
				}
				console.log(this.prestadoresSeleccionados)
			},
			presSelectTwo(prestador,index){
				if ($("#"+prestador).prop("checked")!=true ) {
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
			maxCount(){
				setTimeout(() => {
					if (this.tiempoServi > 3) {
						this.tiempoServi = 3
					}
				}, 500)	
			},
			maxCountEdit(){
				setTimeout(() => {
					if (this.tiempoServicio > 3) {
						this.tiempoServicio = 3
					}
				}, 500)	
			},
			actualizacionServicios(){
				if (this.nombreServicio == '' || this.tiempoServicio == '' || this.precioServicio == '') {
					this.$swal({
						type: 'error',
						title: 'Llene todos los campos',
						showConfirmButton: false,
						timer: 1500
					})
				}else{
					const id = this.idServicioEditar
					axios.put('servicios/' + id, {
						nombreServicio: this.nombreServicio,
						tiempoServicio: this.tiempoServicio,
						precioServicio: this.precioServicio,
						comisionServicio: this.comisionServicio,
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
							this.searchingTwo = ''
							$('#myModal2').modal('hide')
							this.emitMethod()
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
				}
			},
			pasarDatosEdit(nombre,tiempo, precio, prestadores, id, comision){
				this.optionsT.filterByColumn = true
				
				this.prestadoresSeleccionadosTwos = []
				$(".desMarc").prop("checked", false)
				this.nombreServicio = nombre
				this.tiempoServicio = tiempo
				this.precioServicio = precio
				this.comisionServicio = comision
				this.prestadoresEdit = prestadores
				this.idServicioEditar = id
				for (let i = 0; i < this.prestadoresEdit.length; i++) {
					if ($("#"+this.prestadoresEdit[i])) {
						$("#"+this.prestadoresEdit[i]).prop("checked", "true")
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
						this.servicesQuantityPerMonths.push(res.data[index].registro)
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
			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			},
			myFunctionServEdit() {
			  var input, filter, table, tr, td, i, txtValue;
			  input = document.getElementById("myInputServEdit");
			  filter = input.value.toUpperCase();
			  table = document.getElementById("myTableServEdit");
			  tr = table.getElementsByTagName("tr");
			  for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[0];
			    if (td) {
			      txtValue = td.textContent || td.innerText;
			      if (txtValue.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }
			  }
			},
			scrollBot() {
				$(".arrowUp").toggle()
				$(".arrowBot").toggle()
				setTimeout( function() {
					$(document).scrollTop(9999,'slow');
				},500) 
				
			},
			myFunctionServ() {
			  var input, filter, table, tr, td, i, txtValue;
			  input = document.getElementById("myInputServ");
			  filter = input.value.toUpperCase();
			  table = document.getElementById("myTableServ");
			  tr = table.getElementsByTagName("tr");
			  for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[0];
			    if (td) {
			      txtValue = td.textContent || td.innerText;
			      if (txtValue.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }
			  }
			},
			toggleFilters(){
				$(".VueTables__filters-row").toggle('slow')
				if (this.toggleFilter == false) {
					this.toggleFilter = true
				}
				else{
					this.toggleFilter = false
				}
			},
			presSelectAll(){
				if ($(".desMarc").prop("checked") == true) {
					console.log("maldita sea")
					$(".desMarc").prop("checked",true);
				}
				else{
					$(".desMarc").prop("checked",false);
				}	
			},
			presSelectAllReg(){
				if ($(".checkFirst").prop("checked") == false) {
					
					$(".checkFirst").prop("checked",true);
				}
				else{
					console.log("maldita sea")
					$(".checkFirst").prop("checked",false);
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
<style>
	.metricsServices{
		height: auto;
		background-color: #fff;
		margin:20px;
		color:#fff;
		padding: 10px;
		padding-right: 15px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
	}
	.shadoww table{
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
	}
	.metricsServices p{
		font-size: 1em;
		margin-top: 10px;
	}
	.maxHeight{
		max-height: 150px;
	}
	.maxHeightEdit tbody{
		max-height: 150px;
	}
	#myTableServEdit tbody::-webkit-scrollbar-thumb{
		background: black !important;
    border-radius: 4px !important;
	}
	#myTableServEdit tbody::-webkit-scrollbar {
    width: 80px !important;     /* Tamaño del scroll en vertical */
    height: 80px !important;    /* Tamaño del scroll en horizontal */
   
}
	#myTableServEdit{
			overflow-y: scroll !important;
	}
	.metricsServices h1{
		float: right;
		margin-top: -55px;
	}
	.sectionMetrics{
		margin-left: 8%;
	}
	
	.forms{
		background-color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		padding-bottom:5px;
		overflow-x: scroll;
		overflow-y:scroll;
		max-height: 500px;
		height:auto;
		color:#fff;
		border-radius:5px;
		border-radius:5px;
	}
	
	.Lista{
		overflow-x: scroll;
		overflow-y:scroll;
		max-height: 440px;
		height:auto;
		border-radius:5px;
	}
	
	.ListaTwo{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 90vh;
		height:auto;
		border-radius:5px;
	}
	.btn-colorsEdit{
		background-color:#495057;
		color:#fff;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    -moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    -webkit-transition: all 0.5s ease-out;
	}
	.btn-inactive{
		border: 3px solid #FE4A49;
		background-color: #E6E6EA;
		color:#FE4A49;
		
	}
	.btn-active{
		background-color: #18FF6D;
		color:#495057;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    -moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    -webkit-transition: all 0.5s ease-out;
	}
	
	
	
	.selectMani{
		background-color:#355461 !important;
		color:#fff !important;
		border:none !important;
		border-bottom:2px solid #102229 !important;
	}
	.btn-success {
		border: 3px solid #7ec365;
		
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
	.conCheck {
		display: inline-block;
		margin-left: 5%;
		position: relative;
		padding-left: 35px;
		margin-bottom: 20px;
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
		background-color: #353535 ;
	}

	/* On mouse-over, add a grey background color */
	.conCheck:hover input ~ .checkmark {
		background-color: rgb(107, 178, 229);
	}

	/* When the checkbox is checked, add a blue background */
	.conCheck input:checked ~ .checkmark {
		background-color: rgb(107, 178, 229);
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
		background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
		color:#353535;
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
	canvas{
		color:red;
	}
	.box{
    	width: 100%;	
  	}
	

	.botonCrearServicio{
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
	.botonOcultarInfoServis{
		z-index:100;
		position: absolute;
		top: 140%;
		right: 50.6%;
		padding: 5px;
		
		background-color: rgba(238, 238, 238, 0.623);
		color: #353535;
		border: none;
		border-radius: 5px 5px 0 0;
		font-size: 2.2em;
		
		-webkit-transition: all 0.5s ease-out;
		outline: none !important;
	}
	.btn-white:focus{
		outline: none !important;
	}
	.btn-white:hover{
		
		
	}
	.lupa-modalServices{
		position:absolute;
		right:8%;
		top:63%;
		font-size:1.4em
	}
	

	.vue-title {
		text-align: center;
		margin-bottom: 10px;
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
	height: 10px;
	line-height: 16px;
	display: block;
	margin: auto;
	text-align: center;
	}

	[v-cloak] {
	display:none;
	}
	.tableServis th{
	border:none !important;
	}
	.table-bordered tbody{
		background-color: white;
	}
	.tableServis {
		height: 82.5vh;
		font-size: 1em;
		-webkit-transition: all 0.5s ease-out;
	}
	.table th, .table td {
    padding: 0.4rem;
    padding-bottom: -1px;
    vertical-align: inherit !important;
    border-top: 1px solid #dee2e6;
	}

	.table-bordered {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		border-radius: 10px !important; 
	}
	.tableServis thead {
			background-color: rgba(238, 238, 238, 0.623);
			color: #353535;
			text-align: center
	}
	.tableServis thead th {
			border-left: 1px black !important;
	}

	
	
	
	.VueTables--client .row .col-md-12{
		padding: -10px;
	}
	.VuePagination {
		text-align: center;
		display:block !important;
	}
	.inputServi{
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
	.filterTablesServis{
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
	.filterTablesServis:hover{
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
	.page-link{
	color: black !important;
	background-color: rgba(238, 238, 238, 0.623) !important;
	}
	.tabServis a{
		background-color: rgba(238, 238, 238, 0.623);
		color: #353535 !important;
		font-weight: bold;
	}
	.tabServis .navButtonServis{
		float: right !important;
	}
	.navButtonServis a{
		cursor: pointer;
		background-color: #353535;
		color: white !important;
	}
</style>