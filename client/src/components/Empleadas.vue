<template>
	<div class="container">
		<h1 class="text-center mt-3 Titulo">Manicuristas</h1>
		<div class="row">
			<div class="col-md-12">
				<table class="table reporteIndividual">
					<thead class="thead-light">
						<tr class="respons" >
							<th class="bg-info text-white text-center">
								Servicio
							</th>
							<th class="bg-info text-white text-center">
								Cliente
							</th>
							<th class="bg-info text-white text-center">
								Comision
							</th>
							<th class="bg-info text-white text-center">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
							<tr v-for="venta of ventas" class="respons">
								<td class="table-info font-weight-bold text-center">
									{{venta.servicios}}
	 							</td>
								<td class="table-info font-weight-bold text-center">
									{{venta.cliente}}
	 							</td>
								<td class="table-info font-weight-bold text-center">
									{{venta.comision}}
	 							</td>
								<td class="table-info font-weight-bold text-center">
									{{venta.total}}
	 							</td>
							</tr>
					</tbody>
				</table>
				<table class="table tablaManicuristas">
					<thead class="thead-light">
						 <tr class="respons">
							 <th class="bg-info text-white text-center">
								 Nombre
							 </th>
							 <th class="bg-info text-white text-center">
								 Root
							 </th>
							 <th class="bg-info text-white text-center">
								 Porcentaje
							 </th>
							 <th class="bg-info text-white text-center">
								 Comision
							 </th>
							 <th class="bg-info text-white text-center">
								Operadores
							 </th>
						 </tr>
					 </thead>
					 <tbody>
						 <tr v-for="manicurista of manicuristas"  class="respons">
 							<td class="table-info font-weight-bold text-center">
 								{{manicurista.nombre}}
 							</td>
 							<td class="table-info font-weight-bold text-center">
 								{{manicurista.documento}}
 							</td>
							<td class="table-info font-weight-bold text-center">
 								{{manicurista.porcentaje}}
 							</td>
							<td class="table-info font-weight-bold text-center">
 								{{manicurista.comision}}
 							</td>
							<td class="table-info font-weight-bold text-center">
								<font-awesome-icon icon="trash" v-on:click="eliminarManicurista(manicurista._id)"/>
								<font-awesome-icon icon="edit" v-on:click="pasarDatosEdit(manicurista.nombre, manicurista.documento,manicurista._id,manicurista.porcentaje,manicurista.comision)"/>
								<font-awesome-icon icon="copy" class="report" v-on:click="sacarReporte(manicurista.nombre)"/>
							</td>
 						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td class="table-info font-weight-bold text-center">
								<button type="button" name="button" class="btn btn-info" v-on:click="abrirModalRegistro">
									Registrar
								</button>
							</td>
						</tr>
					 </tbody>
				 </table>
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
		        <form v-on:submit.prevent="registroManicurista">
							<div class="form-group">
								<label for="nombre">Nombre de la manicurista</label>
								<input type="text" v-model="nombreManicurista" class="form-control" name="nombreManicurista" placeholder="Nombre de la manicurista" >
							</div>
							<div class="form-group">
								<label for="identidad">Root de la manicurista</label>
								<input type="text" v-model="documentoManicurista" class="form-control verificacion" name="documentoManicurista" placeholder="Root de la manicurista">
							</div>
							<div class="form-group">
								<label for="identidad">Porcentaje de la manicurista</label>
								<input type="text" v-model="porcentajeManicurista" class="form-control verificacion" name="porcentajeManicurista" placeholder="Porcentaje de la manicurista">
							</div>
							<button class="btn btn-lg btn-info btn-block" type="submit">Registrar Manicurista</button>
		        </form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header bg-info">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Acutalizar manicurista</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="actualizarManicurista">
							<div class="form-group">
								<label for="nombre">Nombre de la manicurista</label>
								<input type="text" v-model="nombreManicurista" class="form-control" name="nombreManicurista" placeholder="Nombre de la manicurista" >
							</div>
							<div class="form-group">
								<label for="identidad">Root de la manicurista</label>
								<input type="text" v-model="documentoManicurista" class="form-control verificacion" name="documentoManicurista" placeholder="Root de la manicurista">
							</div>
							<div class="form-group">
								<label for="identidad">Porcentaje de la manicurista</label>
								<input type="text" v-model="porcentajeManicurista" class="form-control verificacion" name="porcentajeManicurista" placeholder="Porcentaje de la manicurista">
							</div>
							<button class="btn btn-lg btn-info btn-block" type="submit">Actualizar Manicurista</button>
		        </form>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>

<script type="text/javascript">
import axios from 'axios'
import router from '../router'

class Manicurista{
	constructor(nombre, documento, porcentaje, comision) {
		this.nombre = nombre;
		this.documento = documento;
		this.porcentaje = porcentaje;
		this.comision = comision;
	}
}
class Venta{
	constructor(servicios, cliente, comision, total) {
		this.servicios = servicios;
		this.cliente = cliente;
		this.comision = comision;
		this.total = total;
	}
}

export default {
	data(){
		return {
			manicurista: new Manicurista(),
			manicuristas: [],
			venta: new Venta(),
			ventas: [],
			nombreManicurista: '',
			documentoManicurista: '',
			porcentajeManicurista: '',
			idManicuristaEditar: ''
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
		this.getManicuristas();
	},
	methods: {
		getManicuristas(){
			axios.get('manicuristas')
			.then(res => {
				this.manicuristas = res.data
			})
		},
		eliminarManicurista(id){
			axios.delete('manicuristas/' + id)
			.then(res => {
				if(res.data.status = 'Manicurista Eliminada'){
					this.$swal({
						type: 'success',
						title: 'Manicurista eliminado',
						showConfirmButton: false,
						timer: 1500
					})
					this.getManicuristas()
				}
			})
			.catch(err => {
				this.$swal({
					type: 'error',
					title: 'Hubo un problema',
					showConfirmButton: false,
					timer: 1500
				})
			})
		},
		registroManicurista(){
			axios.post('manicuristas', {
				nombreManicurista: this.nombreManicurista,
				documentoManicurista: this.documentoManicurista,
				porcentajeManicurista: this.porcentajeManicurista
			})
			.then(res => {
				if(res.data.status == 'Manicurista ingresada'){
					this.$swal({
						type: 'success',
						title: 'Manicurista ingresada',
						showConfirmButton: false,
						timer: 1500
					})
					this.getManicuristas()
					$('#myModal').modal('hide')
				}else{
					this.$swal({
						type: 'error',
						title: 'Manicurista ya existe',
						showConfirmButton: false,
						timer: 1500
					})
					this.getManicuristas()
					$('#myModal').modal('hide')
				}
			})
		},
		abrirModalRegistro(){
			$('#myModal').modal('show')
		},
		actualizarManicurista(){
			axios.put('manicuristas/' + this.idManicuristaEditar, {
				nombre: this.nombreManicurista,
				documento: this.documentoManicurista,
				porcentaje: this.porcentajeManicurista
			})
			.then(res => {
				if(res.data.status == "Manicurista Editada"){
					this.$swal({
						type: 'success',
						title: 'Manicurista actualizada',
						showConfirmButton: false,
						timer: 1500
					})
					this.getManicuristas()
					$('#myModal2').modal('hide')
				}else{
					this.$swal({
						type: 'error',
						title: 'Manicurista ya existe',
						showConfirmButton: false,
						timer: 1500
					})
					this.getManicuristas()
					$('#myModal2').modal('hide')
				}
			})
		},
		pasarDatosEdit(nombre, documento, id, porcentaje){
			this.nombreManicurista = nombre
			this.documentoManicurista = documento
			this.porcentajeManicurista = porcentaje
			this.idManicuristaEditar = id
			$('#myModal2').modal('show')
		},
		sacarReporte(manicurista){
			axios.get('ventas/manicurista/' + manicurista)
			.then(res => {
				this.ventas = res.data
				$('.tablaManicuristas').hide()
				$('.reporteIndividual').show()
				$('.Titulo').text('Reporte de: '+ manicurista)
				this.$swal({
					type: 'success',
					title: 'espere un segundo',
					showConfirmButton: false,
					timer: 1500
				})
				setTimeout(() => {
					print()
					$('.reporteIndividual').hide()
					$('.tablaManicuristas').show()
					$('.Titulo').text('Manicuristas')
				}, 2000)
			})
		}
	}
}
</script>
<style media="screen">
  @media (max-width: 700px) {
    .respons{
      font-size: 2vw;
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
	.reporteIndividual{
		display:none
	}

</style>
