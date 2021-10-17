// condigo del controlador del modulo ventas
import { getBD } from "../../db/db.js"; // importo la funcion para la conexion a la base de datos mongoDB
import { ObjectId } from "mongodb"; // importamos la funcion de ObjectId para obtener el id de un registro y poder hacer el metodo PATCH 

const queryAllVentas = async (callback) => {// 

    await getBD().collection('venta').find({}).limit(50).toArray(callback); //funcion de la libreria mongodb del driver para la getBD() (mongoclient) para encontrar
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

const crearVenta = async (datosNuevaVenta, callback) => { // se pone async para poder poner await y esperar respuesta de la base de datos 
    // console.log(req); // req trae toda la trama de la data de la comuniciacion entre el front y el back con req.body 
    //estraemos la informacion de los datos como tal enviados 

    // const datosVentas = req.body;

    // console.log('llaves de los datos: ', Object.keys(datosVentas));// con la funcion Object.keys(datosVentas) estrae de los datos 
    // del json enviado por el front las llaves de estos datos 
    // express esta diseñado para trabajar con formato json pero se debe usar primero 
    // los metodos y utilidades .use para recibir json


    if (Object.keys(datosNuevaVenta).includes('codigoVenta') &&
        Object.keys(datosNuevaVenta).includes('fecha') &&
        Object.keys(datosNuevaVenta).includes('codigoProducto') &&
        Object.keys(datosNuevaVenta).includes('cantidadProducto') &&
        Object.keys(datosNuevaVenta).includes('nombreVendedor') &&
        Object.keys(datosNuevaVenta).includes('nombreCliente') &&
        Object.keys(datosNuevaVenta).includes('precioUnitario') &&
        Object.keys(datosNuevaVenta).includes('valorTotal')

    ) {

        // aqui implementaremos el codigo para crear venta en la base de datos de mongoDB
        await getBD().collection('venta').insertOne(datosNuevaVenta, callback);

        // usamos funciones de mongo para escribir y guardar en una
        // colecion documento creado con getBD().collection("venta"), venta es mi colecion y en ella guardo los datos traidos del front, el 
        // registro de una venta con el metodo inserOne, el segundo parametro de es una funcion que se ejecuta cuando la insercion es decir
        // el proceso de guardar el registro en la base de datos termine esta funcion tiene dos parametros uno es un error y esto es para mostrar
        // un mensaje de error si la operacion inserOne no fue satisfactoria y resul me trae el resultado creo 
        // este es mi documento en la base de datos dentro de mi collecion
        //  (documentosenBaseDatos)--> getBD() = db.db('documentosenBaseDatos') donde guardare mis datos de las
        // ventas es decir representa el modelo o entidad ventas, y le insertare los datos a ese documento con 
        // el metodo insertOne, el primer parametro es mi registro de una venta y el  segundo parametro es una funcion que tiene 
        // dos parametros err= error si sucede un error , y result = aun nose que es pero es el resultado de esta operacion insert 

        // res.sendStatus(200);//esta linea me presenta error si la meto (Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client)  
        // estado de peticion http de todo bien todo bien  (estados de las peticiones HTTP sirven
        // para tener un buen control de manejo de error )

    } else {
        return 'error';
        // res.sendStatus(500);
    }


    // res.sendStatus(500);// estado de peticion http de falla

    // console.log("venta a crear", req.body);// con req.body accedo a la informacion enviada por el front ya convertida
    // res.send("ok venta creada con exito");
    // en un objeto con la funcion Express.json().. body es el cuerpo toda la informacion enviada desde el front 
    // body es una palabra reservada.. req.body es mi la informacion enviada desde el frontend
    // el parametro req es la peticion del cliente el frontend es el request==req

    // console.log("esto es una peticion a de tipo POST a la ruta ") // no saldra nada por que siempre las peticiones de navegcaion 
    // a las url son de tipo GET, las solicitudes que se hacen atraves de un navegador son siempre de tipo GET para 
    // probar las peticiones de los otros tipos diferentes a las get se necesita de las herramientas tecnologicas como 
    // postman e  insomnia me ayudaran a probar estas peticiones que no son get

};

const editarVenta = async (ventaAEditar, callback) => {

    // const edicion = req.body;// almaceno el cuerpo el objeto json, en formato json de mis datos 
    // console.log(edicion);
    const filtroIdAActualizar = { _id: new ObjectId(ventaAEditar.id) } //hace el filtro sobre el id a buscar y asi encontrar el registro 
    // para aplicarle las modificaciones, este es el primer parametro que necesita el metodo .findOneAndUpdate( ) son tres 
    // los parametros que necesita para buscar el registro luego poder modificarlo 
    delete ventaAEditar.id; // debo eliminar el id del cuerpo de los datos del json porque si no me crea y duplica este
    // id en el registro que estoy modificando y me lo crea en la ultima linen del registro esto se hace cuando estoy 
    // editando por medio de obtener el id del regristro si fuera edicion por rutas URL no necesito esto 
    const operacionAtomica = { // instruccion atomic operators, me configura a la base de datos para editar 
        $set: ventaAEditar // le mando todo el cuerpo del registro a editar 
    };
    await getBD()
        .collection("venta") // en que coleccion voy hacer la operacion de actualizar
        .findOneAndUpdate(filtroIdAActualizar, operacionAtomica, { upsert: true, returnOriginal: true }, callback) // .findOneAndUpdate --> esta funcion recibe tres parametros uno es 
    // el filtro para el saber cual es el registro a modificar el segundo parametro es que se va a modificar y en este cso 
    // queremos poder modifcar cualquier campo del registro por eso se pasa todo el cuerpo de la request que es todo 
    // el objeto en formato json de los datos del formulario con los cambios hechos, el tercer parametro son opciones 
    // como el upsert = me permite hacer algo cuando no encuentra el id y Crea un nuevo documento si ningún documento coincide con el filter. 
    // returnOriginal= me retorna el dato original para poder comparar y bueno hay mas opciones para configurar y depende 
    // del caso de uso
    // y por ultimo parametro el colbart la funcion que se ejecuta cuando la operacion PATCH fue realizada


}

const eliminarVenta = async (ventaAEliminar, callback) => {
    // const cuerpoRegistroAEliminar = req.body;//  guardo el cuerpo de la informacion es decir el json donde esta todos los datos 
    // // de los campos del registro de la venta a eliminar 
    const filtroIdAEliminar = { _id: new ObjectId(ventaAEliminar.id) } //hace el filtro sobre el id a buscar y asi encontrar el registro 
    // para poder eliminarlo , este es el primer parametro que necesita el metodo .findOneAndUpdate( ) son tres 
    // los parametros que necesita para buscar el registro luego poder modificarlo 

    await getBD().collection('venta').deleteOne(filtroIdAEliminar, callback);
}


export { queryAllVentas, crearVenta, editarVenta, eliminarVenta };