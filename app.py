from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12345@localhost/nba_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Equipo(db.Model):
    __tablename__ = 'equipo'
    id_equipo = db.Column('id_equipo', db.Integer, primary_key=True)
    NombreEquipo = db.Column('nombreequipo', db.String(100), unique=True)
    Ciudad = db.Column('ciudad', db.String(100))
    Estado = db.Column('estado', db.String(100))
    Abbrev = db.Column('abbrev', db.String(5))
    Conferencia = db.Column('conferencia', db.String(5))
    AnioFundado = db.Column('aniofundado', db.Integer)

class Jugador(db.Model):
    __tablename__ = 'jugador'
    id_jugador = db.Column('id_jugador', db.Integer, primary_key=True)
    NombreJugador = db.Column('nombrejugador', db.String(100))  # aquí el cambio
    ApellidoJugador = db.Column('apellidojugador', db.String(100))  # aquí también
    Altura_cm = db.Column('altura_cm', db.Integer)  # y aquí

class EstadisticasEquipo(db.Model):
    __tablename__ = 'estadisticasequipo'
    
    id_equipo = db.Column('equipo', db.Integer, primary_key=True)
    NombreTemporada = db.Column('nombretemporada', db.String(100), primary_key=True)
    
    TotalJuegos = db.Column('totaljuegos', db.Integer)
    Ganados = db.Column('ganados', db.Integer)
    Perdidos = db.Column('perdidos', db.Integer)
    PlayOffGanados = db.Column('playoffganados', db.Integer)
    PlayoffPerdidos = db.Column('playoffperdidos', db.Integer)
    Finales = db.Column('finales', db.Boolean)

class EstadisticasJugador(db.Model):
    __tablename__ = 'estadisticasjugador'
    
    id_jugador = db.Column('id_jugador', db.Integer, primary_key=True)
    NombreTemporada = db.Column('nombretemporada', db.String(100), primary_key=True)
    
    TotalJuegos = db.Column('totaljuegos', db.Integer)
    Puntos = db.Column('puntos', db.Integer)
    Asistencias = db.Column('asistencias', db.Integer)
    Rebotes = db.Column('rebotes', db.Integer)
    Bloqueos = db.Column('bloqueos', db.Integer)



# ======================== Vistas Web ========================

@app.route('/')
def index():
    equipos = Equipo.query.all()
    return render_template('index.html', equipos=equipos)

@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        equipo = Equipo(
            id_equipo=request.form['IdEquipo'],
            NombreEquipo=request.form['NombreEquipo'],
            Ciudad=request.form['Ciudad'],
            Estado=request.form['Estado'],
            Abbrev=request.form['Abbrev'],
            Conferencia=request.form['Conferencia'],
            AnioFundado=request.form['AnioFundado']
        )
        db.session.add(equipo)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('create.html', equipo=None)

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    equipo = Equipo.query.get(id)
    if request.method == 'POST':
        equipo.NombreEquipo = request.form['NombreEquipo']
        equipo.Ciudad = request.form['Ciudad']
        equipo.Estado = request.form['Estado']
        equipo.Abbrev = request.form['Abbrev']
        equipo.Conferencia = request.form['Conferencia']
        equipo.AnioFundado = request.form['AnioFundado']
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('update.html', equipo=equipo)

@app.route('/delete/<int:id>')
def delete(id):
    equipo = Equipo.query.get(id)
    db.session.delete(equipo)
    db.session.commit()
    return redirect(url_for('index'))

# ======================== API para frontend ========================

@app.route('/api/equipos', methods=['GET'])
def get_equipos():
    equipos = Equipo.query.all()
    return jsonify([
        {
            'id_equipo': e.id_equipo,
            'NombreEquipo': e.NombreEquipo,
            'Ciudad': e.Ciudad,
            'Estado': e.Estado,
            'Abbrev': e.Abbrev,
            'Conferencia': e.Conferencia,
            'AnioFundado': e.AnioFundado
        } for e in equipos
    ])

# ----------- Jugadores -----------

#Jalar info
@app.route('/api/jugadores', methods=['GET'])
def get_jugadores():
    jugadores = Jugador.query.all()
    return jsonify([
        {
            'id_jugador': j.id_jugador,
            'NombreJugador': j.NombreJugador,
            'ApellidoJugador': j.ApellidoJugador,
            'Altura_cm': j.Altura_cm,
        } for j in jugadores
    ])

# Crear info
@app.route('/api/jugadores', methods=['POST'])
def crear_jugador():
    data = request.get_json()
    nuevo_jugador = Jugador(
        id_jugador=data['id_jugador'],
        NombreJugador=data['NombreJugador'],
        ApellidoJugador=data['ApellidoJugador'],
        Altura_cm=data['Altura_cm']
    )
    db.session.add(nuevo_jugador)
    db.session.commit()
    return jsonify({'mensaje': 'Jugador creado'}), 201

# Eliminar info
@app.route('/api/jugadores/<int:id>', methods=['DELETE'])
def eliminar_jugador(id):
    jugador = Jugador.query.get(id)
    if not jugador:
        return jsonify({'error': 'Jugador no encontrado'}), 404
    db.session.delete(jugador)
    db.session.commit()
    return jsonify({'mensaje': 'Jugador eliminado'}), 200

# Actualizar info
@app.route('/api/jugadores/<int:id>', methods=['PUT'])
def actualizar_jugador(id):
    jugador = Jugador.query.get(id)
    if not jugador:
        return jsonify({'error': 'Jugador no encontrado'}), 404
    data = request.get_json()
    jugador.NombreJugador = data['NombreJugador']
    jugador.ApellidoJugador = data['ApellidoJugador']
    jugador.Altura_cm = data['Altura_cm']
    db.session.commit()
    return jsonify({'mensaje': 'Jugador actualizado'})

#------------- Estadisticas Jugadores -------------
# Obtener info
@app.route('/api/estadisticasJugador', methods=['GET'])
def get_estadisticas_jugadores():
    estadisticas = EstadisticasJugador.query.all()
    return jsonify([
        {
            'id_jugador': e.id_jugador,
            'NombreTemporada': e.NombreTemporada,
            'TotalJuegos': e.TotalJuegos,
            'Puntos': e.Puntos,
            'Asistencias': e.Asistencias,
            'Rebotes': e.Rebotes,
            'Bloqueos': e.Bloqueos,
        } for e in estadisticas
    ])
# Crear info
@app.route('/api/estadisticasJugador', methods=['POST'])
def crear_estadisticas_jugador():
    data = request.get_json()
    nuevo_estadisticas = EstadisticasJugador(
        id_jugador=data['id_jugador'],
        NombreTemporada=data['NombreTemporada'],
        TotalJuegos=data['TotalJuegos'],
        Puntos=data['Puntos'],
        Asistencias=data['Asistencias'],
        Rebotes=data['Rebotes'],
        Bloqueos=data['Bloqueos']
    )
    db.session.add(nuevo_estadisticas)
    db.session.commit()
    return jsonify({'mensaje': 'Estadísticas creadas'}), 201

# Actualizar info
@app.route('/api/estadisticasJugador/<int:id_jugador>/<string:nombre_temporada>', methods=['PUT'])
def actualizar_estadistica_jugador(id_jugador, nombre_temporada):
    data = request.get_json()
    estadistica = EstadisticasJugador.query.get((id_jugador, nombre_temporada))
    if not estadistica:
        return jsonify({'mensaje': 'Estadística no encontrada'}), 404

    estadistica.TotalJuegos = int(data['TotalJuegos'])
    estadistica.Puntos = int(data['Puntos'])
    estadistica.Asistencias = int(data['Asistencias'])
    estadistica.Rebotes = int(data['Rebotes'])
    estadistica.Bloqueos = int(data['Bloqueos'])

    db.session.commit()
    return jsonify({'mensaje': 'Estadística actualizada'}), 200

# Eliminar info

@app.route('/api/estadisticasJugador/<int:id_jugador>/<string:nombre_temporada>', methods=['DELETE'])
def eliminar_estadistica_jugador(id_jugador, nombre_temporada):
    estadistica = EstadisticasJugador.query.get((id_jugador, nombre_temporada))
    if not estadistica:
        return jsonify({'mensaje': 'Estadística no encontrada'}), 404

    db.session.delete(estadistica)
    db.session.commit()
    return jsonify({'mensaje': 'Estadística eliminada'}), 200


# -----------------------Estadisticas Equipos-----------------------------

# Obtener info
@app.route('/api/estadisticasEquipo', methods=['GET'])
def get_estadisticas_equipo():
    estadisticas = EstadisticasEquipo.query.all()
    return jsonify([
        {
            'id_equipo': e.id_equipo,
            'NombreTemporada': e.NombreTemporada,
            'TotalJuegos': e.TotalJuegos,
            'Ganados': e.Ganados,
            'Perdidos': e.Perdidos,
            'PlayOffGanados': e.PlayOffGanados,
            'PlayoffPerdidos': e.PlayoffPerdidos,
            'Finales': e.Finales
        } for e in estadisticas
    ])


# Crear info
@app.route('/api/estadisticasEquipo', methods=['POST'])
def crear_estadisticas_equipo():
    data = request.get_json()
    nuevo_estadisticas = EstadisticasEquipo(
        id_equipo=data['id_equipo'],
        NombreTemporada=data['NombreTemporada'],
        TotalJuegos=data['TotalJuegos'],
        Ganados=data['Ganados'],
        Perdidos=data['Perdidos'],
        PlayOffGanados=data['PlayOffGanados'],
        PlayoffPerdidos=data['PlayoffPerdidos'],
        Finales=bool(int(data['Finales']))
    )
    db.session.add(nuevo_estadisticas)
    db.session.commit()
    return jsonify({'mensaje': 'Estadísticas de equipo creadas'}), 201
# Actualizar info
@app.route('/api/estadisticasEquipo/<int:id_equipo>/<string:nombre_temporada>', methods=['PUT'])
def actualizar_estadistica_equipo(id_equipo, nombre_temporada):
    data = request.get_json()
    estadistica = EstadisticasEquipo.query.get((id_equipo, nombre_temporada))
    if not estadistica:
        return jsonify({'mensaje': 'Estadística no encontrada'}), 404

    estadistica.TotalJuegos = int(data['TotalJuegos'])
    estadistica.Ganados = int(data['Ganados'])
    estadistica.Perdidos = int(data['Perdidos'])
    estadistica.PlayOffGanados = int(data['PlayOffGanados'])
    estadistica.PlayoffPerdidos = int(data['PlayoffPerdidos'])
    estadistica.Finales = bool(int(data['Finales']))

    db.session.commit()
    return jsonify({'mensaje': 'Estadística de equipo actualizada'}), 200


# Eliminar info
@app.route('/api/estadisticasEquipo/<int:id_equipo>/<string:nombre_temporada>', methods=['DELETE'])
def eliminar_estadistica_equipo(id_equipo, nombre_temporada):
    estadistica = EstadisticasEquipo.query.get((id_equipo, nombre_temporada))
    if not estadistica:
        return jsonify({'mensaje': 'Estadística no encontrada'}), 404

    db.session.delete(estadistica)
    db.session.commit()
    return jsonify({'mensaje': 'Estadística de equipo eliminada'}), 200


# ----------------------------------------------------




@app.route('/api/equipos', methods=['POST'])
def crear_equipo():
    data = request.get_json()
    nuevo = Equipo(
        id_equipo=data['id_equipo'],
        NombreEquipo=data['NombreEquipo'],
        Ciudad=data['Ciudad'],
        Estado=data['Estado'],
        Abbrev=data['Abbrev'],
        Conferencia=data['Conferencia'],
        AnioFundado=data['AnioFundado']
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify({'mensaje': 'Equipo creado'}), 201

@app.route('/api/equipos/<int:id>', methods=['PUT'])
def actualizar_equipo(id):
    equipo = Equipo.query.get(id)
    if not equipo:
        return jsonify({'error': 'Equipo no encontrado'}), 404
    data = request.get_json()
    equipo.NombreEquipo = data['NombreEquipo']
    equipo.Ciudad = data['Ciudad']
    equipo.Estado = data['Estado']
    equipo.Abbrev = data['Abbrev']
    equipo.Conferencia = data['Conferencia']
    equipo.AnioFundado = data['AnioFundado']
    db.session.commit()
    return jsonify({'mensaje': 'Equipo actualizado'})

@app.route('/api/equipos/<int:id>', methods=['DELETE'])
def eliminar_equipo(id):
    equipo = Equipo.query.get(id)
    if not equipo:
        return jsonify({'error': 'Equipo no encontrado'}), 404
    db.session.delete(equipo)
    db.session.commit()
    return jsonify({'mensaje': 'Equipo eliminado'})

# ============================================================

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
