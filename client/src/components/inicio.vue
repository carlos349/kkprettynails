<template>
    <h1>Incio pagina web</h1>
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