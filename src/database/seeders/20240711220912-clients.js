'use strict'

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'db_clientes',
      [
        {
          aplicativo: 'Panel-Macrolock',
          secret: 'TnOMpVY8Bs/QAYKZkz1Y2x3Yv5f2lz3Jm/bNxktVUL0='
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('db_clientes', null, {})
  }
}
