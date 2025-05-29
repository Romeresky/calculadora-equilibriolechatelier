document.addEventListener('DOMContentLoaded', function() {
  // Event listeners
  document.getElementById('cargarEjemplo').addEventListener('click', cargarEjemploAvanzado);
  document.getElementById('calcular').addEventListener('click', calcularConstante);
  
  // Eventos para Le Chatelier
  document.querySelectorAll('.le-chatelier').forEach(button => {
    button.addEventListener('click', function() {
      explicar(this.dataset.accion);
    });
  });
});

// Función para cambiar entre modos Kc y Kp
function toggleModoCalculo() {
  const modo = document.getElementById('modo-calculadora').value;
  const seccionPresion = document.getElementById('seccion-presion');
  const unidadesK = document.getElementById('unidades-k');
  const unidadesConc = document.getElementById('unidades-concentracion');
  
  if (modo === 'kp') {
    seccionPresion.style.display = 'block';
    unidadesK.textContent = 'Kp';
    unidadesConc.textContent = '(atm)';
  } else {
    seccionPresion.style.display = 'none';
    unidadesK.textContent = 'Kc';
    unidadesConc.textContent = '(mol/L)';
  }
}

// Función principal de cálculo
function calcularConstante() {
  const modo = document.getElementById('modo-calculadora').value;
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = '';
  
  // Validación básica
  if (!validarDatos()) return;
  
  // Calcular según el modo
  if (modo === 'kc') {
    calcularKc();
  } else {
    calcularKp();
  }
  
  // Mostrar imagen de Bulbasaur
  document.getElementById('bulbasaur-container').style.display = 'block';
}

// Función para calcular Kc
function calcularKc(soloValor = false) {
  const { expresion, valor: Kc } = manejarFases();
  
  if (soloValor) return Kc;
  
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
    <h3>Resultado para Kc</h3>
    <p><strong>Expresión:</strong> Kc = ${expresion}</p>
    <p class="result-value">Kc = ${Kc.toFixed(3)}</p>
    <p>${interpretarKc(Kc)}</p>
  `;
  
  return Kc;
}

// Función para calcular Kp
function calcularKp() {
  const Kc = calcularKc(true);
  const temperatura = parseFloat(document.getElementById('temperatura').value) + 273.15; // Convertir a Kelvin
  const deltaN = calcularDeltaN();
  const R = 0.0821; // Constante de los gases
  
  const Kp = Kc * Math.pow(R * temperatura, deltaN);
  
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML += `
    <h3>Resultado para Kp</h3>
    <p>Δn = ${deltaN} (moles productos - moles reactivos gaseosos)</p>
    <p>Kp = Kc × (RT)<sup>Δn</sup> = ${Kc.toFixed(3)} × (0.0821 × ${temperatura.toFixed(2)})<sup>${deltaN}</sup></p>
    <p class="result-value">Kp = ${Kp.toFixed(3)} atm</p>
  `;
}

// Función para manejar fases químicas
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
  
  // Construir expresión para productos (numerador)
  if (fases.C !== 's' && fases.C !== 'l') {
    const c = parseInt(document.getElementById('c').value) || 1;
    expresionK += `[C]<sup>${c}</sup>`;
    numerador *= Math.pow(parseFloat(document.getElementById('C').value) || 0, c);
  }
  
  if (fases.D !== 's' && fases.D !== 'l' && parseInt(document.getElementById('d').value) > 0) {
    const d = parseInt(document.getElementById('d').value) || 1;
    expresionK += expresionK ? ` × [D]<sup>${d}</sup>` : `[D]<sup>${d}</sup>`;
    numerador *= Math.pow(parseFloat(document.getElementById('D').value) || 0, d);
  }
  
  expresionK += expresionK ? ' / ' : '1 / ';
  
  // Construir expresión para reactivos (denominador)
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
  
  // Manejar caso cuando no hay componentes en la fase gaseosa/acuo
  if (numerador === 1 && denominador === 1) {
    return {
      expresion: "No aplica (solo sólidos/líquidos puros)",
      valor: 1
    };
  }
  
  const K = denominador !== 0 ? numerador / denominador : Infinity;
  
  return {
    expresion: expresionK || "1",
    valor: K
  };
}

// Función para calcular Δn (moles productos - moles reactivos)
function calcularDeltaN() {
  const fases = {
    A: document.getElementById('fase-A').value,
    B: document.getElementById('fase-B').value,
    C: document.getElementById('fase-C').value,
    D: document.getElementById('fase-D').value
  };
  
  let molesReactivos = 0;
  let molesProductos = 0;
  
  if (fases.A === 'g') molesReactivos += parseInt(document.getElementById('a').value) || 0;
  if (fases.B === 'g') molesReactivos += parseInt(document.getElementById('b').value) || 0;
  if (fases.C === 'g') molesProductos += parseInt(document.getElementById('c').value) || 0;
  if (fases.D === 'g') molesProductos += parseInt(document.getElementById('d').value) || 0;
  
  return molesProductos - molesReactivos;
}

// Función para cargar ejemplo
function cargarEjemploAvanzado() {
  // Ejemplo: Síntesis de amoníaco (N₂ + 3H₂ ⇌ 2NH₃)
  document.getElementById('a').value = 1;
  document.getElementById('fase-A').value = 'g';
  document.getElementById('b').value = 3;
  document.getElementById('fase-B').value = 'g';
  document.getElementById('c').value = 2;
  document.getElementById('fase-C').value = 'g';
  document.getElementById('d').value = 0;
  
  document.getElementById('A').value = 0.5;
  document.getElementById('B').value = 1.5;
  document.getElementById('C').value = 0.2;
  document.getElementById('D').value = 0;
  
  document.getElementById('tipoReaccion').value = 'exotermica';
  document.getElementById('temperatura').value = 25;
  
  // Mostrar mensaje
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '<p class="success-message">Ejemplo de síntesis de amoníaco cargado. Haz clic en "Calcular" para ver resultados.</p>';
  resultado.style.display = 'block';
}

// Función para interpretar valor de Kc
function interpretarKc(Kc) {
  if (Kc > 1) return 'Kc > 1: En el equilibrio predominan los productos.';
  if (Kc < 1) return 'Kc < 1: En el equilibrio predominan los reactivos.';
  return 'Kc ≈ 1: Concentraciones similares de reactivos y productos.';
}

// Función para explicar Le Chatelier
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
      const deltaN = calcularDeltaN();
      if (deltaN === 0) {
        explicacion = 'No hay efecto: el número de moles gaseosos es igual en ambos lados.';
      } else {
        const lado = deltaN < 0 ? 'productos' : 'reactivos';
        explicacion = `Al aumentar presión, el equilibrio se desplaza hacia los ${lado} (${Math.abs(deltaN)} menos moles gaseosos).`;
      }
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

// Función de validación
function validarDatos() {
  const a = parseInt(document.getElementById('a').value);
  const b = parseInt(document.getElementById('b').value);
  const c = parseInt(document.getElementById('c').value);
  
  if (a <= 0 || b <= 0 || c <= 0) {
    alert('Los coeficientes estequiométricos deben ser mayores que 0');
    return false;
  }
  
  const A = parseFloat(document.getElementById('A').value);
  const B = parseFloat(document.getElementById('B').value);
  const C = parseFloat(document.getElementById('C').value);
  const D = parseFloat(document.getElementById('D').value);
  
  if (A < 0 || B < 0 || C < 0 || D < 0) {
    alert('Las concentraciones no pueden ser negativas');
    return false;
  }
  
  return true;
}
