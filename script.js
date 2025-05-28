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
}

function explicar(caso) {
  const tipo = document.getElementById('tipoReaccion').value;
  let texto = '';

  switch (caso) {
    case 'aumentaReactivo':
      texto = 'Al aumentar un reactivo, el sistema favorece la formación de productos para contrarrestar el cambio.';
      break;
    case 'aumentaProducto':
      texto = 'Al aumentar un producto, el equilibrio se desplaza hacia los reactivos.';
      break;
    case 'aumentaTemperatura':
      texto = tipo === 'exotermica'
        ? 'En una reacción exotérmica, aumentar la temperatura favorece a los reactivos.'
        : 'En una reacción endotérmica, aumentar la temperatura favorece a los productos.';
      break;
    case 'presion':
      texto = 'Un cambio de presión solo afecta si hay gases y diferente número de moles. El sistema se desplaza hacia el lado con menor cantidad de moles gaseosos.';
      break;
    case 'catalizador':
      texto = 'Un catalizador no afecta el equilibrio, solo acelera la velocidad para alcanzarlo.';
      break;
  }

  document.getElementById('explicacion').innerHTML = texto;
}

function cargarEjemploAvanzado() {
  document.getElementById('a').value = 1;
  document.getElementById('b').value = 1;
  document.getElementById('c').value = 1;
  document.getElementById('d').value = 1;
  document.getElementById('A').value = 1.0;
  document.getElementById('B').value = 1.0;
  document.getElementById('C').value = 2.0;
  document.getElementById('D').value = 2.0;
  document.getElementById('tipoReaccion').value = 'exotermica';
}
