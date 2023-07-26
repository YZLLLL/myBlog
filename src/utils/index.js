export function formatTime(timestamp, format = "Y-M-D H:m:s") {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  let formattedTime = format.replace(/Y+/, year);
  formattedTime = formattedTime.replace(/M+/, month);
  formattedTime = formattedTime.replace(/D+/, day);
  formattedTime = formattedTime.replace(/H+/, hours);
  formattedTime = formattedTime.replace(/m+/, minutes);
  formattedTime = formattedTime.replace(/s+/, seconds);

  return formattedTime;
}
