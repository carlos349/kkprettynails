<template>
	<div class="container-fluid">
		<div class="col-12 row pt-5">
			<div class="col-md-4">
				<div class="forms">
					<h2>Registrar producto</h2>
					<form v-on:submit.prevent="registroProducto">
						<div class="form-group">
							<label for="name">Nombre del producto</label>
							<input v-model="product" type="text" class="form-control inputs" placeholder="Nombre servicio">
						</div>
						<div class="form-group">
							<label for="name">Marca</label>
							<input v-model="brand" type="numbre" class="form-control inputs" placeholder="0 min">
						</div>
						<div class="form-group">
							<label for="name">Gramos</label>
							<input v-model="grams" type="text" class="form-control inputs" placeholder="Precio">
						</div>
						<div class="form-group">
							<label for="name">Cantidad</label>
							<input v-model="quantity" type="text" class="form-control inputs" placeholder="Precio">
						</div>
						<div class="form-group">
							<label for="name">Monto</label>
							<input v-model="amount" type="text" class="form-control inputs" placeholder="Precio">
						</div>
						<label for="name">Servicios</label>
						<div class="form-group row" >
								<label v-for="(servicio, index) of servicios" class="conCheck col-md-4">{{servicio.nombre}}
								<input :id="index" class="checkFirst" v-on:click="presSelect(servicio.nombre, index)" type="checkbox">
								<span class="checkmark"></span>
								</label>
						</div>
						<button class="btn w-100 add">Agregar</button>
					</form>
				</div>
			</div>
			<div class="col-md-8">
				<div class="shadow">	
					<table  class="table table-dark" style="color:#fff !important" >
						<thead>
							<tr>
								<th>
									Producto
								</th>
								<th>
									Marca
								</th>
								<th>
									Gramos
								</th>
								<th>
									Cantidad
								</th>
								<th>
									Monto
								</th>
								<th>
									Monto total
								</th>
								<th>
									Servicios
								</th>
								<th>
									Fecha
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
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	import router from '../router'
export default {
	data(){
		return {
			product: '',
			brand: '',
			grams: '',
			quantity: '',
			amount: '',
			servicios: [],
			prestadoresSeleccionados: []
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
			console.log(this.prestadoresSeleccionados)
		}
	}
}
</script>
<style>
	.forms{
		background-color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 90vh;
		height:auto;
		border-radius:5px;
		border-radius:5px;
	}
	.forms::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
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
	.inputs{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #102229 !important;
		background-color:transparent !important;
		color:#102229 !important;
		font-weight:400;
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
</style>