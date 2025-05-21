import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EstadisticasEquipo() {
    const [estadisticas, setEstadisticas] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:5000/api/estadisticasEquipo')
            .then(res => res.json())
            .then(data => setEstadisticas(data));

        fetch('http://localhost:5000/api/equipos')
            .then(res => res.json())
            .then(data => setEquipos(data));
    }, []);

    const eliminar = (id_equipo, temporada) => {
        if (!confirm(`¿Seguro que quieres eliminar la estadística de la temporada ${temporada}?`)) return;

        fetch(`http://localhost:5000/api/estadisticasEquipo/${id_equipo}/${temporada}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) {
                alert('Error al eliminar la estadística');
                return;
            }
            setEstadisticas(estadisticas.filter(e =>
                !(e.id_equipo === id_equipo && e.NombreTemporada === temporada)
            ));
        })
        .catch(() => {
            alert('Error de conexión al eliminar');
        });
    };

    const obtenerNombreEquipo = (id) => {
        const equipo = equipos.find(e => e.id_equipo === id);
        return equipo ? equipo.NombreEquipo : 'Equipo desconocido';
    };

    const estadisticasFiltradas = estadisticas.filter(e => {
        const equipo = equipos.find(eq => eq.id_equipo === e.id_equipo);
        if (!equipo) return false;
        return equipo.NombreEquipo.toLowerCase().includes(busqueda.toLowerCase());
    });

    return (
        <main style={styles.container}>

            <nav style={styles.navbar}>
                <button style={styles.navButton} onClick={() => router.push('/jugadores')}>Jugadores</button>
                <button style={styles.navButton} onClick={() => router.push('/estadisticas')}>Estadísticas jugadores</button>
                <button style={styles.navButton} onClick={() => router.push('/equipos')}>Equipos</button>
                <button style={styles.navButton} onClick={() => router.push('/estadisticas_equipo')}>Estadísticas equipos</button>
            </nav>

            <h1 style={styles.title}>Estadísticas de Equipos NBA</h1>

            <input
                type="text"
                placeholder="Buscar equipo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={styles.input}
            />

            <button onClick={() => router.push('/estadisticas_equipo/create')} style={styles.agregar}>
                Agregar Estadística
            </button>

            <ul style={styles.list}>
                {estadisticasFiltradas.map(e => (
                    <li key={e.id_equipo + e.NombreTemporada} style={styles.card}>
                        <strong>{obtenerNombreEquipo(e.id_equipo)}</strong><br />
                        Temporada: {e.NombreTemporada}<br />
                        GP: {e.TotalJuegos}, Ganados: {e.Ganados}, Perdidos: {e.Perdidos}<br />
                        Playoffs Ganados: {e.PlayOffGanados}, Playoffs Perdidos: {e.PlayoffPerdidos}, Finales: {e.Finales ? 'Sí' : 'No'}
                        <div style={styles.buttonGroup}>
                            <button
                                onClick={() => router.push(`/estadisticas_equipo/edit?id_equipo=${e.id_equipo}&nombre_temporada=${e.NombreTemporada}`)}
                                style={styles.editar}>
                                Editar
                            </button>
                            <button
                                onClick={() => eliminar(e.id_equipo, e.NombreTemporada)}
                                style={styles.eliminar}>
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}

const styles = {
    // ... (igual que tu código original)
    container: {
        background: 'linear-gradient(135deg, #0B1E3E 50%, #BF0A30 50%)',
        minHeight: '100vh',
        padding: '2rem',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    input: {
        width: '320px',
        padding: '0.6rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: 'none',
        outline: 'none',
        boxShadow: '0 0 6px rgba(0,0,0,0.3)',
        marginBottom: '1.5rem'
    },
    list: {
        listStyle: 'none',
        padding: 0,
        maxWidth: '800px',
        width: '100%'
    },
    card: {
        backgroundColor: '#fff',
        color: '#1D428A',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem'
    },
    agregar: {
        backgroundColor: '#C8102E',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1.5rem',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '1.5rem'
    },
    editar: {
        backgroundColor: '#1D428A',
        color: 'white',
        border: 'none',
        padding: '0.4rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    eliminar: {
        backgroundColor: 'gray',
        color: 'white',
        border: 'none',
        padding: '0.4rem 1rem',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    navbar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    },
    navButton: {
        backgroundColor: 'white',
        color: '#0B1E3E',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease'
    },
    title: {
        marginTop: '2.5rem',
        fontSize: '3rem',
        marginBottom: '2rem',
        borderBottom: '4px solid white',
        paddingBottom: '0.5rem',
        letterSpacing: '2px'
    },
};