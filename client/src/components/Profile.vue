<template>
	<div v-bind:style="{ 'background-color': '#fff'}" class="infoBasic container-fluid m-5 p-3">
		<div class="row">
			<div  class="col-sm-3 ">
				<div v-bind:style="{ 'background-color': '#1f5673'}" class="col-sm-12 m-1 text-white p-3 text-center infoBasic">
					<h2>{{first_name}} {{last_name}} </h2>
				</div>
				<div v-bind:style="{ 'background-color': '#ded22f'}" class="col-sm-12 m-1  p-3 text-center infoBasic">
						<h2>Administrador</h2>
					</div>
			
			</div>
			<div class="col-sm-3">
				<img class="infoBasic" style="width: 80%;" src="../assets/silueta-mujer.jpg" alt="">
				<button class="btn m-1 w-75 ml-2 add">Editar foto de perfil</button>
			</div>
			<div v-bind:style="{ 'background-color': '#fff'}" class="col-md-6 infoBasic p-3">
				<h2 style="color:#1f5673" class="text-center" >Informacion Basica</h2>
			<table class="table mx-auto">
				<tbody>
					<tr>
						<td>Nombre</td>
						<td>{{first_name}}</td>
						<td>Editar</td>
					</tr>
					<tr>
						<td>Apellido</td>
						<td>{{last_name}}</td>
						<td>Editar</td>
					</tr>
					<tr>
						<td>Correo</td>
						<td>{{email}}</td>
						<td>Editar</td>
					</tr>
				</tbody>
			</table>
			</div>
		</div>
		
		<div class="container">
		
			<div class="row p-5">
			<div class="col-sm-12 mx-auto">
				
			</div>
			
				
			
			
		</div>
			</div>
	</div>
	
	
</template>

<script>
	import jwtDecode from 'jwt-decode'

	export default {
		data() {
			const token = localStorage.userToken
			const decoded = jwtDecode(token)

			return {
				first_name: decoded.first_name,
				last_name: decoded.last_name,
				email: decoded.email
			}
		}
	}
</script>
<style>
	.infoBasic{
		box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,0.03), 0 0.9375rem 1.40625rem rgba(4,9,20,0.03), 0 0.25rem 0.53125rem rgba(4,9,20,0.05), 0 0.125rem 0.1875rem rgba(4,9,20,0.03);
		border-radius: 5px;
	}
	.add{
		background-color:#1F5673;
		color: azure;
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

</style>