<template>
	<div class="container-fluid">
		<div class="col-12 row pt-5">
			<div class="col-md-4">
				<div class="forms">
					<h2 class="p-3" v-bind:style="{ 'background-color': '#1f5673'}">Registrar producto</h2>
					<form v-on:submit.prevent="addProduct">
						<div class="form-group">
							<label for="name">Nombre del producto</label>
							<input v-model="product" type="text" class="form-control inputs" placeholder="Nombre del producto">
						</div>
						<div class="form-group">
							<label for="name">Marca</label>
							<input v-model="brand" type="numbre" class="form-control inputs" placeholder="Marca del producto">
						</div>
						<div class="form-group">
							<label for="name">Gramos</label>
							<input v-model="grams" type="text" class="form-control inputs" placeholder="Gramos del producto">
						</div>
						<div class="form-group">
							<label for="name">Cantidad</label>
							<input v-model="quantity" type="text" class="form-control inputs" placeholder="Cantidad">
						</div>
						<div class="form-group">
							<label for="name">Monto</label>
							<input v-model="amount" type="text" class="form-control inputs" placeholder="Precio">
						</div>
						<div class="form-group" style="margin-top:-15px;">
							<div>
								<input type="text" id="myInputInvent" v-on:keyup="myFunctionInvent()" class="form-control buscar inputs" placeholder="Buscar servicios"/>
							<font-awesome-icon class="lupa-modal" icon="search"/>
							</div>
							
							<div class="ListaProcesar maxHeightInvent">
								<table class="table table-dark tableBg" id="myTableInvent">
									<tbody>
										<tr v-for="(servicio, index) of servicios" >
											<td class="font-weight-bold">
												{{servicio.nombre}}
											</td>
											<td class="font-weight-bold text-right">
												<label class="conCheck col-sm-2">
												<input :class="servicio._id" class="checkFirst" v-on:click="presSelect(servicio.nombre, servicio._id, index)" type="checkbox">
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
			<div class="col-md-8">
				<div class="shadow">	
					<table  class="table" style="color:#fff !important" v-bind:style="{ 'background-color': '#1f5673'}" >
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
					<div class="ListaInventario tbl-content">
						<table class="table table-light table-borderless table-striped text-left" style="font-size:.8em">
							<tbody>
								<tr v-for="(arrayProduct, index) of arrayProducts">
									<td>
										{{arrayProduct.producto}}
									</td>
									<td>
										{{arrayProduct.marca}}
									</td>
									<td>
										{{arrayProduct.gramos}}Gr.
									</td>
									<td>
										{{arrayProduct.cantidad}}
									</td>
									<td>
										{{formatPrice(arrayProduct.monto)}}
									</td>
									<td>
										{{formatPrice(arrayProduct.montoTotal)}}
									</td>
									<td>
										<!-- <div  v-for="(service,indexTwo) of arrayProduct.servicios">
											- {{service}}
										</div> -->
										{{arrayProduct.servicios.length}}
									</td>
									<td>
										{{fechas[index]}}
									</td>
									<td class="text-center">
										<button style="width:50%;" v-on:click="pasarDatosEdit(arrayProduct.monto,arrayProduct.cantidad,arrayProduct.gramos,arrayProduct.marca,arrayProduct.producto,arrayProduct.servicios,arrayProduct.serviciosId, arrayProduct._id)" class="btn btn-colorsEdit">
											<font-awesome-icon icon="edit" />
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="myModal2" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered"  >
		    <div class="modal-content" v-bind:style="{ 'background-color': '#29323c'}">
		      <div class="modal-header">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Edicion del producto</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div  class="modal-body">
		        <form v-on:submit.prevent="updateProducts">
					<div class="form-group">
						<label for="nombre">Nombre del servicio</label>
						<input type="text" v-model="editProduct" class="form-control inputs" name="nombreServicio" placeholder="Nombre del producto" >
					</div>
					<div class="form-group">
						<label for="nombre">Marca del producto</label>
						<input type="text" v-model="editBrand" class="form-control inputs" name="nombreServicio" placeholder="Marca del producto" >
					</div>
					<div class="form-group">
						<label for="nombre">Gramos del producto</label>
						<input type="text" v-model="editGrams" class="form-control inputs" name="nombreServicio" placeholder="Gramos del producto" >
					</div>
					<div class="form-group">
						<label for="nombre">Cantidad del producto</label>
						<input type="text" v-model="editQuantity" class="form-control inputs" name="nombreServicio" placeholder="Cantidad del producto" >
					</div>
					<div class="form-group">
						<label for="nombre">Precio del producto</label>
						<input type="text" v-model="editAmount" class="form-control inputs" name="nombreServicio" placeholder="Precio del producto" >
					</div>
					<div class="form-group row" style="margin-top:-15px;">
						<input type="text" id="myInputInventEdit" v-on:keyup="myFunctionInventEdit()" class="form-control buscar inputs" placeholder="Seleccione Servicios"/>
						<div class="ListaProcesar maxHeightEdit">
							<table class="table table-dark tableBg" id="myTableInventEdit">
								<tbody>
									<tr v-for="(servicio, index) of servicios" >
										<td class="font-weight-bold text-white">
											{{servicio.nombre}}
										</td>
										<td class="font-weight-bold text-right">
											<label class="conCheck col-sm-2">
											<input :class="servicio.documento" class="desMarc" v-on:click="presSelectTwo(servicio.nombre,servicio._id, index)" type="checkbox">
											<span class="checkmark"></span>
											</label>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<button class="btn btn-lg add btn-block" type="submit">Actualizar producto</button>
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
export default {
	data(){
		return {
			expenseDate:'',
			expenseAmount:'',
			product: '',
			brand: '',
			grams: '',
			quantity: '',
			amount: '',
			editProduct: '',
			editBrand: '',
			editGrams: '',
			editQuantity: '',
			editAmount: '',
			servicios: [],
			serviceSelect: [],
			serviceIdSelect: [],
			serviceIdSelectTwo: [],
			serviceSelectTwo:[],
			fechas: [],
			arrayProducts: [],
			idProductEditar: ''
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
		this.getProducts();
	},
	methods: {
		getServicios() {
			axios.get('servicios')
			.then(res => {
				this.servicios = res.data
				this.TotalServicios = res.data.length
			})
		},
		updateProducts(){
			axios.put('/inventario/'+this.idProductEditar, {
				product:this.editProduct,
				brand:this.editBrand,
				grams:this.editGrams,
				quantity:this.editQuantity,
				amount:this.editAmount,
				services:this.serviceSelectTwo,
				serviceId:this.serviceIdSelectTwo
			})
			.then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
		},
		getProducts() {
			axios.get('inventario')
			.then(res => {
				this.arrayProducts = res.data 
				let fechaBien = ''
				for (let index = 0; index < res.data.length; index++) {
					let fech = new Date(res.data[index].fecha)
					fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ fech.getMinutes()+")"
					this.fechas.push(fechaBien)
				}
			})
		},
		addProduct(){
			axios.post('inventario', {
				product: this.product,
				brand: this.brand,
				grams:this.grams,
				quantity: this.quantity,
				amount: this.amount,
				services: this.serviceSelect,
				servicesId: this.serviceIdSelect
			})
			.then(res => {
				if (res.data.status === 'ok') {
					this.$swal({
						type: 'success',
						title: 'Producto registrado',
						showConfirmButton: false,
						timer: 1500
					})
					this.getProducts();
				}else{
					this.$swal({
						type: 'error',
						title: 'El producto ya existe',
						showConfirmButton: false,
						timer: 1500
					})
				}
			})
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'Problemas con el servidor',
					showConfirmButton: false,
					timer: 1500
				})
				console.log(err)
			})
		},
		registerExpense(){
			axios.post('expenses', {
				expense: this.expenseAmount,
				dateSelect: this.expenseDate
			})
			.then(res => {
				console.log(res.data)
				if (res.data.status == 'ok') {
					this.$swal({
						type: 'success',
						title: 'Gastos registrado',
						showConfirmButton: false,
						timer: 1500
					})
					this.expenseDate = ''
					this.expenseAmount = ''					
				}else{
					this.$swal({
						type: 'error',
						title: 'No hay cierres para esa fecha',
						showConfirmButton: false,
						timer: 1500
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
		},
		pasarDatosEdit(monto,cantidad,gramos,marca,producto,services,servicesId, id){
			this.serviceSelectTwo = []
			$(".desMarc").prop("checked", false)
			this.editProduct = producto
			this.editBrand = marca
			this.editGrams = gramos
			this.editQuantity = cantidad
			this.editAmount = monto
			this.servicesEdit = services
			this.servicesIdEdit = servicesId
			this.idProductEditar = id
			for (let i = 0; i < this.servicesIdEdit.length; i++) {
				if ($("."+this.servicesIdEdit[i])) {
					$("."+this.servicesIdEdit[i]).prop("checked", "true")
					this.serviceSelectTwo.push(this.servicesEdit[i])
					this.serviceIdSelectTwo.push(this.servicesIdEdit[i])
				}
				
			}
			console.log(this.serviceSelectTwo)
			console.log(this.serviceIdSelectTwo)
			$('#myModal2').modal('show')
		},
		presSelect(service, id, index){
			console.log($("."+id).prop("checked"))
			if ($(".checkFirst").is(":checked") == false ) {
				this.serviceSelect = []
				this.serviceIdSelect = []
			}
			if ($("."+id).prop("checked")!=true ) {
				for (let i = 0; i < this.serviceSelect.length; i++) {
					if (this.serviceSelect[i] == service && this.serviceIdSelect[i] == id) {
						this.serviceSelect.splice(i, 1)
						this.serviceIdSelect.splice(i, 1)
						break
					}
				}
			}
			else{
				let select = service
				this.serviceSelect.push(service)
				this.serviceIdSelect.push(id)
			}
			console.log(this.serviceSelect)
		},
		presSelectTwo(service, id, index){
			if ($("."+id).prop("checked")!=true ) {
				for (let i = 0; i < this.serviceSelectTwo.length; i++) {
					if (this.serviceSelectTwo[i] == service && this.serviceIdSelectTwo[i] == id) {
						this.serviceSelectTwo.splice(i, 1)
						this.serviceIdSelectTwo.splice(i, 1)
						break
					}
				}
			}
			else{
				let select = service
				const prestadorSelect = {"prestador": select}
				this.serviceSelectTwo.push(service)
				this.serviceIdSelectTwo.push(id)
			}
		},
		formatPrice(value) {
			let val = (value/1).toFixed(2).replace('.', ',')
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		},
		myFunctionInvent() {
			var input, filter, table, tr, td, i, txtValue;
			input = document.getElementById("myInputInvent");
			filter = input.value.toUpperCase();
			table = document.getElementById("myTableInvent");
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
		myFunctionInventEdit() {
			var input, filter, table, tr, td, i, txtValue;
			input = document.getElementById("myInputInventEdit");
			filter = input.value.toUpperCase();
			table = document.getElementById("myTableInventEdit");
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
	}
}
</script>
<style>
	table{
		border:none !important;
		margin-bottom:0 !important;
		table-layout: fixed;
		color:#102229 !important;
	}
	.forms{
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 90vh;
		height:auto;
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
	.ListaInventario{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 75vh;
		height:auto;
		border-radius:5px;
	}
	.btn-colorsEdit{
		background-color:#495057;
		color:#fff;
	}
	.maxHeightInvent{
		max-height: 200px;
	}
	.ListaInventario::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.inputs{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #001514 !important;
		background-color:transparent !important;
		color:#001514 !important;
		font-family: 'Roboto', sans-serif !important;
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
		background-color: #1F5673;
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
	.buttonExpense{
		border: solid 2px #FF512F;
		color:#FF512F;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
		width: 49%;
		transition: all 0.5s ease-out;
	}
	.buttonExpense:hover{
		color:azure;
		background-color: #FF512F;
		transition: all 0.5s ease-out;
	}
	.buttonExpense .icone{
		color:#FF512F;
	}
	.buttonExpense:hover .icone{
		color:azure;
		transition: all 0.5s ease-out;
	}
	.formGastos input{
		width: 25%;
		padding: 10px;
		border:none;
		background: transparent;
		border-bottom:solid 2px #213b45;
		outline: none;
		color:#102229 !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
		transition: all 0.3s ease-out;
	}
	.formGastos{
		margin-top: 1%;
		background-color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
		padding: 15px;
	}
	.formGastos input:focus{
		border-bottom:solid 2px #FF512F;
		transition: all 0.3s ease-out;
	}
	label{
		color:#fff;
	}

	.lupa-modal{
		position:absolute;
		color:black;
		right:8%;
		top:63.5%;
		font-size:1.4em
	}
	
</style>