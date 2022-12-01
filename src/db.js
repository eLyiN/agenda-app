import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
}).promise();

export async function getDates() {
    const [rows] = await pool.query('SELECT * FROM citas');
    return rows;
}
export async function getDate(id) {
    const [rows] = await pool.query('SELECT * FROM citas WHERE id = ?', [id]);
    return rows[0];
}

export async function insertDate(date) {
    const { fecha, hora, tiempo, descripcion } = date;
    const [result] = await pool.query('INSERT INTO citas (fecha, hora, tiempo, descripcion) VALUES (?, ?, ?, ?)', [fecha, hora, tiempo, descripcion]);
    return result;
}

export async function updateDate(id, fecha, hora, tiempo, descripcion) {
    const [result] = await pool.query('UPDATE citas SET fecha = ?, hora = ?, tiempo = ?, descripcion = ? WHERE id = ?', [fecha, hora, tiempo, descripcion, id]);
    return result;
}

export async function deleteDate(id) {
    const [result] = await pool.query('DELETE FROM citas WHERE id = ?', [id]);
    await pool.query('ALTER TABLE citas AUTO_INCREMENT = 1');
    return result;
}
