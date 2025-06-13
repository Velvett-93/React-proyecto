// src/components/LoginForm.js
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, Text } from 'react-native-paper';

const LoginForm = ({ onLogin, toggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        onLogin(email, password);
    };

    return (
        <View>
            <TextInput label="Email" value={email} onChangeText={setEmail} />
            <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button mode="contained" onPress={handleLogin} style={{ marginTop: 20 }}>Iniciar Sesión</Button>
        </View>
    );
};

export default LoginForm;
