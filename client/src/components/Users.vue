<template>
  <div class="container">
    <h1 class="text-center mt-3">Usuarios</h1>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th class="bg-info text-white text-center">Nombre</th>
          <th class="bg-info text-white text-center">Correo</th>
          <th class="bg-info text-white text-center">Estado</th>
          <th class="bg-info text-white text-center">Borrar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of users">
          <td class="table-info font-weight-bold text-center">
            {{user.first_name}} {{user.last_name}}
          </td>
          <td class="table-info font-weight-bold text-center">
            {{user.email}}
          </td>
          <td class="table-info font-weight-bold text-center">
            <button class="btn btn-success font-weight-bold" v-if="user.admin" v-on:click="editarEstado(user._id, user.admin)">Admin</button>
            <button class="btn btn-warning font-weight-bold" v-else v-on:click="editarEstado(user._id, user.admin)">Normal</button>
          </td>
          <td class="table-info font-weight-bold text-center">
            <font-awesome-icon v-if="user.admin" icon="trash" v-on:click="eliminarUsuario(user._id, user.admin)" />
            <font-awesome-icon v-else icon="trash" v-on:click="eliminarUsuario(user._id, user.admin)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'
  import router from '../router'

  class Users{
  	constructor(first_name, last_name, email, admin) {
  		this.first_name = first_name;
  		this.last_name = last_name;
  		this.email = email;
  		this.admin = admin;
  	}
  }

  export default {
    data(){
      return {
        user: new Users(),
        users: [],
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
      this.getUsers();
    },
    methods: {
      getUsers(){
        axios.get('users')
        .then(res => {
          this.users = res.data
        })
      },
      editarEstado(id, admin){
        axios.put('users/'+id, {
          admin: admin
        })
        .then(res => {
          this.getUsers()
        })
      },
      eliminarUsuario(id, admin){
        if(admin){
          this.$swal({
						type: 'error',
						title: 'No puede borrar un administrador',
						showConfirmButton: false,
						timer: 1500
					})
        }else{
          axios.delete('users/' + id)
          .then(res => {
            this.$swal({
  						type: 'success',
  						title: res.data.first_name+' '+res.data.last_name+' ha sido Borrado',
  						showConfirmButton: false,
  						timer: 1500
  					})
          })
          .catch(err => {
            this.$swal({
  						type: 'error',
  						title: 'Disculpe tenemos problemas técnicos',
  						showConfirmButton: false,
  						timer: 1500
  					})
          })
        }
      }
    }
  }
</script>
