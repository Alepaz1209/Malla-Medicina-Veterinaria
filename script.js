document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Inicializa los estados de los ramos
  actualizarEstados();

  // Escucha clics en ramos desbloqueados
  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      if (ramo.classList.contains("bloqueado")) return;

      // Alternar aprobado/desaprobado
      ramo.classList.toggle("aprobado");

      // Actualizar otros ramos en base a los nuevos estados
      actualizarEstados();
    });
  });

  function actualizarEstados() {
    const aprobados = new Set();
    document.querySelectorAll(".ramo.aprobado").forEach(r => {
      aprobados.add(r.id);
    });

    ramos.forEach(ramo => {
      const requisitos = ramo.dataset.prereq;
      if (!requisitos) {
        ramo.classList.remove("bloqueado");
        return;
      }

      const listaRequisitos = requisitos.split(",").map(r => r.trim());
      const todosCumplidos = listaRequisitos.every(req => aprobados.has(req));

      if (todosCumplidos) {
        ramo.classList.remove("bloqueado");
      } else {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("aprobado"); // desmarcar si se quedó sin requisitos
      }
    });
  }
});
