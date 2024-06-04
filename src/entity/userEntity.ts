import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
type genderType = 'male' | 'female'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: false})
  name: string

  @Column({nullable: true})
  surname: string

  @Column({nullable: false, unique: true})
  email: string

  @Column({nullable: false})
  password: string

  @Column({
    type: "enum",
    enum: ["male", "female"],
    nullable: true
})
  gender: genderType

  @Column({nullable: true})
  photo: string

  @CreateDateColumn()
  createdAt: Date
}