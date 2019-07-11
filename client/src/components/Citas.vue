<template id="">
  <div class="container-fluid">
    <h1 class="text-center mt-1">Agenda de citas</h1>
    <vue-cal
       :locale="locale"
       class="calendario"
       :events="eventos"
       default-view="month"
       :disable-views="['years', 'year']"
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
		        <form v-on:submit.prevent="">
							<div class="form-group">
								<label for="nombre">Fecha</label>
								<input type="date" class="form-control" name="nombreManicurista" placeholder="Nombre de la manicurista" >
                <label for="nombre">Horario entrada</label>
                <select class="form-control">
                  <option value="08:00">08:00 am</option>
                  <option value="09:00">09:00 am</option>
                </select>
                <label for="nombre">Horario Salida</label>
                <select class="form-control">
                  <option value="08:00">08:00 am</option>
                  <option value="09:00">09:00 am</option>
                </select>
							</div>
              <div class="form-group">
								<label for="identidad">Servicio</label>
                <select class="form-control">
                  <option value="08:00">08:00 am</option>
                </select>
							</div>
							<div class="form-group">
								<label for="identidad">Manicurista</label>
                <select class="form-control">
                  <option value="08:00">08:00 am</option>
                </select>
							</div>
							<button class="btn btn-lg btn-info btn-block" type="submit">Registrar cita</button>
		        </form>
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
        eventos: []
      }
    },
    created(){
      this.getCitas()
    },
    methods: {
      getCitas () {
        axios.get('citas')
        .then(res => {
          this.eventos = res.data

        })
      },
      aja() {
        $('#myModal').modal('show')
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
    max-height: 80vh;
    margin-top:2%
  }
  .vuecal__event{
    background-color:#4369E8
  }
  .citas{
    padding:10px;
    font-weight: bold;
    width: 10%
  }
</style>
