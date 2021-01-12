import { endpoint } from "./auth";
const postsEndpoint = endpoint + "/posts";

export const getUserPosts = async (id, offset) => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      postsEndpoint + `/${id}?offset=${offset}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const addPost = async (postData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: postData,
    };
    const response = await fetch(postsEndpoint, options);
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

export const likePost = async (id, likeType) => {
  try {
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      postsEndpoint + `/${id}/${likeType}/like`,
      options
    );
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

export const editComment = async (id, text, comment_id) => {
  try {
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
    const response = await fetch(
      postsEndpoint + `/${id}/comment/${comment_id}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const removeComment = async (id, comment_id) => {
  try {
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      postsEndpoint + `/${id}/comment/${comment_id}/delete`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const likeComment = async (id, comment_id, answer) => {
  try {
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      postsEndpoint + `/${id}/comment/${comment_id}/like?answer=${answer}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};
