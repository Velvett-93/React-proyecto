import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { loginUser } from '../api/auth';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Completa todos los campos');
            return;
        }

        try {
            const res = await loginUser(email, password);
            alert(res.message);
            onLogin(); // cambia a AuthScreen
        } catch (err) {
            alert(err.message || 'Error al iniciar sesión');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Iniciar Sesión
            </Button>
        </View>
    );
};

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
});

