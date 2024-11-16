export const validateName = (name: string): string | null => {
    if (!name.trim()) {
        return "Nome é obrigatório."
    }

    return null;
}

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return "Email é obrigatório."
    }

    if (!emailRegex.test(email)) {
        return 'E-mail inválido.';
    }
    return null;
};

export const validatePassword = (password: string, confirmPassword: string): string | null => {

    if(!password) {
        return "Senha é obrigatória.";
    }

    if(!confirmPassword) {
        return "Confirme sua senha.";
    }

    if (password.length < 8) {
        return 'A senha deve ter pelo menos 8 caracteres';
    }

    if(password !== confirmPassword){
        return "As senhas não coincidem.";
    }

    return null;
};

export const validatePasswordLogin = (passwordLogin: string) => {
    if(!passwordLogin) {
        return "A senha é obrigatória.";
    }
}