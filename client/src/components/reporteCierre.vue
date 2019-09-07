<template>
    <div class="container">
        <div class="recuadro mt-4" v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(' + require('../assets/fondo.jpg') + ')' , 'background-size': 'cover', 'position': '50% 40%' }" >
            <h1 class="text-center ">Cierre de caja</h1>
            <h2>Fecha: {{fecha}}</h2>
            <h3>Codigo de operación: {{codigo}}</h3>
            <h3>Encargado/a del cierre: {{identificacionCierre}}</h3>
        </div>
        <div class="datos mt-4 col-12" v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(' + require('../assets/fondo.jpg') + ')' , 'background-size': 'cover', 'position': '50% 40%' }">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Totales</th>
                        <th class="text-right">Montos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-size:1.3em">Apertura efectivo</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(aperturaefectivo)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Apertura Banco</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(aperturaBanco)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Total apertura</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(aperturatotal)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Cierre efectivo</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(cierrefectivo)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Cierre banco</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(cierrebanco)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Total cierre</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(cierretotal)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Gastos</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(gastos)}}</td>
                    </tr>
                    <tr v-if="cuenta === 0">
                        <td style="font-size:1.3em">Cuenta del cierres</td>
                        <td class="text-right" style="font-size:1.3em">
                            <button class="btn btn-success">
                                <font-awesome-icon icon="check-square" class="report"/>
                            </button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td style="font-size:1.3em">Cuenta del cierre</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(cuenta)}}</td>
                    </tr>
                </tbody>
            </table>
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
                codigo: '',
                fecha: '',
                identificacionCierre:''
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
                const id = localStorage.getItem('report')
                axios.get('ventas/getClosing/'+id)
                .then(res => {     
                    this.aperturaBanco = res.data.aperturaBanco
                    this.aperturaefectivo = res.data.aperturaEfectivo
                    this.aperturatotal = res.data.totalApertura
                    this.cierrebanco = res.data.cierreBanco
                    this.cierrefectivo = res.data.cierreEfectivo
                    this.cierretotal = res.data.totalCierre
                    this.gastos = res.data.gastos
                    this.codigo = res.data._id
                    this.identificacionCierre = res.data.identificacionCierre
                    this.cuenta = res.data.totalApertura + res.data.cierreEfectivo + res.data.cierreBanco - res.data.totalCierre
                    const date = new Date(res.data.fecha)
                    this.fecha = date.getDate()+"-"+(date.getMonth() + 1)+"-"+date.getFullYear()
                })
            },
            printReport(){
                setTimeout(() => {
                    print()
                    router.push({name: 'Ventas'})
                }, 500);
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    }
</script>
<style media="screen">
    .recuadro{
        border: solid 2px #262626;
        padding: 20px;
        color:azure
    }
    .datos{
        border: solid 2px #262626;
        padding: 20px;
    }
    .datos table{
        color:azure
    }
</style>