// ValidaDoc - Informações dos documentos
// Este módulo contém as funções para obter informações adicionais sobre CPF e CNPJ

const DocumentInfo = (() => {
    // Obtém a região do CPF
    function getRawRegion(cpf) {
        const ninthDigit = parseInt(cpf.charAt(8));
        const regions = {
            0: "Rio Grande do Sul",
            1: "Distrito Federal, Goiás, Mato Grosso, Mato Grosso do Sul e Tocantins",
            2: "Amazonas, Pará, Roraima, Amapá, Acre e Rondônia",
            3: "Ceará, Maranhão e Piauí",
            4: "Paraíba, Pernambuco, Alagoas e Rio Grande do Norte",
            5: "Bahia e Sergipe",
            6: "Minas Gerais",
            7: "Rio de Janeiro e Espírito Santo",
            8: "São Paulo",
            9: "Paraná e Santa Catarina"
        };
        return regions[ninthDigit] || "Desconhecida";
    }

    // Obtém o estado do CPF
    function getCpfState(cpf) {
        const ninthDigit = parseInt(cpf.charAt(8));
        const states = {
            0: "RS",
            1: "DF, GO, MT, MS, TO",
            2: "AM, PA, RR, AP, AC, RO",
            3: "CE, MA, PI",
            4: "PB, PE, AL, RN",
            5: "BA, SE",
            6: "MG",
            7: "RJ, ES",
            8: "SP",
            9: "PR, SC"
        };
        return states[ninthDigit] || "Desconhecido";
    }

    // Obtém o tipo de CNPJ
    function getCnpjType(cnpj) {
        const firstDigit = parseInt(cnpj.charAt(8));
        if (firstDigit === 0) return "Matriz";
        return "Filial";
    }

    // Obtém o estado do CNPJ
    function getCnpjState(cnpj) {
        const stateCode = cnpj.substring(8, 10);
        const states = {
            "01": "DF", "02": "SP", "03": "RJ", "04": "MS", "05": "MG", "06": "AP",
            "07": "PA", "08": "RS", "10": "BA", "11": "CE", "12": "PE", "13": "AL",
            "14": "RN", "15": "PB", "16": "PI", "17": "MA", "18": "AM", "19": "GO",
            "20": "ES", "21": "MT", "22": "TO", "23": "RO", "24": "AC", "25": "SE",
            "26": "RR", "27": "SC", "28": "PR"
        };
        return states[stateCode] || "Desconhecido";
    }

    return {
        getRawRegion,
        getCpfState,
        getCnpjType,
        getCnpjState
    };
})();