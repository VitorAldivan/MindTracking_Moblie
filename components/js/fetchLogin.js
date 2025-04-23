import { Alert } from 'react-native';

export async function loginUser(email, senha) {
    try {
        const response = await fetch('http://172.16.3.231:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            return data; // Retorna os dados do usuário e o token
        } else {
            const errorData = await response.json();
            Alert.alert('Erro', errorData.message || 'Erro ao realizar login.');
        }
    } catch (error) {
        Alert.alert('Erro', 'Erro ao conectar ao servidor.');
        console.error('Erro ao fazer login:', error);
    }
}