import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import Venta from '@/components/Venta'
import Servicios from '@/components/Servicios'
import Empleadas from '@/components/Empleadas'
import Inventario from '@/components/Inventario'
import Ventas from '@/components/Ventas'
import Users from '@/components/Users'
import Metricas from '@/components/Metricas'
import Citas from '@/components/Citas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/metricas',
      name: 'Metricas',
      component: Metricas
    },
    {
      path: '/citas',
      name: 'Citas',
      component: Citas
    },
    {
      path: '/venta',
      name: 'Home',
      component: Home
    },
    {
      path: '/Usuarios',
      name: 'Users',
      component: Users
    },
    {
      path: '/verventas',
      name: 'Ventas',
      component: Ventas
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/venta',
      name: 'Venta',
      component: Venta
    },
    {
      path: '/servicios',
      name: 'Servicios',
      component: Servicios
    },
    {
      path: '/empleadas',
      name: 'Empleadas',
      component: Empleadas
    },
    {
      path: '/inventario',
      name: 'Inventario',
      component: Inventario
    }
  ]
})
