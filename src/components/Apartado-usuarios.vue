<template>
<div class="container mt-5">
  <div class="table-responsive">
    <table class="table table-hover table-bordered table-striped table-sm text-center bg-white">
      <thead class="thead-dark">
        <tr> 
          <th colspan="1">
              <input type="text" class="form-control" placeholder="Buscar por nombre..." aria-label="Username" aria-describedby="basic-addon1" v-model="search">
            </th>
            <th colspan="3"></th>
        </tr>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Cuenta</th>
          <th scope="col">Abonos</th>
        </tr>
      </thead>
      <tbody>
        <tr   :class="{ active: index == currentIndex }"
              v-for="(cliente, index) in filteredClientes"
              :key="index"
              @click="setActiveCliente(cliente, index)"
        >
          <th scope="">{{cliente.nombre}}</th>
          <td>{{cliente.telefono}}</td>
          <td>{{cliente.cuenta}}</td>
          <td>
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path fill-rule="evenodd" d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
                <circle cx="3.5" cy="5.5" r=".5"/>
                <circle cx="3.5" cy="8" r=".5"/>
                <circle cx="3.5" cy="10.5" r=".5"/>
              </svg>
            </button>
            <button type="button" class="btn btn-outline-success ml-2" data-toggle="modal" data-target="#exampleModal2">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal para mostrar los abonos de un cliente -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Abonos</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="currentCliente" class="table-responsive">
                <table class="table table-hover table-bordered table-striped table-sm text-center bg-white">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Fecha</th>
                      <th scope="col">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="st in currentCliente.abonos"
                     :key="st.id"
                    >
                      <th scope="">{{st.fecha_abono}}</th>
                      <td>{{st.cantidad}}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary"  @click.prevent="createPrenda">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div> 

    <!-- Modal para crear agregar un abono de un cliente-->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Abono</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                  <div>
                    <form>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Cantidad:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" v-model="cantidad" aria-describedby="emailHelp">
                        <small id="emailHelp" class="form-text text-muted">Escribir la cantidad abononada sin decimales.</small>
                      </div>
                    </form>
                  </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary"  @click.prevent="createAbono">Guardar</button>
          </div>
        </div>
      </div>
    </div>

</div>
</template>

<script>
//Servicio que nos permitira importar las acciones con el backend
import PrendaDataService from "../services/PrendaDataService";

import swal from 'sweetalert';

const token = JSON.parse(localStorage.getItem('user'))['accessToken'] //Obtienes el token


  export default {
    data() {
      return {
      config:{
        headers: {
          "Content-type": "application/json",
          "Authorization": 'Bearer ' + token
        }
      },

        clientes: [],
        currentCliente: null,
        currentIndex: -1,

        abonos: [],

        /* Data abonos */
        fecha_abono: '',
        cantidad: '',

        search: ''
      }
    },
    methods: {
    retrieveClientes() {
      PrendaDataService.getAllClientes(this.config)
        .then(response => {
          this.clientes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveAbonos() {
      const id = this.currentCliente._id;
      console.log(id)
      PrendaDataService.getAllClientesAbonos(this.currentCliente._id,this.config)
        .then(response => {
          this.abonos = response.data;
          console.log(response.data.abonos);
        })
        .catch(e => {
          console.log(e);
        });
    },

     createAbono() {
        
      var data = {
        fecha_abono: null,
        cantidad: this.cantidad
      };

      this.currentCliente
      console.log("Antes: "+this.currentCliente.cuenta)
      var newCantidad = this.restCantidad(this.cantidad, this.currentCliente.cuenta);
      console.log("despuess " +newCantidad)
      
      this.updateCuentaCliente(newCantidad);

      PrendaDataService.createAbono(this.currentCliente._id,data,this.config)
        .then(response => {
          console.log(response.data);
          swal({
            title: "Abono agregado correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $('#exampleModal2').modal('hide');
          //location.reload();
        })
        .catch(e => {
          swal({
            title: "Error al agregar el abono!!",
            //text: "You clicked the button!",
            icon: "error",
            button: "Continuar",
          });
          console.log(e);
          this.message = e;
        });
     },

     updateCuentaCliente(newCantidad) {
      var data = {
        _id: this.currentCliente._id,
        nombre: this.currentCliente.nombre,
        telefono: this.currentCliente.telefono,
        cuenta: newCantidad,
      };

      PrendaDataService.updateCuentaCliente(this.currentCliente._id, data)
        .then(response => {
          console.log(response.data);
          swal({
            title: "Cuenta del cliente actualizada correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $('#exampleModal2').modal('hide');
        })
        .catch(e => {
          swal({
            title: "Error al actualizar la cuenta del cliente!!",
            //text: "You clicked the button!",
            icon: "error",
            button: "Continuar",
          });
          console.log(e);
        });
    },
    
    /*Permite seleccionar un registro de la tabla */
    setActiveCliente(cliente, index) {
      this.currentCliente = cliente;
      this.currentIndex = index;
    },
     /* Recarga */
    refreshList() {
        this.retrieveClientes();
        //this.retrieveAbonos();
        this.currentCliente = null;
        this.currentIndex = -1;
    },
    restCantidad(currentAbono, CurrentCantidad) {
        CurrentCantidad = CurrentCantidad - currentAbono;
        return CurrentCantidad;
    }
    },
     mounted() {
      this.retrieveClientes();
      //this.retrieveAbonos();
    },
    computed: {
      filteredClientes: function(){
        return this.clientes.filter((cliente) => {
          return cliente.nombre.match(this.search);
        })
      }
    }
  }
</script>
