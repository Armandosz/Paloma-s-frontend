<template>
<div class="container mt-5">
  <div class="table-responsive">
    <table class="table table-hover table-bordered table-striped table-sm text-center bg-white">
      <thead class="thead-dark">
        <tr> 
          <th colspan="1">
              <input type="text" class="form-control" placeholder="Buscar por nombre..." aria-label="Username" aria-describedby="basic-addon1" v-model="search">
            </th>
            <th colspan="2"></th>
            <th>
              <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal2">Agregar</button>
            </th>
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
          <td>{{cliente.cuenta}}
            <button type="button" class="btn btn-warning ml-2" data-toggle="modal" data-target="#exampleModal3">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
            </button>
          </td>
          <td>
            <button  type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path fill-rule="evenodd" d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
                <circle cx="3.5" cy="5.5" r=".5"/>
                <circle cx="3.5" cy="8" r=".5"/>
                <circle cx="3.5" cy="10.5" r=".5"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal para mostrar los abonos -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
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

    <!-- Modal para crear cliente-->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                  <div>
                    <form>
                      <div class="form-group">
                        <label for="Usuario">Nombre:</label>
                        <input type="text" class="form-control" v-model="nombre">
                      </div>
                      <div class="form-group">
                        <label for="Nombre">Telefono:</label>
                        <input type="text" class="form-control" v-model="telefono" >
                      </div>
                      <div class="form-group">
                        <label for="Cuenta">Cuenta:</label>
                        <input type="text" class="form-control" v-model="cuenta">
                      </div>
                    </form>
                  </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary"  @click.prevent="createCliente">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para editar la cuenta de un cliente-->
    <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                  <div>
                    <form>
                      <div class="form-group">
                        <label for="Cuenta">Cuenta:</label>
                        <input type="text" class="form-control" v-model="cuenta">
                      </div>
                    </form>
                  </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary"  @click.prevent="updateClienteCuenta">Guardar Cambios</button>
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

        //Variables de los clientes
        nombre: '',
        telefono: '',
        cuenta: '',

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
      PrendaDataService.getAllClientesAbonos(this.currentPrenda._id,this.config)
        .then(response => {
          this.abonos = response.data;
          console.log(response.data.abonos);
        })
        .catch(e => {
          console.log(e);
        });
    },

    /* Crear una prenda */
    createCliente() {
      var data = {
        nombre: this.nombre,
        telefono: this.telefono,
        cuenta: this.cuenta
      };

      console.log(data);

      PrendaDataService.createCliente(data, this.config)
        .then(response => {
          console.log(response.data);
          swal({
            title: "Cliente creado correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $('#exampleModal2').modal('hide');
          //this.exampleModal.hide;
          //this.message = 'El pedido se actualizaco correctamente!';
        })
        .catch(e => {
          swal({
            title: "Error al crear la prenda!!",
            //text: "You clicked the button!",
            icon: "error",
            button: "Continuar",
          });
          console.log(e);
          this.message = e;
        });
     },

     updateClienteCuenta() {

      console.log(this.currentCliente)
      
      var data = {
        _id: this.currentCliente._id,
        nombre: this.currentCliente.nombre,
        telefono: this.currentCliente.telefono,
        cuenta: this.cuenta
      };

      PrendaDataService.updateCliente(this.currentCliente._id, data)
        .then(response => {
          console.log(response.data);
          swal({
            title: "Cuenta del cliente actualizada correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $('#exampleModal3').modal('hide');
        })
        .catch(e => {
          swal({
            title: "Error al actualizar la contraseña!!",
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
     }
    },
     mounted() {
      this.retrieveClientes();
      //this.retrieveAbonos();
    },
    computed: {
      filteredClientes: function(){
        return this.clientes.filter((cliente) => {
          //return cliente.nombre.match(this.search.toLowerCase());
          return cliente.nombre.toLowerCase().match(this.search.toLowerCase());
        })
      }
    }
  }

</script>
