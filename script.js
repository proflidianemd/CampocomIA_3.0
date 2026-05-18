document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // CONTROLES DE ACESSIBILIDADE DE FONTE E TEMA
    // ==========================================================================
    const btnAumentar = document.getElementById("btn-aumentar");
    const btnDiminuir = document.getElementById("btn-diminuir");
    const btnTema = document.getElementById("btn-tema");
    
    let escalaFonteBase = 100; // Percentual base

    btnAumentar.addEventListener("click", () => {
        if (escalaFonteBase < 140) {
            escalaFonteBase += 10;
            document.documentElement.style.fontSize = `${escalaFonteBase}%`;
        }
    });

    btnDiminuir.addEventListener("click", () => {
        if (escalaFonteBase > 80) {
            escalaFonteBase -= 10;
            document.documentElement.style.fontSize = `${escalaFonteBase}%`;
        }
    });

    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // ==========================================================================
    // SÍNTESE DE VOZ (SPEECH SYNTHESIS API)
    // ==========================================================================
    const btnLer = document.getElementById("btn-ler");
    const btnParar = document.getElementById("btn-parar");
    const alvoLeitura = document.getElementById("conteudo-principal");
    
    let synth = window.speechSynthesis;
    let utterance = null;

    if (!synth) {
        btnLer.style.display = "none";
    } else {
        btnLer.addEventListener("click", () => {
            // Cancela leituras ativas remanescentes
            if (synth.speaking) {
                synth.cancel();
            }

            // Seleciona parágrafos, subtítulos e títulos da área do artigo (ignora rodapés e formulários)
            const elementosTexto = alvoLeitura.querySelectorAll("p, h1, h2, h3, blockquote");
            let textoCompleto = "";

            elementosTexto.forEach(el => {
                // Previne a leitura de textos dentro de containers invisíveis ou placeholders de imagem
                if (!el.closest(".placeholder-imagem") && !el.closest("details:not([open])")) {
                    textoCompleto += el.innerText + ". ";
                }
            });

            utterance = new SpeechSynthesisUtterance(textoCompleto);
            utterance.lang = "pt-BR";
            utterance.rate = 1.0;

            utterance.onstart = () => {
                btnLer.hidden = true;
                btnParar.hidden = false;
                alvoLeitura.classList.add("leitura-ativa");
            };

            utterance.onend = () => {
                finalizarPainelVoz();
            };

            utterance.onerror = () => {
                finalizarPainelVoz();
            };

            synth.speak(utterance);
        });

        btnParar.addEventListener("click", () => {
            if (synth.speaking) {
                synth.cancel();
            }
            finalizarPainelVoz();
        });
    }

    function finalizarPainelVoz() {
        btnLer.hidden = false;
        btnParar.hidden = true;
        alvoLeitura.classList.remove("leitura-ativa");
    }

    // Evita loop de execução de voz se o usuário fechar a aba
    window.addEventListener("beforeunload", () => {
        if (synth && synth.speaking) {
            synth.cancel();
        }
    });

    // ==========================================================================
    // ENVIO E VALIDAÇÃO DO FORMULÁRIO DE INSCRIÇÃO LATERAL
    // ==========================================================================
    const formInscricao = document.getElementById("form-inscricao");
    const msgSucesso = document.getElementById("mensagem-sucesso");

    formInscricao.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Simulação de envio seguro de dados
        msgSucesso.hidden = false;
        formInscricao.reset();
        
        setTimeout(() => {
            msgSucesso.hidden = true;
        }, 6000);
    });

    // ==========================================================================
    // ÁREA DE COMENTÁRIOS E INTERAÇÃO DINÂMICA
    // ==========================================================================
    const formComentario = document.getElementById("form-comentario");
    const txtComentario = document.getElementById("txt-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = txtComentario.value.trim();

        if (texto) {
            const containerComentario = document.createElement("div");
            containerComentario.className = "comentario-bloco";

            const dataAtual = new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });

            // Proteção contra injeção de scripts maliciosos (XSS)
            containerComentario.innerHTML = `
                <div class="comentario-meta">Leitor Conectado • ${dataAtual}</div>
                <p>${escapeHTML(texto)}</p>
            `;

            // Adiciona sempre o comentário mais recente no topo
            listaComentarios.insertBefore(containerComentario, listaComentarios.firstChild);
            txtComentario.value = "";
        }
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});