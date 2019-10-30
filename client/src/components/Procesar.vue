<template>
<div>
	<div class="container contenedor">
		<div class="row">
			<div class="col-md-12">
				<div class="input-group mb-3">
					<div class="input-group-prepend w-25">
					<button class="btn add w-100" v-on:click="verificacionCliente" id="button-addon1">Ingresar cliente</button>
					</div>
					<autocomplete	
						:search="searchClient"
						placeholder="Buscar cliente"
						aria-label="Buscar cliente"
						@submit="handleSubmitClient"
						class="auto">
					</autocomplete>
				</div>
				<div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend w-25 text-center">
				    <span class="spanInputs w-100 font-weight-bold text-white input-group-text text-center" id="inputGroup-sizing-lg">Manicurista</span>
				  </div>
					<autocomplete	
						:search="search"
						placeholder="Buscar manicurista"
						aria-label="Buscar manicurista"
						@submit="handleSubmit"
						class="auto">
					</autocomplete>
				</div>
				<div class="">
					<input type="text" id="myInput" v-on:keyup="myFunction()" class="form-control buscar inputs" placeholder="Filtrar servicios"/>
					<font-awesome-icon class="lupa" icon="search"/>
				</div>
				<table class="table table-dark tableBg" >
					<thead>
						<tr>
							<th class="text-left pl-4 text-white">
								Servicio
							</th>
							<th class="text-center text-white">
								Precio <font-awesome-icon class="icon-add" icon="plus-square" v-on:click="addService"/>
							</th>
						</tr>
					</thead>
				</table>
				<div class="ListaProcesar">
					<table class="table table-dark tableBg" id="myTable">
						<tbody>
							<tr v-for="(servicio, index) of servicios" >
								<td v-if="servicio.active" class="font-weight-bold">
									<button v-if="!inspector" type="button" class="w-75 btn procesar text-left" v-on:click="conteoServicio(servicio._id,servicio.nombre, servicio.precio)" disabled>
									  {{servicio.nombre}} <span class="badge badge-light conteoServ mt-1 float-right" v-bind:id="servicio._id">0</span>
									</button>
									<button v-if="!inspector" type="button" class="w-20 btn btn-back  text-left"  disabled>
									  <font-awesome-icon icon="times"/>
									</button>
									<button v-else type="button" class="w-75 btn procesar  text-left" v-on:click="conteoServicio(servicio._id ,servicio.nombre, servicio.precio)">
									  {{servicio.nombre}} <span class="badge badge-light conteoServ mt-1 float-right" v-bind:id="servicio._id">0</span>
									</button>
									<button v-if="inspector" type="button" class="w-20 btn btn-back  text-left" v-on:click="borrarServicio(servicio.nombre,index,servicio._id,servicio.precio)">
									  <font-awesome-icon icon="times"/>
									</button>

								</td>
								<td v-if="servicio.active" class=" font-weight-bold text-white text-left">
									{{servicio.precio}}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="input-group input-group-lg mb-2 shadowTop">
				  <div class="input-group-prepend w-25 text-center">
				    <span class="spanInputs w-100 font-weight-bold  text-white input-group-text text-center" id="inputGroup-sizing-lg">Sub-Total</span>
				  </div>
				  <input readonly type="text" class="form-control manicuristaFocus inputs" v-model="precio" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
				</div>
				<div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend">
					<span class="input-group-text bg-light font-weight-bold text-white spanInputs" id="inputGroup-sizing-lg">Descuento</span>
					<span class="input-group-text bg-light font-weight-bold text-white spanInputs" id="inputGroup-sizing-lg ">%</span>
					  </div>
				  <input type="text" placeholder="0" v-model="descuento" v-on:change="descuentoFunc" class="form-control manicuristaFocu inputs" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
				</div>
				<div class="input-group input-group-lg mb-2 ">
				  <div class="input-group-prepend w-25 text-center">
				    <span class="spanInputs w-100 font-weight-bold text-white input-group-text text-center" id="inputGroup-sizing-lg">Medio de pago</span>
				  </div>
					<select class="form-control selectMani" v-model="pagoTipo" v-on:change="elegirManicurista()">
						<option value="">Seleccione</option>
						<option value="tarjeta" >Tarjeta</option>
						<option value="efectivo">Efectivo</option>
					</select>
				</div>
				<div class="w-100 input-group input-group-lg mb-2">
					<div class="input-group-prepend">
						<span class="input-group-text bg-light font-weight-bold text-white spanInputs" id="inputGroup-sizing-lg">Total</span>
					<span class="input-group-text bg-light font-weight-bold text-white spanInputs" id="inputGroup-sizing-lg ">$</span>
					</div>
					<input readonly type="text" class="form-control inputs" id="inputTotal" v-model="total" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
					<input readonly type="hidden" class="form-control inputs" id="inputTotal" v-model="totalSinFormato" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
					<div class="input-group-prepend">
						<button class="btn plusBtns" v-on:click="borrarServicios()" id="button-addon2"><font-awesome-icon icon="trash"/></button>
					</div>
					<input v-model="fechaVenta" type="date" class="form-control">
				</div>
				<button v-if="!inspector" type="button" class="font-weight-bold mb-3 btn procesar w-100" v-on:click="procesar" disabled>Procesar
				</button>
				
				<button v-else type="button" class="font-weight-bold mb-3 btn procesar w-100" v-on:click="procesar">Procesar
				</button>
			</div>

			</div>
		</div>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content" v-bind:style="{ 'background-color': '#29323c'}">
		      <div class="modal-header ">
		        <h5 class="modal-title font-weight-bold text-white" id="exampleModalCenterTitle">Registro cliente</h5>
		        
		      </div>
		      <div class="modal-body">
				  <form v-on:submit.prevent="ingresoCliente">
					<div class="form-group">
						<label for="name">Nombre del cliente</label>
						<input v-model="nombreClienteRegister" type="text" class="form-control inputs" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="identidad">Instagram o Correo del cliente</label>
						<input v-model="instagramCliente" type="text" class="form-control inputs" placeholder="registre instagram o correo">
					</div>
                    <div class="form-group">
                        <label for="recomendacion">Registre recomendador</label>
                        <autocomplete	
                            :search="searchClient"
                            placeholder="Buscar cliente"
                            aria-label="Buscar cliente"
                            @submit="handleSubmitClient"
                            class="auto">
                        </autocomplete>
                    </div>
					<button class="btn w-100 add">Agregar cliente</button>
				</form>
		      </div>
		    </div>

		  </div>
		</div>
		<div class="modal fade" id="myModalAddServiceFast" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content" v-bind:style="{ 'background-color': '#29323c'}">
		      <div class="modal-header ">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar servicio</h5>
		        
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="registroServicio">
						<div class="form-group">
							<label for="name">Nombre del servicio</label>
							<input v-model="nombreServi" type="text" class="form-control inputs" placeholder="Nombre servicio">
						</div>
						<div class="form-group">
							<label for="name">Tiempo</label>
							<input v-model="tiempoServi" v-on:keypress="maxCount" type="number" min="1" max="3" class="form-control inputs" placeholder="0 Horas">
						</div>
						<div class="form-group">
							<label for="name">Precio</label>
							<input v-model="precioServi" type="text" class="form-control inputs" placeholder="Precio">
						</div>
						<div class="form-group row" style="margin-top:-15px;">
							<input type="text" id="myInputServFast" v-on:keyup="myFunctionServFast()" class="form-control buscar inputs" placeholder="Seleccione prestadores"/>
							<div class="ListaProcesarServ maxHeight">
								<table class="table table-dark tableBg" id="myTableServFast">
									<tbody>
										<tr v-for="(manicurista, index) of manicuristas" >
											<td class="font-weight-bold text-white">
												{{manicurista.nombre}}
											</td>
											<td class="font-weight-bold text-right">
												<label class="conCheck col-sm-2">
												<input :id="index" class="checkFirst" v-on:click="presSelect(manicurista.documento,index)" type="checkbox">
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
import router from '../router'
import Autocomplete from '@trevoreyre/autocomplete-vue'
	class Manicurista{
		constructor(nombre, comision) {
			this.nombre = nombre;
			this.comision = comision;
		}
	}
	class ArregloManicuristas{
		constructor(nombre) {
			this.nombre = nombre;
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
			arregloManicurista: new ArregloManicuristas(),
			arregloManicuristas:[],
			servicio: new Servicio(),
			servicios: [],
			prestadoresSeleccionados:[],
			classHeader: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			nombreCliente: '',
			instagramCliente: '',
			precio: '0',
			fechaVenta:'fecha',
			total:'0',
			correoCliente: '',
			documentoManicurista: '',
			comision: '',
			nombreManicurista: '',
			serviciosSelecionado:  new ServiciosSelecionados(),
			serviciosSelecionados: [],
			contador: true,
			inspector: false,
			maniSelect:'',
			descuento:'',
			pagoTipo:'',
			totalSinFormato:'0',
			nombreServi:'',
			tiempoServi:'',
			precioServi:'',
			clients: [],
			arregloClients: []
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
		this.arrayMani();
		this.arrayUsers();
	},
	methods: {
			arrayMani(){
				setTimeout(() => {
					for (let index = 0; index < this.manicuristas.length; index++) {
						this.arregloManicuristas.push(this.manicuristas[index].nombre)
					}
				}, 2000);
			},
			arrayUsers(){
				setTimeout(() => {
					for (let index = 0; index < this.clients.length; index++) {
						this.arregloClients.push(this.clients[index].nombre+'-'+this.clients[index].identidad)
					}
				}, 2000);
				console.log(this.arregloClients)
			},
			searchClient(input){
				if (input.length < 1) { return [] }
					return this.arregloClients.filter(manicurista => {
						return manicurista.toLowerCase()
						.startsWith(input.toLowerCase())
				})
			},
			handleSubmitClient(result){
				console.log(result)
				this.nombreCliente = result
			},
		  	search(input) {
				if (input.length < 1) { return [] }
				return this.arregloManicuristas.filter(manicurista => {
					return manicurista.toLowerCase()
					.startsWith(input.toLowerCase())
				})
			},
			handleSubmit(result) {
				this.maniSelect = result
				this.elegirManicurista()
				this.inspector = true
			},
		  	getManicuristas(){
				axios.get('manicuristas')
				.then(res => {
					this.manicuristas = res.data
				}),
				axios.get('users/clientes')
				.then(res => {
					this.clients = res.data
					console.log(res.data)
				})
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
			maxCount(){
				setTimeout(() => {
					if (this.tiempoServi > 3) {
						this.tiempoServi = 3
					}
				}, 500)	
			},
			myFunction() {
			  var input, filter, table, tr, td, i, txtValue;
			  input = document.getElementById("myInput");
			  filter = input.value.toUpperCase();
			  table = document.getElementById("myTable");
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
			addService(){
				$('#myModalAddServiceFast').modal('show')
			},
			verificacionCliente(){
				$('#myModal').modal('show')	
			},
			ingresoCliente() {
				axios.post('clients', {
					nombre:this.nombreClienteRegister,
					identidad:this.instagramCliente,
					recomendador:this.nombreCliente
				})
				.then(res => {
					if (res.data.status == 'Registrado') {
						this.$swal({
							type: 'success',
							title: 'Cliente registrado',
							showConfirmButton: false,
							timer: 1500
						})
						$('#myModal').modal('hide')
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
			elegirManicurista(){
				axios.get('manicuristas/justone/' + this.maniSelect)
				.then(res => {
					this.documentoManicurista = res.data.documento
					this.comision = res.data.porcentaje
					this.nombreManicurista = this.maniSelect
				})
				.catch(err => {
					this.$swal({
						type: 'error',
						title: 'experimentamos problemas :(',
						showConfirmButton: false,
						timer: 1500
					})
				})
			},
			borrarServicio(servicio,index,esto,precio){
				for (var i = 0; i < this.serviciosSelecionados.length; i++) {
					console.log(i)
					if (this.serviciosSelecionados[i].servicio == servicio ) {
						this.serviciosSelecionados.splice(i, 1)
						break
					}
				}
				if ($("#"+esto).text() != "0") {
					const conteo = $("#"+esto).text()
					const conteoTotal = parseFloat(conteo) - 1
					$("#"+esto).text(conteoTotal)
					const subTotal = parseFloat(this.totalSinFormato) - parseFloat(precio)
					this.precio = this.formatPrice(subTotal)
					this.totalSinFormato = subTotal
					if(this.descuento == ""){
						this.total = this.formatPrice(subTotal)
					}else{
						this.descuentoFunc()
					}
					axios.put('ventas/updateServicesMonthDiscount/' + servicio)
					.catch(err => {
						console.log(err)
					})

					axios.put('ventas/updateProviderMonthDiscount/' + this.maniSelect)
					.catch(err => {
						console.log(err)
					})
				}
				

			},
			descuentoFunc(){
				if(this.descuento != ""){
					const descuento = parseFloat(this.descuento) / 100
					const porcentaje = 1 - parseFloat(descuento)
					const precioConDescuento = parseFloat(this.totalSinFormato) * parseFloat(porcentaje)
					this.total = this.formatPrice(precioConDescuento)
					this.totalSinFormato = precioConDescuento
				}
			},
			conteoServicio(esto, servicio, precio){
				const descuento = parseFloat(this.descuento) / 100
				const porcentaje = 1 - parseFloat(descuento)
				const precioTotal = parseFloat(this.totalSinFormato) + parseFloat(precio)
				console.log(parseFloat(this.precio))
				this.precio = this.formatPrice(precioTotal)
				this.totalSinFormato = precioTotal
				if(this.descuento === ''){
					this.total = this.formatPrice(precioTotal)
				}else{
					const precioConDescuento = parseFloat(this.totalSinFormato) * parseFloat(porcentaje)
					this.total = this.formatPrice(precioConDescuento)
					this.totalSinFormato = precioConDescuento
				}

				const conteo = $("#"+esto).text()
				const conteoTotal = parseFloat(conteo) + 1
				$("#"+esto).text(conteoTotal)
				const servicios = {'servicio': servicio}
				this.serviciosSelecionados.push(servicios)
				
				axios.put('ventas/updateServicesMonth/' + servicio)
				.catch(err => {
					this.$swal({
						type: 'error',
						title: 'experimentamos problemas :(',
						showConfirmButton: false,
						timer: 1500
					})
				})

				axios.put('ventas/updateProviderMonth/' + this.maniSelect)
				.catch(err => {
					this.$swal({
						type: 'error',
						title: 'experimentamos problemas :(',
						showConfirmButton: false,
						timer: 1500
					})
				})
			},
			procesar() {
				if (this.nombreCliente != '' && this.maniSelect != '' && this.pagoTipo != '') {
					axios.post('ventas/procesar', {
						cliente: this.nombreCliente,
						manicurista: this.maniSelect,
						servicios: this.serviciosSelecionados,
						comision: this.comision,
						mediopago:this.pagoTipo,
						descuento:this.descuento,
						fecha:this.fechaVenta,
						total: this.totalSinFormato,
						documentoManicurista: this.documentoManicurista
					})
					.then(res => {
						if (res.data.status == "Venta registrada") {
							setTimeout(function(){
								location.reload()
							},400)
							this.$swal({
								type: 'success',
								title: 'Venta procesada',
								showConfirmButton: false,
								timer: 1500
							})
						}
					}).catch(err => {
						this.$swal({
							type: 'error',
							title: 'experimentamos problemas :(',
							showConfirmButton: false,
							timer: 1500
						})
					})
				}else{
					this.$swal({
						type: 'error',
						title: 'Complete los datos necesarios',
						showConfirmButton: false,
						timer: 1500
					})
				}
				
			},
			borrarServicios(){
				$(".conteoServ").text(0)
				this.precio = '0';
				this.serviciosSelecionados = [];
				this.contador = true;
				this.descuento = "";
				this.total = 0;
				this.totalSinFormato = 0;
			},
			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			},
			myFunctionServFast() {
			  var input, filter, table, tr, td, i, txtValue;
			  input = document.getElementById("myInputServFast");
			  filter = input.value.toUpperCase();
			  table = document.getElementById("myTableServFast");
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
			presSelect(prestador, index){
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
			},
			registroServicio(){
				if (this.nombreServi == '' && this.precioServi == '' && this.tiempoServi == '') {
					this.$swal({
						type: 'error',
						title: 'Llene todos los campos',
						showConfirmButton: false,
						timer: 1500
					})
				}else if(this.tiempoServi > 3){
					this.$swal({
						type: 'error',
						title: 'El tiempo del servicio no puede ser mayor a 3 Horas',
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
								this.getManicuristas();
								this.nombreServi = ''
								this.precioServi = ''
								this.tiempoServi = ''
								this.prestadoresSeleccionados = []
								$('.checkFirst').prop('checked', false)
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
	 	}
 }
</script>
<style media="screen">
	.inputs{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid azure !important;
		background-color:transparent !important;
		color:#fff !important;
		font-family: 'Roboto', sans-serif !important;
		letter-spacing: .09em;
	}
	.spanInputs{
		border:none !important;
		border-right: 2px solid #102229 !important;
		border-left: 2px solid #102229 !important;
		border-bottom: 2px solid #102229 !important;
		border-radius: 0px !important;
		background-color:transparent !important;
		font-size: 0.9em !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
		color:#fff !important
	}
	@media (max-width: 1000px) {
		.spanInputs{
			font-size: 0.6em !important;
		}
		.contenedor{
			width:40%;
			min-width:400px;
			border:2px solid #102229;
			padding-top:12px;
			background-color: #fff;
			min-width: 455px;
		}
	}
	.plusBtns{
		background-color:#102229;
		border-radius:5px !important;
		color:#fff;
		outline:none !important;
		margin-left:5px;
	}
	.plusBtns:hover{
		background-color:#fff;
	}
	.procesar{
		background-color:#102229;
		color:#fff;
		transition: all 0.5s ease-out;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
		cursor:pointer;
	}
	.autocomplete-input{
		color:azure !important;
	}
	.autocomplete-result-list{
		background-color: #102229;
		color:azure;
	}
	.autocomplete-result-list li{
		color:azure;
	}
	.procesar:hover{
		color:#102229;
		background-color:#fff;
		transition: all 0.5s ease-out;
	}
	.tableBg{
		border:none !important;
		background-color:#3a3a3a !important;
		margin-bottom:0 !important;
	}
	.contenedor{
		width:40%;
		border:2px solid #ccc;
		padding-top:12px;
		background-color: transparent;
		min-width: 700px;
	}
	.btn-back{
		background-color:black;
		color:#fff;
		cursor:pointer;
	}
	.selectMani{
		background-color:#3a3a3a !important;
		color:#fff !important;
		border:none !important;
		border-bottom:2px solid #102229 !important;
	}
	.ListaProcesar{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 190px;
		height:190px;
	}
	.ListaProcesar::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	label{
		color: azure;
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
	.ListaProcesarServ{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 190px;
		height:190px;
	}
	.ListaProcesarServ::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.maxHeight{
		max-height: 120px;
		width: 100%;
	}
	.shadowTop{
		-webkit-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
	}
	.lupa{
		position:absolute;
		right:10%;
		top:18%;
		font-size:1.4em
	}
	.icon-add{
		position:absolute;
		right:3%;
		top:17%;
		font-size:2.3em;
		cursor: pointer;
	}	
	.buscar::-webkit-input-placeholder {
		color: #cccccc;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	#cliente::-webkit-input-placeholder {
		color: #cccccc;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	.auto{
		width: 75%;
	}
	.autocomplete{
		width: 100% !important;
	}
	.autocomplete-input{
		background-color: transparent !important;
		border: none !important;
		border-bottom:2px solid #102229 !important;
		border-radius: 0px;
		width: 100% !important;
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

	/* Create a custom checkbox */
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
