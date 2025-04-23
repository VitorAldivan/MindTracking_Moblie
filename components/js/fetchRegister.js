import { Alert } from "react-native";

// Função de validação de data de nascimento (12 anos ou mais)
function validarDataNascimento(dataNascimento) {
    // Se não houver data selecionada, retorna falso
    if (!dataNascimento) return false;
    
    // Cria objeto Date com a data de nascimento informada
    const dataNasc = new Date(dataNascimento);
    // Obtém a data atual
    const hoje = new Date();
    
    // Calcula a idade subtraindo os anos
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    
    // Obtém o mês e dia atual (0-11 para meses)
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    
    if (mesAtual < dataNasc.getMonth() || 
    (mesAtual === dataNasc.getMonth() && diaAtual < dataNasc.getDate())) {
        idade--;
    }
    
    // Retorna true se a idade for 12 ou mais
    return idade >= 12 && idade <= 90;
}

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

        if (!/^[A-Za-zÀ-ÿ ]+$/.test(nome)) {
            alert("Por favor, insira um nome válido (apenas letras e espaços).");
            return;
        }

        if (!validarEmail(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        if (!validarDataNascimento(dataNascimento)) {
            Alert.alert('Erro', 'Você deve ter entre 12 anos ou 90 anos para se registrar.');
            return;
        }

        if (!validarSenha(senha)) {
            alert("A senha deve conter:\n- Pelo menos 1 letra maiúscula\n- Pelo menos 1 caractere especial (@$!%*?&#._-)\n- Mínimo de 6 caracteres");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

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