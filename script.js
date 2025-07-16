document.addEventListener("DOMContentLoaded", () => {
  const subjects = document.querySelectorAll(".subject");

  function updateSubjectStates() {
    subjects.forEach((subject) => {
      const prereqIds = subject.dataset.prereq?.split(" ") || [];
      const isUnlocked = prereqIds.every(id =>
        document.getElementById(id)?.classList.contains("approved")
      );

      if (prereqIds.length === 0 || isUnlocked) {
        subject.classList.remove("locked");
        subject.classList.add("unlocked");
      } else {
        subject.classList.remove("unlocked", "approved");
        subject.classList.add("locked");
      }
    });
  }

  subjects.forEach((subject) => {
    subject.addEventListener("click", () => {
      if (!subject.classList.contains("locked")) {
        subject.classList.toggle("approved");
        updateSubjectStates();
      }
    });
  });

  updateSubjectStates(); // inicial
});
