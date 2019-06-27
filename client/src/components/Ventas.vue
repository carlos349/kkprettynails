<template>
    <div class="container-fluid">
      <h1 class="text-center mt-3">Ventas</h1>
        <table class="table">
          <thead class="thead-light">
            <tr class="respons">
              <th class="bg-info text-white text-center">
                Servicios
              </th>
              <th class="bg-info text-white text-center">
                Cliente
              </th>
              <th class="bg-info text-white text-center">
                Manicurista
              </th>
              <th class="bg-info text-white text-center">
                Comision
              </th>
              <th class="bg-info text-white text-center">
                Local
              </th>
              <th class="bg-info text-white text-center">
                Ganancia
              </th>
              <th class="bg-info text-white text-center">
                Total
              </th>
              <th class="bg-info text-white text-center">
                Reporte
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
                {{venta.manicurista}}
              </td>
              <td class="table-info font-weight-bold text-center">
                {{venta.comision}}
              </td>
              <td class="table-info font-weight-bold text-center">
                {{venta.ganancialocal}}
              </td>
              <td class="table-info font-weight-bold text-center">
                {{venta.ganancianeta}}
              </td>
              <td class="table-info font-weight-bold text-center">
                {{venta.total}}
              </td>
              <td class="table-info font-weight-bold text-center">
                <font-awesome-icon icon="copy"/>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import router from '../router'

class Ventas{
	constructor(servicios, cliente, manicuristas, comision, local, ganancia, total) {
		this.servicios = servicios;
		this.cliente = cliente;
		this.manicuristas = manicuristas;
		this.comision = comision;
    this.local = local;
    this.ganancia = ganancia;
    this.total = total;
	}
}

export default {
  data(){
    return {
      venta: new Ventas(),
			ventas: []
    }
  },
  created(){
    this.getVentas();
  },
  methods: {
    getVentas(){
      axios.get('ventas')
      .then(res => {
        this.ventas = res.data
        console.log(this.ventas)
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

</style>
