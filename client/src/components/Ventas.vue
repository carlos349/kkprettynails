<template>
    <div class="container-fluid">
      <div class="col-md-12 row sectionMetricss">
				<div class="col-md-2 col-sm-5 metrics first">
					<p>Total de ventas</p>
					<h2>{{ventas.length}}</h2>
				</div>
				<div class="col-md-3 col-sm-5 metrics second">
					<p>Total local</p>
					<h2>{{totalLocal}} $</h2>
				</div>
				<div class="col-md-3 col-sm-5 metrics three">
					<p>Total ganancia</p>
					<h2>{{gananciaNeta}} $</h2>
				</div>
        <div class="col-md-3 col-sm-5 metrics four">
					<p>Total</p>
					<h2>{{gananciaTotal}} $</h2>
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
                Servicios
              </th>
              <th class="text-center">
                Cliente
              </th>
              <th class="text-center">
                Manicurista
              </th>
              <th class="text-center">
                Descuento
              </th>
              <th class="text-center">
                Tipo de pago
              </th>
              <th class="text-center">
                fechas
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
        <table class="table table-striped">
          <tbody >
            <tr v-for="venta of ventas" class="respons fix">
              <td class="font-weight-bold text-left">
                <div v-for="(servicio,index) of venta.servicios">
                  
                  {{index+1}}.- {{servicio.servicio}}
                  </div>
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.cliente}}
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.manicurista}}
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.descuento}}%
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.pago}}
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.fecha}}
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.comision}}
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.ganancialocal}}
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.ganancianeta}}
              </td>
              <td class=" font-weight-bold text-center">
                {{venta.total}}
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
import LineChart from './LineChart.js'
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

export default {
  components: {
		LineChart
	},
  data(){
    return {
      venta: new Ventas(),
      ventas: [],
      totalLocal: 0,
      gananciaNeta: 0,
      gananciaTotal: 0,
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
        this.ventas = res.data
      })
    },
    sacarReporte() {
      $('.afuera').hide()
      print()
      $('.afuera').show()
    },
    totales(){
      setTimeout(() => {
        for (let i = 0; i < this.ventas.length; i++) {
          this.totalLocal = parseFloat(this.ventas[i].ganancialocal) + parseFloat(this.totalLocal)
        }
        for (let i = 0; i < this.ventas.length; i++) {
          this.gananciaNeta = parseFloat(this.ventas[i].ganancianeta) + parseFloat(this.gananciaNeta)
        }
        for (let i = 0; i < this.ventas.length; i++) {
          this.gananciaTotal = parseFloat(this.ventas[i].total) + parseFloat(this.gananciaTotal)
        }
        this.totalLocal = this.formatPrice(this.totalLocal)
        this.gananciaNeta = this.formatPrice(this.gananciaNeta)
        this.gananciaTotal = this.formatPrice(this.gananciaTotal)
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
    }
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
    border:none !important;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
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
		margin:20px;
		color:#fff;
		padding: 10px;
		padding-right: 15px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
	}
	.metrics p{
		font-size: 1em;
		margin-top: 10px;
		
	}
	.metrics h2{
		float: right;
		margin-top: -47px;
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

</style>
