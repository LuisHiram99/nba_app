import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CrearEstadisticaEquipo() {
    const router = useRouter();
    const [form, setForm] = useState({
        id_equipo: '',
        NombreTemporada: '',
        TotalJuegos: '',
        Ganados: '',
        Perdidos: '',
        PlayOffGanados: '',
        PlayoffPerdidos: '',
        Finales: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Validación simple
        if (!form.id_equipo || !form.NombreTemporada) {
            alert('Por favor completa los campos obligatorios: Equipo y Temporada.');
            return;
        }

        await fetch('http://localhost:5000/api/estadisticasEquipo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        router.push('/estadisticas_equipo');
    };

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Agregar Estadística de Equipo</h1>
            <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
                <div style={styles.inputGroup}>
                    <label>ID Equipo:</label>
                    <input
                        type="text"
                        name="id_equipo"
                        value={form.id_equipo}
                        onChange={handleChange}
                        placeholder="Ejemplo: 1610612737"
                        style={styles.input}
                    />
                </div>

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
                    <label>Ganados:</label>
                    <input
                        type="number"
                        name="Ganados"
                        value={form.Ganados}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Perdidos:</label>
                    <input
                        type="number"
                        name="Perdidos"
                        value={form.Perdidos}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>PlayOff Ganados:</label>
                    <input
                        type="number"
                        name="PlayOffGanados"
                        value={form.PlayOffGanados}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>PlayOff Perdidos:</label>
                    <input
                        type="number"
                        name="PlayoffPerdidos"
                        value={form.PlayoffPerdidos}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Finales (0 = no, 1 = sí):</label>
                    <input
                        type="number"
                        name="Finales"
                        value={form.Finales}
                        onChange={handleChange}
                        style={styles.input}
                        min="0"
                        max="1"
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.save}>Guardar</button>
                    <button type="button" onClick={() => router.push('/estadisticas_equipo')} style={styles.back}>Regresar</button>
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
        border: 'none',
        fontSize: '1rem'
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