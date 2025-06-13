import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { registerUser } from '../api/auth';

const RegisterForm = ({ toggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleRegister = async () => {
        if (!email || !password || !confirm) {
            alert('Completa todos los campos');
            return;
        }
        if (password !== confirm) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const res = await registerUser(email, password);
            alert(res.message);
            toggle(); // cambia a LoginForm después del registro
        } catch (err) {
            alert(err.message || 'Error al registrar');
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
            <TextInput
                label="Confirmar contraseña"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Registrarse
            </Button>
        </View>
    );
};

export default RegisterForm;

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

