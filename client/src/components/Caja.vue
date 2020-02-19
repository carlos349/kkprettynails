<template>
    <div class="container-fluid">
        <div class="col-md-12 row sectionMetricssExpense mb-3">
            <div class="col-md-6 col-sm-12 ">
                <div class="metricssExpense firstExpenses">
                    <p class="text-center">Monto del fondo de caja</p>
                    <h2 class="text-center">{{formatPrice(fund)}}</h2>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="metricssExpense firstExpenses">
                    <p class="text-center">Nombre del cajero</p>
                    <h2 class="text-center">{{checker}}</h2>
                </div>
            </div>
        </div>

        <div class="row">
            <div>
                <v-client-table class="text-center tableCash"  :data="cierres" :columns="columns" :options="optionsT">
                    <p slot="totalCierre" slot-scope="props">{{formatPrice(props.row.sistema.total)}}</p>
                    <button slot="edit"  slot-scope="props" style="width:30%;" v-on:click="sacarReporte(props.row._id)" class="btn add"><font-awesome-icon icon="copy" /></button>
                </v-client-table>
            </div>  
        </div>
        <div v-if="inspector" class="boxDates">
            <button class="CierreDia btn-whiteDates btn-animation-1" v-on:click="openFunds">
                <font-awesome-icon icon="cash-register" />
            </button>
        </div>
        <div class="modal fade" id="myModalRegisterFundss" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content p-1" >
		      <div class="modal-header"  v-bind:style="{ 'background-color': 'rgb(107, 178, 229)'}">
		        <h5 class="modal-title text-white text-center font-weight-bold" id="exampleModalCenterTitle">Fondo de caja</h5>
		      </div>
		      <div class="modal-body mt-2">
		        <form v-on:submit.prevent="registroFondo">
					<div class="row">
						<div class="form-group col-6">
							<label for="name">Nombre del cajero</label>
							<input v-model="nombreCaja" type="text" class="form-control inputsVenta w-100" placeholder="Ingrese su nombre">
						</div>
						<div class="form-group col-6">
							<label for="name">Fondo de caja</label>
							<input v-model="montoCaja" type="text" class="form-control inputsVenta w-100" placeholder="0 $">
						</div>
						<button class="btn w-75 add ml-5 mt-2">Ingresar</button>
					</div>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'
export default {
    data(){
        return {
            columns:['fecha' , 'identificacionCierre', 'totalCierre', 'edit'],
            optionsT: {
                filterByColumn: true,
                texts: {
                    filter: "Filtrar:",
                    filterBy: 'Filtrar por {column}',
                    count:' '
                },
                headings: {
                    fecha: 'Fecha ',
                    identificacionCierre: 'Encargado del cierre ',
                    totalCierre: 'Total del cierre ',
                    edit: 'Reportes '
                },
                pagination: { chunk:10 },
                pagination: { dropdown:true },
                pagination: { nav: 'fixed' },
                pagination: { edge: true },
                sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
                sortable: ['fecha'],
                filterable: ['fecha']
            },
            cierres:[],
            fechas: [],
            fund: 0,
            checker: '',
            nombreCaja: '',
            montoCaja: '',
            inspector: false
        }
    }, 
    BeforeCreate(){
        if (!localStorage.getItem('userToken')) {
 			 this.$swal({
 				 type: 'error',
 				 title: 'URL restringida',
 				 showConfirmButton: false,
 				 timer: 1500
 			 })
        router.push({name: 'Login'})
      }else{
        EventBus.$emit('logged-out', true)
      }
    },
    created(){
        this.getClosing();
        this.getFunds()
    },
    methods: {
        getClosing(){
            axios.get('ventas/Closing')
            .then(res => {
                this.cierres = res.data
                for (let i = 0; i < this.cierres.length; i++) {
					this.cierres[i].fecha = this.formatDate(this.cierres[i].fecha)
				}
            })
        },
        formatDate(date) {
            let dateFormat = new Date(date)
            return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
        },
        getPerMonthSelected(month){
            axios.get('ventas/closingPerMonth') 
            .then(res => {
                this.cierres = res.data
            })
        },
        getFunds(){
            axios.get('ventas/getFund')
            .then(res => {
                this.fund = res.data[0].amount
                this.checker = res.data[0].userRegister 
                if (this.fund == 0 || this.checker == '') {
                    this.inspector = true
                    this.fund = 0
                    this.checker = 'No hay cajero registrado'
                }
            })
        },
        openFunds(){
            $('#myModalRegisterFundss').modal('show')
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
                    $('#myModalRegisterFundss').modal('hide')
                    this.montoCaja = ''
                    this.nombreCaja= ''
                    this.getFunds()
                    this.inspector = false
				}
			})
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
        sacarReporte(id) {
            localStorage.setItem('report', id)
            router.push({name:'reportecierre'})
        }
    }    

}
</script>
<style >
    .metricssExpense{
        padding: auto;
        width: 70%;
        margin: auto;
        margin-top: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        color:#fff;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
        border-radius:5px;
    }
	.metricssExpense p{
		font-size: 1.3em;
		margin-top: 10px;
	}
    .table{
        table-layout: fixed;
        border:none !important;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
    }
    td{
        padding: 0;
        width: 50% !important;
    }
    .Listas{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 70vh;
		height:auto;
		border-radius:5px;
	}
	.Listas::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
	}
    .inputsVentas{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #102229 !important;
		background-color:transparent !important;
		color:#000 !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
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
    .add{
		background-color:#353535;
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
    .tableCash th{
	border:none !important;
	}
	.table-bordered tbody{
		background-color: white;
	}
	.tableCash table{

	
	}
	.table-bordered {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		border-radius: 10px !important; 
	}
	.tableCash thead {
			background-color: rgba(238, 238, 238, 0.623);
			color: #353535;
			text-align: center
	}
	.tableCash thead th {
			border-left: 1px black !important;
	}

    .firstExpenses{
		background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
		color:#353535;
	} 

    .boxDates{
    position:fixed;
		top:90%;
		right:2%;
    z-index: 1000;
    transform : translate(-50% ,-50%);
  }
  .CierreDia:link,
  .CierreDia:visited{
    text-decoration: none;
    text-transform:uppercase;
    position:relative;
    top:0;
    left:0;
    padding:20px 40px;
    border-radius:100px;
    display:inline-block;
    transition: all .6s;
  }

  .btn-whiteDates{
    padding: 15px;
    border-radius:10px;
    background-color:#fff;
    color: #353535;
    border:2px solid #353535;
    font-size: 1em;
    outline: none !important;
  }
  .btn-whiteDates:focus{
    outline: none !important;
  }

  .CierreDia:hover{
    box-shadow:0px 10px 10px #353535;
    transform : translateY(-3px);
  }

  .CierreDia:active{
    box-shadow:0px 5px 10px #353535;
    transform:translateY(-1px);
  }

  .btn-bottom-animation-1{
    animation:comeFromBottom 2s ease-out .8s;
  }

  .CierreDia::after{
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

  .btn-whiteDates::after {
      background:#353535;
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