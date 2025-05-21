from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    id_jugador = db.Column(db.Integer, primary_key=True)
    NombreJugador = db.Column(db.String(100))
    ApellidoJugador = db.Column(db.String(100))
    Altura_cm = db.Column(db.Integer)
    TEAM_ID = db.Column(db.Integer)
    TEAM_ABBREVIATION = db.Column(db.String(10))
    SEASON_ID = db.Column(db.String(20))

class Jugador_22_23(db.Model):
    __tablename__ = 'jugador_22_23'
    id_jugador = db.Column(db.Integer, primary_key=True)
    NombreJugador = db.Column(db.String(100))
    ApellidoJugador = db.Column(db.String(100))
    Altura_cm = db.Column(db.Integer)
    TEAM_ID = db.Column(db.Integer)
    TEAM_ABBREVIATION = db.Column(db.String(10))
    SEASON_ID = db.Column(db.String(20))

class Estadisticas_21_22(db.Model):
    __tablename__ = 'estadisticas_21_22'
    PERSON_ID = db.Column(db.Integer, primary_key=True)
    NOMBRE = db.Column(db.String(100))
    APELLIDO = db.Column(db.String(100))
    TEAM_ID = db.Column(db.Integer)
    TEAM_ABBREVIATION = db.Column(db.String(10))
    ALTURA_CM = db.Column(db.Integer)
    SEASON_ID = db.Column(db.String(20))
    GP = db.Column(db.Integer)
    PTS = db.Column(db.Float)
    AST = db.Column(db.Float)
    REB = db.Column(db.Float)
    BLK = db.Column(db.Float)
    MIN = db.Column(db.Float)
    FG_PCT = db.Column(db.Float)
    FG3_PCT = db.Column(db.Float)
    FT_PCT = db.Column(db.Float)

class Estadisticas_22_23(db.Model):
    __tablename__ = 'estadisticas_22_23'
    PERSON_ID = db.Column(db.Integer, primary_key=True)
    NOMBRE = db.Column(db.String(100))
    APELLIDO = db.Column(db.String(100))
    TEAM_ID = db.Column(db.Integer)
    TEAM_ABBREVIATION = db.Column(db.String(10))
    ALTURA_CM = db.Column(db.Integer)
    SEASON_ID = db.Column(db.String(20))
    GP = db.Column(db.Integer)
    PTS = db.Column(db.Float)
    AST = db.Column(db.Float)
    REB = db.Column(db.Float)
    BLK = db.Column(db.Float)
    MIN = db.Column(db.Float)
    FG_PCT = db.Column(db.Float)
    FG3_PCT = db.Column(db.Float)
    FT_PCT = db.Column(db.Float)






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

@app.route('/api/jugadores', methods=['GET'])
def get_jugadores():
    jugadores = Jugador.query.all()
    return jsonify([
        {
            'id_jugador': j.id_jugador,
            'NombreJugador': j.NombreJugador,
            'ApellidoJugador': j.ApellidoJugador,
            'Altura_cm': j.Altura_cm,
            'TEAM_ID': j.TEAM_ID,
            'TEAM_ABBREVIATION': j.TEAM_ABBREVIATION,
            'SEASON_ID': j.SEASON_ID
        } for j in jugadores
    ])

@app.route('/api/jugadores/22_23', methods=['GET'])
def get_jugadores_22_23():
    jugadores = Jugador_22_23.query.all()
    return jsonify([
        {
            'id_jugador': j.id_jugador,
            'NombreJugador': j.NombreJugador,
            'ApellidoJugador': j.ApellidoJugador,
            'Altura_cm': j.Altura_cm,
            'TEAM_ID': j.TEAM_ID,
            'TEAM_ABBREVIATION': j.TEAM_ABBREVIATION,
            'SEASON_ID': j.SEASON_ID
        } for j in jugadores
    ])

@app.route('/api/estadisticas/21_22', methods=['GET'])
def get_estadisticas_21_22():
    jugadores = Estadisticas_21_22.query.all()
    return jsonify([
        {
            'PERSON_ID': j.PERSON_ID,
            'NOMBRE': j.NOMBRE,
            'APELLIDO': j.APELLIDO,
            'TEAM_ID': j.TEAM_ID,
            'TEAM_ABBREVIATION': j.TEAM_ABBREVIATION,
            'ALTURA_CM': j.ALTURA_CM,
            'SEASON_ID': j.SEASON_ID,
            'GP': j.GP,
            'PTS': j.PTS,
            'AST': j.AST,
            'REB': j.REB,
            'BLK': j.BLK,
            'MIN': j.MIN,
            'FG_PCT': j.FG_PCT,
            'FG3_PCT': j.FG3_PCT,
            'FT_PCT': j.FT_PCT
        } for j in jugadores
    ])

@app.route('/api/estadisticas/22_23', methods=['GET'])
def get_estadisticas_22_23():
    jugadores = Estadisticas_22_23.query.all()
    return jsonify([
        {
            'PERSON_ID': j.PERSON_ID,
            'NOMBRE': j.NOMBRE,
            'APELLIDO': j.APELLIDO,
            'TEAM_ID': j.TEAM_ID,
            'TEAM_ABBREVIATION': j.TEAM_ABBREVIATION,
            'ALTURA_CM': j.ALTURA_CM,
            'SEASON_ID': j.SEASON_ID,
            'GP': j.GP,
            'PTS': j.PTS,
            'AST': j.AST,
            'REB': j.REB,
            'BLK': j.BLK,
            'MIN': j.MIN,
            'FG_PCT': j.FG_PCT,
            'FG3_PCT': j.FG3_PCT,
            'FT_PCT': j.FT_PCT
        } for j in jugadores
    ])



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
