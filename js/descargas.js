//Genera lista de descargables
//Lee todos los archivos de la carpeta y genera las cards de descargas.

lista(getServerFileList(getFilePage('descargas/')),"lista_archivos")



//Genera las Card de descarga de los archivos
//archivo viene con "nombre", "enlace", "ext" extension
function FileCard(archivo){
return( 
	`
	<div>
		<h2>${archivo.nombre}</h2>
			${archivo.html}
		<button>Descargar ${archivo.ext}</button>
	</div>
	`
	)
}


//Separa el nombre del archivo y su extension
function RemoveExtra(texto){
	let temp = texto.split(".")
	let salida = ""

	for (z = 0; z < temp.length-1; z++){salida += temp[z]}
	
	return {"FileName":salida,"ext": temp[temp.length-1]}
}


//Genera la lista de archivos en Html
function lista(myList, idDestino = "info"){
	for(var i=0;i<myList.length;i++){
		 document.getElementById(idDestino).innerHTML += FileCard(myList[i])
    }
}

//Recupera la pagina del server que genera la lista de archivos
function getFilePage(destino){

	let ur = window.location.href.split("/")
	let url = window.location.href.replace(ur[ur.length-1], "") + destino
	
	var req = new XMLHttpRequest();  
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
						"ext"   :rem.ext,
						"html"  :listaDeEnlaces[i].outerHTML,
						}
					)
	}
return listaDeArchivos
}

