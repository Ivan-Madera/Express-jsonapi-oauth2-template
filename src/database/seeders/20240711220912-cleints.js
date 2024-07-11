'use strict'

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'db_clientes',
      [
        {
          aplicativo: 'Panel-Macrolock'
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('db_clientes', null, {})
  }
}
