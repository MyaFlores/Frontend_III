document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("registroForm");

    formulario.addEventListener("submit", function(event) {
        // Evitamos que la página se recargue al enviar
        event.preventDefault();

        // 1. Obtener los valores de los campos
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;
        const repetirPassword = document.getElementById("repetirPassword").value;
        const terminos = document.getElementById("terminos").checked;
        
        // Obtener género seleccionado
        const generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;

        // 2. Validaciones
        if (password !== repetirPassword) {
            alert("Error: Las contraseñas no coinciden.");
            return; // Detenemos la ejecución
        }

        if (password.length < 6) {
            alert("Error: La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (!terminos) {
            alert("Debes aceptar los Términos y Condiciones.");
            return;
        }

        // 3. Si todo está bien, creamos el objeto alumno
        const alumno = {
            nombre: nombre,
            correo: correo,
            genero: generoSeleccionado,
            // Nota: En un sistema real, NUNCA guardes la contraseña en texto plano.
            // Aquí es solo para fines académicos de simulación.
            password: "********" 
        };

        // 4. Simular el registro exitoso
        console.log("Registrando alumno...", alumno);
        alert(`¡Registro exitoso!\nBienvenido/a ${alumno.nombre}`);

        // Opcional: Limpiar el formulario
        // formulario.reset();
    });
});