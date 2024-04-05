function datePicker(addedDate = 0) {
  const today = dayjs();
  const daysString = today.add(addedDate, "days").format("dddd, MMMM D");
  return daysString;
}

export default datePicker;
