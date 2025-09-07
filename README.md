# desafio-santossilva-2025
Solução do desafio StartDB

# Desafio Abrigo de Animais

Este repositório contém a solução para um desafio de lógica de programação. O código simula o processo de adoção em um abrigo de animais, determinando qual animal é adotado por qual pessoa com base em uma série de regras de negócio.

## 🚀 O Que o Código Faz?

O script principal recebe três informações como entrada:
1.  A lista de brinquedos que a **Pessoa 1** possui.
2.  A lista de brinquedos que a **Pessoa 2** possui.
3.  A ordem de chegada dos animais no abrigo para adoção.

Com base nisso, o sistema processa cada animal da lista e decide seu destino: ser adotado pela Pessoa 1, pela Pessoa 2, ou permanecer no abrigo. Ao final, ele retorna uma lista com o resultado para cada animal.

## 📜 Regras de Adoção

A lógica de decisão é baseada nas seguintes regras:

-   **Compatibilidade de Brinquedos:** Um animal só é adotado se a pessoa tiver os brinquedos que ele gosta, na **ordem exata de preferência**.
-   **Limite de Adoção:** Cada pessoa pode adotar no máximo **3 animais**. Após atingir o limite, ela não pode mais participar de novas adoções.
-   **Condição Especial do "Loco"**: O jabuti "Loco" só pode ser adotado por alguém que **já tenha adotado pelo menos um outro animal** anteriormente.
-   **Resolução de Conflitos:** Se ambas as pessoas puderem adotar o mesmo animal, ou se nenhuma puder, o animal **permanece no abrigo**.
-   **Uso de Brinquedos:** Uma vez que os brinquedos são usados para uma adoção, eles são considerados "gastos" e não podem ser usados novamente pela mesma pessoa.

## 🛠️ Como o Código Funciona?

A solução foi estruturada em JavaScript utilizando Programação Orientada a Objetos para organizar a lógica.

-   **Classe `AbrigoAnimais`**: É a classe principal que orquestra toda a simulação. Seu método `encontraPessoas` é o ponto de entrada que recebe os dados e retorna o resultado final.
-   **Classe `Brinquedos`**: É uma classe auxiliar responsável por gerenciar os brinquedos de cada pessoa, controlando quais já foram utilizados e quais ainda estão disponíveis.

### Tecnologias e Estruturas Utilizadas

-   **JavaScript (ES6+)**: Linguagem principal do projeto.
-   **Programação Orientada a Objetos (POO)**: Para uma melhor organização e reutilização do código.
-   **`Map`**: Utilizado para armazenar e associar os dados dos animais (como seus brinquedos preferidos e seu tipo) de forma eficiente.
-   **`Set`**: Usado para controlar os brinquedos já utilizados, garantindo alta performance nas verificações de disponibilidade.

