
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            let valido = true;


            document.getElementById('errorEmail').textContent = '';
            document.getElementById('errorPass').textContent = '';


            if (!email) {
                document.getElementById('errorEmail').textContent = 'El correo es obligatorio';
                valido = false;
            } else if (!email.includes('@')) {
                document.getElementById('errorEmail').textContent = 'Ingresa un correo válido';
                valido = false;
            }


            if (!password) {
                document.getElementById('errorPass').textContent = 'La contraseña es obligatoria';
                valido = false;
            }

            if (valido) {

                localStorage.setItem('usuarioLogueado', email);
                alert('¡Bienvenido de vuelta!');
                window.location.href = 'Buscar.html';
            }
        });