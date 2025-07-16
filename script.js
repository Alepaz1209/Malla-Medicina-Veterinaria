document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  const estadoRamos = {};

  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereq ? ramo.dataset.prereq.split(",") : [];
    const id = ramo.id;
    estadoRamos[id] = { aprobado: false, prereqs, elemento: ramo };

    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("bloqueado")) {
        ramo.classList.toggle("aprobado");
        estadoRamos[id].aprobado = ramo.classList.contains("aprobado");
        actualizarDisponibilidad();
      }
    });
  });

  function actualizarDisponibilidad() {
    Object.entries(estadoRamos).forEach(([id, info]) => {
      const { prereqs, aprobado, elemento } = info;

      if (aprobado) {
        elemento.classList.remove("bloqueado");
        return;
      }

      const faltan = prereqs.some(pr => !estadoRamos[pr]?.aprobado);

      if (faltan) {
        elemento.classList.add("bloqueado");
      } else {
        elemento.classList.remove("bloqueado");
      }
    });
  }

  actualizarDisponibilidad();
});