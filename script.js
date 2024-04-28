var elementos = document.querySelectorAll('.player-options div > img');
var playerOpt = "";
var inimigoOpt = "";

var placarPlayer = 0;
var placarEnemy = 0;

const pontosParaVitoria = 3;

let jogoEmAndamento = true;
let vencedorPlayer = false;
let vencedorEnemy = false;

function atualizarPlacar(){

    const placarPlayerElement = document.getElementById('placar-player');
    const placarEnemyElement = document.getElementById('placar-enemy');

    placarPlayerElement.textContent = placarPlayer;
    placarEnemyElement.textContent = placarEnemy;

    if(placarPlayer >= pontosParaVitoria){
        vencedorPlayer = true;
        jogoEmAndamento = false;
        mostrarMensagemVitoria('Você');
    } else if(placarEnemy >= pontosParaVitoria){
        vencedorEnemy = true;
        jogoEmAndamento = false;
        mostrarMensagemVitoria('Adversário');
    }
}

atualizarPlacar();

function validarVitoria(){

    let vencedor = document.querySelector('.vencedor');

    if(playerOpt == "papel"){
        if(inimigoOpt == "papel"){
            vencedor.innerHTML = "Empate!";
        } else if(inimigoOpt == "tesoura"){
            vencedor.innerHTML = "Adversário venceu!";
            placarEnemy++;
        } else if(inimigoOpt == "pedra"){
            vencedor.innerHTML = "Você venceu!";
            placarPlayer++;
        }
    }

    if(playerOpt == "tesoura"){
        if(inimigoOpt == "papel"){
            vencedor.innerHTML = "Você venceu!";
            placarPlayer++;
        } else if(inimigoOpt == "tesoura"){
            vencedor.innerHTML = "Empate!";
        } else if(inimigoOpt == "pedra"){
            vencedor.innerHTML = "Adversário venceu!";
            placarEnemy++;
        }
    }

    if(playerOpt == "pedra"){
        if(inimigoOpt == "papel"){
            vencedor.innerHTML = "Adversário venceu!";
            placarEnemy++;
        } else if(inimigoOpt == "tesoura"){
            vencedor.innerHTML = "Você venceu!";
            placarPlayer++;
        } else if(inimigoOpt == "pedra"){
            vencedor.innerHTML = "Empate!";
        }
    }

    atualizarPlacar();
    
}

function resetInimigo(){
    const enemyOptions = document.querySelectorAll('.enemy-options div > img');
    for(var i = 0; i < enemyOptions.length; i++){
        enemyOptions[i].style.opacity = 0.3;
        }
}

function inimigoJogar(){
    let rand = Math.floor(Math.random()*3);
    const enemyOptions = document.querySelectorAll('.enemy-options div > img');
    resetInimigo();
    for(var i = 0; i < enemyOptions.length; i++){
        if(i == rand){
            enemyOptions[i].style.opacity = 1;
            inimigoOpt = enemyOptions[i].getAttribute('opt');
        }
    }

    validarVitoria();

}

function resetOpacityPlayer(){
    for(var i = 0; i < elementos.length; i++){
    elementos[i].style.opacity = 0.3;   
    }
}

for(var i = 0; i < elementos.length; i++){
    elementos[i].addEventListener('click',(t)=>{
        resetOpacityPlayer();
        t.target.style.opacity = 1;
        playerOpt = t.target.getAttribute('opt');
        inimigoJogar();
    });
}

function mostrarMensagemVitoria(vencedor){
    const mensagemElement = document.getElementById('mensagem-vitoria');
    mensagemElement.textContent = `${vencedor} venceu, jogue novamente!`;
    mensagemElement.style.display = 'block'; 
    const imagens = document.querySelectorAll('.player-options img');
    for(const imagem of imagens){
        imagem.classList.add('desabilitado');
    }
}

const botaoReiniciar = document.getElementById('botao-reiniciar');

botaoReiniciar.addEventListener('click',()=>{
    reiniciarJogo();
});

function reiniciarJogo(){
        placarPlayer = 0;
        placarEnemy = 0;
        jogoEmAndamento = true;
        vencedorPlayer = false;
        vencedorEnemy = false;

        atualizarPlacar();
        resetOpacityPlayer();
        resetInimigo();
        document.getElementById('mensagem-vitoria').style.display = 'none';
        const imagens = document.querySelectorAll('.player-options img');
        for(const imagem of imagens){
            imagem.classList.remove('desabilitado');
        }
      }

