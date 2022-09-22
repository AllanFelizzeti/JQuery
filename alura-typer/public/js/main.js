var TempoInicial = $("#tempo-digitacao").text()
var campo = $(".campo-digitacao")

//Atalho vc pode declarar direto $(function( )) 
$(document).ready(function(){ 
    atualizaTamanhoFrase()
    inicilizaContadores()
    InicializaCronometro()
    $("#botao-reiniciar").click(reiniciaJogo)
})

function atualizaTamanhoFrase(){
    var frase = $(".frase").text()
    var numPalavras  = frase.split(" ").length
    var tamanhoFrase = $("#tamanho-frase")
    tamanhoFrase.text(numPalavras)
}

function inicilizaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val()
        var qtdPalavras = conteudo.split(/\S+/).length - 1
        $("#contador-palavras").text(qtdPalavras)
        
        var qtdCaracteres = conteudo.length
        $("#contador-caracteres").text(qtdCaracteres)
    })
}

function InicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text()
    campo.one("focus", function() {
        var cronometroID = setInterval(function(){
            tempoRestante --
            console.log(tempoRestante)
            $("#tempo-digitacao").text(tempoRestante)
            if (tempoRestante <= 0){
                campo.attr("disabled", true)
                clearInterval(cronometroID)
            }
        },1000)
    })
}

// $("#botao-reiniciar").on("click", function(){
//     console.log('Botão Clicado')
// })

function reiniciaJogo(){
    campo.attr("disabled", false)
    campo.val("")
    $("#contador-palavras").text("0")
    $("#contador-caracteres").text("0")
    $("#tempo-digitacao").text(TempoInicial)
    InicializaCronometro()
}

