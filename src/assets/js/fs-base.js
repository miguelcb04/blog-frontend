$(document).ready(function() {

    $.getJSON("", {},
    function (data, textStatus, jqXHR) {

        const fs_horario = document.getElementById("fs-horario")

        Object.keys(data.horario)
        .sort()
        .forEach((key) => {
            fs_horario.insertAdjacentHTML('beforeend', `<li>${data.horario[key]}</li>`)
        });    

        const fs_direccion = document.getElementById("fs-direccion") 
        
        Object.keys(data.direccion)
        .sort()
        .forEach((key) => {
            fs_direccion.insertAdjacentHTML('beforeend', `<li>${data.direccion[key]}</li>`)
        }); 
    });

})

