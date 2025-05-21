

CREATE TABLE equipo (
    id_equipo INT PRIMARY KEY,
    NombreEquipo VARCHAR(100) UNIQUE,
    Ciudad VARCHAR(100),
    Estado VARCHAR(100),
    Abbrev VARCHAR(5),
    Conferencia VARCHAR(5) CHECK (Conferencia IN ('Este', 'Oeste')),
    AnioFundado INT
);


CREATE TABLE temporada(
	NombreTemporada VARCHAR(50) PRIMARY KEY,
	FechaInicio DATE,
	FechaFinal DATE,
	Campeon INT,

	FOREIGN KEY (Campeon) REFERENCES equipo(id_equipo)
);


CREATE TABLE partido (
    id_partido SERIAL PRIMARY KEY,

    EquipoCasa INT,
    EquipoVisitante INT,
    NombreTemporada VARCHAR(100),
    FechaPartido DATE,
    Ganador INT,
	
	FOREIGN KEY (Ganador) REFERENCES equipo(id_equipo),
    FOREIGN KEY (EquipoCasa) REFERENCES equipo(id_equipo),
    FOREIGN KEY (EquipoVisitante) REFERENCES equipo(id_equipo),
    FOREIGN KEY (NombreTemporada) REFERENCES temporada(NombreTemporada)
);


CREATE TABLE estadisticasEquipo(
	NombreTemporada VARCHAR(100),
	Equipo INT,
	TotalJuegos INT,
	Ganados INT,
	Perdidos INT,
	PlayOffGanados INT,
	PlayoffPerdidos INT,
	Finales BOOLEAN,

	PRIMARY KEY (Equipo, NombreTemporada),
	
	FOREIGN KEY (Equipo) REFERENCES equipo(id_equipo),
    FOREIGN KEY (NombreTemporada) REFERENCES temporada(NombreTemporada)
);

CREATE TABLE jugador (
    id_jugador SERIAL PRIMARY KEY,
    NombreJugador VARCHAR(100),
    ApellidoJugador VARCHAR(100),
	Altura_cm INT
);

CREATE TABLE JugadorTemporada (
    id_jugador INT,
    NombreTemporada VARCHAR(100),
    Equipo INT,

    PRIMARY KEY (id_jugador, NombreTemporada),

    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador),
    FOREIGN KEY (NombreTemporada) REFERENCES temporada(NombreTemporada),
    FOREIGN KEY (Equipo) REFERENCES equipo(id_equipo)
);

CREATE TABLE EstadisticasJugador (
    id_jugador INT,
    NombreTemporada VARCHAR(100),
    TotalJuegos INT,
    Puntos INT,
    Asistencias INT,
    Rebotes INT,
    Bloqueos INT,

    PRIMARY KEY (id_jugador, NombreTemporada),

    FOREIGN KEY (id_jugador, NombreTemporada) REFERENCES JugadorTemporada(id_jugador, NombreTemporada)
);



SELECT * FROM temporada; --X
SELECT * FROM equipo; --X
SELECT * FROM partido; --X
SELECT * FROM jugador; --X
SELECT * FROM JugadorTemporada; --X
SELECT * FROM EstadisticasJugador; --X
SELECT * FROM estadisticasEquipo; --X

