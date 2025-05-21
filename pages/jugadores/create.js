import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CrearJugador() {
    const router = useRouter();
    const [form, setForm] = useState({
        id_jugador: '',
        NombreJugador: '',
        ApellidoJugador: '',
        Altura_cm: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await fetch('http://localhost:5000/api/jugadores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        router.push('/jugadores');
    };

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Agregar Jugador</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>ID Jugador:</label>
                    <input
                        type="number"
                        name="id_jugador"
                        value={form.id_jugador}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="NombreJugador"
                        value={form.NombreJugador}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="ApellidoJugador"
                        value={form.ApellidoJugador}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Altura (cm):</label>
                    <input
                        type="number"
                        name="Altura_cm"
                        value={form.Altura_cm}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.save}>Guardar</button>
                    <button type="button" onClick={() => router.push('/jugadores')} style={styles.back}>Regresar</button>
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
        maxWidth: '500px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        padding: '0.5rem',
        borderRadius: '5px',
        border: 'none'
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