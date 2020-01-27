<template>
    <div class="container-fluid">
        <div class="col-md-12 row sectionMetricss">
            <div class="col-md-3 col-sm-12 metricss first">
                <div>
                    <p class="text-center">Apertura Efectivo</p>
                    <h4 class="text-center">{{formatPrice(efectivo)}}</h4>
                </div>
            </div>
            <div class="col-md-3 col-sm-12 metricss second">
                <div>
                    <p class="text-center">Apertura Banco</p>
                    <h4 class="text-center">{{formatPrice(banco)}}</h4>
                </div>
            </div>
            <div class="col-md-4 col-sm-12 metricss three">
                <div>
                    <p class="text-center">Total Apertura</p>
                    <h4 class="text-center">{{formatPrice(total)}}</h4>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(0)">
                    Enero  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(1)">
                    Febrero  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(2)">
                    Marzo  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(3)">
                    Abril  
                </button> 
            </div>
            <div class="col-md-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(4)">
                    Mayo  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(5)">
                    Junio  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(6)">
                    Julio  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(7)">
                    Agosto  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(8)">
                    Septiembre  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(9)">
                    Octubre  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(10)">
                    Noviembre  
                </button> 
            </div>
            <div class="col-md-2 mb-2">
                <button class="btn w-100 BotonesFiltro" type="button" v-on:click="getPerMonthSelected(11)">
                    Diciembre  
                </button> 
            </div> 
        </div>
        <div class="row">
            <div class="shadow">
                <v-client-table class="text-center"  :data="cierres" :columns="columns" :options="optionsT">
                    <p slot="totalCierre" slot-scope="props">{{formatPrice(props.row.sistema.total)}}</p>
                    <button slot="edit"  slot-scope="props" style="width:30%;" v-on:click="sacarReporte(props.row._id)" class="btn btn-warning"><font-awesome-icon icon="copy" /></button>
                    <!-- <a slot="edit" slot-scope="props" class="fa fa-edit" :href="pasarDatosEdit(props.row.nombre, props.row.identidad, props.row.correoCliente, props.row.instagramCliente, props.row._id)">Hola </a> -->
                </v-client-table>
            </div>
            <!-- <table class="table tableVenta" >
            <thead class="thead-light">
                <tr class="respons">
                <th class="text-center">
                    Fecha
                </th>
                <th class="text-center">
                    Apertura Efectivo
                </th>
                <th class="text-center">
                    Apertura Banco
                </th>
                <th class="text-center">
                    Total Apertura
                </th>
                <th class="text-center">
                    Cierre Efectivo
                </th>
                <th class="text-center">
                    Cierre Banco
                </th>
                <th class="text-center">
                    Total Cierre
                </th>
                <th class="text-center">
                    Total
                </th>
                <th class="text-center">
                    Gastos
                </th>
                <th class="text-center">
                    Reportes
                </th>
                </tr>
            </thead>
            </table>
        <div class="Listas">
            <table style="font-size:.8em" class="table table-striped" id="myTable">
            <tbody >
                <tr v-for="(cierre, indexOne) of cierres" class="respons fix">
                <td class="text-left">
                    {{formatDate(cierre.fecha)}}
                </td>
                <td class="text-right">
                    {{formatPrice(cierre.aperturaEfectivo)}}
                </td>
                <td  class="text-right">
                    {{formatPrice(cierre.aperturaBanco)}}
                </td>
                <td class="text-right">
                    {{formatPrice(cierre.totalApertura)}}
                </td>
                <td class="text-right">
                    {{formatPrice(cierre.cierreEfectivo)}}
                </td>
                <td class="text-right">
                    {{formatPrice(cierre.cierreBanco)}}
                </td>
                <td class="text-right">
                    {{formatPrice(cierre.totalCierre - cierre.gastos)}}
                </td>
                <td class="text-right">
                    {{formatPrice(cierre.total)}}
                </td>
                <td class="text-right">
                    {{formatPrice(cierre.gastos)}}
                </td>
                <td class="text-right">
                    <font-awesome-icon icon="copy" class="report" v-on:click="sacarReporte(cierre._id)"/>
                </td>
                </tr>
            </tbody>
            </table>
        </div> -->
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
import EventBus from './eventBus'
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
            efectivo: 0,
            banco: 0,
            total: 0
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
      }
    },
    created(){
        this.getClosing();
    },
    methods: {
        getClosing(){
            axios.get('ventas/Closing')
            .then(res => {
                this.cierres = res.data

                let fechaBien = ''
                const dateNow = new Date()
                for (let index = 0; index < res.data.length; index++) {
                    let fech = new Date(res.data[index].fecha)
                    if (fech.getMonth() === dateNow.getMonth() && fech.getDate() === dateNow.getDate()) {
                        this.efectivo = res.data[index].aperturaEfectivo
                        this.banco = res.data[index].aperturaBanco
                        this.total = res.data[index].totalApertura
                    }
                }
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
            axios.get('ventas/closingPerMonth/'+month)
            .then(res => {
                if (res.data.length == 0) {
                    this.$swal({
                        type: 'error',
                        title: 'No hay cierres del mes seleccionado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else{
                    this.cierres = res.data
                    let fechaBien = ''
                    for (let index = 0; index < res.data.length; index++) {
                        let fech = new Date(res.data[index].fecha)
                        let dateNow = new Date()
                        if (fech.getMonth() === dateNow.getMonth() && fech.getDate() === dateNow.getDate()) {
                            this.efectivo = res.data[index].aperturaEfectivo
                            this.banco = res.data[index].aperturaBanco
                            this.total = res.data[index].totalApertura
                        }
                        this.cierres[index].fecha = this.formatDate(this.cierres[index].fecha)
                    }
                }
            })
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
    .first{
		background:#1F5673; /* fallback for old browsers */
	}
	.second{
		background:rgb(37, 88, 114); /* fallback for old browsers */
	}
	.three{
		background:rgb(46, 93, 117);
  }
    

    .metricss{
        height: auto;
        padding: auto;
        margin-left:50px;
        margin-top: 20px;
        color:#fff;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
        border-radius:5px;
    }
	.metricss p{
		font-size: 1.3em;
		margin-top: 10px;
	}
    .BotonesFiltro{
        width: 200px;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        height: 55px;
        text-align:center;
        border: none;
        background-size: 300% 100%;
        background-image: linear-gradient(to right, #1F5673, rgb(78, 120, 141), rgb(38, 90, 117), rgb(66, 104, 124));
        box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    .BotonesFiltro:hover{
        background-position: 100% 0;
        color: #fff;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
    .BotonesFiltro:focus {
        outline: none;
    }
    .table{
        table-layout: fixed;
        border-collapse: separate ;
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