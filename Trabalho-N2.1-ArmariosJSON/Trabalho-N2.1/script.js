var armarioSelecionado;

function selecionar(elemento) {
  armarioSelecionado = elemento;
  document.getElementById("popup").style.display = "block";
  document.getElementById("fechar").style.display = "block";
}

function fechar() {
  document.getElementById("popup").style.display = "none";
}

function escolher(opcao) {
  var estado = opcao.innerText.toLowerCase();
  var estadoTexto;

  if (estado === "ocupar") {
    armarioSelecionado.classList.remove("cor1", "cor2");
    armarioSelecionado.classList.add("cor3");
    estadoTexto = "Ocupado";
  } else if (estado === "desocupar") {
    armarioSelecionado.classList.remove("cor2", "cor3");
    armarioSelecionado.classList.add("cor1");
    estadoTexto = "Desocupado";
  } else if (estado === "manutenção") {
    armarioSelecionado.classList.remove("cor1", "cor3");
    armarioSelecionado.classList.add("cor2");
    estadoTexto = "Manutenção";
  }

  armarioSelecionado.nextElementSibling.innerText = estadoTexto;
  document.getElementById("popup").style.display = "none";
}

function carregarArmarios() {
  fetch("armarios.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var blocos = Object.keys(data);

      blocos.forEach(function (bloco) {
        var blocosContainer = document.createElement("div");
        blocosContainer.className = "blocos";
        var h2 = document.createElement("h2");
        h2.className = "bloc";
        h2.innerText = bloco.charAt(0).toUpperCase() + bloco.slice(1);
        blocosContainer.appendChild(h2);

        var armarios = data[bloco].armarios;
        armarios.forEach(function (armario) {
          var divArmario = document.createElement("div");
          divArmario.className = "armario";

          var divNumero = document.createElement("div");
          divNumero.className = "numero";
          divNumero.innerText = armario.numero;

          var divBola = document.createElement("div");
          divBola.className = "bola";
          divBola.classList.add(getCorClasse(armario.estado));
          divBola.onclick = function () {
            selecionar(this);
          };

          var pEstado = document.createElement("p");
          pEstado.className = "estado";
          pEstado.innerText = armario.estado.charAt(0).toUpperCase() + armario.estado.slice(1);

          var hr1 = document.createElement("hr");
          var hr2 = document.createElement("hr");
          var hr3 = document.createElement("hr");

          divArmario.appendChild(divNumero);
          divArmario.appendChild(divBola);
          divArmario.appendChild(pEstado);
          divArmario.appendChild(hr1);
          divArmario.appendChild(hr2);
          divArmario.appendChild(hr3);

          blocosContainer.appendChild(divArmario);
        });

        document.body.appendChild(blocosContainer);
      });
    })
    .catch(function (error) {
      console.log("Ocorreu um erro ao carregar os armários:", error);
    });
}

function getCorClasse(estado) {
  switch (estado) {
    case "desocupado":
      return "cor1";
    case "manutencao":
      return "cor2";
    case "ocupado":
      return "cor3";
    default:
      return "";
  }
}

carregarArmarios();
