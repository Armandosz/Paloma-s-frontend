<template>
<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card mt-5">
			<div class="card-header text-center">
				<h1>The Closet</h1>
			<!--	<div class="d-flex justify-content-end social_icon">
					<span><i class="fab fa-facebook-square"></i></span>
					<span><i class="fab fa-google-plus-square"></i></span>
					<span><i class="fab fa-twitter-square"></i></span>
				</div> -->
			</div>
			<div class="card-body">
        <h3 class="text-white text-center">Iniciar Sesión</h3>
				<form @submit.prevent="handleLogin">
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input v-model="user.username" type="text" class="form-control" placeholder="usuario">
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input v-model="user.password" type="password" class="form-control" placeholder="contraseña">
					</div>
					<!--<div class="row align-items-center remember">
						<input type="checkbox">Remember Me
					</div> -->
					<div class="form-group">
						<input type="submit" value="Entrar" class="btn float-right login_btn">
					</div>
				</form>
			</div>
      <!--
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Si aun no tienes tu cuenta, solicitala a tu encargada.
				</div>
				<div class="d-flex justify-content-center">
					<a href="#">Forgot your password?</a> 
				</div>
			</div> -->
		</div>
	</div>
</div>
</template>

<script>
import User from '../models/user'; /* Se importa el modelo para iniciar sesion */
import swal from 'sweetalert';

export default {
  name: 'SingIn',
  data() {
    return {
      user: new User('', '')
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    /* Validas si el usuario esta logeado o no */
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    /* Si el usuario esta logeado lo redireccionara al perfil */
    if (this.loggedIn) {
      this.$router.push('/inicio');
    }
  },
  methods: {
    handleLogin() {
        if (this.user.username && this.user.password) {
          //console.log(this.user.token);
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              swal({
                  title: "Nos Alegra tenerte aqui!!",
                  text: "Bienvenido al Inventario "+ this.user.username+".",
                  icon: "success",
                  button: "Entendido",
              })
              if(this.currentUser.roles.includes('ROLE_ADMIN')) {
                  this.$router.push('/inicio')
              } else {
                this.$router.push('/ventas-usuario');
              }
              
            },
            error => {
              //swal("Good job!", "Usuario/contraseña incorrecto!", "error");
              swal({
                  title: "Usuario/contraseña incorrectos!!",
                  //text: "You clicked the button!",
                  icon: "error",
                  button: "Entendido",
              });

              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }

    }
  }
};
</script>


<style> 
@import url('https://fonts.googleapis.com/css?family=Numans');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

.container{
height: 100%;
align-content: center;
}

.card{
height: 350px;
margin-top: auto;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}

h1{
  font-family: 'Dancing Script', cursive;
  font-size: 60px;
  color: pink;
}
</style>