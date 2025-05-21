import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditarEstadisticaEquipo() {
    const router = useRouter();
    const { id_equipo, nombre_temporada } = router.query;

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

    useEffect(() => {
        if (!id_equipo || !nombre_temporada) return;

        fetch('http://localhost:5000/api/estadisticasEquipo')
            .then(res => res.json())
            .then(data => {
                const estadistica = data.find(e =>
                    e.id_equipo == id_equipo && e.NombreTemporada === nombre_temporada
                );
                if (estadistica) setForm(estadistica);
            });
    }, [id_equipo, nombre_temporada]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/api/estadisticasEquipo/${id_equipo}/${nombre_temporada}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    TotalJuegos: parseInt(form.TotalJuegos),
                    Ganados: parseInt(form.Ganados),
                    Perdidos: parseInt(form.Perdidos),
                    PlayOffGanados: parseInt(form.PlayOffGanados),
                    PlayoffPerdidos: parseInt(form.PlayoffPerdidos),
                    Finales: form.Finales === '1' || form.Finales === 1 || form.Finales === true ? 1 : 0
                })
            });

            const result = await res.json();
            console.log('Respuesta del servidor:', result);

            if (res.ok) {
                router.push('/estadisticas_equipo');
            } else {
                alert(result.mensaje || 'Error al actualizar');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error de conexión al actualizar');
        }
    };

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Editar Estadística del Equipo</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                {[
                    'id_equipo',
                    'NombreTemporada',
                    'TotalJuegos',
                    'Ganados',
                    'Perdidos',
                    'PlayOffGanados',
                    'PlayoffPerdidos',
                    'Finales'
                ].map((key) => (
                    <div key={key} style={styles.inputGroup}>
                        <label>{key}:</label>
                        <input
                            type="text"
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            disabled={key === 'id_equipo' || key === 'NombreTemporada'}
                            style={styles.input}
                        />
                    </div>
                ))}
                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.save}>Actualizar</button>
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