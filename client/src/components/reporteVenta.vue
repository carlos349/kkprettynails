<template>
    <div class="container">
        <div class="recuadro mt-4" v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(' + require('../assets/sidebarTwo.jpg') + ')' , 'background-size': 'cover', 'position': '50% 40%' }" >
            <h1 class="text-center ">Reporte de venta</h1>
            <h2>Fecha: {{formatDate(arreglo.fecha)}}</h2>
            <h3>Codigo de operación: {{arreglo._id}}</h3>
            <h3>Cliente: {{arreglo.cliente}}</h3>
            <h3>Prestador: {{arreglo.manicurista}}</h3>
            <h3>Tipo de pago: {{arreglo.pago}}</h3>
            <h3>Servicios: </h3>
            <span v-for="(servicio, index) of arreglo.servicios" style="font-size:20px;">
                <span v-if="index == 0">{{servicio.servicio}}</span>
                <span v-else> / {{servicio.servicio}}</span>
            </span>
            <button class="btn btn-edit">Editar</button>
        </div>
        <div class="datos mt-4 col-12" v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(' + require('../assets/sidebarTwo.jpg') + ')' , 'background-size': 'cover', 'position': '50% 40%' }">
            <table class="table table-striped">
                <thead style="background-color:#002642;color:#fff;">
                    <tr>
                        <th>Totales</th>
                        <th class="text-right">Montos</th>
                    </tr>
                </thead>
                <tbody class="text-white">
                    <tr>
                        <td style="font-size:1.3em">Comisión</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(arreglo.comision)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Credito</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(arreglo.credito)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Reinversion</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(arreglo.reinversion)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Ganancia neta</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(arreglo.ganancianeta)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Ganancia del local</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(arreglo.ganancialocal)}}</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Decuento</td>
                        <td class="text-right" style="font-size:1.3em">{{arreglo.descuento}}%</td>
                    </tr>
                    <tr>
                        <td style="font-size:1.3em">Total</td>
                        <td class="text-right" style="font-size:1.3em">{{formatPrice(arreglo.total)}}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import EventBus from './EventBus'
    import axios from 'axios'
    import router from '../router'
    export default {
        data() {
            return {
                arreglo: []
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
            }else{
                setTimeout(() => {
                    EventBus.$emit('logged-out', true)
                }, 500);
            }
        },
        created(){
            this.getSale()
        },
        methods: {
            async getSale() {
                const id = localStorage.getItem('reporteVenta')
                try {
                    const sale = await axios.get('ventas/getSale/'+id)
                    this.arreglo = sale.data
                    console.log(this.arreglo)
                } catch(err) {
                     this.$swal({
                        type: 'error',
                        title: 'error técnico',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                
            },
            formatDate(date) {
				let dateFormat = new Date(date)
				return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    }
</script>
<style >
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
    .btn-edit{
        float:right;
        background-color: #002642;
        color:#fff;
        font-size: 'Roboto', sans-serif !important;
        letter-spacing: .8px;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 10px;
    }
    .btn-edit:hover{
        color:black;
        background-color: aliceblue;
    }
</style>