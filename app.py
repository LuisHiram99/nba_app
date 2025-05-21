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

# ======================== API para conectar el frontend ========================

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
