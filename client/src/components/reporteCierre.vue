<template>
    <div class="container">
        <div class="col-md-12 row sectionMetricReporte mb-5">
            <div class="col-md-3 col-sm-12 metricsReporte mb-5">
                <div>
                    <p class="text-center">Fecha</p>
                    <h4 class="text-center">{{fecha}}</h4>
                </div>
            </div>
            <div class="col-md-4 col-sm-12 metricsReporte mb-5">
                <div>
                    <p class="text-center">Código de operación</p>
                    <h4 class="text-center">{{codigo}}</h4>
                </div>
            </div>
            <div class="col-md-4 col-sm-12 metricsReporte mb-5">
                <div>
                    <p class="text-center">Encargado</p>
                    <h4 class="text-center">{{identificacionCierre}}</h4>
                </div>
            </div>
        </div>
        <!-- <div class="recuadro mt-4 row" style="background-color:transparent;" >
           
            
            <h2 class="col-3">Fecha: {{fecha}}</h2>
            <h3 class="col-6">Codigo de operación: {{codigo}}</h3>
            <h3 class="col-3">Encargado/a : {{identificacionCierre}}</h3>
        </div> -->
        <div class="datos mt-5 col-12 row" style="background-color:transparent">
            <table class="table col-4 mr-5 table-striped" style="padding:0 !important;">
                <thead style="background-color: rgba(238,238,238, 0.6);">
                    <tr>
                        <th style="font-size:1.3em">Ingresos manuales</th>
                        <th style="font-size:1.3em" class="text-right">Montos</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
                    <tr>
                        <td style="font-size:1.3em">Fondo de caja</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(ingresoFondoManual)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Efectivo</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(efectivoManual)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Egreso de caja</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(egresoManual)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Total efectivo</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(totalEfectivoManual)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Crédito</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(creditoManual)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Débito</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(debitoManual)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Tranferencia</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(transferenciaManual)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Otros</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(otrosManual)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.6em"><strong>Total</strong> </td>
                        <td class="text-right" style="font-size:1.6em"><strong>$ {{formatPrice(totalManual)}}</strong> </td>
                    </tr>
                </tbody>
            </table>
            <table class="table col-4 ml-5 mr-5 table-striped" style="padding:0 !important;">
                <thead style="background-color: rgba(238,238,238, 0.6);">
                    <tr>
                        <th style="font-size:1.3em">Ingresos sistema</th>
                        <th style="font-size:1.3em" class="text-right">Montos</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
                    <tr>
                        <td style="font-size:1.3em">Fondo de caja</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(ingresoFondoSistema)}}</td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(ingresoFondoSistema - ingresoFondoSistema)}}</td> -->
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Efectivo</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(efectivoSistema)}}</td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(efectivoManual - efectivoSistema)}}</td> -->
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Egreso de caja</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(egresoSistema)}}</td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(egresoManual - egresoSistema)}}</td> -->
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Total efectivo</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(totalEfectivoSistema)}}</td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(totalEfectivoManual - totalEfectivoSistema)}}</td> -->
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Crédito</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(creditoSistema)}}</td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(creditoManual - creditoSistema)}}</td> -->
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Débito</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(debitoSistema)}}</td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(debitoManual - debitoSistema)}}</td> -->
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Tranferencia</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(transferenciaSistema)}}</td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(transferenciaManual - transferenciaSistema)}}</td> -->
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Otros</td>
                        <td class="text-right" style="font-size:1.3em">$ {{formatPrice(otrosSistema)}}</td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(otrosManual - otrosSistema)}}</td> -->
                    </tr>
                    <tr>
                        <td style="font-size:1.6em"><strong>Total</strong> </td>
                        <td class="text-right" style="font-size:1.6em"><strong>$ {{formatPrice(totalSistema)}}</strong> </td>
                        <!-- <td class="text-right" style="font-size:1.3em">{{formatPrice(totalManual - totalSistema)}}</td> -->
                    </tr>
                </tbody>
            </table>
            <table class="table col-2 ml-5 table-striped" style="padding:0 !important;">
                <thead style="background-color: rgba(238,238,238, 0.6);">
                    <tr>
                        <th style="font-size:1.3em" class="text-center">Diferencia</th>
                    </tr>
                </thead>
                <tbody style="background-color: #fff;">
                    <tr>
                        <td class="text-center" style="font-size:1.3em">$ {{formatPrice(ingresoFondoSistema - ingresoFondoSistema)}}</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="font-size:1.3em">$ {{formatPrice(efectivoManual - efectivoSistema)}}</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="font-size:1.3em">$ {{formatPrice(egresoManual - egresoSistema)}}</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="font-size:1.3em">$ {{formatPrice(totalEfectivoManual - totalEfectivoSistema)}}</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="font-size:1.3em">$ {{formatPrice(creditoManual - creditoSistema)}}</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="font-size:1.3em">$ {{formatPrice(debitoManual - debitoSistema)}}</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="font-size:1.3em">$ {{formatPrice(transferenciaManual - transferenciaSistema)}}</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="font-size:1.3em">$ {{formatPrice(otrosManual - otrosSistema)}}</td>
                    </tr>
                    <tr>
                        <td class="text-center" style="font-size:1.6em"><strong>$ {{formatPrice(totalManual - totalSistema)}}</strong> </td>
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
                identificacionCierre:'',
                egresoManual: 0,
                egresoSistema: 0,
                codigo: ''
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
                    this.egresoManual = res.data.manual.egreso

                    this.ingresoFondoSistema = res.data.sistema.ingresoFondo
                    this.efectivoSistema = res.data.sistema.efectivo
                    this.totalEfectivoSistema = res.data.sistema.totalEfectivo
                    this.debitoSistema = res.data.sistema.debito
                    this.creditoSistema = res.data.sistema.credito
                    this.transferenciaSistema = res.data.sistema.transferencia
                    this.otrosSistema = res.data.sistema.otros
                    this.totalSistema = res.data.sistema.total
                    this.egresoSistema = res.data.sistema.egreso
                    const date = new Date(res.data.fecha)
                    this.identificacionCierre = res.data.identificacionCierre
                    this.codigo = res.data._id
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
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    }
</script>
<style media="screen">
    .recuadro{
        border: solid 2px #262626;
        padding: 20px;
        color:#262626
    }
    .datos{
        width: 90%;
        margin: auto;
    }
    .datos table{
        color:#000;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
    }
    .metricsReporte{
        height: auto;
        padding: auto;
        margin-left:30px;
        margin-top: 20px;
        color:#000;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
        border-radius:5px;
        background-color: rgba(238,238,238, 0.6);
    }
	.metricsReporte p{
		font-size: 1.3em;
		margin-top: 10px;
	}
</style>