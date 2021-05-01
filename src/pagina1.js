//console.log("ssasdas");
const {remote,Notification} = require("electron");
const menu= remote.require("./index.js");

const Tabla_principal = document.getElementById("tabla_principal");
const Tabla_horas = document.getElementById("tabla_horas");
const button_refresh = document.getElementById("refresh");
const button_formulario= document.getElementById("boton_formulario");
const button_formulario_hora = document.getElementById("cambiar_hora");
var csv_data=1;
var csv_horas=1;
refrescar_tabla();
refrescar_horas();
const cambio = document.getElementById("Cambio");
cambio.innerHTML="Agregar";


button_refresh.addEventListener('click' , (e)=>{
    e.preventDefault();
    refrescar_tabla();
});

function refrescar_tabla(){
    if (typeof csv_data == 'number'){
        console.log(typeof csv_data);
        csv_data = menu.file();
    }
    console.log(csv_data);
    tab="";
    console.log(csv_data.length)
    for(var i = 0; i < csv_data.length; i++){
        //console.log(csv_data[i]);
        //+"</td><td>"+csv_data[i][3]
        row= "<tr><td>"+csv_data[i][0]+"</td><td>"+csv_data[i][1]+"</td><td>"+csv_data[i][2]+
        "</td><td><button class='btn btn-success editar' id="+i
        +">"+
        "E"
        +"</button><button class='btn btn-danger borrar' id="+i+">X</button><button class='btn btn-primary Detalle' id="+i+">"+
        "D"
        +"</button></td></tr>";
        tab +=row;
    }
    //console.log(tab);
    Tabla_principal.innerHTML = tab;  
}
function refrescar_horas(){
    console.log(csv_horas);
    if (typeof csv_horas == 'number'){
        console.log(typeof csv_horas);
        csv_horas = menu.file_horas()[0];
    }
    tab="";
    console.log("horas");
    console.log(csv_horas);
    for(var i = 0; i < csv_horas.length; i++){
        //console.log(csv_data[i]);
        //+"</td><td>"+csv_data[i][3]
        
        row= "<tr><td>"+csv_horas[i]+"</td><td><button class='btn btn-success editar_hora' id="+i
        +">E</button></td><td><button class='btn btn-danger borrar_hora' id="+i+">X</button></td></tr>";
        tab +=row;
    }

    Tabla_horas.innerHTML = tab;
}

document.addEventListener('click', (e)=>{
    if(e.toElement.localName === "button" & e.toElement.id!="refresh"){
        //console.log(e);
        var lista = e.toElement.classList;
        if(lista.contains('editar')){
            cambio.innerHTML="Editando";
            button_formulario.innerHTML="Editar";
            console.log(csv_data[e.toElement.id]);
            var Titulo =document.getElementById("Titulo");
            var Ramo =document.getElementById("Ramo");
            var Fecha =document.getElementById("Fecha");
            var Comentario =document.getElementById("Comentario");
            var row = document.getElementById("row");
            row.value= e.toElement.id;
            Fecha.value= csv_data[e.toElement.id][0];
            Ramo.value= csv_data[e.toElement.id][1];
            Titulo.value= csv_data[e.toElement.id][2];
            Comentario.value= csv_data[e.toElement.id][3];
            document.getElementById("Cambio").click();
            
        }
        else if(lista.contains('borrar')){
            console.log("borrar");
            console.log(csv_data[e.toElement.id]);
            csv_data.splice(e.toElement.id, 1);
            refrescar_tabla();
            menu.save_file(csv_data);
        }
        else if(lista.contains("Detalle")){
            console.log("Detallando :v");
            cambio.innerHTML="Agregar";
            var Titulo =document.getElementById("Detalle_titulo");
            var Ramo =document.getElementById("Detalle_ramo");
            var Fecha =document.getElementById("Detalle_fecha");
            var Comentario =document.getElementById("Detalle_comentario");
            Fecha.innerHTML= csv_data[e.toElement.id][0];
            Ramo.innerHTML= csv_data[e.toElement.id][1];
            Titulo.innerHTML= csv_data[e.toElement.id][2];
            Comentario.innerHTML= csv_data[e.toElement.id][3];
            document.getElementById("datalle_his").click();
        }
        else if(lista.contains("editar_hora")){
            var Hora = document.getElementById("cambio_hora");
            var row = document.getElementById("row_hora");
            row.value=e.toElement.id;
            Hora.innerHTML=csv_horas[e.toElement.id];
            //aca BOTON HORA
            button_formulario_hora.innerHTML("Cambiar");
        }
        else if(lista.contains("borrar_hora")){
            var row = document.getElementById("row_hora");
            console.log("borrar_hora");
            csv_horas.splice(e.toElement.id, 1);
            refrescar_horas();
            menu.save_file_horas(csv_horas);
        }
    }
});
//boton formulario de editar/agregar historia
button_formulario.addEventListener('click', (e)=>{
    e.preventDefault();
    if(button_formulario.innerHTML==="Editar"){
        cambio.innerHTML="Editando";
        console.log("Editando :v");
        var Titulo =document.getElementById("Titulo");
        var Ramo =document.getElementById("Ramo");
        var Fecha =document.getElementById("Fecha");
        var Comentario =document.getElementById("Comentario");
        var row = document.getElementById("row");
        var i = row.value;
        
        csv_data[i][0]=Fecha.value;
        csv_data[i][1]=Ramo.value;
        csv_data[i][2]=Titulo.value;
        csv_data[i][3]=Comentario.value;
        button_formulario.innerHTML="Agregar";
        cambio.innerHTML="Agregar";
        document.getElementById("general_his").click();
    }
    else if(button_formulario.innerHTML==="Agregar"){
        console.log("Agregando :v");
        cambio.innerHTML="Agregar";
        var Titulo =document.getElementById("Titulo");
        var Ramo =document.getElementById("Ramo");
        var Fecha =document.getElementById("Fecha");
        var Comentario =document.getElementById("Comentario");
        console.log([Fecha.value,Ramo.value,Titulo.value,Comentario.value]);
        csv_data[csv_data.length]=[Fecha.value,Ramo.value,Titulo.value,Comentario.value];
        document.getElementById("general_his").click();
    }
    menu.save_file(csv_data);
    refrescar_tabla();
});

//boton formulario agregar/editar horas
button_formulario_hora.addEventListener('click', (e)=>{
    if(button_formulario_hora.innerHTML == "Cambiar"){
        e.preventDefault();
        var Hora_cambio = document.getElementById("Hora_editada");
        var row = document.getElementById("row_hora");
        csv_horas[row.value]=Hora_cambio.value;
        menu.save_file_horas(csv_horas);
        button_formulario_hora.innerHTML="Agregar"
        document.getElementById("general_hor").click();
    }
    else if(button_formulario_hora.innerHTML == "Agregar"){
        e.preventDefault();
        var Hora_cambio = document.getElementById("Hora_editada");
        var row = document.getElementById("row_hora");
        csv_horas[csv_horas.length]=Hora_cambio.value;
        menu.save_file_horas(csv_horas);
        document.getElementById("general_hor").click();
    }
    refrescar_horas();

});



async function firstAsync() {
    
    while(true){
        await new Promise(r => setTimeout(r, 2000));
        let d = new Date();
        for(var i = 0; i < csv_horas.length; i++){
            partes_hora=csv_horas[i].split(":");
            if(partes_hora[0] == d.getHours() && partes_hora[1]== d.getMinutes()){
                remote.Notification({
                    title:"Recordatorios Panxo APP",
                    body:"Recuerda revisar tus tareas "
                }).show()
                await new Promise(r => setTimeout(r, 120000));
            }
        }
    }
}

firstAsync();
