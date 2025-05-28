// Cálculo de Kc con validación y explicación
function calcularKcAvanzado() {
  const a = parseFloat(document.getElementById('a').value || 1);
  const b = parseFloat(document.getElementById('b').value || 1);
  const c = parseFloat(document.getElementById('c').value || 1);
  const d = parseFloat(document.getElementById('d').value || 1);

  const A = parseFloat(document.getElementById('A').value);
  const B = parseFloat(document.getElementById('B').value);
  const C = parseFloat(document.getElementById('C').value);
  const D = parseFloat(document.getElementById('D').value);

  if ([A, B, C, D].some(x => isNaN(x) || x < 0)) {
    document.getElementById('resultado').innerText = "Todos los valores deben ser positivos y numéricos.";
    return;
  }

  const numerador = Math.pow(C, c) * Math.pow(D, d);
  const denominador = Math.pow(A, a) * Math.pow(B, b);
  const kc = numerador / denominador;

  const expresion = `Kc = [C]^${c} × [D]^${d} / [A]^${a} × [B]^${b}`;
  const desarrollo = `Kc = (${C}^${c} × ${D}^${d}) / (${A}^${a} × ${B}^${b}) = ${kc.toFixed(3)}`;

  document.getElementById('resultado').innerHTML = `<strong>${expresion}</strong><br>${desarrollo}<br><br>Unidad: Kc es adimensional en este caso.`;
}

function cargarEjemploAvanzado() {
  document.getElementById('a').value = 1;
  document.getElementById('b').value = 1;
  document.getElementById('c').value = 1;
  document.getElementById('d').value = 1;
  document.getElementById('A').value = 0.5;
  document.getElementById('B').value = 0.5;
  document.getElementById('C').value = 0.8;
  document.getElementById('D').value = 0.8;
  document.getElementById('tipoReaccion').value = "exotermica";
  calcularKcAvanzado();
}

function explicar(accion) {
  const tipo = document.getElementById('tipoReaccion').value;
  let texto = "";

  switch (accion) {
    case 'aumentaReactivo':
      texto = "El equilibrio se desplaza hacia los productos (→) al aumentar la concentración de reactivos.";
      break;
    case 'aumentaProducto':
      texto = "El equilibrio se desplaza hacia los reactivos (←) al aumentar la concentración de productos.";
      break;
    case 'aumentaTemperatura':
      texto = tipo === 'endotermica'
        ? "La temperatura favorece la reacción endotérmica (→)."
        : "La temperatura desfavorece la reacción exotérmica, desplazándola hacia los reactivos (←).";
      break;
    case 'catalizador':
      texto = "El catalizador acelera la reacción pero no modifica el equilibrio químico.";
      break;
    case 'presion':
      texto = "El cambio de presión afecta reacciones con gases. El equilibrio se desplaza hacia el lado con menos moles gaseosos.";
      break;
  }

  document.getElementById('explicacion').innerText = texto;
}
