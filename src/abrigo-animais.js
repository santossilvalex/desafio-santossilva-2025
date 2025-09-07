class Brinquedos {
  constructor(brinquedosPessoa) {
    this.presentes = brinquedosPessoa
    this.usados = new Set()
    this.usadosGatos = new Set()
  }
  atualizarBrinquedos(listaBrinquedos, tipoAnimal) {
    listaBrinquedos = new Set(listaBrinquedos)
    if (tipoAnimal === "gato") {
      this.usadosGatos = this.usadosGatos.union(listaBrinquedos)
    } else {
      this.usados = this.usados.union(listaBrinquedos)
    }
  }

  getBrinquedos(tipoAnimal) {
    let conjunto = this.usadosGatos
    if (tipoAnimal === "gato") {
      conjunto = conjunto.union(this.usados)
    }

    let brinquedos = []
    for (let brinquedo of this.presentes) {
      if (conjunto.has(brinquedo)) {
        continue
      }
      brinquedos.push(brinquedo)
    }

    return brinquedos
  }

}





class AbrigoAnimais {
  /**
   * 
   * @param {String} brinquedosPessoa1 
   * @param {String} brinquedosPessoa2 
   * @param {String} ordemAnimais 
   */
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let animais = new Map()
    animais.set("Rex", ["RATO", "BOLA"])
    animais.set("Mimi", ["BOLA", "LASER"])
    animais.set("Fofo", ["BOLA", "RATO", "LASER"])
    animais.set("Zero", ["RATO", "BOLA"])
    animais.set("Bola", ["CAIXA", "NOVELO"])
    animais.set("Bebe", ["LASER", "RATO", "BOLA"])
    animais.set("Loco", ["SKATE", "RATO"])

    let tipoAnimal = new Map()
    tipoAnimal.set("Rex", "cao")
    tipoAnimal.set("Mimi", "gato")
    tipoAnimal.set("Fofo", "gato")
    tipoAnimal.set("Zero", "gato")
    tipoAnimal.set("Bola", "cao")
    tipoAnimal.set("Bebe", "cao")
    tipoAnimal.set("Loco", "jabuti")

    brinquedosPessoa1 = brinquedosPessoa1.split(",")
    brinquedosPessoa2 = brinquedosPessoa2.split(",")
    ordemAnimais = ordemAnimais.split(",")

    let error = this.checkAnimais(ordemAnimais, animais)
    if (error) {
      return { erro: "Animal inválido" }
    }

    error = this.checkBrinquedos(brinquedosPessoa1)
    if (error) {
      return { erro: "Brinquedo inválido" }
    }

    error = this.checkBrinquedos(brinquedosPessoa2)
    if (error) {
      return { erro: "Brinquedo inválido" }
    }


    let listaAdocao = [[], [], []]

    brinquedosPessoa1 = new Brinquedos(brinquedosPessoa1)
    brinquedosPessoa2 = new Brinquedos(brinquedosPessoa2)

    const limiteAdocao = 3
    for (let animal of ordemAnimais) {
      if (listaAdocao[1].length >= limiteAdocao) {
        brinquedosPessoa1 = new Brinquedos([])
      }
      if (listaAdocao[2].length >= limiteAdocao) {
        brinquedosPessoa2 = new Brinquedos([])
      }

      let dono = this.acharDono(
        brinquedosPessoa1, brinquedosPessoa2, animal,
        tipoAnimal.get(animal), animais.get(animal),
        listaAdocao[1].length > 0,
        listaAdocao[2].length > 0
      )


      listaAdocao[dono].push(animal)
    }

    let output = []
    let listaAbrigo = listaAdocao[0]
    for (let animal of listaAbrigo) {
      output.push(`${animal} - abrigo`)
    }

    for (let i = 1; i < listaAdocao.length; i++) {
      for (let animal of listaAdocao[i]) {
        output.push(`${animal} - pessoa ${i}`)
      }
    }

    return { lista: output.sort() }
  }

  /**
   * 
   * @param {Brinquedos} brinquedos1 
   * @param {Brinquedos} brinquedos2 
   * @param {String} animal 
   * @param {String} tipoAnimal
   */
  acharDono(brinquedos1, brinquedos2, animal, tipoAnimal, brinquedosValidos, jaAdotou1, jaAdotou2) {
    let pessoa1Levou = this.brinquedosSaoCompativeis(brinquedos1.getBrinquedos(tipoAnimal), animal, brinquedosValidos)
    let pessoa2Levou = this.brinquedosSaoCompativeis(brinquedos2.getBrinquedos(tipoAnimal), animal, brinquedosValidos)
    if (pessoa1Levou === pessoa2Levou) {
      return 0
    }

    if (pessoa1Levou) {
      if (animal === "Loco" && !jaAdotou1) {
        return 0
      }
      brinquedos1.atualizarBrinquedos(brinquedosValidos, animal)
      return 1
    }
    if (animal === "Loco" && !jaAdotou2) {
      return 0
    }
    brinquedos2.atualizarBrinquedos(brinquedosValidos, animal)
    return 2
  }


  /**
   * 
   * @param {String[]} brinquedosDados
   * @param {String} animal 
   * @param {String[]} brinquedosValidos
   */
  brinquedosSaoCompativeis(brinquedosDados, animal, brinquedosValidos) {
    let ultimaPosicao = -1
    for (let brinquedoEsperado of brinquedosValidos) {
      let achou = false
      for (let i = ultimaPosicao + 1; i < brinquedosDados.length; i++) {
        if (brinquedosDados[i] === brinquedoEsperado) {
          achou = true
          if (animal !== "Loco") {
            ultimaPosicao = i
          }
          break
        }
      }
      if (!achou) {
        return false
      }
    }

    return true
  }

  checkBrinquedos(ordemBrinquedos) {
    let brinquedosValidos = new Set([
      "BOLA", "RATO", "LASER", "CAIXA", "NOVELO", "SKATE"
    ])

    if (!brinquedosValidos.has(ordemBrinquedos[0])) {
      return "Brinquedo inválido"
    }

    for (let i = 1; i < ordemBrinquedos.length; i++) {
      let brinquedoAtual = ordemBrinquedos[i]
      if (!brinquedosValidos.has(brinquedoAtual)) {
        return "Brinquedo inválido"
      }
      for (let j = i - 1; j >= 0; j--) {
        let brinquedoAnterior = ordemBrinquedos[j]
        if (brinquedoAnterior === brinquedoAtual) {
          return "Brinquedo inválido"
        }
      }

    }
    return false
  }
  checkAnimais(ordemAnimais, animais) {
    if (!animais.has(ordemAnimais[0])) {
      return true
    }
    for (let i = 1; i < ordemAnimais.length; i++) {
      let animalAtual = ordemAnimais[i]
      if (!animais.has(animalAtual)) {
        return true
      }
      for (let j = i - 1; j >= 0; j--) {
        let animalAnterior = ordemAnimais[j]
        if (animalAnterior === animalAtual) {
          return true
        }
      }
    }
    return false
  }
}

export { AbrigoAnimais as AbrigoAnimais };
