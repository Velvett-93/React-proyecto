import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import layoutStyle from '../styles/layouts';
import logo from '../../assets/icon.png';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import InventoryApp from './InventoryApp';

const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // Nuevo estado para el rol

    const toggleForm = () => setShowLogin(prev => !prev);

    // Ahora recibe el rol desde LoginForm
    const handleLoginSuccess = (role) => {
        setUserRole(role);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
    };

    if (isLoggedIn) {
        return <InventoryApp userRole={userRole} onLogout={handleLogout} />;
    }

    return (
        <View style={layoutStyle.container}>
            <Image style={styles.logo} source={logo} />
            {showLogin ? (
                <>
                    <LoginForm onLogin={handleLoginSuccess} />
                    <TouchableOpacity onPress={toggleForm}>
                        <Text style={styles.switchText}>¿No tienes cuenta? Regístrate</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <RegisterForm toggle={toggleForm} />
                    <TouchableOpacity onPress={toggleForm}>
                        <Text style={styles.switchText}>¿Ya tienes cuenta? Inicia sesión</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default Auth;

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    switchText: {
        marginTop: 20,
        color: 'blue',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});