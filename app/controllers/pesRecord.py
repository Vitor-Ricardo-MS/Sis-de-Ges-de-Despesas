from ..models.pessoa import Pessoa
import json

class pesRecord():

    def __init__(self):

        self.__pessoas = []
        self.highestId = 0
        self.read()
        self.getNewHigh()

    #Faz a leitura do json de pessoas
    def read(self):
        try:
            with open("app/controllers/db/pessoas.json", "r", encoding="utf-8") as jsonFile:
                pesData = json.load(jsonFile)
                self.__pessoas = [Pessoa(**data) for data in pesData]
        except FileNotFoundError:
            self.__pessoas.append(Pessoa(self.getId(), 'Joao', 25))

    #Salva a lista de pessoas ao json
    def save(self):
        with open("app/controllers/db/pessoas.json", "w") as jsonFile:
            pesData = [vars(pes) for pes in self.__pessoas]
            json.dump(pesData, jsonFile, ensure_ascii=False)

    #Gera um id quando uma pessoa é cadastrada
    def getId(self):
        id = self.highestId+1
        self.highestId = id
        return id

    #Obtêm o maior id, para que o próximo id seja maior que ele
    def getNewHigh(self):
        highest = 0

        for pes in self.__pessoas:
            if pes.id > highest:
                highest = pes.id

        self.highestId = highest
    
    #Cria um objeto de uma Pessoa e salva ele na lista 
    def book(self, nome, idade):
        new_id = self.getId()
        new_pessoa = Pessoa(new_id, nome, idade)
        self.__pessoas.append(new_pessoa)
        self.save()

    #Deleta uma pessoa através do id da mesma
    def delete(self, id):
        for index, pes in enumerate(self.__pessoas, start = 0):
            if pes.id == id:
                self.__pessoas.pop(index)
                self.save()
                self.getNewHigh()
                return True
        return False

    #Envia uma lista de todas as pessoas
    def getPes(self):
        pesData = [vars(pes) for pes in self.__pessoas]
        return pesData
