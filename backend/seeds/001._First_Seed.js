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
      image: "gronjords-main.jpeg",
    },
    {
      group_name: "Market",
      image: "market.jpeg",
    },
    {
      group_name: "Sublet rooms",
      image: "sublet-rooms.jpeg",
    },
    ////////////////////////////////////////////////
    {
      group_name: "Floor 11",
      image: "floor-11.jpeg",
    },
    {
      group_name: "Kitchen 11A",
      image: "kitchen-11a.jpeg",
    },
    {
      group_name: "Kitchen 11B",
      image: "kitchen-11b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 12",
      image: "floor-12.jpeg",
    },
    {
      group_name: "Kitchen 12A",
      image: "kitchen-12a.jpeg",
    },
    {
      group_name: "Kitchen 12B",
      image: "kitchen-12b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 13",
      image: "floor-13.jpeg",
    },
    {
      group_name: "Kitchen 13A",
      image: "kitchen-13a.jpeg",
    },
    {
      group_name: "Kitchen 13B",
      image: "kitchen-13b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 14",
      image: "floor-14.jpeg",
    },
    {
      group_name: "Kitchen 14A",
      image: "kitchen-14a.jpeg",
    },
    {
      group_name: "Kitchen 14B",
      image: "kitchen-14b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 15",
      image: "floor-15.jpeg",
    },
    {
      group_name: "Kitchen 15A",
      image: "kitchen-15a.jpeg",
    },
    {
      group_name: "Kitchen 15B",
      image: "kitchen-15b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 16",
      image: "floor-16.jpeg",
    },
    {
      group_name: "Kitchen 16A",
      image: "kitchen-16a.jpeg",
    },
    {
      group_name: "Kitchen 16B",
      image: "kitchen-16b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 17",
      image: "floor-17.jpeg",
    },
    {
      group_name: "Kitchen 17A",
      image: "kitchen-17a.jpeg",
    },
    {
      group_name: "Kitchen 17B",
      image: "kitchen-17b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 18",
      image: "floor-18.jpeg",
    },
    {
      group_name: "Kitchen 18A",
      image: "kitchen-18a.jpeg",
    },
    {
      group_name: "Kitchen 18B",
      image: "kitchen-18b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 21",
      image: "floor-21.jpeg",
    },
    {
      group_name: "Kitchen 21A",
      image: "kitchen-21a.jpeg",
    },
    {
      group_name: "Kitchen 21B",
      image: "kitchen-21b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 22",
      image: "floor-22.jpeg",
    },
    {
      group_name: "Kitchen 22A",
      image: "kitchen-22a.jpeg",
    },
    {
      group_name: "Kitchen 22B",
      image: "kitchen-22b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 23",
      image: "floor-23.jpeg",
    },
    {
      group_name: "Kitchen 23A",
      image: "kitchen-23a.jpeg",
    },
    {
      group_name: "Kitchen 23B",
      image: "kitchen-23b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 24",
      image: "floor-24.jpeg",
    },
    {
      group_name: "Kitchen 24A",
      image: "kitchen-24a.jpeg",
    },
    {
      group_name: "Kitchen 24B",
      image: "kitchen-24b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 25",
      image: "floor-25.jpeg",
    },
    {
      group_name: "Kitchen 25A",
      image: "kitchen-25a.jpeg",
    },
    {
      group_name: "Kitchen 25B",
      image: "kitchen-25b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 26",
      image: "floor-26.jpeg",
    },
    {
      group_name: "Kitchen 26A",
      image: "kitchen-26a.jpeg",
    },
    {
      group_name: "Kitchen 26B",
      image: "kitchen-26b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 27",
      image: "floor-27.jpeg",
    },
    {
      group_name: "Kitchen 27A",
      image: "kitchen-27a.jpeg",
    },
    {
      group_name: "Kitchen 27B",
      image: "kitchen-27b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 28",
      image: "floor-28.jpeg",
    },
    {
      group_name: "Kitchen 28A",
      image: "kitchen-28a.jpeg",
    },
    {
      group_name: "Kitchen 28B",
      image: "kitchen-28b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 31",
      image: "floor-31.jpeg",
    },
    {
      group_name: "Kitchen 31A",
      image: "kitchen-31a.jpeg",
    },
    {
      group_name: "Kitchen 31B",
      image: "kitchen-31b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 32",
      image: "floor-32.jpeg",
    },
    {
      group_name: "Kitchen 32A",
      image: "kitchen-32a.jpeg",
    },
    {
      group_name: "Kitchen 32B",
      image: "kitchen-32b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 33",
      image: "floor-33.jpeg",
    },
    {
      group_name: "Kitchen 33A",
      image: "kitchen-33a.jpeg",
    },
    {
      group_name: "Kitchen 33B",
      image: "kitchen-33b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 34",
      image: "floor-34.jpeg",
    },
    {
      group_name: "Kitchen 34A",
      image: "kitchen-34a.jpeg",
    },
    {
      group_name: "Kitchen 34B",
      image: "kitchen-34b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 35",
      image: "floor-35.jpeg",
    },
    {
      group_name: "Kitchen 35A",
      image: "kitchen-35a.jpeg",
    },
    {
      group_name: "Kitchen 35B",
      image: "kitchen-35b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 36",
      image: "floor-36.jpeg",
    },
    {
      group_name: "Kitchen 36A",
      image: "kitchen-36a.jpeg",
    },
    {
      group_name: "Kitchen 36B",
      image: "kitchen-36b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 37",
      image: "floor-37.jpeg",
    },
    {
      group_name: "Kitchen 37A",
      image: "kitchen-37a.jpeg",
    },
    {
      group_name: "Kitchen 37B",
      image: "kitchen-37b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 38",
      image: "floor-38.jpeg",
    },
    {
      group_name: "Kitchen 38A",
      image: "kitchen-38a.jpeg",
    },
    {
      group_name: "Kitchen 38B",
      image: "kitchen-38b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 41",
      image: "floor-41.jpeg",
    },
    {
      group_name: "Kitchen 41A",
      image: "kitchen-41a.jpeg",
    },
    {
      group_name: "Kitchen 41B",
      image: "kitchen-41b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 42",
      image: "floor-42.jpeg",
    },
    {
      group_name: "Kitchen 42A",
      image: "kitchen-42a.jpeg",
    },
    {
      group_name: "Kitchen 42B",
      image: "kitchen-42b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 43",
      image: "floor-43.jpeg",
    },
    {
      group_name: "Kitchen 43A",
      image: "kitchen-43a.jpeg",
    },
    {
      group_name: "Kitchen 43B",
      image: "kitchen-43b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 44",
      image: "floor-44.jpeg",
    },
    {
      group_name: "Kitchen 44A",
      image: "kitchen-44a.jpeg",
    },
    {
      group_name: "Kitchen 44B",
      image: "kitchen-44b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 45",
      image: "floor-45.jpeg",
    },
    {
      group_name: "Kitchen 45A",
      image: "kitchen-45a.jpeg",
    },
    {
      group_name: "Kitchen 45B",
      image: "kitchen-45b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 46",
      image: "floor-46.jpeg",
    },
    {
      group_name: "Kitchen 46A",
      image: "kitchen-46a.jpeg",
    },
    {
      group_name: "Kitchen 46B",
      image: "kitchen-46b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 47",
      image: "floor-47.jpeg",
    },
    {
      group_name: "Kitchen 47A",
      image: "kitchen-47a.jpeg",
    },
    {
      group_name: "Kitchen 47B",
      image: "kitchen-47b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 48",
      image: "floor-48.jpeg",
    },
    {
      group_name: "Kitchen 48A",
      image: "kitchen-48a.jpeg",
    },
    {
      group_name: "Kitchen 48B",
      image: "kitchen-48b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 61",
      image: "floor-61.jpeg",
    },
    {
      group_name: "Kitchen 61A",
      image: "kitchen-61a.jpeg",
    },
    {
      group_name: "Kitchen 61B",
      image: "kitchen-61b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 62",
      image: "floor-62.jpeg",
    },
    {
      group_name: "Kitchen 62A",
      image: "kitchen-62a.jpeg",
    },
    {
      group_name: "Kitchen 62B",
      image: "kitchen-62b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 63",
      image: "floor-63.jpeg",
    },
    {
      group_name: "Kitchen 63A",
      image: "kitchen-63a.jpeg",
    },
    {
      group_name: "Kitchen 63B",
      image: "kitchen-63b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 64",
      image: "floor-64.jpeg",
    },
    {
      group_name: "Kitchen 64A",
      image: "kitchen-64a.jpeg",
    },
    {
      group_name: "Kitchen 64B",
      image: "kitchen-64b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 65",
      image: "floor-65.jpeg",
    },
    {
      group_name: "Kitchen 65A",
      image: "kitchen-65a.jpeg",
    },
    {
      group_name: "Kitchen 65B",
      image: "kitchen-65b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 66",
      image: "floor-66.jpeg",
    },
    {
      group_name: "Kitchen 66A",
      image: "kitchen-66a.jpeg",
    },
    {
      group_name: "Kitchen 66B",
      image: "kitchen-66b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 67",
      image: "floor-67.jpeg",
    },
    {
      group_name: "Kitchen 67A",
      image: "kitchen-67a.jpeg",
    },
    {
      group_name: "Kitchen 67B",
      image: "kitchen-67b.jpeg",
    },
    ///////////////////////////////////////////////
    {
      group_name: "Floor 68",
      image: "floor-68.jpeg",
    },
    {
      group_name: "Kitchen 68A",
      image: "kitchen-68a.jpeg",
    },
    {
      group_name: "Kitchen 68B",
      image: "kitchen-68b.jpeg",
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
