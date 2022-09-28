var TempoInicial = $("#tempo-digitacao").text()
var campo = $(".campo-digitacao")

//Atalho vc pode declarar direto $(function( )) 
$(document).ready(function(){ 
    atualizaTamanhoFrase()
    inicilizaContadores()
    InicializaCronometro()
    inicializaMarcadores()
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
                clearInterval(cronometroID)
                finalizaJogo()
            }
        },1000)
    })
}

function finalizaJogo(){
    campo.attr("disabled", true)          
    campo.toggleClass("campo-desativado")
    inserePlacar()
}

// $("#botao-reiniciar").on("click", function(){
//     console.log('Botão Clicado')
// })

function inicializaMarcadores(){
    var frase = $(".frase").text()
    campo.on("input", function(){
        var digitado = campo.val()
        var comparavel = frase.substr(0,digitado.length)
        if(digitado == comparavel){
            campo.addClass("borda-verde")
            campo.removeClass("borda-vermelha")
        }else {
            campo.addClass("borda-vermelha")
            campo.removeClass("borda-verde")
        }
    })
}

function reiniciaJogo(){
    campo.attr("disabled", false)
    campo.val("")
    $("#contador-palavras").text("0")
    $("#contador-caracteres").text("0")
    $("#tempo-digitacao").text(TempoInicial)
    InicializaCronometro()
    campo.toggleClass("campo-desativado")
    campo.removeClass("borda-vermelha")
    campo.removeClass("borda-verde")
}

