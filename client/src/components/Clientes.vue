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
					<table  class="table table-dark" style="color:#fff !important" >
						<thead>
							<tr>
								<th>
									Nombre
								</th>
								<th>
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
							</tr>
						</thead>
					</table>
					<div class="ListaPrestador tbl-content">
						<table class="table table-light table-borderless table-striped">
							<tbody>
                                <tr v-for="client in clients" v-bind:key="client._id">
									<td class="font-weight-bold">
										{{client.nombre}}
									</td>
									<td class="font-weight-bold">
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
							<!--    <td class="font-weight-bold text-center">
										<button style="width:30%;" v-on:click="deletePrestador(manicurista._id)" class=" btn btn-colorsTrash"><font-awesome-icon icon="trash" /></button>
										<button style="width:30%;" v-on:click="pasarDatosEdit(manicurista.nombre, manicurista.documento, manicurista.porcentaje, manicurista._id)" class=" btn btn-colorsEdit"><font-awesome-icon icon="edit" /></button>
										<button style="width:30%;" v-on:click="sacarReporte(manicurista._id)" class=" btn btn-colorsPrint"><font-awesome-icon icon="copy" /></button>
									</td> -->
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
								<tr v-for="client in clients" v-bind:key="client._id">
									<td class="font-weight-bold">
										{{client.nombre}}
									</td>
									<td class="font-weight-bold text-right">
										{{client.participacion}}
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
		    <div class="modal-content" v-bind:style="{ 'background-color': '#29323c'}">
		      <div class="modal-header">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
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
                            class="auto">
                        </autocomplete>
                    </div>
					<button class="btn w-100 add">Agregar cliente</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
        <div class="box">
			<button class="createService btn-white btn-animation-1" v-on:click="openModalCreateClient">
				<font-awesome-icon style="font-size: 1.6em;" icon="user-plus" />
			</button>
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
            top: '',
            nombreCliente: '',
            identidadCliente: '',
            fechaCliente:'',
            arregloClients: [],
			recomendador:'',
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
		this.arrayUsers();
		this.ServicesQuantityChartFunc();
    },
    methods: {
        getClients(){
            axios.get('clients')
            .then(res => {
                this.clients = res.data
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
                    this.getClients();
					this.arrayUsers();
					this.ServicesQuantityChartFunc();
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
	.ListaPrestadorTwo::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.first{
		background: #505970;  /* fallback for old browsers */
	}
	.second{
		background: #6A7693;  /* fallback for old browsers */
	}
	.small{
		background-color: #fff;
		margin-top: 20px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
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