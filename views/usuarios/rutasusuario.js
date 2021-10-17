import Express from "express";
import { consultaAllUsuarios, crearUsuario, editarUsuario, eliminarUsuario } from "../../controllers/usuarios/controllerUsuario.js";


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
    // cuando entran en esta ruta (colvar), es decir cuando hacen una peticion de tipo get a esta ruta la funcion 
    // se ejecuta.0 absolutamente todas las navegaciones que se hacen en una URL son de tipo get siempre se pide traer 
    // informacion .. la funcion anonima tambien tiene paramentros y dos muy importantes son el 
    // req: es el request quien hace la solicitud o peticion estos nombres son por convencion 
    // res: es la respuesta del servidor a esta peticion, es la respuesta
    // para el cliente, el navegador el frontend estos nombres son por convencion 
    console.log("alguien hizo get en la ruta /usuarios");   //se imprime en la terminal cuando alguien visita la ruta
    // http://localhost:5000/usuarios

    consultaAllUsuarios(genericCallback(res)); // llamo al controlador de usuarios que me ejecuta el metodo find
    // donde busca todos los datos de la base de datos y los trae convertidos en un arreglo en formato json  luego de 
    // encontrar los datos ejecutara el callback (el parametro funcion respuestaGETDelMetodoFind) de entrada
    // y se ejecuta el if de respuest donde se retorna el resultado si no se encontro datos o existe un error en 
    // el metodo find devuele un estado http 400 y si todo esta bien devuelve los datos en formato 
    // json al front con la funcion ( res.json(result); )

    // res.send(usuarios); // con el nombre del parametro de respuesta y el metodo 
    // send le envio lo que quiera y necesite el navegador cliente el front dentro de los parentesis esta 
    // la respuesta, se puede devolver html tambien dentro de la respuesta 

});


// ruta para la peticion POST , el verbo post es el que me identifica el metodo de crear nuevo registro no necesito especificarlo en la ruta
rutasUsuario.route('/usuarios').post((req, res) => {

    crearUsuario(req.body, genericCallback(res)); // llamo al controlador de crear venta le paso los datos y tambien el genericCallback(res)
});

// ruta para la peticion PATCH: pondremos en este metodo patch: una ruta dinamica y se pone con dos puntos y seguido del nombre
// esto con el proposito de encontrar el registro a modificar por medio de la ruta y no por medio del id del cuerpo de los datos traidos del front 
rutasUsuario.route("/usuarios/:id").patch((req, res) => { // implementamos la ruta para la peticion de actualizar

    editarUsuario(req.params.id, req.body, genericCallback(res)); //se usa req.params.id cuando lo que queremos es acceder 
    // al id del registro desde la ruta y se usa req.body si vamos a obtener el id por medio del cuerpo del registro enviado
    // es decir los datos en si 

});

// ruta para la peticion DELETE
rutasUsuario.route("/usuarios/:id").delete((req, res) => {
    // console.log("elimine")
    eliminarUsuario(req.params.id, genericCallback(res));
});

export default rutasUsuario;// lo exportamos para usarlo en mi server.js con los metodo app.use(rutasUsuario)