# 📑 ValidaDoc - Validador Seguro de CPF/CNPJ

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Security](https://img.shields.io/badge/Security-100%25%20Client--Side-brightgreen)

Uma ferramenta moderna para validação segura de documentos brasileiros, desenvolvida com foco em privacidade e experiência do usuário.

**Live Demo**: [https://inojoza28.github.io/ValidaDoc](https://inojoza28.github.io/ValidaDoc)

## ✨ Funcionalidades Principais

- **Validação Instantânea** de CPF e CNPJ
- **Processamento 100% Local** - Nenhum dado enviado à servidores
- **Algoritmos Oficiais** da Receita Federal
- **Máscara Dinâmica** de entrada
- **Informações Regionais** detalhadas
- **Interface Responsiva** para todos os dispositivos
- **Feedback Visual** com animações
- **Explicações Detalhadas** dos resultados
- **Modo Seguro** com proteção contra dados inválidos

## 🛠 Tecnologias Utilizadas

- **Tailwind CSS** - Estilização moderna
- **Font Awesome** - Ícones intuitivos
- **Vanilla JavaScript** - Performance pura
- **HTML5** - Semântica moderna
- **CSS Animations** - Transições suaves

## 🚀 Como Usar

1. Clone o repositório:
```bash
git clone https://github.com/inojoza28/ValidaDoc.git
```

2. Abra o arquivo `index.html` em qualquer navegador moderno.

3. Interface intuitiva:
- Selecione CPF ou CNPJ
- Digite o documento com ou sem formatação
- Receba validação instantânea
- Explore detalhes regionais e informações técnicas

## 🔍 Detalhes de Validação

### CPF
- Verifica dígitos verificadores
- Detecta números sequenciais (ex: 111.111.111-11)
- Identifica região de emissão
- Valida formato oficial

### CNPJ
- Checagem matemática de dígitos
- Detecção de matriz/filial
- Verificação de unidade federativa
- Validação de formato padrão

## 🛡 Segurança

| Característica | Benefício |
|----------------|-----------|
| Zero Backend | Sem risco de vazamento de dados |
| Processamento Local | Nenhum dado trafegado na rede |
| Algoritmos Oficiais | Precisão garantida |
| Auto-destruição de Dados | Informações não persistem após validação |


## 📄 Licença

Distribuído sob licença MIT. Veja `LICENSE` para mais informações.

## 🙏 Reconhecimentos

- Algoritmos oficiais da Receita Federal do Brasil
- Ícones por [Font Awesome](https://fontawesome.com)
- Design System por [Tailwind CSS](https://tailwindcss.com)

---

**Nota Legal**: Esta ferramenta verifica apenas a validade matemática do documento. Não substitui consultas oficiais nos órgãos competentes.
