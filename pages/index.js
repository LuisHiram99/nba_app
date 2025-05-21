import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    return (
        <main style={styles.container}>
            <nav style={styles.navbar}>
                <button style={styles.navButton} onClick={() => router.push('/jugadores')}>Jugadores</button>
                <button style={styles.navButton} onClick={() => router.push('/estadisticas')}>Estadísticas jugadores</button>
                <button style={styles.navButton} onClick={() => router.push('/equipos')}>Equipos</button>
            </nav>

            <h1 style={styles.title}>NBA</h1>
        </main>
    );
}

const styles = {
    container: {
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
