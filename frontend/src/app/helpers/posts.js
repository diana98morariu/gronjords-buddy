import { endpoint } from "./auth";
const postsEndpoint = endpoint + "/posts";

export const getFeedPosts = async () => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postsEndpoint, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};
export const getGroupPosts = async (id) => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postsEndpoint + `/group/${id}`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const getUserPosts = async (id) => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postsEndpoint + `/${id}`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const createAnnouncementPost = async (postData) => {
  try {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
      body: postData,
    };
    const response = await fetch(postsEndpoint + `/1`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};
export const createItemPost = async (postData) => {
  try {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
      body: postData,
    };
    const response = await fetch(postsEndpoint + `/2`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};
export const createRoomPost = async (postData) => {
  try {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
      body: postData,
    };
    const response = await fetch(postsEndpoint + `/3`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const createPost = async (id, postData) => {
  try {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
      body: postData,
    };
    const response = await fetch(postsEndpoint + `/` + id, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const removePost = async (id) => {
  try {
    const options = {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postsEndpoint + "/" + id, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const editPost = async (id, text) => {
  try {
    const options = {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
    const response = await fetch(postsEndpoint + "/" + id, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const getPostLikes = async (id) => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postsEndpoint + `/likes/${id}`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};
export const checkLike = async (id) => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postsEndpoint + `/checklike/${id}`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const likePost = async (id) => {
  try {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postsEndpoint + `/${id}/like`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const dislikePost = async (id) => {
  try {
    const options = {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(postsEndpoint + `/${id}/dislike`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const addCommentToPost = async (id, commentData) => {
  try {
    const options = {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    };
    const response = await fetch(postsEndpoint + `/${id}/comment`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const removeComment = async (id, comment_id) => {
  try {
    const options = {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      postsEndpoint + `/${id}/deletecomment`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};
