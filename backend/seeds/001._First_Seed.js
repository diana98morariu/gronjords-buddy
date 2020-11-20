exports.seed = (knex) => {
  const users = [
    {
      first_name: "Jonathan",
      last_name: "Bulow",
      password: "$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a",
      email: "jobu@gmail.com",
      activate_or_reset_pass_key: "75442486-0878-441c-9db1-a7006c25a39f",
      birthdate: "1997-05-09",
      phone_nr: "45268917",
      image: "profile_jonathan.jpeg",
      room: 4420,
    },
    {
      first_name: "Andreea",
      last_name: "Steriu",
      password: "$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a",
      email: "andreea.steriu@gmail.com",
      activate_or_reset_pass_key: "75442486-0878-441c-9db1-a7006c25a39f",
      birthdate: "1995-11-16",
      phone_nr: "45967823",
      image: "profile_andreea.jpeg",
      room: 3302,
    },
    {
      first_name: "Diana",
      last_name: "Morariu",
      password: "$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a",
      email: "diamorariu@gmail.com",
      activate_or_reset_pass_key: "75442486-0878-441c-9db1-a7006c25a39f",
      birthdate: "1998-06-03",
      phone_nr: "49276378",
      image: "profile_diana.jpeg",
      room: 4420,
    },
  ];

  const posts = [
    {
      title: "Beautiful 1 room studio",
      content:
        "The apartment is compact, but well-appointed and bright one-bedroom apartments with private bath, kitchen niche and French balcony. There are three different types (A, B and C) and this ad relates to type B. Type C is 33 m2 and has storage space in the apartment.",
      user_id: 1,
      group_id: 1,
    },
    {
      title: "Beautiful 1 room studio",
      content:
        "The apartment is compact, but well-appointed and bright one-bedroom apartments with private bath, kitchen niche and French balcony. There are three different types (A, B and C) and this ad relates to type B. Type C is 33 m2 and has storage space in the apartment.",
      user_id: 2,
      group_id: 1,
    },
    {
      title: "Beautiful 1 room studio",
      content:
        "The apartment is compact, but well-appointed and bright one-bedroom apartments with private bath, kitchen niche and French balcony. There are three different types (A, B and C) and this ad relates to type B. Type C is 33 m2 and has storage space in the apartment.",
      user_id: 3,
      group_id: 2,
    },
  ];
  const likes = [
    {
      post_id: 1,
      user_id: 2,
    },
    {
      post_id: 2,
      user_id: 3,
    },
    {
      post_id: 3,
      user_id: 1,
    },
  ];
  const comments = [
    {
      post_id: 1,
      user_id: 2,
      content: "blablablabala",
    },
    {
      post_id: 2,
      user_id: 3,
      content: "uerhp90dnwjeforgkr",
    },
    {
      post_id: 2,
      user_id: 2,
      content: "vberuvbeiuveibrtve",
    },
  ];
  const groups = [
    {
      group_name: "hello world",
      image: "world.jpeg",
    },
    {
      group_name: "hello earth",
      image: "earth.jpeg",
    },
  ];
  const enrollments = [
    {
      user_id: 2,
      group_id: 1,
    },
    {
      user_id: 1,
      group_id: 1,
    },
    {
      user_id: 3,
      group_id: 1,
    },
    {
      user_id: 2,
      group_id: 2,
    },
    {
      user_id: 3,
      group_id: 2,
    },
  ];
  return knex("likes")
    .del()
    .then(() => knex("comments").del())
    .then(() => knex("posts").del())
    .then(() => knex("enrollments").del())
    .then(() => knex("groups").del())
    .then(() => knex("users").del())
    .then(() => knex("users").insert(users))
    .then((res) => knex("groups").insert(groups))
    .then((res) => knex("enrollments").insert(enrollments))
    .then((res) => knex("posts").insert(posts))
    .then((res) => knex("likes").insert(likes))
    .then((res) => knex("comments").insert(comments));
};
