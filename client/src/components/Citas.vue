<template id="">
  <div class="container-fluid">
    <h1 class="text-center mt-1">Agenda de citas</h1>
    <vue-cal
       :locale="locale"
       class="calendario"
       :events="eventos"
       default-view="month"
       :disable-views="['years', 'year']"
       events-on-month-view="short"
       :on-event-click="onEventClick"
       :time-from="8 * 60"
       :time-to="18 * 60">
    </vue-cal>
    <button type="button" class="btn btn-info mt-3 citas" name="button" v-on:click="aja()">Crear cita</button>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header bg-info">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar manicurista</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="registroCita">
							<div class="form-group">
								<label for="nombre">Fecha</label>
								<input type="date" v-model="fecha" class="form-control" name="nombreManicurista" placeholder="Nombre de la manicurista" >
                <label for="nombre">Horario entrada</label>
                <select class="form-control" v-model="entrada">
                  <option>Seleccione</option>
                  <option value="08:00">08:00 am</option>
                  <option value="09:00">09:00 am</option>
                  <option value="10:00">10:00 am</option>
                  <option value="11:00">11:00 am</option>
                  <option value="12:00">12:00 am</option>
                  <option value="13:00">13:00 pm</option>
                  <option value="14:00">14:00 pm</option>
                  <option value="15:00">15:00 pm</option>
                </select>
                <label for="nombre">Horario Salida</label>
                <select class="form-control" v-model="salida">
                  <option>Seleccione</option>
                  <option value="09:00">09:00 am</option>
                  <option value="10:00">10:00 am</option>
                  <option value="11:00">11:00 am</option>
                  <option value="12:00">12:00 pm</option>
                  <option value="13:00">13:00 pm</option>
                  <option value="14:00">14:00 pm</option>
                  <option value="15:00">15:00 pm</option>
                  <option value="16:00">16:00 pm</option>
                </select>
							</div>
              <div class="form-group">
								<label for="identidad">Servicio</label>
                <select class="form-control" v-model="serv">
                  <option>Seleccione</option>
                  <option v-for="servicio of servicios" :value='servicio.nombre'>{{servicio.nombre}}</option>
                </select>
							</div>
							<div class="form-group">
								<label for="identidad">Manicurista</label>
                <select class="form-control" v-model="mani" >
                  <option>Seleccione</option>
                  <option v-for="manicurista of manicuristas" :value='manicurista.nombre'>{{manicurista.nombre}}</option>
                </select>
							</div>
              <div class="form-group">
								<label for="nombre">Nombre cliente</label>
								<input type="text" v-model="nombreCliente" class="form-control" name="nombreServicio" placeholder="Nombre del Cliente" >
							</div>
							<button class="btn btn-lg btn-info btn-block" type="submit">Registrar cita</button>
		        </form>
		      </div>
		    </div>
		  </div>
		</div>
    <div class="modal fade" id="myModalTwo" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header bg-info">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">{{ selectedEvent.title }}</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <p>Fecha: {{ selectedEvent.startDate }}</p>
            <strong>Detalle de la cita:</strong><br><br>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Manicurista: {{ selectedEvent.content }}</li>
              <li class="list-group-item">Hora de inicio: {{ selectedEvent.startTime }}</li>
              <li class="list-group-item">Hora de finalización: {{ selectedEvent.endTime }}</li>
            </ul><br>
            <button type="button" class="btn btn-danger font-weight-bold" v-on:click="borrarCita(selectedEvent._id)">Borrar cita</button>
		      </div>
		    </div>
		  </div>
		</div>
  </div>

</template>
<script type="text/javascript">
  import axios from 'axios'
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'

  class Event {
    constructor (start, end, title, content) {
      this.start = start
      this.end = end
      this.title = title
      this.content = content
    }
  }

  class Manicurista{
  	constructor(nombre, documento, porcentaje, comision) {
  		this.nombre = nombre;
  		this.documento = documento;
  		this.porcentaje = porcentaje;
  		this.comision = comision;
  	}
  }

  class Servicio{
		constructor(nombre, precio) {
			this.nombre = nombre;
			this.precio = precio;
		}
	}

  export default  {
    components: {
      VueCal
    },
    data () {
      return {
        locale: ['es'],
        start:'',
        startHora:'',
        evento: new Event(),
        eventos: [],
        manicurista: new Manicurista(),
  			manicuristas: [],
        servicio: new Servicio(),
 			 	servicios: [],
        mani: 'Seleccione',
        serv:'Seleccione',
        entrada: 'Seleccione',
        salida:'Seleccione',
        fecha: '',
        nombreCliente: '',
        selectedEvent: {}
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
      this.getCitas(),
      this.getManicuristas(),
      this.getServicios()
    },
    methods: {
      onEventClick(event, e){
        this.selectedEvent = event
        $('#myModalTwo').modal('show')
        e.stopPropagation()
      },
      getCitas () {
        axios.get('citas')
        .then(res => {
          console.log(res.data)
          this.eventos = res.data
        })
      },
      getManicuristas(){
  			axios.get('manicuristas')
  			.then(res => {
  				this.manicuristas = res.data
  			})
  		},
      getServicios() {
				axios.get('servicios')
				.then(res => {
					this.servicios = res.data
				})
			},
      aja() {
        $('#myModal').modal('show')
      },
      registroCita(){
        const horarioEntrada = this.fecha + " " + this.entrada
        const horarioSalida = this.fecha + " " + this.salida
        const contenidoCompleto = "Servicio: " + this.serv + " - Cliente: " + this.nombreCliente
        axios.post('citas', {
          entrada: horarioEntrada,
          salida: horarioSalida,
          titulo: contenidoCompleto,
          contenido: this.mani
        })
        .then(res => {
          if(res.data.status == 'cita creada'){
            this.$swal({
						  type: 'success',
						  title: 'Cita creada',
						  showConfirmButton: false,
						  timer: 1500
						})
						$('#myModal').modal('hide')
						this.getCitas();
          }else{
            this.$swal({
						  type: 'error',
						  title: 'Cita ocupada',
						  showConfirmButton: false,
						  timer: 1500
						})
          }
        })
      },
      borrarCita(id){
        axios.delete('citas/' + id)
        .then(res => {
          if(res.data.status == 'Cita Eliminada'){
            this.$swal({
						  type: 'success',
						  title: 'Cita eliminada',
						  showConfirmButton: false,
						  timer: 1500
						})
            $('#myModalTwo').modal('hide')
						this.getCitas();
          }
        })
      }

    }
  }

</script>
<style media="screen">
  .vuecal__menu {background-color: #17a2b8;}
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title-bar {background-color: #17a2b8;}
  .vuecal__cell-date{height:80px;}
  .vuecal__time-column .vuecal__time-cell{color:black}
  .vuecal__event{color:#E6E8EF;font-weight:bold}
  .vuecal__cell-events-count{margin-top:-40px;font-size:20px;background-color:transparent;color:#17a2b8}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
  .calendario{
    max-height: 90vh;
    margin-top:2%
  }
  .vuecal__event{
    background-color:#4369E8;
    opacity: 0.5;
  }
  .vuecal__event:hover{
    background-color:#4369E8;
    opacity: 1;
    z-index:10
  }
  .citas{
    padding:10px;
    font-weight: bold;
    width: 10%
  }
</style>
