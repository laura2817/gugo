//Genera lista de descargables
//Lee todos los archivos de la carpeta y genera las cards de descargas.
//Carga pasado 1 segundo, para mas fluidez.
let valores = getServerFileList(getFilePage('descargas/'))
setTimeout(function(){ lista(valores,"file_list"); }, 1000);


//Genera las Card de descarga de los archivos
//archivo viene con "nombre", "enlace", "ext" extension
function FileCard(archivo){
	return( 
		`
		<article class="material__art">
			<img class="material__img" src="./img/icon/descargas/icono__${archivo.ext}.png" alt="audio-img">
			<h3 class="material__name title">${archivo.nombre}</h3>
			<button class="material__level text">Nivel 1</button>
			<button href=${archivo.enlace} onclick="descargar(this)" 
			class="material__download text">Descargar ${archivo.ext}</button>
		</article>
		`
	)
}


function descargar(e){
	e.preventDefault()
	window.location.href=e.getAttribute("href")
}

//Separa el nombre del archivo y su extension
function RemoveExtra(texto){
	let temp = texto.split(".")
	let salida = ""
	for (z = 0; z < temp.length-1; z++){salida += temp[z]}
	return {"FileName":salida,"ext": temp[temp.length-1]}
}


//Genera la lista de archivos en Html
function lista(myList, idDestino = "file_list"){
	destino = document.getElementById(idDestino)
	destino.innerHTML=""
	for(let i=0;i<myList.length;i++){
		 destino.innerHTML += FileCard(myList[i])
    }
}

//Recupera la pagina del server que genera la lista de archivos
function getFilePage(destino){
	let ur = window.location.href.split("/")
	let url = window.location.href.replace(ur[ur.length-1], "") + destino

	let req = new XMLHttpRequest();  
	req.open('GET', url, false);   
	req.send(null);  

return req.response
}

//Obtiene la lista de archivos de la carpeta, en base al listado automatico
function getServerFileList(paginaDestino){

let list = document.createElement("div")
	list.innerHTML = paginaDestino

let listaDeEnlaces = list.getElementsByTagName('pre')[0].getElementsByTagName("a")

let listaDeArchivos = []
	
	for (i = 5; i < listaDeEnlaces.length; i++){
		var rem = RemoveExtra(listaDeEnlaces[i].text)

		listaDeArchivos.push( {
						"enlace":listaDeEnlaces[i],
						"nombre":rem.FileName,
						"ext"   :rem.ext.substring(0,3),
						"html"  :listaDeEnlaces[i].outerHTML,
						}
					)
	}
return listaDeArchivos
}