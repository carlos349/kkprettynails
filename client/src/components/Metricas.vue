<template>
  <div class="container">
    <div class="row sectionMetricsInMetrics">
      <div class="col-md-6">
        <div class="metricsInMetrics">
          <p>Total ventas</p>
          <h1>{{ventas.length}}</h1>
          <p class="mt-5">Total ventas del mes</p>
          <h1>{{ventasMes}}</h1>
        </div> 
      </div>
      <div class="col-md-6">
        <div class="metricsInMetrics">
          <p>Total ganancia local</p>
          <h1>{{formatPrice(totalGananciaLocal)}}</h1> 
          <p class="mt-5">Total ganancia local del mes</p>
          <h1>{{totalLocalMes}}</h1>
        </div>
      </div>
      <div class="col-md-6">
        <div class="metricsInMetrics">
          <p>Total en ventas</p>
          <h1>{{formatPrice(totalVentas)}}</h1>
          <p class="mt-5">Total en ventas del mes</p>
          <h1>{{gananciaTotalMes}}</h1>

        </div>
      </div>
      <div class="col-md-6">
        <div class="metricsInMetrics">
          <p>Total en gastos</p>
          <h1>{{formatPrice(totalGastos)}}</h1>
          <p class="mt-5">Total en gastos del mes</p>
          <h1>{{formatPrice(gastosMes)}}</h1>
        </div>
      </div>
		</div>
  </div>
</template>
<script>
  import LineChart from '../plugins/LineChart.js'
  import axios from 'axios'
  import EventBus from './EventBus'
  class Participacion {
    constructor (nombre, participacion) {
      this.cliente = nombre
      this.participacion = participacion
    }
  }

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        participacion: new Participacion(),
        participaciones: [],
        totalLocalMes: 0,
        gananciaTotalMes: 0,
        ventas: [],
        ventasMes: 0,
        totalGananciaLocal: 0,
        totalVentas: 0,
        totalGastos: 0,
        gastosMes: 0
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
      this.getParticipacion()
      this.totales(0)
      this.getVentas()
      this.expensesData()
    },
    methods: {
      getParticipacion () {
        axios.get('metrics/top')
        .then(res => {
          this.participaciones = res.data
        })
      },
      totales(month){
      axios.get('ventas/totalSales/'+month)
        .then(res => {
          this.totalLocalMes = this.formatPrice(res.data.totalLocal)
          this.gananciaNetaMes = this.formatPrice(res.data.gananciaNeta)
          this.gananciaTotalMes = this.formatPrice(res.data.gananciaTotal)
        })
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      getVentas(){
        const config = {headers: {'x-access-token': localStorage.userToken}}
        axios.get('ventas', config)
        .then(res => {
          this.ventas = res.data
          for (let index = 0; index < this.ventas.length; index++) {
            this.totalGananciaLocal = this.totalGananciaLocal + this.ventas[index].ganancialocal
            this.totalVentas = this.totalVentas +  this.ventas[index].total
            let fech = new Date(this.ventas[index].fecha)
            let fechDay = new Date()
            let fechaBien = "02/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear()
            let fechaBienDay = "02/"+ (fechDay.getMonth() + 1) +"/"+fechDay.getFullYear()
            if (fechaBien == fechaBienDay) {
              this.ventasMes = parseFloat(this.ventasMes) + 1
            }

          }
        }).catch(err => {
          
          this.$swal({
            type: 'error',
            title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
            showConfirmButton: false,
            timer: 2500
          })
        })
      },
      async expensesData(){
        const expensesData = await axios.get('expenses')
          for (let index = 0; index < expensesData.data.length; index++) {
            console.log('wut')
            if (expensesData.data[index].type != 'Advancement') {
              console.log('hola')
              this.totalGastos = this.totalGastos + expensesData.data[index].figure
              let fech = new Date(expensesData.data[index].date)
              let fechDay = new Date()
              let fechaBien = "02/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear()
              let fechaBienDay = "02/"+ (fechDay.getMonth() + 1) +"/"+fechDay.getFullYear()
              
              if (fechaBien == fechaBienDay) {
                this.gastosMes = this.gastosMes + expensesData.data[index].figure
              }
            }
          }
      }
    }
  }
</script>

<style>
  
  .metricsInMetrics{
		height: auto;
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
    padding: 50px;
    width: 60%;
    margin: auto;
    margin-top: 50px;
    background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
    color: #353535 !important;
	}
	.metricsInMetrics p{
		font-size: 1.3em;
		margin-top: 10px;
		
	}
</style>
