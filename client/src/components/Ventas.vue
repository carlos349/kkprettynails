<template>
    <div class="container-fluid">
      <div class="col-md-12 row sectionMetricss">
				<div class="col-md-2 col-sm-5 metricss first">
					<p>Total de ventas</p>
					<h2>{{ventas.length}}</h2>
				</div>
				<div class="col-md-3 col-sm-5 metricss second">
          <div class="row metricTotal">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5 class="text-right">{{localAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Total local</p></div>
            <div class="col-sm-8"><h3 class="text-right mt-2">{{totalLocal}} $</h3></div> 
          </div>
				</div>
				<div class="col-md-3 col-sm-5 metricss three">
          <div class="row metricTotal">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5 class="text-right">{{netaAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Ganancia</p></div>
            <div class="col-sm-8"><h3 class="text-right mt-2">{{gananciaNeta}} $</h3></div> 
          </div>
				</div>
        <div class="col-md-3 col-sm-5 metricss four">
          <div class="row metricTotal">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5 class="text-right">{{totalAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Total</p></div>
            <div class="col-sm-8"><h3 class="text-right mt-2">{{gananciaTotal}} $</h3></div> 
          </div>
				</div>
			</div>
      <div class="row BotonesFiltro">
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(1)">
            Enero  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(2)">
            Febrero  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(3)">
            Marzo  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(4)">
            Abril  
          </button> 
        </div>
        <div class="col-md-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(5)">
            Mayo  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(6)">
            Junio  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(7)">
            Julio  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(8)">
            Agosto  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(9)">
            Septiembre  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(10)">
            Octubre  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(11)">
            Noviembre  
          </button> 
        </div>
        <div class="col-md-2 mb-2">
          <button class="btn w-100" type="button" v-on:click="getMonthPerMonthSelected(12)">
            Diciembre  
          </button> </div> 
      </div>
      <div class="row BotonesDespliegue">
        <div class="col-md-6">
          <button class="btn btn-primary  w-100" type="button" data-toggle="collapse" data-target="#collapseTable" aria-expanded="false" aria-controls="collapseTable">
          Desplegar tabla de ventas
          </button>
        </div>
        <div class="col-md-6">
          <button class="btn btn-primary w-100" type="button" data-toggle="collapse" data-target="#collapseChart" aria-expanded="false" aria-controls="collapseChart">
          Gráfica de ventas
          </button>
        </div>
      </div>
      <div class="collapse" id="collapseChart">
        <div class="small">
					<line-chart v-if="loaded" :chartdata="chartdata" :options="options" :styles="myStyles"/>
				</div>
      </div>
      <div class="collapse" id="collapseTable">
        <div class="">
					<input type="text" id="myInput" v-on:keyup="myFunction()" class="form-control buscar inputsVentas" placeholder="Filtrar servicios"/>
				</div>
        <table class="table tableVenta" >
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
        <table style="font-size:.8em" class="table table-striped" id="myTable">
          <tbody >
            <tr v-for="(venta, indexOne) of ventas" class="respons fix">
              <td class="  text-center">
                 <font-awesome-icon style="margin-right:4%" v-if="venta.pago === 'tarjeta'" icon="credit-card" />
                 <font-awesome-icon style="margin-right:4%;margin-top:5%;" v-else-if="venta.pago === 'efectivo'" icon="dollar-sign" />{{fechas[indexOne]}}
              </td>
              <td style="width: 75% !important;" class=" text-left">
                <div  v-for="(servicio,indexTwo) of venta.servicios">
                  {{servicio.servicio}}
                </div>
              </td>
              <td  class="  text-left">
                {{venta.cliente}}
              </td>
              <td class="  text-left">
                <input hidden :value="venta.manicurista" type="text">
                <div v-on:click="editarTabla()">{{venta.manicurista}}</div>
                
              </td>
              <td style="width: 30% !important;" class="  text-center">
                {{venta.descuento}}%
              </td>
              <td class="  text-right">
                {{formatPrice(venta.comision)}}
              </td>
              <td class="  text-right">
                {{formatPrice(venta.ganancialocal)}}
              </td>
              <td class="  text-right">
                {{formatPrice(venta.ganancianeta)}}
              </td>
              <td class="  text-right">
                {{formatPrice(venta.total)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <button class="CierreDia" v-on:click="daySaleClose">
        <font-awesome-icon style="margin-right:4%;margin-top:5%;" icon="cloud-upload-alt" />
      </button>
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
    this.totales(0);
    this.SalesQuantityChartFunc();
  },
  methods: {
    getVentas(){
      axios.get('ventas')
      .then(res => {
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
    totales(month){
      var fechaTotales = new Date() 
      var formatDate = fechaTotales.getFullYear()+"-"+month+"-10"
      var date = new Date(formatDate)
      var mesTotales = 0
      if (month === 0) {
        mesTotales = fechaTotales.getMonth()
      }else{
        mesTotales = date.getMonth()
      }
    
      setTimeout(() => {
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
    myFunction() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
    SalesQuantityChartFunc(){
      this.loaded = false
      axios.get('/ventas/GetSalesPerMonth')
      .then(res => {	
        const userlist = res.data
        this.chartdata = userlist
        this.loaded = true
      })
      .catch(err => {
        console.error(err)
      })
    },
    getMonthPerMonthSelected(month){
      this.loaded = false
      const date = new Date()
      const formatDate = date.getFullYear()+"-"+month+"-10"
      axios.get('/ventas/getMonthPerMonthSelected/'+formatDate)
      .then(res => {
        if (res.data.sales.length === 0) {
          this.$swal({
            type: 'error',
            title: 'No hay ventas en el mes seleccionado',
            showConfirmButton: false,
            timer: 1500
          })
          this.loaded = true
        }else{
          const userlist = res.data.chart
          this.chartdata = userlist
          this.loaded = true

          this.ventas = res.data.sales
          let fechaBien = ''
          for (let index = 0; index < res.data.sales.length; index++) {
            let fech = new Date(res.data.sales[index].fecha)
            fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ fech.getMinutes()+")"
            this.fechas.push(fechaBien)
          }
          this.totalLocal = 0
          this.gananciaNeta = 0
          this.gananciaTotal = 0
          this.localAnterior = 0
          this.netaAnterior = 0
          this.totalAnterior = 0
          this.totales(month);
        }
      })
    },
    daySaleClose(){
      this.$swal({
        title: '¿Estás seguro de hacer el Cierre?',
        text: 'No puedes revertir esta acción',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si hacer Cierre',
        cancelButtonText: 'No hacer Cierre',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          axios.get('/ventas/CloseDay')
          .then(res => {
            if (res.data.status == 'ok') {
              this.$swal({
                  type: 'succes',
                  title: 'Se hizo el cierre satisfactoriamente',
                  showConfirmButton: false,
                  timer: 500
              })
              setTimeout(() => {
                router.push({name: 'reportecierre'})
              }, 500);
            }else{
              this.$swal({
                  type: 'error',
                  title: 'Sin ventas el dia no se puede cerrar',
                  showConfirmButton: false,
                  timer: 1500
              })
            }
          })
        } else {
          this.$swal('No se hizo el cierre', 'Aborto la acción', 'info')
        }
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
    .metricss p{
      font-size: .6em;
    }
    .metricss h2{
      margin-top: 0 !important;
      font-size: 1em;
      float:left !important;
    }
  }
  @media (max-width: 700px) {
    .respons{
      font-size: 2vw;
    }
    .metricss p{
      font-size: .6em
    }
    .metricss h1{
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
  .BotonesDespliegue button{
    background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border:none !important;
    padding: 12px;
    font-size: 1.1em;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
    font-family: 'Raleway', sans-serif !important;
    font-weight:600 !important;
    letter-spacing: .2em
  }
  .BotonesFiltro button{
    background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border:none !important;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
    font-family: 'Raleway', sans-serif !important;
    letter-spacing: 0.15em;
    color:cornsilk;
    -webkit-transition: background-color 500ms ease-out 1s;
    -moz-transition: background-color 500ms ease-out 1s;
    -o-transition: background-color 500ms ease-out 1s;
    transition: background-color 500ms ease-out 1s;
  }
  .BotonesFiltro button:hover{
    color:darkgray;
    background: #0F2027;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #0F2027, #203A43, #2C5364);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #0F2027, #203A43, #2C5364); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    -webkit-transition: background-color 500ms ease-out 1s;
    -moz-transition: background-color 500ms ease-out 1s;
    -o-transition: background-color 500ms ease-out 1s;
    transition: background-color 500ms ease-out 1s;
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
    background: #a73737;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #a73737, #7a2828);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #a73737, #7a2828); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .metricss{
		height: auto;
		background-color: #fff;
		margin:10px;
    padding: auto;
    margin-top: 20px;
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
	}
	.metricss p{
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
  .inputsVentas{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #102229 !important;
		background-color:transparent !important;
		color:#000 !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
  .CierreDia{
    width: 60px;
    height:60px;
    border-radius: 50%;
    background-color:#a73737;
    color: azure;
    cursor: pointer;
    border:none;
    -webkit-box-shadow: -1px 2px 15px 38px rgba (0,0,0,0.75);
    -moz-box-shadow: -1px 2px 15px 38px rgba (0,0,0,0.75);
    box-shadow: -1px 2px 15px 38px rgba (0,0,0,0.75);
    position:fixed;
    top:90%;
    right:2%;
    font-size: 1.3em;
    outline: none !important;
    transition: all 0.5s ease-out;
  }
  .CierreDia:hover{
    background-color:#0F2027;
    color: azure;
    transition: all 0.5s ease-out;
  }
</style>
