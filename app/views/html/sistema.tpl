<!DOCTYPE html>
<html lang="pt-BR">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Sistema</title>
   <script src="/static/js/websocket/socket.io.min.js?V112412"></script>
   <link rel="stylesheet" type="text/css" href="/static/css/sistema.css?V12312312327">

</head>
<body>

    <div class="cadastro">
        
        <div class="tab-buttons">
            <button class="tab-btn active" content-id="pessoas">Pessoas</button>
            <button class="tab-btn" content-id="transacts">Transações</button>
        </div>

        <div class="tab-contents">
            <div class="tab-cnt show" id="pessoas">
                <div class="DelInfo">
                    <h3>\/ Clique na pessoa que deseja deletar \/</h3>
                </div>
                <div class="list Pess">
                </div>
                <div class="control Pess">
                    <div class="InputsPess">
                        <div>
                            <h3>Nome:</h3>
                            <input class="Input" id="PessNome">
                            <h3>Idade:</h3>
                            <input class="Input" id="PessIdade">
                        </div>
                    </div>
                    <div class="Buttons">
                        <button onclick="SendPess()">Criar</button>
                    </div>
                </div>
            </div>

            <div class="tab-cnt" id="transacts">
                <div class="list Tra">
                </div>
                <div class="control Tra">
                    <div class="InputsTra">
                        <div class="InputsTraPart">
                            <h3>Descrição:</h3>
                            <textarea class="InputDesc" type=text id="TraDesc"></textarea>
                            <h3>Valor:</h3>
                            <input class="Input" type=number id="TraValue">
                        </div>
                        <div class="InputsTraPart">
                            <h3>Pessoa:</h3>
                            <select class="Select Pess" onchange="CheckAge()" id="TraPess">
                            </select>
                            <h3>Tipo:</h3>
                            <select class="Select" id="TraTipo">
                                <option value="receita">Receita</option><option value="despesa">Despesa</option>
                            </select>
                        </div>
                    </div>
                    <div class="Buttons">
                        <button onclick="SendTra()">Criar</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="area-listagem">
        <div class="listagem">
        </div>
        <div class="totais">
            <div class="tot-part">
                <h3>Total Receitas:</h3>
                <h2 class="ValRecTot"></h2>
            </div>
            <div class="tot-part">
                <h3>Total Despesas:</h3>
                <h2 class="ValDesTot"></h2>
            </div>
            <div class="tot-part">
                <h3>Saldo Líquido:</h3>
                <h2 class="ValSalLiq"></h2>
            </div>
        </dive>
    </div>

    <div class="DelPopup">
         <div class="popMenu">
            <h2>Deseja realmente deletar essa pessoa?</h2>
            <h2 class="DelPopItem"></h2>
            <div class="popButts">
               <button class="Yes" onclick="deletePess()">Sim</button>
               <button class="No" onclick="closeDelPop()">Não</button>
            </div>
         </div>
      </div>

   <script src="/static/js/sistema.js?V123210127589"></script>
</body>