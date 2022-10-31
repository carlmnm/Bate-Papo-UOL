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



function pegandoMensagem(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(processarResposta);
}

function processarResposta(resposta){
    const array = resposta.data

    const elementoMensagem = document.querySelector(".mensagens");
    const elementoStatus = document.querySelector(".status");

    elementoMensagem.innerHTML = "";

    function atualizarMensagens(){
        for (let i = 0; i < array.length; i ++){
            if ((array[i].type === "message") && (array[i].to === "Todos")){
                
                elementoMensagem.innerHTML += `
                <div id="texto-enviado" class="mensagem">
                    <div class="tempo formato-texto">
                        (${array[i].time})
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
                    <p class="texto formato-texto">
                        : ${array[i].text}
                    </p>
                </div>
                `;
            } else if ((array[i].type === "status") && (array[i].to === "Todos")) {
                elementoMensagem.innerHTML += `
                <div id="status-enviado" class="status">
                    <div class="tempo formato-texto">
                        (${array[i].time})
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
                    <span class="texto formato-texto">
                        : ${array[i].text}
                    </span>
                </div>
                `;
            }
                       
            
        }

        
        let novaMensagem = document.querySelector(".mensagens").lastElementChild;
        novaMensagem.scrollIntoView();


    }
    atualizarMensagens()

}

setInterval(pegandoMensagem, 3000);

function enviarMensagem(){
    let mensagemDigitada = document.querySelector(".input-mensagem").value;
    let stringMensagem = document.querySelector(".input-mensagem")
    let objetoMensagem = {
        from: userName,
        to: "Todos",
        text: mensagemDigitada,
        type: "message" 
    }

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', objetoMensagem);
    requisicao.then(tratamentoSucesso)
    requisicao.catch(tratarFalha);

    function tratarFalha(erro){
        const statusCode = erro.response.status;
        console.log(statusCode);

        alert("Pode ser que você esteja fora da sala. Por favor, entre novamente")
        window.location.reload();
    }

    function tratamentoSucesso(){
        pegandoMensagem();

        stringMensagem.value = "";
    }




}

    


