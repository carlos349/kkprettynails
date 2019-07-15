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
  			participaciones: []
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
  </style>
