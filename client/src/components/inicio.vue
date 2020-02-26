<template>
<div>
    <h1>Incio pagina web</h1>
    <router-link style="text-decoration: none !important;" class=" " to="/gastos">
						<button class="btn btn-success">Ingresar</button>
				</router-link>
    
</div>
    
</template>
<script>
import EventBus from './EventBus'
export default {
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