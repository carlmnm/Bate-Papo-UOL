function perguntarNome(){
    let nomeUsuario = prompt("Qual seu lindo nome?");
    return nomeUsuario;
}
let userName = perguntarNome();
console.log(userName)

function entrando(){
    const dados = {
        name: userName
    };
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', dados);

    requisicao.catch(tratarerro);
    requisicao.then(tratarsucesso);



    function tratarerro(erro){
        const statusCode = erro.response.status;
        console.log(statusCode);

        alert("provavelmente este nome já está sendo utilizado :c escolha outro!")
        window.location.reload();
    }

    function tratarsucesso(resposta){
        const statusCode = resposta.status;
        console.log("nome recebido com sucesso " + statusCode)
    }
}

entrando();

function mantendoContato(){
    const nome = {
        name: userName
    };
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', nome);
    console.log("aqui!")

}

setInterval(mantendoContato, 5000);

const elementoMensagem = document.querySelector(".mensagens");
const elementoStatus = document.querySelector(".status");

function pegandoMensagem(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(processarResposta);

    function processarResposta(resposta){
        const array = resposta.data
        function atualizarMensagens(){
            for (let i = 0; i < array.length; i ++){
                console.log(array[i].from);
                elementoMensagem.innerHTML += `
                <div class="mensagem">
                    <div class="tempo formato-texto">
                        ${array[i].time}
                    </div>
                    <div class="remetente-destinatario formato-texto">
                        ${array[i].from}
                    </div>
                    <div class="para formato-texto">
                        para
                    </div>
                    <div class="remetente-destinatario formato-texto">
                        ${array[i].to}
                    </div>
                    <div class="texto formato-texto">
                        : ${array[i].text}
                    </div>
                </div>
                `;
            }            
        }
        atualizarMensagens();

    }
    processarResposta();


}

setInterval(pegandoMensagem, 3000);