import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

const AuthScreen = () => {
    const handleLogout = () => {
        alert('Sesión finalizada. Reinicia la app para volver al login.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            <Text style={styles.subtitle}>Has iniciado sesión exitosamente.</Text>
            <View style={styles.content}>
                <Text>Aquí puedes empezar a construir tu funcionalidad principal.</Text>
            </View>
            <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
});
