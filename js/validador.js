// ValidaDoc - Módulo de validação
// Este módulo contém as funções de validação de CPF e CNPJ

const ValidatorModule = (() => {
    // Valida CPF
    function validateCPF(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');
        
        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }
        
        // Verifica CPFs inválidos conhecidos
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        
        // Primeiro dígito de validação
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        
        let remainder = 11 - (sum % 11);
        let firstDigit = remainder >= 10 ? 0 : remainder;
        
        if (parseInt(cpf.charAt(9)) !== firstDigit) {
            return false;
        }
        
        // Segundo dígito de validação
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        
        remainder = 11 - (sum % 11);
        let secondDigit = remainder >= 10 ? 0 : remainder;
        
        return parseInt(cpf.charAt(10)) === secondDigit;
    }

    // Valida CNPJ
    function validateCNPJ(cnpj) {
        // Remove caracteres não numéricos
        cnpj = cnpj.replace(/\D/g, '');
        
        // Verifica se o CNPJ tem 14 dígitos
        if (cnpj.length !== 14) {
            return false;
        }
        
        // Verifica CNPJs inválidos conhecidos
        if (/^(\d)\1{13}$/.test(cnpj)) {
            return false;
        }
        
        // Primeiro dígito de validação
        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        let digits = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;
        
        for (let i = size; i >= 1; i--) {
            sum += parseInt(numbers.charAt(size - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== parseInt(digits.charAt(0))) {
            return false;
        }
        
        // Segundo dígito de validação
        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;
        
        for (let i = size; i >= 1; i--) {
            sum += parseInt(numbers.charAt(size - i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        
        return result === parseInt(digits.charAt(1));
    }

    return {
        validateCPF,
        validateCNPJ
    };
})();