<template>
	<div class="container-fluid mt-5">
		<div class="row">
			<div class="col-md-6">
				<form v-on:submit.prevent="verificacionCliente">
					<div class="input-group mb-3">
						  <div class="input-group-prepend">
						    <button class="btn btn-info" type="submit" id="button-addon1">Cliente</button>
						  </div>
						  <input type="text" v-model="identidadCliente" id="cliente" name="identidad" class="form-control" placeholder="Cedula del cliente" aria-label="Example text with button addon" aria-describedby="button-addon1">
					</div>
				</form>

				<div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend">
				    <span class="font-weight-bold bg-info text-white input-group-text" id="inputGroup-sizing-lg">Manicurista</span>
				  </div>
				  <input type="text" class="form-control manicuristaFocus" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
				</div>

				<table class="table">
				 <thead class="thead-light">
						<tr>
							<th class="bg-info text-white text-center">
								Nombre
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="manicurista of manicuristas" v-on:click="elegirManicurista(manicurista.nombre, manicurista.documento, manicurista.porcentaje)">
							<td class="table-info font-weight-bold text-center">
								{{manicurista.nombre}}
							</td>
						</tr>
					</tbody>
				</table>
				<table class="table">
					<thead class="thead-light">
						<tr>
							<th class="bg-info text-white">
								Servicio
							</th>
							<th class="bg-info text-white">
								Precio
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="servicio of servicios" >
							<td class="table-info font-weight-bold">
								<button v-if="!inspector" type="button" class="w-75 btn btn-primary" v-on:click="conteoServicio(servicio._id,servicio.nombre, servicio.precio)" disabled>
								  {{servicio.nombre}} <span class="badge badge-light conteoServ" v-bind:id="servicio._id">0</span>
								</button>
								<button v-else type="button" class="w-75 btn btn-primary" v-on:click="conteoServicio(servicio._id ,servicio.nombre, servicio.precio)">
								  {{servicio.nombre}} <span class="badge badge-light conteoServ" v-bind:id="servicio._id">0</span>
								</button>

							</td>
							<td class="table-info font-weight-bold">
								{{servicio.precio}}
							</td>
						</tr>
					</tbody>
				</table>
				<button v-if="!inspector" type="button" class="font-weight-bold mb-3 btn btn-info w-100" v-on:click="procesar" disabled>Procesar
				</button>
				<button v-else type="button" class="font-weight-bold mb-3 btn btn-info w-100" v-on:click="procesar">Procesar
				</button>
				<div class="input-group input-group-lg mb-2">
				  <div class="input-group-prepend">
				    <span class="input-group-text bg-light font-weight-bold text-success" id="inputGroup-sizing-lg ">$</span>
				  </div>
				  <input type="text" class="form-control" id="inputTotal" v-model="precio" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
					<div class="input-group-prepend">
						<button class="btn btn-info" v-on:click="borrarServicios()" id="button-addon2"><font-awesome-icon icon="trash"/></button>
					</div>
				</div>
			</div>
			<div class="col-md-6">

			</div>
		</div>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header bg-info">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registro cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="ingresoCliente">
							<div class="form-group">
								<label for="nombre">Nombre cliente</label>
								<input type="text" v-model="nombreCliente" class="form-control" name="nombreCliente" placeholder="Nombre del cliente" >
							</div>
							<div class="form-group">
								<label for="identidad">Identidad del cliente</label>
								<input type="text" v-model="identidadCliente" class="form-control verificacion" name="identidadCliente" placeholder="Identidad del cliente">
							</div>
							<div class="form-group">
								<label for="telefono">Telefono del cliente</label>
								<input type="number" v-model="telefonoCliente" class="form-control" name="telefonoCliente" placeholder="Telefono del cliente">
							</div>
							<button class="btn btn-lg btn-info btn-block" type="submit">Ingresar Cliente</button>
		        </form>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script type="text/javascript">
import axios from 'axios'
import router from '../router'
	class Manicurista{
		constructor(nombre, comision) {
			this.nombre = nombre;
			this.comision = comision;
		}
	}
	class Servicio{
		constructor(nombre, precio) {
			this.nombre = nombre;
			this.precio = precio;
		}
	}
	class ServiciosSelecionados{
		constructor(servicio){
			this.servicio = servicio;
		}
	}
 export default{
	 data() {
		 return {
			 manicurista: new Manicurista(),
			 manicuristas:[],
			 servicio: new Servicio(),
			 servicios: [],
			 classHeader: {
					'Accept': 'application/json',
					'Content-type': 'application/json'
				},
				nombreCliente: '',
				identidadCliente: '',
				precio: '0',
				telefonoCliente: '',
				documentoManicurista: '',
				comision: '',
				nombreManicurista: '',
				serviciosSelecionados: '',
				contador:true,
				inspector:false
		 }
	 },
	 created(){
			this.getManicuristas();

		},
	 methods: {
		  getManicuristas(){
				axios.get('manicuristas')
				.then(res => {
					this.manicuristas = res.data
					console.log(res.data)
				}),
				axios.get('servicios')
				.then(res => {
					this.servicios = res.data
				})
				this.precio = 0
				this.indentidadCliente = ""
				this.inspector = false
				this.nombreCliente = ""
				this.telefonoCliente = ""
			},
			verificacionCliente(){
				axios.post('ventas/verificacioncliente', {
					identidad: this.identidadCliente
				})
				.then(res => {
					if(res.data.status == 'Cliente no existe'){
						$('#myModal').modal('show')
					}else{
						$('#button-addon1').addClass('bg-success')
						$('.manicuristaFocus').focus()
						this.nombreCliente = res.data.status
						this.inspector = true
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			ingresoCliente() {
				axios.post('ventas/ingresocliente', {
					nombre: this.nombreCliente,
					identidad: this.identidadCliente,
					telefono: this.telefonoCliente
				})
				.then(res => {
					if(res.data.status === 'Registrado'){
						this.$swal({
						  type: 'success',
						  title: 'Cliente registrado',
						  showConfirmButton: false,
						  timer: 1500
						})
						$('#myModal').modal('hide')
						$('#button-addon1').addClass('bg-success')
						$('.manicuristaFocus').focus()
						this.inspector = true
					}else{
						$('.verificacion').addClass('border border-danger')
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			elegirManicurista(manicurista, indentidadManicurista, comision){
				$('.manicuristaFocus').val(manicurista)
				this.documentoManicurista = indentidadManicurista
				console.log(indentidadManicurista)
				this.comision = comision
				this.nombreManicurista = manicurista
			},
			conteoServicio(esto, servicio, precio){
				const precioTotal = parseFloat(this.precio) + parseFloat(precio)
				this.precio = precioTotal
				const conteo = $("#"+esto).text()
				const conteoTotal = parseFloat(conteo) + 1
				$("#"+esto).text(conteoTotal)
				const servicios = this.serviciosSelecionados
				if (this.contador) {
					const serviciosTotales = servicio
					this.contador = false
					this.serviciosSelecionados = serviciosTotales
				}
				else{
					const serviciosTotales = servicios + " - " + servicio
					this.serviciosSelecionados = serviciosTotales
				}
				console.log(this.serviciosSelecionados)
			},
			procesar() {
				axios.post('ventas/procesar', {
					cliente: this.nombreCliente,
					clientedocumento: this.identidadCliente,
					manicurista: this.nombreManicurista,
					servicios: this.serviciosSelecionados,
					comision: this.comision,
					total: this.precio,
					documentoManicurista: this.documentoManicurista
				})
				.then(res => {
					if (res.data.status == "Venta registrada") {
						setTimeout(function(){
							$(".conteoServ").text(0);
							$("#inputTotal").val(0);
							$(".manicuristaFocus").val("");
							$("#cliente").val("");
							$("#button-addon1").removeClass("bg-success");
							this.nombreCliente = ' ';
							this.identidadCliente = '0';
							this.nombreManicurista = ' ';
							this.serviciosSelecionados = ' ';
							this.comision = ' ';
							this.precio = '0';
							this.documentoManicurista = ' ';
						},400)
						this.getManicuristas()
						this.$swal({
						  type: 'success',
						  title: 'Venta procesada',
						  showConfirmButton: false,
						  timer: 1500
						})
					}
				})
			},
			borrarServicios(){
				$(".conteoServ").text(0)
				this.precio = '0';
				this.serviciosSelecionados = '';
				this.contador = true
			}
	 }
 }
</script>
