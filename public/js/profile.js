
const newList = document.createElement("ol");

document.querySelector('.container').append(newList)


document.querySelector('#exercises').addEventListener('change', function (e) {
    console.log(e.target.value)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body_part: e.target.value })
    };

    fetch('/testPost', requestOptions)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            while (newList.hasChildNodes()) {
                newList.removeChild(newList.firstChild);
            }
            for (let exercise of data) {
                const exerciseLi = document.createElement("li");
                exerciseLi.append(exercise.body_part)
                exerciseLi.append(exercise.id)
                exerciseLi.append(exercise.name)
                exerciseLi.append(exercise.video)
                newList.append(exerciseLi)
            }
        });


})