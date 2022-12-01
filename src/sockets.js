import { getDates, getDate, insertDate, updateDate, deleteDate } from './db';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        const emitDates = async () => {
            const dates = await getDates();
            io.emit('server:loadDates', dates);
        }
        emitDates();

        socket.on('client:addDate', async (date) => {
             await insertDate(date);
            console.log('cita recibida de cliente', date);
            emitDates();
        }
    ),
        socket.on('client:deleteDate', async (id) => {
            await deleteDate(id);
            console.log('cita eliminada', id);
            emitDates();
        }
    ),
        socket.on('client:getDate', async (id) => {
            const date = await getDate(id);
            console.log('cita recibida', date);
            io.emit('server:updateDate', date);
        }
    ),
        socket.on('client:updateDate', async (id, fecha, hora, tiempo, descripcion) => {
            await updateDate(id, fecha, hora, tiempo, descripcion);
            console.log('cita actualizada', id);
            emitDates();
        }
    )});
}