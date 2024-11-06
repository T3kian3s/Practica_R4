import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react-native";
import Register from "../../app/register";
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStoreRouteInfo } from 'expo-router/build/global-state/router-store';

// Mock the Alert module
jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('Register', () => {
    it('renders correctly', () => {
        render(<Register />)
        expect(screen.getByPlaceholderText('Correo')).toBeTruthy();
        expect(screen.getByPlaceholderText('Usuario')).toBeTruthy();
        expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
        expect(screen.getByPlaceholderText('Confirmar Contraseña')).toBeTruthy();
        expect(screen.getByText('Registrarse')).toBeTruthy();
        expect(screen.getByTestId('title')).toBeTruthy();
    });

    it('validate email', () => {
        render(<Register />)
        const emailInput = screen.getByPlaceholderText('Correo');
        const button = screen.getByText('Registrarse');
        fireEvent.changeText(emailInput, 'user@')
        fireEvent.press(button);
        const errorText = screen.getByText('Correo no válido.')
        expect(errorText).toBeTruthy();
    });

    it('validate user', () => {
        render(<Register />)
        const emailInput = screen.getByPlaceholderText('Correo');
        const userInput = screen.getByPlaceholderText('Usuario');
        const button = screen.getByText('Registrarse');
        fireEvent.changeText(emailInput, 'user@test.com')
        fireEvent.changeText(userInput, '')
        fireEvent.press(button);
        const errorText = screen.getByText('El campo no puede estar vacio.')
        expect(errorText).toBeTruthy();
    });

    it('validate password', () => {
        render(<Register />)
        const emailInput = screen.getByPlaceholderText('Correo');
        const userInput = screen.getByPlaceholderText('Usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText('Registrarse');
        fireEvent.changeText(emailInput, 'user@test.com')
        fireEvent.changeText(userInput, 'user')
        fireEvent.changeText(passwordInput, 'Password1!')
        fireEvent.press(button);
        const errorText = screen.getByText('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial.')
        expect(errorText).toBeTruthy();
    });

    it('submits the form', () => {
        render(<Register />)
        const emailInput = screen.getByPlaceholderText('Correo');
        const userInput = screen.getByPlaceholderText('Usuario');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const paswordInput2 = screen.getByPlaceholderText('Confirmar Contraseña');
        const button = screen.getByText('Registrarse');
        fireEvent.changeText(emailInput, 'user@test.com')
        fireEvent.changeText(userInput, 'user')
        fireEvent.changeText(passwordInput, 'Password1!')
        fireEvent.changeText(paswordInput2, 'Password1!')
        fireEvent.press(button);
        expect(Alert.alert).toHaveBeenCalledWith(
            'Éxito',
            'Registro exitoso.'
        );
    });
});