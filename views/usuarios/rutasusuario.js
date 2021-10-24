import Express from "express";
import { consultaAllUsuarios, consultarOCrearUsuarioRecienInicioSesion, crearUsuario, editarUsuario, eliminarUsuario } from "../../controllers/usuarios/controllerUsuario.js";

const rutasUsuario = Express.Router();// metodo Router me permite definir rutas, funcion de Expresss, me permite generar rutas
// sin tener que depender de esta forma const app = Express() y app.get('/usuarios', (req, res) => {} .. lo asignamos a una 
// variable y esta la exportamos


const genericCallback = (res) => (err, result) => {
    // estructura de funciones anidadas 2 forma de escribirla
    if (err) {

        res.status(500).json({ error: err });//envia un mensaje como resultado (res = respuesta del servidor al ejecutar
        // el metodo get) si existe un err envia el status (400) de http y un mensaje Error consultando las venta al backend
    } else {

        res.json(result); // res es la respuesta al ejecutar el metodo get entonces si el metodo find funciono y encontro los
        // registros entonces devuelva como respuesta=res al front en formato json el result que son los registros de la 
        // base de datos
    }
    // console.log(result);
}

// ruta para la peticion GET
rutasUsuario.route('/usuarios').get((req, res) => {// el primer argumento es la ruta y el segundo argumento es una funcion que se ejecutq
    // cuando entran en esta ruta (callback), es decir cuando hacen una peticion de tipo get a esta ruta la funcion 
    // se ejecuta.0 absolutamente todas las navegaciones que se hacen en una URL son de tipo get siempre se pide traer 
    // informacion .. la funcion anonima tambien tiene paramentros y dos muy importantes son el 
    // req: es el request quien hace la solicitud o peticion estos nombres son por convencion 
    // res: es la respuesta del servidor a esta peticion, es la respuesta
    // para el cliente, el navegador el frontend estos nombres son por convencion 
    console.log("alguien hizo GET en la ruta /usuarios");   //se imprime en la terminal cuando alguien visita la ruta
    // http://localhost:5000/usuarios

    consultaAllUsuarios(genericCallback(res)); // l
});


// ruta para la peticion POST , el verbo post es el que me identifica el metodo de crear nuevo registro no necesito especificarlo en la ruta
rutasUsuario.route('/usuarios').post((req, res) => {
    console.log("alguien hizo POST en la ruta /usuarios");
    console.log(req.body);
    crearUsuario(req.body, genericCallback(res)); // llamo al controlador de crear venta le paso los datos y tambien el genericCallback(res)
});

// ruta para pedir el usuario recien inicia sesion y verificar si esta en la base de datos si esta lo devuelve si no 
// esta lo crea e igual lo devuelve al frontend super importante esta ruta debe estar antes del las rutas del id dinamico las 
// siguientes porque si no entrara en esas antes que esta usuarios/self

rutasUsuario.route('/usuarios/self').get((req, res) => {// el primer argumento es la ruta y el segundo argumento es una funcion que se ejecutq
    // cuando entran en esta ruta (callback), es decir cuando hacen una peticion de tipo get a esta ruta la funcion 
    // se ejecuta.0 absolutamente todas las navegaciones que se hacen en una URL son de tipo get siempre se pide traer 
    // informacion .. la funcion anonima tambien tiene paramentros y dos muy importantes son el 
    // req: es el request quien hace la solicitud o peticion estos nombres son por convencion 
    // res: es la respuesta del servidor a esta peticion, es la respuesta
    // para el cliente, el navegador el frontend estos nombres son por convencion 
    console.log("alguien hizo GET en la ruta  /usuarios/self   usuario que recien inicio sesion ");   //se imprime en la terminal cuando alguien visita la ruta

    consultarOCrearUsuarioRecienInicioSesion(req,genericCallback(res));// se ejecuta este controlador apenas 
    // hagan una peticion a esta ruta y se le envia como parametro la request completa (req)



});


// ruta para la peticion PATCH: pondremos en este metodo patch: una ruta dinamica y se pone con dos puntos y seguido del nombre
// esto con el proposito de encontrar el registro a modificar por medio de la ruta y no por medio del id del cuerpo de los datos traidos del front 
rutasUsuario.route("/usuarios/:id").patch((req, res) => { // implementamos la ruta para la peticion de actualizar

    console.log("alguien hizo PATCH en la ruta /usuarios");
    editarUsuario(req.params.id, req.body, genericCallback(res)); //se usa req.params.id cuando lo que queremos es acceder 
    // al id del registro desde la ruta y se usa req.body si vamos a obtener el id por medio del cuerpo del registro enviado
    // es decir los datos en si 

});

// ruta para la peticion DELETE
rutasUsuario.route("/usuarios/:id").delete((req, res) => {
    // console.log("elimine")
    console.log("alguien hizo DELETE en la ruta /usuarios");

    eliminarUsuario(req.params.id, genericCallback(res));
});

export default rutasUsuario;// lo exportamos para usarlo en mi server.js con los metodo app.use(rutasUsuario)