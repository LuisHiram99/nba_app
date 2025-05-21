import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const [busqueda, setBusqueda] = useState('');
    const router = useRouter();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const texto = busqueda.trim();
            if (texto !== '') {
                router.push(`/buscar?nombre=${encodeURIComponent(texto)}`);
            }
        }
    };

    return (
        <main style={styles.container}>
            <h1 style={styles.title}>NBA</h1>
            <input
                type="text"
                placeholder="Busca un equipo"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyDown={handleKeyDown}
                style={styles.input}
            />
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
        textAlign: 'center'
    },
    title: {
        fontSize: '3rem',
        marginBottom: '2rem',
        borderBottom: '4px solid white',
        paddingBottom: '0.5rem',
        letterSpacing: '2px'
    },
    input: {
        width: '320px',
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '10px',
        border: 'none',
        outline: 'none',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
    }
};
