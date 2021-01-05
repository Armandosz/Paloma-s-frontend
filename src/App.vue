<template>
    <div id="app">
      <div v-if="currentUser">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">The Closet</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item v-if="showAdminBoard" href="/inicio">Inicio</b-nav-item>
              <b-nav-item v-if="showAdminBoard" href="/ventas">Ventas</b-nav-item>
              <b-nav-item v-if="showAdminBoard" href="/apartado">Apartado</b-nav-item>
              <b-nav-item v-if="showAdminBoard" href="/trabajadoras">Trabajadoras</b-nav-item>

              <b-nav-item  v-if="showUserBoard" href="/ventas-usuario">Ventas</b-nav-item>
              <b-nav-item  v-if="showUserBoard" href="/apartado-usuario">Apartado</b-nav-item>

              <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <!-- <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form> -->

              <!-- <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
              </b-nav-item-dropdown> -->

              <b-nav-item right href="/perfil">Perfil</b-nav-item>
              
              <b-nav-item right @click.prevent="logOut">Salir</b-nav-item>
              <!--
              <b-nav-item-dropdown right>
                 Using 'button-content' slot
                <template v-slot:button-content>
                  <em @click.prevent="logOut">User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
              -->
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
     
     <div class="container">
      <router-view />
     </div>
  </div>
</template>

<script>

//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  computed: {
    /* Verifica si el usuario esta logeado o no */
    currentUser() {
      return this.$store.state.auth.user;
    },
    /* Muestra el menu para el administrador */
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        //console.log(this.currentUser.roles.includes('ROLE_ADMIN'))
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    },
    /* Muestra el menu para el usuario */
    showUserBoard() {
      if (this.currentUser && this.currentUser.roles) {
        //console.log(this.currentUser.roles.includes('ROLE_USER'))
        return this.currentUser.roles.includes('ROLE_USER');
      }
      return false;
    }
  },
  methods: {
    /* Cerrar Sesion */
    logOut() {
      /* store.dispatch permite realizar una accion, en este caso utilizamos la accion logout de ../services/auth.service.js */
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
  }
}
</script>

<style>
/*#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}  */
html,body {
  background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
}
</style>
