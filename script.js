/**
 * LÓGICA DE INTERAÇÃO, CONTRATO DE DADOS E ACESSIBILIDADE AVANÇADA
 * Tema: Tecnologia no Campo
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- ARRAY DE OBJETOS: REQUISITO DE CONTEÚDO E MANUTENÇÃO DO ACORDEÃO ---
    const dadosBeneficiosIA = [
        {
            id: 1,
            titulo: "1. Otimização de recursos",
            texto: "Um dos principais benefícios da IA no campo é a possibilidade de economizar a utilização de recursos naturais. É possível contar com sistemas de irrigação inteligentes, sensores e sistemas que monitoram constantemente as condições do solo e das plantas, ajustando a irrigação de acordo com a necessidade real das culturas, o que reduz o desperdício de água e melhora a saúde das plantas. Além disso, é possível realizar análises de dados capturados por sistemas de IA para verificar a composição do solo, as necessidades específicas da cultura, entre outras características que ajudam na otimização de recursos."
        },
        {
            id: 2,
            titulo: "2. Monitoramento de culturas",
            texto: "A tecnologia de sensores e drone também tem contribuído para a evolução digital do campo. Por meio de equipamentos, como drones equipados com câmeras dotadas de sensores RGB e multiespectrais, é possível capturar imagens detalhadas das culturas que podem ser processadas por sistemas IA. Através disso, é viável captar imagens para detectar prontamente indícios de infestação por ervas daninhas, incidência de doenças e outros contratempos agrícolas. Além disso, permite-se o planejamento preciso do sentido de plantio, utilizando curvas em nível e implementando bordaduras estratégicas. Do mesmo modo, facilita-se o replantio com mapeamento preciso de linhas e falhas, assegurando paralelismo e ajustes na aplicação em taxa variável. Essas abordagens estratégicas possibilitam intervenções ágeis e focalizadas, impedindo a propagação de problemas e promovendo a saúde geral da lavoura. O uso de algoritmos de IA permite ainda gerar imagens que podem ser analisadas para identificar padrões de crescimento, detectar áreas com problemas e monitorar a saúde das culturas em grandes áreas. Isso facilita a tomada de decisões estratégicas e o planejamento a longo prazo."
        },
        {
            id: 3,
            titulo: "3. Previsibilidade e gestão de riscos",
            texto: "Como a IA possibilita a análise de dados climáticos, históricos de produção e outras variáveis para prever o rendimento das colheitas. Isso ajuda os agricultores a planejar melhor suas atividades, otimizar a logística de colheita e minimizar perdas. Além disso, previsões mais precisas permitem que os agricultores ajustem suas práticas agrícolas para maximizar a produtividade e reduzir seus custos. Desse modo, os agricultores podem usar os sistemas IA para prever eventos climáticos extremos e se preparar para condições adversas."
        },
        {
            id: 4,
            titulo: "4. Automação",
            texto: "Contar com tratores, pilotos automáticos e outras máquinas agrícolas autônomas tem sido uma grande vantagem no campo, pois elas podem realizar tarefas como plantio, colheita e pulverização com alta precisão. Com o avanço da digitalização do campo, esses maquinários podem ser equipados com sistemas de navegação por GPS e sensores avançados para, assim, reduzir a necessidade de mão de obra intensiva e aumentar a eficiência operacional."
        },
        {
            id: 5,
            titulo: "5. Melhoria da qualidade dos produtos",
            texto: "A implementação de sistemas de inteligência artificial representa um avanço significativo na agricultura contemporânea, permitindo monitorar a qualidade dos produtos agrícolas desde o campo até a mesa do consumidor. A aplicação seletiva em taxa variável reduz o estresse das plantas ao otimizar o uso de insumos agrícolas, assegurando que alimentos de alta qualidade alcancem o consumidor final. Esse controle preciso não só eleva os padrões de qualidade, mas também promove uma produção mais sustentável e eficiente, alinhada às demandas do mercado moderno. A Inteligência Artificial possibilita a rastreabilidade de cada etapa da cadeia de suprimentos, desde a fazenda até a casa do consumidor, o que possibilita um enorme avanço na transparência com os clientes e na resposta rápida a problemas de segurança alimentar."
        },
        {
            id: 6,
            titulo: "6. Sustentabilidade",
            texto: "Outro ponto importante na agricultura é a capacidade de minimizar os desperdícios de recursos naturais e insumos agrícolas. Nesta questão, a IA também age como peça-chave para a sustentabilidade, pois torna possível realizar uma aplicação mais precisa de água, fertilizantes e defensivos agrícolas para reduzir significativamente o uso desses recursos, diminuindo o impacto ambiental."
        }
    ];

    // --- RENDERIZAÇÃO DINÂMICA DO ACORDEÃO ---
    const accordionContainer = document.getElementById('accordion-container');
    
    if (accordionContainer) {
        dadosBeneficiosIA.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('accordion-item');
            
            itemElement.innerHTML = `
                <button class="accordion-header" aria-expanded="false" aria-controls="pane-${item.id}">
                    <span>${item.titulo}</span>
                    <span class="accordion-trigger-icon" aria-hidden="true">+</span>
                </button>
                <div id="pane-${item.id}" class="accordion-content" role="region">
                    <div class="accordion-inner-text">
                        <p>${item.texto}</p>
                    </div>
                </div>
            `;
            accordionContainer.appendChild(itemElement);
        });

        // Configuração dos eventos de clique (Manipulação de DOM & Estados de Acessibilidade)
        const headers = accordionContainer.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const panel = this.nextElementSibling;
                const isOpened = item.classList.contains('open');

                // Fecha painéis ativos (efeito colapso único)
                accordionContainer.querySelectorAll('.accordion-item').forEach(el => {
                    el.classList.remove('open');
                    el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                    el.querySelector('.accordion-content').style.maxHeight = null;
                });

                if (!isOpened) {
                    item.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    }

    // --- MÓDULO DE ACESSIBILIDADE COMPLETO (REQUISITOS LOGICADOS) ---
    let fontScaleFactor = 1.0;
    const rootEl = document.documentElement;

    // Aumentar / Diminuir Fonte com regras de limite multiplicador estrito (0.8x a 1.3x)
    document.getElementById('btn-font-plus').addEventListener('click', () => {
        if (fontScaleFactor < 1.3) {
            fontScaleFactor += 0.1;
            rootEl.style.setProperty('--font-scale', `${fontScaleFactor * 100}%`);
        }
    });

    document.getElementById('btn-font-minus').addEventListener('click', () => {
        if (fontScaleFactor > 0.8) {
            fontScaleFactor -= 0.1;
            rootEl.style.setProperty('--font-scale', `${fontScaleFactor * 100}%`);
        }
    });

    // Alternar Modo Escuro / Claro
    document.getElementById('btn-theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Se estiver em alto contraste, remove para evitar conflitos de UI
        document.body.classList.remove('high-contrast');
    });

    // Alternar Alto Contraste (Blindagem Obrigatória)
    document.getElementById('btn-contrast-toggle').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // --- SÍNTESE DE VOZ (API SPEECH SYNTHESIS) SELETIVA ---
    let speechUtterance = null;
    
    document.getElementById('btn-speech-start').addEventListener('click', () => {
        // Cancela qualquer leitura ativa antes de iniciar a nova
        window.speechSynthesis.cancel();
        
        // Seleciona exclusivamente o escopo estruturado do elemento <main>
        const targetText = document.getElementById('read-target').innerText;
        
        speechUtterance = new SpeechSynthesisUtterance(targetText);
        speechUtterance.lang = 'pt-BR';
        speechUtterance.rate = 1.0;

        window.speechSynthesis.speak(speechUtterance);
    });

    document.getElementById('btn-speech-stop').addEventListener('click', () => {
        window.speechSynthesis.cancel();
    });

    // --- VALIDAÇÃO REAL-TIME E PROCESSAMENTO DO FORMULÁRIO DE CAPTURA ---
    const leadForm = document.getElementById('lead-form');
    const leadSuccessAlert = document.getElementById('lead-success');

    leadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let formIsValid = true;
        const formFields = leadForm.querySelectorAll('input[required]');

        formFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('user-invalid');
                formIsValid = false;
            } else {
                field.classList.remove('user-invalid');
            }

            // Validação explícita de E-mail
            if (field.type === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    field.classList.add('user-invalid');
                    formIsValid = false;
                }
            }
        });

        if (formIsValid) {
            // Processando dados capturados de forma lógica antes da renderização de resposta
            const leadData = {
                nome: document.getElementById('inp-name').value,
                email: document.getElementById('inp-email').value,
                localizacao: `${document.getElementById('inp-city').value} / ${document.getElementById('inp-state').value} - ${document.getElementById('inp-country').value}`
            };
            
            console.log('Lead Validado e Armazenado com Sucesso:', leadData);
            
            // Oculta formulário e exibe alerta amigável de sucesso
            leadForm.style.display = 'none';
            leadSuccessAlert.style.display = 'block';
            leadSuccessAlert.setAttribute('aria-hidden', 'false');
        }
    });

    // Event listeners para limpar avisos de erro enquanto o usuário digita
    leadForm.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('user-invalid');
            }
        });
    });

    // --- FORMULÁRIO DE INTERAÇÃO (COMENTÁRIOS DA COMUNIDADE) ---
    const commentForm = document.getElementById('comment-form');
    const commentSuccessAlert = document.getElementById('comment-success');

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const commentBox = document.getElementById('txt-comment');

        if (commentBox.value.trim()) {
            commentForm.style.display = 'none';
            commentSuccessAlert.style.display = 'block';
            commentSuccessAlert.setAttribute('aria-hidden', 'false');
        }
    });
});