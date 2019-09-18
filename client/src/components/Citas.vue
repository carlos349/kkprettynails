<template id="">
  <div class="container-fluid">
    <div class="row">
      <div v-bind:style="{ 'background-image': 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(' + require('../assets/sidebar.jpg') + ')' , 'background-size': 'cover' }" id="mySidenav" class="col-sm-2 menuVertical">
          <ul class="listaMenu">
            <li  data-toggle="modal" data-target=".genCita"><span></span>Generar cita</li>
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
                   :events="events"
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
             :events="events"
             :time-from="8 * 60"
             :time-to="20 * 60"
             default-view="month"
             :disable-views="['years', 'year']"
             events-on-month-view="short"
             :on-event-click="onEventClick"
             :noEventOverlaps = "true"
             >
          </vue-cal>
        </div>
      </div>
      

    <div class="modal fade genCita bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
      <div v-bind:style="{ 'background-image': 'url(' + require('../assets/fondo.jpg') + ')' , 'background-size': 'cover' }" class="modal-content armarCita p-3">
        <div style="box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);background-color:rgba(0, 0, 0, 0.5)" class="container p-3">
          <div class="row">
            <div style="font-size:1.5em;color:azure;" class="col-md-12 text-center p-3">Arma tu cita</div>
            <div style="background-color:rgba(0, 0, 0, 0.4);color:azure;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)" class="col-md-12 font-weight-bold px-3">
              <div style="margin:auto" class="row text-center">
                <div class="wOne p-3 mx-auto col-md-3 marc">Servicio</div>
                <div class="wTwo p-3 mx-auto col-md-3">Manicurista</div>
                <div class="wThree p-3 mx-auto col-md-3">Información</div>
              </div>
            </div>
            <div class="col-md-12 p-3 processOne">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#9e9e9e">Selecciona los servicios a utlizar</div>
              <div style="height:40vh;overflow:hidden;overflow-x: hidden;
		overflow-y:scroll;" class="scroll row p-1" >
                <div class="col-md-6" v-for="(servicio,index) of servicios">
                  <div class="p-2 servPretty" v-on:click="marcarServicio(servicio.prestadores,servicio.nombre,servicio.tiempo,index)">
                    <div class="row">
                      <div class="serviInfo col-md-2"><font-awesome-icon icon="user-check" class="mr-2"/>{{servicio.prestadores.length}}</div>
                      <div class="serviInfo col-md-7">{{servicio.nombre}}</div>
                      <div class="col-md-3">{{servicio.tiempo}}Mins <span :id="index" class="serviInfoPrestadores ml-2">0</span> </div> 
                    </div>
                  </div>
                </div>   
              </div>
            </div>
            <div class="col-md-12 p-3 processTwo">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#9e9e9e">Selecciona una manicurista</div>
              <div style="height:40vh;overflow:hidden;overflow-x: hidden;
		          overflow-y:scroll;" class="scroll row p-1" >
                <div class="col-md-4" v-for="(manicurista,index) of manicuristaCita">
                  <div v-for="(mani,index) of manicuristas" class="p-3 col-md-12" v-if="mani.documento === manicurista ">
                    
                      <div style="cursor:pointer;" v-on:click="selectManic(mani.nombre,index)" class="fotoMani col-md-12 text-center"><img :id="'mani'+index" class="imgMani" src="../assets/silueta-mujer.jpg" alt=""></div>
                      <div  class="col-md-12 text-white text-center"> {{mani.nombre}}</div>
                    
                  </div>
                </div>   
              </div>
            </div>
            <div class="col-md-12 p-3 processThree">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#9e9e9e">Seleccion un cliente, fecha y hora</div>
              <div class="container">
                <div class="mx-auto">
                <div class="row">
                  <div class=" mx-auto col-sm-12">
                    
                  </div>
                  <div class="col-md-8">
                    <div class="row">
                       <div class="col-sm-5"><autocomplete	
                      :search="search"
                      placeholder="Buscar cliente"
                      aria-label="Buscar cliente"
                      @submit="handleSubmit"
                      class="auto clientB">
                    </autocomplete></div>
                    <div class="col-sm-7"><input disabled="true" v-on:change="insertDate()" v-model="fecha" class="hora" type="date" name="" id="Dat"></div>
                    </div>  
                  </div>
                  <div class="col-md-4">
                    <div class="row">
                      <div class="col-md-5 mx-auto text-right">
                      <input v-model="hora" disabled="true" maxlength="2" placeholder="Hora" class="hora horas" ref="horas" v-on:keyup="verificarHora('horas')"  type="number" min="0" max="24">
                      </div>
                      <div style="font-size:3em" class="col-md-1 mx-auto text-center text-white">:</div>
                      <div class="col-md-5 mx-auto text-left">
                        <input minlength="1" ref="min" disabled="true" v-model="min" maxlength="2" placeholder="Min" class="hora horas" v-on:keyup="verificarHora('min')" type="number" min="0" max="60">
                      </div>
                    </div> 
                  </div> 
                </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4 "> <button v-on:click="prevOne()" disabled class="botonW Ant">Anterior</button></div>
                <div class="col-md-4 text-center"> <button id="redo" class="botonW " v-on:click="redo()"><font-awesome-icon style="color:#011627" icon="redo"/></button></div>
                <div class="col-md-4 text-right"><button v-on:click="nextOne()" disabled class="botonW Sig">Siguiente</button></div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      </div>
    </div>

    <div class="modal fade" id="myModalCitasDescripcion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div v-bind:style="{ 'background-image': 'url(' + require('../assets/fondo.jpg') + ')' , 'background-size': 'cover' }" class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">{{ selectedEvent.title }}</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body letters">
		        <p>Fecha: {{ selectedEvent.startDate }}</p>
            <strong>Detalle de la cita:</strong><br><br>
            <ul class="list-group">
              <li class="list-group-item" style="background-color: transparent !important">Manicurista: {{ selectedEvent.empleada }}</li>
              <li class="list-group-item"  style="background-color: transparent !important">Servicios:
                <p v-for="service of selectedEvent.services"> - {{ service }} </p> 
              </li>
              <li class="list-group-item" style="background-color: transparent !important">Hora de inicio: {{ selectedEvent.startTime }}</li>
              <li class="list-group-item" style="background-color: transparent !important">Hora de finalización: {{ selectedEvent.endTime }}</li>
              
            </ul><br>
            <button type="button" class="btn font-weight-bold btn-style" v-on:click="borrarCita(selectedEvent.id)">Borrar cita</button>
		      </div>
		    </div>
		  </div>
		</div>
    <button class="CierreDia" v-on:click="daySaleClose">
			<font-awesome-icon style="margin-right:4%;margin-top:5%;" icon="cloud-upload-alt" />
		</button>

    
  </div>

</template>
<script type="text/javascript">
  import axios from 'axios'
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'
  import Autocomplete from '@trevoreyre/autocomplete-vue'

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
        image: "'../assets/fondo.jpg'",
        locale: 'es',
        start:'',
        startHora:'',
        evento: new Event(),
        events: [],
        manicurista: new Manicurista(),
  			manicuristas: [],
        servicio: new Servicio(),
 			 	servicios: [],
        mani: 'Seleccione',
        serv:'Seleccione',
        hora: '',
        min: '',
        entrada: 'Seleccione',
        salida:'Seleccione',
        fecha: '',
        clients: [],
        nombreCliente: '',
        selectedEvent: {},
        servicioCita: [],
        manicuristaCita: [],
        manicuristaFinal:'',
        clientsSelect: '',
        arregloClient: [],
        duracion: 0

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
      this.getCitas()
      this.getManicuristas()
      this.getClients()
      this.getServicios()
      this.arrayClient()
    },
    methods: {
      clickedButton: function() {
        console.log(this.$refs.hora.value.length)
      },
      arrayClient(){
				setTimeout(() => {
					for (let index = 0; index < this.clients.length; index++) {
						this.arregloClient.push(this.clients[index].nombre)
					}
				}, 4000);
			},
      search(input) {
				
				if (input.length < 1) { return [] }
				return this.arregloClient.filter(client => {
					return client.toLowerCase()
					.startsWith(input.toLowerCase())
				})
				
      },
      handleSubmit(result) {
        this.clientsSelect = result
        $("#Dat").prop("disabled", false)
				console.log(this.clientsSelect)
      },
      insertDate(){
        console.log(this.fecha)
        if ($("#Dat").val() == '') {
          $(".horas").prop("disabled", true)
          $(".Sig").removeClass("marcar")
          $(".Sig").prop("disabled", true)
        }
        else{
          $(".horas").prop("disabled", false)
         
        }
      },

      verificarHora(este){
        if (this.hora.length >= 1 && this.min.length >=1 && this.hora.length < 3 && this.min.length < 3) {
          $(".Sig").addClass("marcar")
          $(".Sig").prop("disabled", false)
        }
        else{
          $(".Sig").removeClass("marcar")
          $(".Sig").prop("disabled", true)
        }
      },
      
      getClients(){
        axios.get('citas/getClients')
        .then(res => {
          this.clients = res.data
        })
      },

      onEventClick(event, e){
        this.selectedEvent = event
        $('#myModalCitasDescripcion').modal('show')
        e.stopPropagation()
      },
      getCitas () {
        axios.get('citas')
        .then(res => {
          for (let index = 0; index < res.data.length; index++) {
            let dateNow = new Date(res.data[index].date)
            let formatDate = ''
            let formatDateTwo = ''
            if (dateNow.getMonth() == 10 || dateNow.getMonth() == 11) {
              formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
              formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
            }else{
              formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
              formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
            }
            let arrayEvents = {
              start: formatDate,
              end: formatDateTwo,
              title: res.data[index].services[0]+" - "+res.data[index].employe,
              content: res.data[index].cliente,
              cliente: res.data[index].client,
              services: res.data[index].services,
              empleada: res.data[index].employe,
              id:res.data[index]._id
            }
            this.events.push(arrayEvents)
          }
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
      marcarServicio(prestadores,nombre,tiempo,index){
        
        if (this.servicioCita == '') {
          this.servicioCita.push(nombre)
          for (let index = 0; index < prestadores.length; index++) {
            this.manicuristaCita.push(prestadores[index])
          }
          console.log(this.servicioCita)
        }
        else{
          var counter = $("#"+index).text()
          var inspector = true
          var inspector2 = false
          console.log(counter)
          for (let index = 0; index < this.servicioCita.length; index++) {
            console.log(nombre + "("+ counter +")" + "-" + this.servicioCita.length )
            if (this.servicioCita[index] == nombre || this.servicioCita[index] == nombre + "("+ counter +")" ) {
              this.servicioCita.splice(index,1)
              this.servicioCita.push(nombre+ "(" + (parseFloat(counter) + parseFloat(1)) + ")")
              console.log(this.servicioCita)
              inspector = false
              break  
            }
          }
          if (inspector == true) {
            this.servicioCita.push(nombre)
          }  
          
            for (let c = 0; c < prestadores.length; c++) {
              for (let index = 0; index < this.manicuristaCita.length; index++) {
                  if (prestadores[c] == this.manicuristaCita[index]) {
                      inspector2 = true
                      break
                }
                  
              }  
              if (inspector2 == false) {
                this.manicuristaCita.push(prestadores[c])
              }
            } 
             
        }
        this.duracion = parseFloat(this.duracion) + parseFloat(tiempo)
        $("#redo").show()
        $(".Sig").addClass("marcar")
        $(".Sig").prop("disabled", false)
        $("#"+index).text(parseFloat($("#"+index).text())+1)
      },
      redo(){
        $("#redo").hide()
        this.servicioCita = []
        this.manicuristaCita = []
        $(".serviInfoPrestadores").text(0)
        $(".Sig").removeClass("marcar")
        $(".Sig").prop("disabled", true)
      },
      nextOne(){
        if($(".processTwo").css("display") == "block"){
          $(".Sig").removeClass("marcar")
          $(".Sig").prop("disabled", true)
          $(".Sig").text("Crear")
          $(".wTwo").removeClass("marc")
          $(".wThree").addClass("marc")
          $(".processTwo").hide()
          $(".processThree").show()
        }
        else if ($(".processThree").css("display") == "block") {
          this.registroCita()
          
        }
        else{
          $(".Sig").removeClass("marcar")
          $(".Sig").prop("disabled", true)
          $("#redo").hide()
          $(".processOne").hide()
          $(".processTwo").show()
          $(".Ant").addClass("marcar")
          $(".Ant").prop("disabled", false)
          $(".wOne").removeClass("marc")
          $(".wTwo").addClass("marc")
        }
        
      },
      prevOne(){
        if($(".processTwo").css("display") == "block"){
          $(".processOne").show()
          $(".processTwo").hide()
          $(".Sig").addClass("marcar")
          $(".wOne").addClass("marc")
          $(".wTwo").removeClass("marc")
          $("#redo").show()
          $(".Sig").prop("disabled", false)
          $(".Ant").removeClass("marcar")
          $(".Ant").prop("disabled", true)
        }
        else if($(".processThree").css("display") == "block"){
          this.manicuristaFinal = ''
          $(".imgMani").removeClass("maniMarcado")
          $(".processTwo").show()
          $(".processThree").hide()
          $(".wTwo").addClass("marc")
          $(".wThree").removeClass("marc")
          $(".Sig").prop("disabled", true)
          $(".Sig").text("Siguiente")
        }
      },
      registroCita(){
        const horarioEntrada = this.hora + ":" + this.min

        for (let index = 0; index < this.duracion; index++) {
          if (this.min < 60) {
            this.min++
          }
          else{
            this.hora++
            this.min = 0
          }
          
        }
        const horarioSalida = this.hora + ":" + this.min
        const mani = this.manicuristaFinal
        axios.post('citas', {
          entrada: horarioEntrada,
          salida: horarioSalida,
          fecha: this.fecha,
          cliente: this.clientsSelect,
          servicios: this.servicioCita,
          manicuristas: mani
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
            location.reload()
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
      Menu() {
        $('#mySidenav').toggle('slow')
        $('#calen').toggleClass("col-sm-12")
        $('#ope').toggleClass("ope")
        $('#clo').toggleClass("clo")
      },
      selectManic(nombre, index){
        this.manicuristaFinal = nombre
        console.log(this.manicuristaFinal)
        $(".Sig").prop("disabled", false)
        $(".Sig").addClass("marcar")
        $(".imgMani").removeClass("maniMarcado")
        $("#mani"+index).addClass("maniMarcado")
        
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
            this.events = []
            $('#myModalCitasDescripcion').modal('hide')
						this.getCitas();
          }
        })
      },
      daySaleClose(){
        axios.get('ventas/getClosingDay')
        .then(res => {
          if (res.data.status === 'bad') {
            this.$swal({
              type: 'error',
              title: 'Sin ventas el dia no se puede cerrar',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            const efectivo = res.data.efectivo
            const banco = res.data.banco
            const total = res.data.total
            this.$swal({
              title: '¿Estás seguro de hacer el Cierre?',
              html: `<p>
              Cierre en efectivo: ${this.formatPrice(efectivo)} <br> 
              Cierre en banco: ${this.formatPrice(banco)} <br>
              Total cierre: ${this.formatPrice(total)}       
              </p>`,
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si hacer Cierre',
              cancelButtonText: 'No hacer Cierre',
              showCloseButton: true,
              showLoaderOnConfirm: true
            })
            .then((result) => {
              if(result.value) {
                this.$swal({
                title: 'Por favor, escriba su nombre ^^',
                input: 'text',
                inputPlaceholder: 'Escriba su nombre aquí',
                showCloseButton: true,
              })
              .then(result => {
                axios.get('/ventas/CloseDay/'+result.value)
                .then(res => {
                  if (res.data.status == 'ok') {
                    this.$swal({
                      type: 'succes',
                      title: 'Se hizo el cierre satisfactoriamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }else{
                    this.$swal({
                      type: 'error',
                      title: 'Sin ventas el dia no se puede cerrar',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                })
              })
              }else {
                this.$swal('No se hizo el cierre', 'Aborto la acción', 'info')
              }
            })
          }
        })
      },
      formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
  .vuecal__time-column .vuecal__time-cell{
    color: #0F2027
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
    background-color:#213b45;
    opacity: 0.9;
    cursor:pointer;
  }
  .vuecal__event:hover{
    background-color:#213b45;
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
  .botonn{
    background-color: blue !important;
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
    width:100%;
    outline:none;
    background-color:#213b45;
  }
  #manicuristas option{
    font-family: 'Raleway', sans-serif;
  }

  .armarCita{
    font-weight: 300 !important;
  }
  .marc{
    background-color: #011627;
    border:solid 1px azure;
    border-radius: 5px;
    color: azure;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)
  }
  .servPretty{
    background-color: #3f51b5;
    color:#fff;
    cursor: pointer;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);
    border:4px solid transparent;
  }
  .serviInfo{
    
    border-right: 1px solid #fff;
  }
  .serviInfoPrestadores{
    background-color: #011627;
    padding: 3px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 50%;
  }
  .botonW{
    background-color: rgba(0,0,0,.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);
    padding: 15px;
    border-radius: 5px;
    border: none;
    outline: none !important;
  }
  .marcar{
    background-color: #011627;
    color:#fff;
  }
  #redo{
    display: none;
  }
  .processTwo{
    display:none;
  }
  .processThree{
    display: none;
  }

  .scroll::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
	
	}

  .imgMani{
    border:4px solid rgba(255, 255, 255, .3);
    width:70%;
    padding: 5px;
    border-radius:5px;
  }
  .maniMarcado{
    border:4px solid #011627;
    width:70%;
    padding: 5px;
    border-radius:5px;
  }

  input[type="number"]::-webkit-outer-spin-button, 
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
      -moz-appearance: textfield;
  }

  .hora{
    background-color: rgba(0,0,0,.5);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);
    padding: 15px;
    border-radius: 5px;
    border: none;
    color: azure;
    font-size: 2em;
    width: 100%;
    outline: none !important;
    text-align: center
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
  .clientB{
    background-color:#fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);
    padding: 15px;
    border-radius: 5px;
    border: none;
    color: azure;
    width: 100%;
    font-size: 2em;
    outline: none !important;
    text-align: center
    
  }

  .autocomplete-result-list{
    color: #000;
  }
  .letters{
    font-family: 'Roboto', sans-serif;
    letter-spacing: .1em;
    color:aliceblue;
  }
  .btn-style{
    background-color: transparent;
    border: solid 1px #232c6e;
    color:aliceblue;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    letter-spacing: .1em;
    -webkit-transition: background-color 500ms ease-out;
    -moz-transition: background-color 500ms ease-out;
    -o-transition: background-color 500ms ease-out;
    transition: background-color 500ms ease-out;
  }
  .btn-style:hover{
    background-color: #232c6e;
    color:aliceblue;
    -webkit-transition: background-color 500ms ease-out;
    -moz-transition: background-color 500ms ease-out;
    -o-transition: background-color 500ms ease-out;
    transition: background-color 500ms ease-out;
  }
</style>
