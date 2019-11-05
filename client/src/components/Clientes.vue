<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 row sectionMetricsPrestador">
				<div class="col-md-5 metrics first">
					<p>Total clientes</p>
					<h1>{{clients.length}}</h1>
				</div>
				<div class="col-md-5 metrics second">
					<p>Mejor cliente</p>
					<h1>{{top}}</h1>
				</div>
			</div>
            <div class="col-md-12">
				<div class="shadow">	
					<table  class="table" style="color:#fff !important; background-color: #1F5673" >
						<thead>
							<tr>
								<th>
									Nombre
								</th>
								<th style="width:30%;">
									Instagram / Correo / Teléfono
								</th>
								<th>
									Recomendación
								</th>
                                <th class="text-center">
                                    Recomendaciones
                                </th>
                                <th>
									Última atención
								</th>
                                <th>
                                    Fecha
                                </th>
								<th class="text-center">
									Editar
								</th>
							</tr>
						</thead>
					</table>
					<div class="ListaPrestador tbl-content">
						<table class="table table-light table-borderless table-striped" >
							<tbody>
                                <tr v-for="client in clients" v-bind:key="client._id">
									<td class="font-weight-bold">
										{{client.nombre}}
									</td>
									<td class="font-weight-bold" style="width:30%;">
										{{client.identidad}}
									</td>
									<td class="font-weight-bold">
										{{client.recomendacion}}
									</td>
                                    <td class="font-weight-bold text-center">
										{{client.recomendaciones}}
									</td>
                                    <td class="font-weight-bold">
										{{formatDate(client.ultimaFecha)}}
									</td>
                                    <td class="font-weight-bold">
										{{formatDate(client.fecha)}}
									</td>
							   		<td class="font-weight-bold text-center">
										<button style="width:30%;" v-on:click="pasarDatosEdit(client.nombre, client.identidad, client._id)" class=" btn btn-colorsEdit"><font-awesome-icon icon="edit" /></button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="col-md-4" style="margin-top:20px;">
				 <div class="box">
					<button class="btn-white" v-on:click="openModalCreateClient">
						Registrar cliente
					</button>
				</div>
				<div class="shadow">
					<table  class="table table-dark" style="color:#fff !important; background-color: #1F5673" >
						<thead>
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
						<label for="name">Nombre del cliente</label>
						<input v-model="nombreCliente" type="text" class="form-control inputs" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="identidad">Instagram o Correo del cliente</label>
						<input v-model="identidadCliente" type="text" class="form-control inputs" placeholder="registre instagram o correo">
					</div>
                    <div class="form-group">
                        <label for="recomendacion">Registre recomendador</label>
                        <autocomplete	
                            :search="searchClientOnClient"
                            placeholder="Buscar cliente"
                            aria-label="Buscar cliente"
                            @submit="handleSubmitClientOnClient"
                            class="auto autoClient w-100">
                        </autocomplete>
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
						<label for="name">Nombre del cliente</label>
						<input v-model="nombreClienteEditar" type="text" class="form-control inputs" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="identidad">Instagram o Correo del cliente</label>
						<input v-model="identidadClienteEditar" type="text" class="form-control inputs" placeholder="registre instagram o correo">
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
					<button class="btn w-100 add">Agregar cliente</button>
				</form>
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
import Autocomplete from '@trevoreyre/autocomplete-vue'
import LineChart from '../plugins/LineChart.js'

export default {
	components: {
		LineChart
	},
    data(){
        return {
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
        }
    },
    beforeCreate() {
        const token = localStorage.getItem('userToken')
        const decoded = jwtDecode(token)
		if (localStorage.getItem('userToken')) {
            if (!decoded.admin) {
                this.$swal({
                    type: 'error',
                    title: 'URL restringida',
                    showConfirmButton: false,
                    timer: 1500
                })
                router.push({name: 'Citas'})
            }
		}else{
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
		this.arrayUsers();
		this.ServicesQuantityChartFunc();
    },
    methods: {
        getClients(){
            axios.get('clients')
            .then(res => {
				console.log(res.data)
                this.clients = res.data
            })
		},
		getClientsTwo(){
            axios.get('clients/bestClient')
            .then(res => {
                this.clientTwos = res.data
                this.top = res.data[0].nombre
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
		pasarDatosEdit(nombre, identidad, _id){
			this.nombreClienteEditar = nombre
			this.identidadClienteEditar = identidad
			this.clienteIdEdit = _id
			$('#ModalEditClient').modal('show')
		},
		EditarCliente(){
			axios.put('clients/'+this.clienteIdEdit, {
				nombreClienteEditar: this.nombreClienteEditar,
				identidadClienteEditar: this.identidadClienteEditar
			})
			.then(res => {
				console.log(res)
				if (res.data.status == 'Servicio actualizado') {
					this.$swal({
                        type: 'success',
                        title: 'Cliente registrado',
                        showConfirmButton: false,
                        timer: 1500
					})
					this.getClients();
					this.arrayUsers();
					this.ServicesQuantityChartFunc();
                    $('#ModalEditClient').modal('hide')
				}
			})
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
        registroCliente(){
            axios.post('clients', {
                nombre:this.nombreCliente,
                identidad:this.identidadCliente,
                recomendador:this.recomendador
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
					$('.autocomplete-input').val('')
                    $('#ModalCreateClient').modal('hide')
                }else{
                    this.$swal({
                        type: 'error',
                        title: 'El cliente ya existe',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        },
        openModalCreateClient(){
            $('#ModalCreateClient').modal('show')
        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
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
	.btn-colorsEdit{
		background-color: #28a745;
		color:#fff;
	}
	.autoClient .autocomplete-result-list{
		background-color: #1F5673;
    	color: azure;
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
	table{
		border:none !important;
		margin-bottom:0 !important;
		table-layout: fixed;
		color:#102229 !important
	}
	.ListaPrestador{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 300px;
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
		max-height: 280px;
		height:auto;
		border-radius:5px;
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
		background:#1F5673; /* fallback for old browsers */
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
		background-color: #28a745;
		color: #fff;
		border: none;
		font-size: 1.3em;
		outline: none !important;
	}
	.btn-white:focus{
		outline: none !important;
	}
    
</style>