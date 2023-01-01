import { addDate, deleteDate, getDate, updateDate } from "./socket.js";

const citasList = document.querySelector('#citas-list');
let citaId = null;


const citaUI = (cita) => {
    const div = document.createElement('div');
    div.className = 'card card-body my-2 animate__animated animate__fadeInUp';
    div.innerHTML = `
    <h4>Fecha: ${cita.fecha}</h4>
    <p>Hora: ${cita.hora}</p>
    <p>Duración: ${cita.tiempo}</p>
    <p>Descripción: ${cita.descripcion}</p>
    <button class="btn btn-danger" btn-sm name="delete" data-id="${cita.id}">Delete</button>
    <button class="btn btn-secondary" btn-sm name="update" data-id="${cita.id}">Update</button>
    `;
    const deleteBtn = div.querySelector('[name=delete]');
    deleteBtn.addEventListener('click', async (e) => {
        await deleteDate(e.target.dataset.id);
    });

    const updateBtn = div.querySelector('[name=update]');
    updateBtn.addEventListener('click', async (e) => {
        const cita = await getDate(e.target.dataset.id);
    });

    return div;
}

export const renderCitas = (citas) => {
    citasList.innerHTML = '';
    citas.forEach(cita => citasList.append(citaUI(cita)));
}

export const fillForm = (cita) => {
    citaId = cita.id;
    const fecha = document.querySelector('#fecha');
    const hora = document.querySelector('#hora');
    const tiempo = document.querySelector('#tiempo');
    const descripcion = document.querySelector('#descripcion');

    fecha.value = cita.fecha;
    hora.value = cita.hora;
    tiempo.value = cita.tiempo;
    descripcion.value = cita.descripcion;
}

export const onHandleSubmit = (e) => {
    e.preventDefault();
    const fecha = document.querySelector('#fecha');
    const hora = document.querySelector('#hora');
    const tiempo = document.querySelector('#tiempo');
    const descripcion = document.querySelector('#descripcion');

    if (citaId) {
        updateDate(citaId, fecha.value, hora.value, tiempo.value, descripcion.value);
        citaId = null;
    }
    else {
        addDate(fecha.value, hora.value, tiempo.value, descripcion.value);
    }
    fecha.value = '';
    hora.value = '';
    tiempo.value = '';
    descripcion.value = '';
}


export const appendCita = (citas) => {
    citasList.append(citaUI(citas));
}
