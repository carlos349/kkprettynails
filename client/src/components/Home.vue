<template>
	<div class="container mt-5 contenedor">
		<div class="row">
			<div class="col-md-12">
				<form v-on:submit.prevent="verificacionCliente">
					<div class="input-group mb-3">
						  <div class="input-group-prepend">
						    <button class="btn btn-info spanInputs w-100" type="submit" id="button-addon1">Cliente</button>
						  </div>
						  <input type="text" v-model="identidadCliente" id="cliente" name="identidad" class="form-control" placeholder="Cedula del cliente" aria-label="Example text with button addon" aria-describedby="button-addon1">
					</div>
				</form>


				<div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend w-25 text-center">
				    <span class="spanInputs w-100 font-weight-bold text-white input-group-text text-center" id="inputGroup-sizing-lg">Manicurista</span>
				  </div>
				  <input type="text" class="form-control manicuristaFocus" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
				</div>
				<!-- <div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend w-25 text-center">
				    <span class="w-100 font-weight-bold  text-white input-group-text text-center" id="inputGroup-sizing-lg">Servicio</span>
				  </div>
				  <input type="text" class="form-control manicuristaFocus" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
				</div> -->
				<div class="input-group input-group-lg mb-2 " hidden>
				  <div class="input-group-prepend w-25 text-center" >
				    <span class="spanInputs w-100 font-weight-bold text-white input-group-text text-center" id="inputGroup-sizing-lg">Diseños</span>
				  </div>
					<div class="input-group-prepend">
						<button class="btn plusBtns btn-outline-dark" type="submit" id="button-addon1">+</button>
					</div>
				  <input type="text" class="form-control manicuristaFocus" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
					<div class="input-group-prepend">
						<button class="btn plusBtns btn-outline-dark" type="submit" id="button-addon1">-</button>
					</div>
				</div>
				<div class="input-group input-group-lg mb-2 " hidden>
				  <div class="input-group-prepend w-25 text-center">
				    <span class="spanInputs w-100 font-weight-bold  text-white input-group-text text-center" id="inputGroup-sizing-lg">Parches</span>
				  </div>
					<div class="input-group-prepend">
						<button class="btn plusBtns btn-outline-dark" type="submit" id="button-addon1">+</button>
					</div>
				  <input type="text" class="form-control manicuristaFocus" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
					<div class="input-group-prepend">
						<button class="btn plusBtns btn-outline-dark" type="submit" id="button-addon1">-</button>
					</div>
				</div>

				<!-- <table class="table">
				 <thead class="thead-light">
						<tr>
							<th class=" text-white text-center">
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
				</table> -->
				<table class="table">
					<thead >
						<tr>
							<th class=" text-white">
								Servicio
							</th>
							<th class="text-white">
								Precio
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="servicio of servicios" >
							<td class=" font-weight-bold">
								<button v-if="!inspector" type="button" class="w-75 btn procesar" v-on:click="conteoServicio(servicio._id,servicio.nombre, servicio.precio)" disabled>
								  {{servicio.nombre}} <span class="badge badge-light conteoServ" v-bind:id="servicio._id">0</span>
								</button>
								<button v-else type="button" class="w-75 btn procesar" v-on:click="conteoServicio(servicio._id ,servicio.nombre, servicio.precio)">
								  {{servicio.nombre}} <span class="badge badge-light conteoServ" v-bind:id="servicio._id">0</span>
								</button>

							</td>
							<td class=" font-weight-bold text-white">
								{{servicio.precio}}
							</td>
						</tr>
					</tbody>
				</table>
				<div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend w-25 text-center">
				    <span class="spanInputs w-100 font-weight-bold  text-white input-group-text text-center" id="inputGroup-sizing-lg">Sub-Total</span>
				  </div>
				  <input type="text" class="form-control manicuristaFocus" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
				</div>
				<div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend w-25 text-center">
				    <span class="spanInputs w-100 font-weight-bold  text-white input-group-text text-center" id="inputGroup-sizing-lg">Descuento</span>
				  </div>
				  <input type="text" class="form-control manicuristaFocus" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
				</div>
				<div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend w-25 text-center">
				    <span class="spanInputs w-100 font-weight-bold  text-white input-group-text text-center" id="inputGroup-sizing-lg">Medio de pago</span>
				  </div>
				  <input type="text" class="form-control manicuristaFocus" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
				</div>


					<div class="w-100 input-group input-group-lg mb-2">
					  <div class="input-group-prepend">
							<span class="input-group-text bg-light font-weight-bold text-white spanInputs" id="inputGroup-sizing-lg ">Total</span>
					    <span class="input-group-text bg-light font-weight-bold text-white spanInputs" id="inputGroup-sizing-lg ">$</span>
					  </div>
					  <input type="text" class="form-control" id="inputTotal" v-model="precio" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
						<div class="input-group-prepend">
							<button class="btn plusBtns" v-on:click="borrarServicios()" id="button-addon2"><font-awesome-icon icon="trash"/></button>
						</div>
					</div>
					<button v-if="!inspector" type="button" class="font-weight-bold mb-3 btn procesar w-100" v-on:click="procesar" disabled>Procesar
					</button>
					<button v-else type="button" class="font-weight-bold mb-3 btn procesar w-100" v-on:click="procesar">Procesar
					</button>

				<!-- <div class="input-group input-group-lg mb-2">
				  <div class="input-group-prepend">
				    <span class="input-group-text bg-light font-weight-bold text-success" id="inputGroup-sizing-lg ">$</span>
				  </div>
				  <input type="text" class="form-control" id="inputTotal" v-model="precio" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
					<div class="input-group-prepend">
						<button class="btn btn-info" v-on:click="borrarServicios()" id="button-addon2"><font-awesome-icon icon="trash"/></button>
					</div>
				</div> -->
			</div>
			<div class="col-md-6 " hidden>
			  <div class="container bg-white h-100" >
					<div class="row">
						<div class="col-md-5">
							<img class="w-75" src="../assets/logokk.png" alt="">
						</div>
						<div class="col-md-6">
							<div class="col-md-12 p-3">
								<div class="info">
									<h3>Numero de factura:<span>000000</span></h3>
									<h3>Fecha:<span>00/00/0000</span></h3>
								</div>
							</div>
							<div class="col-md-12 clienteInfo float-left">
								<h4>Cliente:<span>#########</span></h4>
								<h4>Cedula:<span>*********</span></h4>
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<table class="table">
						  <thead class="thead-dark">
						    <tr>
						      <th scope="col">Servicio</th>
						      <th scope="col">Precio</th>
						      <th scope="col">Cantidad</th>
									<th scope="col">Subtotal</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <td>Manicure</td>
						      <td>1000</td>
						      <td>2</td>
									<td>2000</td>
						    </tr>
						    <tr>
						      <td>Permanente</td>
						      <td>2000</td>
						      <td>3</td>
									<td>6000</td>
						    </tr>
						    <tr>
						      <td>Degradado</td>
						      <td>3000</td>
						      <td>1</td>
									<td>3000</td>
						    </tr>
						  </tbody>
							<thead class="thead-light">
						    <tr>
						      <th scope="col">Total</th>
						      <th scope="col"></th>
						      <th scope="col"></th>
									<th scope="col">11000</th>
						    </tr>
						  </thead>
						</table>
					</div>
			  </div>
			</div>
		</div>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header ">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registro cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="ingresoCliente">
							<div class="form-group">
								<label for="nombre">Nombre cliente</label>
								<input type="text" v-model="nombreCliente" class="form-control" name="nombreCliente" placeholder="Nombre del cliente"  requerid>
							</div>
							<div class="form-group">
								<label for="identidad">Identidad del cliente</label>
								<input type="text" v-model="identidadCliente" class="form-control verificacion" name="identidadCliente" placeholder="Identidad del cliente" requerid>
							</div>
							<div class="form-group">
								<label for="telefono">Correo del cliente</label>
								<input type="email" v-model="correoCliente" class="form-control" name="correoCliente" placeholder="Correo del cliente">
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
				correoCliente: '',
				documentoManicurista: '',
				comision: '',
				nombreManicurista: '',
				serviciosSelecionados: '',
				contador: true,
				inspector: false
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
	},
	methods: {
		  getManicuristas(){
				axios.get('manicuristas')
				.then(res => {
					this.manicuristas = res.data
				}),
				axios.get('servicios')
				.then(res => {
					this.servicios = res.data
				})
				this.precio = 0
				this.indentidadCliente = ""
				this.inspector = false
				this.nombreCliente = ""
				this.correoCliente = ""
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
					correo: this.correoCliente
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
<style media="screen">
	input{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #102229 !important;
		background-color:transparent !important;
		color:#fff !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	.spanInputs{
		border:none !important;
		border-right: 2px solid #102229 !important;
		border-left: 2px solid #102229 !important;
		border-bottom: 2px solid #102229 !important;
		border-radius: 0px !important;
		background-color:transparent !important;
		font-size: 12px !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	.plusBtns{
		border:1px solid #fff;
		border-radius:50% !important;
		color:#fff;
		outline:none !important;
		margin-left:5px;
	}
	.procesar{
		background-color:#102229;
		color:#fff;
		transition: all 0.5s ease-out;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	.procesar:hover{
		color:#102229;
		background-color:#fff;
		transition: all 0.5s ease-out;
	}
	table{
		border:none !important;
	}
	.contenedor{
		width:30%;
		min-width:400px;
		border:2px solid #102229;
		padding-top:12px;
	}
</style>
