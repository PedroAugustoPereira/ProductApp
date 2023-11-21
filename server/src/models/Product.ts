import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';

import { sequelize } from '../database';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

export interface ProductCreationAttributes extends Optional<Product, "id"> {}

export interface ProductInstance
  extends Model<Product, ProductCreationAttributes>,
    Product {}

export const Product = sequelize.define<ProductInstance, Product>("Products", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },

  available: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
});
