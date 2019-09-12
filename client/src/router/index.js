import Vue from 'vue'
import Router from 'vue-router'
import Procesar from '@/components/Procesar'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import Gastos from '@/components/Gastos'
import Servicios from '@/components/Servicios'
import Empleadas from '@/components/Empleadas'
import Inventario from '@/components/Inventario'
import Ventas from '@/components/Ventas'
import Users from '@/components/Users'
import Metricas from '@/components/Metricas'
import Citas from '@/components/Citas'
import reporteCierre from '@/components/reporteCierre'
import Caja from '@/components/Caja'

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
      path: '/procesar',
      name: 'procesar',
      component: Procesar
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
      path: '/gastos',
      name: 'Gastos',
      component: Gastos
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
    },
    {
      path: '/reportecierre',
      name: 'reportecierre',
      component: reporteCierre
    },
    {
      path: '/caja',
      name: 'Caja',
      component: Caja
    },
  ]
})
