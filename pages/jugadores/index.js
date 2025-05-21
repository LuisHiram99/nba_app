import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ListaJugadores() {
    const [jugadores, setJugadores] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:5000/api/jugadores')
            .then(res => res.json())
            .then(data => setJugadores(data));
    }, []);

    function eliminar(id) {
        fetch(`http://localhost:5000/api/jugadores/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setJugadores(jugadores.filter(j => j.id_jugador !== id));
        });
    }

    const jugadoresFiltrados = jugadores.filter(j =>
        (j.NombreJugador + ' ' + j.ApellidoJugador).toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main style={styles.container}>
            <nav style={styles.navbar}>
                <button style={styles.navButton} onClick={() => router.push('/jugadores')}>Jugadores</button>
                <button style={styles.navButton} onClick={() => router.push('/estadisticas')}>Estadísticas jugadores</button>
                <button style={styles.navButton} onClick={() => router.push('/equipos')}>Equipos</button>
                <button style={styles.navButton} onClick={() => router.push('/estadisticas_equipo')}>Estadísticas equipos</button>
            </nav>

            <h1 style={styles.title}>Lista de Jugadores</h1>

            <input
                type="text"
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={styles.input}
            />

            <button onClick={() => router.push('/jugadores/create')} style={styles.agregar}>
                Agregar Jugador
            </button>

            <ul style={styles.list}>
                {jugadoresFiltrados.map(j => (
                    <li key={j.id_jugador} style={styles.card}>
                        <strong>{j.NombreJugador} {j.ApellidoJugador}</strong><br />
                        Altura: {j.Altura_cm} cm
                        <div style={styles.buttonGroup}>
                            <button onClick={() => router.push(`/jugadores/edit?id=${j.id_jugador}`)} style={styles.editar}>Editar</button>
                            <button onClick={() => eliminar(j.id_jugador)} style={styles.eliminar}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}

const styles = {
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
    title: {
        fontSize: '2.5rem',
        marginBottom: '1.5rem',
        borderBottom: '4px solid white',
        paddingBottom: '0.5rem',
        letterSpacing: '2px'
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
        container_nav: {
        background: 'linear-gradient(135deg, #0B1E3E 50%, #BF0A30 50%)',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative'
    },
    title: {
        marginTop: '2.5rem',
        fontSize: '3rem',
        marginBottom: '2rem',
        borderBottom: '4px solid white',
        paddingBottom: '0.5rem',
        letterSpacing: '2px'
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
    }
};