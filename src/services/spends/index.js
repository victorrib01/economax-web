import { parseDate } from "@/utils/formatters/parseDate";
import api from "../api";

// ultimas_despesas_usuario
export async function getLastSpends({ jwt, month, year }) {
  try {
    const response = await api.post("/ultimas_despesas_usuario", {
      jwt: jwt,
      mes: month,
      ano: year,
    });

    const sortedData = response.data
      .map((item) => {
        return {
          data: parseDate(item.data),
          category: item.categoria,
          value: item.valor,
        };
      })
      .sort((a, b) => b.data - a.data);

    return sortedData;
  } catch (err) {
    console.error(err);
  }
}

// cadastro_gastos_usuario
export async function registerSpend({ jwt, category_id, value, description }) {
  try {
    const response = await api.post("/cadastro_gastos_usuario", {
      jwt,
      gastos: [
        {
          id_categoria: category_id,
          valor: `${convertToCents(value)}`,
          descricao: description,
        },
      ],
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}

// soma_total_gastos_por_usuario_por_dia
export async function getSumDaySpends({ jwt }) {
  try {
    const response = await api.post("/soma_total_gastos_por_usuario_por_dia", {
      jwt,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}

// gastos_categoria_usuario
export async function getSpendsByCategory({ month, year, jwt }) {
  try {
    // const response = await api.post("/gastos_categoria_usuario", {
    //   dias: days || "",
    //   id_usuario: user_id,
    // });
    const response = await api.post("/gastos_categoria_usuario", {
      mes: month,
      ano: year,
      jwt: jwt,
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}
