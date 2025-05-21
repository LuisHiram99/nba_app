import { useEffect, useState } from 'react';

export default function EstadisticasJugadores() {
    const [estadisticas21, setEstadisticas21] = useState([]);
    const [estadisticas22, setEstadisticas22] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/estadisticas/21_22')
            .then(res => res.json())
            .then(data => setEstadisticas21(data));

        fetch('http://localhost:5000/api/estadisticas/22_23')
            .then(res => res.json())
            .then(data => setEstadisticas22(data));
    }, []);

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Estadísticas de Jugadores NBA</h1>

            <section style={styles.section}>
                <h2 style={styles.subtitle}>Temporada 2021–2022</h2>
                <ul style={styles.list}>
                    {estadisticas21.map(j => (
                        <li key={j.PERSON_ID} style={styles.card}>
                            <strong>{j.NOMBRE} {j.APELLIDO}</strong><br />
                            Altura: {j.ALTURA_CM} cm | Equipo: {j.TEAM_ABBREVIATION} ({j.TEAM_ID})<br />
                            Temporada: {j.SEASON_ID}<br />
                            GP: {j.GP}, PTS: {j.PTS}, AST: {j.AST}, REB: {j.REB}, BLK: {j.BLK}, MIN: {j.MIN}<br />
                            FG%: {j.FG_PCT}, FG3%: {j.FG3_PCT}, FT%: {j.FT_PCT}
                        </li>
                    ))}
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.subtitle}>Temporada 2022–2023</h2>
                <ul style={styles.list}>
                    {estadisticas22.map(j => (
                        <li key={j.PERSON_ID} style={styles.card}>
                            <strong>{j.NOMBRE} {j.APELLIDO}</strong><br />
                            Altura: {j.ALTURA_CM} cm | Equipo: {j.TEAM_ABBREVIATION} ({j.TEAM_ID})<br />
                            Temporada: {j.SEASON_ID}<br />
                            GP: {j.GP}, PTS: {j.PTS}, AST: {j.AST}, REB: {j.REB}, BLK: {j.BLK}, MIN: {j.MIN}<br />
                            FG%: {j.FG_PCT}, FG3%: {j.FG3_PCT}, FT%: {j.FT_PCT}
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
        maxWidth: '900px',
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
