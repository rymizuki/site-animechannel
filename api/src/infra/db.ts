import Sequelize from 'sequelize'

const database = process.env.MYSQL_DATABASE
const user     = process.env.MYSQL_USER
const pass     = process.env.MYSQL_PASSWORD

const db = new Sequelize(database, user, pass, {
  host: 'mysql',
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  },
})

db.sync((err) => {
  console.error(err)
})

export default db
