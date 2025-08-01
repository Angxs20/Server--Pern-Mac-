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


  @Default("user")
@Column({
  type: DataType.ENUM("user", "admin"),
})
declare role: "user" | "admin"



  @Default(true)
@Column({
  type: DataType.BOOLEAN
})
declare isActive: boolean;

  



}

export default User;