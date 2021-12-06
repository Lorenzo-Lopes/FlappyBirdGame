console.log('Flappy Birda');
const som_HIT = new Audio();

let frames =0;
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();  
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function criaChao(){
    const chao={
        spriteX: 0,
        spriteY: 610,
        largura:224,
        altura: 112,
        x:0,
        y: canvas.height -112,
        atualiza(){
            const movimentoDoChao=1;
            const repeteEM = chao.largura/2;
            const movimentacao = chao.x - movimentoDoChao;
            
            chao.x = movimentacao % repeteEM;
            
           

        },
        desenha(){
                contexto.drawImage(
                sprites,
                chao.spriteX,chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura
            );
            contexto.drawImage(
                sprites,
                chao.spriteX,chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        }
    }
    return chao;
}
const planoDeFundo ={
    spriteX: 390,
    spriteY: 0,
    largura:275,
    altura: 204,
    x:0,
    y: canvas.height -204,

    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );
    }

}
function fazColisao(FlappyBird,chao){
    const flappyBirdy = globais.flappyBird.y + globais.flappyBird.altura;
    const chaoy = chao.y;
    if (flappyBirdy >= chaoy){
                  
        return true;
    }
    return false
}
function criaFlappyBird(){
    const flappyBird= {
        spriteX: 0,
        spriteY: 0,
        largura:33,
        altura: 24,
        x:10,
        y:50,
        pulo:4.6,
        pula(){
            console.log('pula piriquito')
            
            flappyBird.velocidade= - flappyBird.pulo;
        },
        gravidade:  0.25,
        velocidade: 0,
    
        atualiza(){
            globais.chao.atualiza();
            if(fazColisao(flappyBird, globais.chao)){
                console.log('O piriquito bateu no chao');
                som_HIT.play();
                    mudaParaTela(Telas.GAME_OVER);
                return;
            }
            flappyBird.velocidade= flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y= flappyBird.y +flappyBird.velocidade;
            
        },
        movimentos:[
            {spriteX: 0, spriteY: 0, }, //asa pra cima
            {spriteX: 0, spriteY:26, },//asa no meio
            {spriteX: 0, spriteY:52, },//asa pra baixo
            {spriteX: 0, spriteY:26, },
        ],
        frameAtual: 0,
        atualizaFrameAtual(){
            const intervaloDeFrames= 10;
            const passouOintervalo = frames % intervaloDeFrames===0;
            if(passouOintervalo) {

                const baseDoIncremento =1;
                const incremento = baseDoIncremento +flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;
            }

            
            
        },
        desenha(){
            flappyBird.atualizaFrameAtual();
            const{ spriteX, spriteY} =this.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,                                        //flappy bird 1
                spriteX, spriteY,          // inicio da imagem >> canto superior esquedor
                flappyBird.largura, flappyBird.altura,           // largura e altura da imagem
                flappyBird.x, flappyBird.y,                      //onde ele vai inciar na tela do canvas
                flappyBird.largura , flappyBird.altura,          // tamanho da imagem dentro do canva
         );
        }
    }
    return flappyBird;
}
function criaCano(){
   const canos = {
       largura: 52,
       altura: 400,
       chao: {
           spriteX: 0,
           spriteY: 169,
       },
       ceu:{
           spriteX:52,
           spriteY:169,
       },
       espaco: 100,
       
       desenha(){
        
            canos.pares.forEach(function(par){

                
            const yRandom = par.y;
            const espacamentoEntreCanos=80;
            const canoCeuX = par.x;
            const canoCeuY= yRandom;
              
                // ceu
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canoCeuX, canoCeuY,
                canos.largura, canos.altura,
                )
                const canoChaoX=par.x;
                const canosChaoY=canos.altura+ espacamentoEntreCanos + yRandom;
                //chao
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canosChaoY,
                canos.largura, canos.altura,
                ) 
                par.canoCeu = {
                    x: canoCeuX,
                    y:canoCeuY + canos.altura,
                }
                par.canoChao={
                    x: canoChaoX,
                    y: canosChaoY,
                }
            }) 
       },
       temColisaoComOFlappyBird(par){
           const cabecaDoFlappy =globais.flappyBird.y;
           const peDoFlappy= globais.flappyBird.y +globais.flappyBird.altura;

        if(globais.flappyBird.x +globais.flappyBird.largura-3>=par.x){
           // console.log('bateu');

            if(cabecaDoFlappy <= par.canoCeu.y){
                
            
                return true;
            }
            if(peDoFlappy >= par.canoChao.y){
                
                return true;

            }
        }   
        

        return false;
       },
    pares:[], 
    atualiza(){
        const passou100Frames = frames % 100===0;
        if (passou100Frames){
            console.log('passou100 frame');
            canos.pares.push({
                x: canvas.width ,
                
                y: -150 *( Math.random() +1),
            });
        }
        canos.pares.forEach(function(par){
            par.x= par.x-2

            if(canos.temColisaoComOFlappyBird(par)){
                console.log('voce perdeu');
                som_HIT.play();
                mudaParaTela(Telas.GAME_OVER);

            }
            if(par.x + canos.largura <= 0){
                canos.pares.shift();
            }
        });
    },
   }
   return canos;
}

const mensagemGetReady ={
    spriteX: 134,
    spriteY: 0,
    largura:174,
    altura: 152,
    x:(canvas.width/2)-174/2,
    y:50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,          // inicio da imagem >> canto superior esquedor
            mensagemGetReady.largura, mensagemGetReady.altura,           // largura e altura da imagem
            mensagemGetReady.x, mensagemGetReady.y,                      //onde ele vai inciar na tela do canvas
            mensagemGetReady.largura , mensagemGetReady.altura, 
        );
    },
}


const mensagemGameOver ={
    spriteX: 134,
    spriteY: 153,
    largura:226,
    altura: 200,
    x:(canvas.width/2)-226/2,
    y:50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.spriteX, mensagemGameOver.spriteY,          // inicio da imagem >> canto superior esquedor
            mensagemGameOver.largura, mensagemGameOver.altura,           // largura e altura da imagem
            mensagemGameOver.x, mensagemGameOver.y,                      //onde ele vai inciar na tela do canvas
            mensagemGameOver.largura , mensagemGameOver.altura, 
        );
    },
}

function criaPlacar(){
    const placar={
        pontuacao:0,
        atualiza(){
            
            const intervaloDeFrames= 10;
            const passouOintervalo = frames % intervaloDeFrames===0;
            if(passouOintervalo){
                 placar.pontuacao += 1
            }



        },
        desenha(){       
            contexto.font = '35px "VT323"';
            contexto.textAlign='right';
            contexto.fillStyle= 'white'
            contexto.fillText(`${placar.pontuacao}`,canvas.width - 35,35);
        },
        inicializa(){

        }
    }
    return placar;
}
//Telas
const globais = {};
let telaAtiva ={};
function mudaParaTela(novaTela){
    telaAtiva=novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}
const Telas={
    INICIO:{
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.canos = criaCano();
            globais.chao = criaChao();
           
        },
        desenha(){
            planoDeFundo.desenha();
           // globais.canos.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
            globais.flappyBird.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){
            globais.chao.atualiza();
           // globais.canos.atualiza();
        }
    }
};


Telas.JOGO = {

    inicializa(){
        globais.placar= criaPlacar();
    },
    desenha(){
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.canos.desenha();
        globais.placar.desenha();

    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
        globais.chao.desenha();
        globais.canos.atualiza();
        globais.placar.atualiza();
    }
};
Telas.GAME_OVER = {
    desenha(){
        mensagemGameOver.desenha();
        
    },
    atualiza(){

    },
    click(){
        mudaParaTela(Telas.INICIO);
    },
}
function loop(){
   
    telaAtiva.desenha();
    telaAtiva.atualiza();   
    frames +=1;
    requestAnimationFrame(loop);
}
window.addEventListener('click',function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});
mudaParaTela(Telas.INICIO);
loop();