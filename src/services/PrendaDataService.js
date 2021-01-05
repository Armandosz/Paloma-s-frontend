/* Importa el servicio para obtener el token en cada peticion */
import http from "../http-common";

class PrendaDataService {
  /* Peticion al servidor para obtener todas las prendas */
  getAll(config) {
    return http.get("http://localhost:5000/Ropa/",config);
  }

  /* Peticion al back para obtener todos los trabajadores */
  getAllUsers(config) {
    return http.get("http://localhost:5000/usuarios/",config);
  }

  /* Se utiliza para crear una cuenta de un trabajador */
  singUp(data){
    return http.post("http://localhost:5000/api/auth/signup", data)
  }
  
  /* Se utiliza para actualizar la contraseña de un usuario/trabajador */
  updateUser(id,data) {
    return http.put("http://localhost:5000/usuarios"+`/${id}` ,data);
  }

  /* Se utiliza para eliminar la cuenta de un usuario/trabajador */
  deleteUsuario(id,config) {
    return http.delete("http://localhost:5000/usuarios"+`/${id}`,config);
  }

  /* Peticiones para obtener todos los clientes ********************************/
  getAllClientes(config) {
    return http.get("http://localhost:5000/clientes/",config);
  }

  /* Peticion para actualizar un cliente */
  updateCliente(id,data) {
    return http.put("/clientes"+`/${id}` ,data);
  }

  /* Peticion para agregar una cliente*/
  createCliente(data) {
    return http.post("/clientes/", data);
  }

  /* Peticion para eliminar un cliente */
  deleteCliente(id,config) {
    return http.delete("/clientes"+`/${id}`,config);
  }

  /* Obtiene todos los abonos de un cliente**************************************************************** */
  getAllClientesAbonos(id,config) {
    return http.get("http://localhost:5000/clientes"+`/${id}`,config);
  }

  createAbono(id, data, config) {
    return http.post("http://localhost:5000/clientes"+`/${id}`+"/abonos", data,config);
  }

  updateCuentaCliente(id,data) {
    return http.put("/clientes"+`/${id}` ,data);
  }


  /************************************************************************** */

 /*
  get(id) {
    return http.get(`/${id}`);
  }
  */

  /* Peticion para crear una nueva prenda*/
  create(data) {
    return http.post("/Ropa/", data);
  }

  /* Se utiliza para actualizar una prenda */
  updatePrenda(id,data) {
    return http.put("/Ropa"+`/${id}` ,data);
  }

  deletePrenda(id,config) {
    return http.delete("/Ropa"+`/${id}`,config);
  }
  

  /* Peticion para obtener el token al iniciar sesion
  singIn(user) {
    return http.post("http://localhost:5000/api/auth/signin",user)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
 */

  

  /*
  logout() {
    localStorage.removeItem('user');
  }
  */

  /*
  update(id, data) {
    return http.put(`/${id}`, data);
  }
  */



  /*
  updatePassword(id,data) {
    return http.put(`/${id}` ,data);
  }
  */
  /*
  getGeneralPassword(id) {
    return http.get(`/${id}`);
  }
  */

  /*
  update2(id, data) {
    return http.put(`/${id}`, data);
  }
  */

  /*
  delete(id) {
    return http.delete(`/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }
  */
}

export default new PrendaDataService();
