'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('db_tokens', {
      id_token: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'db_usuarios',
          key: 'id_usuario'
        }
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'db_clientes',
          key: 'id_cliente'
        }
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accessTokenExpiresAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('db_tokens')
  }
}
