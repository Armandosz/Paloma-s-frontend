<template>
  <div class="container mt-5">
    <div class="table-responsive">
      <table
        class="table table-hover table-bordered table-striped table-sm text-center bg-white"
      >
        <thead class="thead-dark">
          <tr>
            <th colspan="">
              <input
                type="text"
                class="form-control"
                placeholder="Buscar por nombre..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="search"
              />
            </th>
            <th colspan="2"></th>
            <th>
              <button
                type="button"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Agregar
              </button>
            </th>
          </tr>
          <tr>
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{ active: index == currentIndex }"
            v-for="(usuario, index) in filteredUsers"
            :key="index"
            @click="setActiveUsuario(usuario, index)"
          >
            <th scope="">{{ usuario.username }}</th>
            <td>{{ usuario.name }}</td>
            <td>{{ usuario.telefono }}</td>
            <td>
            <button type="button" class="btn btn-warning mr-2" data-toggle="modal" data-target="#exampleModal2">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
            </button>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal3">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
              </svg>
            </button>
          </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para crear usuario-->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <form>
                <div class="form-group row">
                  <label for="Usuario" class="col-sm-2 col-form-label"
                    >Usuario:</label
                  >
                  <div class="col-sm-8">
                    <input
                      type="text"
                      placeholder="# de cuenta"
                      class="form-control"
                      v-model="username"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Nombre" class="col-sm-2 col-form-label"
                    >Nombre:</label
                  >
                  <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="name" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Correo" class="col-sm-2 col-form-label"
                    >Telefono:</label
                  >
                  <div class="col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      v-model="telefono"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="createUsuario"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- modal para editar cuenta del trabajador -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Agregar</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>
              <div v-if="currentUsuario">
              <form>
                <div class="form-group row">
                  <label for="Usuario" class="col-sm-2 col-form-label">Nombre:</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="currentUsuario.name"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Nombre" class="col-sm-2 col-form-label">Telefono:</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="currentUsuario.telefono"/>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Correo" class="col-sm-2 col-form-label">Usuario:</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="currentUsuario.username" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Correo" class="col-sm-2 col-form-label">Contraseña:</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Nueva contraseña..." v-model="password" />
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateUsuario">Guardar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para eliminar una cuenta de los trabajadores -->
    <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                  <div v-if="currentUsuario">
                    <h1>Estas segura que quieres elimnar la cuenta de <b>{{currentUsuario.name}}</b> ?</h1>
                  </div>
                <div v-else>
                  <br />
                  <p class="text-white">Selecciona un usuario...</p>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary"  @click="deleteUsuario">Elimar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
//Servicio que nos permitira importar las acciones con el backend
import PrendaDataService from "../services/PrendaDataService";

import swal from "sweetalert";

const token = JSON.parse(localStorage.getItem("user"))["accessToken"]; //Obtienes el token

export default {
  data() {
    return {
      config: {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      },

      //Variables de un usuario
      username: "",
      name: "",
      password: "",
      passwordAll: "123456",
      telefono: "",
      roles: [],

      usuarios: [],
      currentUsuario: null,
      currentIndex: -1,

      search: "",
    };
  },
  methods: {
    retrieveUsuarios() {
      PrendaDataService.getAllUsers(this.config)
        .then((response) => {
          this.usuarios = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    createUsuario() {
      var data = {
        username: this.username,
        password: this.passwordAll,
        name: this.name,
        telefono: this.telefono,
        roles: ["user"],
      };

      console.log(data);

      PrendaDataService.singUp(data)
        .then((response) => {
          console.log(response.data);
          swal({
            title: "Usuario creado correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $("#exampleModal").modal("hide");
          //this.message = 'El pedido se actualizaco correctamente!';
        })
        .catch((e) => {
          swal({
            title: "Error al crear el usuario!!",
            //text: "You clicked the button!",
            icon: "error",
            button: "Continuar",
          });
          console.log(e);
          this.message = e;
        });
    },

    updateUsuario() {
      //console.log(this.currentUser)
      //console.log(this.currentUser.id)
      console.log(this.currentUsuario.password)

      var data = {
        _id: this.currentUsuario._id,
        username: this.currentUsuario.username,
        password: this.password,
        telefono: this.currentUsuario.telefono,
        name: this.currentUsuario.name,
        roles: this.currentUsuario.roles,
      };
      

      PrendaDataService.updateUser(this.currentUsuario._id, data)
        .then((response) => {
          console.log(response.data);
          swal({
            title: "Trabajadora actualizada correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $("#exampleModal2").modal("hide");
        })
        .catch((e) => {
          swal({
            title: "Error al actualizar la contraseña!!",
            //text: "You clicked the button!",
            icon: "error",
            button: "Continuar",
          });
          console.log(e);
        });
    },

    deleteUsuario() {
        PrendaDataService.deleteUsuario(this.currentUsuario._id,this.config)
        .then(response => {
          console.log(response.data);
         swal({
            title: "Usuario/Trabajador eliminado correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $('#exampleModal3').modal('hide');
        })
        .catch(e => {
          console.log(e);
        });
    },

    /*Permite seleccionar un registro de la tabla */
    setActiveUsuario(usuario, index) {
      this.currentUsuario = usuario;
      this.currentIndex = index;
    },
    /* Recarga */
    refreshList() {
      this.retrieveUsuarios();
      this.currentUsuario = null;
      this.currentIndex = -1;
    },
  },
  mounted() {
    this.retrieveUsuarios();
  },
  computed: {
    filteredUsers: function () {
      return this.usuarios.filter((usuario) => {
        return usuario.username.match(this.search);
      });
    },
  },
};
</script>
