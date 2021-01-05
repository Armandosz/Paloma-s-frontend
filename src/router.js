import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const  router = new Router({
  mode: "history",
  routes: [
    {
      path: "*", 
      redirect: "/"
    },
    //{
     // path: "/helloWorld",
      //name: "helloWorld",
      //component: () => import("./components/HelloWorld"),
    //},
    {
      path: "/",
      name: "sesion",
      component: () => import("./components/IniciarSesion")
    },
    {
        path: "/inicio",
        name: "inicio",
        component: () => import("./components/Inicio")
    },
    {
      path: "/pruebas",
      name: "pruebas",
      component: () => import("./components/Pruebas")
    },
    {
      path: "/ventas",
      name: "ventas",
      component: () =>import("./components/Ventas")
    },
    {
      path: "/apartado",
      name: "apartado",
      component: () =>import("./components/Apartado")
    },
    {
      path: "/trabajadoras",
      name: "trabajadoras",
      component: () =>import("./components/Trabajadoras")
    },
    /* User menu */
    {
      path: "/ventas-usuario",
      name: "ventas-usuario",
      component: () =>import("./components/Ventas-usuario")
    },
    {
      path: "/apartado-usuario",
      name: "apartado-usuario",
      component: () =>import("./components/Apartado-usuarios")
    },
    {
      path: "/perfil",
      name: "perfil",
      component: () =>import("./components/Perfil")
    }
  ]
});

export default router;
