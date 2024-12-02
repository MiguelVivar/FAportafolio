const navegador = document.querySelector('#navegador');

const navegadorOffsetTop = navegador.offsetTop;

// Función que maneja el scroll
const handleScroll = () => {
    if (window.scrollY >= navegadorOffsetTop) {
        navegador.classList.add('sticky');
        navegador.classList.remove('container');
    } else {
        navegador.classList.remove('sticky');
        navegador.classList.add('container');
    }
};

window.addEventListener('scroll', handleScroll);

// Validador Formulario
document.addEventListener('DOMContentLoaded', function(){

    const email = {
        nombre: '',
        email: '',
        mensaje: ''
    }

    const inputNombre = document.querySelector('#nombre');
    const inputEmail = document.querySelector('#email');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validar)
    inputNombre.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        resetearFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();
        if (Object.values(email).includes('')) {
            return;
        }
        
        spinner.classList.add('is-flex');
        spinner.classList.remove('is-hidden');
    
        setTimeout(() => {
            spinner.classList.remove('is-flex');
            spinner.classList.add('is-hidden');
    
            resetearFormulario();
    
            // Mensaje de envio
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green', 'text-white', 'p-2', 'ta-center', 'mt-10', 'fw-bold', 'is-uppercase');
            alertaExito.textContent = 'El mensaje se envió correctamente';
    
            const referencia = inputMensaje.parentElement;
            referencia.insertAdjacentElement('afterend', alertaExito);

    
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
    
        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.id] = e.target.value.trim().toLowerCase();

        comprobarEmail();
    };

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // Alerta HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red', 'text-white', 'p-2', 'ta-center')

        referencia.appendChild(error);

    };

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email); 
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetearFormulario() {
        email.email = '';
        email.nombre = '';
        email.mensaje = '';
        
        formulario.reset();
        comprobarEmail();
    }
});

// Enviar correos
function enviarCorreo() {
    const correoURL = "mailto:correo@correo.com?subject=Consulta&body=";
    window.location.href = correoURL;
}

// Burger
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navegador = document.querySelector('.navegador');
    burgerMenu.addEventListener('click', () => {
        navegador.classList.toggle('active');
        burgerMenu.textContent = burgerMenu.textContent === '☰' ? '✖' : '☰';
    });
});