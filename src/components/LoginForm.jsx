import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { loginUser, getUserWithRole } from '../api/auth'; // Importa la función

const LoginForm = ({ onLogin }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');
        if (!identifier || !password) {
            setError('Completa todos los campos');
            return;
        }

        try {
            const res = await loginUser(identifier, password);
            const token = res.jwt;
            // Segunda petición para obtener el rol
            const userData = await getUserWithRole(token);
            const role = userData.role?.name?.toLowerCase() || 'usuario';
            Alert.alert('Éxito', res.message || 'Inicio de sesión exitoso');
            onLogin(role); // Pasa el rol a Auth
        } catch (err) {
            const errorMsg =
                err?.response?.data?.message ||
                err?.message ||
                'Error desconocido';
            setError(errorMsg);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Correo electrónico"
                value={identifier}
                onChangeText={setIdentifier}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                error={!!error}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                error={!!error}
            />
            <HelperText type="error" visible={!!error}>
                {error}
            </HelperText>
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

