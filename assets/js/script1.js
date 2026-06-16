async function buscarEncomenda() {
    codigo=document.getElementById('codigoInput').value;
    const areaResultado = document.getElementById('areaResultado');
    const areaMensagens = document.getElementById('areaMensagens');
    areaResultado.classList.add('d-none');
    areaMensagens.innerHTML = '';
    try {
        const response = await fetch(`http://localhost:3000/rastreio/${codigo}`);
        if (!response.ok) {
            const erroDados = await response.json();
            throw new Error(JSON.stringify({status: response.status, mensagem: erroDados.mensagem}));
        }
        const dados = await response.json();
        areaResultado.classList.remove('d-none');
        document.getElementById('resStatus').innerText = dados.status;
        document.getElementById('resLocal').innerText = dados.local;
    } catch (error) {
        console.error("Erro capturado:", error);
        let titulo = "Ops!";
        let mensagem = "Ocorreu um erro inesperado.";
        let tipoAlerta = "alert-danger";
        try {
            const erroObj = JSON.parse(error.message);
            switch (erroObj.status) {
                case 400:
                    titulo = "Dados Inválidos (400)";
                    mensagem = "Você digitou algo errado. " + erroObj.mensagem;
                    tipoAlerta = "alert-info";
                    break;
                case 404:
                    titulo = "Encomenda Não Encontrada (404)";
                    mensagem = "Verifique o código e tente novamente. " + erroObj.mensagem;
                    tipoAlerta = "alert-warning";
                    break;
                case 500;
                titulo = "Erro no Servidor (500)";
                mensagem = "Nossos sistemas estão instáveis. Tente novamente mais tarde. " + erroObj.mensagem;
                tipoAlerta = "alert-danger";
                break;
            }
        } catch (e) {
            mensagem = "Não foi possivel conectar ao servidor. O mesmo pode estar offline. Tente novamente mais tarde.";
        }
        areaMensagens.innerHTML = `
            <div class="alert ${tipoAlerta} alert-dismissible fade show" role="alert">
            <strong>${titulo}</strong> ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert"aria-label="Close"></button>
        </div>
        `;
    }
}