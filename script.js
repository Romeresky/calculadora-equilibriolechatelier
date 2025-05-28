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
  // Ejemplo: Síntesis de amoníaco (N₂ + 3H₂ ⇌ 2NH₃)
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
  resultado.innerHTML = '<p class="success-message">Ejemplo de síntesis de amoníaco cargado correctamente. Haz clic en "Calcular Kc" para ver el resultado.</p>';
  resultado.style.display = 'block';
}

function calcularKc() {
  // Obtener valores
  const a = parseInt(document.getElementById('a').value) || 0;
  const b = parseInt(document.getElementById('b').value) || 0;
  const c = parseInt(document.getElementById('c').value) || 0;
  const d = parseInt(document.getElementById('d').value) || 0;
  
  const A = parseFloat(document.getElementById('A').value) || 0;
  const B = parseFloat(document.getElementById('B').value) || 0;
  const C = parseFloat(document.getElementById('C').value) || 0;
  const D = parseFloat(document.getElementById('D').value) || 0;

  // Validación
  if (a <= 0 || b <= 0 || c <= 0) {
    alert('Los coeficientes estequiométricos deben ser mayores que 0');
    return;
  }

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
    <p class="result-value">Kc = ${Kc.toFixed(3)}</p>
    <p>${interpretarKc(Kc)}</p>
  `;
  resultado.style.display = 'block';
  
  // Mostrar imagen de Bulbasaur
  mostrarBulbasaur();
}

function interpretarKc(Kc) {
  if (Kc > 1) return 'Kc > 1: En el equilibrio predominan los productos.';
  if (Kc < 1) return 'Kc < 1: En el equilibrio predominan los reactivos.';
  return 'Kc ≈ 1: Concentraciones similares de reactivos y productos en el equilibrio.';
}

function mostrarBulbasaur() {
  const container = document.createElement('div');
  container.className = 'bulbasaur-container';
  container.innerHTML = `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" 
         alt="Bulbasaur celebrando el equilibrio químico" 
         class="bulbasaur-img">
    <p>¡Equilibrio alcanzado! 🎉</p>
  `;
  
  const resultado = document.getElementById('resultado');
  resultado.appendChild(container);
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
