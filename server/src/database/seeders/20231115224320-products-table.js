"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        name: "Camiseta Branca",
        description: "Camiseta básica branca de algodão",
        price: 29.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Calça Jeans Slim",
        description: "Calça jeans slim fit, lavagem escura",
        price: 49.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tênis Esportivo",
        description: "Tênis esportivo para corrida, cor preta",
        price: 79.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Smartphone Android",
        description: "Smartphone Android de última geração",
        price: 499.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Relógio de Pulso",
        description: "Relógio analógico com pulseira de couro",
        price: 99.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Fones de Ouvido Bluetooth",
        description: "Fones de ouvido sem fio com cancelamento de ruído",
        price: 129.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Câmera DSLR",
        description: "Câmera DSLR profissional com lentes intercambiáveis",
        price: 899.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mochila para Notebook",
        description: "Mochila resistente para notebook e acessórios",
        price: 39.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cadeira de Escritório",
        description: "Cadeira ergonômica para escritório, ajustável",
        price: 149.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Panela Antiaderente",
        description: "Panela antiaderente de alta qualidade",
        price: 34.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Livro Best-seller",
        description: "Livro de ficção mais vendido do momento",
        price: 19.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bicicleta Urbana",
        description: "Bicicleta urbana de design moderno",
        price: 299.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Máquina de Café Expresso",
        description: "Máquina de café expresso com moedor integrado",
        price: 179.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Monitor Ultrawide",
        description: "Monitor ultrawide para gaming e trabalho",
        price: 449.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Colchão Ortopédico",
        description: "Colchão ortopédico para uma boa noite de sono",
        price: 299.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Ventilador de Teto",
        description: "Ventilador de teto com controle remoto",
        price: 89.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Teclado Mecânico para Gaming",
        description: "Teclado mecânico RGB para jogos",
        price: 129.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Câmera de Segurança",
        description: "Câmera de segurança com visão noturna",
        price: 59.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Caixa de Som Bluetooth",
        description: "Caixa de som Bluetooth portátil à prova d'água",
        price: 69.99,
        available: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null);
  },
};