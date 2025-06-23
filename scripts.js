document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnSimular").addEventListener("click", simularFinanciamento);
  document.getElementById("btnHistorico").addEventListener("click", exibirHistorico);
  document.getElementById("btnLimpar").addEventListener("click", limparHistorico);
});

function simularFinanciamento() {
  const valor = parseFloat(document.getElementById("valor").value);
  const parcelas = parseInt(document.getElementById("parcelas").value);
  const juros = parseFloat(document.getElementById("juros").value);

  if (isNaN(valor) || isNaN(parcelas) || isNaN(juros)) {
    mostrarResultado("Preencha todos os campos corretamente!", "danger");
    return;
  }

  const i = juros / 100;

  const parcela = (valor * i) / (1 - Math.pow(1 + i, -parcelas));
  const totalPago = parcela * parcelas;
  const totalJuros = totalPago - valor;

  const resultadoHTML = `
    <div class="alert alert-success">
      <p><strong>Parcela mensal:</strong> R$ ${parcela.toFixed(2)}</p>
      <p><strong>Total pago:</strong> R$ ${totalPago.toFixed(2)}</p>
      <p><strong>Total de juros:</strong> R$ ${totalJuros.toFixed(2)}</p>
    </div>
  `;
  mostrarResultado(resultadoHTML);

  const dados = {
    valor,
    parcelas,
    juros,
    parcela: parcela.toFixed(2),
    totalPago: totalPago.toFixed(2),
    totalJuros: totalJuros.toFixed(2),
    data: new Date().toLocaleString()
  };

  salvarSimulacao(dados);
}

function mostrarResultado(mensagem, tipo) {
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = tipo
    ? `<div class="alert alert-${tipo}">${mensagem}</div>`
    : mensagem;
}

function salvarSimulacao(simulacao) {
  let historico = JSON.parse(localStorage.getItem("simulacoes")) || [];
  historico.push(simulacao);
  localStorage.setItem("simulacoes", JSON.stringify(historico));
}

function exibirHistorico() {
  const historico = JSON.parse(localStorage.getItem("simulacoes")) || [];

  if (historico.length === 0) {
    mostrarResultado("Nenhuma simulação foi salva ainda.", "warning");
    return;
  }

  let html = `<h4>Histórico de Simulações</h4><ul class="list-group mt-3">`;

  historico.forEach((item, index) => {
    html += `
      <li class="list-group-item">
        <strong>#${index + 1}</strong> - R$${item.valor} em ${item.parcelas}x (${item.juros}% a.m.)<br>
        Parcela: R$${item.parcela} | Total: R$${item.totalPago} | Juros: R$${item.totalJuros}<br>
        <small>${item.data}</small>
      </li>
    `;
  });

  html += `</ul>`;
  mostrarResultado(html);
}

function limparHistorico() {
  localStorage.removeItem("simulacoes");
  mostrarResultado("Histórico apagado com sucesso!", "success");
}
