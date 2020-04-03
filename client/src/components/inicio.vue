<template>
<div>
    <h1>Incio pagina web</h1>
    <router-link style="text-decoration: none !important;" class=" " to="/administracion">
						<button class="btn btn-success">Ingresar</button>
				</router-link>
    <vue-good-table
      :columns="columns"
      :rows="rows"/>
    </div>
</div>
    
</template>
<script>
import EventBus from './EventBus'

export default {
    components: {  
    },
    data () {
        return {
            
          columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM Do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ],
        }
    },
    beforeCreate(){
        localStorage.removeItem('userToken')
        localStorage.setItem('logged-in', 'no-loggedin')
        localStorage.removeItem('nombre')
        localStorage.removeItem('apellido')
        localStorage.removeItem('image')
        localStorage.removeItem('email')
        localStorage.removeItem('imageUser')
        EventBus.$emit('logged-out', false)
    }
}
</script>