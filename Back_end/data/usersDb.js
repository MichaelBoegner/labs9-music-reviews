const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  createNewUser,
  getUser,
  edit,
  retrieve,
};

function createNewUser(newUser) {
  return db('users')
    .select()
    .where({ userID: newUser.user_id })
    .then((user) => {
      if (user.length === 0) {
        return db('users').insert({
          userID: newUser.user_id,
          emailAddress: newUser.email,
          subscriptionExpiration: null,
        });
      } else {
        return null;
      }
    });
}

function getUser(email) {
  return db('users').select().where({ emailAddress: email });
}

function edit(id, date) {
  return db('users')
    .where({ userID: id })
    .update(date);
};

function retrieve() {
  return db('users');
};