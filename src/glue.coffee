class Glue
  constructor: (@useCase, @gui)->
    After(@useCase, "askForName", => @gui.showAskForName())
    After(@useCase, "greetUser", (name) => @gui.showGreetMessage(name))
    
    After(@gui, "restartClicked", => @useCase.restart())
    After(@gui, "confirmNameButtonClicked", (name) => @useCase.nameProvided(name))

    LogAll(@useCase)
    LogAll(@gui)


module.exports = Glue
