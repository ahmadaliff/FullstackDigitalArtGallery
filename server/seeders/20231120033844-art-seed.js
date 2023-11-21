"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Arts", [
      {
        title: "judul",
        description: "test descriptionnn dsadkasidas siadjasiojdas",
        imagePath: "./uploads/default.jpeg",
        isAcc: false,
        categoryId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "judul yang ke 2",
        description:
          "test2 222 desc 22 descriptionnn dsadkasidas siadjasiojdas",
        imagePath: "./uploads/default.jpeg",
        isAcc: false,
        categoryId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Arts", null, {});
  },
};
