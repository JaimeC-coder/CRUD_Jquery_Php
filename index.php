<?php
//header("Location: index.html");
$host="localhost";
$bd="sistemas";
$user="root";
$pass="root";
try{
$conexion=new PDO("mysql:host=$host;dbname=$bd",$user,$pass);
//echo "Conexion exitosa";
}catch(PDOException $e){
echo "Error: ". $e->getMessage();
}



if(isset($_GET['accion'])=="insertar"){
$nombre=$_POST['nombre'];
$precio=$_POST['precio'];
$sentecia=$conexion->prepare("INSERT INTO sistemas(nombre,precio) VALUES(:nombre,:precio)");
$sentecia->bindParam(':nombre',$nombre);
$sentecia->bindParam(':precio',$precio);
$sentecia->execute();
exit();
}
if(isset($_GET['eliminar'])){
$id=$_GET['eliminar'];
$sentecia=$conexion->prepare("DELETE FROM sistemas WHERE id=:id");
$sentecia->bindParam(':id',$id);
$sentecia->execute();
exit();
}
if(isset($_GET['consultar'])){
$id=$_GET['consultar'];
$sentecia=$conexion->prepare("SELECT * FROM sistemas WHERE id=".$id);

$sentecia->execute();
$resultado=$sentecia->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
exit();
}
if(isset($_GET['actualizar'])){
$id=$_POST['id'];
$nombre=$_POST['nombre'];
$precio=$_POST['precio'];
$sentecia=$conexion->prepare("UPDATE sistemas SET nombre=:nombre,precio=:precio WHERE id=:id");
$sentecia->bindParam(':nombre',$nombre);
$sentecia->bindParam(':precio',$precio);
$sentecia->bindParam(':id',$id);
$sentecia->execute();
echo json_encode(["success"=>1]);
exit();

}

$sentecia=$conexion->prepare("SELECT * FROM sistemas");
$sentecia->execute();
$resultado=$sentecia->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
