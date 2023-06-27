import api from "../api";

// categorias_despesas_geral
export async function getAllCategories() {
  try {
    const response = await api.get("/categorias_despesas_geral");
    const formattedDate = response.data.map((item) => {
      return {
        id: item.id,
        name: item.categoria,
      };
    });
    return formattedDate;
  } catch (err) {
    console.error(err);
  }
}

// busca_categorias_despesas_geral_usuario
export async function getUserCategories(jwt, label = false) {
  try {
    const response = await api.post(
      "/busca_categorias_despesas_geral_usuario",
      {
        jwt: jwt,
      }
    );

    if (label) {
      return response.data.map((item) => {
        return {
          id: item.id,
          label: item.categoria,
        };
      });
    }

    return response.data.map((item) => {
      return {
        id: item.id,
        name: item.categoria,
      };
    });
  } catch (err) {
    console.error(err);
  }
}

// cadastro_categorias_usuario
export async function assignCategory({ jwt, fetchData, selectedItems }) {
  try {
    const categorias = selectedItems.map((item) => {
      return {
        id: item.id,
      };
    });

    const response = await api.post("/cadastro_categorias_usuario", {
      jwt: jwt,
      categorias,
    });

    await fetchData();

    return response;
  } catch (err) {
    console.error(err);
  }
}

// cadastro_categorias
export async function createCategory({ jwt, category }) {
  try {
    const response = await api.post("/cadastro_categorias", {
      jwt: jwt,
      categoria: category.trim(),
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}
