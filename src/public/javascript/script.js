const today = new Date();
console.log('Today is: ' + today);

const startHour = 8;
const endHour = 18;
const resolution = 2;
const currentHour = today.getHours();
const currentMinute = today.getMinutes();

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

const europeanDate = formatDate(today);
console.log('European date: ' + europeanDate);



const hourTemplate = document.querySelector(
  '#template-hour');
const hourGrid = document.querySelector(
  '.calendar__hour-grid');
for (let i = startHour; i < endHour; i++) {
  const hourNode = hourTemplate.content
    .firstElementChild.cloneNode(true);
  hourGrid.appendChild(hourNode);

  hourNode.querySelector('.label')
    .innerText = `${i}`.padStart(2, '0');

  if (currentHour === i) {
    hourNode.classList.add('active');
    hourNode.style.setProperty(
      '--current-minute', currentMinute
    );
  }
}

const eventTemplate = document
  .querySelector('#template-event');
const calendarEvents = document
  .querySelector('.calendar__events');
const calendar = document
  .querySelector('.calendar');


calendar.style.setProperty(
  '--start-hour', startHour);
calendar.style.setProperty(
  '--end-hour', endHour);
calendar.style.setProperty(
  '--resolution', resolution);

if (europeanDate)

  fetch('/citas')
    .then(response => response.json())
    .then(citas => {
      citas.forEach(cita => {
        console.log('cita fecha', cita.fecha);
        if (europeanDate === cita.fecha) {

          const time = cita.hora.split(':');
          const timeInt = Math.ceil(parseInt(time[1]) + parseInt(time[0]) * 60);
          console.log('timeInt', timeInt);
          const floatTime = timeInt / 60;
          console.log('floatTime', floatTime);
          const timeInSec = cita.tiempo / 60;
          console.log('timeInSec', timeInSec);
          const eventPast = () => {
            if (floatTime + timeInSec > currentHour) {
              return false;
            } else {
              return true;
            }
          }
          console.log('eventPast', eventPast());
          const eventNode = eventTemplate.content
            .firstElementChild.cloneNode(true);
          calendarEvents.appendChild(eventNode);

          eventNode.querySelector('.label')
            .innerText = cita.descripcion;
          eventNode.style.setProperty(
            '--start', floatTime);
          eventNode.style.setProperty(
            '--end', (floatTime + timeInSec));
          console.log('cita.end', floatTime + timeInSec);
          eventNode.style.setProperty(
            '--resolution', resolution);
          if (eventPast()) {
            eventNode.classList.add('past');
          }
        }
        else {
          console.log('no hay citas');
          alert('No hay citas para este día');
        }
      });
    });


