//Genera lista de descargables
//Lee todos los archivos de la carpeta y genera las cards de descargas.

lista(getServerFileList(getFilePage('descargas/')),"file_list")



//Genera las Card de descarga de los archivos
//archivo viene con "nombre", "enlace", "ext" extension
function FileCard(archivo){
console.log("card")


return( 
	`
	<article class="material__art">
                    <img class="material__img" src="./img/icon/descargas/icono__${archivo.ext}.png" alt="audio-img">
                    <div class="material__art--div">
                        <h3 class="material__name title">${archivo.nombre}</h3>
                        <p class="material__description text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus porro officiis sed fugiat eum facere, at a?</p>
                    </div>
                    <div class="material__art--level">
                        <button class="material__level text">Nivel 1</button>
                        <button class="material__download text">Descargar ${archivo.ext}</button>
                    </div>
                </article>
	
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
function lista(myList, idDestino = "file_list"){
	destino = document.getElementById(idDestino)
	destino.innerHTML=""
	for(var i=0;i<myList.length;i++){
		 destino.innerHTML += FileCard(myList[i])
    }
}

//Recupera la pagina del server que genera la lista de archivos
function getFilePage(destino){

	let ur = window.location.href.split("/")
	let url = window.location.href.replace(ur[ur.length-1], "") + destino
	
	console.log(url)
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
						"ext"   :rem.ext.substring(0,3),
						"html"  :listaDeEnlaces[i].outerHTML,
						}
					)
					console.log(rem.ext.substring(0,3))
	}
return listaDeArchivos
}

