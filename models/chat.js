module.exports = (sequelize, DataTypes) => {
    const chat = sequelize.define('Chat', {
      id: { 
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
      },
      titleid: {
        type: DataTypes.INTEGER(),
        allowNull: false
      },
      text: {
        type: DataTypes.STRING(5000),
        allowNull: false
      },
      writer: {
          type: DataTypes.STRING(100),
          allowNull: false
      }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName:'chat'
    });
    chat.associate = function(models) {
      // associations can be defined here
    };
    return chat;
  };