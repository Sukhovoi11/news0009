import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

export default function AppButton({ title, onPress, variant = 'primary', style }) {
    // Определяем стиль кнопки в зависимости от типа (primary/secondary)
    const isSecondary = variant === 'secondary';

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            // В вебе добавим курсор-указатель, чтобы было понятно, что это кнопка
            style={[
                styles.button,
                isSecondary ? styles.secondaryButton : styles.primaryButton,
                style,
                Platform.select({
                    web: { cursor: 'pointer' }
                })
            ]}
        >
            <Text style={[
                styles.text,
                isSecondary ? styles.secondaryText : styles.primaryText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        // Тень для мобилок
        elevation: 4,
        // Тень для веба и iOS
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    primaryButton: {
        backgroundColor: '#800020', // Наш бордовый
        borderWidth: 1,
        borderColor: '#D4AF37', // Золотая кайма
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#D4AF37',
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: '#D4AF37',
    },
});