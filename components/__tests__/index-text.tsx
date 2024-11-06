import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react-native";
import Index from "../../app/index";
import { Alert } from 'react-native';

// Mock the Alert module
jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

describe('Index', () => {
    it('renders correctly', () => {
        render(<Index />);
        expect(screen.getByPlaceholderText('Correo')).toBeTruthy();
        expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
        expect(screen.getByText('Registrate')).toBeTruthy();
        expect(screen.getByTestId('icon-image')).toBeTruthy();
    });

    it('validate email', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Correo');
        const button = screen.getByText('Iniciar Sesión');
        fireEvent.changeText(emailInput, 'user@')
        fireEvent.press(button);
        const errorText = screen.getByText('Correo no válido.');
        expect(errorText).toBeTruthy();
    });

    it('validate password', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Correo');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText('Iniciar Sesión');
        fireEvent.changeText(emailInput, 'user@test.com')
        fireEvent.changeText(passwordInput, 'password')
        fireEvent.press(button);
        const errorText = screen.getByText('Contraseña no válida.');
        expect(errorText).toBeTruthy();
    });

    it('submits the form', () => {
        render(<Index />);
        const emailInput = screen.getByPlaceholderText('Correo');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText('Iniciar Sesión');
        fireEvent.changeText(emailInput, 'user@test.com')
        fireEvent.changeText(passwordInput, 'Password1!')
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'Éxito',
            'Inicio de Sesión Exitoso.'
        );
    });
});