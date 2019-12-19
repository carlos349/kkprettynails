<template>
	<div class="container-fluid">
		<!-- <div class="row">
			<div class="container formGastos">
				<form v-on:submit.prevent="registerExpense">
					<input type="text" placeholder="Gasto" v-model="expenseRegister" >
					<button type="submit" class="btn buttonExpense">Registrar Gasto</button>
				</form>
			</div>
			<div class="col-md-12 row">
				<div v-for="(expense, index) of expenses" class="col-md-3 col-sm-6">
					<div v-if="index % 2 == 0" class="first metrics">
						<p>{{expense.expenses}}</p>
						<h1>{{expense.figure}}</h1>
					</div>
					<div v-else class="second metrics">
						<p>{{expense.expenses}}</p>
						<h1>{{expense.figure}}</h1>
					</div>
				</div>
			</div>
		</div> -->

		<div class="row pt-2 pl-5">
			<div class="col-md-4 mb-3">
				<div class="formsExpense" >
					<h2 class="p-3" v-bind:style="{ 'background-color': '#1f5673'}">Registrar gasto</h2>
					<form v-on:submit.prevent="registerExpense">
						<div class="form-group">
							<label for="name">Razón del gasto</label>
							<input v-model="reason" type="text" class="form-control inputs" placeholder="Escriba la razón">
						</div>
						<div class="form-group">
							<label for="name">Monto</label>
							<input v-model="amount" type="number" class="form-control inputs" placeholder="Escriba el monto">
						</div>
						<div class="form-group">
							<label for="name">Fecha</label>
							<date-pick class="form-control inputss"
								v-model="date"
							    :weekdays=Days
								:months=months
								:nextMonthCaption="'Siguiente mes'"
								:prevMonthCaption="'Mes anterior'"
							  ></date-pick>
						</div>

						<button class="btn w-100 add">Agregar</button>
					</form>
				</div>
			</div>
			<div class="col-md-8">
				<div class="small">
					<line-chart v-if="loaded" :chartdata="chartdata" :options="options" :styles="myStyles"/>
				</div>
			</div>
			<div class="col-12">
				<div class="shadow">
					<v-client-table class="text-center"  :data="expenses" :columns="columns" :options="optionsT">
						<p slot="datee"  slot-scope="props">{{formatDate(props.row.date)}}</p>
						<div slot="typee"  slot-scope="props">
							<p v-if="props.row.type == 'Advancement'">
										Avance
							</p>
							<p v-else-if="props.row.type == 'expense'">
								Gasto
							</p>
							<p v-else>
								Bono
							</p>
						</div>
						<p slot="mountt"  slot-scope="props">{{formatPrice(props.row.figure)}}</p>
					</v-client-table>	
					<!-- <table  class="table" v-bind:style="{ 'background-color': '#1f5673'}" style="color:#fff !important" >
						<thead>
							<tr>
								<th>
									Razón del gasto
								</th>
								<th>
									Tipo
								</th>
								<th>
									Monto
								</th>
								<th>
									Fecha
								</th>	
							</tr>
						</thead>
					</table>	
					<div class="ListaInventario tbl-content">
						<table class="table table-light table-borderless table-striped text-left" style="font-size:.8em">
							<tbody>
								<tr v-for="(expense, index) of expenses">
									<td>
										{{expense.expense}}
									</td>
									<td v-if="expense.type == 'Advancement'">
										Avance
									</td>
									<td v-else-if="expense.type == 'expense'">
										Gasto
									</td>
									<td v-else>
										Bono
									</td>
									<td>
										{{formatPrice(expense.figure)}}
									</td>
									<td>
										{{formatDate(expense.date)}}
									</td>
								</tr>
							</tbody>
						</table>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import router from '../router'
	import axios from 'axios'
	import LineChart from '../plugins/LineChart.js'
	import DatePick from 'vue-date-pick';
	import 'vue-date-pick/dist/vueDatePick.css';

	class Expenses{
		constructor(expenses, figure) {
			this.expenses = expenses;
			this.figure = figure;
		}
	}

	export default {
		components: {
			LineChart,
			DatePick
		},
		data(){
			return {
				columns:['expense' , 'date' , 'typee' , 'mountt' ],
				optionsT: {
					filterByColumn: true,
					texts: {
						filter: "Filtrar:",
						filterBy: 'Filtrar por {column}',
						count:' '
					},
					headings: {
						expense: 'Razón del gasto ',
						date: 'Fecha ',
						typee: 'Tipo ',
						mountt: 'Monto '
					},
					pagination: { chunk:10 },
					pagination: { dropdown:true },
					pagination: { nav: 'fixed' },
					pagination: { edge: true },
					sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
					sortable: ['expense', 'date'],
					filterable: ['expense', 'date']
				},
				expense: new Expenses(),
				expenses: [],
				reason: '',
				amount: '',
				date:'Click para elegir fecha',
				options: {
					responsive: true,
					maintainAspectRatio: false
				},
				loaded: false,
				chartdata: null,
				height:360,
				Days:['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'],
				months:[
					'Enero', 'Febrero', 'Marzo', 'Abril',
					'Mayo', 'Junio', 'Julio', 'Agosto',
					'Septiembre', 'Octubre', 'Noviembre', 'Diciembrer'
				]
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
			this.getExpenses();
			this.CompareSalesAndExpenses();
		},
		methods: {
			registerExpense(){
				if (this.reason != '' && this.amount != '' && this.date != '') {
					axios.post('expenses', {
						reason: this.reason,
						amount: this.amount,
						dateSelect: this.date
					})
					.then(res => {
						if (res.data.status === 'ok') {
							this.$swal({
								type: 'success',
								title: 'Gasto registrado',
								showConfirmButton: false,
								timer: 1500
							})
							this.reason = ''
							this.amount = ''
							this.date = ''
							this.getExpenses()
						}else{
							this.$swal({
								type: 'info',
								title: 'Se resgistro el adelanto, pero no se registro en el cierre, ya que no hay un cierre de ventas para dicha fecha',
								showConfirmButton: true
							})
							this.reason = ''
							this.amount = ''
							this.date = ''
							this.getExpenses()
						}
					})
					.catch(err => {
						this.$swal({
							type: 'error',
							title: 'Hubo un problema tecnico :(',
							showConfirmButton: false,
							timer: 1500
						})
					})
				}else{
					this.$swal({
						type: 'error',
						title: 'Por favor, llenar todos los campos',
						showConfirmButton: false,
						timer: 1500
					})
				}
			},
			getExpenses(){
				axios.get('expenses')
				.then(res => {
					this.expenses = res.data
					console.log(this.expenses)
					for (let i = 0; i < this.expenses.length; i++) {
						this.expenses[i].date = this.formatDate(this.expenses[i].date)
					}
				})
			},
			CompareSalesAndExpenses(){
				this.loaded = false
				axios.get('/manicuristas/CompareSalesAndExpenses')
				.then(res => {	
					const userlist = res.data
					this.chartdata = userlist
					this.loaded = true
				})
				.catch(err => {
					console.error(err)
				})
			},
			formatDate(date) {
				let dateFormat = new Date(date)
				return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
			},
			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			}
		},
		computed: {
			myStyles (){
				return {
					height: `${this.height}px`,
					position: 'relative'
				}
			}
		}
	}
</script>
<style>
	.buttonExpense{
		border: solid 2px #FF512F;
		color:#FF512F !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
		width: 40%;
	}
	
	.small{
		background-color: #fff;
		margin-top: 20px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
	label{
		color:black
	}
	.ListaInventario{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 45vh;
		height:auto;
		border-radius:5px;
	}
	.ListaInventario::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
	.formsExpense{
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		padding: 20px;
		max-height: 80vh;
		height:auto;
		border-radius:5px;
	}
	
	.formsExpense::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
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
	.inputs{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #001514 !important;
		background-color:transparent !important;
		color:#001514 !important;
		font-family: 'Roboto', sans-serif !important;
	}
	.inputss input{
		width: 100%;
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #001514 !important;
		background-color:transparent !important;
		color:#001514 !important;
		font-family: 'Roboto', sans-serif !important;
	}
	.vdpCell.selected .vdpCellContent{
		background-color: rgb(31, 86, 115) !important;
		
	}
	.vdpCell:hover .vdpCellContent{
		background-color: rgb(31, 86, 115) !important;
	}
	.vdpCell.today{
		color:rgb(31, 86, 115) !important;
	}
	.vdpArrowNext:after{
		border-left-color:rgb(31, 86, 115) !important;
	}
	.vdpArrowPrev:after{
		border-right-color:rgb(31, 86, 115) !important;
	}
	.formGastos input{
		width: 40%;
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
	}
	.formGastos input:focus{
		border-bottom:solid 2px #FF512F;
		transition: all 0.3s ease-out;
	}
	.formGastos form{
		margin-left: 10%;
	}
	.vue-title {
		text-align: center;
		margin-bottom: 10px;
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

	thead {
		background-color: #1f5673;
		color: #fff;
		text-align: center
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
	.VuePagination {
		text-align: center;
		display:block !important;
	}
</style>