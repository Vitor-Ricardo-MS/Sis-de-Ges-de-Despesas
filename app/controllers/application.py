from ..controllers.pesRecord import pesRecord
from ..controllers.traRecord import traRecord
from ..models.total import Total
from bottle import template, redirect, request
import json


class Application():

    def __init__(self):
        
        #A dict serve para fazer a escolha entre várias páginas
        #Acabei utilizando apenas uma
        self.pages = {
            'sistema' : self.sistema
        }
        
        #Bancos de dados
        self.__pessoas = pesRecord()
        self.__transacts = traRecord()

    #Roda a função da página utilizando o dict self.pages
    def render(self, pagina):
        content = self.pages.get(pagina, self.sistema)
        return content()
    
    def sistema(self):
        return template('app/views/html/sistema')
    
    #Adiciona uma pessoa ao banco de pessoas
    def addPess(self, nome, idade):
        self.__pessoas.book(nome, idade)
        return True
    
    #Adiciona uma transação ao banco de transações
    def addTra(self, desc, valor, tipo, pess):
        self.__transacts.book(desc, valor, tipo, pess)
        return True
    
    #Obtêm a lista de todas as pessoas
    def getPessoas(self):
        return self.__pessoas.getPes()
    
    #Obtêm a lista de todas as transações
    def getTransacts(self):
        return self.__transacts.getTra()
    
    #Cria uma lista de "Total", Total é um objeto que tem uma referência ao nome
    #e ao id de cada pessoa, e uma lista de todas as transações daquela pessoa 
    def getTots(self):
        pes = self.__pessoas.getPes()
        tra = self.__transacts.getTra()

        Tots = []

        for p in pes:
            tot = Total(p["nome"], p["id"], [])
            for t in tra:
                if t["pessoa"] == p["id"]:
                    tot.tras.append(t)
            
            Tots.append(tot)

        TotData = [vars(tot) for tot in Tots]
        return TotData
    
    #Obtêm a idade de uma pessoa
    def getAge(self, pess):
        pes = self.__pessoas.getPes()

        for p in pes:
            if p["id"] == int(pess):
                return int(p["idade"])
            
    #Deleta todas as transações de uma pessoa do banco de transações
    #e depois deleta a pessoa do banco de pessoas
    def delPess(self, id):
        self.__transacts.delByPess(id)
        self.__pessoas.delete(id)

        return True