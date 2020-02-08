<template>
    <div class="container-fluid">
      <div class="col-md-12 row sectionMetricssSales">
				<div class="col-md-2 col-sm-5 metricssSales first">
					<p>Total de ventas</p>
					<h2>{{ventas.length}}</h2>
				</div>
				<div class="col-md-3 col-sm-5 metricssSales first">
          <div class="row metricTotalSales">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5 class="text-right">{{localAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Total local</p></div>
            <div class="col-sm-8"><h3 class="text-right mt-2">{{totalLocal}} $</h3></div> 
          </div>
				</div>
				<div class="col-md-3 col-sm-5 metricssSales first">
          <div class="row metricTotalSales">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5 class="text-right">{{netaAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Ganancia</p></div>
            <div class="col-sm-8"><h3 class="text-right mt-2">{{gananciaNeta}} $</h3></div> 
          </div>
				</div>
        <div class="col-md-3 col-sm-5 metricssSales first">
          <div class="row metricTotalSales">
            <div class="col-sm-6 ant"><h6>Mes anterior</h6></div>
            <div class="col-sm-6 ant"><h5 class="text-right">{{totalAnterior}} $</h5></div>
            <div class="col-sm-4"><p>Total</p></div>
            <div class="col-sm-8"><h3 class="text-right mt-2">{{gananciaTotal}} $</h3></div> 
          </div>
				</div>
			</div>
      <div class="row">
        <div class="col-md-3">
          <div class="pt-3 pb-3 " style="padding-left:20%;">
            <datetime placeholder="Filtrar día" class="theme-blue  SalesInputs"  v-model="justOneDay" :phrases="{ok: 'Elegir', cancel: 'Salir'}" :format="{ year: 'numeric', month: 'long', day: 'numeric'}" auto></datetime>
          </div>
        </div>
        <div class="col-md-2">
          <div class="pt-3 pb-3">
            <button class="btn findSales w-75" v-on:click="findSalesByDay">
              Filtrar día
            </button>
          </div>
        </div>
        <div class="col-md-2">
          <div class="pt-3 pb-3" >
            <datetime placeholder="Desde" class="theme-blue SalesInputs"  v-model="fechaDesde" :phrases="{ok: 'Elegir', cancel: 'Salir'}" :format="{ year: 'numeric', month: 'long', day: 'numeric'}" auto></datetime>
          </div>
        </div>
        <div class="col-md-2">
          <div class="pt-3 pb-3">
            <datetime placeholder="Hasta" class="theme-blue SalesInputs"  v-model="fechaHasta" :phrases="{ok: 'Elegir', cancel: 'Salir'}" :format="{ year: 'numeric', month: 'long', day: 'numeric'}" auto></datetime>
          </div>
        </div>
        <div class="col-md-2">
          <div class="pt-3 pb-3">
            <button class="btn findSales w-100" v-on:click="findSalesByDate">
              Filtar rango
            </button>
          </div>
        </div>
      </div>

        <div class="row">
					<div class="col-md-12">
            <div class="shadow">	
              <v-client-table class="text-center tableVentas"  :data="ventas" :columns="columns" :options="optionsT">
                <div slot="print"  slot-scope="props">
                  <button v-if="props.row.status" style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-colorsPrint"><font-awesome-icon icon="copy" /></button>
                  <button v-else style="width:100%;" v-on:click="reporteVenta(props.row._id)" class=" btn btn-danger"><font-awesome-icon icon="copy" /></button>
                </div>
                <div slot="servicios" slot-scope="props">
                  <button  class="btn btn btn-colorsPrint" type="button" data-toggle="collapse" :data-target="'#servi'+props.index" aria-expanded="false" aria-controls="multiCollapseExample2">Mostrar Servivios</button>
                  <div class="collapse multi-collapse" :id="'servi'+props.index">
                    <div class="card card-body">
                    {{props.row.servicios}}
                    </div>
                  </div>
                  
                </div>
                <p slot="lender" slot-scope="props">{{justName(props.row.manicurista)}}</p>
                <p slot="descuentoo" slot-scope="props">{{props.row.descuento}}%</p>
                <p slot="comisionn" slot-scope="props">{{formatPrice(props.row.comision)}}</p>
                <p slot="locall" slot-scope="props">{{formatPrice(props.row.ganancialocal)}}</p>
                <p slot="totall" slot-scope="props">{{formatPrice(props.row.total)}}</p>
              </v-client-table>
            </div>
          </div>
				</div>

      <div class="modal fade" id="modalDetalleSale" tabindex="-1"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered "  >
          <div class="modal-content p-3" style="background-color:#fff;">
            <div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
              <h3 class="modal-title font-weight-bold text-white" id="exampleModalCenterTitle">Detalle de la venta</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true" class="text-white" v-bind:style="{ 'font-size': '1.5em'}">&times;</span>
              </button>
            </div>
            <div  class="modal-body row">
              <div class="form-group col-md-6">
                <label for="name">Fecha</label>
                <h4>{{formatDate(arreglo.fecha)}}</h4>
              </div>
              <div class="form-group col-md-6">
                <label for="name">Nombre del cliente</label>
                <h4>{{justNameTwo(arreglo.cliente)}} <br> {{justNameThree(arreglo.cliente)}}</h4>
              </div>
              <div class="form-group col-md-6">
                <label for="name">Nombre del prestador</label>
                <h4>{{justName(arreglo.manicurista)}}</h4>
              </div>
              <div class="form-group col-md-6">
                <label for="name">Métodos de pago</label>
                <label v-if="arreglo.pagoEfectivo > 0">Efectivo: {{formatPrice(arreglo.pagoEfectivo)}}</label>
                <label v-if="arreglo.pagoRedCDebito > 0">RedCompra Debito: {{formatPrice(arreglo.pagoRedCDebito)}}</label>
                <label v-if="arreglo.pagoRedCCredito > 0">RedCompra Credito: {{formatPrice(arreglo.pagoRedCCredito)}}</label>
                <label v-if="arreglo.pagoTransf > 0">Transferencia: {{formatPrice(arreglo.pagoTransf)}}</label>
                <label v-if="arreglo.pagoOtros > 0">Otros: {{formatPrice(arreglo.pagoOtros)}}</label>
              </div>
              <ul class="list-group mb-2 " style="width:100%;">
                <li class="list-group-item"  style="background-color: transparent !important">Servicios:
                  <span v-for="(service, index) of arreglo.servicios" :key="service._id" style="margin-bottom:-5px"> 
                    <span v-if="index == 0"> {{service.servicio}}</span>
                    <span v-else> / {{service.servicio}}</span>
                  </span> 
                </li>
                <li class="list-group-item" style="background-color: transparent !important"><h5>Comisión: <span style="float:right;"> {{ formatPrice(arreglo.comision) }}</span></h5></li>
                <li class="list-group-item" style="background-color: transparent !important"><h5>Ganancia del local:<span style="float:right;"> {{ formatPrice(arreglo.ganancialocal) }}</span></h5></li>
                <li class="list-group-item" style="background-color: transparent !important"><h5>Descuento: <span style="float:right;"> {{arreglo.descuento }}% </span></h5></li>
                <li v-if="arreglo.design" class="list-group-item" style="background-color: transparent !important"><h5>Diseño: <span style="float:right;"> {{ formatPrice(arreglo.design) }}</span></h5></li>
                <li class="list-group-item" style="background-color: transparent !important"><h5>Total:<span style="float:right;"> {{ formatPrice(arreglo.total) }}</span></h5></li>
              </ul>
              
              <button v-if="arreglo.status" class="btn w-100 add" v-on:click="cancelSale(arreglo._id)">Anular venta</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import LineChart from '../plugins/LineChart.js'
import router from '../router'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
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
    LineChart,
    Datetime
	},
  data(){
    return {
      columns:['fecha' , 'servicios' , 'cliente' , 'lender' , 'descuentoo' , 'comisionn' , 'locall', 'totall', 'print'],
			optionsT: {
				filterByColumn: true,
				texts: {
					filter: "Filtrar:",
					filterBy: 'Filtrar por {column}',
					count:' '
				},
				headings: {
					fecha: 'Fecha ',
					servicioss: 'Servicios ',
					cliente: 'Cliente ',
					lender: 'Prestador ',
					descuentoo: 'Descuento ',
          comisionn: 'Comision ',
          locall: 'Local ',
          totall: 'Total',
          print: 'Reporte'
				},
				pagination: { chunk:10 },
				pagination: { dropdown:true },
				pagination: { nav: 'fixed' },
				pagination: { edge: true },
				sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
				sortable: ['fecha'],
				filterable: ['fecha']
			},
      venta: new Ventas(),
      ventas: [],
      ventasAnterior: [],
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
      arreglo: [],
      fechaDesde: '',
      fechaHasta: '',
      justOneDay: ''
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
     
      const config = {headers: {'x-access-token': localStorage.userToken}}
      axios.get('ventas', config)
      .then(res => {
        this.ventas = res.data
        let fechaBien = ''
        for (let index = 0; index < this.ventas.length; index++) {
          let fech = new Date(this.ventas[index].fecha)
          fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ fech.getMinutes()+")"
          this.ventas[index].fecha = fechaBien
          let servicio = ''
          for (let indexTwo = 0; indexTwo < this.ventas[index].servicios.length; indexTwo++) {
            servicio = servicio +'\n'+ this.ventas[index].servicios[indexTwo].servicio
          }
          this.ventas[index].servicios = servicio
        }
      }).catch(err => {
        this.$swal({
          type: 'error',
          title: 'Acceso invalido, ingrese de nuevo, si el problema persiste comuniquese con el proveedor del servicio',
          showConfirmButton: false,
          timer: 2500
        })
        router.push({name: 'Login'})
      })
    },
    async findSalesByDate(){
      const dateDesde = new Date(this.fechaDesde)
      const dateHasta = new Date(this.fechaHasta)
      const formatDesde = dateDesde.getFullYear() +"-"+(dateDesde.getMonth() + 1)+"-"+dateDesde.getDate()
      const formatHasta = dateHasta.getFullYear() +"-"+(dateHasta.getMonth() + 1)+"-"+dateHasta.getDate()
      const Dates = formatDesde+':'+formatHasta
      
      try {
        const sales = await axios.get('ventas/findSalesByDate/'+Dates)
        if (sales.data.status == 'no Sales') {
          this.$swal({
            type: 'error',
            title: 'No hay ventas entres las fechas seleccionadas',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.ventas = sales.data.status
          let fechaBien = ''
          for (let index = 0; index < this.ventas.length; index++) {
            let fech = new Date(this.ventas[index].fecha)
            fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ fech.getMinutes()+")"
            this.ventas[index].fecha = fechaBien
            let servicio = ''
            for (let indexTwo = 0; indexTwo < this.ventas[index].servicios.length; indexTwo++) {
              servicio = servicio +'\n'+ this.ventas[index].servicios[indexTwo].servicio
              
            }
            this.ventas[index].servicios = servicio
          }
        }
      }
      catch(err){
        console.log(err)
      }
    },
    async findSalesByDay(){
      const dateDesde = new Date(this.justOneDay)
      const formatDesde = dateDesde.getFullYear() +"-"+(dateDesde.getMonth() + 1)+"-"+dateDesde.getDate()
      dateDesde.setDate(dateDesde.getDate() + 1)
      const formatHasta = dateDesde.getFullYear() +"-"+(dateDesde.getMonth() + 1)+"-"+dateDesde.getDate()
      const Dates = formatDesde+':'+formatHasta
      console.log(Dates)

      try {
        const sales = await axios.get('ventas/findSalesByDay/'+Dates)
        if (sales.data.status == 'no Sales') {
          this.$swal({
            type: 'error',
            title: 'No hay ventas en la fecha seleccionada',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.ventas = sales.data.status
          let fechaBien = ''
          for (let index = 0; index < this.ventas.length; index++) {
            let fech = new Date(this.ventas[index].fecha)
            fechaBien = fech.getDate() +"/"+ (fech.getMonth() + 1) +"/"+fech.getFullYear() +" "+" ("+ fech.getHours()+":"+ fech.getMinutes()+")"
            this.ventas[index].fecha = fechaBien
            let servicio = ''
            for (let indexTwo = 0; indexTwo < this.ventas[index].servicios.length; indexTwo++) {
              servicio = servicio +'\n'+ this.ventas[index].servicios[indexTwo].servicio
              
            }
            this.ventas[index].servicios = servicio
          }
        }
      }catch(err){
        console.log(err)
      }
    },
    sacarReporte() {
      $('.afuera').hide()
      print()
      $('.afuera').show()
    },
    totales(month){
      axios.get('ventas/totalSales/'+month)
      .then(res => {
        this.totalLocal = this.formatPrice(res.data.totalLocal)
        this.gananciaNeta = this.formatPrice(res.data.gananciaNeta)
        this.gananciaTotal = this.formatPrice(res.data.gananciaTotal)
        this.localAnterior = this.formatPrice(res.data.localAnterior)
        this.netaAnterior = this.formatPrice(res.data.netaAnterior)
        this.totalAnterior = this.formatPrice(res.data.totalAnterior)
      })
    },
    myFunctionVentas() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInputVentas");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTableVentas");
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
    justName(value){
      if(value){
        const split = value.split('/')
				return split[0]
      }
    },
    justNameTwo(value){
      if(value){
        const split = value.split('-')
				return split[0]
      }
    },
    justNameThree(value){
      if(value){
        const split = value.split('-')
				return split[1]
      }
		},
    async cancelSale(id){
        const cancelSale = await axios.put('/ventas/'+id, {
          comision: this.arreglo.comision,
          prestador: this.arreglo.manicurista
        })
        if (cancelSale.data.status == 'ok') {
          this.$swal({
            type: 'success',
            title: 'Venta anulada',
            showConfirmButton: false,
            timer: 1500
          })
          this.getVentas()
          this.arreglo.status = false
        }
        else{
          this.$swal({
            type: 'error',
            title: 'no se pudo anular la venta',
            showConfirmButton: false,
            timer: 2500
          }) 
        }
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
          console.log(res.data)
          const userlist = res.data.chart
          this.chartdata = userlist
          this.loaded = true
          this.ventas = res.data.sales
          let fechaBien = ''
          this.fechas = []
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
    async reporteVenta(id) {
        try {
            const sale = await axios.get('ventas/getSale/'+id)
            this.arreglo = sale.data
            $('#modalDetalleSale').modal('show')
        } catch(err) {
              this.$swal({
                type: 'error',
                title: 'error técnico',
                showConfirmButton: false,
                timer: 1500
            })
        }
    },
    verte(nojoda){
      console.log(nojoda)
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    formatDate(date) {
				let dateFormat = new Date(date)
				return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()+" "+" ("+ dateFormat.getHours()+":"+ dateFormat.getMinutes()+")"
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
    .metricssSales p{
      font-size: .6em;
    }
    .metricssSales h2{
      margin-top: 0 !important;
      font-size: 1em;
      float:left !important;
    }
  }
  @media (max-width: 700px) {
    .respons{
      font-size: 2vw;
    }
    .metricssSales p{
      font-size: .6em
    }
    .metricssSales h1{
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
    background-size: 300% 100%;
    background-image: linear-gradient(to right, #1F5673, rgb(78, 120, 141), rgb(38, 90, 117), rgb(66, 104, 124));
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
    padding: 12px;
    font-size: 1.1em;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
    font-family: 'Raleway', sans-serif !important;
    font-weight:600 !important;
    letter-spacing: .2em;
    border:none !important;
  }
  .BotonesDespliegue button:hover{
    background-position: 100% 0;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  .BotonesFiltro{
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    height: 55px;
    text-align:center;
    border: none;
    background-size: 300% 100%;
    background-image: linear-gradient(to right, #1F5673, rgb(78, 120, 141), rgb(38, 90, 117), rgb(66, 104, 124));
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  .BotonesFiltro:hover{
    background-position: 100% 0;
    color: #fff;
    moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  .BotonesFiltro:focus {
    outline: none;
  }
  .table{
    table-layout: fixed;
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
		background:rgba(238, 238, 238, 0.623); /* fallback for old browsers */
    color: #353535 !important;
	}
	.second{
		background:rgb(38, 91, 119); /* fallback for old browsers */
	}
	.three{
		background:rgb(46, 93, 117);
  }
  .four{
    background:rgb(54, 95, 116);
  }

  .metricssSales{
		height: auto;
		margin:10px;
    padding: auto;
    margin-top: 20px;
		color:#fff;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius:5px;
	}
	.metricssSales p{
		font-size: 1.3em;
		margin-top: 10px;
		
	}
	
	.sectionMetricssSales{
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
  .metricTotalSales{
    margin-top: 3%;
  }
  .ant{
    opacity: .8;
  }
  .inputVentas{
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #102229 !important;
		background-color:transparent !important;
		color:#000 !important;
		font-family: 'Raleway', sans-serif;
		font-weight:600;
	}
  .SalesInputs .vdatetime-input{
    width:100%;
    padding: 10px;
    background-color: white;
    border:none;
    
    border-radius: 5px;
    font-size: 1.4em;
  }
  .findSales{
    background-color: #353535;
    color: white;
    -webkit-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
    font-family: 'Roboto', sans-serif !important;
    font-weight: 600;
    font-size: 1.5em;
    letter-spacing: 1px;
    border-radius: 5px;
    padding: 5px;
    -webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    
  }
  .findSales:hover{
		background-color: rgb(8, 65, 95);
    color: #fff;
	}
  .btn-colorsPrint{
		background-color:#353535;
		color:#fff;
    -webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    -moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
    -webkit-transition: all 0.5s ease-out;
	}
  .VueTables--client .row{
		display:none
	}
	.VuePagination {
		text-align: center;
		display:block !important;
	}

	.vue-title {
		text-align: center;
		margin-bottom: 10px;
	}

	.vue-pagination-ad {
		text-align: center;
	}

	.glyphicon.glyphicon-eye-open {
		width: 16px;
		display: block;
		margin: 0 auto;
	}

	th:nth-child(3) {
	text-align: center;
	}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

[v-cloak] {
  display:none;
}
.tableVentas th{
	border:none !important;
}
.table-bordered tbody{
	background-color: white;
}
.tableVentas table{

 
}
.table-bordered {
	
	border-radius: 10px !important; 
}
.tableVentas thead {
		background-color: rgba(238, 238, 238, 0.623);
		color: #353535;
		text-align: center
}
.tableVentas thead th {
		border-left: 1px black !important;
}


</style>
