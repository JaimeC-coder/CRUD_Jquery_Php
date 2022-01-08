$(document).ready(function () {
    consultar();
});
$("#btnagregar").click(function (e) {
    agregar();
    
});

$("#btneditar").click(function (e) {
    editar();
    limpiar();
});

$("#btncancelar").click(function (e) {
    limpiar();
});

function agregar() {
    var datosFormulario = new FormData();
    datosFormulario.append("nombre", $("#txtnombre").val()); //recolecta datos de los campos
    datosFormulario.append("precio", $("#txtprecio").val());
    console.log(datosFormulario.get("nombre"));
    console.log(datosFormulario.get("precio"));
    $.ajax({
        type: "post",
        url: "index.php?accion=insertar",
        data: datosFormulario,
        processData: false,
        contentType: false,
        success: function (response) {
            consultar();
            limpiar();
            console.log(response);
        },
    });
}
function consultar() {
    $("#tabla").empty();
    $.getJSON("index.php", function (registros) {
        //console.log(registros);
        var mochilas = [];
        $.each(registros, function (i, item) {
            if (i >= 0) {
                var llenar = "<tr>";
                llenar += "<td>" + item.id + "</td>";
                llenar += "<td>" + item.nombre + "</td>";
                llenar += "<td>" + item.precio + "</td>";
                llenar +=
                    "<td><button class='btn btn-warning' onclick='seleccionar(" +
                    item.id +
                    ")'>seleccionar</button> |<button class='btn btn-danger' onclick='eliminar(" +
                    item.id +
                    ")'>Eliminar</button> </td>";
                llenar += "</tr>";
                mochilas.push(llenar);
            }
        });
        $("#tabla").append(mochilas.join(""));
    });
}
function eliminar(id) {
    $.get("index.php?eliminar=" + id, function () {
        consultar();
    });
}
function seleccionar(id) {
    console.log(id);
    $.getJSON("index.php?consultar=" + id, function (registros) {
        console.log(id);
        console.log(registros);
        $("#txtid").val(registros[0].id);
        $("#txtnombre").val(registros[0].nombre);
        $("#txtprecio").val(registros[0].precio);
        $("#btnagregar").addClass("disabled");
        $("#btneditar").removeClass("disabled");
        $("#btncancelar").removeClass("disabled");
    });
}
function editar() {
    var datosFormulario = new FormData();
    datosFormulario.append("id", $("#txtid").val());
    datosFormulario.append("nombre", $("#txtnombre").val());
    datosFormulario.append("precio", $("#txtprecio").val());
    console.log(datosFormulario.get("id"));
    console.log(datosFormulario.get("nombre"));
    console.log(datosFormulario.get("precio"));
    $.ajax({
        type: "post",
        url: "index.php?actualizar=1",
        data: datosFormulario,
        processData: false,
        contentType: false,
        success: function (response) {
            consultar();
            console.log(response);
            impiar();
        },
    });
}
function limpiar() {
    $("#txtid").val("");
    $("#txtnombre").val("");
    $("#txtprecio").val("");
    $("#btnagregar").removeClass("disabled");
    $("#btneditar").addClass("disabled");
    $("#btncancelar").addClass("disabled");
}
