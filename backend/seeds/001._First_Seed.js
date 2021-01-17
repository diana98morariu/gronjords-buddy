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
      room: 4420,
      image: "user.png",
    },
    {
      first_name: "Andreea",
      last_name: "Steriu",
      password: "$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a",
      email: "steriuandreeavio@gmail.com",
      activate_or_reset_pass_key: "75442486-0878-441c-9db1-a7006c25a39f",
      birthdate: "1995-11-16",
      phone_nr: "45967823",
      room: 3302,
      image: "user.png",
    },
    {
      first_name: "Diana",
      last_name: "Morariu",
      password: "$2b$10$rmiFymi5sFuvhKHGrWXJNuYv/udozDLiz6AV08Ubh/7eYg7A4dp2a",
      email: "diana.morariu@gmail.com",
      activate_or_reset_pass_key: "75442486-0878-441c-9db1-a7006c25a39f",
      birthdate: "1998-06-03",
      phone_nr: "49276378",
      room: 4420,
      image: "user.png",
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
      group_name: "Gronjords Main",
      image: "gronjords-main.svg",
    },
    {
      group_name: "Market",
      image: "market.svg",
    },
    {
      group_name: "Sublet rooms",
      image: "sublet-rooms.svg",
    },
    ////////////////////////////////////////////////
    {
      group_name: "Floor 11",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 11A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 11B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 12",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 12A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 12B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 13",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 13A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 13B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 14",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 14A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 14B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 15",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 15A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 15B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 16",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 16A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 16B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 17",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 17A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 17B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 18",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 18A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 18B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 21",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 21A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 21B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 22",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 22A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 22B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 23",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 23A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 23B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 24",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 24A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 24B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 25",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 25A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 25B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 26",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 26A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 26B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 27",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 27A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 27B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 28",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 28A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 28B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 31",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 31A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 31B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 32",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 32A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 32B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 33",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 33A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 33B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 34",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 34A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 34B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 35",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 35A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 35B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 36",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 36A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 36B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 37",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 37A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 37B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 38",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 38A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 38B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 41",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 41A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 41B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 42",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 42A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 42B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 43",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 43A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 43B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 44",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 44A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 44B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 45",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 45A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 45B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 46",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 46A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 46B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 47",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 47A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 47B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 48",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 48A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 48B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 61",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 61A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 61B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 62",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 62A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 62B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 63",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 63A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 63B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 64",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 64A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 64B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 65",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 65A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 65B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 66",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 66A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 66B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 67",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 67A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 67B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 68",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 68A",
      image: "groups.svg",
    },
    {
      group_name: "Kitchen 68B",
      image: "groups.svg",
    },
    ///////////////////////////////////////////////
  ];
  const enrollments = [
    {
      user_id: 1,
      group_id: 1,
    },
    {
      user_id: 2,
      group_id: 1,
    },
    {
      user_id: 3,
      group_id: 1,
    },
    {
      user_id: 1,
      group_id: 85,
    },
    {
      user_id: 1,
      group_id: 87,
    },
    {
      user_id: 3,
      group_id: 85,
    },
    {
      user_id: 3,
      group_id: 87,
    },
    {
      user_id: 2,
      group_id: 58,
    },
    {
      user_id: 2,
      group_id: 59,
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
