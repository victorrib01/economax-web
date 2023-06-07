import api from "../api";

export async function getAllCategories(setState) {
  try {
    const response = await api.get("/categorias_despesas_geral");
    const formattedDate = response.data.map((item) => {
      return {
        id: item.id,
        name: item.categoria,
      };
    });
    setState(formattedDate);
  } catch (err) {
    console.error(err);
  }
}

export async function getUserCategories(setState, id, label = false) {
  try {
    const response = await api.post(
      "/busca_categorias_despesas_geral_usuario",
      {
        id_usuario: id,
      }
    );

    if (label) {
      setState(
        response.data.map((item) => {
          return {
            id: item.id,
            label: item.categoria,
          };
        })
      );
      return;
    }
    setState(
      response.data.map((item) => {
        return {
          id: item.id,
          name: item.categoria,
        };
      })
    );
  } catch (err) {
    console.error(err);
  }
}

export async function assignCategory({ id, fetchData, selectedItems }) {
  try {
    const categorias = selectedItems.map((item) => {
      return {
        id: item.id,
      };
    });

    const response = await api.post("/cadastro_categorias_usuario", {
      id_usuario: id,
      categorias,
    });

    await fetchData();

    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function createCategory({ id, category }) {
  try {
    const response = await api.post("/cadastro_categorias", {
      id_usuario: id,
      categoria: category.trim(),
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}
