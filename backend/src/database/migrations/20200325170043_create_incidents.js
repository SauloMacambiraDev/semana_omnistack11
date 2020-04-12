
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments() //Primary Key Integer which auto increments

        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()

        table.string('ong_id').notNullable()

        table.foreign('ong_id').references('id').inTable('ongs')
    }).then(data => {
        console.log(`Table 'incidents' created successfully in database`)
      }).catch(err => {
        console.log(`Coudn't create table 'incidents' in database`)
        console.log(err)
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
    .then(data => {
        console.log(`Table 'ongs' was dropped from database`)
      }).catch(err => {
        console.log(`Drop table 'ongs' was not possible`)
        console.log(err);
      })
};
