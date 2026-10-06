const inputBuscar = document.getElementById('buscar');
const selectCat = document.getElementById('categoria');
const lista = document.getElementById('lista-productos');
const info = document.getElementById('resultado-info');

// Leer categoría de la URL (ej. catalogo.html?cat=aceite)
const params = new URLSearchParams(window.location.search);
if (params.get('cat')) selectCat.value = params.get('cat');

function renderizar() {
  const texto = inputBuscar.value.toLowerCase().trim();
  const cat = selectCat.value;

  const resultados = filtros.filter(f => {
    const coincideTexto =
      f.nombre.toLowerCase().includes(texto) ||
      f.referencia.toLowerCase().includes(texto) ||
      f.marca.toLowerCase().includes(texto);
    const coincideCat = !cat || f.categoria === cat;
    return coincideTexto && coincideCat;
  });

  info.textContent = `${resultados.length} filtro(s) encontrado(s)`;

  if (resultados.length === 0) {
    lista.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#666;">No se encontraron filtros.</p>';
    return;
  }

  lista.innerHTML = resultados.map(f => `
    <a href="producto.html?id=${f.id}" class="card-producto">
      <img src="${f.imagen}" alt="${f.nombre}" onerror="this.src='images/placeholder.png'">
      <h3>${f.nombre}</h3>
      <p class="ref">Ref: ${f.referencia}</p>
      <p class="marca">${f.marca}</p>
    </a>
  `).join('');
}

inputBuscar.addEventListener('input', renderizar);
selectCat.addEventListener('change', renderizar);
renderizar();
