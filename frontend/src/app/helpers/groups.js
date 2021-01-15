import { endpoint } from "./auth";
const groupsEndpoint = endpoint + "/groups";

export const getAllGroups = async () => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(groupsEndpoint, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const getUserGroups = async (id) => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(groupsEndpoint + `/${id}`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const getOneGroup = async (id) => {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(groupsEndpoint + `/groups/${id}`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const joinGroup = async (id) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
    };
    const response = await fetch(groupsEndpoint + `/${id}/join`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const leaveGroup = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(groupsEndpoint + `/${id}/leave`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};
