'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('db_clientes', {
      id_cliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aplicativo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secret: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('db_clientes')
  }
}
