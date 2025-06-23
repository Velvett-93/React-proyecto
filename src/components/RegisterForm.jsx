import React, { use } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { registerUser } from '../api/auth';
import formStyles  from '../styles/form';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function initialValues() {
    return {
        username: '',
        email: '',
        password: '',
        confirm: ''
    };
}

function validationSchema() {
    return Yup.object({
        username: Yup.string()
            .required('Requerido'),
        email: Yup.string()
            .email('Correo inválido')
            .required('Requerido')
            .min(5, 'Mínimo 5 caracteres'),
        password: Yup.string()
            .min(6, 'Mínimo 6 caracteres')
            .required('Requerido'),
        confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
            .required('Requerido'),
    });
}

const RegisterForm = ({ toggle }) => {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formData, { setSubmitting, setErrors }) => {
            try {
                const res = await registerUser(formData.username, formData.email, formData.password);
                alert(`Usuario ${res.user.username} registrado con éxito`);
                toggle(); // cambia a LoginForm después del registro
            } catch (err) {
                alert(err.message || 'Error al registrar');
                setErrors({ email: 'Error al registrar' });
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <View style={styles.container}>
            <TextInput
                label="Usuario"
                value={formik.values.username}
                onChangeText={text => formik.setFieldValue('username', text)}
                autoCapitalize="none"
                style={formStyles.input}
                error={!!formik.errors.username && formik.touched.username}
                onBlur={() => formik.setFieldTouched('username')}
            />
            <HelperText type="error" visible={!!formik.errors.username && formik.touched.username}>
                {formik.errors.username}
            </HelperText>
            <TextInput
                label="Correo electrónico"
                value={formik.values.email}
                onChangeText={text => formik.setFieldValue('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={formStyles.input}
                error={!!formik.errors.email && formik.touched.email}
                onBlur={() => formik.setFieldTouched('email')}
            />
            <HelperText type="error" visible={!!formik.errors.email && formik.touched.email}>
                {formik.errors.email}
            </HelperText>
            <TextInput
                label="Contraseña"
                value={formik.values.password}
                onChangeText={text => formik.setFieldValue('password', text)}
                secureTextEntry
                style={styles.input}
                error={!!formik.errors.password && formik.touched.password}
                onBlur={() => formik.setFieldTouched('password')}
            />
            <HelperText type="error" visible={!!formik.errors.password && formik.touched.password}>
                {formik.errors.password}
            </HelperText>
            <TextInput
                label="Confirmar contraseña"
                value={formik.values.confirm}
                onChangeText={text => formik.setFieldValue('confirm', text)}
                secureTextEntry
                style={styles.input}
                error={!!formik.errors.confirm && formik.touched.confirm}
                onBlur={() => formik.setFieldTouched('confirm')}
            />
            <HelperText type="error" visible={!!formik.errors.confirm && formik.touched.confirm}>
                {formik.errors.confirm}
            </HelperText>
            <Button
                mode="contained"
                onPress={formik.handleSubmit}
                style={styles.button}
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
            >
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
        marginBottom: 2,
    },
    button: {
        marginTop: 10,
    },
});

