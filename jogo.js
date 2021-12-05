console.log('Flappy Birda');

const sprites = new Image();  
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');



const chao={
    spriteX: 0,
    spriteY: 610,
    largura:224,
    altura: 112,
    x:0,
    y: canvas.height -112,


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


const flappyBird= {
    spriteX: 0,
    spriteY: 0,
    largura:33,
    altura: 24,
    x:10,
    y:50,
    gravidade:  0.25,
    velocidade: 0,

    atualiza(){
        flappyBird.velocidade= flappyBird.velocidade + flappyBird.gravidade;
        console.log(flappyBird.velocidade);
        flappyBird.y= flappyBird.y +flappyBird.velocidade;

    },


    desenha(){
        contexto.drawImage(
            sprites,                                        //flappy bird 1
            flappyBird.spriteX, flappyBird.spriteY,          // inicio da imagem >> canto superior esquedor
            flappyBird.largura, flappyBird.altura,           // largura e altura da imagem
            flappyBird.x, flappyBird.y,                      //onde ele vai inciar na tela do canvas
            flappyBird.largura , flappyBird.altura,          // tamanho da imagem dentro do canva
     );

    }
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
//Telas
let telaAtiva ={};
function mudaParaTela(novaTela){
    telaAtiva=novaTela;
}
const Telas={
    INICIO:{
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            mensagemGetReady.desenha();
            flappyBird.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){

        }
    }
};

Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    click(){
        mudaParaTela(Telas.JOGO);
    },
    atualiza(){
        flappyBird.atualiza();
    }
};


function loop(){
   
    telaAtiva.desenha();
    telaAtiva.atualiza();   
    
    requestAnimationFrame(loop);
}

window.addEventListener('click',function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();