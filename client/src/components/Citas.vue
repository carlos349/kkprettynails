<template id="">
  <div class="container-fluid">
    <div class="row">
      <div id="mySidenav" class="col-sm-2 menuVertical">
          <ul class="listaMenu">
            <li v-on:click="aja()"><span></span>Generar cita</li>
            <router-link class="rout" to="/venta"><li>Procesar venta</li></router-link>
            <li>Eliminar cita</li>
                      </ul>
            <select id="manicuristas" name="manicuristas">
                <option value="otra">Manicuristas</option>
                <option v-for="manicurista of manicuristas">{{manicurista.nombre}}</option>
              </select>

          <vue-cal  class="calendarioo vuecal--rounded-theme vuecal--green-theme"
                   xsmall
                   hide-view-selector
                   :time="false"
                   events-count-on-year-view
                   default-view="month"
                   :locale="locale"
                   :events="eventos"
                   :disable-views="['week']">
          </vue-cal>
        </div>
        <div style="padding-left:2%;" id="calen" class="col-sm-10">
          <span class="boton"  v-on:click="Menu()">
            <font-awesome-icon :icon="['fas', 'angle-left']" id="clo" hidden class="clo" />
            <font-awesome-icon :icon="['fas', 'angle-right']" id="ope" hidden />
            
            </span>

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
        </div>
      </div>

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
                  <option value="16:00">16:00 pm</option>
                  <option value="17:00">17:00 pm</option>
                  <option value="18:00">18:00 pm</option>
                  <option value="19:00">19:00 pm</option>
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
                  <option value="17:00">17:00 pm</option>
                  <option value="18:00">18:00 pm</option>
                  <option value="19:00">19:00 pm</option>
                  <option value="19:00">20:00 pm</option>
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
      Menu() {
        $('#mySidenav').toggle('slow')
        $('#calen').toggleClass("col-sm-12")
        $('#ope').toggleClass("ope")
        $('#clo').toggleClass("clo")
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
  .vuecal__menu {background-color: #213b45;}
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title-bar {background-color: #213b45;color:white;}

  .vuecal__time-column .vuecal__time-cell{color:white;height:1vh;}
  .vuecal__event{color:#fff;font-weight:bold}
  .vuecal__cell-events-count{margin-top:-40px;font-size:20px;background-color:transparent;color:#17a2b8}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
  .vuecal__cell-date{color:#000;font-family: 'Raleway', sans-serif;
  font-weight:600;}
  .vuecal__heading span{color:#000;font-family: 'Raleway', sans-serif;
  font-weight:600;}
  .vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view) .vuecal__cell-content {
    background-color: #274a58;
}
.vuecal--green-theme .vuecal__title-bar {
    background-color: #213b45;
}
  .vuecal__cell-events-count {
    width: 10px !important;
    min-width: 0 !important;
    height: 10px !important;
    padding: 0 !important;
    margin-top:1%;
    color: transparent !important;
  }

  .calendario{
    max-height: 70vh;
    margin-top:2%
  }
  .calendarioo{
    max-height:40vh;
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
  .menuVertical{
    height:92.8vh;
    background-color:#213b45;
    transition: 0.3s;
    

  }
  .listaMenu{
    color:white;
    margin-top:10%;
    margin-bottom:10%;
  }
  .boton{
    position:absolute;
    top:40%;
    left:0;
    background-color:#213b45;
    padding:10px;
    padding-top:20px;
    padding-bottom:20px;
    color:white;
    cursor:pointer;
  }
  .ope{
    display:block !important;
  }
  .clo{
    display:block !important;
  }

  .listaMenu li{
    padding:10px;
    border-right:4px solid #425861;
    margin-top:5px;
    list-style-type: none;
    cursor:pointer;
    margin-left:-15%;
    height:5vh;
  }
  .listaMenu li:hover{
    border-top:1px solid #425861;
    border-bottom:1px solid #425861;
    border-left:1px solid #425861;
  }
  .rout{
    color:white;
    text-decoration:none !important;

  }
  .rout:hover{
    color:white !important;
  }
  #manicuristas{
    padding:10px;
    border:none;
    border-right:4px solid #425861;
    list-style-type: none;
    cursor:pointer;
    height:5vh;
    background-color:transparent;
    color:white;
    font-family: 'Raleway', sans-serif;
    font-weight:600;
    width:100%;
    outline:none;
    background-color:#213b45;
  }
  #manicuristas option{
    font-family: 'Raleway', sans-serif;
    font-weight:600;
  }
</style>
