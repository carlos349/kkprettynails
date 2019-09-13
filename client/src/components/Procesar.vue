<template>
<div>
	<div class="container contenedor">
		<div class="row">
			<div class="col-md-12">
				<form v-on:submit.prevent="verificacionCliente">
					<div class="input-group mb-3">
						  <div class="input-group-prepend">
						    <button class="btn btn-info spanInputs w-100" type="submit" id="button-addon1">Cliente</button>
						  </div>
						  <input type="text" v-model="nombreCliente" id="cliente" name="identidad" class="form-control inputs" placeholder="Cliente" aria-label="Example text with button addon" aria-describedby="button-addon1">
					</div>
				</form>
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
								Precio
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
									<button v-if="!inspector" type="button" class="w-20 btn btn-danger  text-left"  disabled>
									  <font-awesome-icon icon="times"/>
									</button>
									<button v-else type="button" class="w-75 btn procesar  text-left" v-on:click="conteoServicio(servicio._id ,servicio.nombre, servicio.precio)">
									  {{servicio.nombre}} <span class="badge badge-light conteoServ mt-1 float-right" v-bind:id="servicio._id">0</span>
									</button>
									<button v-if="inspector" type="button" class="w-20 btn btn-danger  text-left" v-on:click="borrarServicio(servicio.nombre,index,servicio._id,servicio.precio)">
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
		    <div class="modal-content">
		      <div class="modal-header ">
		        <h5 class="modal-title font-weight-bold" id="exampleModalCenterTitle">Registro cliente</h5>
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
								<label for="identidad">Instagram o E-Mail del cliente</label>
								<input type="text" v-model="instagramCliente" class="form-control verificacion" name="identidadCliente" placeholder="Instagram o E-mail del cliente" requerid>
							</div>
							<button class="btn btn-lg procesar btn-block" type="submit">Ingresar Cliente</button>
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
			 classHeader: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			nombreCliente: '',
			instagramCliente: '',
			precio: '0',
			fechaVenta:'',
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
			totalSinFormato:'0'
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
	},
	methods: {
			arrayMani(){
				setTimeout(() => {
					for (let index = 0; index < this.manicuristas.length; index++) {
						this.arregloManicuristas.push(this.manicuristas[index].nombre)
					}
				}, 1000);
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
			},
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
			verificacionCliente(){
				axios.post('ventas/verificacioncliente', {
					identidad: this.nombreCliente
				})
				.then(res => {
					if(res.data.status == 'Cliente no existe'){
						$('#myModal').modal('show')
					}else{
						$('#button-addon1').addClass('bg-success')
						$('#myInput').focus()
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
					identidad: this.instagramCliente
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
			elegirManicurista(){
				axios.get('manicuristas/justone/' + this.maniSelect)
				.then(res => {
					this.documentoManicurista = res.data.documento
					this.comision = res.data.porcentaje
					this.nombreManicurista = this.maniSelect
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
					console.log(err)
				})
			},
			procesar() {
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
					console.log(res)
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
				})
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
			}
	 }
 }
</script>
<style media="screen">
	.inputs{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #102229 !important;
		background-color:transparent !important;
		color:#000 !important;
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
	}
	.procesar:hover{
		color:#102229;
		background-color:#fff;
		transition: all 0.5s ease-out;
	}
	.tableBg{
		border:none !important;
		background-color:#213b45 !important;
		margin-bottom:0 !important;
	}
	.contenedor{
		width:40%;
		border:2px solid #ccc;
		padding-top:12px;
		background-color: transparent;
		min-width: 700px;
	}
	.selectMani{
		background-color:#355461 !important;
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
	.shadowTop{
		-webkit-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
		box-shadow: 0px -16px 21px -10px rgba(0,0,0,0.75);
	}
	.lupa{
		position:absolute;
		right:4%;
		top:17%;
		font-size:1.4em
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
</style>
