document.addEventListener('DOMContentLoaded', function() {
  // Cargar ejemplo al hacer clic
  document.getElementById('cargarEjemplo').addEventListener('click', cargarEjemplo);
  
  // Calcular Kc al hacer clic
  document.getElementById('calcular').addEventListener('click', calcularKc);
  
  // Eventos para Le Chatelier
  document.querySelectorAll('.le-chatelier').forEach(button => {
    button.addEventListener('click', function() {
      explicar(this.dataset.accion);
    });
  });
});

function cargarEjemplo() {
  document.getElementById('a').value = 1;
  document.getElementById('b').value = 3;
  document.getElementById('c').value = 2;
  document.getElementById('d').value = 0;
  
  document.getElementById('A').value = 0.5;
  document.getElementById('B').value = 1.5;
  document.getElementById('C').value = 0.2;
  document.getElementById('D').value = 0;
  
  document.getElementById('tipoReaccion').value = 'exotermica';
  
  // Mostrar mensaje
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '<p>Ejemplo de síntesis de amoníaco cargado. Complete cualquier campo vacío antes de calcular.</p>';
  resultado.style.display = 'block';
}

// Al cargar la página, dejamos todo vacío
document.addEventListener('DOMContentLoaded', function() {
  // Limpiar todos los campos
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
  });

function calcularKc() {
  // Obtener valores
  const a = parseInt(document.getElementById('a').value) || 1;
  const b = parseInt(document.getElementById('b').value) || 1;
  const c = parseInt(document.getElementById('c').value) || 1;
  const d = parseInt(document.getElementById('d').value) || 0;
  
  const A = parseFloat(document.getElementById('A').value) || 0;
  const B = parseFloat(document.getElementById('B').value) || 0;
  const C = parseFloat(document.getElementById('C').value) || 0;
  const D = parseFloat(document.getElementById('D').value) || 0;

  // Validación básica
  if (A < 0 || B < 0 || C < 0 || D < 0) {
    alert('Las concentraciones no pueden ser negativas');
    return;
  }

  // Calcular Kc
  const numerador = Math.pow(C, c) * Math.pow(D, d);
  const denominador = Math.pow(A, a) * Math.pow(B, b);
  const Kc = numerador / denominador;

  // Mostrar resultado
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <h3>Resultado del cálculo</h3>
    <p><strong>Fórmula:</strong> Kc = [C]<sup>${c}</sup> × [D]<sup>${d}</sup> / [A]<sup>${a}</sup> × [B]<sup>${b}</sup></p>
    <p><strong>Sustitución:</strong> (${C}<sup>${c}</sup> × ${D}<sup>${d}</sup>) / (${A}<sup>${a}</sup> × ${B}<sup>${b}</sup>)</p>
    <p><strong>Kc = ${Kc.toFixed(3)}</strong></p>
    <p>${interpretarKc(Kc)}</p>
  `;
  resultado.style.display = 'block';
}

function interpretarKc(Kc) {
  if (Kc > 1) return 'Kc > 1: En el equilibrio predominan los productos.';
  if (Kc < 1) return 'Kc < 1: En el equilibrio predominan los reactivos.';
  return 'Kc = 1: Concentraciones similares de reactivos y productos en el equilibrio.';
}

function explicar(accion) {
  const tipo = document.getElementById('tipoReaccion').value;
  let explicacion = '';
  
  switch(accion) {
    case 'reactivo':
      explicacion = 'Al aumentar un reactivo, el sistema se desplaza hacia los productos para contrarrestar el cambio.';
      break;
    case 'producto':
      explicacion = 'Al aumentar un producto, el equilibrio se desplaza hacia los reactivos.';
      break;
    case 'temperatura':
      explicacion = tipo === 'exotermica' 
        ? 'En reacciones exotérmicas, al aumentar temperatura el equilibrio se desplaza hacia los reactivos (absorbe calor).'
        : 'En reacciones endotérmicas, al aumentar temperatura el equilibrio se desplaza hacia los productos (utiliza calor).';
      break;
    case 'presion':
      explicacion = 'La presión solo afecta si hay gases. El sistema se desplaza hacia el lado con menos moles gaseosos.';
      break;
    case 'catalizador':
      explicacion = 'Los catalizadores aceleran la reacción pero no modifican la posición del equilibrio.';
      break;
  }
  
  const divExplicacion = document.getElementById('explicacion');
  divExplicacion.innerHTML = `<h3>Efecto de ${accion}:</h3><p>${explicacion}</p>`;
  divExplicacion.style.display = 'block';
}
