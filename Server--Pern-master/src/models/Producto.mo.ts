
import { Table,Column,  Model, DataType, Default  } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

class products extends Model{
    @Column({
        type: DataType.STRING(100)
    })
     name: String

    @Column({
        type: DataType.DECIMAL(10,2)
    })
     price: number
    @Default(true)
    @Column({
        type:DataType.BOOLEAN
    })
     availability: Boolean
}

export default products