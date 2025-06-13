import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const RegisterForm = () => {
    return (
        <View style={styles.form}>
            <TextInput label="Email" placeholder="Enter your email" style={styles.input} />
            <TextInput label="Password" placeholder="Enter your password" secureTextEntry style={styles.input} />
            <TextInput label="Confirm Password" placeholder="Confirm your password" secureTextEntry style={styles.input} />

            <Button mode="contained" onPress={() => { }} style={styles.button}>
                Registrarse
            </Button>
        </View>
    );
};

export default RegisterForm;

const styles = StyleSheet.create({
    form: {
        width: '100%',
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
});
