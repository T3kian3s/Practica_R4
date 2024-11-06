import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from "react-native";
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
const ErrorText = styled(Text)`
  font-size: 12px;
  margin.bottom: 10px; 
`
const Title = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  margin: 10px;
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
export default function Register() {
  const [newEmail, setNewEmail] = useState('');
  const [newEmailError, setNewEmailError] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newUserError, setNewUserError] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPwsVisible, setIsConfirmPwsVisible] = useState(false);
  const router = useRouter();
  
// Validaciones para el campo del CORREO.
  const validacionesNewEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
// Validaciones para el campo de la CONTRASEÑA.
  const validacionesNewPassword = (firstPsw: string, secondPsw: string) => {
    const longitudValida = firstPsw.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(firstPsw);
    const tieneMinuscula = /[a-z]/.test(firstPsw);
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(firstPsw);
    const mismasContraseñas = (firstPsw === secondPsw);

    return longitudValida && tieneMayuscula && tieneMinuscula && tieneCaracterEspecial && mismasContraseñas;
  }
// Validaciones para el campo del Usuario.
  const validacionesNewUser = (user: string) => {
    return user.trim().length > 0;
  }

// Boton para validacion de campos.
  const onPressSendData = () => {
    let validacion = true;

    if(!validacionesNewEmail(newEmail)) {
      setNewEmailError('Correo no válido.');
      validacion = false;
    } else {
      setNewEmailError('');
    }

    if(!validacionesNewPassword(newPassword, confirmPassword)) {
      setNewPasswordError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un carácter especial.');
      validacion = false;
    } else {
      setNewPasswordError('');
    }

    if(!validacionesNewUser(newUser)) {
      setNewUserError('El campo no puede estar vacio.');
      validacion = false;
    } else {
      setNewUserError('');
    }

    if (validacion) {
      Alert.alert('Éxito', 'Registro exitoso.');
        router.push({
          pathname: "/",
        });
    }
  }

  return (
    <MainContainer>
      <Title
        testID = "title"
      >Registro</Title>
      <Input 
        onChangeText = { setNewEmail }
        value = { newEmail }
        placeholder = "Correo"
      />
      {newEmailError ? <ErrorText style={{ color: 'red' }}>{ newEmailError }</ErrorText> : null}

      <Input 
        onChangeText = { setNewUser }
        value = { newUser }
        placeholder = "Usuario"
      />
      {newUserError ? <ErrorText style={{ color: 'red' }}>{ newUserError }</ErrorText> : null}

      <PasswordContainer>
        <PasswordInput 
          onChangeText = { setNewPassword }
          value = { newPassword }
          placeholder = "Contraseña"
          secureTextEntry = {!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <ToggleText>{isPasswordVisible ? "Ocultar" : "Mostrar"}</ToggleText>
        </TouchableOpacity>
      </PasswordContainer>

      <PasswordContainer>
      <PasswordInput
          onChangeText = { setConfirmPassword }
          value = { confirmPassword }
          placeholder = "Confirmar Contraseña"
          secureTextEntry = {!isConfirmPwsVisible}
          />
        <TouchableOpacity onPress={() => setIsConfirmPwsVisible(!isConfirmPwsVisible)}>
          <ToggleText>{isConfirmPwsVisible ? "Ocultar" : "Mostrar"}</ToggleText>
        </TouchableOpacity>
      </PasswordContainer>
      {newPasswordError ? <ErrorText style={{ color: 'red', textAlign: 'center' }}>{ newPasswordError }</ErrorText> : null}

      <Button
        onPress = { onPressSendData }
        title = { "Registrarse" }
      />
    </MainContainer>
  );
};