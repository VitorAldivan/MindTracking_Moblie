import { Alert } from "react-native";

export async function fetchRegister(nome, email, senha, confirmarSenha, dataNascimento) {
    try {
        const response = await fetch("http://172.16.3.231:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                confirmarSenha: confirmarSenha,
                data_nascimento: dataNascimento,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
            return data;
        } else {
            const errorData = await response.json();
            Alert.alert('Erro', errorData.message || 'Erro ao registrar o usuário.');
        }
    } catch (error) {
        Alert.alert('Erro', 'Erro ao conectar ao servidor.');
        console.error('Erro ao registrar:', error);
    }
}