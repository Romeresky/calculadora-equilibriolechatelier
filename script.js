function validarFormulario() {
  const ids = ['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'];
  for (let id of ids) {
    const valor = parseFloat(document.getElementById(id).value);
    if (isNaN(valor) || valor <= 0) {
      alert(`El valor de "${id}" debe ser un número positivo.`);
      return false;
    }
  }
  return true;
}

function calcularKcAvanzado() {
  if (!validarFormulario()) return;

  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);
  const d = parseFloat(document.getElementById('d').value);
  const A = parseFloat(document.getElementById('A').value);
  const B = parseFloat(document.getElementById('B').value);
  const C = parseFloat(document.getElementById('C').value);
  const D = parseFloat(document.getElementById('D').value);

  const numerador = Math.pow(C, c) * Math.pow(D, d);
  const denominador = Math.pow(A, a) * Math.pow(B, b);
  const Kc = numerador / denominador;

  const resultado = `
    <strong>Kc = [C]^${c} × [D]^${d} / [A]^${a} × [B]^${b}</strong><br>
    Sustituyendo: (${C}^${c} × ${D}^${d}) / (${A}^${a} × ${B}^${b})<br>
    Resultado: <strong>Kc = ${Kc.toFixed(3)}</strong><br>
    <small>Nota: Kc es adimensional (mol/L se simplifica).</small>
  `;

  document.getElementById('resultado').innerHTML = resultado;
  document.getElementById('imagen-bulbasaur').style.display = 'block';

}


function explicar(caso) {
  const tipo = document.getElementById('tipoReaccion').value;
  let texto = '';
  let animationClass = '';

  switch (caso) {
    case 'aumentaReactivo':
      texto = 'Al aumentar un reactivo, el sistema favorece la formación de productos para contrarrestar el cambio.';
      animationClass = 'shift-right';
      break;
    case 'aumentaProducto':
      texto = 'Al aumentar un producto, el equilibrio se desplaza hacia los reactivos.';
      animationClass = 'shift-left';
      break;
    case 'aumentaTemperatura':
      texto = tipo === 'exotermica'
        ? 'En una reacción exotérmica, aumentar la temperatura favorece a los reactivos (←). El sistema absorbe el calor añadido.'
        : 'En una reacción endotérmica, aumentar la temperatura favorece a los productos (→). El sistema utiliza el calor añadido.';
      animationClass = tipo === 'exotermica' ? 'shift-left' : 'shift-right';
      break;
    case 'presion':
      texto = 'Un cambio de presión solo afecta si hay gases y diferente número de moles. El sistema se desplaza hacia el lado con menor cantidad de moles gaseosos.';
      break;
    case 'catalizador':
      texto = 'Un catalizador no afecta el equilibrio, solo acelera la velocidad para alcanzarlo.';
      break;
  }

  const explicacionDiv = document.getElementById('explicacion');
  explicacionDiv.innerHTML = texto;
  
  // Aplicar animación si corresponde
  if (animationClass) {
    explicacionDiv.classList.remove('shift-left', 'shift-right');
    void explicacionDiv.offsetWidth; // Trigger reflow
    explicacionDiv.classList.add(animationClass);
  }
}

function cargarEjemploAvanzado() {
  // Ejemplo realista: síntesis de amoníaco
  document.getElementById('a').value = 1;    // N₂
  document.getElementById('b').value = 3;    // 3H₂
  document.getElementById('c').value = 2;    // 2NH₃
  document.getElementById('d').value = 0;    // No hay "d" en este caso
  document.getElementById('A').value = 0.5;  // [N₂]
  document.getElementById('B').value = 1.5;  // [H₂]
  document.getElementById('C').value = 0.2;  // [NH₃]
  document.getElementById('D').value = 0;    // No aplica
  document.getElementById('tipoReaccion').value = 'exotermica';
  
  // Calcular automáticamente para el ejemplo
  calcularKcAvanzado();
}
