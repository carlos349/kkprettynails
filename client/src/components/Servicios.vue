<template>
	<div class="container">
		<h1 class="text-center mt-3">Servicios</h1>
		<div class="row">
			<div class="col-md-12">
				<table class="table">
					<thead class="thead-light">
						 <tr>
							 <th class="bg-info text-white text-center">
								 Nombre
							 </th>
							 <th class="bg-info text-white text-center">
								 Precio
							 </th>
							 <th class="bg-info text-white text-center">
								 Operaciones
							 </th>
						 </tr>
					 </thead>
					 <tbody>
						 <tr v-for="servicio of servicios" >
 							<td class="table-info font-weight-bold text-center">
 								{{servicio.nombre}}
 							</td>
 							<td class="table-info font-weight-bold text-center">
 								{{servicio.precio}}
 							</td>
							<td class="table-info font-weight-bold text-center">
								<font-awesome-icon icon="trash" v-on:click="eliminarServicio(servicio._id)"/>
								<font-awesome-icon icon="edit" v-on:click="pasarDatosEdit(servicio.nombre, servicio.precio,servicio._id)"/>
							</td>
 						</tr>
						<tr>
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
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registro cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="registroServicio">
							<div class="form-group">
								<label for="nombre">Nombre del servicio</label>
								<input type="text" v-model="nombreServicio" class="form-control" name="nombreServicio" placeholder="Nombre del servicio" >
							</div>
							<div class="form-group">
								<label for="identidad">Precio del servicio</label>
								<input type="text" v-model="precioServicio" class="form-control verificacion" name="precioServicio" placeholder="Precio del servicio">
							</div>
							<button class="btn btn-lg btn-info btn-block" type="submit">Registrar servicio</button>
		        </form>
		      </div>
		    </div>
		  </div>
		</div>
		<div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header bg-info">
		        <h5 class="modal-title text-white font-weight-bold" id="exampleModalCenterTitle">Registro cliente</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true" class="text-white">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <form v-on:submit.prevent="actualizacionServicios">
							<div class="form-group">
								<label for="nombre">Nombre del servicio</label>
								<input type="text" v-model="nombreServicio" class="form-control" name="nombreServicio" placeholder="Nombre del servicio" >
							</div>
							<div class="form-group">
								<label for="identidad">Precio del servicio</label>
								<input type="text" v-model="precioServicio" class="form-control verificacion" name="precioServicio" placeholder="Precio del servicio">
							</div>
							<button class="btn btn-lg btn-info btn-block" type="submit">Actualizar servicio</button>
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

	class Servicio{
		constructor(nombre, precio) {
			this.nombre = nombre;
			this.precio = precio;
		}
	}

	export default {
		data() {
			return {
				servicio: new Servicio(),
 			 	servicios: [],
				nombreServicio: '',
				precioServicio: '',
				idServicioEditar: ''
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
 			this.getServicios();
 		},
		methods: {
			getServicios() {
				axios.get('servicios')
				.then(res => {
					this.servicios = res.data
				})
				this.nombreServicio = ' '
				this.precioServicio = ' '
			},
			eliminarServicio(id){
				axios.delete('servicios/' + id)
				.then(res => {
					if (res.data.status == 'Servicio eliminado'){
						this.$swal({
						  type: 'success',
						  title: 'Servicio eliminado',
						  showConfirmButton: false,
						  timer: 1500
						})
						this.getServicios();
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
			registroServicio(){
				axios.post('servicios', {
					nombreServicio: this.nombreServicio,
					precioServicio: this.precioServicio
				})
				.then(res => {
					if(res.data.status == 'Servicio creado'){
						this.$swal({
						  type: 'success',
						  title: 'Servicio creado',
						  showConfirmButton: false,
						  timer: 1500
						})
						$('#myModal').modal('hide')
						this.getServicios();
					}else{
						this.$swal({
						  type: 'error',
						  title: 'El servicio ya existe',
						  showConfirmButton: false,
						  timer: 1500
						})
						$('#myModal').modal('hide')
					}
				})
			},
			abrirModalRegistro(){
				$('#myModal').modal('show')
			},
			actualizacionServicios(){
				const id = this.idServicioEditar
				axios.put('servicios/' + id, {
					nombre: this.nombreServicio,
					precio: this.precioServicio
				})
				.then(res => {
					if(res.data.status == 'Servicio actualizado'){
						this.$swal({
						  type: 'success',
						  title: 'Servicio actualizado',
						  showConfirmButton: false,
						  timer: 1500
						})
						this.getServicios()
						$('#myModal2').modal('hide')
					}else{
						this.$swal({
						  type: 'error',
						  title: 'El servicio ya existe',
						  showConfirmButton: false,
						  timer: 1500
						})
						this.getServicios()
						$('#myModal2').modal('hide')
					}
				})
			},
			pasarDatosEdit(nombre, precio, id){
				this.nombreServicio = nombre
				this.precioServicio = precio
				this.idServicioEditar = id
				$('#myModal2').modal('show')
			}
		}
	}
</script>
