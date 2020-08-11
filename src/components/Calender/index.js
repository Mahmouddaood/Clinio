import React from "react";
import { View } from "react-native";
import styles from "./styles";
import moment from "moment";
import Text from "../Text";
import Icon from "../Icon";
import { registeredStyles } from "../../utilities/theme";
import {
  addorSubMomObj,
  set_MY_MomObj,
  useGetDays,
  formateDays
} from "./utils";

const { useState } = React;

const {
  flexStyle,
  spaceBetweenItems,
  rowStyle,
  rtlRow,
  horizontalCenteredFlex,
  shadowStyle
} = registeredStyles;

const weekdayshort = moment.weekdaysShort();
const allmonths = moment.months();

function CalenderComponent({ isRtl }) {
  const [dateObject, updateMomemntObj] = useState(moment());
  const [selectedDay, handleChangeDay] = useState(undefined);

  const firstDayOfMonth = moment(dateObject)
    .startOf("month")
    .format("d");

  const daysInMonth = dateObject.daysInMonth();
  const year = dateObject.format("Y");
  const month = dateObject.format("MMMM");
  const monthNo = allmonths.indexOf(month);

  function setMonth(isNext) {
    const newDate = addorSubMomObj(isNext, dateObject, 1, "month");
    return updateMomemntObj(newDate);
  }

  function setYear(isNext) {
    let newDate = addorSubMomObj(isNext, dateObject, 1, "year");
    const newYear = newDate.format("Y");
    const monthStartNo = isNext ? 0 : 11;
    newDate = set_MY_MomObj(newDate, newYear, monthStartNo);
    return updateMomemntObj(newDate);
  }

  function onNext() {
    const isNotLastMonth = monthNo <= allmonths.length - 1;
    return isNotLastMonth ? setMonth(true) : setYear(true);
  }

  function onPrev() {
    const isfirstMonth = !monthNo;
    return isfirstMonth ? setYear() : setMonth();
  }

  function onDayClick(d) {
    handleChangeDay(d);
  }

  const xDays = useGetDays(firstDayOfMonth, daysInMonth);
  const formatedDays = formateDays(xDays);

  const weekdayshortname = useLoopText({
    arr: weekdayshort,
    style: styles.weekDayText
  });

  return (
    <View style={[flexStyle, styles.containerStyle]}>
      <View
        style={[
          styles.controllersRow,
          rowStyle,
          spaceBetweenItems,
          horizontalCenteredFlex
        ]}
      >
        {Icon({
          name: "navigate-before",
          size: 28,
          onPress: onPrev
        })}

        {Text({
          children: `${month}  ${year}`,
          style: styles.yearMonthTxtStyle
        })}

        {Icon({
          name: "navigate-next",
          size: 28,
          onPress: onNext
        })}
      </View>
      <View style={[flexStyle, styles.wrapperStyle, shadowStyle]}>
        {useRowView({
          style: styles.headerStyle,
          isRtl,
          children: weekdayshortname
        })}

        <View style={[flexStyle, styles.daysContainerStyle]}>
          {formatedDays.map((rowItems, rowItemIdx) =>
            useRowView({
              isRtl,
              style: [flexStyle, styles.calenderBodyRow],
              itemKey: rowItemIdx,
              children: useLoopText({
                arr: rowItems,
                onPress: onDayClick,
                selectedDay
              })
            })
          )}
        </View>
      </View>
    </View>
  );
}

function useLoopText({ arr, style, onPress, selectedDay }) {
  function handlePress(value) {
    return function() {
      if (value) {
        onPress && onPress(value);
      }
    };
  }

  if (!arr) return null;
  return arr.map((dayItem, idx) => {
    const selectedStyle = selectedDay === dayItem && [
      styles.weekDayText,
      styles.selectedDayStyle
    ];

    return (
      <View key={idx + dayItem} style={styles.rowItemWrapperStyle}>
        <Text
          children={dayItem || ""}
          style={[styles.rowItemStyle, style, selectedStyle]}
          center={true}
          onPress={handlePress(dayItem)}
        />
      </View>
    );
  });
}

function useRowView({ style, isRtl, children, itemKey }) {
  return (
    <View
      key={itemKey}
      style={[horizontalCenteredFlex, isRtl ? rtlRow : rowStyle, style]}
    >
      {children}
    </View>
  );
}

export default CalenderComponent;

// https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/
