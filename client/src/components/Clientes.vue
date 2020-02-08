<template>
    <div class="container-fluid">
        <div class="row pb-2">
            <div class="col-md-12 row sectionMetricsPrestador">
				<div class="col-md-3 metrics first">
					<p>Total clientes</p>
					<h3>{{clients.length}}</h3>
				</div>
				<div class="col-md-3 metrics first">
					<p>Mejor cliente</p>
					<h3>{{top}}</h3>
				</div>
				<div class="col-md-3 metrics first">
					<p>Recomendaciones</p>
					<h3>Nombre Apellido</h3>
				</div>
			</div>
            <div class="col-md-12">
				<div class="">	
					<v-client-table class="text-center tablaClients"  :data="clients" :columns="columns" :options="optionsT">
						<button slot="edit"  slot-scope="props" v-on:click="pasarDatosEdit(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row._id)" class=" btn btn-colorsEditClient w-100"><font-awesome-icon icon="edit" /></button>
					</v-client-table>
					
				</div>
			</div>
			<div class="col-md-4" style="margin-top:20px;">
				<div class="row">
					<div class="box col-6">
						<button class="btn-white" v-on:click="openModalCreateClient">
							Registrar cliente
						</button>
					</div>
					<div class="box col-6">
						<button class="btn-white Second" v-on:click="showTemplates">
							Correos a clientes 
						</button>
					</div>
					<div class="tablaClients col-12">
						<table  class="table tablaClients table-dark shadow" style="color:#fff !important;border-radius:5px; background-color: rgba(238, 238, 238, 0.623) !important" >
							<thead class="theadClients">
								<tr>
									<th>
										Cliente
									</th>
									<th class="text-right">
										Atenciones
									</th>				
								</tr>
							</thead>
						</table>
						<div class="ListaPrestadorTwo">
							<table class="table table-light table-borderless table-striped">
								<tbody>
									<tr v-for="clientTwo in clientTwos" v-bind:key="clientTwo._id">
										<td class="font-weight-bold">
											{{clientTwo.nombre}}
										</td>
										<td class="font-weight-bold text-right">
											{{clientTwo.participacion}}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-8 chart">
				<div class="small">
					<line-chart v-if="loaded" :chartdata="chartdata" :options="options" :styles="myStyles"/>
				</div>
			</div>
        </div>
        <div class="modal fade" id="ModalCreateClient" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content p-3" v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <form v-on:submit.prevent="registroCliente">
					<div class="form-group">
						<label for="name">Nombre del cliente <span style="color:red;">*</span></label>
						<input v-model="nombreCliente" type="text" class="form-control inputs" placeholder="Nombre y apellido" requerid>
					</div>
					<div class="form-group">
						<label for="identidad">Teléfono del cliente <span style="color:red;">*</span></label>
						<input v-model="identidadCliente" type="text" class="form-control inputs" placeholder="Registre numero telefónico" requerid>
					</div>
					<div class="form-group">
						<label for="identidad">Correo del cliente <span style="color:blue;">+</span></label>
						<input v-model="correoCliente" type="text" class="form-control inputs" placeholder="Registre correo" >
					</div>
					<div class="form-group">
						<label for="identidad">Instagram del cliente <span style="color:blue;">+</span></label>
						<input v-model="instagramCliente" type="text" class="form-control inputs" placeholder="Registre instagram" >
					</div>
                    <div class="form-group">
                        <label for="recomendacion">Registre recomendador</label>
						<div v-on:click="clearInput">
							<autocomplete
							ref="autocomplete"
							placeholder="Buscar cliente"
							:source="arregloClients"
							input-class="form-control esteqlq"
							results-property="data"
							:results-display="formattedDisplay"
							@selected="addDistributionGroup">
							</autocomplete>
							<span v-on:click="clearInput" style="position:absolute;top:410px;left:50px;background-color:#FBF5F3;">{{recomendador}}</span>
						</div>
						
                    </div>
					<button class="btn w-100 add">Agregar cliente</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="ModalEditClient" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content p-3" v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Editar cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <form v-on:submit.prevent="EditarCliente">
					<div class="form-group">
						<label for="name">Nombre del cliente <span style="color:red;">*</span></label>
						<input v-model="nombreClienteEditar" type="text" class="form-control inputs" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="identidad">Teléfono del cliente <span style="color:red;">*</span></label>
						<input v-model="identidadClienteEditar" type="text" class="form-control inputs" placeholder="Registre numero telefónico">
					</div>
					<div class="form-group">
						<label for="identidad">Correo del cliente <span style="color:blue;">+</span></label>
						<input v-model="correoClienteEditar" type="text" class="form-control inputs" placeholder="Registre correo">
					</div>
					<div class="form-group">
						<label for="identidad">Instagram del cliente <span style="color:blue;">+</span></label>
						<input v-model="instagramClienteEditar" type="text" class="form-control inputs" placeholder="Registre instagram">
					</div>
                    <!-- <div class="form-group">
                        <label for="recomendacion">Registre recomendador</label>
                        <autocomplete	
                            :search="searchClientOnClientEdit"
                            placeholder="Buscar cliente"
                            aria-label="Buscar cliente"
                            @submit="handleSubmitClientOnClientEdit"
                            class="auto">
                        </autocomplete>
                    </div> -->
					<button class="btn w-100 add">Editar cliente</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="modalShowTemplates" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-xl modal-dialog-centered"  >
		    <div class="modal-content p-3" v-bind:style="{ 'background-color': '#ffffff'}">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Elige una plantilla para tu correo</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <div class="row">
					<div class="col-2 p-1">
						<div class="template" v-on:click="selectTemplate(1)">
							<img src="../assets/template-1.png" style="width:100%;" alt="">
						</div>
					</div>
					<div class="col-2 p-1">
						<div class="template" v-on:click="selectTemplate(2)">
							<img src="../assets/template-2.png" style="width:100%;" alt="">
						</div>
					</div>
					<div class="col-2 p-1">
						<div class="template" v-on:click="selectTemplate(3)">
							<img src="../assets/template-3.png" style="width:100%;" alt="">
						</div>
					</div>
					<div class="col-2 p-1">
						<div class="template" v-on:click="selectTemplate(4)">
							<img src="../assets/template-4.png" style="width:100%;" alt="">
						</div>
					</div>
					<div class="col-2 p-1">
						<div class="template" v-on:click="selectTemplate(5)">
							<img src="../assets/template-5.png" style="width:100%;" alt="">
						</div>
					</div>
					<div class="col-2 p-1">
						<div class="template" v-on:click="selectTemplate(6)">
							<img src="../assets/template-6.png" style="width:100%;" alt="">
						</div>
					</div>
				</div>
		      </div>
		    </div>
		  </div>
		</div>
    </div>
</template>
<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import router from '../router'
// import Autocomplete from '@trevoreyre/autocomplete-vue'
import LineChart from '../plugins/LineChart.js'
import EventBus from './eventBus'
import Autocomplete from 'vuejs-auto-complete'

export default {
	components: {
		LineChart,
		Autocomplete
	},
    data(){
        return {
			columns:['nombre' , 'identidad' , 'recomendacion' , 'recomendaciones' , 'ultimaFecha' , 'fecha' , 'edit'],
			optionsT: {
				filterByColumn: false,
				texts: {
					filter: "Filtrar:",
					filterBy: 'Filtrar por {column}',
					count:' '
				},
				headings: {
					nombre: 'Nombre ',
					identidad: 'Ig / E-mail / Tlf',
					recomendacion: 'Recomendación ',
					recomendaciones: 'Recomendaciones ',
					ultimaFecha: 'Última atención ',
					fecha: 'Fecha ',
					edit: 'Editar datos'
				},
				pagination: { chunk:10 },
				pagination: { dropdown:true },
				pagination: { nav: 'fixed' },
				pagination: { edge: true },
				sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
				sortable: ['nombre', 'identidad' , 'recomendacion' , 'recomendaciones' , 'ultimaFecha' , 'fecha'],
				filterable: ['nombre', 'identidad' , 'recomendacion' , 'recomendaciones' , 'ultimaFecha' , 'fecha']
			},
			clients: [],
			clientTwos:[],
            top: '',
            nombreCliente: '',
			identidadCliente: '',
			nombreClienteEditar: '',
			identidadClienteEditar: '',
			clienteIdEdit: '',
            arregloClients: [],
			recomendador:'',
			recomendadorEdit:'',
			loaded: false,
			chartdata: null,
			height:360,
			options: {
				responsive: true,
				maintainAspectRatio: false
			},
			correoCliente:'',
			instagramCliente:'',
			correoClienteEditar: '',
			instagramClienteEditar: '',
			recomend: ''
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
		this.getClients();
		this.getClientsTwo();
		this.getClientsThree()
		this.ServicesQuantityChartFunc();
    },
    methods: {
        getClients(){
            axios.get('clients')
            .then(res => {
				console.log(res.data)
				this.clients = res.data
				for (let i = 0; i < this.clients.length; i++) {
					// this.clients[i].push({thatId:this.clients[i].identidad}) 
					if (this.clients[i].correoCliente) {
						this.clients[i].identidad = this.clients[i].identidad + '\n' + this.clients[i].correoCliente 
					}
					if (this.clients[i].instagramCliente) {
						this.clients[i].identidad = this.clients[i].identidad + '\n' + this.clients[i].instagramCliente
					}
					this.clients[i].fecha = this.formatDate(this.clients[i].fecha)
					this.clients[i].ultimaFecha = this.formatDate(this.clients[i].ultimaFecha)
					
				}
				console.log(this.clients)
            })
		},
		showTemplates(){
			$('#modalShowTemplates').modal('show')
		},
		clearInput(){
			this.recomendador = ''
			$('.esteqlq').focus()
		},
		getClientsTwo(){
            axios.get('clients/bestClient')
            .then(res => {
                this.clientTwos = res.data
                this.top = res.data[0].nombre
            })
		},
		getClientsThree(){
            axios.get('clients/onlyData')
            .then(res => {
                this.arregloClients = res.data
                console.log(this.arregloClients)
            })
        },
        arrayUsers(){
            setTimeout(() => {
                for (let index = 0; index < this.clients.length; index++) {
                    this.arregloClients.push(this.clients[index].nombre+'-'+this.clients[index].identidad)
                }
            }, 2000);
            
        },
        searchClientOnClient(input){
            if (input.length < 1) { return [] }
                return this.arregloClients.filter(manicurista => {
                    return manicurista.toLowerCase()
                    .startsWith(input.toLowerCase())
            })
		},
		formattedDisplay (result) {
			return result.nombre+'-'+result.identidad
		},
		addDistributionGroup (group) {
			setTimeout(() => {
				this.recomendador = group.display
			}, 100);
			// access the autocomplete component methods from the parent
			// this.$refs.autocomplete.clear()
			// $('.esteqlq').val(group.display)
			
		},
        handleSubmitClientOnClient(result){
            console.log(result)
            this.recomendador = result
		},
		// searchClientOnClientEdit(){
		// 	if (input.length < 1) { return [] }
        //         return this.arregloClients.filter(manicurista => {
        //             return manicurista.toLowerCase()
        //             .startsWith(input.toLowerCase())
        //     })
		// },
		// handleSubmitClientOnClientEdit(){
        //     this.recomendadorEdit = result
		// },
		pasarDatosEdit(nombre, identidad,correoCliente, instagramCliente, _id){
			const split = identidad.split('\n')
			this.nombreClienteEditar = nombre
			this.identidadClienteEditar = split[0]
			this.instagramClienteEditar = instagramCliente
			this.correoClienteEditar = correoCliente
			this.clienteIdEdit = _id
			$('#ModalEditClient').modal('show')
		},
		EditarCliente(){
			const name = this.nombreClienteEditar.split(' ')
			var firstName, lastName, fullName
			if (name[1]) {
				firstName = this.MaysPrimera(name[0])
				lastName = this.MaysPrimera(name[1])
				fullName = firstName+' '+lastName
			}else{
				fullName = this.MaysPrimera(name[0])
			}

			if (this.nombreClienteEditar != '' &&  this.identidadClienteEditar != '') {
				axios.put('clients/'+this.clienteIdEdit, {
					nombreClienteEditar: fullName,
					identidadClienteEditar: this.identidadClienteEditar,
					correoClienteEditar: this.correoClienteEditar,
					instagramClienteEditar: this.instagramClienteEditar
				})
				.then(res => {
					console.log(res)
					if (res.data.status == 'Servicio actualizado') {
						this.$swal({
							type: 'success',
							title: 'Cliente actualizado',
							showConfirmButton: false,
							timer: 1500
						})
						this.getClients();
						this.arrayUsers();
						this.ServicesQuantityChartFunc();
						$('#ModalEditClient').modal('hide')
						this.emitMethodTwo()
					}else{
						this.$swal({
							type: 'error',
							title: 'Cliente ya registrado',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
			}else{
				this.$swal({
					type: 'error',
					title: 'Llene los datos',
					showConfirmButton: false,
					timer: 1500
				})
			}
			
		},
		ServicesQuantityChartFunc(){
			this.loaded = false
			axios.get('/clients/getTopTenBestClients')
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
		MaysPrimera(string){
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
        registroCliente(){
			const name = this.nombreCliente.split(' ')
			var firstName, lastName, fullName
			if (name[1]) {
				firstName = this.MaysPrimera(name[0])
				lastName = this.MaysPrimera(name[1])
				fullName = firstName+' '+lastName
			}else{
				fullName = this.MaysPrimera(name[0])
			}
			
			if (this.nombreCliente != '' && this.identidadCliente != '') {
				axios.post('clients', {
					nombre:fullName,
					identidad:this.identidadCliente,
					recomendador:this.recomendador,
					correoCliente:this.correoCliente,
					instagramCliente:this.instagramCliente
				})
				.then(res => {
					if (res.data.status == 'Registrado') {
						this.$swal({
							type: 'success',
							title: 'Cliente registrado',
							showConfirmButton: false,
							timer: 1500
						})
						this.arregloClients = []
						this.getClients();
						this.arrayUsers();
						this.ServicesQuantityChartFunc();
						this.nombreCliente = ''
						this.identidadCliente = ''
						this.recomendador = ''
						this.correoCliente = ''
						this.instagramCliente = ''
						$('.autocomplete-input').val('')
						$('#ModalCreateClient').modal('hide')
						this.emitMethodTwo()
					}else{
						this.$swal({
							type: 'error',
							title: 'El cliente ya existe',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
			}else{
				this.$swal({
					type: 'error',
					title: 'Llene los campos requeridos',
					showConfirmButton: false,
					timer: 1500
				})
			}
        },
        openModalCreateClient(){
            $('#ModalCreateClient').modal('show')
        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
		},
		selectTemplate(select){
			$('#modalShowTemplates').modal('hide')
			router.push({name: 'emailBuild'})
			this.emitMethod(select)
		},
		emitMethod(select) {
			EventBus.$emit('select-template', select)
			localStorage.setItem('selectTemplate', select)
		},
		emitMethodTwo() {
			EventBus.$emit('reload-services', 'updated')
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
	.sectionMetricsPrestador{
		margin-left: 8%;
	}
	.btn-colorsEditClient{
		background-color: #7ec365;
		color:#fff;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.autoClient .autocomplete-result-list{
		background-color: #1F5673;
    	color: azure;
	}
	.VuePagination{
		display:block !important;
	}
	.autoClient input{
		border: none !important;
		border-radius: 0px !important;
		border-bottom: 2px solid #1F5673 !important;
		background-color: transparent !important;
		color: black !important;
		font-family: 'Roboto', sans-serif !important;
		letter-spacing: .09em;
	}
	
	.VueTables--client .row{
		display:none
	}
	.VueTables__limit-field label{
		display:none;
	}
	.VueTables--client .row .col-md-12{
		padding: -10px;
	}
	.template{
		padding: 5px;
		background-color: #e4e8ec;
		cursor: pointer;
		-webkit-transition: all 0.5s ease-out;
	}
	.template:hover{
		background-color: rgb(29, 29, 29);
	}
	
	.ListaPrestador::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.ListaPrestadorTwo{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 240px;
		height:auto;
		border-radius:5px;
	}
	.add{
		background-color:#1F5673;
		color: azure;
		transition: all 0.5s ease-out;
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
	
	.inputs {
		border: none !important;
		border-radius: 0px !important;
		border-bottom: 2px solid #1F5673 !important;
		background-color: transparent !important;
		color: black !important;
		font-family: 'Roboto', sans-serif !important;
		letter-spacing: .09em;
	}
	.ListaPrestadorTwo::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.first{
		background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
		color:#353535;
	}
	.second{
		background:rgb(38, 91, 119); /* fallback for old browsers */
	}
	.small{
		background-color: #fff;
		margin-top: 20px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
    .box{
    	width: 100%;	
  	}
	label{
		color:black;
	}
	.btn-white{
		padding: 5px;
		width: 100%;
		margin-bottom: 5px;
		background-color: #E6E6EA;
		color: #618B25;
		border: none;
		border:3px solid #7ec365;
		font-size: 1.3em;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		-webkit-transition: all 0.5s ease-out;
		outline: none !important;
	}
	.btn-white:hover{
		background-color: #218838;
	}
	
	.btn-white:focus{
		outline: none !important;
	}

	.VuePagination {
		text-align: center;
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
.tablaClients th{
	border:none !important;
	}
	.table-bordered tbody{
		background-color: white;
	}
	.tablaClients table{

	
	}
	.table-bordered {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		border-radius: 10px !important; 
	}
	.tablaClients thead {
			background-color: rgba(238, 238, 238, 0.623);
			color: #353535;
			text-align: center
	}
	.tablaClients thead th {
			border-left: 1px black !important;
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
</style>