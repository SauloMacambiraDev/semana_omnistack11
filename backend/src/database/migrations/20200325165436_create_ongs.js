
exports.up = function(knex) {
  knex.schema.createTable('ongs', function(table){
     table.string('id').primary() 
     table.string('name').notNullable()
     table.string('email').notNullable()
     table.string('whatsapp').notNullable()
     table.string('city').notNullable()
     table.string('uf', 2).notNullable()
  }).then(data => {
    console.log(`Table 'ongs' created successfully in database`)
  }).catch(err => {
    console.log(`Coudn't create table 'ongs' in database`)
    console.log(err)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs')
    .then(data => {
      console.log(`Table 'ongs' was dropped from database`)
    }).catch(err => {
      console.log(`Drop table 'ongs' was not possible`)
      console.log(err);
    })
};
