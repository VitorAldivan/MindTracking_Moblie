import { Alert } from 'react-native';


function validarSenha(senha) {
    // Verifica se tem pelo menos 1 letra maiúscula e 1 caractere especial
    const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&#._-]).+$/;
    // Tamanho mínimo de 6 caracteres
    const tamanhoMinimo = senha.length >= 6;
    
    return regex.test(senha) && tamanhoMinimo;
}

function validarEmail(email) {
    // Regex para validar o formato do email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email); // Retorna true se o email for válido
}

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
        
        if (!validarEmail(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        if (!validarSenha(senha)) {
            alert("A senha deve conter:\n- Pelo menos 1 letra maiúscula\n- Pelo menos 1 caractere especial (@$!%*?&#._-)\n- Mínimo de 6 caracteres");
            return;
        }

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