// ValidaDoc - Arquivo principal
// Este arquivo inicializa o aplicativo e gerencia a interação entre os módulos

document.addEventListener('DOMContentLoaded', () => {
    // Importação dos módulos
    const UI = (() => {
        // Elementos do DOM
        const elements = {
            documentInput: document.getElementById('document-input'),
            validateBtn: document.getElementById('validate-btn'),
            cpfBtn: document.getElementById('cpfBtn'),
            cnpjBtn: document.getElementById('cnpjBtn'),
            validIcon: document.getElementById('valid-icon'),
            invalidIcon: document.getElementById('invalid-icon'),
            validationMessage: document.getElementById('validation-message'),
            resultCard: document.getElementById('result-card'),
            resultContent: document.getElementById('result-content'),
            resultDetails: document.getElementById('result-details'),
            documentIcon: document.getElementById('document-icon'),
            tabBtns: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content')
        };

        // Inicialização dos tabs
        elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => handleTabClick(btn));
        });

        // Gerenciamento de tabs
        function handleTabClick(clickedBtn) {
            // Remove a classe ativa de todos os botões e conteúdos
            elements.tabBtns.forEach(b => {
                b.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
                b.classList.add('text-gray-500');
            });
            
            elements.tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Adiciona a classe ativa ao botão clicado
            clickedBtn.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
            clickedBtn.classList.remove('text-gray-500');
            
            // Mostra o conteúdo correspondente
            const tabId = clickedBtn.id.replace('tab-', 'tab-content-');
            document.getElementById(tabId).classList.remove('hidden');
        }

        // Gerencia responsividade
        function handleResponsive() {
            if (window.innerWidth < 640) {
                // Ajustes para dispositivos móveis
                document.querySelectorAll('.security-features > div').forEach(feature => {
                    feature.classList.add('p-3', 'border', 'border-gray-100', 'rounded-lg');
                });
            } else {
                // Ajustes para desktop
                document.querySelectorAll('.security-features > div').forEach(feature => {
                    feature.classList.remove('p-3', 'border', 'border-gray-100', 'rounded-lg');
                });
            }
        }

        // Simulação de carregamento para efeito profissional
        function simulateLoading() {
            elements.validateBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Validando...</span>
            `;
            
            setTimeout(() => {
                elements.validateBtn.innerHTML = `
                    <i class="fas fa-check-double mr-2"></i>
                    <span>Validar documento</span>
                `;
            }, 800);
        }

        return {
            elements,
            handleResponsive,
            simulateLoading
        };
    })();

    // Gerenciador do tipo de documento
    const DocumentManager = (() => {
        let documentType = 'cpf'; // Padrão

        function getDocumentType() {
            return documentType;
        }

        function setDocumentType(type) {
            documentType = type;
        }

        function updateInputMask() {
            const { documentInput, documentIcon } = UI.elements;
            
            if (documentType === 'cpf') {
                documentInput.placeholder = '000.000.000-00';
                documentInput.maxLength = 14;
                documentIcon.classList.remove('fa-building');
                documentIcon.classList.add('fa-id-card');
            } else {
                documentInput.placeholder = '00.000.000/0000-00';
                documentInput.maxLength = 18;
                documentIcon.classList.remove('fa-id-card');
                documentIcon.classList.add('fa-building');
            }
            // Limpa o input ao trocar o tipo de documento
            documentInput.value = '';
            ValidationUI.resetValidation();
        }

        function toggleDocumentTypeButtons() {
            const { cpfBtn, cnpjBtn } = UI.elements;
            
            if (documentType === 'cpf') {
                cpfBtn.classList.remove('text-gray-900', 'bg-white');
                cpfBtn.classList.add('text-white', 'bg-blue-600');
                
                cnpjBtn.classList.remove('text-white', 'bg-blue-600');
                cnpjBtn.classList.add('text-gray-900', 'bg-white');
            } else {
                cnpjBtn.classList.remove('text-gray-900', 'bg-white');
                cnpjBtn.classList.add('text-white', 'bg-blue-600');
                
                cpfBtn.classList.remove('text-white', 'bg-blue-600');
                cpfBtn.classList.add('text-gray-900', 'bg-white');
            }
        }

        function applyMask(value) {
            let maskedValue = value.replace(/\D/g, '');
            
            if (documentType === 'cpf') {
                if (maskedValue.length > 3) {
                    maskedValue = maskedValue.replace(/^(\d{3})(\d)/, '$1.$2');
                }
                if (maskedValue.length > 6) {
                    maskedValue = maskedValue.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                }
                if (maskedValue.length > 9) {
                    maskedValue = maskedValue.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
                }
            } else {
                if (maskedValue.length > 2) {
                    maskedValue = maskedValue.replace(/^(\d{2})(\d)/, '$1.$2');
                }
                if (maskedValue.length > 5) {
                    maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                }
                if (maskedValue.length > 8) {
                    maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
                }
                if (maskedValue.length > 12) {
                    maskedValue = maskedValue.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
                }
            }
            
            return maskedValue;
        }

        return {
            getDocumentType,
            setDocumentType,
            updateInputMask,
            toggleDocumentTypeButtons,
            applyMask
        };
    })();

    // Importação do módulo de validação
    const Validator = ValidatorModule;

    // UI para validação e exibição de resultados
    const ValidationUI = (() => {
        function resetValidation() {
            const { validIcon, invalidIcon, validationMessage, resultCard } = UI.elements;
            
            validIcon.classList.add('hidden');
            invalidIcon.classList.add('hidden');
            validationMessage.textContent = '';
            validationMessage.className = 'mt-2 text-sm';
            resultCard.classList.add('hidden');
        }

        function showValidationResult(isValid) {
            const { validIcon, invalidIcon, validationMessage, resultCard, resultContent, resultDetails, documentInput } = UI.elements;
            const documentType = DocumentManager.getDocumentType();
            
            if (isValid) {
                validIcon.classList.remove('hidden');
                invalidIcon.classList.add('hidden');
                validationMessage.textContent = 'Documento válido!';
                validationMessage.className = 'mt-2 text-sm text-green-600';
                
                const rawValue = documentInput.value.replace(/\D/g, '');
                
                // Cria o card de resultado com animação
                resultCard.classList.remove('hidden', 'bg-red-50', 'border-red-200');
                resultCard.classList.add('bg-green-50', 'border-green-200');
                
                resultContent.innerHTML = `
                    <div class="bg-green-100 p-3 rounded-full mr-4">
                        <i class="fas fa-check text-green-600 text-lg"></i>
                    </div>
                    <div>
                        <h3 class="font-medium text-green-800 text-lg">Documento Válido</h3>
                        <p class="text-green-700">${documentType === 'cpf' ? 'CPF' : 'CNPJ'} com formato correto e dígitos verificadores válidos</p>
                    </div>
                `;
                
                // Cria explicação detalhada com informações profissionais extras
                let additionalInfo = '';
                
                if (documentType === 'cpf') {
                    additionalInfo = `
                        <div class="bg-white p-3 rounded-lg border border-gray-200 mt-3">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                                <h4 class="font-medium text-gray-800">Informações Regionais</h4>
                            </div>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                                    <div>
                                        <span class="font-medium">Região fiscal:</span> 
                                        <span class="text-gray-700">${DocumentInfo.getRawRegion(rawValue)}</span>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                                    <div>
                                        <span class="font-medium">Estado emissor:</span> 
                                        <span class="text-gray-700">${DocumentInfo.getCpfState(rawValue)}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="text-xs text-gray-500 mt-3 flex items-center">
                            <i class="fas fa-shield-alt text-blue-500 mr-1"></i>
                            Validação realizada com segurança em ${new Date().toLocaleString()}
                        </div>
                    `;
                } else {
                    additionalInfo = `
                        <div class="bg-white p-3 rounded-lg border border-gray-200 mt-3">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-building text-blue-600 mr-2"></i>
                                <h4 class="font-medium text-gray-800">Informações Empresariais</h4>
                            </div>
                            <ul class="space-y-2">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                                    <div>
                                        <span class="font-medium">Tipo de empresa:</span> 
                                        <span class="text-gray-700">${DocumentInfo.getCnpjType(rawValue)}</span>
                                    </div>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                                    <div>
                                        <span class="font-medium">Unidade federativa:</span> 
                                        <span class="text-gray-700">${DocumentInfo.getCnpjState(rawValue)}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="text-xs text-gray-500 mt-3 flex items-center">
                            <i class="fas fa-shield-alt text-blue-500 mr-1"></i>
                            Validação realizada com segurança em ${new Date().toLocaleString()}
                        </div>
                    `;
                }
                
                resultDetails.innerHTML = additionalInfo;
                
                // Aplica animação
                resultCard.classList.add('pulse');
                setTimeout(() => {
                    resultCard.classList.remove('pulse');
                }, 600);
                
            } else {
                validIcon.classList.add('hidden');
                invalidIcon.classList.remove('hidden');
                validationMessage.textContent = 'Documento inválido!';
                validationMessage.className = 'mt-2 text-sm text-red-600';
                
                // Cria o card de resultado com animação
                resultCard.classList.remove('hidden', 'bg-green-50', 'border-green-200');
                resultCard.classList.add('bg-red-50', 'border-red-200');
                
                resultContent.innerHTML = `
                    <div class="bg-red-100 p-3 rounded-full mr-4">
                        <i class="fas fa-exclamation-triangle text-red-600 text-lg"></i>
                    </div>
                    <div>
                        <h3 class="font-medium text-red-800 text-lg">Documento Inválido</h3>
                        <p class="text-red-700">Este ${documentType.toUpperCase()} não passou na validação</p>
                    </div>
                `;
                
                // Cria explicação detalhada com informações de segurança
                resultDetails.innerHTML = `
                    <div class="bg-white p-3 rounded-lg border border-gray-200 mt-3">
                        <div class="flex items-center mb-2">
                            <i class="fas fa-exclamation-circle text-red-600 mr-2"></i>
                            <h4 class="font-medium text-gray-800">Problemas identificados</h4>
                        </div>
                        <ul class="space-y-2">
                            <li class="flex items-start">
                                <i class="fas fa-times-circle text-red-500 mt-0.5 mr-2"></i>
                                <div>
                                    <span class="font-medium">Dígitos verificadores incorretos</span>
                                </div>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-times-circle text-red-500 mt-0.5 mr-2"></i>
                                <div>
                                    <span class="font-medium">Não atende aos critérios de validação da Receita Federal</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="text-xs text-gray-500 mt-3 flex items-center">
                        <i class="fas fa-shield-alt text-blue-500 mr-1"></i>
                        Validação realizada com segurança em ${new Date().toLocaleString()}
                    </div>
                `;
                
                // Aplica animação
                resultCard.classList.add('pulse');
                setTimeout(() => {
                    resultCard.classList.remove('pulse');
                }, 600);
            }
        }

        function validateDocument() {
            const { documentInput, validationMessage } = UI.elements;
            const documentType = DocumentManager.getDocumentType();
            const value = documentInput.value;

            if (!value) {
                validationMessage.textContent = 'Por favor, digite um documento para validar.';
                validationMessage.className = 'mt-2 text-sm text-yellow-600';
                
                // Feedback visual para input vazio
                documentInput.classList.add('border-yellow-400');
                setTimeout(() => {
                    documentInput.classList.remove('border-yellow-400');
                }, 1500);
                
                return;
            }
            
            const isValid = documentType === 'cpf' 
                ? Validator.validateCPF(value) 
                : Validator.validateCNPJ(value);
                
            showValidationResult(isValid);
            
            // Animação do botão
            const { validateBtn } = UI.elements;
            validateBtn.classList.add('bg-blue-700', 'scale-95');
            setTimeout(() => {
                validateBtn.classList.remove('bg-blue-700', 'scale-95');
            }, 200);
            
            // Simula carregamento
            UI.simulateLoading();
        }

        return {
            resetValidation,
            showValidationResult,
            validateDocument
        };
    })();

    // Configurações de eventos
    function setupEventListeners() {
        const { documentInput, validateBtn, cpfBtn, cnpjBtn } = UI.elements;
        
        // Adiciona feedback visual ao focar o input
        documentInput.addEventListener('focus', () => {
            documentInput.classList.add('ring-2', 'ring-blue-300');
        });
        
        documentInput.addEventListener('blur', () => {
            documentInput.classList.remove('ring-2', 'ring-blue-300');
        });
        
        // Eventos dos botões de tipo de documento
        cpfBtn.addEventListener('click', () => {
            DocumentManager.setDocumentType('cpf');
            DocumentManager.toggleDocumentTypeButtons();
            DocumentManager.updateInputMask();
        });

        cnpjBtn.addEventListener('click', () => {
            DocumentManager.setDocumentType('cnpj');
            DocumentManager.toggleDocumentTypeButtons();
            DocumentManager.updateInputMask();
        });

        // Evento de input para mascaramento e validação automática
        documentInput.addEventListener('input', (e) => {
            ValidationUI.resetValidation();
            const value = e.target.value;
            const maskedValue = DocumentManager.applyMask(value);
            e.target.value = maskedValue;
            
            // Adiciona feedback responsivo ao digitar
            if (maskedValue.length > 0) {
                documentInput.classList.add('border-blue-300');
            } else {
                documentInput.classList.remove('border-blue-300');
            }
            
            // Validação automática quando o input estiver completo
            const documentType = DocumentManager.getDocumentType();
            if ((documentType === 'cpf' && maskedValue.length === 14) || 
                (documentType === 'cnpj' && maskedValue.length === 18)) {
                const isValid = documentType === 'cpf' 
                    ? Validator.validateCPF(maskedValue) 
                    : Validator.validateCNPJ(maskedValue);
                ValidationUI.showValidationResult(isValid);
            }
        });

        // Evento de clique no botão de validação
        validateBtn.addEventListener('click', ValidationUI.validateDocument);
        
        // Adiciona suporte a teclado para melhor acessibilidade
        documentInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                validateBtn.click();
            }
        });
        
        // Ouve eventos de redimensionamento
        window.addEventListener('resize', UI.handleResponsive);
    }

    // Inicializa a aplicação
    function init() {
        setupEventListeners();
        DocumentManager.toggleDocumentTypeButtons();
        DocumentManager.updateInputMask();
        UI.handleResponsive();
    }

    // Inicializa a aplicação
    init();
});