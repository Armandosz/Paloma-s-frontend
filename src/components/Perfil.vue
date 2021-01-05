<template>
<div class="container">
    <div class="tabShow">
        <h1>Perfil</h1>
        <h2>Nombre</h2>
        <input type="text" class="input" v-model="currentUser.name">
        <h2>Telefono</h2>
        <input type="text" class="input" v-model="currentUser.telefono">
        <h2>Password</h2>
        <input class="input" :type="passwordFieldType" v-model="password" value="12345">
        <svg @click="switchVisibility" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
            <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </svg>
        <button class="btn" @click.prevent="updateUsuario">Guardar</button>
    </div>
</div>
</template>

<script>
import PrendaDataService from "../services/PrendaDataService";

import swal from 'sweetalert';


  export default {
    data() {
        return {
            password: '',
            passwordFieldType: 'password',

            //Variables del usuario actual
            username: '',
            name:'',
            telefono:'',
            roles:[],
        }
    },
    methods: {
        switchVisibility(){
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
        },
        updateUsuario() {
            //console.log(this.currentUser)
            //console.log(this.currentUser.id)
            
            var data = {
                _id: this.currentUser._id,
                username: this.currentUser.username,
                password: this.password,
                telefono: this.currentUser.telefono,
                name: this.currentUser.name,
                roles: this.currentUser.roles,
            };

            PrendaDataService.updateUser(this.currentUser.id, data)
                .then(response => {
                console.log(response.data);
                swal({
                    title: "Contraseña actualizada correctamente!!",
                    //text: "You clicked the button!",
                    icon: "success",
                    button: "Entendido",
                });
                // eslint-disable-next-line no-undef
                $('#exampleModal').modal('hide');
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
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    }
  };
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Nunito:400,900|Montserrat|Roboto);

.container {
    background: white;
    width:450px;
    height: 400px;
    margin:0 auto;
    position: relative;
    margin-top:3%;
    box-shadow: 2px 5px 20px rgba(119, 119, 119, .5);
}

.tabShow{
    transition: all .5s ease-in;
    width: 80%;
}

h1{
    font-family: "Montserrat", sans-serif;
    color: #7ed386;
    font-size: 2rem;
    padding-top: 20px;
    margin-top: 40px;
    margin-bottom: 35px;
}
h2{
    color: #777;
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    margin-left: 2px;
    margin-top: 15px;
}

.input, p {
    border: 0;
    border-bottom: 1px solid #3fb6a8;
    width: 80%;
    font-family: "montserrat" ,sans-serif;
    font-size: .8em;
    padding: 5px 0;
    color: #070707;
    outline: none;
}
span{
    font-size: .7em;
    color: #777;
}
.btn {
    font-family: "roboto", sans-serif;
    text-transform: uppercase;
    font-size: 15px;
    border: 0;
    color: #fff;
    background: #7ed386;
    padding: 7px 15px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .2);
    cursor: pointer;
    margin-top: 15px;
}


</style>