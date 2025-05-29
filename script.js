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
  // Remover selección previa
  document.querySelectorAll('.le-chatelier').forEach(btn => {
    btn.classList.remove('selected');
  });
  
  // Seleccionar el botón clickeado
  event.target.classList.add('selected');
  
  const tipo = document.getElementById('tipoReaccion').value;
  let explicacion = '';
  let tipoTexto = tipo === 'exotermica' ? 'Exotérmica' : 'Endotérmica';
  
  switch(accion) {
    case 'reactivo':
      explicacion = 'Al aumentar un reactivo, el sistema se desplaza hacia los productos para contrarrestar el cambio (Principio de Le Chatelier).';
      break;
    case 'producto':
      explicacion = 'Al aumentar un producto, el equilibrio se desplaza hacia los reactivos para restablecer el equilibrio.';
      break;
    case 'temperatura':
      explicacion = tipo === 'exotermica' 
        ? 'En reacciones exotérmicas (liberan calor), al aumentar la temperatura el equilibrio se desplaza hacia los reactivos (←) para absorber el exceso de calor.'
        : 'En reacciones endotérmicas (absorben calor), al aumentar la temperatura el equilibrio se desplaza hacia los productos (→) para utilizar el calor añadido.';
      break;
    case 'presion':
      explicacion = 'Efecto sobre el equilibrio:<br><br>'
        + '• Aumentar presión: el sistema se desplaza hacia el lado con menos moles gaseosos<br>'
        + '• Disminuir presión: el sistema se desplaza hacia el lado con más moles gaseosos<br><br>'
        + 'Solo aplica cuando hay sustancias gaseosas y difiere el número de moles entre reactivos y productos.';
      break;
    case 'catalizador':
      explicacion = 'Los catalizadores no afectan la posición del equilibrio:<br><br>'
        + '• Aceleran igualmente las reacciones directa e inversa<br>'
        + '• Permiten alcanzar el equilibrio más rápido<br>'
        + '• No modifican el valor de Kc';
      break;
  }
  
  const divExplicacion = document.getElementById('explicacion');
  divExplicacion.innerHTML = `
    <h3>
      ${accion.replace(/\b\w/g, l => l.toUpperCase())} 
      <span class="reaccion-indicator">${tipoTexto}</span>
    </h3>
    <p>${explicacion}</p>
  `;
  divExplicacion.style.display = 'block';
}
