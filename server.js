// const express = require("express"); // de esta  forma se importa la libreria express para usarla se la asigno 
// a una variable con el metodo require.. es la forma tradicional 

import Express from "express";// segunda forma de importar Express cuando ya lo habilite en el packege.json con 
// type:module... esta es la nueva forma para node es igual como se hace en React .. esta forma es permitida 
// gracias a babel 


// declaramos una variable que sera nuestra aplicacion nuestro servidor... app este nombre es por convencion 
// esta variable le agregamos todo lo que se necesite las rutas los metodos 
const app = Express();

app.use(Express.json()) // cuando llega una solicitud primero se ejecuta esta funcion use y me permite trabajar con formato json en mis peticiones, nos habilita para 
// cuando nos llega una solicitud y peticion de tipo json en un request del frontend, el Express.json() la funcion .json()
//  convierte el cuerpo body de esa peticion o request del front en  un objeto que se puede usar en nuestro backend




// aqui le agregamos funcionalidad:  las rutas




// ruta para la peticion GET
app.get('/ventas', (req, res) => {// el primer argumento es la ruta y el segundo argumento es una funcion que se ejecutq
    // cuando entran en esta ruta (colvar), es decir cuando hacen una peticion de tipo get a esta ruta la funcion 
    // se ejecuta.0 absolutamente todas las navegaciones que se hacen en una URL son de tipo get siempre se pide traer 
    // informacion .. la funcion anonima tambien tiene paramentros y dos muy importantes son el 
    // req: es el request quien hace la solicitud o peticion estos nombres son por convencion 
    // res: es la respuesta del servidor a esta peticion, es la respuesta
    // para el cliente el navegador el frontend estos nombres son por convencion 
    console.log("alguien hizo get en la ruta /ventas");   //se imprime en la terminal cuando alguien visita la ruta
    // http://localhost:5000/ventas

    const ventas = [  // simulacion de datos de la base de datos de mongoDB solo para pruebas
        // despues esto se cambia por una instruccion de consulta a la base de datos 
        {
            codigoVenta: '123',
            fecha: '14/10/2021',
            codigoProducto: '254',
            cantidadProducto: '2',
            nombreVendedor: 'Jhon ',
            nombreCliente: 'Stefania',
            precioUnitario: '10000',
            valorTotal: '20000'
        },
        {
            codigoVenta: '254',
            fecha: '14/10/2021',
            codigoProducto: '254',
            cantidadProducto: '2',
            nombreVendedor: 'Jhon ',
            nombreCliente: 'Stefania',
            precioUnitario: '10000',
            valorTotal: '20000'
        },
        {
            codigoVenta: '123',
            fecha: '14/10/2021',
            codigoProducto: '254',
            cantidadProducto: '2',
            nombreVendedor: 'Jhon ',
            nombreCliente: 'Stefania',
            precioUnitario: '10000',
            valorTotal: '20000'
        }
    ]

    res.send(ventas); // con el nombre del parametro de respuesta y el metodn 
    // send le envio lo que quiera y necesite el navegador cliente el front dentro de los parentesis esta 
    // la respuesta se puede devolver html tambien dentro de la respuesta 

})


// ruta para la peticion POST
app.post("/ventas/nueva", (req, res) => {

    // console.log(req); // req trae toda la trama de la data de la comuniciacion entre el front y el back con req.body 
    //estraemos la informacion de los datos como tal enviados 
    // aqui implementaremos el codigo para crear venta en la base de datos de mongoDB
    const datosVentas = req.body;

    console.log('llaves de los datos: ', Object.keys(datosVentas));// con la funcion Object.keys(datosVentas) estrae de los datos 
    // del json enviado por el front las llaves de estos datos 
    // express esta diseñado para trabajar con formato json pero se debe usar primero 
    // los metodos y utilidades .use para recibir json
    if (Object.keys(datosVentas).includes('codigoVenta') &&
        Object.keys(datosVentas).includes('fecha') &&
        Object.keys(datosVentas).includes('codigoProducto') &&
        Object.keys(datosVentas).includes('cantidadProducto') &&
        Object.keys(datosVentas).includes('nombreVendedor') &&
        Object.keys(datosVentas).includes('nombreCliente') &&
        Object.keys(datosVentas).includes('precioUnitario') &&
        Object.keys(datosVentas).includes('valorTotal')) {

        res.sendStatus(200);
        
    } else {
        
        res.sendStatus(500);
    }
    console.log("venta a crear", req.body);// con req.body accedo a la informacion enviada por el front ya convertida
    // res.send("ok venta creada con exito");
    // en un objeto con la funcion Express.json().. body es el cuerpo toda la informacion enviada desde el front 
    // body es una palabra reservada.. req.body es mi la informacion enviada desde el frontend
    // el parametro req es la peticion del cliente el frontend es el request==req

    console.log("esto es una peticion a de tipo POST a la ruta ") // no saldra nada por que siempre las peticiones de navegcaion 
    // a las url son de tipo GET, las solicitudes que se hacen atraves de un navegador son siempre de tipo GET para 
    // probar las peticiones de los otros tipos diferentes a las get se necesita de las herramientas tecnologicas como 
    // postman e  insomnia me ayudaran a probar estas peticiones que no son get

});


// lo primero que se le agrega o habilita es prender el servidor es ponerlo a escuchar, se prenda y comience 
//a escuchar las peticiones que llegaran a un puerto especifico 
app.listen(5000, () => {// me permite prender y correr el servidor se queda todo el tiempo en ejecucion y escuchando solicitudes 
    // en el puerto especifico en este servidor donde estara desplegado el puerto se pone como argumento 
    // en los parentesis del metodo listen() por convencion es el puerto 5000 o 5050 la idea es que sea unico 
    // el segundo argumento es una funcion que se ejecuta cuando la app comienza a funcionar cuando se inicia 
    // a escuchar el puerto 

    console.log("escuchando puerto 5000")

})





