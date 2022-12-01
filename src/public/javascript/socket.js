const socket = io();

export const loadDates = (callback) => {
    socket.on('server:loadDates', callback);
}

export const addDate = (fecha, hora, tiempo, descripcion) => {
    socket.emit('client:addDate', {
        fecha,
        hora,
        tiempo,
        descripcion
    })
}

export const onNewDate = (callback) => {
    socket.on('server:addDate', callback);
}

export const deleteDate = (id) => {
    socket.emit('client:deleteDate', id);
}

export const getDate = (id) => {
    socket.emit('client:getDate', id);
}
export const updateDate = (id, fecha, hora, tiempo, descripcion) => {
    socket.emit('client:updateDate', id, fecha, hora, tiempo, descripcion);
}

export const onHandleUpdate = (callback) => {
    socket.on('server:updateDate', callback);
}