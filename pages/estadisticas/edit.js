import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditarEstadisticaJugador() {
    const router = useRouter();
    const { id, temporada } = router.query; // obtener ambos parámetros

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
        if (!id || !temporada) return;

        fetch('http://localhost:5000/api/estadisticasJugador')
            .then(res => res.json())
            .then(data => {
                const estadistica = data.find(e => 
                    e.id_jugador == id && e.NombreTemporada === temporada
                );
                if (estadistica) setForm(estadistica);
            });
    }, [id, temporada]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch(`http://localhost:5000/api/estadisticasJugador/${id}/${temporada}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                TotalJuegos: form.TotalJuegos,
                Puntos: form.Puntos,
                Asistencias: form.Asistencias,
                Rebotes: form.Rebotes,
                Bloqueos: form.Bloqueos
            })
        });

        const result = await res.json();
        console.log(result);

        if (res.ok) {
            router.push('/estadisticas');
        } else {
            alert(result.mensaje || 'Error al actualizar');
        }
    };

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Editar Estadísticas del Jugador</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                {['id_jugador', 'NombreTemporada', 'TotalJuegos', 'Puntos', 'Asistencias', 'Rebotes', 'Bloqueos'].map((key) => (
                    <div key={key} style={styles.inputGroup}>
                        <label>{key}:</label>
                        <input
                            type="text"
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            disabled={key === 'id_jugador' || key === 'NombreTemporada'}
                            style={styles.input}
                        />
                    </div>
                ))}
                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.save}>Actualizar</button>
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