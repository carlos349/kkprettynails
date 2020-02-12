<template>
<div style="z-index:10000">
	<div class="contenedor">
		<div class="row">
			<div class="col-md-12">
				<div class="row mb-4 inputProce">
					<div class="input-group col-sm-6">
						<div class="w-100 " v-on:click="clearInput">
							<autocomplete
							ref="autocomplete"
							placeholder="Buscar cliente"
							:source="clients"
							input-class="esteqlq one"
							results-property="data"
							:results-display="formattedDisplay"
							@selected="addDistributionGroup">
							</autocomplete>
							<span v-on:click="clearInput" style="position:absolute;top:20px;left:50px;background-color:white;width:75%;">{{nombreCliente}}</span>
						</div>


					<!-- <autocomplete	
						:search="searchClient"
						placeholder="Buscar cliente"
						aria-label="Buscar cliente"
						@submit="handleSubmitClient"
						class="auto">
					</autocomplete> -->
				</div>
				<div class="input-group input-group-lg col-sm-6">
						<div class="w-100 " v-on:click="clearInputTwo">
							<autocomplete
							ref="autocomplete"
							placeholder="Buscar Prestador"
							:source="manicuristas"
							input-class="esteqlq two"
							results-property="data"
							:results-display="formattedDisplayTwo"
							@selected="addDistributionGroupTwo">
							</autocomplete>
							<span v-on:click="clearInputTwo" style="position:absolute;top:20px;left:50px;background-color:white;width:75%;">{{maniSelect}}</span>
						</div>
					<!-- <autocomplete	
						:search="search"
						placeholder="Buscar manicurista"
						aria-label="Buscar manicurista"
						@submit="handleSubmit"
						class="auto">
					</autocomplete> -->
				</div>
				</div>
				
				<!-- <div class="">
					<input type="text" id="myInput" v-on:keyup="myFunction()" class="form-control buscar inputs" placeholder="Filtrar servicios"/>
					
				</div> -->
				<table class="table" v-bind:style="{ 'background-color': '#6BB2E5', 'border-radius' : '15px', 'border':'none !important'}" >
					<thead>
						<tr>
							<th style="border-radius:15px !important;border:none" class="text-left pl-4 text-white">
								
								<input autocomplete="off" style="outline:none !important;background-color:white !important" type="text" id="myInput" v-on:keyup="myFunction()" class="form-control buscar inputsVenta w-75 text-white" placeholder="Filtrar servicios"/>
							</th>
							<th style="color:white;border:none" class="text-center pl-5 pb-3">
								Precio 
							</th>
						</tr>
					</thead>
				</table>
				<div class="ListaProcesar">
					<table class="table  tableBg" id="myTable">
						<tbody>
							<tr v-for="(servicio, index) in servicios" v-bind:key="servicio._id">
								<td style="border:none" v-if="servicio.active" class="font-weight-bold">
									<button v-if="!inspector" type="button" class="w-75 btn procesar text-left" v-on:click="conteoServicio(servicio._id,servicio.nombre, servicio.precio, servicio.comision)" disabled>
									  {{servicio.nombre}} <span class="badge badge-light conteoServ mt-1 float-right" v-bind:class="formatClass(servicio.nombre)" v-bind:id="servicio._id">0</span>
									</button>
									<button  v-if="!inspector" type="button" class="w-20 btn btn-back  text-left"  disabled>
									  <font-awesome-icon icon="times"/>
									</button>
									<button style="background-color:#6BB2E5" v-else type="button" class="w-75 btn procesar  text-left" v-on:click="conteoServicio(servicio._id ,servicio.nombre, servicio.precio, servicio.comision)">
									  {{servicio.nombre}} <span class="badge badge-light conteoServ mt-1 float-right" v-bind:class="formatClass(servicio.nombre)" v-bind:id="servicio._id">0</span>
									</button>
									<button style="background-color:#6BB2E5" v-if="inspector" type="button" class="w-20 btn btn-back  text-left" v-on:click="borrarServicio(servicio.nombre,index,servicio._id,servicio.precio)">
									  <font-awesome-icon icon="times"/>
									</button>

								</td>
								<td style="border:none" v-if="servicio.active" class=" font-weight-bold  text-center">
									$ {{formatPrice(servicio.precio)}}
								</td>
							</tr>
							
						</tbody>
					</table>
				</div>
				<div class="row pt-3 shadowTop">
					<div class="col-sm-6">
						<div class="input-group input-group-lg mb-2">
							<div class="input-group-prepend text-center">
								<span style="font-size:1.5em;color:#5a5a5a !important" class="inputsVenta w-100 text-white input-group-text text-center" id="inputGroup-sizing-lg">Subtotal</span>
							</div>
							<input style="font-size:1.5em;color:#5a5a5a !important" readonly type="text" disabled class="inputsVenta text-center w-100 form-control manicuristaFocus" v-model="precio" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
						</div>
					</div>
					<div class="col-sm-3">
						<div class="input-group input-group-lg mb-2 ">
							<div class="input-group-prepend w-25 inputsVenta">
								<font-awesome-icon style="font-size:1.5em;color:#6BB2E5" icon="tag"/>
								
							</div>
							<input type="text" selectionEnd="%" inputmode="numeric" placeholder="0" v-model="descuento"  v-on:change="descuentoFunc" class="form-control manicuristaFocu inputsVenta text-center" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
							<div class="input-group-prepend w-25 inputsVenta">
								<font-awesome-icon style="font-size:1.5em;color:#6BB2E5" icon="percent"/>
								
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="input-group input-group-lg mb-2 ">
							
							<input type="text" v-on:keyup="formatDiscount()" v-model="diseño" placeholder="Diseño" class="form-control manicuristaFocu inputsVenta" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
						</div>
					</div>
				</div>
				<div class="w-75 mx-auto input-group input-group-lg mb-2">
					
					<input readonly type="hidden" class="form-control inputs" id="inputTotal" v-model="totalSinFormato" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
					
					
				</div>
				
				
					<span class="spanInputs w-100 font-weight-bold text-center text-white input-group-text text-center" style="background-color: #6BB2E5 !important; color:white !important; border:none !important;padding-top:10px;border-radius:10px !important" ><h5 class="text-center w-100">Medios de pago</h5> </span>
					<div class="input-group-prepend w-25 text-center">
						
					</div>
					<div class="row pt-2 ">
						<div class="col-sm-4">
							<div class="input-group input-group-lg mb-2">
								<div v-on:click="hundredPorcent('efectivo')" v-on:mouseenter="hundredMouseOver('efectivo')" v-on:mouseleave="hundredMouseNonOver('efectivo')" class="input-group-prepend text-center w-25 hundred">
									<span class="inputsVenta  w-100  text-white input-group-text" id="inputGroup-sizing-lg">
										<b class="efectivo" style="font-size:0.6em;display:none">100%</b>
									<font-awesome-icon  class="efectivo" style="font-size:1em; color:#6BB2E5" icon="money-bill-wave"/>	
									</span>
									
								</div>
								<input type="text" class="inputsVenta form-control text-center manicuristaFocus" v-model="pagoEfectivo" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Efectivo" v-on:change="formato('pagoEfectivo')" v-on:click="erasedFormat('pagoEfectivo')">
							</div>
							<input type="hidden" class="form-control text-center manicuristaFocus inputsVenta p-1" v-model="pagoEfectivoSinformato" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Débito" >
						</div>
						<div class="col-sm-4">
						<div class="input-group input-group-lg mb-2 ">
							<div v-on:click="hundredPorcent('transferencia')" v-on:mouseenter="hundredMouseOver('transferencia')" v-on:mouseleave="hundredMouseNonOver('transferencia')" class="input-group-prepend hundred w-25 text-center">
								<span class="inputsVenta w-100  text-white input-group-text" id="inputGroup-sizing-lg">
									<b class="transferencia" style="font-size:0.6em;display:none">100%</b>
									<font-awesome-icon class="transferencia" style="font-size:1em; color:#6BB2E5" icon="money-check-alt"/>
								</span>
							</div>
							<input type="text" class="form-control text-center manicuristaFocus inputsVenta" v-model="pagoTransf" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Transferencia" v-on:change="formato('pagoTransf')" v-on:click="erasedFormat('pagoTransf')">
						</div>
						<input type="hidden" class="form-control text-center manicuristaFocus inputsVenta p-1" v-model="pagoTransfSinformato" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Débito" >
					</div>
					<div class="col-sm-4">
						<div class="input-group input-group-lg mb-2 ">
							<div v-on:click="hundredPorcent('otros')" v-on:mouseenter="hundredMouseOver('otros')" v-on:mouseleave="hundredMouseNonOver('otros')" class="input-group-prepend w-25 hundred">
								<span class="input-group-text bg-light w-100  text-white inputsVenta" id="inputGroup-sizing-lg">
									<b class="otros" style="font-size:0.6em;display:none">100%</b>
									<font-awesome-icon class="otros" style="font-size:1em; color:#6BB2E5" icon="hand-holding-usd"/>
								</span>
								
							</div>
							<input type="text" v-model="pagoOtros"  class="form-control text-center manicuristaFocu inputsVenta" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Otros" v-on:change="formato('pagoOtros')" v-on:click="erasedFormat('pagoOtros')"> 
						</div>
						<input type="hidden" class="form-control text-center manicuristaFocus inputsVenta p-1" v-model="pagoOtrosSinformato" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Débito" >
					</div>
					<div class="col-sm-4 mx-auto">
						<div class="input-group input-group-lg mb-2 ">
							<div v-on:click="hundredPorcent('credito')" v-on:mouseenter="hundredMouseOver('credito')" v-on:mouseleave="hundredMouseNonOver('credito')" class="input-group-prepend hundred w-25 p-0 ">
								<span class="inputsVenta w-100 p-0 text-white input-group-text" id="inputGroup-sizing-lg">
									<b class="credito pl-3" style="font-size:0.6em;display:none">100%</b>
									<img style="width:98%;padding-left:1px" class="credito"  src="../assets/trans1.png" alt=""></span>
							</div>
							
							<input type="text" class="form-control text-center manicuristaFocus inputsVenta p-1" v-model="pagoRedCCredito" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Crédito" v-on:change="formato('pagoRedCCredito')" v-on:click="erasedFormat('pagoRedCCredito')">
						</div>
						<input type="hidden" class="form-control text-center manicuristaFocus inputsVenta p-1" v-model="pagoRedCCreditoSinformato" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Débito" >
					</div>
					<div class="col-sm-4 mx-auto">
						<div class="input-group input-group-lg mb-2 ">
							<div  v-on:click="hundredPorcent('debito')" v-on:mouseenter="hundredMouseOver('debito')" v-on:mouseleave="hundredMouseNonOver('debito')" class="input-group-prepend w-25 p-0 hundred">
								<span class="inputsVenta w-100 p-0 text-white input-group-text" id="inputGroup-sizing-lg">
									<b class="debito pl-3" style="font-size:0.6em;display:none">100%</b>
									<img class="debito" style="width:98%;padding-left:1px"  src="../assets/trans1.png" alt=""></span>
							</div>
							<input type="text" class="form-control text-center manicuristaFocus inputsVenta p-1" v-model="pagoRedCDebito" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Débito" v-on:change="formato('pagoRedCDebito')" v-on:click="erasedFormat('pagoRedCDebito')">
							

						</div>
						<input type="hidden" class="form-control text-center manicuristaFocus inputsVenta p-1" v-model="pagoRedCDebitoSinformato" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Débito" >
					</div>
					

					</div>
			</div>
				<div class="col-sm-12 p-2 mt-2">
					<div class="row p-0">
						<div class="col-sm-6">
						<div style="width:120%" class="input-group input-group-lg">
							<div style="width:26%" class="input-group-prepend text-center">
								<span style="color:#5a5a5a !important;font-size:2.3em" class="inputsVentaTotal2  w-100 text-white input-group-text text-center" id="inputGroup-sizing-lg"><b>Total:</b> </span>
							</div>
							<input  style="color:#5a5a5a !important;width:100%;font-size:2.3em;" v-model="total"  readonly type="text" disabled class="inputsVentaTotal2 font-weight-bold text-center mr-5 w-100 form-control manicuristaFocus"  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">

							
						</div>
						
					</div>
					<div style="height:40%" class="col-sm-6">
						<div v-if="!inspector" style="font-size:2em"  class="procesarFinale p-2 text-center w-100">
							 <b>Procesar</b>
						</div>
						<div v-else v-on:click="procesar" style="font-size:2em"  class="procesarFinal p-2 text-center w-100">
							 <b>Procesar</b>
						</div>
					</div>
					</div>
					
					
				</div>
			</div>
		</div>
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content" style="-webkit-box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);
-moz-box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);
box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);">
		      <div class="modal-header " v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h5 class="modal-title font-weight-bold text-white" id="exampleModalCenterTitle">Registro cliente</h5>
		        
		      </div>
		      <div class="modal-body">
				  <form v-on:submit.prevent="ingresoCliente">
					<div class="form-group">
						<label for="name">Nombre del cliente <span style="color:red;">*</span></label>
						<input v-model="nombreClienteRegister" type="text" class="form-control w-100 inputsVenta" placeholder="Nombre del cliente">
					</div>
					<div class="form-group">
						<label for="identidad">Teléfono del cliente <span style="color:red;">*</span></label>
						<input v-model="telefonoCliente" type="number" class="form-control w-100 inputsVenta" placeholder="Telefono">
					</div>
					<div class="form-group">
						<label for="identidad">Correo del cliente <span style="color:blue;">+</span></label>
						<input v-model="correoCliente" type="email" class="form-control w-100 inputsVenta" placeholder="Correo">
					</div>
					<div class="form-group">
						<label for="identidad">Instagram del cliente <span style="color:blue;">+</span></label>
						<input v-model="instagramCliente" type="text" class="form-control w-100 inputsVenta" placeholder="Instagram">
					</div>
                    <div class="form-group inputProce">
                        <label for="recomendacion">Registre recomendador <span style="color:blue;">+</span></label>
                        <div class="w-100 " v-on:click="clearInputThree">
							<autocomplete
							ref="autocomplete"
							placeholder="Buscar recomendador"
							:source="clients"
							input-class="esteqlq Three"
							results-property="data"
							:results-display="formattedDisplayThree"
							@selected="addDistributionGroupThree">
							</autocomplete>
							<span v-on:click="clearInputThree" style="position:absolute;top:410px;left:50px;background-color:white;width:70%;">{{recomendSelect}}</span>
						</div>
                    </div>
					<button class="btn w-100 addProce">Agregar cliente</button>
				</form>
		      </div>
		    </div>

		  </div>
		</div>
		<div class="modal fade" id="myModalAddServiceFast" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content" style="-webkit-box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);
-moz-box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);
box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);">
		      <div class="modal-header"  v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar servicio</h5>
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="registroServicio">
						<div class="form-group">
							<label for="name">Nombre del servicio</label>
							<input v-model="nombreServi" type="text" class="form-control inputsVenta w-100" placeholder="Nombre servicio">
						</div>
						<div class="form-group">
							<label for="nombre">Tiempo</label>
							<select class="form-control inputsVenta w-100" v-model="tiempoServi">
								<option style="color:black;" selected value="Seleccione el tiempo">Seleccione el tiempo</option>
								<option style="color:black;" value="15">15 Minutos</option>
								<option style="color:black;" value="30">30 Minutos</option>
								<option style="color:black;" value="45">45 Minutos</option>
								<option style="color:black;" value="60">60 Minutos</option>
								<option style="color:black;" value="90">90 Minutos</option>
								<option style="color:black;" value="120">120 Minutos</option>
							</select>
						</div>
						<div class="form-group">
							<label for="name">Precio</label>
							<input v-model="precioServi" type="text" class="form-control w-100 inputsVenta" placeholder="Precio">
						</div>
						<div class="form-group row" style="margin-top:-15px;">
							<input type="text" id="myInputServFast" v-on:keyup="myFunctionServFast()" class="form-control buscar inputsVenta w-100 mt-2" placeholder="Buscar prestadores"/>
							<div class="ListaProcesarServ maxHeight">
								<table class="table tableBg" id="myTableServFast">
									<tbody>
										<tr v-for="(manicurista, index) of manicuristas" >
											<td class="font-weight-bold">
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
						<button class="btn w-100 addProce">Agregar</button>
					</form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="myModalRegisterFund" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content p-1" style="-webkit-box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);
-moz-box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);
box-shadow: 0px 0px 22px 5px rgba(65,67,97,1);">
		      <div class="modal-header"  v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registre un fondo de caja</h5>
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="registroFondo">
					<div class="row">
						<div class="form-group col-6">
							<label for="name">Nombre del cajero</label>
							<input v-model="nombreCaja" type="text" class="form-control inputsVenta w-100" placeholder="Ingrese su nombre">
						</div>
						<div class="form-group col-6">
							<label for="name">Fondo de caja</label>
							<input v-model="montoCaja" type="text" class="form-control inputsVenta w-100" placeholder="Ingrese el fondo de la caja">
						</div>
						<button class="btn w-100 addProce">Ingresar</button>
					</div>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
		<div v-bind:style="{  'height': '5vh', 'z-index' : '1000' }" v-on:click="verificacionCliente"  class="p-2 menuVerVentas navSVenta" v-on:mouseenter="mouseOverVenta('textOne',0)" v-on:mouseleave="mouseLeaveVenta('textOne',0)">
			<div class="row">
				<div class="col-sm-2">
					<font-awesome-icon class="icons" style="color:#6BB2E5;font-size:1.6em" icon="user-plus" />
				</div>
				<div  class="col-sm-10 pl-4 pt-1 textOne">
					<b>Nuevo Cliente</b>	
				</div>
			</div>	
        </div>
		<div v-bind:style="{  'height': '5vh', 'z-index' : '1000' }" v-on:click="addService" class="p-2 menuVerServi navSServi" v-on:mouseenter="mouseOverVenta('textTwo',1)" v-on:mouseleave="mouseLeaveVenta('textTwo',1)">
			<div class="row">
				<div class="col-sm-2">
					<font-awesome-icon class="icons" style="color:#6BB2E5;font-size:2em" icon="folder-plus" />
				</div>
				<div  class="col-sm-10 pl-4 pt-1 textTwo">
					<b>Nuevo Servicio</b>	
				</div>
			</div>
        </div>
		<div v-bind:style="{  'height': '5vh', 'z-index' : '1000' }" v-on:click="borrarServicios()" class="p-2 menuVerRedo navSRedo" v-on:mouseenter="mouseOverVenta('textThree',2)" v-on:mouseleave="mouseLeaveVenta('textThree',2)">
			<div class="row">
				<div class="col-sm-2">
					<font-awesome-icon class="icons" style="color:#6BB2E5;font-size:2em" icon="redo" />
				</div>
				<div  class="col-sm-10 pl-4 pt-1 textThree">
					<b>Reiniciar Venta</b>	
				</div>
			</div>
        </div>
	</div>
</template>

<script type="text/javascript">
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
import Autocomplete from 'vuejs-auto-complete'
	class Manicurista{
		constructor(nombre) {
			this.nombre = nombre;
			
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
	 components:{
		 Autocomplete
	 },
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
			nombreCaja:'',
			montoCaja: '',
			pagoEfectivo: '',
			pagoOtros: '',
			pagoRedCDebito: '',
			pagoRedCCredito: '',
			pagoTransf: '',
			nombreCliente: '',
			pagoEfectivoSinformato: '',
			pagoOtrosSinformato: '',
			pagoRedCDebitoSinformato: '',
			pagoRedCCreditoSinformato: '',
			pagoTransfSinformato: '',
			nombreClienteRegister:'',
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
			tiempoServi:'Seleccione el tiempo',
			precioServi:'',
			clients: [],
			arregloClients: [],
			diseño:'',
			resto: 0,
			servicesProcess: [],
			listServicesProcess: [],
			subTotal: 0,
			idProcess: '',
			recomendSelect: '',
			telefonoCliente: '',
			correoCliente: '',
			instagramCliente: '',
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
		this.intervalM();

	},
	methods: {
		arrayMani(){
				for (let index = 0; index < this.manicuristas.length; index++) {
					this.arregloManicuristas.push(this.manicuristas[index].nombre)
				}
		},
		arrayUsers(){	
				for (let index = 0; index < this.clients.length; index++) {
					this.arregloClients.push(this.clients[index].nombre+'-'+this.clients[index].identidad)
				}
		},
		
		searchClient(input){
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
				this.nombreCliente = group.display
				const split = this.nombreCliente.split('-')
				axios.get('clients/dataDiscount/'+split[1])
				.then(res => {
					if (res.data[0].participacion == 0) {
						this.descuento = 10
					}
				})
			}, 100);
			// access the autocomplete component methods from the parent
			// this.$refs.autocomplete.clear()
			// $('.esteqlq').val(group.display)
			
		},
		formatClass(value){
			if (value) {
				const split = value.split(' ')
				if (split[1]) {
					return split[0]+split[1]
				}else{
					return split[0]
				}
				
			}
		},
		formattedDisplayTwo (result) {
		return result.nombre
		},
		addDistributionGroupTwo (group) {
			this.inspector = true
			setTimeout(() => {
				this.maniSelect = group.display
				this.elegirManicurista()
			}, 100);
			// access the autocomplete component methods from the parent
			// this.$refs.autocomplete.clear()
			// $('.esteqlq').val(group.display)
			
		},
		formattedDisplayThree (result) {
			return result.nombre+'-'+result.identidad
		},
		addDistributionGroupThree (group) {
			setTimeout(() => {
				this.recomendSelect = group.display
			}, 100);
			// access the autocomplete component methods from the parent
			// this.$refs.autocomplete.clear()
			// $('.esteqlq').val(group.display)
			
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
		formatDiscount(){
			console.log(this.diseño.length)
				
				if (this.diseño.length == 0) {
					this.totalSinFormato = parseFloat(this.totalSinFormato) - parseFloat(this.resto)
					this.total = "$" + this.formatPrice(this.totalSinFormato)
					this.resto = 0
					
				}
				else{
				this.totalSinFormato = parseFloat(this.totalSinFormato) - parseFloat(this.resto)
				this.totalSinFormato = parseFloat(this.totalSinFormato) + parseFloat(this.diseño)
				this.total = "$" + this.formatPrice(this.totalSinFormato)
				this.resto = this.diseño
				}
				console.log(this.resto)
				console.log()
		},
		getManicuristas(){
			axios.get('manicuristas')
			.then(res => {
				this.arregloManicuristas = []
				this.manicuristas = res.data
				this.arrayMani()
				axios.get('users/clientes')
				.then(res => {
					this.arregloClients = []
					this.clients = res.data
					this.arrayUsers()
					axios.get('servicios')
					.then(res => {
						this.servicios = res.data
					})
				})
			}),
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
			if (this.nombreClienteRegister == '' || this.telefonoCliente == '') {
				this.$swal({
					type: 'error',
					title: 'Llene los campos requeridos',
					showConfirmButton: false,
					timer: 1500
				})
			}else{
				axios.post('clients', {
					nombre:this.nombreClienteRegister,
					identidad:this.telefonoCliente,
					correoCliente: this.correoCliente,
					instagramCliente: this.instagramCliente,
					recomendador:this.recomendSelect
				})
				.then(res => {
					if (res.data.status == 'Registrado') {
						this.$swal({
							type: 'success',
							title: 'Cliente registrado',
							showConfirmButton: false,
							timer: 1500
						})
						this.getManicuristas()
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
			}	
		},
		elegirManicurista(){
			axios.get('manicuristas/justone/' + this.maniSelect)
			.then(res => {
				this.documentoManicurista = res.data.documento
				this.nombreManicurista = this.maniSelect
				console.log(this.documentoManicurista)
			})
			.catch(err => {
				console.log(err)
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
				this.precio = "$"+this.formatPrice(subTotal)
				this.subTotal = subTotal
				this.totalSinFormato = subTotal
				if(this.descuento == ""){
					this.total = "$"+this.formatPrice(subTotal)
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
				const precioConDescuento = parseFloat(this.subTotal) * parseFloat(porcentaje)
				
				this.total = "$"+ this.formatPrice(precioConDescuento)
				this.totalSinFormato = precioConDescuento
			}else if(this.descuento == '' || this.descuento == 0){
				this.totalSinFormato = this.subTotal
			}
		},
		conteoServicio(esto, servicio, precio, comision){
			const descuento = parseFloat(this.descuento) / 100
			const porcentaje = 1 - parseFloat(descuento)
			const precioTotal = parseFloat(this.subTotal) + parseFloat(precio)
			console.log(parseFloat(this.precio))
			this.precio = "$"+this.formatPrice(precioTotal)
			this.subTotal = precioTotal
			this.totalSinFormato = "$"+this.formatPrice(precioTotal)
			if(this.descuento === ''){
				this.total = "$"+this.formatPrice(precioTotal)
			}else{
				const precioConDescuento = parseFloat(this.subTotal) * parseFloat(porcentaje)
				this.total = "$"+this.formatPrice(precioConDescuento)
				this.totalSinFormato = precioConDescuento
			}

			const conteo = $("#"+esto).text()
			const conteoTotal = parseFloat(conteo) + 1
			$("#"+esto).text(conteoTotal)
			const servicios = {'servicio': servicio, 'comision': comision, 'precio': precio}
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
			console.log(this.maniSelect)
			console.log(this.serviciosSelecionados)
			axios.put('ventas/updateProviderMonth/' + this.maniSelect)
			.catch(err => {
				console.log(err)
			})
		},
		registroFondo(){
			axios.post('ventas/registerFund', {
				userRegister: this.nombreCaja,
				amount: this.montoCaja
			}).then(res => {
				if (res.data.status == 'ok') {
					this.$swal({
						type: 'success',
						title: '¡Ya puede ingresar ventas!',
						showConfirmButton: false,
						timer: 1500
					})
					$('#myModalRegisterFund').modal('hide')
					this.montoCaja = ''
                    this.nombreCaja = ''
				}
			})
		},
		getDataToDate(id){
			this.inspector = true
			this.servicesProcess = []
			this.serviciosSelecionados = []
			this.idProcess = id
			axios.get('citas/getDataToDate/'+id)
			.then(res => {
				this.nombreCliente = res.data.client
				this.maniSelect = res.data.employe
				this.servicesProcess = res.data.services
				this.elegirManicurista()
				const split = res.data.client.split('/')
				const splitTwo = split[1].split(' ')
				axios.get('clients/dataDiscount/'+splitTwo[1])
				.then(res => {
					if (res.data[0].participacion == 0) {
						this.descuento = 10
					}
					axios.get('servicios')
					.then(res => {
						var subTotal = 0
						for (let index = 0; index < this.servicesProcess.length; index++) {
							this.serviciosSelecionados.push({servicio: this.servicesProcess[index].servicio, comision: this.servicesProcess[index].comision, precio: this.servicesProcess[index].precio})
							let valSpan = ''
							let sumaVal = 0
							for (let indexTwo = 0; indexTwo < res.data.length; indexTwo++) {
								console.log(indexTwo)
								if (this.servicesProcess[index].servicio == res.data[indexTwo].nombre) {
									subTotal = subTotal + parseFloat(res.data[indexTwo].precio)
									let valSpan = $(`#${res.data[indexTwo]._id}`).text()
									let sumaVal = parseFloat(valSpan) + 1
									$(`#${res.data[indexTwo]._id}`).text(sumaVal)
								}
							}
						}
						this.precio = '$'+this.formatPrice(subTotal)
						if (this.descuento == 10) {
							subTotal = subTotal * 0.90
						}else{
							subTotal = subTotal
						}
						this.total = '$'+this.formatPrice(subTotal)
						this.totalSinFormato = subTotal
					})
				})
			})
		},
		hundredPorcent(tipo){
			if (this.pagoEfectivo != '' || this.pagoTransf != '' || this.pagoRedCCredito != '' || this.pagoRedCDebito != '' || this.pagoOtros != '' ) {
				this.$swal({
					type: 'error',
					title: '¡El monto sobrepasa el total!',
					showConfirmButton: false,
					timer: 2000
				})
			}
			else{
				if (tipo == "efectivo") {
					this.pagoEfectivoSinformato = this.totalSinFormato
					this.pagoEfectivo = '$ '+this.formatPrice(this.totalSinFormato)
				}
				if (tipo == "transferencia") {
					this.pagoTransfSinformato = this.totalSinFormato
					this.pagoTransf = '$ '+this.formatPrice(this.totalSinFormato)
				}
				if (tipo == "otros") {
					this.pagoOtrosSinformato = this.totalSinFormato
					this.pagoOtros = '$ '+this.formatPrice(this.totalSinFormato)
				}
				if (tipo == "credito") {
					this.pagoRedCCreditoSinformato = this.totalSinFormato
					this.pagoRedCCredito = '$ '+this.formatPrice(this.totalSinFormato)
				}
				if (tipo == "debito") {
					this.pagoRedCDebitoSinformato = this.totalSinFormato
					this.pagoRedCDebito = '$ '+this.formatPrice(this.totalSinFormato)
				}
			}
		},
		erasedFormat(type){
			if(type == 'pagoEfectivo'){
				this.pagoEfectivoSinformato = ''
				this.pagoEfectivo = ''
			}
			if(type == 'pagoOtros'){
				this.pagoOtrosSinformato =''
				this.pagoOtros = ''
			}
			if(type == 'pagoTransf'){
				this.pagoTransfSinformato = ''
				this.pagoTransf = ''
			}
			if(type == 'pagoRedCDebito'){
				this.pagoRedCDebitoSinformato = ''
				this.pagoRedCDebito = ''
			}
			if(type == 'pagoRedCCredito'){
				this.pagoRedCCreditoSinformato = ''
				this.pagoRedCCredito = ''
			}
		},
		formato(type){
			if(type == 'pagoEfectivo'){
				this.pagoEfectivoSinformato = this.pagoEfectivo
				this.pagoEfectivo = '$ '+this.formatPrice(this.pagoEfectivo)
			}
			if(type == 'pagoOtros'){
				this.pagoOtrosSinformato = this.pagoOtros
				this.pagoOtros = '$ '+this.formatPrice(this.pagoOtros)
			}
			if(type == 'pagoTransf'){
				this.pagoTransfSinformato = this.pagoTransf
				this.pagoTransf = '$ '+this.formatPrice(this.pagoTransf)
			}
			if(type == 'pagoRedCDebito'){
				this.pagoRedCDebitoSinformato = this.pagoRedCDebito
				this.pagoRedCDebito = '$ '+this.formatPrice(this.pagoRedCDebito)
			}
			if(type == 'pagoRedCCredito'){
				this.pagoRedCCreditoSinformato = this.pagoRedCCredito
				this.pagoRedCCredito ='$ '+ this.formatPrice(this.pagoRedCCredito)
			}
			
		},
		procesar() {
			if (this.pagoEfectivoSinformato == '') {
				this.pagoEfectivoSinformato = 0
			}
			if (this.pagoOtrosSinformato == '') {
				this.pagoOtrosSinformato = 0
			}
			if (this.pagoTransfSinformato == '') {
				this.pagoTransfSinformato = 0
			}
			if (this.pagoRedCDebitoSinformato == '') {
				this.pagoRedCDebitoSinformato = 0
			}
			if (this.pagoRedCCreditoSinformato == '') {
				this.pagoRedCCreditoSinformato = 0
			}
			if (this.descuento == '') {
				this.descuento = 0
			}
			if (this.diseño == '') {
				this.diseño = 0
			}
			const totalFormadePago = parseFloat(this.pagoEfectivoSinformato) + parseFloat(this.pagoOtrosSinformato) + parseFloat(this.pagoTransfSinformato) + parseFloat(this.pagoRedCDebitoSinformato) + parseFloat(this.pagoRedCCreditoSinformato)
			console.log(totalFormadePago)
			if (this.nombreCliente != '' && this.maniSelect != '') {
				if (this.totalSinFormato == totalFormadePago ) {
					axios.post('ventas/procesar', {
						cliente: this.nombreCliente,
						manicurista: this.maniSelect,
						servicios: this.serviciosSelecionados,
						pagoEfectivo:this.pagoEfectivoSinformato,
						pagoOtros:this.pagoOtrosSinformato,
						pagoRedCDebito:this.pagoRedCDebitoSinformato,
						pagoRedCCredito:this.pagoRedCCreditoSinformato,
						pagoTransf:this.pagoTransfSinformato,
						descuento:this.descuento,
						fecha:this.fechaVenta,
						total: this.totalSinFormato,
						ifProcess: this.idProcess,
						diseno: this.diseño,
						totalSinDesign: this.subTotal,
						documentoManicurista: this.documentoManicurista
					})
					.then(res => {
						
						if (res.data.status == "Venta registrada") {
							this.$swal({
								type: 'success',
								title: 'Venta procesada',
								showConfirmButton: false,
								timer: 1500
							})
							this.borrarServicios()
							EventBus.$emit('reloadCitas', 'process')
						}else if(res.data.status == "no-cash"){
							this.$swal({
								type: 'error',
								title: 'Primero debe registrar un fondo de caja',
								showConfirmButton: false,
								timer: 1500
							})
							$('#myModalRegisterFund').modal('show')
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
						title: 'Total no coincide, con los montos en medios de pago',
						showConfirmButton: false,
						timer: 2000
					})
					if (this.pagoEfectivo == 0) {
						this.pagoEfectivo = ''
					}
					if (this.pagoOtros == 0) {
						this.pagoOtros = ''
					}
					if (this.pagoRedC == 0) {
						this.pagoRedC = ''
					}
					if (this.pagoTransf == 0) {
						this.pagoTransf = ''
					}
				}	
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
			this.diseño = ''
			this.pagoEfectivo = ''
			this.pagoOtros = ''
			this.pagoRedCDebito = ''
			this.pagoRedCCredito = ''
			this.pagoTransf = ''
			this.pagoEfectivoSinformato = ''
			this.pagoOtrosSinformato = ''
			this.pagoRedCDebitoSinformato = ''
			this.pagoRedCCreditoSinformato = ''
			this.pagoTransfSinformato = ''
			this.maniSelect = ''
			this.nombreCliente = ''
			this.resto  = 0
			this.inspector = false
		},
		mouseOverVenta(clase,num){
		setTimeout(() => {
			
			$('.'+clase).show("slow")
			$('.icons').eq(1).addClass("iconsProce")
		
		}, 500);
		
		},
		mouseLeaveVenta(clase,num){
			$('.'+clase).hide()		
		},
		intervalM(){
			setInterval(() => {
				if ($(".navSVenta").width() < "100" ) {
				$('.textOne').hide("slow")
				
			}
			if ($(".navSServi").width() < "100" ) {
				$('.textTwo').hide("slow")
				
			}
			if ($(".navSRedo").width() < "100" ) {
				$('.textThree').hide("slow")
				
			}
			}, 500);
		},
		formatPrice(value) {
			let val = (value/1).toFixed(2).replace('.', ',')
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		disFormat(value){
			let valor = parseFloat(value)
			let val = (valor).replace(',', '.')
			console.log(val.toFixed(0))
			console.log(val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ""))
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "")
			
		},
		
		hundredMouseOver(tipo){
			$("."+tipo).toggle()
		},
		hundredMouseNonOver(tipo){
			$("."+tipo).toggle()
		},
		clearInput(){
		this.nombreCliente = ''
		$('.one').focus()
		},
		clearInputTwo(){
		this.maniSelect = ''
		$('.two').focus()
		},
		clearInputThree(){
		this.recomendSelect = ''
		$('.Three').focus()
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
		},
		mounted() {
			EventBus.$on('reload-services', status => {
				this.getManicuristas()
			})
			EventBus.$on('process', id => {
				this.getDataToDate(id)
			})
		}
 }
</script>
<style media="screen">
	.inputs{
		border:none;
		border-radius:0px !important;
		border-bottom:2px solid #102229 !important;
		border-right:2px solid #102229 !important;
		background-color:transparent !important;
		color:black !important;
		font-family: 'Roboto', sans-serif !important;
		letter-spacing: .09em;
	}
	.spanInputs{
		border:none !important;
		border-right: 2px solid #1F5673 !important;
		border-left: 2px solid #1F5673 !important;
		border-bottom: 2px solid #1F5673 !important;
		border-radius: 0px !important;
		background-color:transparent !important;
		font-size: 0.8em !important;
		font-family: 'Raleway', sans-serif;
		font-weight:400;
		color:black !important
	}
	@media (max-width: 1000px) {
		.spanInputs{
			font-size: 0.6em !important;
		}
		.contenedor{
			width:60%;
			min-width:400px;
			border:2px solid #102229;
			padding-top:12px;
			background-color: #fff;
			min-width: 455px;
		}
	}
	.plusBtns{
		background-color:#1F5673;
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
	
	.procesar:hover{
		color:white;
		background-color:#1F5673;
		transition: all 0.5s ease-out;
	}
	.tableBg{
		
		background-color:transparent !important;
		
	}
	.tableBg tbody tr{
		border-radius: 5px;
		margin-bottom:1% !important;
	}
	.contenedor{
		width:40%;
		
		padding-top:12px;
		background-color: transparent;
		min-width: 100%;
	}
	.btn-back{
		background-color:black;
		color:#fff;
		cursor:pointer;
	}
	.selectPago{
		background-color:#1F5673 !important;
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
		color: black;
	}
	.addProce{
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
	.addProc{
		background-color:#28a745;
		color: #fff;
		border-radius: 5px !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
		-webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-webkit-transition: all 0.5s ease-out;
	}
	.addProc:hover{
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
		right:8%;
		top:17%;
		font-size:1.4em
	}
	.icon-add{
		position:absolute;
		right:3%;
		top:16%;
		font-size:2.3em;
		cursor: pointer;
		color: #28a745;
		
		-webkit-transition: all 0.5s ease-out;
	}	
	.buscar{
		border-left:2px solid #102229 !important;
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

	
	.autoProcess {
		width: 100%;
	}
	
	.inputsVenta{
		background-color: transparent !important;
		-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		border: none !important;
		border-radius: 5px;
		padding: 10px;
		width: 50% ;
		color: black !important;
	}
	.inputsVentaTotal{
		background-color: transparent !important;
		-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		border: none !important;
		border-radius:0 0 0 5px;
		padding: 10px;
		width: 50% ;
		color: black !important;
	}
	.inputsVentaTotal2{
		background-color: transparent !important;
		
		border: none !important;
		
	}
	.procesarFinal{
		height: 100%;
		width: 100%;
		background-color: #00b7cb;
		color: azure;
		border-radius: 30px;
		margin-left:-10px; 
		cursor: pointer;
		-webkit-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		-moz-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		transition: all 0.5s ease-out;
	}
	.procesarFinale{
		height: 100%;
		width: 100%;
		background-color: #9ca0a0;
		color: rgba(240, 255, 255, 0.404);
		border-radius: 30px;
		margin-left:-10px;
		-webkit-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		-moz-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		transition: all 0.5s ease-out;
	}
	.procesarFinal:hover{
		height: 100%;
		width: 100%;
		font-size: 2.2em !important;
		background-color: #28a745;
		color: azure;
		border-radius: 30px;
		margin-left:-10px; 
		cursor: pointer;
		-webkit-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		-moz-box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.79);
		
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

	.contRadio {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.contRadio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkRadio {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.contRadio:hover input ~ .checkRadio {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.contRadio input:checked ~ .checkRadio {
  background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkRadio:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.contRadio input:checked ~ .checkRadio:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.contRadio .checkRadio:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}
.menuVerVentas{
	transition: all 0.5s ease-out;
	
}
.navSVenta{
	cursor: pointer;
	width:7%;
	top:3.5%;
	right:-7%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerServi{
	transition: all 0.5s ease-out;
	
}
.navSServi{
	cursor: pointer;
	width:7%;
	top:9.5%;
	right:-7%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerRedo{
	transition: all 0.5s ease-out;
	
}
.navSRedo{
	cursor: pointer;
	width:7%;
	top:15.5%;
	right:-7%;
	background-color: white;
	position: absolute;
	border-radius: 0 5px 5px 0;
}
.menuVerVentas:hover{
	width: 25%;
	right:-25%;
	z-index:2;
}
.menuVerServi:hover{
	width: 25%;
	right:-25%;
	z-index:2;
}
.menuVerRedo:hover{
	width: 25%;
	right:-25%;
	z-index:2;
}

.iconsProce{
	padding-right: 5px;
	border-right: 1px solid rgba(0, 0, 0, 0.404) ;
}
.textOne{
	display: none;
}
.textTwo{
	display: none;
}
.textThree{
	display: none
}
.hundred{
	cursor: pointer;
	transition: all 0.5s ease-out;
}
.hundred:hover{
	background-color: rgba(31, 86, 115, 0.342);
	color: white !important;
	border-radius: 5px;
}
.inputProce .autocomplete__box{
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
	.inputProce .esteqlq{
		outline: none !important;
		background-color: transparent !important;
		border: none !important;
		border-radius: 5px;
		padding: 10px;
		width: 50% ;
		color: black !important;
		width: 100%;
	}
.inputProce .autocomplete__results{
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
.inputProce .autocomplete__results__item{
	outline: none !important;
	padding: 13px !important;
}
</style>
