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

  // script.js - Nuevas funciones
function toggleModoCalculo() {
  const modo = document.getElementById('modo-calculadora').value;
  const seccionPresion = document.getElementById('seccion-presion');
  const seccionTemperatura = document.getElementById('seccion-temperatura');
  
  if (modo === 'kp') {
    seccionPresion.style.display = 'block';
    seccionTemperatura.style.display = 'block';
    document.getElementById('unidades-k').textContent = '(atm)';
  } else {
    seccionPresion.style.display = 'none';
    seccionTemperatura.style.display = 'none';
    document.getElementById('unidades-k').textContent = '(mol/L)';
  }
}

function calcularConstante() {
  const modo = document.getElementById('modo-calculadora').value;
  
  if (modo === 'kc') {
    calcularKc();
  } else {
    calcularKp();
  }
}

function calcularKp() {
  // Obtener valores base para Kc
  const Kc = calcularKc(true); // true para retornar valor sin mostrar
  
  // Obtener parámetros adicionales
  const temperatura = parseFloat(document.getElementById('temperatura').value) + 273.15; // Convertir a Kelvin
  const deltaN = calcularDeltaN();
  
  // Calcular Kp
  const R = 0.0821; // Constante de los gases (atm·L/mol·K)
  const Kp = Kc * Math.pow(R * temperatura, deltaN);
  
  // Mostrar resultado
  document.getElementById('resultado').innerHTML += `
    <h3>Resultado para Kp</h3>
    <p>Δn = ${deltaN}</p>
    <p>Kp = Kc × (RT)<sup>Δn</sup> = ${Kc.toFixed(3)} × (0.0821 × ${temperatura.toFixed(2)})<sup>${deltaN}</sup></p>
    <p class="result-value">Kp = ${Kp.toFixed(3)} atm</p>
  `;
}

function calcularDeltaN() {
  const a = parseInt(document.getElementById('a').value) || 0;
  const b = parseInt(document.getElementById('b').value) || 0;
  const c = parseInt(document.getElementById('c').value) || 0;
  const d = parseInt(document.getElementById('d').value) || 0;
  
  return (c + d) - (a + b); // moles productos - moles reactivos
}

  // Nuevo en script.js
function manejarFases() {
  const fases = {
    A: document.getElementById('fase-A').value,
    B: document.getElementById('fase-B').value,
    C: document.getElementById('fase-C').value,
    D: document.getElementById('fase-D').value
  };
  
  let expresionK = '';
  let numerador = 1;
  let denominador = 1;
  
  // Construir expresión de K
  if (fases.C !== 's' && fases.C !== 'l') {
    const c = parseInt(document.getElementById('c').value) || 1;
    expresionK += `[C]<sup>${c}</sup>`;
    numerador *= Math.pow(parseFloat(document.getElementById('C').value) || 0, c);
  }
  
  if (fases.D !== 's' && fases.D !== 'l' && document.getElementById('d').value > 0) {
    const d = parseInt(document.getElementById('d').value) || 1;
    expresionK += expresionK ? ` × [D]<sup>${d}</sup>` : `[D]<sup>${d}</sup>`;
    numerador *= Math.pow(parseFloat(document.getElementById('D').value) || 0, d);
  }
  
  expresionK += ' / ';
  
  if (fases.A !== 's' && fases.A !== 'l') {
    const a = parseInt(document.getElementById('a').value) || 1;
    expresionK += `[A]<sup>${a}</sup>`;
    denominador *= Math.pow(parseFloat(document.getElementById('A').value) || 0, a);
  }
  
  if (fases.B !== 's' && fases.B !== 'l') {
    const b = parseInt(document.getElementById('b').value) || 1;
    expresionK += expresionK.includes('/ [A]') ? ` × [B]<sup>${b}</sup>` : `[B]<sup>${b}</sup>`;
    denominador *= Math.pow(parseFloat(document.getElementById('B').value) || 0, b);
  }
  
  const K = numerador / denominador;
  
  return {
    expresion: expresionK,
    valor: K
  };
}
  
function explicarPresion() {
  const deltaN = calcularDeltaN();
  let explicacion = '';
  
  if (deltaN === 0) {
    explicacion = 'No hay efecto: el número de moles gaseosos es igual en ambos lados.';
  } else {
    const lado = deltaN < 0 ? 'productos' : 'reactivos';
    explicacion = `Al aumentar presión, el equilibrio se desplaza hacia los ${lado} (${Math.abs(deltaN)} menos moles gaseosos).`;
  }
  
  document.getElementById('explicacion').innerHTML = `
    <h3>Efecto de Presión</h3>
    <p>Δn(gas) = ${deltaN}</p>
    <p>${explicacion}</p>
  `;
}

  function calcularQ() {
  const valores = obtenerValores();
  const Q = manejarFases(valores).valor;
  let mensaje = `Q = ${Q.toFixed(3)}`;
  
  if (KcCalculado) {
    if (Q > Kc) mensaje += ' (Q > Kc, la reacción procederá hacia los reactivos)';
    else if (Q < Kc) mensaje += ' (Q < Kc, la reacción procederá hacia los productos)';
    else mensaje += ' (Q = Kc, el sistema está en equilibrio)';
  }
  
  mostrarResultado(mensaje);
}
  
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

function convertirAKp() {
  if (!KcCalculado) {
    alert('Primero calcule Kc');
    return;
  }
  const temperatura = parseFloat(prompt('Ingrese temperatura en Kelvin:'));
  const deltaN = calcularDeltaN();
  const Kp = Kc * Math.pow(0.0821 * temperatura, deltaN);
  mostrarResultado(`Kp = ${Kp.toFixed(3)} atm`);
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
