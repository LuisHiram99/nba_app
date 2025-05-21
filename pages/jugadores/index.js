import { useEffect, useState } from 'react';

export default function ListaJugadores() {
    const [jugadores21, setJugadores21] = useState([]);
    const [jugadores22, setJugadores22] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/jugadores')
            .then(res => res.json())
            .then(data => setJugadores21(data));

        fetch('http://localhost:5000/api/jugadores/22_23')
            .then(res => res.json())
            .then(data => setJugadores22(data));
    }, []);

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Jugadores de la NBA</h1>

            <section style={styles.section}>
                <h2 style={styles.subtitle}>Temporada 2021–2022</h2>
                <ul style={styles.list}>
                    {jugadores21.map(j => (
                        <li key={j.id_jugador} style={styles.card}>
                            <strong>{j.NombreJugador} {j.ApellidoJugador}</strong><br />
                            Altura: {j.Altura_cm} cm<br />
                            Equipo: {j.TEAM_ABBREVIATION} (ID: {j.TEAM_ID})<br />
                            Temporada: {j.SEASON_ID}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subtitle}>Temporada 2022–2023</h2>
                <ul style={styles.list}>
                    {jugadores22.map(j => (
                        <li key={j.id_jugador} style={styles.card}>
                            <strong>{j.NombreJugador} {j.ApellidoJugador}</strong><br />
                            Altura: {j.Altura_cm} cm<br />
                            Equipo: {j.TEAM_ABBREVIATION} (ID: {j.TEAM_ID})<br />
                            Temporada: {j.SEASON_ID}
                        </li>
                    ))}
                </ul>
            </section>
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
        textAlign: 'center'
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        borderBottom: '4px solid white',
        paddingBottom: '0.5rem',
        letterSpacing: '2px'
    },
    section: {
        marginBottom: '3rem'
    },
    subtitle: {
        fontSize: '1.8rem',
        marginBottom: '1rem'
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
    }
};
