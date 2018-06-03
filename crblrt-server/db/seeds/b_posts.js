const faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Bookshelf',
          content: faker.lorem.sentence(),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1527806662/1.jpg',
          geo_tag: knex.raw(`point(45.4768, -73.5842)`),
          point_value: faker.random.number({min:5, max:10}),
          visible: faker.random.boolean()
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Radio',
          content: null,
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1527806879/2.jpg',
          geo_tag: knex.raw(`point(45.4548, -73.5699)`),
          point_value: faker.random.number({min:5, max:10}),
          visible: faker.random.boolean()
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Houseplant',
          content: faker.lorem.sentence(),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1527806749/3.jpg',
          geo_tag: knex.raw(`point(45.4914, -73.5605)`),
          point_value: faker.random.number({min:5, max:10}),
          visible: faker.random.boolean()
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Bike',
          content: faker.lorem.sentence(),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1527805912/4.jpg',
          geo_tag: knex.raw(`point(45.5017, -73.5673)`),
          point_value: faker.random.number({min:5, max:10}),
          visible: faker.random.boolean()
        },
        {
          user_id: faker.random.number({min:1, max:5}),
          title: 'Dresser',
          content: faker.lorem.sentence(),
          image_url: 'http://res.cloudinary.com/ninayujiri/image/upload/v1527805912/5.jpg',
          geo_tag: knex.raw(`point(45.5232, -73.5870)`),
          point_value: faker.random.number({min:5, max:10}),
          visible: faker.random.boolean()
        }
      ]);
    });
};