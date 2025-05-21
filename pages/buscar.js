import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Buscar() {
    const router = useRouter();
    const { nombre } = router.query;

    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!nombre) return;

        setLoading(true);

        fetch('http://localhost:5000/api/equipos')
            .then(res => res.json())
            .then(data => {
                const nombreLower = nombre.toLowerCase();
                const filtrados = data.filter(e =>
                    e.NombreEquipo.toLowerCase().includes(nombreLower)
                );
                setEquipos(filtrados);
                setLoading(false);
            });
    }, [nombre]);

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Resultados para: "{nombre}"</h1>

            {loading ? (
                <p style={styles.texto}>Buscando...</p>
            ) : equipos.length > 0 ? (
                <ul style={styles.list}>
                    {equipos.map(e => (
                        <li key={e.id_equipo} style={styles.card}>
                            <strong>{e.NombreEquipo}</strong> – {e.Ciudad}, {e.Estado} | {e.Abbrev} | {e.Conferencia} | Fundado en {e.AnioFundado}
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={styles.texto}>No se encontraron equipos.</p>
            )}

            <button onClick={() => router.push('/')} style={styles.boton}>
                Regresar al inicio
            </button>
        </main>
    );
}

const styles = {
    container: {
        backgroundColor: '#1D428A',
        minHeight: '100vh',
        padding: '2rem',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '2rem'
    },
    list: {
        listStyle: 'none',
        padding: 0,
        maxWidth: '800px',
        margin: '0 auto'
    },
    card: {
        backgroundColor: '#fff',
        color: '#1D428A',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    },
    texto: {
        fontSize: '1.1rem',
        fontStyle: 'italic',
        marginBottom: '2rem'
    },
    boton: {
        marginTop: '2rem',
        backgroundColor: '#C8102E',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer'
    }
};
