// const express = require("express"); // de esta  forma se importa la libreria express para usarla se la asigno 
// a una variable con el metodo require.. es la forma tradicional 

import Express from "express";// segunda forma de importar Express cuando ya lo habilite en el packege.json con 
// type:module... esta es la nueva forma para node es igual como se hace en React .. esta forma es permitida 
// gracias a babel 
import { MongoClient, ObjectId } from "mongodb"; // importamos el gestor de mongoDB para conectarnos a la base de datos como 
// tambien la funcion de ObjectId para obtener el id de un registro y poder hacer el metodo PATCH 

// importamos el paquete cors para permitir compartir recursos con origenes diferentes
// const cors= require('cors'); // forma tradicional de importar un package ya no lo puedo importar asi de esta forma 
// por que le cambie la forma de importar package
import Cors from "cors";


import dotenv from "dotenv"; // variables de entorno 

dotenv.config({path:'./.env'} );// configuracion de la libreria dotenv para poder usar la variables de entorno del archivo .env.. le paso un objeto 
// al metodo config de dotenv con la ruta del archivo .env

const stringConexion= process.env.DATABASE_URL; // me permite traer la url (DATABASE_URL) de conexion desde el archivo .env
// y lo asigna a la variables stringConexion 

//BDmongo +  usuariodeConexion y contraseña+ la direccion de url de conexion a la base de datos.. me representa mis credenciales 
// para acceder a la base de datos 
// ojo debemos no subir esta contraseña al repositorio e github 
const client = new MongoClient(stringConexion, { // instancia de mongo client le damos como argumentos el stringConexion y }
    // un objet, esta instancia es la que me permite lq conexion a la base de datos 
    useNewUrlParser: true,  // dos configuraciones necesarias recomendadas por mongo para trabajar  
    useUnifiedTopology: true,
});

let conexionBaseDeDatos; // variable global que me tiene la conexion a mongoDB  esta variables es la conexion y usare para poder trabajar
// con la base de datos


// declaramos una variable que sera nuestra aplicacion nuestro servidor... app este nombre es por convencion 
// esta variable le agregamos todo lo que se necesite las rutas los metodos 
const app = Express();


app.use(Express.json()) // cuando llega una solicitud primero se ejecuta esta funcion use y me permite trabajar con formato json en mis peticiones, nos habilita para 
// cuando nos llega una solicitud y peticion de tipo json en un request del frontend, el Express.json() la funcion .json()
//  convierte el cuerpo body de esa peticion o request del front en  un objeto que se puede usar en nuestro backend
app.use(Cors()); // asi uso el package cors y permite usarlo 



// aqui le agregamos funcionalidad:  las rutas




// ruta para la peticion GET
app.get('/ventas', (req, res) => {// el primer argumento es la ruta y el segundo argumento es una funcion que se ejecutq
    // cuando entran en esta ruta (colvar), es decir cuando hacen una peticion de tipo get a esta ruta la funcion 
    // se ejecuta.0 absolutamente todas las navegaciones que se hacen en una URL son de tipo get siempre se pide traer 
    // informacion .. la funcion anonima tambien tiene paramentros y dos muy importantes son el 
    // req: es el request quien hace la solicitud o peticion estos nombres son por convencion 
    // res: es la respuesta del servidor a esta peticion, es la respuesta
    // para el cliente, el navegador el frontend estos nombres son por convencion 
    console.log("alguien hizo get en la ruta /ventas");   //se imprime en la terminal cuando alguien visita la ruta
    // http://localhost:5000/ventas

    conexionBaseDeDatos.collection('venta').find({}).limit(50).toArray((errorDelMetodoFind, resultadoDelMetodoFind) => { //funcion de la libreria mongodb del driver para la conexionBaseDeDatos (mongoclient) para encontrar
        // un registro o hacer cualquier operacion de busqueda en la base de datos siempre y cuando se lo programemos en sus parametros 
        // dentro de los parentesis de la funcion find() puedo colocar los parametros de busqueda si no necesito hacer busqueda especifica desde la base 
        // de datos si no solo traer todos los registros le paso un objeto vacio {} , luego coloco el metodo si quiero de limit() que me 
        // limita la cantidad de query .. de registros que devuelve  .. luego convierto toda la informacion en un arreglo de formato json para
        // poder enviarlo al frontend y luego tiene como parametro una funcion que se ejecuta cuando termina la opercion del metodo find y me entrega 
        // dos parametros un error de este proceso si existe o el resultado del proceso find 
        // dentro del metodo find puedo colocar todos los filtros que quiera para tal consulta GET
        //limit esta funcion es opcional y me permite segun el numero dentro del parentesis, el parametro .. me trae los primeros 50 registros 
        // si hay mas de 50 en la base de datos para cada peticion get
        if (errorDelMetodoFind) {

            res.status(400).send("Error consultando las ventas");//envia un mensaje como resultado (res = respuesta del servidor al ejecutar
            // el metodo get) si existe un errorDelMetodoFind envia el status (400) de http y un mensaje Error consultando las venta al backend
        } else {

            res.json(resultadoDelMetodoFind); // res es la respuesta al ejecutar el metodo get entonces si el metodo find funciono y encontro los
            // registros entonces devuelva como respuesta=res al front en formato json el resultadoDelMetodoFind que son los registros de la 
            // base de datos
        }
        console.log(resultadoDelMetodoFind);
    });
    // const ventas = [  // simulacion de datos de la base de datos de mongoDB solo para pruebas
    //     // despues esto se cambia por una instruccion de consulta a la base de datos 
    //     {
    //         codigoVenta: '123',
    //         fecha: '14/10/2021',
    //         codigoProducto: '254',
    //         cantidadProducto: '2',
    //         nombreVendedor: 'Jhon ',
    //         nombreCliente: 'Stefania',
    //         precioUnitario: '10000',
    //         valorTotal: '20000'
    //     },
    //     {
    //         codigoVenta: '254',
    //         fecha: '14/10/2021',
    //         codigoProducto: '254',
    //         cantidadProducto: '2',
    //         nombreVendedor: 'Jhon ',
    //         nombreCliente: 'Stefania',
    //         precioUnitario: '10000',
    //         valorTotal: '20000'
    //     },
    //     {
    //         codigoVenta: '123',
    //         fecha: '14/10/2021',
    //         codigoProducto: '254',
    //         cantidadProducto: '2',
    //         nombreVendedor: 'Jhon ',
    //         nombreCliente: 'Stefania',
    //         precioUnitario: '10000',
    //         valorTotal: '20000'
    //     }
    // ]

    // res.send(ventas); // con el nombre del parametro de respuesta y el metodn 
    // send le envio lo que quiera y necesite el navegador cliente el front dentro de los parentesis esta 
    // la respuesta se puede devolver html tambien dentro de la respuesta 

});


// ruta para la peticion POST
app.post("/ventas/nueva", (req, res) => {

    // console.log(req); // req trae toda la trama de la data de la comuniciacion entre el front y el back con req.body 
    //estraemos la informacion de los datos como tal enviados 

    const datosVentas = req.body;

    // console.log('llaves de los datos: ', Object.keys(datosVentas));// con la funcion Object.keys(datosVentas) estrae de los datos 
    // del json enviado por el front las llaves de estos datos 
    // express esta diseñado para trabajar con formato json pero se debe usar primero 
    // los metodos y utilidades .use para recibir json

    try {

        if (Object.keys(datosVentas).includes('codigoVenta') &&
            Object.keys(datosVentas).includes('fecha') &&
            Object.keys(datosVentas).includes('codigoProducto') &&
            Object.keys(datosVentas).includes('cantidadProducto') &&
            Object.keys(datosVentas).includes('nombreVendedor') &&
            Object.keys(datosVentas).includes('nombreCliente') &&
            Object.keys(datosVentas).includes('precioUnitario') &&
            Object.keys(datosVentas).includes('valorTotal')

        ) {

            // aqui implementaremos el codigo para crear venta en la base de datos de mongoDB
            conexionBaseDeDatos.collection('venta').insertOne(datosVentas, (errorCrearRegistro, resultadoCrearRegistro) => { // usamos funciones de mongo para escribir y guardar en una
                // colecion documento creado con conexionBaseDeDatos.collection("venta"), venta es mi colecion y en ella guardo los datos traidos del front, el 
                // registro de una venta con el metodo inserOne, el segundo parametro de es una funcion que se ejecuta cuando la insercion es decir
                // el proceso de guardar el registro en la base de datos termine esta funcion tiene dos parametros uno es un error y esto es para mostrar
                // un mensaje de error si la operacion inserOne no fue satisfactoria y resul me trae el resultado creo 
                if (errorCrearRegistro) {

                    console.error(errorCrearRegistro);
                    res.sendStatus(500);

                } else {
                    console.log(res);
                    console.log(resultadoCrearRegistro);
                    res.sendStatus(200); // estado de peticion http de todo bien todo bien  (estados de las peticiones HTTP sirven
                    // para tener un buen control de manejo de error )
                }

            });// este es mi documento en la base de datos dentro de mi collecion
            //  (documentosenBaseDatos)--> conexionBaseDeDatos = db.db('documentosenBaseDatos') donde guardare mis datos de las
            // ventas es decir representa el modelo o entidad ventas, y le insertare los datos a ese documento con 
            // el metodo insertOne, el primer parametro es mi registro de una venta y el  segundo parametro es una funcion que tiene 
            // dos parametros err= error si sucede un error , y result = aun nose que es pero es el resultado de esta operacion insert 

            // res.sendStatus(200);//esta linea me presenta error si la meto (Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)  
            // estado de peticion http de todo bien todo bien  (estados de las peticiones HTTP sirven
            // para tener un buen control de manejo de error )

        } else {

            res.sendStatus(500);
        }
    }
    catch {

        res.sendStatus(500);// estado de peticion http de falla
    }
    // console.log("venta a crear", req.body);// con req.body accedo a la informacion enviada por el front ya convertida
    // res.send("ok venta creada con exito");
    // en un objeto con la funcion Express.json().. body es el cuerpo toda la informacion enviada desde el front 
    // body es una palabra reservada.. req.body es mi la informacion enviada desde el frontend
    // el parametro req es la peticion del cliente el frontend es el request==req

    // console.log("esto es una peticion a de tipo POST a la ruta ") // no saldra nada por que siempre las peticiones de navegcaion 
    // a las url son de tipo GET, las solicitudes que se hacen atraves de un navegador son siempre de tipo GET para 
    // probar las peticiones de los otros tipos diferentes a las get se necesita de las herramientas tecnologicas como 
    // postman e  insomnia me ayudaran a probar estas peticiones que no son get

});

app.patch("/ventas/editar", (req, res) => { // implementamos la ruta para la peticion de actualizar

    const edicion = req.body;// almaceno el cuerpo el objeto json, en formato json de mis datos 
    console.log(edicion);
    const filtroIdAActualizar = { _id: new ObjectId(edicion.id) } //hace el filtro sobre el id a buscar y asi encontrar el registro 
    // para aplicarle las modificaciones, este es el primer parametro que necesita el metodo .findOneAndUpdate( ) son tres 
    // los parametros que necesita para buscar el registro luego poder modificarlo 
    delete edicion.id; // debo eliminar el id del cuerpo de los datos del json porque si no me crea y duplica este
    // id en el registro que estoy modificando y me lo crea en la ultima linen del registro esto se hace cuando estoy 
    // editando por medio de obtener el id del regristro si fuera edicion por rutas URL no necesito esto 
    const operacionAtomica = { // instruccion atomic operators, me configura a la base de datos para editar 
        $set: edicion // le mando todo el cuerpo del registro a editar 
    };
    conexionBaseDeDatos
        .collection("venta") // en que coleccion voy hacer la operacion de actualizar
        .findOneAndUpdate(filtroIdAActualizar, operacionAtomica, { upsert: true, returnOriginal: true },
            (errorOperacionPATCH, resultaOperacionPATCH) => {
                if (errorOperacionPATCH) {
                    console.error("Error actualizando la venta", errorOperacionPATCH);
                    res.sendStatus(500);
                } else {
                    console.log('Actualizado con exito');
                    res.sendStatus(200);
                }

            }) // .findOneAndUpdate --> esta funcion recibe tres parametros uno es 
    // el filtro para el saber cual es el registro a modificar el segundo parametro es que se va a modificar y en este cso 
    // queremos poder modifcar cualquier campo del registro por eso se pasa todo el cuerpo de la request que es todo 
    // el objeto en formato json de los datos del formulario con los cambios hechos, el tercer parametro son opciones 
    // como el upsert = me permite hacer algo cuando no encuentra el id y Crea un nuevo documento si ningún documento coincide con el filter. 
    // returnOriginal= me retorna el dato original para poder comparar y bueno hay mas opciones para configurar y depende 
    // del caso de uso
    // y por ultimo parametro el colbart la funcion que se ejecuta cuando la operacion PATCH fue realizada

});

app.delete("/ventas/eliminar", (req, res) => {
    const cuerpoRegistroAEliminar = req.body;//  guardo el cuerpo de la informacion es decir el json donde esta todos los datos 
    // de los campos del registro de la venta a eliminar 
    const filtroIdAEliminar = { _id: new ObjectId(cuerpoRegistroAEliminar.id) } //hace el filtro sobre el id a buscar y asi encontrar el registro 
    // para poder eliminarlo , este es el primer parametro que necesita el metodo .findOneAndUpdate( ) son tres 
    // los parametros que necesita para buscar el registro luego poder modificarlo 

    conexionBaseDeDatos.collection('venta').deleteOne(filtroIdAEliminar, (errMetodoEliminar, resultMetodoEliminar) => {

        console.log(resultMetodoEliminar);
        if (errMetodoEliminar) {

            console.error(errMetodoEliminar);
            res.sendStatus(500); // res es la respuesta del servidor enviada al cliente frontend cuando se ejecuta este metodo 
            // delete
        } else {

            res.sendStatus(200);
        }

    });
}); 
// necesitamos antes de prender el servidor con listen .. conectarnos a la base de datos por esto definimos una funcion 
// main que nos permita hacer esto, este main se ejecutara todo el tiempo y primero se conecta a la base de datos y
// luego ejecuta y prende el servidor con listen 
// main es la funcion para conectarme a la base de datos y permitir la comunicacion y transferencia de datos 

const main = () => { // esta funcion se ejecutara primero y me permite hacer la conexion primero a la base de datos
    // y ya luego si prender el servidor al retornar el metodo listen

    // aqui hacemos la conexion a la base de datos 
    client.connect((err, db) => { // metodo de MongoClient connect me permite conectarme a la base de datos
        //  y tiene dos parametros err= error de conexion si sale 
        // un error y db = mi base de datos mongo que estoy trabajando en el proyecto . db = es la coleccion de coleccion de mi base de datos es la 
        // base de datos en si, cada coleccion es una entidad (venta, usuario , prpducto)
        if (err) {
            console.error("Error conectando a la base de datos ")
            // return false; 
        }
        // la siguiente variable es la conexionBaseDeDatos a la base de datos y necesito acceder a ellas desde todas las partes donde 
        // necesite trabajar con mi base de datos 
        conexionBaseDeDatos = db.db('WebTradingProjectBD') //esta variable debo hacerla global para acceder a ella desde otras 
        // partes.. el metodo db, me conecta a la coleccion en mi base de datos .. conexionBaseDeDatos = db.db('documentosenBaseDatos') me crea la 
        // coleccion de documentos, colecion de coleciones, cada documento es una colecion de registros de objetos cada colecion me representa
        // una entidad que guardare instacias de esta entidad.. entonces esta en otras palabras es la base de datos. con la funcion db('baseDeDatos')
        // creo la base de datos en mongo
        // si funciona la conexionBaseDeDatos = db.db retorno  el encendido al servidor

        // console.log("conexion exitosa a la base de datos", conexionBaseDeDatos)
        console.log("conexion exitosa a la base de datos")
        // lo primero que se le agrega o habilita es prender el servidor es ponerlo a escuchar, se prenda y comience 
        //a escuchar las peticiones que llegaran a un puerto especifico
        return app.listen(5000, () => {//por dentro de este metodo listen tiene un while true para estar ejecutandoce siempre 
            //  me permite prender y correr el servidor se queda todo el tiempo en ejecucion y escuchando solicitudes 
            // en el puerto especifico en este servidor donde estara desplegado el puerto se pone como argumento 
            // en los parentesis del metodo listen() por convencion es el puerto 5000 o 5050 la idea es que sea unico 
            // el segundo argumento es una funcion que se ejecuta cuando la app comienza a funcionar cuando se inicia 
            // a escuchar el puerto 

            console.log("escuchando puerto 5000")
        });
    })

};

main(); //llamado a la funcion main para que se ejecute 


