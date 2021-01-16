// ====================== PRODUCTION ======================
// export const endpoint = 'http://ec2-13-48-148-107.eu-north-1.compute.amazonaws.com:5555/api';

// ====================== DEVELOPMENT ======================
export const endpoint = "http://localhost:1234/api";
const usersEndpoint = endpoint + "/sendEmail";

const auth = {
  isAuthenticated: undefined,
  userId: undefined,
  user: undefined,

  showModal: undefined,
  redirectTo: undefined,
  changeKey: undefined,
  countLoadedImages: 0,
};
export const contactTechnician = async (contactData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    };
    const response = await fetch(usersEndpoint + "/blamaend", options);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export const contactAdministration = async (contactData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    };
    const response = await fetch(usersEndpoint + "/administration", options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return { status: 0, message: "Can not connect to the server", code: 999 };
  }
};

export default auth;
