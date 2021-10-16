//aqui ponemos el cliente de mongo  
import { MongoClient } from "mongodb"; // importamos el gestor de mongoDB para conectarnos a la base de datos como 
// tambien la funcion de ObjectId para obtener el id de un registro y poder hacer el metodo PATCH 
import dotenv from "dotenv"; // variables de entorno 

dotenv.config({ path: './.env' });// configuracion de la libreria dotenv para poder usar la variables de entorno del archivo .env.. le paso un objeto 
// al metodo config de dotenv con la ruta del archivo .env


const stringConexion = process.env.DATABASE_URL; // me permite traer la url (DATABASE_URL) de conexion desde el archivo .env
// y lo asigna a la variables stringConexion 


let conexionBaseDeDatos; // variable global que me tiene la conexion a mongoDB  esta variables es la conexion y usare para poder trabajar
// con la base de datos

const client = new MongoClient(stringConexion, { // instancia de mongo client le damos como argumentos el stringConexion y }
    // un objeto, esta instancia es la que me permite la conexion a la base de datos 
    useNewUrlParser: true,  // dos configuraciones necesarias recomendadas por mongo para trabajar  con
    useUnifiedTopology: true, // la base de datos de mongoDB
});

const conectarBD = (callback) => {

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
        return callback (); // retornare la funcion de entrada como parametro callback a esta funcion de conectarBD
        // y esto me permite ejecutar primero todas las instrucciones de la funcion conectarBD que serian la conexion 
        // a la base de datos y luego despues de conectarse a la base de datos se ejecuta la funcion que entro como 
        // paramentro de callback la idea con esto es que me entre como argumento la funcion de encerder el servidor 
        // como parametro callback y esta se ejecute depues de hacer la conexion a la base de datos
    });

};

// debo exportar la variable que tiene la conexion a la base de datos para poder usarla en mis rutas o en donde la necesite 

const getBD = () => { // funcion que me permite obtener la variable de conexion a la base de datos luego tengo que exportar esta funcion 
    return conexionBaseDeDatos;  // para que sea llamada de otras partes como en la rutas por ejemplo en la petiiones GET, POST, PATCH y DELETE
}


export { conectarBD, getBD }; // exporto mi funcion que me conecta con la base de datos para usarlo en el server 