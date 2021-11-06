import Persona from "./persona.js";

/*MI RUTA DE JSON*/
const URLJSON = "app/data/datos.json";

/*ACCEDO AL DOM*/
$(document).ready(function(){

    /*CARGO EL DOM*/
    console.log("El DOM esta listo");

    /*LLAMO A LA FUNCION PARA OBTENER DEL JSON*/
    obtenerJsonLista();
    obtenerJsonHistorialPersona();
    cargarListaDePersonal();
    // obtenerJsonHistorialMes();

    /*ACCEDO AL FORMULARIO PARA ENVIAR LOS DATOS*/
    $('#form').submit(function(e){

        /*PARA QUE NO RECARGUE LA PAGINA*/
        e.preventDefault();

        /*LLAMO A LA FUNCION VER RECIBO*/
        verRecibo();
        /*LLAMO A LA FUNCION VER EN LISTA DE PERSONAS */
        // verEnLista();
        /*PARA QUE SE RESETEE*/
        $('#form').trigger("reset");
        cargarListaDePersonal();
    });


    /*tengo tres botones:
        btn-1
        btn-2
        btn-3
    */


    /*BTN 2*/
    $('#btn-2').click(function (){

        if(!$('#mostrado').empty()){
            $('#mostrado').remove();
        }

        let select = $('#historial_nombre option:selected').val();
        /*primero vero si esta en el json*/
        
        $.getJSON(URLJSON, function(respuesta, estado){
            if(estado==="success"){
                let misDatos = respuesta;
                for(const dato of misDatos){
                    if(parseInt(dato.persona.dni)===parseInt(select)){
                        // console.log(select)
                        $('#mostrado').append(`
            <div class="mostrado_recibo mostrado_h">
            <h4>${dato.recibo.mes}</h4>
            <div class="mdatos__cargados">
                <div class="mdato__cargado dato__cargado--uno">
                    <p>Nombre:</p>
                    <p>${dato.persona.nombre}</p>
                </div>
                <div class="mdato__cargado dato__cargado--dos">
                    <p>Apellido:</p>
                    <p>${dato.persona.apellido}</p>
                </div>
                <div class="mdato__cargado dato__cargado--tres">
                    <p>D.N.I.:</p>
                     <p id="${dato.persona.dni}">${dato.persona.dni}</p>
                </div>
            </div>
            <div class="mconceptos__cargados">
                <div class="mconcepto__fila mnombre_concepto">
                    <h5 class="fila__uno">Concepto</h5>
                    <h5 class="fila__dos">Cantidad</h5>
                    <h5 class="fila__tres">Saldo</h5>
                </div>
                <div class="mconcepto__fila mbasico">
                    <p class="fila__uno">Sueldo básico</p>
                    <p class="fila__dos">30</p>
                    <p class="fila__tres">${dato.recibo.basico}</p>
                </div>
                <div class="mconcepto__fila mdescuento">
                    <p class="fila__uno">Descuento</p>
                    <p class="fila__dos"></p>
                    <p class="fila__tres">${dato.recibo.descuento}</p>
                </div>
                <div class="mconcepto__fila mbono">
                    <p class="fila__uno">Bonos / premios</p>
                    <p class="fila__dos"></p>
                    <p class="fila__tres">${dato.recibo.bono}</p>
                </div>
                <div class="mconcepto__fila mtotal">
                    <h5 class="fila__uno">Total</h5>
                    <p class="fila__dos"></p>
                    <h5 class="fila__tres">${dato.recibo.total}</h5>
                </div>
            </div>
        </div>
            `);
                    }
                    }
                }
            })

        /*segundo para obtener del storage*/

    })

    /*segunda option para el storage*/
    $('#btn-2').click(function(){
        let personas = JSON.parse(localStorage.getItem('personas'));
        let usuario = $('#historial_nombre option:selected').val();
        for(let i = 0; i<personas.length; i++){
            let nombre = personas[i].persona._nomb;
            let apellido = personas[i].persona._apell;
            let dni = personas[i].persona._dni;
            let mes = personas[i].mes;

            let basico = personas[i].basico;
            let descuento = personas[i].descuento;
            let bono = personas[i].bono;
            let total = (parseFloat(basico)- parseFloat(descuento)) + parseFloat(bono);
            
            if(parseInt(usuario)===parseInt(dni)){
                $('#mostrado').append(`
            <div class="mostrado_recibo mostrado_h">
            <h4>${mes}</h4>
            <div class="mdatos__cargados">
                <div class="mdato__cargado dato__cargado--uno">
                    <p>Nombre:</p>
                    <p>${nombre}</p>
                </div>
                <div class="mdato__cargado dato__cargado--dos">
                    <p>Apellido:</p>
                    <p>${apellido}</p>
                </div>
                <div class="mdato__cargado dato__cargado--tres">
                    <p>D.N.I.:</p>
                     <p id="${dni}">${dni}</p>
                </div>
            </div>
            <div class="mconceptos__cargados">
                <div class="mconcepto__fila mnombre_concepto">
                    <h5 class="fila__uno">Concepto</h5>
                    <h5 class="fila__dos">Cantidad</h5>
                    <h5 class="fila__tres">Saldo</h5>
                </div>
                <div class="mconcepto__fila mbasico">
                    <p class="fila__uno">Sueldo básico</p>
                    <p class="fila__dos">30</p>
                    <p class="fila__tres">${basico}</p>
                </div>
                <div class="mconcepto__fila mdescuento">
                    <p class="fila__uno">Descuento</p>
                    <p class="fila__dos"></p>
                    <p class="fila__tres">${descuento}</p>
                </div>
                <div class="mconcepto__fila mbono">
                    <p class="fila__uno">Bonos / premios</p>
                    <p class="fila__dos"></p>
                    <p class="fila__tres">${bono}</p>
                </div>
                <div class="mconcepto__fila mtotal">
                    <h5 class="fila__uno">Total</h5>
                    <p class="fila__dos"></p>
                    <h5 class="fila__tres">${total}</h5>
                </div>
            </div>
        </div>
            `);
            }
        }
    })

    /*BTN 3*/
    $('#btn-3').click(function (){
        /*primero condiciono para que borre lo que ya estaba*/
        if(!$('#mostrado').empty()){
            $('#mostrado').remove();
        }
        
        let nombreSelect = $('#historial_nombre option:selected').val();
        let mesSelect = $('#historial_mes option:selected').val();
        $.getJSON(URLJSON, function(respuesta, estado){
            if(estado==="success"){
                let misDatos = respuesta;
                for(const dato of misDatos){
                    if(parseInt(mesSelect)===parseInt(dato.recibo.nMes) && parseInt(nombreSelect)===parseInt(dato.persona.dni)){
                        $('#mostrado').append(`
            <div class="mostrado_recibo mostrado_h">
            <h4>${dato.recibo.mes}</h4>
            <div class="mdatos__cargados">
                <div class="mdato__cargado dato__cargado--uno">
                    <p>Nombre:</p>
                    <p>${dato.persona.nombre}</p>
                </div>
                <div class="mdato__cargado dato__cargado--dos">
                    <p>Apellido:</p>
                    <p>${dato.persona.apellido}</p>
                </div>
                <div class="mdato__cargado dato__cargado--tres">
                    <p>D.N.I.:</p>
                     <p id="${dato.persona.dni}">${dato.persona.dni}</p>
                </div>
            </div>
            <div class="mconceptos__cargados">
                <div class="mconcepto__fila mnombre_concepto">
                    <h5 class="fila__uno">Concepto</h5>
                    <h5 class="fila__dos">Cantidad</h5>
                    <h5 class="fila__tres">Saldo</h5>
                </div>
                <div class="mconcepto__fila mbasico">
                    <p class="fila__uno">Sueldo básico</p>
                    <p class="fila__dos">30</p>
                    <p class="fila__tres">${dato.recibo.basico}</p>
                </div>
                <div class="mconcepto__fila mdescuento">
                    <p class="fila__uno">Descuento</p>
                    <p class="fila__dos"></p>
                    <p class="fila__tres">${dato.recibo.descuento}</p>
                </div>
                <div class="mconcepto__fila mbono">
                    <p class="fila__uno">Bonos / premios</p>
                    <p class="fila__dos"></p>
                    <p class="fila__tres">${dato.recibo.bono}</p>
                </div>
                <div class="mconcepto__fila mtotal">
                    <h5 class="fila__uno">Total</h5>
                    <p class="fila__dos"></p>
                    <h5 class="fila__tres">${dato.recibo.total}</h5>
                </div>
            </div>
        </div>
            `);
                    }
                }
            }
        })

    })

    /*para el storage*/
    $('#btn-3').click(function(){
        let personas = JSON.parse(localStorage.getItem('personas'));
        let usuario = $('#historial_nombre option:selected').val();
        let mesSelected = $('#historial_mes option:selected').val();
        for(let i = 0; i<personas.length; i++){
            let nombre = personas[i].persona._nomb;
            let apellido = personas[i].persona._apell;
            let mes = personas[i].mes;

            let basico = personas[i].basico;
            let descuento = personas[i].descuento;
            let bono = personas[i].bono;
            let total = (parseFloat(basico)- parseFloat(descuento)) + parseFloat(bono);

            let dni=personas[i].persona._dni
            let nmes = personas[i].nMes
            if(parseInt(usuario)===parseInt(dni) && parseInt(mesSelected)===parseInt(nmes)){
                $('#mostrado').append(`
            <div class="mostrado_recibo mostrado_h">
            <h4>${mes}</h4>
            <div class="mdatos__cargados">
                <div class="mdato__cargado dato__cargado--uno">
                    <p>Nombre:</p>
                    <p>${nombre}</p>
                </div>
                <div class="mdato__cargado dato__cargado--dos">
                    <p>Apellido:</p>
                    <p>${apellido}</p>
                </div>
                <div class="mdato__cargado dato__cargado--tres">
                    <p>D.N.I.:</p>
                     <p id="${dni}">${dni}</p>
                </div>
            </div>
            <div class="mconceptos__cargados">
                <div class="mconcepto__fila mnombre_concepto">
                    <h5 class="fila__uno">Concepto</h5>
                    <h5 class="fila__dos">Cantidad</h5>
                    <h5 class="fila__tres">Saldo</h5>
                </div>
                <div class="mconcepto__fila mbasico">
                    <p class="fila__uno">Sueldo básico</p>
                    <p class="fila__dos">30</p>
                    <p class="fila__tres">${basico}</p>
                </div>
                <div class="mconcepto__fila mdescuento">
                    <p class="fila__uno">Descuento</p>
                    <p class="fila__dos"></p>
                    <p class="fila__tres">${descuento}</p>
                </div>
                <div class="mconcepto__fila mbono">
                    <p class="fila__uno">Bonos / premios</p>
                    <p class="fila__dos"></p>
                    <p class="fila__tres">${bono}</p>
                </div>
                <div class="mconcepto__fila mtotal">
                    <h5 class="fila__uno">Total</h5>
                    <p class="fila__dos"></p>
                    <h5 class="fila__tres">${total}</h5>
                </div>
            </div>
        </div>
            `);
            }
        }
    })




    /*FUNCIONES*/
    /*-----------*/
    /*FUNCION VERECIBO()*/
    function verRecibo(){
        /*capturo los valores para verlos en mi recibo**/
        let nombre = $('#nombre').val();
        let apellido = $('#apellido').val();
        let dni = $('#dni').val();
        let mes = $("#mes option:selected").text();


        let nMes = parseInt($("#mes option:selected").val());
        
        let basico = $('#basico').val();
        let descuento = $('#descuento').val();
        let bono = $('#bono').val();
        let total = (parseFloat(basico)- parseFloat(descuento)) + parseFloat(bono);


        $('#contenedor__recibo').html(`
            <div class="recibo__hecho">
                <h4 id="rmes">${mes}</h4>
                    <div class="datos__cargados">
                        <div class="dato__cargado dato__cargado--uno">
                            <p>Nombre:</p>
                            <p id="rnombre">${nombre}</p>
                        </div>
                        <div class="dato__cargado dato__cargado--dos">
                            <p>Apellido:</p>
                            <p id="rapellido">${apellido}</p>
                        </div>
                        <div class="dato__cargado dato__cargado--tres">
                            <p>D.N.I.:</p>
                            <p id="rdni">${dni}</p>
                        </div>
                    </div>
                    <div class="conceptos__cargados">
                        <div class="concepto__fila nombre_concepto">
                                    <h5 class="fila__uno">Concepto</h5>
                                    <h5 class="fila__dos">Cantidad</h5>
                                    <h5 class="fila__tres">Saldo</h5>
                        </div>
                        <div class="concepto__fila basico">
                                    <p class="fila__uno">Sueldo básico</p>
                                    <p class="fila__dos">30</p>
                                    <p class="fila__tres" id="rbasico">${basico}</p>
                        </div>
                        <div class="concepto__fila faltados">
                                    <p class="fila__uno">Descuento</p>
                                    <p class="fila__dos"></p>
                                    <p class="fila__tres" id="rdescuento">${descuento}</p>
                        </div>
                        <div class="concepto__fila bono">
                                    <p class="fila__uno">Bonos / premios</p>
                                    <p class="fila__dos"></p>
                                    <p class="fila__tres" id="rbono">${bono}</p>
                        </div>
                        <div class="concepto__fila total">
                                    <h5 class="fila__uno">Total</h5>
                                    <p class="fila__dos"></p>
                                    <h5 class="fila__tres" id="rtotal">${total}</h5>
                        </div>
                    </div>
            </div>
        `)
        /*PARA VER EL RECIBO*/
        /*YA QUE SE ENCUENTRA CON DISPLAY NONE*/
        $('.contenedor__resultado').show("slow");

        /*GUARDO LOS DATOS A MI STORAGE*/
        /*creo mi obejto de datos para guardar en el storage despues*/
        let datos = {persona: new Persona(nombre, apellido, dni),
            nMes: nMes,
            mes: mes,
            basico: basico,
            descuento: descuento,
            bono:bono,
            total:total
        }

        datos.persona.asignarSueldo(nMes, total);
        // console.log(datos.persona.verSueldo(nMes));
        // console.log(datos.persona.toString());
        // console.log(datos.mes)
        // console.log(datos.persona._nomb + datos.persona._dni);

        /*guardo los datos en el storage*/
        if(localStorage.getItem('personas')===null){
            let personas = [];
            personas.push(datos);
            localStorage.setItem('personas', JSON.stringify(personas));
        }else{
            let personas = JSON.parse(localStorage.getItem('personas'));
            personas.push(datos);
            localStorage.setItem('personas', JSON.stringify(personas));
        }

    }

    function cargarListaDePersonal(){

        let personas = JSON.parse(localStorage.getItem('personas'));
        for(let i=0; i<personas.length; i++){
            let viejo = $('#'+personas[i].persona._dni).text();
            // console.log(personas[i]);
            // console.log(personas[i].persona._nomb);
            // console.log(personas[i].basico);
                let no = personas[i].persona._nomb;
                let ap = personas[i].persona._apell;
                let dn = personas[i].persona._dni;
                if(viejo!=personas[i].persona._dni){
                            $('#personal__lista-datos').append(`
                <div class="lista-cargada personal-item">
                        <p class="p-d ${no}">${no}</p>
                        <p class="p-d ${ap}">${ap}</p>
                        <p class="p-d ${dn}" id="${dn}">${dn}</p>
                    </div>
        `);
            }

            if(parseInt(viejo) != dn){ 
                $('#historial_nombre').append(`
                    <option value="${dn}">${no} ${ap}</option>
                `)
                }
        }
    }

    function obtenerJsonLista(){
        /*CARGO MI JSON A LA PAGINA*/
    $.getJSON(URLJSON, function(respuesta, estado){
        if(estado==="success"){
            let misDatos = respuesta;
            for(const dato of misDatos){
                /*LO CARGO A LA LISTA*/
                let no = $('.' + dato.persona.nombre).text();
                let ap = $('.' + dato.persona.apellido).text();
                let dn = $('.' + dato.persona.dni).text();
                if(dn!=dato.persona.dni){
                            $('#personal__lista-datos').append(`
                <div class="lista-cargada personal-item">
                        <p class="p-d ${dato.persona.nombre}">${dato.persona.nombre}</p>
                        <p class="p-d ${dato.persona.apellido}">${dato.persona.apellido}</p>
                        <p class="p-d ${dato.persona.dni}" id="${dato.persona.dni}">${dato.persona.dni}</p>
                    </div>
        `);
                }
            }
        }
    })

    }


    function obtenerJsonHistorialPersona(){


        $.getJSON(URLJSON, function(respuesta, estado){
            if(estado==="success"){
                let misDatos = respuesta;
                for(const dato of misDatos){
                    // let no = $('.' + dato.persona.nombre).val();
                    // let ap = $('.' + dato.persona.apellido).val(); 
                    // let dn = $('.' + dato.persona.dni).text();
                    let de = $('#historial_nombre option:selected').val();
                if(parseInt(de) != parseInt(dato.persona.dni)){ 
                    $('#historial_nombre').append(`
                        <option value="${dato.persona.dni}">${dato.persona.nombre} ${dato.persona.apellido}</option>
                    `)
                    }
                    
                }
                
                }
                
        })
        /*para que no repitan*/
        verificadorPersonas();
    }

    function verificadorPersonas(){
        $("#historial_nombre option").each(function() {
            if($(this).val()===$(this).val()){
                $(this).remove();
            }
            })
    }

})