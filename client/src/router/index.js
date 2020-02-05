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
import reportePrestador from '@/components/reportePrestador'
import Caja from '@/components/Caja'
import Clientes from '@/components/Clientes'
import reporteVenta from '@/components/reporteVenta'
import emailBuild from '@/components/emailBuild'
import inicio from '@/components/inicio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: inicio
    },
    {
      path: '/administracion',
      name: 'Login',
      component: Login
    },
    {
      path: '/metricas',
      name: 'Metricas',
      component: Metricas
    },
    {
      path: '/envioCorreo',
      name: 'emailBuild',
      component: emailBuild
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
      path: '/clientes',
      name: 'Clientes',
      component: Clientes
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
      path: '/reporteventa',
      name: 'reporteventa',
      component: reporteVenta
    },
    {
      path: '/caja',
      name: 'Caja',
      component: Caja
    },
    {
      path: '/reporteprestador',
      name: 'reporteprestador',
      component: reportePrestador
    },
  ]
})
