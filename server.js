// const express = require("express"); // de esta  forma se importa la libreria express para usarla se la asigno 
// a una variable con el metodo require.. es la forma tradicional 
import Express from "express";// segunda forma de importar Express cuando ya lo habilite en el packege.json con 
// type:module... esta es la nueva forma para node es igual como se hace en React .. esta forma es permitida 
// gracias a babel 
// importamos el paquete cors para permitir compartir recursos con origenes diferentes
// const cors= require('cors'); // forma tradicional de importar un package ya no lo puedo importar asi de esta forma 
// por que le cambie la forma de importar package
import Cors from "cors";
import { conectarBD} from "./db/db.js"; // importo la funcion para la conexion a la base de datos mongoDB
import dotenv from "dotenv"; // variables de entorno 
import rutasVenta from "./views/ventas/rutasventa.js";
import rutasProducto from "./views/productos/rutasproducto.js";
import rutasUsuario from "./views/usuarios/rutasusuario.js";
import jwt from 'express-jwt';
import jwks from 'jwks-rsa'; 
import autorizacionEstadoUsuario from "./middleware/autorizacionEstadoUsuario.js";


dotenv.config({path:'./.env'} );// configuracion de la libreria dotenv para poder usar la variables de entorno del archivo .env.. le paso un objeto 
// al metodo config de dotenv con la ruta del archivo .env

const port = process.env.PORT || 5000 ; // buena practica tener el puerto asi, si no encuentra la variable de entorno entonces le pone 5000


// declaramos una variable que sera nuestra aplicacion nuestro servidor... app este nombre es por convencion 
// esta variable le agregamos todo lo que se necesite las rutas los metodos 
const app = Express();
app.use(Express.json()) // cuando llega una solicitud primero se ejecuta esta funcion use y me permite trabajar con formato json en mis peticiones, nos habilita para 
// cuando nos llega una solicitud y peticion de tipo json en un request del frontend, el Express.json() la funcion .json()
//  convierte el cuerpo body de esa peticion o request del front en  un objeto que se puede usar en nuestro backend
app.use(Cors()); // asi uso el package cors y permite usarlo 
// aqui le agregamos funcionalidad:  las rutas




//funcionalidad de autenticacion con token jwt me protege las rutas ( middleware jwtCkeck  )
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://auth0-web-trading-project.us.auth0.com/.well-known/jwks.json'// end point ruta desde Auth0 donde 
        // se verifica si el token es valido o no  
  }),
  audience: 'api/autenticacion/web/trading/project',// identificacion y nombre de la api de Auth0 esta se la entregamos al 
//   front igual 
  issuer: 'https://auth0-web-trading-project.us.auth0.com/',
  algorithms: ['RS256']
});


app.use(jwtCheck); // me permite usar e implementar el middleware jwtCkeck  se encarga de cominicarce con auth 
// le envia el token que recibio del front por medio de axios como request y Auth recibe este token lo compara con el qu e
// envio al front en un principio cuando el front se lo pidio y si son iguales lo valida y le dice al backend el token 
// es valido puede continuar con la solicitud es seguro todo lo esto lo hace este middleware jwtCkeck y con app.use le digo 
// a nodemon.js use este middlewarey ejecutelo , mejor dicho checkea si el token jwt es valido o no 

app.use(autorizacionEstadoUsuario);


app.use(rutasVenta);
app.use(rutasProducto);
app.use(rutasUsuario);
// necesitamos antes de prender el servidor con listen .. conectarnos a la base de datos por esto definimos una funcion 
// main que nos permita hacer esto, este main se ejecutara todo el tiempo y primero se conecta a la base de datos y
// luego ejecuta y prende el servidor con listen 
// main es la funcion para conectarme a la base de datos y permitir la comunicacion y transferencia de datos 
const main = () => { // esta funcion se ejecutara primero y me permite hacer la conexion primero a la base de datos
    // y ya luego si prender el servidor al retornar el metodo listen
    // aqui hacemos la conexion a la base de datos 
    return app.listen(port, () => {//por dentro de este metodo listen tiene un while true para estar ejecutandoce siempre 
        //  me permite prender y correr el servidor se queda todo el tiempo en ejecucion y escuchando solicitudes 
        // en el puerto especifico en este servidor donde estara desplegado el puerto se pone como argumento 
        // en los parentesis del metodo listen() por convencion es el puerto 5000 o 5050 la idea es que sea unico 
        // el segundo argumento es una funcion que se ejecuta cuando la app comienza a funcionar cuando se inicia 
        // a escuchar el puerto 

        console.log( `escuchando puerto ${port}`) // uso de variable de entorno con process.env.POR 
    });
};
conectarBD(main);//llamamos la funcion de conectar a la base de datos y le pasamos como parametro la funcion main 
// y esta funcion main se ejecutara como callback despues de que se ejecute las intrucciones de la funcion conectarBD
// se ejecutara main 
