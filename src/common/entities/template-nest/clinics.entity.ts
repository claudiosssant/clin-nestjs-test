import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class Clinics extends Model<Clinics> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ownerName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cep: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  uf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  neighborhood: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  complement: string;
}
