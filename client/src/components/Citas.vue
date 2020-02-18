<template id="">
  <div class="container-fluid">
    <div class="row">
        <div style="padding-left:2%;" id="calen" class="col-sm-12">
          <div style="" class="col-sm-12 mx-auto text-center p-1">
            <div class="row">
              <div class="col-sm-6">
                <button  data-toggle="modal" class="generar" data-target=".genCita"><span></span>Generar cita</button>
              </div>
              <div class="col-sm-6">
                <select v-if="status == 1 || status == 2" id="manicuristas" v-model="empByCita" v-on:change="getCitasByEmploye()"  class="generar Two" name="manicuristas">
                  <option v-if="sectionDelete" selected="true" >{{empByCita}}</option>
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
             default-view="month"
             :disable-views="['years', 'year', 'week']" 
             events-count-on-month-view
             :on-event-click="onEventClick"
             :overlapsPerTimeStep="true">
          </vue-cal>
        </div>
    </div>
      

    <div class="modal fade genCita bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
      <div  class="modal-content armarCita p-3" style="background-color:#6BB2E5;border-radius:5px">
        <div  class="container p-4" style="background-color:rgba(238, 238, 238, 0.623);border-radius:5px;">
          <div class="row">
            <div style="font-size:1.5em;color:#011627;" class="col-md-12 text-center p-3">Arma tu cita </div>
            <div style="background-color:rgba(107, 178, 229,0.5);color:azure;box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)" class="col-md-12 font-weight-bold px-3">
              <div style="margin:auto" class="row text-center">
                <div style="color:gray" class="wOne p-3 mx-auto col-md-3 marc">Servicio</div>
                <div style="color:gray" class="wTwo p-3 mx-auto col-md-3">Información</div>
                <div style="color:gray" class="wThree p-3 mx-auto col-md-3">Disponibilidad</div>
              </div>
            </div>
            <div class="col-md-12 p-3 processOne">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#353535">Selecciona los servicios a utlizar</div>
              <div style="height:40vh;overflow:hidden;overflow-x: hidden;overflow-y:scroll;background-color:#6BB2E5;border-radius:5px;border:2px solid #353535" class="scroll row p-3" >
                <div class="col-md-6" v-for="(servicio,index) of servicios">
                  <div class="p-2 servPretty" v-on:click="marcarServicio(servicio.prestadores,servicio.nombre,servicio.tiempo,servicio.comision,servicio.precio,index)">
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
              <div class="col-md-12 text-center p-2" >
                <div class="row">
                  <div style="font-size:1.2em;color:#353535" class="col-sm-4">
                  Seleccione un prestador y horario disponible
                  </div>
                  <select v-model="maniBloque" v-on:change="selectManic()" class="CMani m-1  p-2 w-75 col-sm-6" name="manicuristas">
                    <option v-if="sectionDeleteTwo" selected="true" >{{maniBloque}}</option>
                    <option  v-for="(mani,index) in maniAzar" v-if="mani.restDay != new Date(fecha).getDay()"  :class="mani.class" :value="mani.nombre">
                      {{mani.nombre}}
                    </option>
                  </select>
                  <img class="imgMani ml-3" src="../assets/silueta-mujer.jpg" alt="">
                </div>
              </div>
              <div style="height:50vh;overflow:hidden;overflow-x: hidden;
		          overflow-y:scroll;background-color: #6BB2E5;border-radius:5px;border:2px solid #353535" class="scroll row horas" >
                      <div class="col-sm-12">
                        <div class="row  mb-2">
                          <div class="col-sm-6">
                          </div>
                        </div> 
                            <div class="col-sm-12 Hdispone p-1 m-1">
                                <h4>Horas Disponibles</h4>            
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
              </div>
            </div>
            <div class="col-md-12 p-3 processTwo">
              <div class="col-md-12 text-center p-2" style="font-size:1.2em;color:#353535;">Selecciona un cliente y una fecha para la cita</div>
              <div class="container">
                <div class="mx-auto">
                <div class="row pt-0">
                  <div class=" mx-auto col-sm-12">
                    
                  </div>
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="row">
                          <div class="col-3">
                          </div>
                          <div v-on:click="clearInput" class="col-12 completeCitas">
                            <autocomplete
                              ref="autocomplete"
                              placeholder="Buscar cliente"
                              :source="clients"
                              input-class=" w-100 one autocompleteCitas"
                              results-property="data"
                              :results-display="formattedDisplay"
                              @selected="addDistributionGroup"
                              @nothingSelected="noresult"
                              :showNoResults="false"
                              >
                            </autocomplete>
                            <span v-on:click="clearInput" style="position:absolute;top:8px;left:40px;background-color:#FBF5F3;">{{clientsSelect}}</span>
                          </div>
                          <div style="display:none" class="mt-4 formUser col-sm-12">
                            <form>
                              <div class="form-group del" style="margin-bottom:-5px;">
                                <label class="containeer row ml-2">
                                  <input class="ifCheck" type="checkbox" >
                                  <span class="checkmark"></span>
                                  <h6 style="font-size:18px;" class="col-12">¿Desea agregar descuento de primera visita?</h6>
                                  
                                </label>
                              </div>
                              <div class="form-group">
                                <div class="row mt-2">
                                  <div class="col-sm-4">
                                    <label for="name">Nombre del cliente <span style="color:red;">*</span></label>
                                    </div>
                                    <div class="col-sm-8">
                                      <input v-model="nombreClienteRegister" type="text" class=" w-100 inputsCrear" placeholder="" required>
                                    </div>
                                </div>  
                              </div>
                              <div class="form-group">
                                <div class="row">
                                  <div class="col-sm-4">
                                    <label for="identidad">Información de contacto <span style="color:red;">*</span></label>
                                  </div>
                                  <div class="col-sm-8">
                                    <input v-model="identidadCliente" type="text" class="inputsCrear w-100" requerid>
                                  </div>
                                </div>
                                
                                
                              </div>
                              <div class="form-group">
                                <div class="row mt-2">
                                  <div class="col-sm-4">
                                    <label for="identidad">Contacto adicional <span style="color:blue;">+</span></label>
                                  </div>
                                  <div class="col-sm-8">
                                    <input v-model="correoCliente" type="text" class="inputsCrear w-100"  >
                                  </div>
                                </div>
                                
                                
                              </div>
                              <div class="form-group">
                                <div class="row mt-2">
                                  <div class="col-sm-4">
                                    <label for="identidad">Contacto adicional <span style="color:blue;">+</span></label>
                                  </div>
                                  <div class="col-sm-8">
                                    <input v-model="instagramCliente" type="text" class="inputsCrear w-100" >
                                  </div>
                                </div>
                                
                                
                              </div>
                              <div style="display:none" class="recomendador">
                                 <label for="recomendacion">Registre recomendador</label>
                                  <div v-on:click="clearInputTwo" class="col-12">
                                    <autocomplete
                                      ref="autocomplete"
                                      placeholder="Buscar cliente"
                                      :source="clients"
                                      input-class=" w-100 two autocompleteCitas"
                                      results-property="data"
                                      :results-display="formattedDisplayTwo"
                                      @selected="addDistributionGroupTwo">
                                    </autocomplete>
                                    <span v-on:click="clearInputTwo" style="position:absolute;top:8px;left:40px;background-color:white;">{{recomend}}</span>
                                  </div>
                              </div>
                                 <div class="text-center">
                                   <button  v-on:click="editCliente" style="display:none;background-color:#353535;color:white" class="btn w-75 mx-auto ag">Editar cliente</button>
                              <button  v-on:click="ingresoCliente" style="display:none;background-color:#353535;color:white" class="btn w-75 mx-auto mt-2 add del">Agregar cliente</button>
                                 </div>
                              
                            </form>
                          </div>
                        </div>
                        
                      </div>
                      <div  class="col-sm-6">
                        <div class="row">
                                                   
                          <date-pick
                              v-model="fecha"
                              :hasInputElement="false"
                              :months="months"
                              :weekdays="Days"
                              :format="format"   
                          ></date-pick> 
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
                <div class="col-md-2"> <button v-on:click="prevOne()" disabled class="botonW Ant">Anterior</button></div>
                <div class="col-md-8 mx-auto text-center"> 
                  <button id="redo" class="botonW " v-on:click="redo()"><font-awesome-icon style="color:#fff" icon="redo"/>
                  </button>
                  </div> 
                <div class="col-md-2 text-right"><button v-on:click="nextOne()" disabled class="botonW Sig">Siguiente</button></div>
              </div>
            </div>
          </div>
        </div>  
      </div>
      </div>
    </div>
    <div class="modal fade" id="myModalCitasDescripcion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div v-bind:style="{ 'background-color': '#ffffff'}" class="modal-content">
		      <div class="modal-header" v-bind:class="selectedEvent.class">
		        <h5 class="modal-title font-weight-bold" id="exampleModalCenterTitle">{{ selectedEvent.title }}</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" >&times;</span>
		        </button>
		      </div>
		      <div class="modal-body letters">
		        <p><strong>Fecha: {{ dateSplit(selectedEvent.start) }}</strong></p>
            
            <ul class="list-group">
              
              <li class="list-group-item" style="background-color: transparent !important">
                <h3 class="text-center"><b>Detalle de la cita</b></h3>
                <b>Cliente:</b>  {{formatName(selectedEvent.cliente)}} <br> <b>Contacto:</b>{{formatContact(selectedEvent.cliente)}} <br> <b>Manicurista:</b>  {{ selectedEvent.empleada }} 
                <br> <b v-if="descuento">Descuento de primera visita: <font-awesome-icon style="font-size:22px;color:#97DB4F;" icon="check-square" /> </b> </li>
             
              <li class="list-group-item"  style="background-color: transparent !important">
                 <h3 class="text-center"><b>Servicios</b></h3>
                
                <p style="margin-bottom:-6px;font-size:1.25em" v-for="service of selectedEvent.services" v-bind:key = "service"> - {{ service.servicio }} </p> 
              </li>
              <li class="list-group-item" style="background-color: transparent !important"><b>Hora de inicio:</b>  {{ dateSplitHours(selectedEvent.start) }}</li>
              <li class="list-group-item" style="background-color: transparent !important"><b>Hora de finalización:</b>  {{ dateSplitHours(selectedEvent.end) }}</li>

            </ul><br>
            <button v-bind:class="selectedEvent.class" v-if="selectedEvent.process == true || status == 3" type="button" class="btn font-weight-bold btn-style col-6" v-on:click="borrarCita(selectedEvent.id)">Borrar cita</button>
            <button v-bind:class="selectedEvent.class" v-else type="button" class="btn font-weight-bold btn-style col-12" v-on:click="borrarCita(selectedEvent.id)">Borrar cita</button>
            <button v-bind:class="selectedEvent.class" v-if="selectedEvent.process == true || status == 3" type="button" class="btn font-weight-bold btn-style ml-4 col-5" v-on:click="processSale(selectedEvent.id, 'process')">Procesar venta</button>
            
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
  import 'vue-cal/dist/i18n/es.js'
  import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
  import { Datetime } from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';
  import jwtDecode from 'jwt-decode'
  import Autocomplete from 'vuejs-auto-complete'
  import EventBus from './EventBus'

import router from '../router'
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
      Datetime,
      Autocomplete
    },
    data () {
      return {
        image: "'../assets/fondo.jpg'",
        status:'',
        arregloHora:[],
        locale: 'es',
        start:'',
        minimo:'',
        maximo:'',
        fecha:'',
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
        manicuristaFinal:'Prestador',
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
        format: 'MM-DD-YYYY',
        Days:['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'],
				months:[
					'Enero', 'Febrero', 'Marzo', 'Abril',
					'Mayo', 'Junio', 'Julio', 'Agosto',
					'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        sort: '',
        nombreClienteRegister: '',
        identidadCliente: '',
        nombreCliente: '',
        correoCliente:'',
			  instagramCliente:'',
        searchValue:'',
        resTime:[],
        resTimeFinal: '',
        arregloClients: [],
        maniBloque: 'Seleccione un prestador',
        correoCliente : '',
        instagramCliente: '',
        identidadCliente:'',
        sectionDelete: true,
        sectionDeleteTwo: true,
        recomend:'',
        clienteID:'',
        descuento:false
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
      this.validatorLender()
      this.getCitas()
      this.getManicuristas()
      this.getClients()
      this.getServicios()
      this.fechaMinima()
    },
    methods: {
      // arrayClient(){
			// 	for (let index = 0; index < this.clients.length; index++) {
			// 			this.arregloClients.push(this.clients[index].nombre+'-'+this.clients[index].identidad)
      //     }
      // },
      validatorLender(){
        const token = localStorage.userToken
        const decoded = jwtDecode(token)
        const split = decoded.linkLender.split("/")
        this.lender = split[0]
        this.status = decoded.status
        console.log(this.lender)
      },
      searchClient(input){
				if (input.length < 1) { return [] }
					return this.arregloClients.filter(manicurista => {
						return manicurista.toLowerCase()
						.startsWith(input.toLowerCase())
				})
			},
      handleSubmitClient(result){
        this.clientsSelect = result
			
      },
      fechaMinima(){
        var hoy = new Date()
        this.minimo = hoy.getFullYear() + "-" + parseFloat(hoy.getMonth()+1) + "-0" + hoy.getDate() + "T10:00:00"
        
      },
      formattedDisplay (result) {
        console.log(result)
        return result.nombre+' / '+result.identidad
      },
      noresult(result){
        $(".formUser").show()
        $(".del").show()
        $(".recomendador").show()
        this.nombreClienteRegister = result
      },
      addDistributionGroup (group) {
        $(".formUser").show()
        $(".ag").show()
        setTimeout(() => {
          this.clientsSelect = group.display
        }, 100);
        const sp = group.display.split(" / ")
        console.log(sp)
        for (let f = 0; f < this.clients.length; f++) {
          console.log(this.clients[f].identidad)
          
          if (this.clients[f].identidad == sp[1]) {
            this.nombreClienteRegister = this.clients[f].nombre
            this.identidadCliente = this.clients[f].identidad
            this.correoCliente = this.clients[f].correoCliente
            this.instagramCliente = this.clients[f].instagramCliente
            this.clienteID = this.clients[f]._id
            break
          }
          
          
        }
       
        
      },
      formattedDisplayTwo (result) {
        console.log(result)
        return result.nombre+' / '+result.identidad
      },
      addDistributionGroupTwo (group) {
        setTimeout(() => {
          this.recomend = group.display
        }, 100);
      },
      processSale(id, type){
        if (type == 'process') {
          this.Process(id)
          $('#myModalCitasDescripcion').modal('hide')
          setTimeout(() => {
            $('#procesarVentas span').click()
          }, 500);
        }
      },
      Process(id){
        EventBus.$emit('process', id)
      },
      clearInput(){
        
        this.clientsSelect = ''
        $('.one').focus()
        setTimeout(() => {
          if (this.clientsSelect == '') {
            $(".formUser").hide()
            $(".del").hide()
            $(".ag").hide()
             $(".recomendador").hide()
            this.nombreClienteRegister = ''
            this.identidadCliente = ''
            this.correoCliente = ''
            this.instagramCliente = ''
            this.clienteID = ''
          }
        },500
        )
        
      },
      clearInputTwo(){
        this.recomend = ''
        $('.two').focus()
      },
      insertDate(){
        
        var fechaBloq = this.fecha
        this.bloquesHora = []
          console.log(fechaBloq)
          axios.post('citas/getBlocks', {
            employe: this.manicuristaFinal,
            date: fechaBloq,
            time: this.duracion,
            resTime:this.resTimeFinal
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
          // this.arrayClient();
        })
      },
      dateSplit(value){
        if (value) {
          const split = value.split(' ')
          return split[0]
        }
      },
      dateSplitHours(value){
        if (value) {
          const split = value.split(' ')
          return split[1]
        }
      },
      MaysPrimera(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      editCliente(){
        const name = this.nombreClienteRegister.split(' ')
        var firstName, lastName, fullName
        if (name[1]) {
          firstName = this.MaysPrimera(name[0])
          lastName = this.MaysPrimera(name[1])
          fullName = firstName+' '+lastName
        }else{
          fullName = this.MaysPrimera(name[0])
        }

        if (this.nombreClienteRegister != '' &&  this.identidadCliente != '') {
          axios.put('clients/'+this.clienteID, {
            nombreClienteEditar: fullName,
            identidadClienteEditar: this.identidadCliente,
            correoClienteEditar: this.correoCliente,
            instagramClienteEditar: this.instagramCliente
          })
          .then(res => {
            if (res.data.status == 'Servicio actualizado') {
              this.nombreClienteRegister = ''
              this.identidadCliente = ''
              this.correoCliente = ''
              this.instagramCliente = ''
              this.clienteID = ''
              $(".formUser").hide()
              $(".ag").hide()
              this.$swal({
                type: 'success',
                title: 'Cliente actualizado',
                showConfirmButton: false,
                timer: 1500
              })
              this.getClients();
              this.clearInput()
            }else{
              this.$swal({
                type: 'error',
                title: 'Cliente ya registrado',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }else{
          this.$swal({
            type: 'error',
            title: 'Llene los datos',
            showConfirmButton: false,
            timer: 1500
          })
        }
        
      },
      ingresoCliente() {
        const name = this.nombreClienteRegister.split(' ')
        var firstName, lastName, fullName, ifCheck
        if (name[1]) {
          firstName = this.MaysPrimera(name[0])
          lastName = this.MaysPrimera(name[1])
          fullName = firstName+' '+lastName
        }else{
          fullName = this.MaysPrimera(name[0])
        }
        if ($('.ifCheck').prop('checked')) {
          ifCheck = 0
        }else{
          ifCheck = 1
        }
        
				axios.post('clients', {
					nombre:fullName,
					identidad:this.identidadCliente,
					recomendador:this.recomend,
					correoCliente:this.correoCliente,
					instagramCliente:this.instagramCliente,
          ifCheck: ifCheck
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
            this.identidadCliente = ''
            this.correoCliente = ''
            this.instagramCliente = ''
            this.nombreCliente = ''
            $(".formUser").hide()
            $(".del").hide()
            $(".recomendador").hide()
            this.getClients()
            this.clearInputTwo()
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
        console.log(event)
        $('#myModalCitasDescripcion').modal('show')
        const split = event.cliente.split('/')
        const splitTwo = split[1].split(' ')
        const splitThree = split[0].split(' ')
        axios.get('clients/dataDiscount/'+splitTwo[1])
        .then(res => {
          if (res.data[0].participacion == 0) {
						this.descuento = true
					}else{
            this.descuento = false
          }
          axios.get('clients/historical/'+splitTwo[1]+'-'+splitThree[0])
          .then(res => {
            console.log(res)
          })
        })
        e.stopPropagation()
      },
      getCitas () {
        if (this.lender != '') {
          this.events = []
          axios.get('citas/' + this.lender)
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
                title: res.data[index].services[0].servicio+" - "+res.data[index].employe,
                content: res.data[index].client,
                class: res.data[index].class,
                cliente: res.data[index].client,
                services: res.data[index].services,
                empleada: res.data[index].employe,
                id:res.data[index]._id,
                process: res.data[index].process
              }
              this.events.push(arrayEvents)
            }
          })
        }else{
          this.events = []
          axios.get('citas')
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
                title: res.data[index].services[0].servicio+" - "+res.data[index].employe,
                content: res.data[index].client,
                class:res.data[index].class,
                cliente: res.data[index].client,
                services: res.data[index].services,
                empleada: res.data[index].employe,
                id:res.data[index]._id,
                process: res.data[index].process
              }
              this.events.push(arrayEvents)
            }
          })
        }
      },
      getCitasByEmploye(){
        if (this.empByCita == "Todos") {
          this.getCitas()
        }else{
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
            this.sectionDelete = false
          })
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
      marcarServicio(prestadores,nombre,tiempo, comision, precio,index){
        console.log(prestadores)
        if (this.servicioCita == '') {
          this.servicioCita.push({'servicio': nombre, 'comision': comision, 'precio': precio})
          for (let index = 0; index < prestadores.length; index++) {
            this.manicuristaCita.push(prestadores[index])
          }
        }
        else{
          var counter = $("#p"+index).text()
          var inspector = true
          var inspector2 = false
          
          // for (let index = 0; index < this.servicioCita.length; index++) {
          //   if (this.servicioCita[index] == nombre || this.servicioCita[index] == nombre + "("+ counter +")" ) {
          //     this.servicioCita.splice(index,1)
          //     this.servicioCita.push(nombre+ "(" + (parseFloat(counter) +1) + ")")
          //     inspector = false
          //     break  
          //   }
          // }
          if (inspector == true) {
            this.servicioCita.push({'servicio': nombre, 'comision': comision, 'precio': precio})
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
        console.log(this.servicioCita)
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
        
      },

      

      nextOne(){
        
        if($(".processTwo").css("display") == "block"){
          
          this.selectMonth()
          if (this.selectMonth()) {
            this.maniAzar = []
            for (let i = 0; i < this.manicuristaCita.length; i++) {
              for (let c = 0; c < this.manicuristas.length; c++) {
                
                if (this.manicuristas[c]._id == this.manicuristaCita[i] ) {
                  
                  this.maniAzar.push(this.manicuristas[c])
                  console.log(this.maniAzar)
                }               
              }
            }
            
           
              $(".Sig").removeClass("marcar")
            $(".Sig").prop("disabled", true)
            $(".Sig").text("Crear")
            $(".wTwo").removeClass("marc")
            $(".wThree").addClass("marc")
            $(".processTwo").hide()
            $(".processThree").show()
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
          html: `<h6><b>Servicio:</b>  ${this.servicioCita[0].servicio}</h6> <h6><b>Diseño:</b> ${this.design}</h6> <h6><b>Cliente:</b> ${this.clientsSelect}</h6> <h6><b>Fecha:</b> ${this.fecha}</h6> <h6><b>Personal:</b> ${this.manicuristaFinal}</h6><h6><b>Entrada:</b> ${this.hora}</h6> <h6><b>Salida:</b> ${this.salida}</h6>`,
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
          $(".manis").css("display","none")
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
            this.maniBloque = "Seleccione un prestador"
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
            this.result = ''
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
            time: this.duracion,
            resTime : this.resTimeFinal
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
      selectManic(){
        for (let index = 0; index < this.maniAzar.length; index++) {
          if (this.maniAzar[index].nombre == this.maniBloque) {
            this.manicuristaFinal = this.maniAzar[index].nombre
            this.classFinal = this.maniAzar[index].class
            this.resTimeFinal = this.maniAzar[index].restTime
            $(".manis").css("display","block")
            this.insertDate()
            break
          }
          
        }

        this.sectionDeleteTwo = false
        // $(".Sig").prop("disabled", false)
        // $(".Sig").addClass("marcar")
        // $(".imgMani").removeClass("maniMarcado")
        // $("#mani"+index).addClass("maniMarcado")
        
      },
      selectMonth(){
        if ($(".clientB").children().children().val() == '' && this.fecha == '' ) {
          this.$swal({
						  type: 'error',
						  title: 'Debes seleccionar un cliente y una fecha',
						  showConfirmButton: false,
						  timer: 2000
            })
            return false
        }
        else if (this.fecha == '' ) {
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
      formatName(name){
        if (name) {
          var sp = name.split("-")
        return sp[0]
        }
        
      },
      formatContact(contact){
        if (contact) {
          var sp = contact.split("-")
        return sp[1]
        }
        
      },

      selectTime(index,hora){
        var horaSp = hora.split("/")
        this.hora = horaSp[0]
        this.salida = horaSp[1]
        var sortSp = this.hora.split(":") 
        this.sort = sortSp[0]+sortSp[1]

        
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
        axios.get('ventas/getFund')
        .then(res => {
          const fondo = res.data[0].amount
          const egresoSistema = res.data[0].amount
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
              const redCompraDebito = res.data.redCompraDebito
              const redCompraCredito = res.data.redCompraCredito
              const transferencia = res.data.transferencia
              const otros = res.data.otros
              const total = res.data.total
              this.$swal({
                title: 'Por favor, registre el monto egresado de la caja',
                input: 'number',
                inputPlaceholder: 'Monto egreso',
                showCloseButton: true,
              })
              .then(result => {
                  const egresoManual = result.value 
                  
                  this.$swal({
                  title: 'Verificación de ventas',
                  html: `
                    <form>
                      <div class="row">
                        <div class="form-group col-6" style="width:100%;">
                          <label style="float:left;">Fondo de la caja</label>
                          <input type="number" class="form-control classFondo" value="${fondo}" readonly requerid>
                        </div>
                        <div class="form-group col-6" style="width:100%;">
                          <label style="float:left;">Efectivo</label>
                          <input type="number" class="form-control classEfectivo" placeholder="$ 0" requerid>
                        </div>
                        <div class="form-group col-6" style="width:100%;">
                          <label style="float:left;">Débito</label>
                          <input type="number" class="form-control classRedcompreD" placeholder="$ 0" requerid>
                        </div>
                        <div class="form-group col-6" style="width:100%;">
                          <label style="float:left;">Crédito</label>
                          <input type="number" class="form-control classRedcompreC" placeholder="$ 0" requerid>
                        </div>
                        <div class="form-group col-6" style="width:100%;">
                          <label style="float:left;">Transferencias</label>
                          <input type="number" class="form-control classTransferencia" placeholder="$ 0" requerid>
                        </div>
                        <div class="form-group col-6" style="width:100%;">
                          <label style="float:left;">Otros</label>
                          <input type="number" class="form-control classOtros" placeholder="$ 0" requerid>
                        </div>
                      </div>
                    </form>
                  `,
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Confirmar',
                  cancelButtonText: 'Cerrar',
                  showCloseButton: true,
                  showLoaderOnConfirm: true
                })
                .then((result) => {
                    if(result.value) {
                      const fondoManual = $('.classFondo').val()
                      const efectivoManual = $('.classEfectivo').val()
                      const redCompreDManual = $('.classRedcompreD').val()
                      const redCompreCManual = $('.classRedcompreC').val()
                      const transferenciaManual = $('.classTransferencia').val()
                      const otrosManual = $('.classOtros').val()
                      const totalManual = parseFloat(efectivoManual) + parseFloat(redCompreDManual) + parseFloat(redCompreCManual) + parseFloat(transferenciaManual) + parseFloat(otrosManual)
                      console.log(totalManual)
                      if (fondoManual == '' || efectivoManual == '' || redCompreDManual == '' || redCompreCManual == '' || otrosManual == '' || totalManual == '' || transferenciaManual == '') {
                        this.$swal({
                          type: 'error',
                          title: 'Complete todos los campos',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }else{
                        this.$swal({
                          title: 'Por favor, escriba su nombre ^^',
                          input: 'text',
                          inputPlaceholder: 'Escriba su nombre aquí',
                          showCloseButton: true,
                        })
                        .then(result => {
                          if (result.value == '') {
                            this.$swal({
                              type: 'error',
                              title: 'Debe escribir su nombre',
                              showConfirmButton: false,
                              timer: 1500
                            })
                          }else if(result.dismiss){
                            this.$swal({
                              type: 'info',
                              title: 'Aborto cierre',
                              showConfirmButton: false,
                              timer: 1500
                            })
                          }else{
                            var totalEfectivoSistema = parseFloat(fondo) + parseFloat(efectivo) - parseFloat(egresoManual)
                            var totalEfectivoManual = parseFloat(fondoManual) + parseFloat(efectivoManual) - parseFloat(egresoManual)
                      
                            const identificacionCierre = result.value
                            axios.post('ventas/closeDay/'+identificacionCierre, {
                              efectivoSistema: parseFloat(efectivo),
                              redCompraDebitoSistema: parseFloat(redCompraDebito),
                              redCompraCreditoSistema: parseFloat(redCompraCredito),
                              transferenciaSistema: parseFloat(transferencia),
                              otrosSistema: parseFloat(otros),
                              totalSistema: parseFloat(total),
                              fondoSistema: parseFloat(fondo),
                              egresoSistema: parseFloat(egresoManual),
                              totalEfectivoSistema: parseFloat(totalEfectivoSistema),
                              
                              totalEfectivoManual: parseFloat(totalEfectivoManual),
                              fondoManual: parseFloat(fondoManual),
                              egresoManual: parseFloat(egresoManual),
                              efectivoManual: parseFloat(efectivoManual),
                              redCompreDManual: parseFloat(redCompreDManual),
                              redCompreCManual: parseFloat(redCompreCManual),
                              transferenciaManual: parseFloat(transferenciaManual),
                              otrosManual: parseFloat(otrosManual),
                              totalManual: parseFloat(totalManual)
                            })
                            .then(res => {
                              if (res.data.status == 'ok') {
                                  this.$swal({
                                    type: 'success',
                                    title: 'Cierre hecho correctamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                              }
                            })
                            .catch(err => {
                              console.log(err)
                            })
                          }
                        })
                      }
                    }else{
                      this.$swal({
                        type: 'info',
                        title: 'Aborto cierre',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    }
                })
              })
            }
          })
        })
      },
      pruebaKey(){
        console.log('hola')
      },
      formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			}
    },
    mounted(){
      EventBus.$on('reloadCitas', status => {
        this.getCitas()
        console.log(status)
      })
    }
  }



</script>
<style media="screen">
  .vuecal__flex .vuecal__menu{
    color: #0a0a0a !important
  }
  
  .vuecal__menu {background-color:transparent;border: none !important;border-radius: 5px 5px 0 0; }
  .vuecal__menu button{background-color:rgba(7, 7, 7, 0.116);outline: none}
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title-bar {background-color: #353535;color: #fff !important}
  .vuecal__title button{
    color: white !important
  }
  .vuecal__body{
    background-color:white;
  }
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
  .vuecal__header{background-color: rgba(238, 238, 238, 0.623);border-radius: 5px 5px 0 0;}
  .vuecal__cell.today, .vuecal__cell.current {background-color: transparent}
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
    background-color: #6BB2E5;
    border:solid 1px #353535;
    border-radius: 5px;
    color: #353535 !important;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.14)
  }
  .servPretty{
    background-color: rgba(238, 238, 238, 0.623);
    color:#353535;
    font-weight: bold;
    border-radius: 5px;
    margin: 1px;
    cursor: pointer;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.14);
    border:4px solid transparent;
  }
  .serviInfo{
    
    border-right: 1px solid #353535;
  }
  .serviInfoPrestadores{
    background-color: #6BB2E5;
    padding: 3px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 50%;
  }
  option{
    color:#353535;  
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
    background-color: #353535;
    color:#fff;
  }
  #redo{
    display: none;
  }
  .processTwo{
    display:none;
    height: 62vh;
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
    border:4px solid rgba(14, 11, 11, 0.219);
    width:5%;
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
    z-index: 1000;
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
  
  
  .clientB{
    
    padding: 15px;

    color: azure;
    height: 85px;
    width: 120%;
    
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
    -webkit-box-shadow: 1px 1px 6px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 6px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 6px -1px rgba(0,0,0,1);
		font-family: 'Roboto', sans-serif !important;
		font-weight:600;
		width: 100%;
		letter-spacing: 1px;
		border-radius:5px;
	}
	.btn-style:hover{
		background-color:#ccc;
    border: none;
		color:#001514;
	}
  .generar{
    padding: 10px;
     background-color: #353535;
     border:none;
     color: azure;
     margin-bottom: 1%;
     border-radius: 5px; 
     width: 50%;
     -webkit-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		-moz-box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		box-shadow: 1px 1px 10px -1px rgba(0,0,0,1);
		
    font-family: 'Roboto', sans-serif !important;
    font-size: 1.4em;
  }
  .generar:hover{
    background-color: white;
    color:#001514;
  }
  .Two{
    padding-bottom: 15px;
  }
  .Two:hover{
    background-color: white;
    color: #353535 !important;
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
		background-color: #353535 !important;
		
	}
	.vdpCell:hover .vdpCellContent{
		background-color: #353535 !important;
	}
	.vdpCell.today{
		color:rgb(31, 86, 115) !important;
	}
	.vdpArrowNext:after{
		border-left-color:#353535 !important;
	}
	.vdpArrowPrev:after{
		border-right-color:#353535 !important;
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
    background-color: white;
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
  background:#BCBCBC;
  border: 1px solid #BCBCBC;
  color: #343633;
}
.class2 {
  background:#BCD1FF;
  border: 1px solid #BCD1FF;
  color: #343633;
}
.class3 {
  background:#DDEFBD;
  border: 1px solid #DDEFBD;
  color: #343633;
}
.class4 {
  background:#CDF2E2;
  border: 1px solid #CDF2E2;
  color: #343633;
}
.class5 {
  background:#B7E8CD;
  border: 1px solid #B7E8CD;
  color: #343633;
}
.class6 {
  background:#C0E5DD;
  border: 1px solid #C0E5DD;
  color: #343633;
}
.class7 {
  background:#F2E6E6;
  border: 1px solid #F2E6E6;
  color: #343633;
}
.class8 {
  background:#FFD6D6;
  border: 1px solid #FFD6D6;
  color: #343633;
}
.class9 {
  background:#FFD1BA;
  border: 1px solid #FFD1BA;
  color: #343633;
}
.class10 {
  background:#FFF3B5;
  border: 1px solid #FFF3B5;
  color: #343633;
}
.class11 {
  background:#EFEBD0;
  border: 1px solid #EFEBD0;
  color: #343633;
}
.class12 {
  background:#FFE5E5;
  border: 1px solid #FFE5E5;
  color: #343633;
}
.class13 {
  background:#A2CEA1;
  border: 1px solid #A2CEA1;
  color: #343633;
}
.class14 {
  background:#9EC189;
  border: 1px solid #9EC189;
  color: #343633;
}
.class15 {
  background:#ADC9D8;
  border: 1px solid #ADC9D8;
  color: black;
}
.class16 {
  background:#B0E098;
  border: 1px solid #B0E098;
  color: #343633;
}
.class17 {
  background:#E8FCCF;
  border: 1px solid #E8FCCF;
  color: #343633;
}
.class18 {
  background:#BBCCEA;
  border: 1px solid #BBCCEA;
  color: #343633;
}
.class19 {
  background:#A2BFF2;
  border: 1px solid #A2BFF2;
  color: #343633;
}
.class20 {
  background:#D6FFDF;
  border: 1px solid #D6FFDF;
  color: #343633;
}
.class21 {
  background:#C2C8E8;
  border: 1px solid #C2C8E8;
  color: #343633;
}
.class22 {
  background:#EBD4CB;
  border: 1px solid #EBD4CB;
  color: #343633;
}
.class23 {
  background:#EAC5BE;
  border: 1px solid #EAC5BE;
  color: #343633;
}
.class24 {
  background:#A4D6CA;
  border: 1px solid #A4D6CA;
  color: #343633;
}
.class25 {
  background:#CAF7E2;
  border: 1px solid #CAF7E2;
  color: #343633;
}
.class26 {
  background:#CAF7E2;
  border: 1px solid #CAF7E2;
  color: #343633;
}
.class27 {
  background:#6EA08B;
  border: 1px solid #6EA08B;
  color: #343633;
}
.class28 {
  background:#EBD8D0;
  border: 1px solid #EBD8D0;
  color: #343633;
}
.class28 {
  background:#EAC9C1;
  border: 1px solid #EAC9C1;
  color: #343633;
}
.class29 {
  background:#D3AB9E;
  border: 1px solid #D3AB9E;
  color: #343633;
}
.class30 {
  background:#CAF7E2;
  border: 1px solid #CAF7E2;
  color: #343633;
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
  background-color:#7ec365;
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
  color: #353535;
  border-radius: 5px; 
  background-color: rgba(238, 238, 238, 0.623);
  text-align: center
}

.CMani{ 
  border-radius: 5px; 
  background-color: white;
  color: #353535;
  cursor: pointer;
  font-size: 1.5em;
  outline: none;
}

.manis{
  display: none;
}
.completeCitas .autocomplete__box{
		background-color: white !important;
		-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		border: none !important;
		border-radius: 5px;
		padding: 2px;
		width: 50% ;
		color: black !important;
		width: 100%;
		outline: none !important;
	}
	.autocompleteCitas{
		outline: none !important;
		background-color:transparent!important;
		border: none !important;
		border-radius: 5px;
		padding: 5px;
		width: 50% ;
		color: black !important;
		width: 100%;
	}
.autocomplete__results{
	outline: none !important;
	overflow: hidden !important;
	max-height: 100px !important;
	background-color: white !important;
	-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
	color: #000 !important;
	border:none !important;
	border-radius: 5px;
}
.autocomplete__results__item{
	outline: none !important;
	padding: 10px !important;
}
.inputsCrear{
  background-color: white !important;
  -webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
  -moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
  box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
  border: none !important;
  border-radius: 5px;
  padding: 10px;
  width: 64% ;
  color: black !important;
  outline: none !important;
}
.containeer {
        display: block;
        position: relative;
        padding-left: 35px;
        
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

        /* Hide the browser's default checkbox */
    .containeer input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

        /* Create a custom checkbox */
    .containeer {
		display: inline-block;
		position: relative;
		cursor: pointer;
		font-size: 0.8em;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

		/* Hide the browser's default checkbox */
	.containeer input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: #1F5673;
	}

	/* On mouse-over, add a grey background color */
	.containeer:hover input ~ .checkmark {
		background-color: #1F5673;
	}

	/* When the checkbox is checked, add a blue background */
	.containeer input:checked ~ .checkmark {
		background-color: #102229;
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.containeer input:checked ~ .checkmark:after {
		display: inline-block;
	}

	/* Style the checkmark/indicator */
	.containeer .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
