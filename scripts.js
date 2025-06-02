function simularFinanciamento() {
  const valor = parseFloat(document.getElementById("valor").value);
  const parcelas = parseInt(document.getElementById("parcelas").value);
  const juros = parseFloat(document.getElementById("juros").value);

  if (isNaN(valor) || isNaN(parcelas) || isNaN(juros)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  const i = juros / 100; // taxa em decimal

  // Fórmula da parcela fixa (sistema de amortização com juros compostos)
  const parcela =
    (valor * i) / (1 - Math.pow(1 + i, -parcelas));

  const totalPago = parcela * parcelas;
  const totalJuros = totalPago - valor;

  const resultadoDiv = document.getElementById("resultado");

  resultadoDiv.innerHTML = `
    <div class="alert alert-success">
      <p><strong>Parcela mensal:</strong> R$ ${parcela.toFixed(2)}</p>
      <p><strong>Total pago:</strong> R$ ${totalPago.toFixed(2)}</p>
      <p><strong>Total de juros:</strong> R$ ${totalJuros.toFixed(2)}</p>
    </div>
  `;

  console.log("Parcela:", parcela.toFixed(2));
  console.log("Total pago:", totalPago.toFixed(2));
  console.log("Juros totais:", totalJuros.toFixed(2));
}
