import moment from "moment";

export function addorSubMomObj(isIncreasing, momObj, v, unit) {
  return isIncreasing
    ? moment(momObj).add(v, unit)
    : moment(momObj).subtract(v, unit);
}

export function set_MY_MomObj(momObj, newYear, monthStartNo) {
  let newDate = undefined;
  newDate = moment(momObj).set("year", newYear);
  newDate = moment(momObj).set("month", monthStartNo);
  return newDate;
}

export function useGetDays(firstDayOfMonth, daysInMonth) {
  let blankDays = [];
  let workingDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    blankDays = [...blankDays, false];
  }

  for (let d = 1; d <= daysInMonth; d++) {
    workingDays = [...workingDays, d];
  }

  return [...blankDays, ...workingDays];
}

export function formateDays(days = []) {
  let finalDays = [];
  const dysLn = days.length;
  for (let i = 0; i < dysLn; i += 7) {
    finalDays = [...finalDays, days.splice(0, 7)];
  }
  return finalDays;
}
