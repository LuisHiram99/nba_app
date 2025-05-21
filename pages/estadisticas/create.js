import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function CrearEstadisticaJugador() {
    const router = useRouter();
    const [jugadores, setJugadores] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredJugadores, setFilteredJugadores] = useState([]);
    const [form, setForm] = useState({
        id_jugador: '',
        NombreTemporada: '',
        TotalJuegos: '',
        Puntos: '',
        Asistencias: '',
        Rebotes: '',
        Bloqueos: ''
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/jugadores')
            .then(res => res.json())
            .then(data => setJugadores(data));
    }, []);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredJugadores([]);
            return;
        }
        const lower = search.toLowerCase();
        const filtered = jugadores.filter(j =>
            (j.NombreJugador + ' ' + j.ApellidoJugador).toLowerCase().includes(lower)
        );
        setFilteredJugadores(filtered);
    }, [search, jugadores]);

    const handleSearchChange = e => {
        setSearch(e.target.value);
    };

    const handleSelectJugador = (jugador) => {
        setForm({ ...form, id_jugador: jugador.id_jugador });
        setSearch(jugador.NombreJugador + ' ' + jugador.ApellidoJugador);
        setFilteredJugadores([]);
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.id_jugador) {
            alert('Por favor selecciona un jugador válido');
            return;
        }
        await fetch('http://localhost:5000/api/estadisticasJugador', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        router.push('/estadisticas');
    };

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Agregar Estadística de Jugador</h1>
            <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
                <div style={styles.inputGroup}>
                    <label>Buscar Jugador:</label>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Escribe el nombre del jugador"
                        style={styles.input}
                    />
                    {filteredJugadores.length > 0 && (
                        <ul style={styles.dropdown}>
                            {filteredJugadores.map(j => (
                                <li
                                    key={j.id_jugador}
                                    onClick={() => handleSelectJugador(j)}
                                    style={styles.dropdownItem}
                                >
                                    {j.NombreJugador} {j.ApellidoJugador}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Campo oculto para enviar el id_jugador */}
                <input type="hidden" name="id_jugador" value={form.id_jugador} />

                <div style={styles.inputGroup}>
                    <label>Temporada (ej. 2021-22):</label>
                    <input
                        type="text"
                        name="NombreTemporada"
                        value={form.NombreTemporada}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Total de Juegos:</label>
                    <input
                        type="number"
                        name="TotalJuegos"
                        value={form.TotalJuegos}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Puntos:</label>
                    <input
                        type="number"
                        name="Puntos"
                        value={form.Puntos}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Asistencias:</label>
                    <input
                        type="number"
                        name="Asistencias"
                        value={form.Asistencias}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Rebotes:</label>
                    <input
                        type="number"
                        name="Rebotes"
                        value={form.Rebotes}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Bloqueos:</label>
                    <input
                        type="number"
                        name="Bloqueos"
                        value={form.Bloqueos}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.save}>Guardar</button>
                    <button type="button" onClick={() => router.push('/estadisticas')} style={styles.back}>Regresar</button>
                </div>
            </form>
        </main>
    );
}

const styles = {
    container: {
        background: 'linear-gradient(135deg, #0B1E3E 50%, #BF0A30 50%)',
        minHeight: '100vh',
        padding: '2rem',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        fontSize: '2.2rem',
        marginBottom: '1rem',
        borderBottom: '4px solid white',
        paddingBottom: '0.5rem',
        letterSpacing: '1px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '500px',
        position: 'relative'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    },
    input: {
        padding: '0.5rem',
        borderRadius: '5px',
        border: 'none'
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '0 0 5px 5px',
        maxHeight: '150px',
        overflowY: 'auto',
        zIndex: 10,
        listStyle: 'none',
        margin: 0,
        padding: 0,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    dropdownItem: {
        padding: '0.5rem',
        cursor: 'pointer',
        borderBottom: '1px solid #ddd'
    },
    buttonGroup: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
    },
    save: {
        backgroundColor: '#C8102E',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1.5rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    back: {
        backgroundColor: 'gray',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1.5rem',
        borderRadius: '6px',
        cursor: 'pointer'
    }
};