<template id="">
  <div class="container-fluid">
    <div class="row">

          <!--  -->

        <div style="padding-left:2%;" id="calen" class="col-sm-12">
          <div style="" class="col-sm-12 mx-auto text-center p-1">
        <div class="row">
          <div class="col-sm-6">
            <button  data-toggle="modal" class="generar" data-target=".genCita"><span></span>Generar cita</button>
          </div>
          <div class="col-sm-6">
            <select id="manicuristas" v-model="empByCita" v-on:change="getCitasByEmploye()"  class="generar" name="manicuristas">
              <option selected="true
              " >{{this.empByCita}}</option>
              <option>Todos</option>
              <option  v-for="manicurista in manicuristas" v-bind:key="manicurista._id">
                  {{manicurista.nombre}}
                </option>
            </select>
          </div>
        </div>
        
        
      </div>

          <vue-cal
             :locale="locale"
             
             :events="events"
             :time-from="600 "
             :time-to="1275"
             :timeStep="15"
             :timeCellHeight="50"
             default-view="month"
             :disable-views="['years', 'year', 'week']"
             events-count-on-month-view
             :on-event-click="onEventClick"
             :overlapsPerTimeStep="true"
             >
          </vue-cal>
          
        </div>
      </div>
      

    <div class="modal fade genCita bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
      <div  class="modal-content armarCita p-3" style="background-color:#1f5673">
        <div  class="container p-4" style="background-color:white">
          <div class="row">
            <div style="font-size:1.5em;color:#011627;" class="col-md-12 text-center p-3">Arma tu cita</div>
            <div style="background-color:rgba(31, 86, 115, 0.707);color:azure;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)" class="col-md-12 font-weight-bold px-3">
              <div style="margin:auto" class="row text-center">
                <div class="wOne p-3 mx-auto col-md-3 marc">Servicio</div>
                <div class="wTwo p-3 mx-auto col-md-3">Información</div>
                <div class="wThree p-3 mx-auto col-md-3">Disponibilidad</div>
              </div>
            </div>
            <div class="col-md-12 p-3 processOne">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#1f5673">Selecciona los servicios a utlizar</div>
              <div style="height:40vh;overflow:hidden;overflow-x: hidden;
		overflow-y:scroll;background-color: rgba(31, 86, 115, 0.707);border-radius:5px;" class="scroll row p-3" >
                <div class="col-md-6" v-for="(servicio,index) of servicios">
                  <div class="p-2 servPretty" v-on:click="marcarServicio(servicio.prestadores,servicio.nombre,servicio.tiempo,index)">
                    <div class="row">
                      <div class="serviInfo col-md-2"><font-awesome-icon icon="user-check" class="mr-2"/>{{servicio.prestadores.length}}</div>
                      <div class="serviInfo col-md-7">{{servicio.nombre}}</div>
                      <div class="col-md-3">{{servicio.tiempo}}min. <span :id="'p'+index" class="serviInfoPrestadores" style="float:right;">0</span> </div> 
                    </div>
                  </div>
                </div>   
              </div>
            </div>
            <div class="col-md-12 p-3 processThree">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#9e9e9e">Seleccione un horario disponible</div>
              
              <div style="height:50vh;overflow:hidden;overflow-x: hidden;
		          overflow-y:scroll;background-color: rgba(31, 86, 115, 0.707);border-radius:5px" class="scroll row horas" >
              
                    
                      
                      <div class="col-sm-12">
                        <div class="row mx-auto mb-2">

                              <div class="col-sm-4 CMani">
                                <div class="row p-2">
                                  <img class="imgMani w-25" src="../assets/silueta-mujer.jpg" alt="">
                                <h4 class="p-3">{{manicuristaFinal}}</h4>
                                </div>
                                
                                </div>
                              
                              <div class="col-sm-8 Hdispone p-3">

                                <h2>Horas Disponibles</h2>
                                           
                              </div>
                            </div>
                        <div v-for="(bloque , index) of bloquesHora">
                          <div v-if="bloque.validator == true" v-on:click="selectBloq(bloque.Horario, index)" class="col-sm-12  horaDisp">
                            <div class="row">
                              <div class="col-sm-4 horaPred  text-center">
                                <div class="col-sm-12 ">{{bloque.Horario}}</div>
                              </div>
                              <div class="col-sm-8 ">
                                
                                <div  class="col-sm-12">Disponible</div>
                                
                              </div>
                            </div>
                            
                          </div>
                          
                          <div v-else-if="bloque.validator == false" class="col-sm-12  horaOcupada">
                            <div class="row">
                              <div class="col-sm-4 horaPred  text-center">
                                <div class="col-sm-12 ">{{bloque.Horario}}</div>
                              </div>
                              <div class="col-sm-8 ">
                                <div  class="col-sm-12">Ocupado</div>  
                               
                              </div>
                            </div>
                            
                          </div>
                          <div v-else-if="bloque.validator == 'select'" class="col-sm-12  horaSelect">
                            <div class="row">
                              <div class="col-sm-4 horaPred  text-center">
                                <div class="col-sm-12 ">{{bloque.Horario}}</div>
                              </div>
                              <div class="col-sm-8 ">
                                <div  class="col-sm-12">Seleccionado</div>  
                               
                              </div>
                            </div>
                            
                          </div>
                          <div v-else class="col-sm-12  horaCero">
                            <div class="row">
                              <div class="col-sm-4 horaPred  text-center">
                                <div class="col-sm-12 ">{{bloque.Horario}}</div>
                              </div>
                              <div class="col-sm-8 ">
                                
                                <div  class="col-sm-12 ">No seleccionable</div>
                              </div>
                            </div>
                            
                          </div>
                        </div> 
                      </div>
                     
                      
                      <!-- <div class="timeline col-sm-6"> 
                        <div v-for="(bloqueHora ,index) of bloquesHora">
                          <div v-if="index%2 == 0" class="lineCont left" v-on:click="selectTime(index,bloqueHora.Horario)">
                          <div :id="'t'+index" class="content">
                                   
                            <h4 style="color:black"></h4>                          
                          </div>
                        </div>
                        <div  v-else class="lineCont right" v-on:click="selectTime(index,bloqueHora.Horario)" >
                          <div :id="'t'+index" class="content">
                            <div class="row">
                              <div class="col-sm-8 p-3 text-left">
                                <div class="col-sm-12"><h6>{{manicuristaFinal}}</h6></div>
                                <div class="col-sm-12"><h4>{{bloqueHora.Horario}}</h4></div>
                              </div>
                              <div class="col-sm-4 p-1">
                                <img :id="'mani'+index" class="imgMani float-right" src="../assets/silueta-mujer.jpg" alt="">
                                </div>
                            </div>                          
                          </div>
                        </div>
                        </div>        
                      </div>       -->
              </div>
            </div>
            <div class="col-md-12 p-3 processPerso">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#9e9e9e">Elija un personal</div>
              <div style="height:40vh;overflow:hidden;overflow-x: hidden;
		          overflow-y:scroll;background-color: rgba(31, 86, 115, 0.707);border-radius:5px" class="scroll row horas" >      
                <div class="col-sm-12 text-center"><h2>Personal disponible</h2></div>
                <div class="col-md-4">
                  <div class="p-3 col-md-12">
                    
                      <div style="cursor:pointer;" v-on:click="selectAzar()" class="fotoMani col-md-12 text-center"><img class="imgMani" src="../assets/silueta-mujer.jpg" alt=""></div>
                      <div  class="col-md-12 text-center text-white">Elegir automáticamente</div>
                    
                  </div>
                </div> 
                <div class="col-md-4" v-for="(manicurista,index) of manicuristaCita">
                  <div v-for="(mani,index) of manicuristas" class="p-3 col-md-12" v-if="mani.documento === manicurista ">
                    
                      <div style="cursor:pointer;" v-on:click="selectManic(mani.nombre,mani.class,index)" class="fotoMani col-md-12 text-center"><img :id="'mani'+index" class="imgMani" src="../assets/silueta-mujer.jpg" alt=""></div>
                      <div  class="col-md-12 text-center text-white"> {{mani.nombre}}</div>
                    
                  </div>
                </div>   
              </div>
            </div>
            <div class="col-md-12 p-3 processTwo">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#9e9e9e">Selecciona un cliente, fecha y hora de entrada</div>
              <div class="container">
                <div class="mx-auto">
                <div style="height:40vh" class="row">
                  <div class=" mx-auto col-sm-12">
                    
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="row">
                          <div class="col-3">
                            <button class="btn btn-date p-1" v-on:click="modalCliente()">
                             <font-awesome-icon style="font-size:2em" icon="user-plus"/>
                            </button>
                          </div>
                          <vue-bootstrap-typeahead 
                            v-model="clientsSelect"
                            :data="arregloClient"
                            placeholder="Buscar clientes"
                            class=" clientB botonClient col-9"
                          />
                          
                        </div>
                        
                      </div>
                      <div  class="col-sm-6">
                        <div class="row">
                          <datetime placeholder="Click para seleccionar fecha y hora de entrada" v-on:click.once="disablear" type="datetime" input-class="dale"  class="theme-blue col-sm-11 p-3"  v-model="fecha" :phrases="{ok: 'Elegir', cancel: 'Salir'}" :min-datetime="minimo" :minute-step="15" :max-datetime="maximo" :format="{ year: 'numeric', month: 'long', day: 'numeric'}" auto>
                            
                          </datetime>
                          <div class="col-sm-1 p-3"> <font-awesome-icon style="color:#1f5673;font-size:2em" icon="calendar-alt"/></div>
                         
                        </div>
                      </div>
                    </div>  
                  </div>
                  <div class="col-md-4">
                  </div>
                  
                </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4 "> <button v-on:click="prevOne()" disabled class="botonW Ant">Anterior</button></div>
                <div class="col-md-4 text-center"> 
                  <button id="redo" class="botonW " v-on:click="redo()"><font-awesome-icon style="color:#fff" icon="redo"/>
                  </button>

                  </div>
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
		    <div v-bind:style="{ 'background-color': '#ffffff'}" class="modal-content p-3">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#1F5673'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">{{ selectedEvent.title }}</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body letters">
		        <p>Fecha: {{ selectedEvent.startDate }}</p>
            <strong>Detalle de la cita:</strong><br><br>
            <ul class="list-group">
              <li class="list-group-item" style="background-color: transparent !important">Cliente: {{ selectedEvent.cliente }}</li>
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
    <div class="modal fade" id="myModalRegisterClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header " v-bind:style="{ 'background-color': '#1F5673'}">
		        <h5 class="modal-title font-weight-bold text-white" id="exampleModalCenterTitle">Registro cliente</h5>
		        
		      </div>
		      <div class="modal-body">
				  <form v-on:submit.prevent="ingresoCliente">
					<div class="form-group">
						<label for="name">Nombre del cliente</label>
						<input v-model="nombreClienteRegister" type="text" class="form-control inputs" placeholder="Nombre del prestador">
					</div>
					<div class="form-group">
						<label for="identidad">Instagram o Correo del cliente</label>
						<input v-model="instagramCliente" type="text" class="form-control inputs" placeholder="registre instagram o correo">
					</div>
          <div class="form-group">
              <label for="recomendacion">Registre recomendador</label>
              <vue-bootstrap-typeahead 
                v-model="nombreCliente"
                :data="arregloClient"
                placeholder="Buscar clientes"
              />
          </div>
					<button class="btn w-100 add">Agregar cliente</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
    <div class="boxDates">
      <button class="CierreDia btn-whiteDates btn-animation-1" v-on:click="daySaleClose">
        <font-awesome-icon icon="cloud-upload-alt" />
      </button>
    </div>
    
    

    
  </div>

</template>
<script type="text/javascript">
//prueba para github connect slack
  import axios from 'axios'
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
  import { Datetime } from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'
  import DatePick from 'vue-date-pick';
	import 'vue-date-pick/dist/vueDatePick.css';
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
      VueCal,
      DatePick,
      VueBootstrapTypeahead,
      Datetime
    },
    data () {
      return {
        image: "'../assets/fondo.jpg'",
        arregloHora:[],
        locale: 'es',
        start:'',
        minimo:'',
        maximo:'',
        design:'',
        startHora:'',
        evento: new Event(),
        events: [],
        manicurista: new Manicurista(),
        manicuristas: [],
        classM: [],
        classFinal:'',
        servicio: new Servicio(),
 			 	servicios: [],
        mani: 'Seleccione',
        serv:'Seleccione',
        hora: '',
        min: '',
        entrada: 'Seleccione',
        salida:'Seleccione',
        clients: [],
        nombreCliente: '',
        selectedEvent: {},
        servicioCita: [],
        manicuristaCita: [],
        manicuristaFinal:'',
        maniAzar: [],
        aleatorio: '',
        clientsSelect: '',
        arregloClient: [],
        duracion: 0,
        empByCita : 'Manicurista',
        bloquesHora : [],
        culito : [],
        salida:'',
        query:'',
        salidaMuestra: '',
        Days:['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'],
				months:[
					'Enero', 'Febrero', 'Marzo', 'Abril',
					'Mayo', 'Junio', 'Julio', 'Agosto',
					'Septiembre', 'Octubre', 'Noviembre', 'Diciembrer'
        ],
        sort: '',
        nombreClienteRegister: '',
        instagramCliente: '',
        nombreCliente: '',
        searchValue:''
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
      this.fechaMinima()
      $(document).ready(function(){
        $(".vdatetime").click(function(){
        
        for (let i = 0; i < 24; i++) {
          if (i == 10 || i == 11 || i == 12 || i == 13 || i == 14 || i == 15 || i == 16 || i == 17 || i == 18 || i == 19 || i == 20 || i == 21) {
            
          }
          else{
            
            $(".vdatetime-time-picker__item:eq("+i+")").addClass("vdatetime-time-picker__item vdatetime-time-picker__item--disabled")
          }
          
          
        }
      });
      });
      
    },
    methods: {

      disablear: function(){
        console.log("Hola vale!")
      },
      
      clickedButton: function() {
        console.log(this.$refs.hora.value.length)
      },
      arrayClient(){
				setTimeout(() => {
					for (let index = 0; index < this.clients.length; index++) {
						this.arregloClient.push(this.clients[index].nombre)
					}
				}, 2000);
			},
      
      handleSubmitClient(result){
        this.nombreCliente = result
			
      },
      fechaMinima(){
        var hoy = new Date()
        this.minimo = hoy.getFullYear() + "-" + parseFloat(hoy.getMonth()+1) + "-0" + hoy.getDate() + "T10:00:00"
        
      },
      insertDate(){
        
        
        var fechaBloq = this.fecha
        this.bloquesHora = []
          
          axios.post('citas/getBlocks', {
            employe: this.manicuristaFinal,
            date: fechaBloq,
            time: this.duracion
          })
          .then(res => {
            this.bloquesHora = res.data
            })
            .catch(err => {
              console.log(err)
            })
      }, 
      getClients(){
        axios.get('citas/getClients')
        .then(res => {
          this.arregloClient = []
          this.clients = res.data
          this.arrayClient();
        })
      },
      ingresoCliente() {
				axios.post('clients', {
					nombre:this.nombreClienteRegister,
					identidad:this.instagramCliente,
					recomendador:this.nombreCliente
				})
				.then(res => {
					if (res.data.status == 'Registrado') {
						this.$swal({
							type: 'success',
							title: 'Cliente registrado',
							showConfirmButton: false,
							timer: 1500
            })
            this.nombreClienteRegister = ''
            this.instagramCliente = ''
            this.nombreCliente = ''
            $('#myModalRegisterClient').modal('hide')
            this.getClients()
					}else{
						this.$swal({
							type: 'error',
							title: 'El cliente ya existe',
							showConfirmButton: false,
							timer: 1500
						})
					}
				})
			},
      onEventClick(event, e){
        this.selectedEvent = event
        $('#myModalCitasDescripcion').modal('show')
        e.stopPropagation()
      },
      getCitas () {
        this.events = []
        axios.get('citas')
        .then(res => {
          console.log(res.data)
          for (let index = 0; index < res.data.length; index++) {
            let dateNow = new Date(res.data[index].date)
            let formatDate = ''
            let formatDateTwo = ''
            if (dateNow.getMonth() == 9 || dateNow.getMonth() == 10 || dateNow.getMonth() == 11) {
              if (dateNow.getDate() < 10) {
                formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
              }else{
                formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
              }
              
            }else{
              if (dateNow.getDate() < 10) {
                formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
              }else{
                formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
              }  
            }
            let arrayEvents = {
              start: formatDate,
              end: formatDateTwo,
              title: res.data[index].services[0]+" - "+res.data[index].employe,
              content: res.data[index].client,
              class:res.data[index].class,
              cliente: res.data[index].client,
              services: res.data[index].services,
              empleada: res.data[index].employe,
              id:res.data[index]._id
            }
            this.events.push(arrayEvents)
          }
        })
        console.log(this.events)
      },
      getCitasByEmploye(){
        if (this.empByCita == "Todos") {
          this.getCitas()
        }
        else{
          this.events = []
        axios.get('citas/' + this.empByCita)
        .then(res => {
          for (let index = 0; index < res.data.length; index++) {
            let dateNow = new Date(res.data[index].date)
            let formatDate = ''
            let formatDateTwo = ''
            if (dateNow.getMonth() == 9 || dateNow.getMonth() == 10 || dateNow.getMonth() == 11) {
              if (dateNow.getDate() < 10) {
                formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
              }else{
                formatDate = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                formatDateTwo = dateNow.getFullYear() +"-"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
              }
              
            }else{
              if (dateNow.getDate() < 10) {
                formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].start
                formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-0"+dateNow.getDate()+" "+res.data[index].end
              }else{
                formatDate = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].start
                formatDateTwo = dateNow.getFullYear() +"-0"+(dateNow.getMonth() + 1)+"-"+dateNow.getDate()+" "+res.data[index].end
              }  
            }
            let arrayEvents = {
              start: formatDate,
              end: formatDateTwo,
              title: res.data[index].services[0]+" - "+res.data[index].employe,
              content: res.data[index].client,
              class: res.data[index].class,
              cliente: res.data[index].client,
              services: res.data[index].services,
              empleada: res.data[index].employe,
              id:res.data[index]._id
            }
            this.events.push(arrayEvents)
          }
        })
        console.log(this.events)
        }
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
        }
        else{
          var counter = $("#p"+index).text()
          var inspector = true
          var inspector2 = false
          
          for (let index = 0; index < this.servicioCita.length; index++) {
            if (this.servicioCita[index] == nombre || this.servicioCita[index] == nombre + "("+ counter +")" ) {
              this.servicioCita.splice(index,1)
              this.servicioCita.push(nombre+ "(" + (parseFloat(counter) +1) + ")")
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
        $("#p"+index).text(parseFloat($("#p"+index).text())+1)
        
      },
      redo(){
        $("#redo").hide()
        this.servicioCita = []
        this.manicuristaCita = []
        $(".serviInfoPrestadores").text(0)
        $(".Sig").removeClass("marcar")
        $(".Sig").prop("disabled", true)
        this.duracion = 0
        console.log(this.duracion)
      },

      selectAzar(){

            this.aleatorio = Math.round(Math.random()*this.maniAzar.length);
            if (this.aleatorio == -1) {
              this.aleatorio = 0
            }
            this.manicuristaFinal = this.maniAzar[parseInt(this.aleatorio)]
            this.classFinal = this.classM[parseInt(this.aleatorio)]
            console.log(this.manicuristaFinal)
            this.insertDate()
            $(".Sig").removeClass("marcar")
            $(".Sig").prop("disabled", true)
            $(".Sig").text("Crear")
            $(".wTwo").removeClass("marc")
            $(".wThree").addClass("marc")
            $(".processPerso").hide()
            $(".processThree").show()
      },

      nextOne(){
        
        if($(".processTwo").css("display") == "block"){
          console.log(this.manicuristaCita.length)
          this.selectMonth()
          if (this.selectMonth()) {
            for (let i = 0; i < this.manicuristaCita.length; i++) {
              for (let c = 0; c < this.manicuristas.length; c++) {
                if (this.manicuristas[c].documento == this.manicuristaCita[i]) {
                  this.maniAzar.push(this.manicuristas[c].nombre)
                  this.classM.push(this.manicuristas[c].class)
                }               
              }
            }
            if (this.manicuristaCita.length == 1) {
              this.manicuristaFinal = this.maniAzar[0]
            this.classFinal = this.classM[0]
              this.insertDate()
              $(".Sig").removeClass("marcar")
            $(".Sig").prop("disabled", true)
            $(".Sig").text("Crear")
            $(".wTwo").removeClass("marc")
            $(".wThree").addClass("marc")
            $(".processTwo").hide()
            $(".processThree").show()
            }
            else{
              $(".Sig").removeClass("marcar")
            $(".Sig").prop("disabled", true)
            $(".wTwo").removeClass("marc")
            $(".wThree").addClass("marc")
            $(".processTwo").hide()
            $(".processPerso").show()
            }
            
          }
           
          
        }

        else if ($(".processPerso").css("display") == "block") {
            this.insertDate()
            $(".Sig").removeClass("marcar")
            $(".Sig").prop("disabled", true)
            $(".Sig").text("Crear")
            $(".wTwo").removeClass("marc")
            $(".wThree").addClass("marc")
            $(".processPerso").hide()
            $(".processThree").show()
        }
        else if ($(".processThree").css("display") == "block") {
          
          this.$swal({
          title: 'Confirma tu cita',
          type: 'success',
          html: `<h6>Servicio(s): ${this.servicioCita}</h6> <h6>Diseño: ${this.design}</h6> <h6>Cliente: ${this.clientsSelect}</h6> <h6>Fecha: ${$(".vdatetime-input").val()}</h6> <h6>Personal: ${this.manicuristaFinal}</h6><h6>Entrada: ${this.hora}</h6> <h6>Salida: ${this.salida}</h6>`,
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCloseButton: true,
          showLoaderOnConfirm: true
        })
        .then(result => {
          if (result.value) {
            this.registroCita()
            
          }
          else{
            console.log("no hola")
          }
        })
          
          
        }
        else{
          
         
          this.$swal({
          title: '¿Desea usted realizarse un diseño?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          showCloseButton: true,
          showLoaderOnConfirm: true
        })
        .then(result => {
          if (result.value) {
            this.duracion = this.duracion + 15
            this.design = 'Si'
            
            $("#redo").hide()
            $(".processOne").hide()
            $(".processTwo").show()
            $(".Ant").addClass("marcar")
            $(".Ant").prop("disabled", false)
            $(".wOne").removeClass("marc")
            $(".wTwo").addClass("marc")
          }
          else{
            this.design = 'No'
            
            $("#redo").hide()
            $(".processOne").hide()
            $(".processTwo").show()
            $(".Ant").addClass("marcar")
            $(".Ant").prop("disabled", false)
            $(".wOne").removeClass("marc")
            $(".wTwo").addClass("marc")
          }
        })
          

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
          $(".Sig").prop("disabled", false)
          $(".Sig").addClass("marcar")
          $(".Sig").text("Siguiente")
        }
        else if($(".processPerso").css("display") == "block"){
          this.manicuristaFinal = ''
          $(".imgMani").removeClass("maniMarcado")
          $(".processTwo").show()
          $(".processPerso").hide()
          $(".wTwo").addClass("marc")
          $(".wThree").removeClass("marc")
          $(".Sig").prop("disabled", false)
          $(".Sig").addClass("marcar")
        }
      },
      
      registroCita(){
        
        const mani = this.manicuristaFinal

        axios.post('citas', {
          entrada: this.hora,
          salida: this.salida,
          sort: this.sort,
          fecha: this.fecha,
          cliente: this.clientsSelect,
          servicios: this.servicioCita,
          class: this.classFinal,
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
            $(".Sig").removeClass("marcar")
            $(".Sig").text("Siguiente")
            $(".Sig").prop("disabled", true)
            $(".hora").prop("disabled", true)
            $(".Ant").removeClass("marcar")
            $(".Ant").prop("disabled", true)
            $(".processThree").hide()
            $(".processOne").show()
            $(".wOne").addClass("marc")
            $(".wThree").removeClass("marc")
            $('.botonClient div input').val('')
            $('.inputssDate input').val('Click para seleccionar fecha')
            
            this.clientsSelect = ''
            this.servicioCita = []
            this.manicuristaCita = []
            this.manicuristaFinal = ''
            this.events = []
            $(".imgMani").removeClass("maniMarcado")
            this.min = ''
            this.class = ''
            this.hora = ''
            this.sort = ''
            this.fecha = 'Click para seleccionar fecha'
            this.salida = ''
            this.salidaMuestra = ''
            this.duracion = 0
            this.bloquesHora = []
            $("#Dat").val(0)
            $("#Dat").prop("disabled", true)
            $(".autocomplete-input").val('')
            $(".serviInfoPrestadores").text(0)
            $('#myModal').modal('hide')
            this.getCitas();
          }else if(res.data.status == 'cita ocupada'){
            this.$swal({
              type: 'error',
              title: 'Cita ocupada',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            console.log(res.data)
          }
        })
      },
      modalCliente(){
        $('#myModalRegisterClient').modal('show')
        
      },
      selectBloq(hora, i){
        this.hora =this.bloquesHora[i].Horario
        var sortSp = this.hora.split(":") 
        this.sort = sortSp[0]+sortSp[1]

        $(".Sig").addClass("marcar")
        $(".Sig").prop("disabled", false)
        axios.post('citas/getBlocks', {
            employe: this.manicuristaFinal,
            date: this.fecha,
            time: this.duracion
          })
          .then(res => {
            
            for (let index = 0 ; index <= this.duracion /15; index++) {
          
              res.data[i].validator = 'select'
              this.salida = res.data[i].Horario
              i++
              
            }
            this.bloquesHora = res.data
            })
            .catch(err => {
              console.log(err)
            })
        
      },
      Menu() {
        $('#mySidenav').toggle('slow')
        $('#calen').toggleClass("col-sm-12")
        $('#ope').toggleClass("ope")
        $('#clo').toggleClass("clo")
      },
      selectManic(nombre,clase, index){
        this.manicuristaFinal = nombre
        this.classFinal = clase
        $(".Sig").prop("disabled", false)
        $(".Sig").addClass("marcar")
        $(".imgMani").removeClass("maniMarcado")
        $("#mani"+index).addClass("maniMarcado")
        
      },
      selectMonth(){
        if ($(".clientB").children().children().val() == '' && $(".vdatetime-input").val() == '' ) {
          this.$swal({
						  type: 'error',
						  title: 'Debes seleccionar un cliente y una fecha',
						  showConfirmButton: false,
						  timer: 2000
            })
            return false
        }
        else if ($(".vdatetime-input").val() == '' ) {
          this.$swal({
						  type: 'error',
						  title: 'Debes seleccionar una fecha',
						  showConfirmButton: false,
						  timer: 2000
            })
            return false
        }
        else if ($(".clientB").children().children().val() == '') {
          this.$swal({
						  type: 'error',
						  title: 'Debes seleccionar un cliente',
						  showConfirmButton: false,
						  timer: 2000
            })
            return false
        }

        
        else{
          return true
        }
        
      },

      selectTime(index,hora){
        var horaSp = hora.split("/")
        this.hora = horaSp[0]
        this.salida = horaSp[1]
        var sortSp = this.hora.split(":") 
        this.sort = sortSp[0]+sortSp[1]

        console.log(this.hora + this.salida + "---" + this.sort)
        $(".content").removeClass("contentMarc")
        $("#t"+index).addClass("contentMarc")
        $(".Sig").addClass("marcar")
        $(".Sig").prop("disabled", false)
        
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
  .vuecal__menu {background-color: #1F5673; }
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title-bar {background-color: #1F5673;}

  .vuecal__time-column .vuecal__time-cell{color:white;height:1vh;}
  .vuecal__event{color:#fff;font-weight:bold;cursor:pointer;}
  .vuecal__event:hover{
    opacity: .8;
  }
    /* Dot indicator */
    .vuecal__cell-events-count {
      width: 25px;
      min-width: 0;
      height: 25px;
      padding: 5px;
      padding-top: 8px;
      font-size: 16px;
      background-color: #1F5673; 
    }
  .vuecal__cell-content {
    height: 100px;
  }

  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
  .vuecal__cell-date{color:#000;font-family: 'Raleway', sans-serif;
  font-weight:600;}
  .vuecal__heading span{color:#000;font-family: 'Raleway', sans-serif;
  font-weight:600;}
  .vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view) .vuecal__cell-content {
    background-color: #1F5673;
    height: 10vh !important;
}
.vuecal__cell-split {
    background-color: #1F5673;
    height: 10vh !important;
}
.vuecal--green-theme .vuecal__title-bar {
    background-color: #1F5673;
}
  .vuecal__time-column .vuecal__time-cell{
    color: #0F2027
  }
  

  .calendario{
    max-height: 90vh;
    margin-top:.5%
  }
  .calendarioo{
    max-height:40vh;
  }
  
  .citas{
    padding:10px;
    font-weight: bold;
    width: 10%
  }
  .menuVertical{
    height:92.8vh;
    background-color:#3a508c ;
    transition: 0.3s; 
  }
  .botonn{
    background-color: blue !important;
  }
  
  .boton{
    position:absolute;
    top:40%;
    left:0;
    background-color:#3a508c ;
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
    border:none;
    list-style-type: none;
    cursor:pointer;
    color:white;
    outline:none;
  }

  .armarCita{
    font-weight: 300 !important;
  }
  .marc{
    background-color: #1F5673;
    border:solid 1px azure;
    border-radius: 5px;
    color: azure;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)
  }
  .servPretty{
    background-color: #1F5673;
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
  option{
    color:azure;  
    padding: 10px;
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
  .processPerso{
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
    background-color: rgba(31, 86, 115, 0.707);
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
  .horas{
    background-color: rgba(31, 86, 115, 0.707);
    padding: 10px;
    color: white;
    border-radius: 5px;
    height: auto; 
    max-height: 50vh;
    overflow: hidden scroll; 
     
    border-radius: 5px;
  }
  .boxDates{
    position:fixed;
		top:90%;
		right:2%;
    transform : translate(-50% ,-50%);
  }
  .CierreDia:link,
  .CierreDia:visited{
    text-decoration: none;
    text-transform:uppercase;
    position:relative;
    top:0;
    left:0;
    padding:20px 40px;
    border-radius:100px;
    display:inline-block;
    transition: all .6s;
  }

  .btn-whiteDates{
    padding: 15px;
    border-radius:10px;
    background-color:#fff;
    color: #102229;
    border:2px solid #102229;
    font-size: 1em;
    outline: none !important;
  }
  .btn-whiteDates:focus{
    outline: none !important;
  }

  .CierreDia:hover{
    box-shadow:0px 10px 10px rgba(0,0,0,0.2);
    transform : translateY(-3px);
  }

  .CierreDia:active{
    box-shadow:0px 5px 10px rgba(0,0,0,0.2);
    transform:translateY(-1px);
  }

  .btn-bottom-animation-1{
    animation:comeFromBottom 2s ease-out .8s;
  }

  .CierreDia::after{
    content:"";
    text-decoration: none;
    text-transform:uppercase;
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    border-radius:10px;
    display:inline-block;
    z-index:-1;
    transition: all .5s;
  }

  .btn-whiteDates::after {
      background:#102229;
  }

  .btn-animation-1:hover::after {
      transform: scaleX(1.6) scaleY(1.8);
      opacity: 0;
  }

  @keyframes comeFromBottom{
    0%{
      opacity:0;
      transform:translateY(40px);
    } 
    100%{
      opacity:1;
      transform:translateY(0);
    }
  }
  
  .clientB .autocomplete-input{
    color: black !important;
    border-bottom: 2px solid #1f5673 !important;

  }
  .clientB{
    
    padding: 15px;

    color: azure;
    height: 85px;
    width: 120%;
    font-size: 2em;
    outline: none !important;
    text-align: center
    
  }

  .autocomplete-result-list{
    color: #1f5673;
  }
  .letters{
    font-family: 'Roboto', sans-serif;
    letter-spacing: .1em;
    color:black;
  }
  .btn-style{
		background-color:#1F5673;
		color: azure;
		transition: all 0.5s ease-out;
		font-family: 'Roboto', sans-serif !important;
		font-weight:600;
		width: 100%;
		letter-spacing: 1px;
		border-radius:5px;
	}
	.btn-style:hover{
		background-color:#ccc;
		color:#001514;
	}
  .generar{
    padding: 10px;
     background-color: #1F5673;
     border:none;
     color: azure;
     margin-bottom: -4%;
     width: 50%;
  }
  .botonHora{
    background-color:#011627 ;
    border: 1px solid white;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }

  .botonHoraMarc{
    background-color:#fff ;
    border: 1px solid #011627;
    color: #011627;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }

  /* timeline */
    .timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: rgba(255, 255, 255, 0.6);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.lineCont {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 100%;
}

/* The circles on the timeline */
.lineCont::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: rgb(255, 255, 255);
  border: 4px solid #1F5673;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  left: -51%;
}

/* Place the container to the right */
.right {
  left: 51%;
}

/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid rgba(255, 255, 255, 0.6);
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.6);
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid rgba(255, 255, 255, 0.6);
  border-width: 10px 10px 10px 0;
  border-color: transparent rgba(255, 255, 255, 0.6) transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -16px;
}

/* The actual content */
.content {
  cursor: pointer;
  padding: 5px 20px;
  background-color: #1f5673;
  border:2px solid rgba(255, 255, 255, 0.6);
  position: relative;
  border-radius: 6px;
}

.contentMarc {
  cursor: pointer;
  padding: 5px 20px;
  color: #1f5673;
  background-color: white;
  border: solid 2px #1f5673;
  position: relative;
  border-radius: 6px;
}

.content:hover {
  border: solid 2px #1F5673;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  /* Place the timelime to the left */
  .timeline::after {
  left: 31px;
  }
  
  /* Full-width containers */
  .lineCont {
  width: 100%;
  padding-left: 70px;
  padding-right: 25px;
  }
  
  /* Make sure that all arrows are pointing leftwards */
  .lineCont::before {
  left: 60px;
  border: medium solid rgba(255, 255, 255, 0.6);
  border-width: 10px 10px 10px 0;
  border-color: transparent rgba(255, 255, 255, 0.6) transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after, .right::after {
  left: 15px;
  }
  
  /* Make all right containers behave like the left ones */
  .right {
  left: 0%;
  }
}
.vdpClearInput:before{
  margin-top: -5px !important;
}
.inputssDate{
  height: 85px;
  padding-top: 35px;
}
.inputssDate input{
		width: 100%;
    padding-bottom: 10px;
		border:none !important;
		border-radius:0px !important;
		border-bottom:2px solid #001514 !important;
		background-color:transparent !important;
		color:#001514 !important;
		font-family: 'Roboto', sans-serif !important;
	}

  .vdpCell.selected .vdpCellContent{
		background-color: rgb(31, 86, 115) !important;
		
	}
	.vdpCell:hover .vdpCellContent{
		background-color: rgb(31, 86, 115) !important;
	}
	.vdpCell.today{
		color:rgb(31, 86, 115) !important;
	}
	.vdpArrowNext:after{
		border-left-color:rgb(31, 86, 115) !important;
	}
	.vdpArrowPrev:after{
		border-right-color:rgb(31, 86, 115) !important;
	}
  /* end timeline  */

  .btn-date{
    border: 2px solid #1f5673;
    width: 100%;
    color: #1f5673;
    padding: 10px;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 1.5px;
    height: 85px;
    transition: all 1s ease-out;
  }

  .btn-date:hover{
    transition: all 1s ease-out;
    border: 2px solid #1f5673;
    background-color: #1f5673;
    width: 100%;
    color: #fff !important;
    padding: 10px;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 1.5px;
    height: 85px;
  }

  .botonClient div input{
    width: 100%;
    background-color: transparent !important;
    color: #1f5673 !important;
    border: none;
    border-bottom: 2px solid #1f5673;
    border-radius: 0;
    height: 48px;
  }

  .theme-blue .vdatetime-popup__header,
.theme-blue .vdatetime-calendar__month__day--selected > span > span,
.theme-blue .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #1f5673;
  
}

.vdatetime-input{
  
  width: 100%;
  border: none;
  border-bottom: 2px solid #1f5673;
  padding: 10px;
}

.vuecal__flex .vuecal__title {
  color: #fff
}

.angle{
  color: #fff
}
.class1 {
  background:#3a508c;
  border: 1px solid #3a508c;
  color: #fff;
}
.class2 {
  background:#4490c3;
  border: 1px solid #4490c3;
  color: #fff;
}
.class3 {
  background:#40b396;
  border: 1px solid #40b396;
  color: #fff;
}
.class4 {
  background:#0a0094;
  border: 1px solid #0a0094;
  color: #fff;
}
.class5 {
  background:#264e00;
  border: 1px solid #264e00;
  color: #fff;
}
.class6 {
  background:#803509;
  border: 1px solid #803509;
  color: #fff;
}
.class7 {
  background:#860022;
  border: 1px solid #860022;
  color: #fff;
}
.class8 {
  background:#1a264e;
  border: 1px solid #1a264e;
  color: #fff;
}
.class9 {
  background:#142247;
  border: 1px solid #142247;
  color: #fff;
}
.class10 {
  background:#314c5e;
  border: 1px solid #314c5e;
  color: #fff;
}
.class11 {
  background:#758016;
  border: 1px solid #758016;
  color: #fff;
}
.class12 {
  background:#090731;
  border: 1px solid #090731;
  color: #fff;
}
.class13 {
  background:#830172;
  border: 1px solid #830172;
  color: #fff;
}
.class14 {
  background:#411b05;
  border: 1px solid #411b05;
  color: #fff;
}
.class15 {
  background:#e24f74;
  border: 1px solid #e24f74;
  color: black;
}
.class16 {
  background:#1a040b;
  border: 1px solid #1a040b;
  color: #fff;
}
.class17 {
  background:#151a2a;
  border: 1px solid #151a2a;
  color: #fff;
}
.class18 {
  background:#4186b4;
  border: 1px solid #4186b4;
  color: #fff;
}
.class19 {
  background:#318671;
  border: 1px solid #318671;
  color: #fff;
}
.class20 {
  background:#070066;
  border: 1px solid #070066;
  color: #fff;
}
.class21 {
  background:#005851;
  border: 1px solid #005851;
  color: #fff;
}
.class22 {
  background:#552002;
  border: 1px solid #552002;
  color: #fff;
}
.class23 {
  background:#410413;
  border: 1px solid #410413;
  color: #fff;
}
.class24 {
  background:#014e34;
  border: 1px solid #014e34;
  color: #fff;
}
.class25 {
  background:#29375f;
  border: 1px solid #263662;
  color: #fff;
}

.horaPred{
  border-bottom: 1px solid rgba(0, 0, 0, 0.281);
  height: 4vh;
  border-radius: 5px;
  background-color: rgba(245, 238, 238, 0.507)
}

.bloqueHor{
  border-top: 1px solid rgba(0, 0, 0, 0.281);
  border-left: 1px solid rgba(0, 0, 0, 0.281);
  border-radius: 5px;
  
}

.horaOcupada{
  border-bottom: 1px solid rgba(0, 0, 0, 0.281);
  height: 4vh;
  text-align: center;
  background-color: rgba(201, 93, 98, 0.9);
  border-radius: 5px;
  font-size: 1.5em;
}
.horaDisp{
 border-bottom: 1px solid rgba(0, 0, 0, 0.281);
  height: 4vh;
  text-align: center;
  background-color:#1F5673;
  border-radius: 5px;
  color: azure;
  font-size: 1.5em;
  cursor: pointer;
}
.horaDisp:hover{
  border-bottom: 1px solid rgba(0, 0, 0, 0.281);
  height: 4vh;
  text-align: center;
  background-color:white;
  border-radius: 5px;
  color: black;
  font-size: 1.5em;
}
 .horaCero{
  border-bottom: 1px solid rgba(0, 0, 0, 0.281);
  height: 4vh;
  text-align: center;
  background-color:rgba(248, 245, 245, 0.144);
  border-radius: 5px;
  color: rgba(248, 245, 245, 0.521);
  font-size: 1.5em;
} 

.horaSelect{
  
  height: 4vh;
  text-align: center;
  background-color:#2db67c;
  border-radius: 0px 5px 0px 0px  ;
  color: white;
  font-size: 1.5em;
}

.Hdispone{
  border-top: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white; 
  border-radius: 0 5px 5px 0; 
  background-color: #1f5673;
  text-align: center
}

.CMani{
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-bottom: 1px solid white; 
  border-radius: 5px 0 0 5px; 
  background-color: #1f5673;
  
}
</style>
