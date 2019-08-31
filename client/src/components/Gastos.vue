<template>
	<div class="container-fluid">
		<div class="row">
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
		</div>
	</div>
</template>
<script type="text/javascript">
	import router from '../router'
	import axios from 'axios'

	class Expenses{
		constructor(expenses, figure) {
			this.expenses = expenses;
			this.figure = figure;
		}
	}

	export default {
		data(){
			return {
				expense: new Expenses(),
				expenses: [],
				expenseRegister:''
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
		},
		methods: {
			registerExpense(){
				axios.post('expenses', {
					expense: this.expenseRegister
				})
				.then(res => {
					if (res.data.status === 'ok') {
						this.$swal({
							type: 'success',
							title: 'Gasto registrado',
							showConfirmButton: false,
							timer: 1500
						})
						this.expense = ''
						this.getExpenses()
					}else{
						this.$swal({
							type: 'error',
							title: 'Gasto ya existe',
							showConfirmButton: false,
							timer: 1500
						})
						this.expense = ''
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
			},
			getExpenses(){
				axios.get('expenses')
				.then(res => {
					this.expenses = res.data
					console.log(this.expenses)
				})
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
	.metrics{
		height: auto;
		background-color: #fff;
		margin-top:20px;
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
	.first{
		background: #a73737;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #7a2828, #a73737);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #7a2828, #a73737); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	.second{
		background: #FF512F;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to left, #F09819, #FF512F);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to left, #F09819, #FF512F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	}
	.three{
		background: #3CA55C;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to left, #B5AC49, #3CA55C);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to left, #B5AC49, #3CA55C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
</style>