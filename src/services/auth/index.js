import api from "../api";

export async function registerUser({ user, password }) {
  try {
    const response = api.post("/cadastro", {
      usuario: user,
      senha: password,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function login({ username, password }) {
  try {
    const response = await api.post(`/login`, {
      usuario: username,
      senha: password,
    });

    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
}
