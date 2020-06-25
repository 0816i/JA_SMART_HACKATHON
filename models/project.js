module.exports = (sequelize, DataTypes) => {
    const project1 = sequelize.define('Project1', {
      id: { 
        type: DataTypes.INTEGER(),
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
      },
      boardTitle: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      users: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      subject: {
          type: DataTypes.STRING(100),
          allowNull:false
      },
      school:{
          type: DataTypes.STRING(100),
          allowNull:false
      },
      type:{
          type:DataTypes.ENUM('V','B'),
          allowNull:false
      }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName:'project1'
    });
    project1.associate = function(models) {
      // associations can be defined here
    };
    return project1;
  };