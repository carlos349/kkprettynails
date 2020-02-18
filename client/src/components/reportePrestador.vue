<template>
    <div class="container">
        <div class="row">
             <div class="recuadro col-sm-4 ml-4 mt-4" >
            <h1 class="text-left"><b>REPORTE PRESTADOR</b> </h1>
            <h3><b>Fecha:</b>  {{fecha}}</h3>
            <h3><b>Nombre:</b>  {{nameLender}}</h3>
            
            <h3><b>Adelantos:</b>  {{formatPrice(advancements)}}</h3>
            <h3><b>Fecha de Inicio:</b> 11-02-2020</h3>
            <h3><b>Fecha de Salida:</b> 11-02-2020</h3>
            <h3><b>Comisión Total:</b> {{formatPrice(totalComisiones)}}</h3>
            <h3><b>Total Ventas:</b>  {{formatPrice(totalVentas)}}</h3>
            <h3><b>Cantidad de Ventas:</b>  {{this.sales.length}}</h3>
            <center>
               <button class="btn add mt-5 w-75 text-center" style="" v-on:click="openPrestDiscount">Adelantos o Bonos</button>
                <button class="w-75 btn mt-2 add" v-on:click="printReport">Crear reporte y cerrar ventas</button> 
            </center>
            
            </div>
            <div class="col-sm-7 mt-4 ml-5">
                <v-client-table class="text-center tablaReportesPersonal"  :data="sales" :columns="columns" :options="optionsT">
                
               
                <p slot="fecha" slot-scope="props">{{formatDate(props.row.fecha)}}</p>
                
                <p slot="comisionn" slot-scope="props">{{formatPrice(props.row.comision)}}</p>
                
                <p slot="totall" slot-scope="props">{{formatPrice(props.row.total)}}</p>
              </v-client-table>
            </div>
            
        </div>
       
        
        <div class="row">
            <div class="col-12">
                <div class="small">
					<line-chart v-if="loaded" :chartdata="chartdata" :options="options" :styles="myStyles"/>
				</div>
            </div>
            <div class="col-12">

            </div>
        </div>
       
        <div class="modal fade" id="ModalEditPrestador" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div v-bind:style="{ 'background-color': '#ffffff'}" class="modal-content">
		      <div class="modal-header" v-bind:style="{ 'background-color': '#6BB2E5'}">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registrar adelanto o bono</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body letters">
				<form v-on:submit.prevent="RegisterAdevancement">
                    <div class="form-group" style="margin-bottom:-5px;">
                        <label class="containeer"><h4>¿Está registrando un bono?</h4>
                            <input class="ifCheck" type="checkbox" >
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="form-group ">
						<label for="name">Fecha del adelanto o bono</label>
                        <date-pick class="reportePrestadorInputs"
								v-model="dateAdvancement"
							    :weekdays=Days
								:months=months
								:nextMonthCaption="'Siguiente mes'"
								:prevMonthCaption="'Mes anterior'"
						></date-pick>
					</div>
					<div class="form-group">
						<label for="name">Razón</label>
						<input v-model="reason" type="text" class="form-control reportePrestadorInputs" placeholder="Razon del adelanto">
					</div>
					<div class="form-group mb-5">
						<label for="name">Total del adelanto o bono</label>
						<input v-model="totalAdvancement" type="text" class="form-control reportePrestadorInputs" placeholder="Escriba el monto">
					</div>
                    <div class="maxHei" style="margin-top:-30px;">
                        <table class="table table-light table-borderless table-striped">
                            <thead >
                                <tr>
                                    <th>
                                        Razón
                                    </th>
                                    <th>
                                        Total
                                    </th>
                                    <th>
                                        Fecha
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="advancement of advancements">
                                    <td>
                                        {{advancement.reason}}
                                    </td>
                                    <td>
                                        {{advancement.total}}
                                    </td>
                                    <td>
                                        {{formatDate(advancement.date)}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
					<button class="btn w-100 add mt-3">Registrar adelanto</button>
				</form>
		      </div>
		    </div>
		  </div>
		</div>
    </div>
</template>
<script type="text/javascript">
    import EventBus from './EventBus'
    import axios from 'axios'
    import LineChart from '../plugins/LineChart.js'
    import router from '../router'
    import DatePick from 'vue-date-pick';
	import 'vue-date-pick/dist/vueDatePick.css';

    export default {
        components: {
            LineChart,
            DatePick
        },
        data(){
            return{
                 columns:['fecha' , 'cliente' , 'comisionn' , 'totall'],
			optionsT: {
				filterByColumn: true,
				texts: {
					filter: "Filtrar:",
					filterBy: 'Filtrar por {column}',
					count:' '
				},
				headings: {
					fecha: 'Fecha ',
					cliente: 'Cliente ',
                    comisionn: 'Comision ',
                    totall: 'Total',
				},
				pagination: { chunk:10 },
				pagination: { dropdown:true },
				pagination: { nav: 'fixed' },
				pagination: { edge: true },
				sortIcon: {base:'fa' , up:'fa-sort-up', down:'fa-sort-down', is:'fa-sort'},
				sortable: ['fecha'],
				filterable: ['']
			},
                aperturaBanco: 0,
                aperturaefectivo: 0,
                aperturatotal: 0,
                cierrebanco: 0,
                cierrefectivo: 0,
                cierretotal: 0,
                gastos: 0,
                advancements: [],
                cuenta: 0,
                porcentaje:'',
                codigo: '',
                fecha: '',
                sales: [],
                identificacion:'',
                totalVentas: 0,
                totalComisiones:0,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                loaded: false,
                chartdata: null,
                height:360,
                reason:'',
                totalAdvancement:'',
                dateAdvancement: 'Click para elegr fecha',
                Days:['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'],
				months:[
					'Enero', 'Febrero', 'Marzo', 'Abril',
					'Mayo', 'Junio', 'Julio', 'Agosto',
					'Septiembre', 'Octubre', 'Noviembre', 'Diciembrer'
                ],
                nameLender: ''
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
            }else{
                EventBus.$emit('logged-out', true)
            }
        },
        created(){
            this.getClosing();
            this.getAdvancements();
        },
        methods: {
            getClosing(){
                const id = localStorage.getItem('reportePrestador')
                axios.get('manicuristas/justOneById/'+id)
                .then(resData => {
                    const date = new Date()
                    this.fecha = date.getDate()+"-"+(date.getMonth() + 1)+"-"+date.getFullYear()
                    this.codigo = resData.data._id
                    this.porcentaje = resData.data.porcentaje
                    this.nameLender = resData.data.nombre
                    const identificacion = resData.data.nombre+':'+resData.data.documento
                    axios.get('manicuristas/SalesByPrest/'+identificacion)
                    .then(res => {
                        this.sales = res.data
                        let totales = 0
                        let comisiones = 0
                        for (let index = 0; index < res.data.length; index++) {
                            totales = parseFloat(res.data[index].total) + parseFloat(totales)
                            comisiones = parseFloat(res.data[index].comision) + parseFloat(comisiones)
                        }
                        this.totalVentas = totales
                        this.totalComisiones = comisiones
                        axios.get('/manicuristas/GetSalesPerMonth/'+this.identificacion)
                        .then(res => {	
                            const userlist = res.data
                            this.chartdata = userlist
                            this.loaded = true
                        })
                        .catch(err => {
                            console.error(err)
                        })
                    })
                })
                .catch(err => {
                    console.log(err )
                })
            },
            RegisterAdevancement(){
                if (this.reason == '' && this.totalAdvancement == '' && this.dateAdvancement == '') {
                    this.$swal({
                        type: 'error',
                        title: 'Por favor, llene los campos',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }else if($('.ifCheck').prop('checked')){
                    axios.post('manicuristas/registerAdvancement', {
                        reason: this.reason,
                        name: this.identificacion,
                        prest: this.codigo,
                        total: this.totalAdvancement,
                        check: 'Bonus',
                        date: this.dateAdvancement
                    })
                    .then(res => {
                        if (res.data.status == 'ok') {
                            this.$swal({
                                type: 'success',
                                title: 'Adelanto registrado',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.getAdvancements();
                        }else{
                            this.$swal({
                                type: 'info',
                                title: 'Se resgistro el adelanto, pero no se registro en el cierre, ya que no hay un cierre de ventas para dicha fecha',
                                showConfirmButton: true
                            })
                            this.getAdvancements();
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }else{
                    axios.post('manicuristas/registerAdvancement', {
                        reason: this.reason,
                        name: this.identificacion,
                        prest: this.codigo,
                        total: this.totalAdvancement,
                        check: 'Advancement',
                        date: this.dateAdvancement
                    })
                    .then(res => {
                        if (res.data.status == 'ok') {
                            this.$swal({
                                type: 'success',
                                title: 'Adelanto registrado',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.getAdvancements();
                        }else{
                            this.$swal({
                                type: 'info',
                                title: 'Se resgistro el adelanto, pero no se registro en el cierre, ya que no hay un cierre de ventas para dicha fecha',
                                showConfirmButton: true
                            })
                            this.getAdvancements();
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            },
            printReport(){
                this.$swal({
                    title: '¿Estás seguro de hacer el Cierre?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si hacer Cierre',
                    cancelButtonText: 'No hacer Cierre',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                })
                .then(result => {
                    if (result.value) {
                        axios.put('manicuristas/ClosePrest/'+this.codigo)
                        .then(res => {
                            if (res.data.status == 'ok') {
                                setTimeout(()=> {
                                    $('.menuVer').hide()
                                    $('.add').hide()
                                    print()
                                    $('.menuVer').show()
                                    router.push({name:'Empleadas'})
                                }, 1000) 
                            }else{
                                this.$swal('Error en el cierre', 'Hubo un error', 'error')
                            }
                        }) 
                        .catch(err => {
                            console.log(err)
                        })                   
                    }else{
                        this.$swal('No se hizo el cierre', 'Aborto la acción', 'info')
                    }
                })
            },
            openPrestDiscount(){
                $('#ModalEditPrestador').modal('show')
            },
            getAdvancements(){
                setTimeout(() => {
                    axios.get('/manicuristas/advancements/'+this.codigo)
                    .then(res => {	
                        console.log(res.data)
                        this.advancements = []
                        this.advancements = res.data
                    })
                    .catch(err => {
                        console.error(err)
                    })
                },1500)
            },
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            formatDate(date) {
               let dateFormat = new Date(date)
               return dateFormat.getDate()+"-"+(dateFormat.getMonth() + 1)+"-"+dateFormat.getFullYear()
            }
        },
        computed: {
            myStyles (){
                return {
                    height: `${this.height}px`,
                    position: 'relative'
                }
            }
        }
    }
</script>
<style media="screen">
    .recuadro{
        background-color: rgba(238, 238, 238, 0.623);
        border-radius: 5px;
        
        box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
        padding: 20px;
        color:#353535;
    }
    .recuadro h3{
        margin-top: 4%;
    }
    .datos{
        border: solid 2px #353535;
        background-color: rgba(238, 238, 238, 0.623);
        border-radius: 5px;
        padding: 20px;
    }
    .datos table{
        color:#102229;
    }
    .small{
		background-color: #fff;
		margin-top: 20px;
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
    label{
        color:black;
    }
    .add{
		background-color:#353535;
		color: azure;
        margin: auto;
		transition: all 0.5s ease-out;
		font-family: 'Roboto', sans-serif !important;
		font-weight:600;
		letter-spacing: 1px;
		border-radius:5px;
    }
	.add:hover{
		background-color:#ccc;
		color:#001514;
    }
    .inputss input{
		width: 100%;
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
    .maxHei{
		overflow-x: hidden;
		overflow-y:scroll;
		max-height: 300px;
		height:auto;
		border-radius:5px;
	}
	.maxHei::-webkit-scrollbar {
		width: 8px;     /* Tamaño del scroll en vertical */
		height: 8px;    /* Tamaño del scroll en horizontal */
		display: none;  /* Ocultar scroll */
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
    .tablaReportesPersonal th{
	border:none !important;
	}
	.tablaReportesPersonal tbody{
		background-color: white;
	}
	.tablaReportesPersonal table{

	border-radius: 10px !important; 
	}
	.tablaReportesPersonal {
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
		border-radius: 10px !important; 
	}
	.tablaReportesPersonal thead {
			background-color: rgba(238, 238, 238, 0.623) !important;
			color: #353535;
			text-align: center
	}
	.tablaReportesPersonal thead th {
			border-left: 1px black !important;
	}
    .reportePrestadorInputs{
        background-color: transparent !important;
		-webkit-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		-moz-box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		box-shadow: inset 0px 0px 20px 4px rgba(0,0,0,0.11);
		border: none !important;
		border-radius: 5px;
		padding: 10px;
		width: 50% ;
		color: black !important;
		width: 100%;
		outline: none !important;
    }
</style>