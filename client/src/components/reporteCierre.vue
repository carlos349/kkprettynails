<template>
    <div class="container">
        <div class="recuadro mt-4" v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url(' + require('../assets/sidebarTwo.jpg') + ')' , 'background-size': 'cover', 'position': '50% 40%' }" >
            <h1 class="text-center ">Cierre de caja</h1>
            <h2>Fecha: {{fecha}}</h2>
            <h3>Codigo de operación: {{codigo}}</h3>
            <h3>Encargado/a del cierre: {{identificacionCierre}}</h3>
        </div>
        <div class="datos mt-4 col-12" v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),url(' + require('../assets/sidebarTwo.jpg') + ')' , 'background-size': 'cover', 'position': '50% 40%' }">
            <table class="table table-striped">
                <thead class="thead-info">
                    <tr>
                        <th>Ingresos manuales</th>
                        <th class="text-right">Montos</th>
                        <th>Ingresos sistema</th>
                        <th class="text-right">Montos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-size:1.3em">Fondo de caja</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(ingresoFondoManual)}}</td>
                        <td style="font-size:1.3em">Fondo de caja</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(ingresoFondoSistema)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Efectivo</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(efectivoManual)}}</td>
                        <td style="font-size:1.3em">Efectivo</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(efectivoSistema)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Total efectivo</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(totalEfectivoManual)}}</td>
                        <td style="font-size:1.3em">Total efectivo</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(totalEfectivoSistema)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">RedCompre Crédito</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(creditoManual)}}</td>
                        <td style="font-size:1.3em">RedCompre Crédito</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(creditoSistema)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">RedCompre Débito</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(debitoManual)}}</td>
                        <td style="font-size:1.3em">RedCompre Débito</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(debitoSistema)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Tranferencia</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(transferenciaManual)}}</td>
                        <td style="font-size:1.3em">Tranferencia</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(transferenciaSistema)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Otros</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(otrosManual)}}</td>
                        <td style="font-size:1.3em">Otros</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(otrosSistema)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Total</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(totalManual)}}</td>
                        <td style="font-size:1.3em">Total</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(totalSistema)}}</td>
                    </tr>
                    <!-- <tr v-if="cuenta === 0">
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
                    </tr> -->
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
                ingresoFondoManual: 0,
                efectivoManual: 0,
                totalEfectivoManual: 0,
                debitoManual: 0,
                creditoManual: 0,
                transferenciaManual: 0,
                otrosManual: 0,
                totalManual: 0,
                ingresoFondoSistema: 0,
                efectivoSistema: 0,
                totalEfectivoSistema: 0,
                debitoSistema: 0,
                creditoSistema: 0,
                transferenciaSistema: 0,
                otrosSistema: 0,
                totalSistema: 0,
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
                    this.ingresoFondoManual = res.data.manual.ingresoFondo
                    this.efectivoManual = res.data.manual.efectivo
                    this.totalEfectivoManual = res.data.manual.totalEfectivo
                    this.debitoManual = res.data.manual.debito
                    this.creditoManual = res.data.manual.credito
                    this.transferenciaManual = res.data.manual.transferencia
                    this.otrosManual = res.data.manual.otros
                    this.totalManual = res.data.manual.total

                    this.ingresoFondoSistema = res.data.sistema.ingresoFondo
                    this.efectivoSistema = res.data.sistema.efectivo
                    this.totalEfectivoSistema = res.data.sistema.totalEfectivo
                    this.debitoSistema = res.data.sistema.debito
                    this.creditoSistema = res.data.sistema.credito
                    this.transferenciaSistema = res.data.sistema.transferencia
                    this.otrosSistema = res.data.sistema.otros
                    this.totalSistema = res.data.sistema.total
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