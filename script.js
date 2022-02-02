const form = {
    openClose() {
        /* A função principal era apresentar um modal mas foi alterado para ter um efeito de navegação */
        document.querySelector(".bloco1").classList.add("hidden");
        document.querySelector(".bloco2").classList.add("hidden");
        document.querySelector(".modal-overlay").className = "mockup";
    }
}
const Validar = {
    verSenha(senha) {
        /* Deixa a senha visiel ao clicar na imagem do olho. */
        let ver = document.getElementById(senha);
        if (ver.type == "password" || ver.type == "hidden") {
            ver.type = "text";
        } else {
            ver.type = "password";
        }
    },
    /* Apos digitar a senha apresenta o campo de confirmação */
    confirmarSenha() {
        let confirmacao = document.getElementById("senha1");
        if (confirmacao.type == "hidden") {
            confirmacao.type = "password";
        }
    },
    confirmacaoOk() {
        let senha = document.getElementById("senha")
        let confirmacao = document.getElementById("senha1");
        if (senha.value != confirmacao.value) {
            alert("Senha não confere")
        }
    },
    mascara(t, mask) {
        var i = t.value.length;
        var saida = mask.substring(1, 0);
        var texto = mask.substring(i)
        if (texto.substring(0, 1) != saida) {
            t.value += texto.substring(0, 1);
        }
    },
    puxarEndereco() {
        /* Puxa o Endereço pelo CEP VIA API 
        const cep = document.querySelector("input[name=cep]");
        const value = cep.value.replace(/[^0-9]+/, '');
        const url = `https://viacep.com.br/ws/${value}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(json => {

                if (json.logradouro) {
                    document.querySelector('input[name=rua]').value = json.logradouro
                    document.querySelector('input[name=bairro]').value = json.bairro
                }

            });
        */
        /* Seleciona o Estado e Cidades */
        var selectEstados = document.getElementById("estados");
        var selectCidades = document.getElementById("cidade");
        var cidades = {
            "São Paulo": ["Americana", "Sumaré", "Nova Odessa", "Campinas", "Santa Bárbara d'Oeste"],
            "Rio de Janeiro": ["Rio de Janeiro", "Niteroi", "Petropolis", "Belford Roxo", "Nova Iguaçu"],
            "Rio Grande do Sul": ["Porto Alegre", "Uruguaiana", "Passo Fundo"]
        };

        function adicionarOptions(select, options, chosen) {
            select.innerHTML = options.reduce((html, option) => {
                return html + `<option value="${option}">${option}</option>`;
            }, '<option disabled selected value>Escolha...</option>')
        }

        var estados = Object.keys(cidades);
        const estadoInicial = estados[0];
        adicionarOptions(selectEstados, estados, estadoInicial);
        selectEstados.addEventListener('change', function () {
            adicionarOptions(selectCidades, cidades[this.value]);
        });
    },
    verificarCPF() {
        var ao_cpf = document.getElementById("cpf")
        var ao_cpf = ao_cpf.value
        var cpfValido = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
        if (cpfValido.test(ao_cpf) == false) {

            ao_cpf = ao_cpf.replace(/\D/g, ""); //Remove tudo o que não é dígito

            if (ao_cpf.length == 11) {
                ao_cpf = ao_cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
                ao_cpf = ao_cpf.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
                //de novo (para o segundo bloco de números)
                ao_cpf = ao_cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos

                var valorValido = document.getElementById("cpf").value = ao_cpf;
                document.querySelector(".cpfinvalido").className = "cpfvalido";
                var cpfok = true;
            } else {
                document.querySelector(".cpfvalido").className = "cpfinvalido";

            }

        }
    },
    dataMax() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear() - 18;

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("nascimento").setAttribute("max", today);
        console.log(today);
    }

}
cadastro = [];
const APP = {

    enviar() {
        let nome = document.getElementById('nome').value;
        let apelido = document.getElementById('apelido').value;
        let login = document.getElementById('login').value;
        let senha = document.getElementById('senha').value;
        let telefone = document.getElementById('telefone').value;
        let cep = document.getElementById('cep').value;
        let estado = document.getElementById('estados').value;
        let cidade = document.getElementById('cidade').value;
        let rua = document.getElementById('rua').value;
        let complemento = document.getElementById('complemento').value;
        let cpf = document.getElementById('cpf').value;
        let nascimento = document.getElementById('nascimento').value;
        cadastro.push({ nome: nome, apelido: apelido, login: login, senha: senha, telefone: telefone, cep: cep, estado: estado, cidade: cidade, rua: rua, complemento: complemento, cpf: cpf, nascimento: nascimento });
        APP.show()


    },
    show() {
        var tbody = document.getElementById('tbody');
        cadastro[0].nome
        for (var i = 0; i < cadastro.length; i++) {
            var tr = "<tr>";
            tr += "<td>" + cadastro[i].nome + "</td><td>" + cadastro[i].apelido + "</td><td>" + cadastro[i].login + "</td><td>" + cadastro[i].senha + "</td><td>" + cadastro[i].telefone + "</td><td>" + cadastro[i].cep + "</td><td>" + cadastro[i].estado + "</td><td>" + cadastro[i].cidade + "</td><td>" + cadastro[i].rua + "</td><td>" + cadastro[i].complemento + "</td><td>" + cadastro[i].cpf + "</td><td>" + cadastro[i].nascimento + "</td></tr>";
            tbody.innerHTML += tr;
        }
    }
}


Validar.dataMax();
