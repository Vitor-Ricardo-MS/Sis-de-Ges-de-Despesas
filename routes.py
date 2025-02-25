from app.controllers.application import Application
from bottle import Bottle, route, run, request, static_file, redirect, template, response
import eventlet.wsgi
import socketio
import eventlet

#Utilizei python, bottle, socketio, css, js, e tpl.
#Essa escolha foi baseada no fato que eu fiz um projeto da faculdade recentemente
#que utilizava esse modelo, portanto, estou familiarizado com ele.

app = Bottle()

#Application é a classe que faz a conexão com as bases de dado
ctl = Application()

sio = socketio.Server(async_mode='eventlet')

wsgi_app = socketio.WSGIApp(sio, app)

# Rotas:

@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')

@app.route('/', method='GET')
def action_sistema():
    return ctl.render('sistema')

# Socket:

@sio.event
async def connect(sid, environ):
    print(sid, 'connected')

@sio.event
async def disconnect(sid):
    print(sid, 'disconnected')

#Quando o botão de criar no cadastro de pessoas é clicado, o socket
#envia o nome e a idade inseridos nos inputs do cadastro para essa função
@sio.event()
def SendPess(sid, nome, idade):
    age = int(idade)
    ctl.addPess(nome, age)
    sio.emit('SendPess')

#Quando o botão de criar no cadastro de transações é clicado,o socket
#envia as informações inseridos nos inputs do cadastro para essa função
@sio.event
def SendTra(sid, desc, value, tipo, pess):
    valor = float(value)
    pessoa = int(pess)
    ctl.addTra(desc, valor, tipo, pessoa)
    sio.emit('SendTra')

#Quando o site tenta atualizar as pessoas, o socket
#chama essa função, que envia a lista de pessoas
@sio.event
def UpdPess(sid):
    pessoas = ctl.getPessoas()
    sio.emit('UpdPess', pessoas)

#Quando o site tenta atualizar as transações, o socket
#chama essa função, que envia a lista de transações
@sio.event
def UpdTra(sid):
    tras = ctl.getTransacts()
    sio.emit('UpdTra', tras)

#Quando o site tenta atualizar os totais, o socket chama essa
#função, que envia uma lista de pessoas e as transações delas
#como uma lista de objetos no modelo total
@sio.event
def UpdTots(sid):
    tots = ctl.getTots()
    sio.emit('UpdTots', tots)

#Quando a pessoa é selecionada no cadastro de transações o socket
#chama essa função com o id da pessoa para pegar a sua idade para
#poder checar se podemos aceitar receitas
@sio.event
def CheckAge(sid, pess):
    age = ctl.getAge(pess)
    sio.emit('CheckAge', age)

#Quando a deleção da pessoa é confirmada, o socket chama
#essa função com o id da pessoa para deletar a pessoa
@sio.event
def DeletePess(sid, id):
    CurrID = int(id)
    ctl.delPess(CurrID)
    sio.emit('DeletePess')


if __name__ == '__main__':

    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 8080)), wsgi_app)