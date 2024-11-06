import React, { useState } from "react";
import { Image, View, TextInput, Button, Text, Alert, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

const MainContainer = styled(View)`
  flex: 1;
  flexDirection: column;
  justify-content: center;
  align-items: center;
  background-color: #F5FCFF;
`
const Input = styled(TextInput)`
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
  margin-bottom: 5px;
  height: 40px;
  padding: 10px;
`
const MyImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`
const ErrorText = styled(Text)`
  font-size: 12px;
  margin.bottom: 10px; 
`
const PasswordContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
  margin-bottom: 5px;
`
const PasswordInput = styled(TextInput)`
  flex: 1;
  height: 40px;
  padding: 10px;
`
const ToggleText = styled(Text)`
  color: black;
  padding: 10px;
`

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

// Enviar a la pagina de REGISTRO
  const onPressSendRegister = () => {
    router.push({
      pathname: "./register",
    });
  }
// Validaciones para EMAIL
  const validacionEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
// Validaciones para CONTRASEÑA
  const validacionContraseña = (password: string) => {
    const longitudValida = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return longitudValida && tieneMayuscula && tieneMinuscula && tieneCaracterEspecial;
  }
// Envio de data para inicio de sesion
  const onPressToSendData = () => {
    let validacion = true;

    if(!validacionEmail(email)) {
      setEmailError('Correo no válido.');
      validacion = false;
    } else {
      setEmailError('');
    }

    if(!validacionContraseña(password)) {
      setPasswordError('Contraseña no válida.');
      validacion = false;
    } else {
      setPasswordError('');
    }

    if (validacion) {
      Alert.alert('Éxito', 'Inicio de Sesión Exitoso.');
    }
  }
 
  return (
    <MainContainer>
      <MyImage
        source = {require('./img/icon-react.png')}
        testID = "icon-image"
      />
      <Input
        onChangeText={ setEmail }
        value = { email }
        placeholder = "Correo"
      />
      {emailError ? <ErrorText style={{ color: 'red' }}>{ emailError }</ErrorText> : null}

      <PasswordContainer>
        <PasswordInput 
          onChangeText = { setPassword }
          value = { password }
          placeholder = "Contraseña"
          secureTextEntry = {!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <ToggleText>{isPasswordVisible ? "Ocultar" : "Mostrar"}</ToggleText>
        </TouchableOpacity>
      </PasswordContainer>
      {passwordError ? <ErrorText style={{ color: 'red', textAlign: 'center' }}>{ passwordError }</ErrorText> : null}

      <Button
      onPress = { onPressToSendData }
      title = "Iniciar Sesión"
      />
      <TouchableOpacity>
        <Text 
          onPress = { onPressSendRegister }
          style = {{ color: 'darkblue' }}
          accessibilityLabel="Register button"
        >Registrate</Text>
      </TouchableOpacity>
    </MainContainer>
  );
};