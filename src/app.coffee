require('./utils')
require('./local_storage')

UseCase = require('./use_case')
Gui     = require('./gui')
Glue    = require('./glue')

class App
  constructor: ->
    useCase      = new UseCase()
    gui          = new Gui()
    glue         = new Glue(useCase, gui)
    
    useCase.start()
    window.useCase = useCase

new App()

