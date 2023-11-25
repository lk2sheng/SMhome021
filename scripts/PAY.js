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

