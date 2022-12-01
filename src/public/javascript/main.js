import {loadDates, onNewDate, onHandleUpdate} from "./socket.js"
import { onHandleSubmit, renderCitas, appendCita, fillForm } from "./ui.js";

onHandleUpdate(fillForm);
onNewDate(appendCita);
loadDates(renderCitas);


const citasForm = document.querySelector('#citas-form');
citasForm.addEventListener('submit', onHandleSubmit);



