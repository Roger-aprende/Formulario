//Profit
let formulario = document.getElementById('formulario');
let inputs = document.querySelectorAll('#formulario input');






//==================================
// =====Expresiones regulares =====
//==================================

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}



//========================================
// =====validación de formulario =========
//========================================


const validarFormulario = (e) =>{
    switch(e.target.name){
        case "usuario":
            compruebaEstado(expresiones.usuario, e.target ,"usuario");
        break;

        case "nombre":
            compruebaEstado(expresiones.nombre, e.target ,"nombre");
        break;

        case "password":
            compruebaEstado(expresiones.password, e.target ,"password");
            validarPassword();
        break;

        case "password2":
            validarPassword();
        break;

        case "correo":
            compruebaEstado(expresiones.correo, e.target ,"correo");
        break;

        case "telefono":
            compruebaEstado(expresiones.telefono, e.target ,"telefono");
        break;


    }
}

const compruebaEstado = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} p`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    }else{
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__correcto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__incorrecto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} p`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword = () =>{
    const password = document.querySelector('#password');
    const password2 = document.querySelector('#password2');

    if(password.value !== password2.value){
        document.getElementById(`grupo__password2`).classList.remove('formulario__correcto');
        document.getElementById(`grupo__password2`).classList.add('formulario__incorrecto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 p`).classList.add('formulario__input-error-activo');
        campos[password] = false;
    }else{
        document.getElementById(`grupo__password2`).classList.add('formulario__correcto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__incorrecto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 p`).classList.remove('formulario__input-error-activo');
        campos[password] = true;
    }
}





//==================================
// =====Escucha de eventos =========
//==================================

inputs.forEach( input =>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);

});



//========================================================
// ===== VAlidacion de los datos del formulario =========
//===============================================


formulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    const terminos = document.querySelector('#terminos');
   
//con el metodo checked, verificamos si un checkbox esta selecionado
//en caso que si devuelve true en caso que no devolvera false
    if(campos[usuario] && campos[nombre] && campos[password] && campos[correo] && campos[telefono] && terminos.checked){
        formulario.reset();
        
        document.querySelector('#formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

        setTimeout(() => {
            document.querySelector('#formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
    }
    
    else{
        document.querySelector('#formulario__mensaje').classList.add('formulario__mensaje-error-activo');
    }
});



