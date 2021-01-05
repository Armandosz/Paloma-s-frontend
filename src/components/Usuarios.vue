<template>
<div class="container">
  <div class="table-responsive">
    <table class="table table-hover table-bordered table-striped table-sm">
      <thead class="thead-dark">
        <tr> 
          <th colspan="2">
           <!-- <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="search"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                </svg></span>
              </div> -->
              <input type="text" class="form-control" placeholder="Buscar por codigo..." aria-label="Username" aria-describedby="basic-addon1">
            <!--</div>-->
            </th>
            <th colspan="2"></th>
            <th>
              <button type="button" class="btn btn-success">Nuevo Usuario</button>
            </th>
        </tr>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Tipo</th>
          <th scope="col">Existencia</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
//import $ from 'jquery';

  export default {
    data() {
      return {
        checked: false,
        sortBy: 'age',
        sortDesc: false,
      }
    }
  }
</script>