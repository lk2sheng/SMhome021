"use strict"


    function showCartaoForm() {
        document.getElementById('cartaoPay').style.display = 'block';
        document.getElementById('mbwayPay').style.display = 'none';
    }
    
    function showMbwayForm() {
        document.getElementById('cartaoPay').style.display = 'none';
        document.getElementById('mbwayPay').style.display = 'block';
    }

    function formatarCartao() {

        let numeroCartao = document.getElementById('numeroCartao').value;

        numeroCartao = numeroCartao.replace(/\D/g, '');
        numeroCartao = numeroCartao.replace(/(\d{4})(?=\d)/g, '$1 ');
        document.getElementById('numeroCartao').value = numeroCartao;
    }

    function formatarValidade() {
        let validade = document.getElementById('validade').value;

        validade = validade.replace(/\D/g, ''); // Remove caracteres não numéricos
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
    
        if ((numeroCartao && nomeUser && validade && CVV) || numeroTelemovel) {
            document.getElementById('finalizarCompraBtn').disabled = true;
            document.getElementById('verificacaoAnimacao').style.display = 'inline-block';
    
            setTimeout(function() {
                document.getElementById('verificacaoAnimacao').style.display = 'none';
                document.getElementById('modalAviso').style.display = 'flex';
                document.getElementById('finalizarCompraBtn').disabled = false;
            }, 2000);
        } else {
            alert('Preencha todos os campos de cartão ou MB WAY.');
        }
    }
    
    function fecharModal() {
        document.getElementById('modalAviso').style.display = 'none';
        document.getElementById('finalizarCompraBtn').disabled = false; 
    }
    