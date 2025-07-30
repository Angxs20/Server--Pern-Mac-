import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
@Table({
  tableName: "users",
})
class User extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare username: string;

  @Column({
    type: DataType.STRING(100),
  })
  declare email: string;

  @Column({
    type: DataType.STRING(100),
  })
  declare password: string;


  @Column({
    type: DataType.ENUM("user", "admin"),
  })
  @Default("user")
    declare role: "user" | "admin";



  @Column({
    type: DataType.BOOLEAN
  })
  @Default(true)
  declare isActive: boolean;

  



}

export default User;