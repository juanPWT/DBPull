export const formatDate = (date: Date | undefined) => {
  const formatDate = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatDate.format(date);
};
