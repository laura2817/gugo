
function modal_login(){

return (`
<style>
@import url(https://fonts.googleapis.com/css?family=Roboto);

#modal_login{
  background-color: rgba(30, 30, 30, 0.8);
  position:absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  z-index: 6000;
}

.loginmodal-container {
  z-index: 6010;
  position: absolute;
  top: 50%;  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  max-width: 380px;
  width: 100% !important;

  background-color: #F7F7F7;
  margin: 0 auto;

  border: 1px solid #000000;
  border-radius: 10px;
  
  overflow: hidden;
  font-family: roboto;
}

.loginmodal-container h1 {
  text-align: center;
  font-size: 1.8em;
  font-family: roboto;
}

.loginmodal-container p {
  text-align: center;
  font-size: 1em;
  font-family: roboto;
}

.loginmodal-container input[type=submit] {
  width: 80%;
  display: block;
  margin: auto;
  margin-bottom: 15px;
  margin-top: 15px;
  position: relative;
}

.loginmodal-container input[type=text], input[type=password] {
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  border-radius: 5px;
  padding: 0 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.loginmodal-container input[type=text]:hover, input[type=password]:hover {
  border: 1px solid #b9b9b9;
  border-top: 1px solid #a0a0a0;
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.loginmodal-submit {
  border: 0px;
  border-radius: 5px;
  text-shadow: 0 5px rgba(0,0,0,0.1); 
  color: rgb(210, 210, 210);
  background-color: rgb(196, 26, 45);
  padding: 17px 0px;
  font-family: roboto;
  font-size: 14px;
}

.loginmodal-container a {
  text-decoration: none;
  color: #666;
  font-weight: 400;
  text-align: center;
  display: inline-block;
  opacity: 0.6;
} 

.login-help{
  font-size: 14px;
}

</style>

<div class="loginmodal-container">
	<h1>Inicio de sesión</h1>
	<p>para acceder a nuestro contenido <br> 
		debes tener una cuenta </p>
				  
	<form id:"login_form">
		<input id="login_user"   type="text" 		name="user"  placeholder="Usuario">
		<input id="login_pass"   type="password" 	name="pass"  placeholder="Clave">
		<input id="login_button"  type="submit" 	name="login" class="login loginmodal-submit" value="Iniciar Sesión">
	</form>
	
	<div class="login-help">
		<a href="#">Crear cuenta</a> - <a href="#">Olvide mi clave</a>
	</div>
  <script>
  $("#modal_login").animatedModal();
</script>
</div>

`)}
const usuarios = {
	user: "pedro" , pass : "123" , level: "NIVEL X"
}

existe_sesion()

function auth(e){
	e.preventDefault()
	existe_sesion()
	sesion()
}

function login(){
if (!existe_sesion()){
	let div = document.createElement('div');
		div.id = 'modal_login'
		div.innerHTML = modal_login()

    		 div.addEventListener('click',   hide_login ,false);
		document.addEventListener('keydown', hide_login, false)

		document.getElementsByTagName("body")[0].prepend(div);

		document.getElementById("login_button").addEventListener("click", auth, false)
	}else{
		log_out()
	}
}


function hide_login(e){
	let div_login = document.getElementById("modal_login");

	if (div_login && (e.keyCode === 27 || e.target === this || e === "login")){

 		 document.removeEventListener("click"  , auth       , false)
 		 document.removeEventListener('keydown', hide_login , false)
		div_login.removeEventListener('click'  , hide_login , false)
		div_login.remove()

	}
}

function sesion(){
	if (!existe_sesion()){
		let user = document.getElementById("login_user").value;
		let pass = document.getElementById("login_pass").value;
		
		if (checkUser(usuarios,user,pass)){
			sessionStorage.setItem('sesion', 'valida');
			sessionStorage.setItem('user', user);
			sessionStorage.setItem('permiso', usuarios.level);
		}else{
			alert("Nombre de usuario o contraseña erroneos")
		}
	}
    existe_sesion()
    hide_login("login")
}

function existe_sesion(){
let sesion_ = document.getElementById("inicio_de_sesion")
sesion_.addEventListener('click', login, false)

	if(sessionStorage.getItem('sesion')){
		sesion_.innerHTML = "Cerrar sesión"
		return true;
	}else{
		sesion_.innerHTML = "Iniciar sesión"
		return false
	}
		
}

function log_out(){
	sessionStorage.removeItem('sesion')
	sessionStorage.removeItem('user')
	sessionStorage.removeItem('permiso')
	existe_sesion()
}

function checkUser(json, us, cl){
	//aca se deberia hacer una llamada a la Api de usuarios
	return (json.user == us && json.pass == cl );
}

