module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Clinics', 'cep');
    await queryInterface.changeColumn('Clinics', 'cep', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Clinics', 'cep', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};