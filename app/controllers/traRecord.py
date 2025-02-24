from ..models.transact import Transact
import json

class traRecord():

    def __init__(self):

        self.__transacts = []
        self.highestId = 0
        self.read()
        self.getNewHigh()

    #Faz a leitura do json de transações
    def read(self):
        try:
            with open("app/controllers/db/transacts.json", "r", encoding="utf-8") as jsonFile:
                traData = json.load(jsonFile)
                self.__transacts = [Transact(**data) for data in traData]
        except FileNotFoundError:
            self.__transacts.append(Transact(self.getId(), 'compra de um sanduíche', 14.99, 'despesa', 1))

    #Salva a lista de pessoas no json
    def save(self):
        with open("app/controllers/db/transacts.json", "w") as jsonFile:
            traData = [vars(tra) for tra in self.__transacts]
            json.dump(traData, jsonFile, ensure_ascii=False)

    #Gera um id quando uma pessoa é cadastrada
    def getId(self):
        id = self.highestId+1
        self.highestId = id
        return id

    #Obtêm o maior id, para que o próximo id seja maior que ele
    def getNewHigh(self):
        highest = 0
        for tra in self.__transacts:
            if tra.id > highest:
                highest = tra.id

        self.highestId = highest
    
    #Cria um objeto de uma transação e salva ele na lista
    def book(self, desc, valor, tipo, pes):
        new_id = self.getId()

        new_transact = Transact(new_id, desc, valor, tipo, pes)
        self.__transacts.append(new_transact)

        self.save()
    
    #Deleta todas as transações de uma pessoa usando o id dela
    def delByPess(self, id):
        for index, tra in enumerate(self.__transacts, start = 0):
            if tra.pessoa == id:
                self.__transacts.pop(index)
                self.delByPess(id)
                self.save()
                self.getNewHigh()
                return True
        return False
    
    #Envia uma lista de todas as transações
    def getTra(self):
        traData = [vars(tra) for tra in self.__transacts]
        return traData