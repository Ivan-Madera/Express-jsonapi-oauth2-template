import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '../config'

interface ClientAttributes {
  id_cliente: number
  aplicativo: string
  secret: string
}

export interface ClientCreationAttributes
  extends Optional<ClientAttributes, 'id_cliente'> {}

export interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {}

const Client = sequelize.define<ClientInstance>(
  'db_clientes',
  {
    id_cliente: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    aplicativo: {
      type: DataTypes.STRING
    },
    secret: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'db_clientes'
  }
)

export default Client
