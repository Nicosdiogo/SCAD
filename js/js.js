var votos = JSON.parse(localStorage.getItem('votos')) || {
    "Segunda-Feira": [],
    "Terca-Feira": [],
    "Quarta-Feira": [],
    "Quinta-Feira": [],
    "Sexta-Feira": []
};

function votar() {
    var opcaoSelecionada = document.querySelector('input[name="destino"]:checked');
    var numEstudante = document.getElementById('numEstudante').value.trim();

    if (!numEstudante) {
        alert("Por favor, digite seu nome antes de votar.");
        return;
    }

    if (!opcaoSelecionada) {
        alert("Por favor, selecione uma opção antes de votar.");
        return;
    }

    var destino = opcaoSelecionada.value;

    for (var key in votos) {
        if (votos[key].includes(numEstudante)) {
            alert("Você já votou. Não é possível votar mais de uma vez.");
            return;
        }
    }

    votos[destino].push(numEstudante);

    document.getElementById('voto-atual').innerText = `${numEstudante} votou em ${destino}`;

    atualizarContagemVotos();
    atualizarTabelaVotos();
    mostrarResultados();

    localStorage.setItem('votos', JSON.stringify(votos));
}

function atualizarContagemVotos() {
    var contagemSegunda = votos["Segunda-Feira"].length;
    var contagemTerca = votos["Terca-Feira"].length;
    var contagemQuarta = votos["Quarta-Feira"].length;
    var contagemQuinta = votos["Quinta-Feira"].length;
    var contagemSexta = votos["Sexta-Feira"].length;

    document.getElementById('contagem-segunda').innerText = contagemSegunda;
    document.getElementById('contagem-terca').innerText = contagemTerca;
    document.getElementById('contagem-quarta').innerText = contagemQuarta;
    document.getElementById('contagem-quinta').innerText = contagemQuinta;
    document.getElementById('contagem-sexta').innerText = contagemSexta;
}

function atualizarTabelaVotos() {
    var corpoTabela = document.querySelector('#tabela-votos tbody');
    corpoTabela.innerHTML = '';

    for (var destino in votos) {
        votos[destino].forEach(function (numEstudante) {
            var linha = corpoTabela.insertRow();
            var celulaNome = linha.insertCell(0);
            var celulaDestino = linha.insertCell(1);
            celulaNome.textContent = numEstudante;
            celulaDestino.textContent = destino;
        });
    }
}

function mostrarResultados() {
    document.getElementById('formulario-votacao').style.display = 'none';
    document.getElementById('resultados-votacao').style.display = 'block';
}

function verTabela() {
    document.getElementById('formulario-votacao').style.display = 'none';
    document.getElementById('resultados-votacao').style.display = 'block';
}

function limparDados() {
    localStorage.removeItem('votos');
    window.location.reload();
}

function voltar() {
    document.getElementById('formulario-votacao').style.display = 'block';
    document.getElementById('resultados-votacao').style.display = 'none';
}

document.getElementById('numEstudante').value = localStorage.getItem("numEstudante");
atualizarContagemVotos();