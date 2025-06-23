import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Package, BarChart3, FileText, Trash2, LogOut } from 'lucide-react-native';
import InventoryScreen from './InventoryScreen';

const InventoryApp = ({ onLogout, userRole }) => {
    const [screenMode, setScreenMode] = useState(null);
    const handleCardClick = (mode) => {
        setScreenMode(mode);
        console.log(`Navegando a: ${mode}`);
    };

    // Llama a la función recibida por props
    const handleLogout = () => {
        console.log('Cerrando sesión...');
        if (onLogout) onLogout();
    };

        // Render condicional
    if (screenMode) {
        return (
            <InventoryScreen
                mode={screenMode}
                onBack={() => setScreenMode(null)}
            />
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerCircles}>
                    <View style={[styles.circle, { backgroundColor: '#3B82F6' }]} />
                    <View style={[styles.circle, { backgroundColor: '#22C55E' }]} />
                </View>
                <Text style={styles.headerTitle}>CAPPDI A.C.</Text>
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Principal</Text>
            </View>

            {/* Cards Grid */}
            <View style={styles.grid}>
                {/* Inventario Card: SOLO ADMIN*/}
                {userRole === 'admin' &&(
                <TouchableOpacity
                    onPress={() => handleCardClick('inventario')}
                    style={[styles.card, { backgroundColor: '#fff' }]}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconCircle, { backgroundColor: '#A78BFA' }]}>
                        <Package color="#fff" size={32} />
                    </View>
                    <Text style={styles.cardText}>Inventario</Text>
                </TouchableOpacity>
                )}
                {/* Movimientos Card: TODOS */}
                <TouchableOpacity
                    onPress={() => handleCardClick('movimientos')}
                    style={[styles.card, { backgroundColor: '#fff' }]}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconCircle, { backgroundColor: '#FACC15' }]}>
                        <BarChart3 color="#fff" size={32} />
                    </View>
                    <Text style={styles.cardText}>Movimientos</Text>
                </TouchableOpacity>
                {/* Reportes Card: TODOS */}
                <TouchableOpacity
                    onPress={() => handleCardClick('reportes')}
                    style={[styles.card, { backgroundColor: '#fff' }]}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconCircle, { backgroundColor: '#22C55E' }]}>
                        <FileText color="#fff" size={32} />
                    </View>
                    <Text style={styles.cardText}>Reportes</Text>
                </TouchableOpacity>
                {/* Eliminar Card */}
                {userRole === 'admin' &&(
                <TouchableOpacity
                    onPress={() => handleCardClick('eliminar')}
                    style={[styles.card, { backgroundColor: '#fff' }]}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconCircle, { backgroundColor: '#EF4444' }]}>
                        <Trash2 color="#fff" size={32} />
                    </View>
                    <Text style={styles.cardText}>Eliminar</Text>
                </TouchableOpacity>
                )}
            </View>

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Logout Button */}
            <View style={styles.logoutContainer}>
                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.logoutButton}
                    activeOpacity={0.8}
                >
                    <LogOut color="#fff" size={20} style={{ marginRight: 8 }} />
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom indicator */}
            <View style={styles.bottomIndicatorContainer}>
                <View style={styles.bottomIndicator} />
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        maxWidth: 400,
        alignSelf: 'center',
    },
    header: {
        backgroundColor: '#fff',
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerCircles: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
    circle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginHorizontal: 4,
    },
    headerTitle: {
        textAlign: 'center',
        color: '#2563EB',
        fontWeight: 'bold',
        fontSize: 18,
    },
    titleContainer: {
        padding: 24,
        paddingBottom: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginTop: 8,
    },
    card: {
        width: '47%',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    cardText: {
        color: '#374151',
        fontWeight: '600',
        textAlign: 'center',
    },
    logoutContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#7C3AED',
        borderRadius: 32,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomIndicatorContainer: {
        alignItems: 'center',
        paddingBottom: 12,
    },
    bottomIndicator: {
        width: 128,
        height: 4,
        backgroundColor: '#D1D5DB',
        borderRadius: 2,
    },
});

export default InventoryApp;