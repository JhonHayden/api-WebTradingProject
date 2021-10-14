// const express = require("express"); // de esta  forma se importa la libreria express para usarla se la asigno 
// a una variable con el metodo require.. es la forma tradicional 

import Express from "express";// segunda forma de importar Express cuando ya lo habilite en el packege.json con 
// type:module... esta es la nueva forma para node es igual como se hace en React .. esta forma es permitida 
// gracias a babel 


// declaramos una variable que sera nuestra aplicacion nuestro servidor... app este nombre es por convencion 
// esta variable le agregamos todo lo que se necesite las rutas los metodos 
const app = Express()

// lo primero que se le agrega o habilita es prender el servidor es ponerlo a escuchar, se prenda y comience 
//a escuchar las peticiones que llegaran a un puerto especifico 

// aqui le agregamos funcionalidad:  las rutas

// ruta para la peticion get
app.get('/ventas',(req,res) => {// el primer argumento es la ruta y el segundo argumento es una funcion que se ejecutq
    // cuando entran en esta ruta (colvar), es decir cuando hacen una peticion de tipo get a esta ruta la funcion 
    // se ejecuta.0 absolutamente todas las navegaciones que se hacen en una URL son de tipo get siempre se pide traer 
    // informacion .. la funcion anonima tambien tiene paramentros y dos muy importantes son el 
    // req: es el request quien hace la solicitud o peticion estos nombres son por convencion 
    // res: es la respuesta del servidor a esta peticion, es la respuesta
    // para el cliente el navegador el frontend estos nombres son por convencion 
    console.log("alguien hizo get en la ruta /ventas");   //se imprime en la terminal cuando alguien visita la ruta
    // http://localhost:5000/ventas
    
    res.send('<h1>hola mundo soy una ruta get en express</h1>'); // con el nombre del parametro de respuesta y el metodn 
    // send le envio lo que quiera y necesite el navegador cliente el front dentro de los parentesis esta 
    // la respuesta

}) 

   



app.listen(5000, () => {// me permite prender y correr el servidor se queda todo el tiempo en ejecucion y escuchando solicitudes 
    // en el puerto especifico en este servidor donde estara desplegado el puerto se pone como argumento 
    // en los parentesis del metodo listen() por convencion es el puerto 5000 o 5050 la idea es que sea unico 
    // el segundo argumento es una funcion que se ejecuta cuando la app comienza a funcionar cuando se inicia 
    // a escuchar el puerto 



    console.log("escuchando puerto 5000")

})





