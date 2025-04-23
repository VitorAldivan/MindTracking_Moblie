import React, { useState } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { loginUser } from '../js/fetchLogin'; // Importa a função de login

const { width, height } = Dimensions.get('window');

export default function PreLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await loginUser(email, senha);
      if (response) {
        console.log('Login bem-sucedido:', response);
        Alert.alert('Sucesso', 'Bem-vindo de volta!');
        navigation.navigate('questionnaire'); // Redireciona para a próxima tela após login bem-sucedido
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#070C18', '#213975']}
        style={styles.innerContainer}
      >
        <Image
          source={require('../../assets/icons/logo.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Entre e continue cuidando da sua mente</Text>

        <View style={styles.inputContainer}>
          <FontAwesome6 name="circle-user" size={24} style={styles.icon} color="white" />
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="#ccc"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Octicons name="lock" size={24} color="white" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#ccc"
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('verification')}>
          <Text style={styles.bottompassword}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.primaryButton}>
          <Text style={styles.primaryText}>Fazer login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('cadastre')}>
          <Text style={styles.bottomText}>
            Não tem uma conta? <Text style={styles.link}>Registrar-se</Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    paddingTop: height * 0.08,
    paddingBottom: height * 0,
  },
  logo: {
    width: width * 0.18,
    height: width * 0.18,
    resizeMode: 'contain',
    marginBottom: height * 0.03,
    marginTop: height * 0.1,
  },
  title: {
    marginBottom: height * 0.01,
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.038,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: height * 0.06,
  },
  bottompassword: {
    marginRight: width * 0.45,
    color: '#ccc',
    marginTop: height * 0.0,
    fontSize: width * 0.035,
    paddingBottom: height * 0.03,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#29374F',
    borderWidth: 1,
    borderColor: '#2544F4',
    borderRadius: 50,
    paddingHorizontal: width * 0.04,
    width: width * 0.851,
    height: height * 0.069,
    marginBottom: height * 0.025,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#2E5BFF',
    width: width * 0.85,
    height: height * 0.055,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.015,
  },
  primaryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  bottomText: {
    color: '#ccc',
    marginTop: height * 0.03,
    fontSize: width * 0.035,
    textAlign: 'center',
  },
  link: {
    color: 'white',
    fontWeight: 'bold',
  },
});

