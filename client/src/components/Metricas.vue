<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="small">
          <line-chart />
        </div>

      </div>
      <div class="col-md-6 mt-5" >
        <h1>Top #10</h1>
        <table class="table">
          <thead>
            <tr class="bg-info text-white text-center">
              <th>Cliente</th>
              <th>Participación</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="participacion of participaciones" class="text-center">
              <td class="table-info font-weight-bold text-center">{{participacion.nombre}}</td>
              <td class="table-info font-weight-bold text-center">{{participacion.participacion}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
<script>
  import LineChart from './LineChart.js'
  import axios from 'axios'
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'

  class Participacion {
    constructor (nombre, participacion) {
      this.cliente = nombre
      this.participacion = participacion
    }
  }

  export default {
    components: {
      LineChart,
      VueCal
    },
    data () {
      return {
        datacollection: null,
        participacion: new Participacion(),
  			participaciones: []
      }
    },
    created(){
      this.getParticipacion()

    },
    methods: {
      getParticipacion () {
        axios.get('metrics/top')
        .then(res => {
          this.participaciones = res.data
        })
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
  .vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title-bar {background-color: #e4f5ef;}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
</style>
