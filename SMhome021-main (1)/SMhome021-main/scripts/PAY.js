"use strict"


    function showCartaoForm() {
        document.getElementById('cartaoPay').style.display = 'block';
        document.getElementById('mbwayPay').style.display = 'none';
        document.getElementById('imgVISA').style.display = 'block';
        document.getElementById('imgWAY').style.display = 'none';
    }
    
    function showMbwayForm() {
        document.getElementById('cartaoPay').style.display = 'none';
        document.getElementById('mbwayPay').style.display = 'block';
        document.getElementById('imgVISA').style.display = 'none';
        document.getElementById('imgWAY').style.display = 'block';
    }

    function formatarCartao() {

        let numeroCartao = document.getElementById('numeroCartao').value;

        numeroCartao = numeroCartao.replace(/\D/g, '');
        numeroCartao = numeroCartao.replace(/(\d{4})(?=\d)/g, '$1 ');
        document.getElementById('numeroCartao').value = numeroCartao;
    }

    function formatarValidade() {
        let validade = document.getElementById('validade').value;

        validade = validade.replace(/\D/g, ''); 
        if (validade.length > 2) {
            validade = validade.substring(0, 2) + '/' + validade.substring(2);
        }
        document.getElementById('validade').value = validade;
    }


    function finalizarCompra() {
        var numeroCartao = document.getElementById('numeroCartao').value;
        var nomeUser = document.getElementById('nomeUser').value;
        var validade = document.getElementById('validade').value;
        var CVV = document.getElementById('CVV').value;
        var numeroTelemovel = document.getElementById('numeroTelemovel').value;
    
        var camposCartaoPreenchidos = numeroCartao && nomeUser && validade && CVV;
        var campoTelemovelPreenchido = numeroTelemovel;
    
        document.getElementById('numeroCartao').style.border = '1px solid #ccc';
        document.getElementById('nomeUser').style.border = '1px solid #ccc';
        document.getElementById('validade').style.border = '1px solid #ccc';
        document.getElementById('CVV').style.border = '1px solid #ccc';
        document.getElementById('numeroTelemovel').style.border = '1px solid #ccc';
    
        if (camposCartaoPreenchidos || campoTelemovelPreenchido) {
            document.getElementById('finalizarCompraBtn').disabled = true;
            document.getElementById('verificacaoAnimacao').style.display = 'inline-block';
    
            setTimeout(function() {
                document.getElementById('verificacaoAnimacao').style.display = 'none';
                exibirAviso('Compra efectuada com sucesso!');
                document.getElementById('finalizarCompraBtn').disabled = false;
                uploadCartToSessionStorage();
            }, 2000);
        } else {
            
            exibirAviso('Complete todos os campos com informações corretas.');
        
            if (!numeroCartao) document.getElementById('numeroCartao').style.border = '1px solid red';
            if (!nomeUser) document.getElementById('nomeUser').style.border = '1px solid red';
            if (!validade) document.getElementById('validade').style.border = '1px solid red';
            if (!CVV) document.getElementById('CVV').style.border = '1px solid red';
            if (!numeroTelemovel) document.getElementById('numeroTelemovel').style.border = '1px solid red';
        }
    }
    
    function exibirAviso(mensagem) {

        var avisoElement = document.getElementById('avisoCompra');
        avisoElement.innerHTML = mensagem;

        document.getElementById('modalAviso').style.display = 'flex';

      
    }

    function GoBack() {
        window.history.back();
    }
    
    function uploadCartToSessionStorage() {
        sessionStorage.setItem("CARTINFO",JSON.stringify([]));
    }

    function GoBack() {
        window.history.back();
    }

    function principal(){
        document.getElementById('back-button').addEventListener("click",GoBack);
    }
    
    function fecharModal() {
        document.getElementById('modalAviso').style.display = 'none';
        document.getElementById('finalizarCompraBtn').disabled = false;
    
        
        var avisoElement = document.getElementById('avisoCompra');
        var avisoMensagem = avisoElement.innerHTML;
    
        if (avisoMensagem.includes('Compra efectuada com sucesso!')) {
            window.location.href = '../HOME.html';
        }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        
        const BackButton = document.getElementById('back-button');
        BackButton.addEventListener("click", GoBack);
        
        const savedTotal = localStorage.getItem("totalValue");

        const totalValueDiv = document.getElementById("totalValue");
        if (totalValueDiv) {
            totalValueDiv.textContent = "Total: " + savedTotal + "€";
                totalValueDiv.style.fontWeight = "bold"; 
                totalValueDiv.style.fontSize = "30px"; 
        } 
    });