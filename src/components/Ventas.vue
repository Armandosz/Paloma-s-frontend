<template>
<div class="container mt-5">
  <div class="table-responsive">
    <table class="table table-hover table-bordered table-striped table-sm text-center bg-white">
      <thead class="thead-dark">
        <tr> 
            <th colspan="3">
              <input type="text" class="form-control" placeholder="Buscar por codigo..." aria-label="Username" aria-describedby="basic-addon1" v-model="search">
            <!--</div>-->
            </th>
            <th colspan="6"></th>
        </tr>
        <tr>
          <th scope="col">Codigo</th>
          <th scope="col">Tipo</th>
          <th scope="col">Precio</th>
          <th scope="col">Caracteristicas</th>
          <th scope="col">Existencia</th>
          <th scope="col">Vendedora</th>
          <th scope="col">Fecha</th>
          <th scope="col">notas</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr   :class="{ active: index == currentIndex }"
              v-for="(prenda, index) in filteredBlog"
              :key="index"
              @click="setActivePrenda(prenda, index)"
        >
          <th scope="row">{{prenda.codigo}}</th>
          <td>{{prenda.tipo}}</td>
          <td>{{prenda.precio}}</td>
          <td width="20%">{{prenda.descripcion}}</td>
          <td v-if="prenda.existencia == 'S'">
             <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8"/>
            </svg>
          </td>
          <td v-else-if="prenda.existencia == 'N'">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="red" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8"/>
            </svg>
          </td>
          <td v-else>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="orange" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8"/>
            </svg>
          </td>
          <td>{{prenda.vendedora}}</td>
          <td>{{prenda.venta_date}}</td>
          <td width="20%">{{prenda.notas}}</td>
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

</div>
</template>

<script>
//Servicio que nos permitira importar las acciones con el backend
import PrendaDataService from "../services/PrendaDataService";

import swal from 'sweetalert';

const token = JSON.parse(localStorage.getItem('user'))['accessToken'] //Obtienes el token

//import $ from 'jquery';

  export default {
    data() {
      return {
      config:{
        headers: {
          "Content-type": "application/json",
          "Authorization": 'Bearer ' + token
        }
      },

        //Variables de una prenda
        codigo: '',
        precio:'',
        tipo:'',
        descripcion: '',
        notas: '',
        existencia: '',
        vendedora:'',

        prendas: [],
        currentPrenda: null,
        currentIndex: -1,

        search: ''
      }
    },
    methods: {
    retrieveInventario() {
      PrendaDataService.getAll(this.config)
        .then(response => {
          this.prendas = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    /* Actualiza solo la contraseña del usuario seleccionado */
    updatePrenda() {
     
      var data = {
        _id: this.currentPrenda._id,
        codigo: this.currentPrenda.codigo,
        tipo: this.currentPrenda.tipo,
        precio: this.currentPrenda.precio,
        descripcion: this.currentPrenda.descripcion,
        notas: this.currentPrenda.notas,
        existencia: this.existencia,
      };

      PrendaDataService.updatePrenda(this.currentPrenda._id, data)
        .then(response => {
          console.log(response.data);
          swal({
            title: "Contraseña actualizada correctamente!!",
            //text: "You clicked the button!",
            icon: "success",
            button: "Entendido",
          });
          // eslint-disable-next-line no-undef
          $('#exampleModal2').modal('hide');
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
     deletePrenda() {
        PrendaDataService.deletePrenda(this.currentPrenda._id,this.config)
        .then(response => {
          console.log(response.data);
         swal({
            title: "Prenda eliminada correctamente!!",
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
    setActivePrenda(prenda, index) {
      this.currentPrenda = prenda;
      this.currentIndex = index;
    },
     /* Recarga */
      refreshList() {
        this.retrieveInventario();
        this.currentPrenda = null;
        this.currentIndex = -1;
      }
    },
     mounted() {
      this.retrieveInventario();
    },
    computed: {
      //Retorna todas las prendas que han sido vendidas
      filteredPrendas() {
      // will return [{status: 'Available'}]
       return this.prendas.filter(prenda => prenda.existencia == 'N' || prenda.existencia == 'P');
      },
      filteredBlog: function(){
        return this.filteredPrendas.filter((prenda) => {
            return prenda.codigo.match(this.search);
        })
      }
    }
  }
</script>
