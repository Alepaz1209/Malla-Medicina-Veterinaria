document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Cargar ramos aprobados desde localStorage
  const aprobadosGuardados = JSON.parse(localStorage.getItem("aprobados")) || new Set();
  const aprobados = new Set(aprobadosGuardados);

  actualizarEstados();

  ramos.forEach(ramo => {
    // Restaurar aprobados guardados
    if (aprobados.has(ramo.id)) {
      ramo.classList.add("aprobado");
    }

    // Manejar clics
    ramo.addEventListener("click", function () {
      if (ramo.classList.contains("bloqueado")) return;

      // Alternar aprobación
      if (ramo.classList.contains("aprobado")) {
        ramo.classList.remove("aprobado");
        aprobados.delete(ramo.id);
      } else {
        ramo.classList.add("aprobado");
        aprobados.add(ramo.id);
      }

      // Guardar en localStorage
      localStorage.setItem("aprobados", JSON.stringify([...aprobados]));

      // Actualizar estados
      actualizarEstados();
    });
  });

  function actualizarEstados() {
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
        ramo.classList.remove("aprobado");
        aprobados.delete(ramo.id);
        localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
      }
    });
  }
});
