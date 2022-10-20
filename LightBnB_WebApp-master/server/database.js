/* eslint-disable camelcase */
const { Pool } = require('pg');
const properties = require('./json/properties.json');
// const users = require('./json/users.json');
/// Users
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`SELECT * FROM users WHERE email = $1`,
    [email]).then((res) => {
    return res.rows[0];
  }).catch((err) => {
    console.log(err);
  });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users WHERE id = $1`,
    [id]).then((res) => {
    return res.rows[0];
  }).catch((err) => {
    console.log(err);
  });
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3) RETURNING *`,
  [user.name, user.email, user.password]).then((res) => {
    return res.rows;
  }).catch((err) => {
    console.log(err);
  });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`SELECT * FROM reservations
  join properties on property_id = properties.id
  where guest_id = $1 limit $2`,[guest_id, limit])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  if (Object.keys(options).length) {
    let where, rating = '';
    let queries = [];
    Object.keys(options) ? where = ` WHERE ` : '';
    for (let option in options) {
      if (options[option] && option === 'city') {
        queries.push(`%${options[option].slice(1, options[option].length - 2)}%`);
        where += `city like $${queries.length}`;
        where += ' and ';
      } else if (options[option] && option === 'minimum_price_per_night') {
        queries.push(options[option] * 100);
        where += `cost_per_night > $${queries.length}`;
        where += ' and ';
      } else if (options[option] && option === 'maximum_price_per_night') {
        queries.push(options[option] * 100);
        where += `cost_per_night < $${queries.length}`;
        where += ' and ';
      } else if (options[option] && option === 'owner_id') {
        queries.push(options[option]);
        where += `owner_id = $${queries.length}`;
        where += ' and ';
      } else if (options[option] && option === 'minimum_rating') {
        queries.push(options[option]);
        rating = `having avg(property_reviews.rating) >= $${queries.length}`;
      }
    }
    where = where.replace(/\sand\s$/, '');
    let entireQuery = `SELECT properties.id, title, cost_per_night, number_of_bedrooms, number_of_bathrooms, parking_spaces, thumbnail_photo_url, cover_photo_url, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id
    ${where}
    GROUP BY properties.id
    ${rating}
    ORDER BY cost_per_night
    LIMIT 10;`;
    entireQuery = entireQuery.replace(/\s+/g,' ');
    return pool.query(
      entireQuery,
      queries).then((res) => {
      return res.rows;
    }).catch((err) => {
      console.log(err.message);
    });
  } else
    return pool.query(
      `select * from properties limit $1`,
      [limit]).then((res) => {
      return res.rows;
    }).catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let query = [];
  let inputs = '$1';
  let i = 2;
  for (const pro in property) {
    inputs += ', $' + i;
    query.push(property[pro]);
    i++;
  }
  inputs = inputs.split(' ');
  inputs.pop();
  inputs = inputs.join(' ');
  inputs = inputs.slice(0, inputs.length - 1);
  console.log(inputs, query);
  return pool.query(`INSERT INTO properties (title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id) values(${inputs})
    RETURNING *`, query);
};
exports.addProperty = addProperty;


