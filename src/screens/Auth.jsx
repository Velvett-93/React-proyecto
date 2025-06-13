import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm'; // AÑADIDO para el login
import logo from '../../assets/icon.png';
import layoutStyle from '../styles/layouts';

const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [fakeDB, setFakeDB] = useState([]);

    const handleRegister = (email, password) => {
        const exists = fakeDB.find(user => user.email === email);
        if (exists) {
            alert("Usuario ya registrado");
            return;
        }
        setFakeDB([...fakeDB, { email, password }]);
        alert("Usuario registrado con éxito");
        setShowLogin(true);
    };

    const handleLogin = (email, password) => {
        const user = fakeDB.find(user => user.email === email && user.password === password);
        if (user) {
            alert("Login exitoso");
            // Aquí podrías navegar a otra pantalla si usas react-navigation
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <View style={layoutStyle.container}>
            <Image style={styles.logo} source={logo} />
            {showLogin ? 
                <LoginForm onLogin={handleLogin} toggle={() => setShowLogin(false)} /> 
                : <RegisterForm onRegister={handleRegister} toggle={() => setShowLogin(true)} />
            }
            <TouchableOpacity onPress={() => setShowLogin(!showLogin)}>
                <Text style={styles.toggleText}>
                    {showLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20
    },
    toggleText: {
        marginTop: 20,
        color: '#007bff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default Auth; 

