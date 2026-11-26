// js/dashboards-d3.js

console.log("D3 cargado correctamente");

/* =========================
   DASHBOARD 4 - SANIDAD
========================= */

function renderDash4_Sanidad() {

  console.log("Dashboard 4 Sanidad");

  document.getElementById("dash-title").innerText =
    "Dashboard 4: Control Sanitario y Vacunación";

  document.getElementById("dash-engine").innerText =
    "Motor: D3.js v7 (Donut Chart)";

  document.getElementById("chart-title").innerText =
    "Aves Inmunizadas por Evento Sanitario";

  const totalAves = datosFiltrados.reduce(
    (a, b) => a + Number(b.aves || 0),
    0
  );

  document.getElementById("kpi-container").innerHTML = `
      <div class="dash-kpi">
        <h4>Aves Tratadas</h4>
        <div class="val">${totalAves.toLocaleString()}</div>
      </div>

      <div class="dash-kpi">
        <h4>Eventos</h4>
        <div class="val">${datosFiltrados.length}</div>
      </div>
  `;

  dibujarGraficoD3_4(datosFiltrados);

  renderTabla([
    { key: "id", label: "ID" },
    { key: "lote", label: "Lote" },
    { key: "evento", label: "Evento" },
    { key: "vacuna", label: "Vacuna" },
    { key: "fecha", label: "Fecha" },
    { key: "aves", label: "Aves" }
  ]);
}

function dibujarGraficoD3_4(datos) {

  const container = d3.select("#chart-canvas");
  container.html("");

  if (!datos || datos.length === 0) return;

  const width = 600;
  const height = 360;
  const radius = 130;

  const svg = container
    .append("svg")
    .attr("width", "100%")
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2}, ${height / 2})`
    );

  const color = d3.scaleOrdinal()
    .domain(
      datos.map(
        d => d.vacuna || "SIN_VACUNA"
      )
    )
    .range([
      "#10b981",
      "#3b82f6",
      "#f59e0b",
      "#ec4899",
      "#8b5cf6"
    ]);

  const pie = d3.pie()
    .value(d => Number(d.aves || 0));

  const arc = d3.arc()
    .innerRadius(radius * 0.45)
    .outerRadius(radius);

  svg.selectAll("path")
    .data(pie(datos))
    .join("path")
    .attr("d", arc)
    .attr("fill", d =>
      color(d.data.vacuna || "SIN_VACUNA")
    )
    .attr("stroke", "#fff");
}

/* =========================
   DASHBOARD 5 - INVENTARIO
========================= */

function renderDash5_Inventario() {

  console.log("Dashboard 5 Inventario");

  document.getElementById("dash-title").innerText =
    "Dashboard 5: Inventario";

  document.getElementById("dash-engine").innerText =
    "Motor: D3.js v7";

  document.getElementById("chart-title").innerText =
    "Stock por Insumo";

  dibujarGraficoD3_5(datosFiltrados);

  renderTabla([
    { key: "id", label: "ID" },
    { key: "nombre", label: "Insumo" },
    { key: "stock", label: "Stock" },
    { key: "unidad", label: "Unidad" },
    { key: "proveedor", label: "Proveedor" }
  ]);
}

function dibujarGraficoD3_5(datos) {

  const container =
    d3.select("#chart-canvas");

  container.html("");

  const width = 750;
  const height = 360;
  const margin = {
    top: 20,
    right: 30,
    bottom: 40,
    left: 220
  };

  const svg = container
    .append("svg")
    .attr("width", "100%")
    .attr("height", height)
    .attr(
      "viewBox",
      `0 0 ${width} ${height}`
    );

  const maxVal =
    d3.max(
      datos,
      d => Number(d.stock || 0)
    ) || 1;

  const x =
    d3.scaleLinear()
    .domain([0, maxVal])
    .range([
      margin.left,
      width - margin.right
    ]);

  const y =
    d3.scaleBand()
    .domain(
      datos.map(d => d.nombre)
    )
    .range([
      margin.top,
      height - margin.bottom
    ])
    .padding(0.2);

  svg.selectAll("rect")
    .data(datos)
    .join("rect")
    .attr("x", x(0))
    .attr("y", d => y(d.nombre))
    .attr(
      "width",
      d =>
        x(Number(d.stock || 0))
        - x(0)
    )
    .attr(
      "height",
      y.bandwidth()
    )
    .attr("fill", "#059669");
}

/* =========================
   DASHBOARD 6 - GALPONES
========================= */

function renderDash6_Galpones() {

  console.log("Dashboard 6 Galpones");

  document.getElementById("dash-title").innerText =
    "Dashboard 6: Capacidad de Galpones";

  document.getElementById("dash-engine").innerText =
    "Motor: D3.js v7";

  document.getElementById("chart-title").innerText =
    "Capacidad Máxima";

  dibujarGraficoD3_6(datosFiltrados);

  renderTabla([
    { key: "id", label: "ID" },
    { key: "nombre", label: "Galpón" },
    { key: "sector", label: "Sector" },
    { key: "capacidad", label: "Capacidad" },
    { key: "manejo", label: "Manejo" }
  ]);
}

function dibujarGraficoD3_6(datos) {

  const container =
    d3.select("#chart-canvas");

  container.html("");

  const width = 600;
  const height = 400;

  const svg = container
    .append("svg")
    .attr("width", "100%")
    .attr("height", height)
    .attr(
      "viewBox",
      `0 0 ${width} ${height}`
    );

  const root = d3.hierarchy({
    children: datos
  })
  .sum(
    d =>
      Number(
        d.capacidad || 0
      )
  );

  const pack =
    d3.pack()
    .size([
      width,
      height
    ])
    .padding(5);

  pack(root);

  svg
    .selectAll("circle")
    .data(
      root.descendants().slice(1)
    )
    .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.r)
    .attr(
      "fill",
      d =>
        d.data.manejo ===
        "TRADICIONAL"
          ? "#3b82f6"
          : "#10b981"
    );
}