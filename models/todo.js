module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('todo', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {freezeTableName: true});
    return Todo;
};