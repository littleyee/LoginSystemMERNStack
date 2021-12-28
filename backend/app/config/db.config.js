module.exports = {
  HOST: "localhost",
  USER: "healthcare",
  PASSWORD: "raman",
  DB: "healthcare",
  dialect: "mysql",
  timezone: 'America/Chicago',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
