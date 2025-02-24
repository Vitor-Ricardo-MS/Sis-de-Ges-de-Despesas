/*Definição dos items importantes para tela*/

const ListaPessoas = document.querySelector('.list.Pess'); //Lista de pessoas
const SelectPessoas = document.getElementById('TraPess'); //Seleção de pessoa na criação de transações
const ListaTransacts = document.querySelector('.list.Tra'); //Lista de transações
const ListaTots = document.querySelector('.listagem'); //Lista de totais
const DelPop = document.querySelector('.DelPopup'); //Popup de deleção
var currentItem; //O item que foi selecionado para deleção
const socket = io('http://localhost:8080')

/*Definição das ações de todos os sockets*/

socket.on('connect', () => {
    console.log('Connected');
    StartPage()
})

socket.on('SendPess', () => {
    socket.emit('UpdPess')
    console.log('Person Added')
})

socket.on('SendTra', () => {
    socket.emit('UpdTra')
    socket.emit('UpdTots')
    console.log('Transaction Added')
})

socket.on('DeletePess', () => {
    StartPage()
})

socket.on('UpdPess', (data) => {
    UpdatePess(data)
    UpdatePessOptions(data)
    socket.emit('UpdTots')
    console.log('Pessoas Updated')
})

socket.on('UpdTra', (data) => {
    UpdateTra(data)
    console.log('Transações Updated')
})

socket.on('UpdTots', (data) => {
    UpdateTots(data)
    console.log('Totais Updated')
})

socket.on('CheckAge', (data) =>{
    ChangeTipo(data)
})

/*Atualizar as listas*/

function StartPage(){
    socket.emit('UpdPess')
    socket.emit('UpdTra')
    socket.emit('UpdTots')
}


/*Envio dos inputs*/

function SendPess(){
    //obter valores dos inputs de pessoa
    const nome = document.getElementById('PessNome').value
    const idade = document.getElementById('PessIdade').value

    //resetar os inputs
    document.getElementById('PessNome').value = ""
    document.getElementById('PessIdade').value = ""

    //emitir o socket de adicionar pessoa
    socket.emit('SendPess', nome, idade)
}

function SendTra(){
    //obter valores dos inputs de transação
    const desc = document.getElementById('TraDesc').value
    const value = document.getElementById('TraValue').value
    const pess = document.getElementById('TraPess').value
    const tipo = document.getElementById('TraTipo').value

    //resetar os inputs
    document.getElementById('TraDesc').value = ""
    document.getElementById('TraValue').value = ""

    const valuer = parseFloat(value)
    const valor = valuer.toFixed(2);

    //emitir o socket de adicionar transação
    socket.emit('SendTra', desc, valor, tipo, pess)
}

/*Recebimento das listas de modelos*/
/*E atualização do visual da página*/

function UpdatePess( data ){
    //resetar a lista de pessoas
    ListaPessoas.innerHTML = ""

    data.forEach(pes => {
        //criar div para pessoa
        const listaItem = document.createElement('div')
        listaItem.setAttribute('class', 'Item Pes')

        //criar div para imagem da pessoa (placeholder)
        const ItemImg = document.createElement('div')
        const Img = document.createElement('img')
        Img.setAttribute('src', '../static/img/pessoa.png')
        ItemImg.setAttribute('class', 'ItemImg')
        ItemImg.appendChild(Img)
        
        //criar div pra informação da pessoa
        const ItemInfo = document.createElement('div')
        ItemInfo.setAttribute('class', 'ItemInfo Pes')

        //criar div pro id da pessoa
        const ItemId = document.createElement('div')
        ItemId.setAttribute('class', 'ItemId Pes')
        const Id = document.createElement('h3')
        Id.innerHTML = `Id: ${pes.id}`
        ItemId.appendChild(Id) 
        
        //criar div pro nome da pessoa
        const ItemNome = document.createElement('div')
        ItemNome.setAttribute('class', 'ItemNome')
        const Nome = document.createElement('h3')
        Nome.innerHTML = `Nome: ${pes.nome}`
        ItemNome.appendChild(Nome)
        
        //criar div pra idade da pessoa
        const ItemIdade = document.createElement('div')
        ItemIdade.setAttribute('class', 'ItemIdade')
        const Idade = document.createElement('h3')
        Idade.innerHTML = `Idade: ${pes.idade}`
        ItemIdade.appendChild(Idade)
        
        //adicionar o id, o nome e a idade a div da informação
        ItemInfo.appendChild(ItemId)
        ItemInfo.appendChild(ItemNome)
        ItemInfo.appendChild(ItemIdade)

        //adicionar o div da imagem e o div da informação ao div da pessoa
        listaItem.appendChild(ItemImg)
        listaItem.appendChild(ItemInfo)

        //adicionar o div da pessoa à lista
        ListaPessoas.appendChild(listaItem)
    })


    /*Fazendo com que os items façam o popup de deleção aparecer*/

    const items = document.querySelectorAll(".Item.Pes")
    items.forEach(item => item.addEventListener('click', () => openDelPop(item)))
}

function UpdateTra( data ){
    //resetar a lista de transação
    ListaTransacts.innerHTML = ""

    data.forEach(tra => {
        //criar div para transação
        const listaItem = document.createElement('div')
        listaItem.setAttribute('class', 'Item Tra')
        
        //criar div pra informação da transação
        const ItemInfo = document.createElement('div')
        ItemInfo.setAttribute('class', 'ItemInfo Tra')

        //criar div pro id da transação
        const ItemId = document.createElement('div')
        ItemId.setAttribute('class', 'ItemId Tra')
        const Id = document.createElement('h3')
        Id.innerHTML = `Id: ${tra.id}`
        ItemId.appendChild(Id)
        
        //criar div pra desc da transação
        const ItemDesc = document.createElement('div')
        ItemDesc.setAttribute('class', 'ItemDesc')
        const Desc = document.createElement('h3')
        Desc.innerHTML = `Desc: ${tra.desc}`
        ItemDesc.appendChild(Desc)
        
        //criar div pro valor da transação
        const ItemValor = document.createElement('div')
        ItemValor.setAttribute('class', 'ItemValor')
        const Valor = document.createElement('h3')
        Valor.innerHTML = `Valor: ${tra.valor}`
        ItemValor.appendChild(Valor)

        //criar div pro tipo da transação
        const ItemTipo = document.createElement('div')
        ItemTipo.setAttribute('class', 'ItemTipo')
        const Tipo = document.createElement('h3')
        Tipo.innerHTML = `Tipo: ${tra.tipo}`
        ItemTipo.appendChild(Tipo)

        //criar div pra pessoa da transação
        const ItemPess = document.createElement('div')
        ItemPess.setAttribute('class', 'ItemPess')
        const Pess = document.createElement('h3')
        Pess.innerHTML = `Id da pessoa: ${tra.pessoa}`
        ItemPess.appendChild(Pess)
        
        //adicionar o id, a descrição, o valor, o tipo, a pessoa ao div da informação
        ItemInfo.appendChild(ItemId)
        ItemInfo.appendChild(ItemDesc)
        ItemInfo.appendChild(ItemValor)
        ItemInfo.appendChild(ItemTipo)
        ItemInfo.appendChild(ItemPess)

        //adicionar o div da informação ao div da transação
        listaItem.appendChild(ItemInfo)

        //adicionar o div da transação à lista
        ListaTransacts.appendChild(listaItem)
    })
}

function UpdateTots(data){
    ListaTots.innerHTML = "";
    
    var RecTot = 0;
    var DesTot = 0;
    var SalLiq = 0;

    data.forEach(tot => {
        var PessRecTot = 0;
        var PessDesTot = 0;
        var PessSalLiq = 0;

        const listaItem = document.createElement('div')
        listaItem.setAttribute('class', 'Item Tot')

        //criar div pra informação do total da pessoa
        const ItemInfo = document.createElement('div')
        ItemInfo.setAttribute('class', 'ItemInfo Tot')

        //criar div pro id da pessoa
        const ItemId = document.createElement('div')
        ItemId.setAttribute('class', 'ItemId Tot')
        const Id = document.createElement('h3')
        Id.innerHTML = `Id: ${tot.id}`
        ItemId.appendChild(Id) 
        
        //criar div pro nome da pessoa
        const ItemNome = document.createElement('div')
        ItemNome.setAttribute('class', 'ItemNome')
        const Nome = document.createElement('h3')
        Nome.innerHTML = `Nome: ${tot.nome}`
        ItemNome.appendChild(Nome)
    
        //fazer o calculo dos totais da pessoa com a lista de transações do modelo de total 
        tot.tras.forEach(tra => {
            if(tra.tipo == "receita"){
                PessRecTot += tra.valor;
            }else if(tra.tipo == "despesa"){
                PessDesTot += tra.valor;
            }
        })

        PessSalLiq = PessRecTot - PessDesTot;

        PessRecTot = parseFloat(PessRecTot.toFixed(2))
        PessDesTot = parseFloat(PessDesTot.toFixed(2))
        PessSalLiq = parseFloat(PessSalLiq.toFixed(2))

        //criar div pra receita da pessoa
        const ItemRec = document.createElement('div')
        ItemRec.setAttribute('class', 'ItemRec')
        const Rec = document.createElement('h3')
        Rec.innerHTML = `Total Receita: R$ ${PessRecTot}`
        ItemRec.appendChild(Rec)

        //criar div pra despesa da pessoa
        const ItemDes = document.createElement('div')
        ItemDes.setAttribute('class', 'ItemDes')
        const Des = document.createElement('h3')
        Des.innerHTML = `Total Despesas: R$ ${PessDesTot}`
        ItemDes.appendChild(Des)

        //criar div pro saldo da pessoa
        const ItemSal = document.createElement('div')
        ItemSal.setAttribute('class', 'ItemSal')
        const Sal = document.createElement('h3')
        Sal.innerHTML = `Saldo Líquido: R$ ${PessSalLiq}`
        ItemSal.appendChild(Sal)

        //inserir todas as divs de informação na listagem de totais
        ItemInfo.appendChild(ItemId)
        ItemInfo.appendChild(ItemNome)
        ItemInfo.appendChild(ItemRec)
        ItemInfo.appendChild(ItemDes)
        ItemInfo.appendChild(ItemSal)

        listaItem.appendChild(ItemInfo)

        ListaTots.appendChild(listaItem)

        //adiciona os totais ao total geral
        RecTot += PessRecTot
        DesTot += PessDesTot
        SalLiq += PessSalLiq
    })

    RecTot = parseFloat(RecTot.toFixed(2))
    DesTot = parseFloat(DesTot.toFixed(2))
    SalLiq = parseFloat(SalLiq.toFixed(2))

    //obtêm os locais onde os valores de total geral serão exibidos
    const RecTotal = document.querySelector('.ValRecTot')
    const DesTotal = document.querySelector('.ValDesTot')
    const SalTotal = document.querySelector('.ValSalLiq')
    
    //insere o valor no local correto
    RecTotal.innerHTML = `R$ ${RecTot}`
    DesTotal.innerHTML = `R$ ${DesTot}`
    SalTotal.innerHTML = `R$ ${SalLiq}`
}

function UpdatePessOptions(data){
    //resetar as opções de pessoa na seleção
    SelectPessoas.innerHTML = ""

    data.forEach(pes => {
        //criar uma opção pra pessoa
        const OptPess = document.createElement('option')
        OptPess.setAttribute('value', pes.id) //o valor que será enviado é o id da pessoa
        OptPess.innerText = `${pes.nome}, ${pes.id}`

        //adicionar a opção à seleção
        SelectPessoas.appendChild(OptPess)
    })
}

/*Controle das abas do cadastro*/

const tabs = document.querySelectorAll(".tab-btn");
tabs.forEach(tab => tab.addEventListener('click', () => TabClicked(tab)))

const TabClicked = (tab) => {
    tabs.forEach(tab => tab.classList.remove('active'))
    tab.classList.add('active')

    const contents = document.querySelectorAll(".tab-cnt")
    contents.forEach(cnt => cnt.classList.remove('show'))
    
    const contentID = tab.getAttribute('content-id')
    const content = document.getElementById(contentID)

    content.classList.add('show')
}

/*Popup de deleção de pessoas*/

const openDelPop = (item) => {
    //marca o item clicado como o item presente
    currentItem = item;

    //obter a caixa de informação dentro do popup
    PessBox = document.querySelector(".DelPopItem")

    //obter informações da pessoa
    nomeItem = item.querySelector(".ItemNome").innerText
    idItem = item.querySelector(".ItemId").innerText

    //adicionar as informações à caixa de informações
    PessBox.innerText = `${idItem}, ${nomeItem}`

    //marca o popup como show
    DelPop.classList.add("show");
}

function closeDelPop(){
    //marca o popup como não show
    DelPop.classList.remove("show");
}

/*Deleção de pessoas*/

function deletePess(){
    //obtêm o id da pessoa
    PessId = currentItem.querySelector('.ItemId').innerText
    arrId = PessId.split(" ")
    Id = arrId[1]

    //fecha o popup
    closeDelPop()
    socket.emit('DeletePess', Id)
}

/*Checar a idade da pessoa selecionada no cadastro de transição*/
/*para decidir se podemos aceitar receitas*/

function CheckAge(){
    const pess = document.getElementById('TraPess').value

    socket.emit('CheckAge', pess)
}

function ChangeTipo( age ){
    if(age >= 18){
        document.getElementById('TraTipo').innerHTML = `<option value="receita">Receita</option><option value="despesa">Despesa</option>`
    }else{
        document.getElementById('TraTipo').innerHTML = `<option value="despesa">Despesa</option>`
    }
}