<template>
    <div class="container">
        <div class="recuadro mt-4" >
            <h1 class="text-center ">Reporte prestador</h1>
            <h2>Fecha: {{fecha}}</h2>
            <h3>Nombre: {{identificacion}}</h3>
            <button class="btn add float-right" style="margin-top:-50px;" v-on:click="openPrestDiscount">Adelantos</button>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="small">
					<line-chart v-if="loaded" :chartdata="chartdata" :options="options" :styles="myStyles"/>
				</div>
            </div>
            <div class="col-12">

            </div>
        </div>
        <div class="datos mt-4 col-12" >
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Comision ({{porcentaje}}%)</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sale in sales">
                        <td style="font-size:1.3em">{{formatDate(sale.fecha)}}</td>
                        <td style="font-size:1.3em">{{sale.cliente}}</td>
                        <td style="font-size:1.3em">{{formatPrice(sale.comision)}}</td>
                        <td style="font-size:1.3em" class="text-right">{{formatPrice(sale.total)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Total</td>
                        <td style="font-size:1.3em"></td>
                        <td style="font-size:1.3em">{{formatPrice(totalComisiones)}}</td>
                        <td style="font-size:1.3em" class="text-right">{{formatPrice(totalVentas)}}</td>
                    </tr>
                </tbody>
            </table>
            <button class="w-100 btn add" v-on:click="printReport">Crear reporte y cerrar ventas</button>
        </div>
        <div class="modal fade" id="ModalEditPrestador" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + require('../assets/fondo.jpg') + ')' , 'background-size': 'cover' }" class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar adelanto</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body letters">
				<form v-on:submit.prevent="RegisterAdevancement">
					<div class="form-group">
						<label for="name">Razón</label>
						<input v-model="reason" type="text" class="form-control inputs" placeholder="Razon del adelanto">
					</div>
					<div class="form-group">
						<label for="name">Total del adelanto</label>
						<input v-model="totalAdvancement" type="number" class="form-control inputs" placeholder="Adelanto">
					</div>
                    <div class="form-group">
						<label for="name">Total del adelanto</label>
						<input v-model="dateAdvancement" type="date" class="form-control inputs">
					</div>
					<ul class="list-group mb-2">
                        <li v-for="advancement of advancements" class="list-group-item">Razon: {{advancement.reason}} - Total: {{advancement.total}} - fecha: {{formatDate(advancement.date)}}</li>
                    </ul>
					<button class="btn w-100 add">Editar prestador</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
    </div>
</template>
<script type="text/javascript">
    import EventBus from './eventBus'
    import axios from 'axios'
    import LineChart from '../plugins/LineChart.js'
    import router from '../router'

    export default {
        components: {
            LineChart
        },
        data(){
            return{
                aperturaBanco: 0,
                aperturaefectivo: 0,
                aperturatotal: 0,
                cierrebanco: 0,
                cierrefectivo: 0,
                cierretotal: 0,
                gastos: 0,
                advancements: [],
                cuenta: 0,
                porcentaje:'',
                codigo: '',
                fecha: '',
                sales: [],
                identificacion:'',
                totalVentas: 0,
                totalComisiones:0,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                loaded: false,
                chartdata: null,
                height:360,
                reason:'',
                totalAdvancement:'',
                dateAdvancement: ''
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
            this.getClosing();
            this.SalesQuantityChartFunc();
            this.getAdvancements();
        },
        methods: {
            getClosing(){
                const id = localStorage.getItem('reportePrestador')
                axios.get('manicuristas/justOneById/'+id)
                .then(resData => {
                    const date = new Date()
                    this.fecha = date.getDate()+"-"+(date.getMonth() + 1)+"-"+date.getFullYear()
                    this.codigo = resData.data._id
                    this.porcentaje = resData.data.porcentaje
                    this.identificacion = resData.data.nombre
                    axios.get('manicuristas/SalesByPrest/'+this.identificacion)
                    .then(res => {
                        this.sales = res.data
                        let totales = 0
                        let comisiones = 0
                        for (let index = 0; index < res.data.length; index++) {
                            totales = parseFloat(res.data[index].total) + parseFloat(totales)
                            comisiones = parseFloat(res.data[index].comision) + parseFloat(comisiones)
                        }
                        this.totalVentas = totales
                        this.totalComisiones = comisiones
                    })
                })
                .catch(err => {
                    console.log(err )
                })
            },
            RegisterAdevancement(){
                axios.post('manicuristas/registerAdvancement', {
                    reason: this.reason,
                    name: this.identificacion,
                    prest: this.codigo,
                    total: this.totalAdvancement,
                    date: this.dateAdvancement
                })
                .then(res => {
                    if (res.data.status == 'ok') {
                        this.$swal({
                            type: 'success',
                            title: 'Adelanto registrado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.getAdvancements();
                    }else{
                        this.$swal({
                            type: 'info',
                            title: 'Se resgistro el adelanto, pero no se registro en el cierre, ya que no hay un cierre de ventas para dicha fecha',
                            showConfirmButton: true
                        })
                        this.getAdvancements();
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            printReport(){
                this.$swal({
                    title: '¿Estás seguro de hacer el Cierre?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si hacer Cierre',
                    cancelButtonText: 'No hacer Cierre',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                })
                .then(result => {
                    if (result.value) {
                        axios.put('manicuristas/ClosePrest/'+this.codigo)
                        .then(res => {
                            if (res.data.status == 'ok') {
                                setTimeout(()=> {
                                    $('.menuVer').hide()
                                    $('.add').hide()
                                    print()
                                    $('.menuVer').show()
                                    router.push({name:'Empleadas'})
                                }, 1000) 
                            }else{
                                this.$swal('Error en el cierre', 'Hubo un error', 'error')
                            }
                        }) 
                        .catch(err => {
                            console.log(err)
                        })                   
                    }else{
                        this.$swal('No se hizo el cierre', 'Aborto la acción', 'info')
                    }
                })
            },
            openPrestDiscount(){
                $('#ModalEditPrestador').modal('show')
            },
            SalesQuantityChartFunc(){
                setTimeout(() => {
                    this.loaded = false
                    axios.get('/manicuristas/GetSalesPerMonth/'+this.identificacion)
                    .then(res => {	
                        const userlist = res.data
                        this.chartdata = userlist
                        this.loaded = true
                    })
                    .catch(err => {
                        console.error(err)
                    })
                },1500)
            },
            getAdvancements(){
                setTimeout(() => {
                    axios.get('/manicuristas/advancements/'+this.codigo)
                    .then(res => {	
                        this.advancements = []
                        this.advancements = res.data
                    })
                    .catch(err => {
                        console.error(err)
                    })
                },1500)
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            formatDate(date) {
               let dateFormat = new Date(date)
               return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
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
<style media="screen">
    .recuadro{
        border: solid 2px #262626;
        padding: 20px;
        color:#102229;
    }
    .datos{
        border: solid 2px #262626;
        padding: 20px;
    }
    .datos table{
        color:#102229;
    }
    .small{
		background-color: #fff;
		margin-top: 20px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
    label{
        color:white;
    }
    .add{
		background-color:#ccc;
		color: #102229;
        padding: 10px;
		transition: all 0.5s ease-out;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
	.add:hover{
		background-color:#102229;
		color:#ccc;
	}
</style>