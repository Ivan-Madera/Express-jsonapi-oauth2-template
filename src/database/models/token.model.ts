import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '../config'

interface TokenAttributes {
  id_token: number
  id_usuario: number
  id_cliente: number
  accessToken: string
  accessTokenExpiresAt: Date | null
}

export interface TokenCreationAttributes
  extends Optional<TokenAttributes, 'id_token'> {}

export interface TokenInstance
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {}

const Token = sequelize.define<TokenInstance>(
  'db_tokens',
  {
    id_token: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'db_usuarios',
        key: 'id_usuario'
      }
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: 'db_clientes',
        key: 'id_cliente'
      }
    },
    accessToken: {
      type: DataTypes.STRING
    },
    accessTokenExpiresAt: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false,
    tableName: 'db_tokens'
  }
)

export default Token
