import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '../config'
import User from './user.model'

interface TokenAttributes {
  id_token: number
  id_usuario: number
  token: string
}

export interface TokenCreationAttributes
  extends Optional<TokenAttributes, 'id_token'> {}

export interface TokenInstance
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {}

const Token = sequelize.define<TokenInstance>(
  'db_token',
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
        model: 'db_usuario',
        key: 'id_usuario'
      }
    },
    token: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'db_token'
  }
)

Token.hasOne(User, { foreignKey: 'id_usuario', as: 'usr' })

export default Token
