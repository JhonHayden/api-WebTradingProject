// condigo del controlador del modulo usuarios
import { getBD } from "../../db/db.js"; // importo la funcion para la conexion a la base de datos mongoDB
import { ObjectId } from "mongodb"; // importamos la funcion de ObjectId para obtener el id de un registro y poder hacer el metodo PATCH 
import jwt_decode from "jwt-decode"; // libreria para decodificar token y extraer informacion 
import { response } from "express";
const consultaAllUsuarios = async (callback) => {// 

    await getBD().collection('usuario').find({}).limit(50).toArray(callback); //funcion de la libreria mongodb del driver para la getBD() (mongoclient) para encontrar
    // un registro o hacer cualquier operacion de busqueda en la base de datos siempre y cuando se lo programemos en sus parametros 
    // dentro de los parentesis de la funcion find() puedo colocar los parametros de busqueda si no necesito hacer busqueda especifica desde la base 
    // de datos si no solo traer todos los registros le paso un objeto vacio {} , luego coloco el metodo si quiero de limit() que me 
    // limita la cantidad de query .. de registros que devuelve  .. luego convierto toda la informacion en un arreglo de formato json para
    // poder enviarlo al frontend y luego tiene como parametro una funcion que se ejecuta cuando termina la opercion del metodo find y me entrega 
    // dos parametros un error de este proceso si existe o el resultado del proceso find 
    // dentro del metodo find puedo colocar todos los filtros que quiera para tal consulta GET
    //limit esta funcion es opcional y me permite segun el numero dentro del parentesis, el parametro .. me trae los primeros 50 registros 
    // si hay mas de 50 en la base de datos para cada peticion get

};

const crearUsuario = async (datosNuevoUsuario, callback) => { // se pone async para poder poner await y esperar respuesta de la base de datos 
    // console.log(req); // req trae toda la trama de la data de la comuniciacion entre el front y el back con req.body 
    //estraemos la informacion de los datos como tal enviados 

    // const datosUsuarios = req.body;

    // console.log('llaves de los datos: ', Object.keys(datosUsuarios));// con la funcion Object.keys(datosUsuarios) estrae de los datos 
    // del json enviado por el front las llaves de estos datos 
    // express esta diseñado para trabajar con formato json pero se debe usar primero 
    // los metodos y utilidades .use para recibir json


    // if (Object.keys(datosNuevoUsuario).includes('nombre') &&
    //     Object.keys(datosNuevoUsuario).includes('apellido') &&
    //     Object.keys(datosNuevoUsuario).includes('telefono') &&
    //     Object.keys(datosNuevoUsuario).includes('nacimiento:')&& 
    //     Object.keys(datosNuevoUsuario).includes('correo')


    // ) {

    // aqui implementaremos el codigo para crear usuario en la base de datos de mongoDB
    await getBD().collection('usuario').insertOne(datosNuevoUsuario, callback);

    // usamos funciones de mongo para escribir y guardar en una
    // colecion documento creado con getBD().collection("usuario"), usuario es mi colecion y en ella guardo los datos traidos del front, el 
    // registro de una usuario con el metodo inserOne, el segundo parametro de es una funcion que se ejecuta cuando la insercion es decir
    // el proceso de guardar el registro en la base de datos termine esta funcion tiene dos parametros uno es un error y esto es para mostrar
    // un mensaje de error si la operacion inserOne no fue satisfactoria y resul me trae el resultado creo 
    // este es mi documento en la base de datos dentro de mi collecion
    //  (documentosenBaseDatos)--> getBD() = db.db('documentosenBaseDatos') donde guardare mis datos de las
    // usuarios es decir representa el modelo o entidad usuarios, y le insertare los datos a ese documento con 
    // el metodo insertOne, el primer parametro es mi registro de una usuario y el  segundo parametro es una funcion que tiene 
    // dos parametros err= error si sucede un error , y result = aun nose que es pero es el resultado de esta operacion insert 

    // res.sendStatus(200);//esta linea me presenta error si la meto (Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)  
    // estado de peticion http de todo bien todo bien  (estados de las peticiones HTTP sirven
    // para tener un buen control de manejo de error )

    // } else {


    //     console.log(" no cumple")
    //     return 'error';
    //     // res.sendStatus(500);
    // }


    // res.sendStatus(500);// estado de peticion http de falla

    // console.log("usuario a crear", req.body);// con req.body accedo a la informacion enviada por el front ya convertida
    // res.send("ok usuario creada con exito");
    // en un objeto con la funcion Express.json().. body es el cuerpo toda la informacion enviada desde el front 
    // body es una palabra reservada.. req.body es mi la informacion enviada desde el frontend
    // el parametro req es la peticion del cliente el frontend es el request==req

    // console.log("esto es una peticion a de tipo POST a la ruta ") // no saldra nada por que siempre las peticiones de navegcaion 
    // a las url son de tipo GET, las solicitudes que se hacen atraves de un navegador son siempre de tipo GET para 
    // probar las peticiones de los otros tipos diferentes a las get se necesita de las herramientas tecnologicas como 
    // postman e  insomnia me ayudaran a probar estas peticiones que no son get

};

const consultarOCrearUsuarioRecienInicioSesion = async (req, callback) => {
    // 1. obtener los datos del usuario desde el token 
    // necesitamos obtener el header desde el req dado que el token esta en los header del req (request)
    // en el req esta el token 
    // extraer el token del req
    const token = req.headers.authorization.split('Bearer ')[1];// tiene el token y con split le quito la palabra 
    // Bearer y el espacio que tiene el token para solo tener el token nada mas 
    // ahora debemos desecriptar el token para extraer la informacion del usuario y para esto hay una libreria jwt-decode
    // esta libreria decodifica el token 
    console.log("token =", jwt_decode(token));// me imprime en consola el token decodificado 

    // guardamos ese token decodificado con solo la informacion que queremos guardar en la BD
    const infoUser = jwt_decode(token)['http://localhost/userData'];// me extrae el valor de la clave  'http://localhost/userData'
    // del objeto token esta tiene la informacion del usuario que necesitamos guardar en la bd

    console.log('infoUser =', infoUser);   // imprime en consola la informacion del usuario      


    // 2. con el correo o con el id de Auth, verificar si el usuario ya esta en la bases de datos o no 
    const baseDeDatos = getBD();

    await baseDeDatos.collection('usuario').findOne({ email: infoUser.email }, async (err, response) => { // me permite 
        // consultar en la base de datos en la coleccion de usuario el email de infoUser el cual es el token 
        // pero solo buscaremos por la key email  en todos los datos ya guardados  en la base de datos es decir compara 
        // el value de la key email de todos los datos en la BD con el value de la key email de infoUser
        console.log("respuesta a la consulta del usuario recien inicio sesion = ", response);

        if (response) {
            // 3. si el usuario ya esta en la base de datos entonces devuelve la informacion del usuario 

            callback(err, response);// me permite enviar al front el response el cual es la data del usuario 
            // que acaba de iniciar sesion pero ya estaba guardado en la base de datos 

        } else {
            // 4. si el usuario no esta en la base de datos, lo crea y devuelve la informacion del usuario


            infoUser.auth0ID = infoUser._id; // dado que auth entrega tambien un _id es mejor guardarlo en otra 
            // variable y elimarlo de como estaba ante ya que mongo genera un _id entonces esto evita conflictos y permite 
            // que mongo sea el que genere el _id y auth genera ese _id pero ahora sera guardado como auth0ID
            delete infoUser._id; // con esta instruccion elimino el _id del token que envio auth0

            infoUser.estado='pendiente'  // asi agrego el campo estado y rol en un primer valor por defecto 
            infoUser.rol='pendiente'
           
            await crearUsuario(infoUser, (err, respuesta) => callback(err, infoUser))// me crea el usuario y me envia
            // la informacion de infoUser al frontend por medio de callback 
            //estos callback siempre entregan dos 
            // argumentos uno es el error(err) y el otro es la respuesta 

            // console.log("respuesta a la creacion del usuario recien inicio sesion = ", respuesta);


        }
    })

};


const editarUsuario = async (id, usuarioAEditar, callback) => { // 

    // const edicion = req.body;// almaceno el cuerpo el objeto json, en formato json de mis datos 
    // console.log(edicion);
    const filtroIdAActualizar = { _id: new ObjectId(id) } //hace el filtro sobre el id a buscar y asi encontrar el registro 
    // para aplicarle las modificaciones, este es el primer parametro que necesita el metodo .findOneAndUpdate( ) son tres 
    // los parametros que necesita para buscar el registro luego poder modificarlo 
    // delete usuarioAEditar.id; // debo eliminar el id del cuerpo de los datos del json porque si no me crea y duplica este
    // id en el registro que estoy modificando y me lo crea en la ultima linen del registro esto se hace cuando estoy 
    // editando por medio de obtener el id del regristro si fuera edicion por rutas URL no necesito esto 
    const operacionAtomica = { // instruccion atomic operators, me configura a la base de datos para editar 
        $set: usuarioAEditar // le mando todo el cuerpo del registro a editar 
    };
    await getBD()
        .collection("usuario") // en que coleccion voy hacer la operacion de actualizar
        .findOneAndUpdate(filtroIdAActualizar, operacionAtomica, { upsert: true, returnOriginal: true }, callback) // .findOneAndUpdate --> esta funcion recibe tres parametros uno es 
    // el filtro para el saber cual es el registro a modificar el segundo parametro es que se va a modificar y en este cso 
    // queremos poder modifcar cualquier campo del registro por eso se pasa todo el cuerpo de la request que es todo 
    // el objeto en formato json de los datos del formulario con los cambios hechos, el tercer parametro son opciones 
    // como el upsert = me permite hacer algo cuando no encuentra el id y Crea un nuevo documento si ningún documento coincide con el filter. 
    // returnOriginal= me retorna el dato original para poder comparar y bueno hay mas opciones para configurar y depende 
    // del caso de uso
    // y por ultimo parametro el colbart la funcion que se ejecuta cuando la operacion PATCH fue realizada


}

const eliminarUsuario = async (id, callback) => {
    // const cuerpoRegistroAEliminar = req.body;//  guardo el cuerpo de la informacion es decir el json donde esta todos los datos 
    // // de los campos del registro de la usuario a eliminar 
    const filtroIdAEliminar = { _id: new ObjectId(id) };//hace el filtro sobre el id a buscar y asi encontrar el registro 
    // para poder eliminarlo , este es el primer parametro que necesita el metodo .findOneAndUpdate( ) son tres 
    // los parametros que necesita para buscar el registro luego poder modificarlo 

    await getBD().collection('usuario').deleteOne(filtroIdAEliminar, callback);
};


export {
    consultaAllUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    consultarOCrearUsuarioRecienInicioSesion
};

// http://localhost:5000/usuarios/self