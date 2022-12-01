CREATE DATABASE agenda;
USE agenda;

CREATE TABLE citas (
  id INT NOT NULL AUTO_INCREMENT,
  fecha VARCHAR(10) NOT NULL,
  hora VARCHAR(5) NOT NULL,
  tiempo INT NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO    citas (fecha, hora, tiempo, descripcion)
VALUES          ('01/12/2022', '10:00', 30, 'Cita 1'),
                ('01/12/2022', '11:00', 30, 'Cita 2'),
                ('01/12/2022', '12:00', 30, 'Cita 3')