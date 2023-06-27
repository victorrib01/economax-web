const moment = require("moment-timezone");
require("moment/locale/pt-br");

// Defina o fuso horário desejado
const timezone = "America/Sao_Paulo";

// Defina o idioma como português
moment.locale("pt-br");

export function getAllMonths() {
  // Obtenha o objeto Moment no primeiro dia do ano atual no fuso horário especificado
  const startOfYear = moment().tz(timezone).startOf("year");
  let months = [];
  // Crie um loop para obter todos os meses do ano
  for (let month = 0; month < 12; month++) {
    // Adicione o mês ao objeto Moment
    const currentMonth = startOfYear.clone().add(month, "months");

    // Obtenha o nome do mês formatado
    let monthName = currentMonth.format("MMMM");

    // Converta a primeira letra em maiúscula
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    // Exiba o nome do mês
    months.push({ name: monthName, number: month });
  }

  return months;
}
