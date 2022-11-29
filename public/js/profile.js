const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const body_part = document.querySelector("#body-part").value.trim();
  const level = document.querySelector("#skill-level").value.trim();
  const repetitions = document.querySelector("#repetitions").value.trim();
  const sets = document.querySelector("#sets").value.trim();
  const video = document.querySelector("#video").value.trim();

  if (name && body_part && level && repetitions && sets && video) {
    const response = await fetch(`/api/projects`, {
      method: "POST",
      body: JSON.stringify({
        name,
        body_part,
        level,
        repetitions,
        sets,
        video,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to add favorite!");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete favorite");
    }
  }
};

document
  .querySelector(".new-favorite-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".workout-list")
  .addEventListener("click", delButtonHandler);
