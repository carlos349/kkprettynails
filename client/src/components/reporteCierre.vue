<template>
    <div class="container">
        <div class="recuadro mt-4">
            <h1 class="text-center ">Cierre de caja</h1>
            <h2>Fecha: {{fecha}}</h2>
            <h3>Código de operación: {{codigo}}</h3>
        </div>
        <div class="datos mt-4 col-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Totales</th>
                        <th class="text-right">Montos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-size:1.3em">Local</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(local)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Reinversión</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(reinversion)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Crédito</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(credito)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Comisiones</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(comisiones)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Ganancia</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(ganancia)}}</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold" style="font-size:1.5em">Total</td>
                        <td class="font-weight-bold text-right" style="font-size:1.5em">{{formatPrice(total)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
    import axios from 'axios'
    import router from '../router'

    export default {
        data(){
            return{
                local: 0,
                reinversion: 0,
                credito: 0,
                comisiones: 0,
                ganancia: 0,
                total: 0,
                codigo: 0,
                fecha: ''
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
            this.printReport();
        },
        methods: {
            getClosing(){
                axios.get('ventas/getClosing')
                .then(res => {
                    this.local = res.data.totalLocal;
                    this.reinversion = res.data.totalReinversion;
                    this.credito = res.data.totalCredito;
                    this.comisiones = res.data.totalComision;
                    this.total = res.data.total;
                    this.ganancia = res.data.totalGanancia;
                    const date = new Date()
                    this.fecha = date.getDate() +"/"+ (date.getMonth() + 1) +"/"+date.getFullYear()
                    this.codigo = res.data._id
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
    }
    .datos{
        border: solid 2px #262626;
        padding: 20px;
    }
</style>