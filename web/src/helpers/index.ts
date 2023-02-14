export const formatDateTimeToPtBr = (date: string) => {
  const dateFormatted = new Date(date);
  const day = dateFormatted.getDate().toString().padStart(2, "0");
  const month = (dateFormatted.getMonth() + 1).toString().padStart(2, "0");
  const year = dateFormatted.getFullYear();
  const hour = dateFormatted.getHours().toString().padStart(2, "0");
  const minute = dateFormatted.getMinutes().toString().padStart(2, "0");
  const second = dateFormatted.getSeconds().toString().padStart(2, "0");
  const dateTime = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

  return dateTime;
};

export const formatCentsValueToPtBr = (value: number) => {
  const valueFormatted = value / 100;

  return valueFormatted.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}