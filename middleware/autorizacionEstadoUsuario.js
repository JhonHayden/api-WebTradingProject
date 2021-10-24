// middleware personalizado 
import { getBD } from "../db/db.js"; // importo la funcion para la conexion a la base de datos mongoDB
import jwt_decode from "jwt-decode"; // libreria para decodificar token y extraer informacion 

const autorizacionEstadoUsuario = async (req, res, next) => {

    // paso 1: obtener el usuario desde el token 


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

        // si encontro el usuario es decir si hay respuesta de la base de datos (response = positiva)
        if (response) {

            if (response.estado === "No autorizado") {
                // 3. si el usuario  esta en la base de datos con el estado No autorizado enviamos 
                // el status 401 para que el front rechaze el ingreso de este usuario 

                res.sendStatus(401);// me permite enviar al front el estatus de 401 error (res es la respuesta
                // enviada al front)
                res.end();// finaliza la respuesta
                console.log("usuario existente en la base de datos y con estado No utorizado")

            } else {// si existe registro de usuario y esta autorizado ejecute next() que significa
                // siga con la ejecucion del los codigos o funciones siguientes a este middleware

                console.log("usuario existente en la base de datos y con estado autorizado")

                next();// next es siguiente middleware siga con la ejecucion siguiente a este 
                // middleware

            }
        }

        else {
            // 4. si el usuario no esta en la base de datos entonces continue con la siguente ejecucion 
            // o middleware despues de este es decir next()
            next();
        }
    })

}

export default  autorizacionEstadoUsuario