<template>
    <div class="container">
        <div class="recuadro mt-4" >
            <h1 class="text-center ">Reporte prestador</h1>
            <h2>Fecha: {{fecha}}</h2>
            <h3>Codigo: {{codigo}}</h3>
            <h3>Nombre: {{identificacion}}</h3>
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
                    <tr v-for="sale in sales" :key="sale">
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
    </div>
</template>
<script type="text/javascript">
    import EventBus from './eventBus'
    import axios from 'axios'
    import router from '../router'

    export default {
        data(){
            return{
                aperturaBanco: 0,
                aperturaefectivo: 0,
                aperturatotal: 0,
                cierrebanco: 0,
                cierrefectivo: 0,
                cierretotal: 0,
                gastos: 0,
                cuenta: 0,
                porcentaje:'',
                codigo: '',
                fecha: '',
                sales: [],
                identificacion:'',
                totalVentas: 0,
                totalComisiones:0
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
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            formatDate(date) {
               let dateFormat = new Date(date)
               return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
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