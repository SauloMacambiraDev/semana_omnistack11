// Update with your config settings.

module.exports = {
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     host: process.env.DB_DEV_HOST,
  //     user: process.env.DB_DEV_USERNAME,
  //     password: process.env.DB_DEV_PASSWORD,
  //     database: process.env.DB_DEV_DATABASE
  //   },
  //   migrations: {
  //     directory: './src/database/migrations'
  //   },
  //   useNullAsDefault: true,
  // },
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations:{
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
