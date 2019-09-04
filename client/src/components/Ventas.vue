<template>
    <div class="container-fluid">
      <div class="col-md-12 row sectionMetricss">
				<div class="col-md-2 col-sm-5 metrics first">
					<p>Total de ventas</p>
					<h2>{{ventas.length}}</h2>
				</div>
				<div class="col-md-3 col-sm-5 metrics second">
          <div class="row metricTotal">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5>{{localAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Total local</p></div>
            <div class="col-sm-8"><h1>{{totalLocal}} $</h1></div> 
          </div>
				</div>
				<div class="col-md-3 col-sm-5 metrics three">
          <div class="row metricTotal">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5>{{netaAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Ganancia</p></div>
            <div class="col-sm-8"><h1>{{gananciaNeta}} $</h1></div> 
          </div>
				</div>
        <div class="col-md-3 col-sm-5 metrics four">
          <div class="row metricTotal">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5>{{totalAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Total</p></div>
            <div class="col-sm-8"><h1>{{gananciaTotal}} $</h1></div> 
          </div>
				</div>
			</div>
      <div class="row BotonesDespliegue">
        <button class="btn btn-primary col-md-5 ml-2" type="button" data-toggle="collapse" data-target="#collapseTable" aria-expanded="false" aria-controls="collapseTable">
          Desplegar tabla de ventas
        </button>
        <button class="btn btn-primary col-md-5 ml-2" type="button" data-toggle="collapse" data-target="#collapseChart" aria-expanded="false" aria-controls="collapseChart">
          Gráfica de ventas
        </button>
      </div>
      <div class="collapse" id="collapseChart">
        <div class="small">
					<line-chart v-if="loaded" :chartdata="chartdata" :options="options" :styles="myStyles"/>
				</div>
      </div>
      <div class="collapse" id="collapseTable">
        <table class="table tableVenta">
          <thead class="thead-light">
            <tr class="respons">
              <th class="text-center">
                Fecha
              </th>
              <th style="width: 16.6% !important;" class="text-center">
                Servicios
              </th>
              <th class="text-center">
                Cliente
              </th>
              <th class="text-center">
                Manicurista
              </th>
              <th style="width: 6.7% !important;" class="text-center">
                Descuento
              </th>
              <th class="text-center">
                Comision
              </th>
              <th class="text-center">
                Local
              </th>
              <th class="text-center">
                Ganancia
              </th>
              <th class="text-center">
                Total 
              </th>
            </tr>
          </thead>
        </table>
      <div class="Listas">
        <table style="font-size:.8em" class="table table-striped">
          <tbody >
            <tr v-for="(venta, indexOne) of ventas" class="respons fix">
              <td class=" font-weight-bold text-center">
                 <font-awesome-icon style="margin-right:4%" v-if="venta.pago === 'tarjeta'" icon="credit-card" />
                 <font-awesome-icon style="margin-right:4%;margin-top:5%;" v-else-if="venta.pago === 'efectivo'" icon="dollar-sign" />{{fechas[indexOne]}}
              </td>
              <td style="width: 75% !important;" class="font-weight-bold text-left">
                <div  v-for="(servicio,indexTwo) of venta.servicios">
                  {{servicio.servicio}}
                </div>
              </td>
              <td  class=" font-weight-bold text-left">
                {{venta.cliente}}
              </td>
              <td class=" font-weight-bold text-left">
                <input hidden :value="venta.manicurista" type="text">
                <div v-on:click="editarTabla()">{{venta.manicurista}}</div>
                
              </td>
              <td style="width: 30% !important;" class=" font-weight-bold text-center">
                {{venta.descuento}}%
              </td>
              <td class=" font-weight-bold text-right">
                {{formatPrice(venta.comision)}}
              </td>
              <td class=" font-weight-bold text-right">
                {{formatPrice(venta.ganancialocal)}}
              </td>
              <td class=" font-weight-bold text-right">
                {{formatPrice(venta.ganancianeta)}}
              </td>
              <td class=" font-weight-bold text-right">
                {{formatPrice(venta.total)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import LineChart from '../plugins/LineChart.js'
import router from '../router'

class Ventas{
	constructor(servicios, cliente, manicuristas, comision, local, ganancia, total) {
		this.servicios = servicios;
		this.cliente = cliente;
		this.manicuristas = manicuristas;
		this.comision = comision;
    this.local = local;
    this.ganancia = ganancia;
    this.total = total;
	}
}

class Fechas{
	constructor(fecha) {
		this.fecha = fecha;
	}
}

export default {
  components: {
		LineChart
	},
  data(){
    return {
      venta: new Ventas(),
      ventas: [],
      fecha: new Fechas(),
      fechas: [],
      totalLocal: 0,
      localAnterior : 0,
      gananciaNeta: 0,
      netaAnterior : 0,
      gananciaTotal: 0,
      totalAnterior : 0,
      serviciosArray : [],
      conteoGlobal : 0,
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      loaded: false,
			chartdata: null,
			height:360,
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
    this.getVentas();
    this.totales();
    this.SalesQuantityChartFunc();
  },
  methods: {
    getVentas(){
      axios.get('ventas')
      .then(res => {
        console.log(res.data)
        this.ventas = res.data
        let fechaBien = ''
        for (let index = 0; index < res.data.length; index++) {
          let fech = new Date(res.data[index].fecha)
          fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ fech.getMinutes()+")"
          this.fechas.push(fechaBien)
        }
      })
    },
    sacarReporte() {
      $('.afuera').hide()
      print()
      $('.afuera').show()
    },
    totales(){
      setTimeout(() => {
        var fechaTotales = new Date()
        var mesTotales = fechaTotales.getMonth()
        for (let i = 0; i < this.ventas.length; i++) {
          var fechL = new Date(this.ventas[i].fecha)
          if (mesTotales == fechL.getMonth() ) {
            this.totalLocal = parseFloat(this.ventas[i].ganancialocal) + parseFloat(this.totalLocal)
          }      
          else if (mesTotales - 1 == fechL.getMonth() ){
            this.localAnterior = parseFloat(this.ventas[i].ganancialocal) + parseFloat(this.localAnterior)
          }
        }
        for (let i = 0; i < this.ventas.length; i++) {
          var fechN = new Date(this.ventas[i].fecha)
          if (mesTotales == fechN.getMonth() ) {
            this.gananciaNeta = parseFloat(this.ventas[i].ganancianeta) + parseFloat(this.gananciaNeta)
          }      
          else if (mesTotales - 1 == fechN.getMonth() ){
            this.netaAnterior = parseFloat(this.ventas[i].ganancianeta) + parseFloat(this.netaAnterior)
          }
        }
        for (let i = 0; i < this.ventas.length; i++) {
          var fech = new Date(this.ventas[i].fecha)
          if (mesTotales == fech.getMonth() ) {
            this.gananciaTotal = parseFloat(this.ventas[i].total) + parseFloat(this.gananciaTotal)
          }      
          else if (mesTotales - 1 == fech.getMonth() ){
            this.totalAnterior = parseFloat(this.ventas[i].total) + parseFloat(this.totalAnterior)
          }
        }
        this.totalLocal = this.formatPrice(this.totalLocal)
        this.gananciaNeta = this.formatPrice(this.gananciaNeta)
        this.gananciaTotal = this.formatPrice(this.gananciaTotal)
        this.localAnterior = this.formatPrice(this.localAnterior)
        this.netaAnterior = this.formatPrice(this.netaAnterior)
        this.totalAnterior = this.formatPrice(this.totalAnterior)
      }, 500);
     
    },
    SalesQuantityChartFunc(){
      this.loaded = false
      axios.get('/ventas/GetSalesPerMonth')
      .then(res => {	
        console.log(res.data)
        const userlist = res.data
        this.chartdata = userlist
        this.loaded = true
      })
      .catch(err => {
        console.error(err)
      })
		},
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    arreglarServicios(value, index, indexTwo){
      var conteo = 0
      if (indexTwo == 0) {
        this.serviciosArray = []
        for (let i = 0; i < this.ventas[index].servicios.length; i++) {
          if (value === this.ventas[index].servicios[i].servicio ) {
            conteo++
          } 
        }  
      }
      else{ 
        for (let c = 0; c < this.serviciosArray.length; c++) {
          if (value == this.serviciosArray[c]) { 
            return
          }
          else{
            for (let i = 0; i < this.ventas[index].servicios.length; i++) {
            if (value === this.ventas[index].servicios[i].servicio ) {
              conteo++ 
              } 
            }
          }
        }
      }
      if (conteo > 0) {
        this.serviciosArray.push(value)
        return  value + " (" + conteo + ")"
      }   
    },
    editarTabla(){
    console.log("hola")
  },
  },
  
  computed: {
    myStyles (){
      return {
        height: `${this.height}px`,
        position: 'relative'
      }
		}
	},
}
</script>
<style media="screen">
  @media (max-width: 1450px) {
    .metrics p{
      font-size: .6em;
    }
    .metrics h2{
      margin-top: 0 !important;
      font-size: 1em;
      float:left !important;
    }
  }
  @media (max-width: 700px) {
    .respons{
      font-size: 2vw;
    }
    .metrics p{
      font-size: .6em
    }
    .metrics h1{
      font-size: 1em
    }
  }
  @media (max-width: 400px) {
    .respons{
      font-size: 1.5vw;
    }
  }
  .report{
    cursor:pointer;
  }
  .BotonesDespliegue{
    margin-left:10%;
  }
  .BotonesDespliegue button{
    background: #1D4350;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #A43931, #1D4350);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #A43931, #1D4350); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border:none !important;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
    font-family: 'Raleway', sans-serif !important;
        font-weight:600 !important;
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
  .first{
		background: #a73737;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #7a2828, #a73737);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #7a2828, #a73737); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
	.second{
		background: #FF512F;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to left, #F09819, #FF512F);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to left, #F09819, #FF512F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	}
	.three{
		background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	}
  .four{
    background: #1D4350;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #A43931, #1D4350);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #A43931, #1D4350); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  .metrics{
		height: auto;
		background-color: #fff;
		margin:10px;
    padding: auto;
    margin-top: 20px;
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
	}
	.metrics p{
		font-size: 1.3em;
		margin-top: 10px;
		
	}
	
	.sectionMetricss{
		margin-left: 0.5%;
	}

  .fix{
    overflow-x: hidden;
		overflow-y:scroll;
    height: 20px !important;
		max-height: 20px !important;
		border-radius:5px;
  }
  .small{
		background-color: #fff;
		margin-top: 20px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
  .metricTotal{
    margin-top: 3%;
  }
  .ant{
    opacity: .8;
  }

</style>
