import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, ScrollView, Image } from 'react-native';
import { ArrowLeft, X } from 'lucide-react-native';
import { createInventarioItem } from '../api/auth'; // Asegúrate de tener esta función para crear un nuevo item

const InventoryScreen = ({ mode = 'inventario', onBack }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        codigo: '',
        categoria: '',
        proveedor: '',
        cantidad: ''
    });

    const [inventoryItems, setInventoryItems] = useState([
        { id: 1, codigo: 'LG-01', categoria: 'LEGO', proveedor: 'Lego Company', cantidad: 25 },
        { id: 2, codigo: 'LG-02', categoria: 'LEGO', proveedor: 'Lego Company', cantidad: 15 },
        { id: 3, codigo: 'LG-03', categoria: 'LEGO', proveedor: 'Lego Company', cantidad: 30 },
        { id: 4, codigo: 'LG-04', categoria: 'LEGO', proveedor: 'Lego Company', cantidad: 20 },
        { id: 5, codigo: 'LG-05', categoria: 'LEGO', proveedor: 'Lego Company', cantidad: 18 }
    ]);

    const categorias = ['LEGO', 'Juguetes', 'Material Escolar', 'Deportes', 'Arte'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddItem = async () => {
        try {
            const newItem = {
                codigo: formData.codigo,
                categoria: formData.categoria,
                proveedor: formData.proveedor,
                cantidad: parseInt(formData.cantidad),
                estado: 'Bueno' // por defecto o puedes dejarlo vacío
            };
            await createInventarioItem(newItem);
            setFormData({ codigo: '', categoria: '', proveedor: '', cantidad: '' });
            setShowModal(false);
            // Si quieres agregarlo al estado local también:
            setInventoryItems([...inventoryItems, { id: Date.now(), ...newItem }]);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAddButton = () => {
        setSelectedItem(null);
        setShowModal(true);
    };

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleReserve = () => {
        if (selectedItem) {
            // Aquí iría la lógica para reservar el artículo
            console.log('Reservando artículo:', selectedItem.codigo);
            setInventoryItems(prevItems =>
                prevItems.map(item =>
                    item.id === selectedItem.id
                        ? { ...item, cantidad: item.cantidad - 1, estado: item.cantidad <= 1 ? 'Reservado' : 'Bueno' }
                        : item
                )
            );
            setShowModal(false);
            setSelectedItem(null);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                    <ArrowLeft size={24} color="#555" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Inventario de materiales</Text>
                {mode === 'inventario' && (
                    <TouchableOpacity
                        onPress={handleAddButton}
                        style={styles.addButton}
                    >
                        <Text style={styles.addButtonText}>Agregar</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Inventory List */}
            <ScrollView style={styles.listContainer}>
                {inventoryItems.map((item) => (
                    mode === 'reportes' ? (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.itemCard}
                            onPress={() => handleItemSelect(item)}
                        >
                            <View style={styles.itemInfo}>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemLabel}>Código</Text>
                                    <Text style={styles.itemValueCode}>{item.codigo}</Text>
                                </View>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemLabel}>Categoría</Text>
                                    <Text style={styles.itemValue}>{item.categoria}</Text>
                                </View>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemLabel}>Proveedor</Text>
                                    <Text style={styles.itemValue}>{item.proveedor}</Text>
                                </View>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemLabel}>Cantidad</Text>
                                    <Text style={styles.itemValueQty}>{item.cantidad} unidades</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View key={item.id} style={styles.itemCard}>
                            <View style={styles.itemInfo}>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemLabel}>Código</Text>
                                    <Text style={styles.itemValueCode}>{item.codigo}</Text>
                                </View>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemLabel}>Categoría</Text>
                                    <Text style={styles.itemValue}>{item.categoria}</Text>
                                </View>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemLabel}>Proveedor</Text>
                                    <Text style={styles.itemValue}>{item.proveedor}</Text>
                                </View>
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemLabel}>Cantidad</Text>
                                    <Text style={styles.itemValueQty}>{item.cantidad} unidades</Text>
                                </View>
                            </View>
                        </View>
                    )
                ))}
            </ScrollView>

            {/* ÚNICO MODAL */}
            <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    setShowModal(false);
                    setSelectedItem(null);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Modal para agregar inventario */}
                        {mode === 'inventario' && !selectedItem && (
                            <>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Agrega nuevo Inventario</Text>
                                    <TouchableOpacity
                                        onPress={() => setShowModal(false)}
                                        style={styles.iconButton}
                                    >
                                        <X size={24} color="#888" />
                                    </TouchableOpacity>
                                </View>

                                {/* Form Fields */}
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Código del producto</Text>
                                    <TextInput
                                        value={formData.codigo}
                                        onChangeText={text => handleInputChange('codigo', text)}
                                        placeholder="Ej: LG-06"
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Selecciona categoría</Text>
                                    <View style={styles.pickerContainer}>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                            {categorias.map((cat, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={[
                                                        styles.pickerOption,
                                                        formData.categoria === cat && styles.pickerOptionSelected
                                                    ]}
                                                    onPress={() => handleInputChange('categoria', cat)}
                                                >
                                                    <Text style={[
                                                        styles.pickerOptionText,
                                                        formData.categoria === cat && styles.pickerOptionTextSelected
                                                    ]}>{cat}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Escribe el Proveedor</Text>
                                    <TextInput
                                        value={formData.proveedor}
                                        onChangeText={text => handleInputChange('proveedor', text)}
                                        placeholder="Nombre del proveedor"
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Selecciona la cantidad</Text>
                                    <TextInput
                                        value={formData.cantidad}
                                        onChangeText={text => handleInputChange('cantidad', text)}
                                        placeholder="Cantidad disponible"
                                        keyboardType="numeric"
                                        style={styles.input}
                                    />
                                </View>

                                {/* Add Button */}
                                <TouchableOpacity
                                    onPress={handleAddItem}
                                    style={styles.addButtonModal}
                                >
                                    <Text style={styles.addButtonTextModal}>Agregar</Text>
                                </TouchableOpacity>

                                {/* Preview Section */}
                                {(formData.codigo || formData.categoria || formData.proveedor || formData.cantidad) && (
                                    <View style={styles.previewContainer}>
                                        <Text style={styles.previewTitle}>Vista previa:</Text>
                                        <View style={styles.previewCard}>
                                            <View style={styles.previewRow}>
                                                <Text style={styles.previewLabel}>Código:</Text>
                                                <Text style={styles.previewValue}>{formData.codigo || 'N/A'}</Text>
                                            </View>
                                            <View style={styles.previewRow}>
                                                <Text style={styles.previewLabel}>Categoría:</Text>
                                                <Text style={styles.previewValue}>{formData.categoria || 'N/A'}</Text>
                                            </View>
                                            <View style={styles.previewRow}>
                                                <Text style={styles.previewLabel}>Proveedor:</Text>
                                                <Text style={styles.previewValue}>{formData.proveedor || 'N/A'}</Text>
                                            </View>
                                            <View style={styles.previewRow}>
                                                <Text style={styles.previewLabel}>Cantidad:</Text>
                                                <Text style={styles.previewValueQty}>{formData.cantidad ? `${formData.cantidad} unidades` : 'N/A'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </>
                        )}

                        {/* Modal para reportes (detalle y reservar) */}
                        {mode === 'reportes' && selectedItem && (
                            <>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Inventario de materiales</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowModal(false);
                                            setSelectedItem(null);
                                        }}
                                        style={styles.closeButton}
                                    >
                                        <X color="#6B7280" size={24} />
                                    </TouchableOpacity>
                                </View>
                                {/* Código */}
                                <View style={styles.codeBanner}>
                                    <Text style={styles.codeText}>{selectedItem.codigo}</Text>
                                </View>

                                {/* Imagen */}
                                <Image
                                    source={{ uri: selectedItem.imagen || 'https://via.placeholder.com/300x200/e5e7eb/9ca3af?text=Sin+Imagen' }}
                                    style={styles.image}
                                    onError={() => { }}
                                />

                                {/* Estado */}
                                <View style={styles.estadoContainer}>
                                    <Text style={styles.estadoLabel}>ESTADO:</Text>
                                    <Text style={[
                                        styles.estadoValue,
                                        selectedItem.estado === 'Bueno' ? styles.estadoBueno :
                                            selectedItem.estado === 'Reservado' ? styles.estadoReservado :
                                                styles.estadoMalo
                                    ]}>
                                        {selectedItem.estado}
                                    </Text>
                                </View>

                                {/* Botón Reservar */}
                                <TouchableOpacity
                                    onPress={handleReserve}
                                    disabled={selectedItem.cantidad === 0}
                                    style={[
                                        styles.reserveButton,
                                        selectedItem.cantidad === 0 && styles.buttonDisabled
                                    ]}
                                >
                                    <Text style={[
                                        styles.reserveButtonText,
                                        selectedItem.cantidad === 0 && styles.buttonTextDisabled
                                    ]}>
                                        {selectedItem.cantidad > 0 ? 'Reservar' : 'No disponible'}
                                    </Text>
                                </TouchableOpacity>

                                {/* Detalles */}
                                <View style={styles.detailContainer}>
                                    <View style={styles.detailCard}>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Código:</Text>
                                            <Text style={styles.detailValuePurple}>{selectedItem.codigo}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Categoría:</Text>
                                            <Text style={styles.detailValue}>{selectedItem.categoria}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Proveedor:</Text>
                                            <Text style={styles.detailValue}>{selectedItem.proveedor}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Disponibles:</Text>
                                            <Text style={styles.detailValueGreen}>{selectedItem.cantidad} unidades</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Bottom indicator */}
            <View style={styles.bottomIndicatorContainer}>
                <View style={styles.bottomIndicator} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    header: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        elevation: 2,
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    itemCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        elevation: 1,
    },
    itemInfo: {},
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    itemLabel: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    itemValue: {
        fontSize: 13,
        color: '#333',
    },
    itemValueCode: {
        fontSize: 13,
        color: '#8B5CF6',
        fontWeight: 'bold',
    },
    itemValueQty: {
        fontSize: 13,
        color: '#059669',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        width: '100%',
        maxWidth: 350,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    formGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#F9FAFB',
        fontSize: 14,
    },
    pickerContainer: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    pickerOption: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: '#E5E7EB',
        marginRight: 8,
    },
    pickerOptionSelected: {
        backgroundColor: '#8B5CF6',
    },
    pickerOptionText: {
        color: '#333',
        fontSize: 14,
    },
    pickerOptionTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButtonModal: {
        backgroundColor: '#8B5CF6',
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    addButtonTextModal: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    previewContainer: {
        marginTop: 16,
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        padding: 12,
    },
    previewTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 8,
    },
    previewCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        elevation: 1,
    },
    previewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    previewLabel: {
        color: '#666',
        fontSize: 13,
    },
    previewValue: {
        color: '#8B5CF6',
        fontWeight: 'bold',
        fontSize: 13,
    },
    previewValueQty: {
        color: '#059669',
        fontWeight: 'bold',
        fontSize: 13,
    },
    bottomIndicatorContainer: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    bottomIndicator: {
        width: 128,
        height: 4,
        backgroundColor: '#D1D5DB',
        borderRadius: 2,
    },
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        zIndex: 50
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 16,
        width: '100%',
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937'
    },
    closeButton: {
        padding: 8,
        borderRadius: 100
    },
    codeBanner: {
        backgroundColor: '#4B5563',
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 12
    },
    codeText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#E5E7EB'
    },
    estadoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
        marginBottom: 16
    },
    estadoLabel: {
        fontWeight: '500',
        color: '#374151'
    },
    estadoValue: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 'bold'
    },
    estadoBueno: {
        backgroundColor: '#D1FAE5',
        color: '#065F46'
    },
    estadoReservado: {
        backgroundColor: '#FEF3C7',
        color: '#92400E'
    },
    estadoMalo: {
        backgroundColor: '#FECACA',
        color: '#991B1B'
    },
    reserveButton: {
        backgroundColor: '#8B5CF6',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        marginBottom: 16
    },
    reserveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonDisabled: {
        backgroundColor: '#D1D5DB'
    },
    buttonTextDisabled: {
        color: '#6B7280'
    },
    detailContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        padding: 12
    },
    detailCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 12
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    detailLabel: {
        color: '#6B7280',
        fontSize: 14
    },
    detailValue: {
        color: '#1F2937',
        fontSize: 14
    },
    detailValuePurple: {
        color: '#7C3AED',
        fontWeight: 'bold',
        fontSize: 14
    },
    detailValueGreen: {
        color: '#059669',
        fontWeight: 'bold',
        fontSize: 14
    }
});

export default InventoryScreen;