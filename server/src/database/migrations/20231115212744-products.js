"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },

      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },

      description: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },

      price: {
        allowNull: false,
        type: Sequelize.DataTypes.DECIMAL(10, 2),
      },

      available: {
        allowNull: false,
        default: true,
        type: Sequelize.DataTypes.BOOLEAN,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
