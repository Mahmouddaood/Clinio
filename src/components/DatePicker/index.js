import React from "react";
import {
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  Modal,
  View,
  Button
} from "react-native";
import styles from "./styles";
import { registeredStyles } from "../../utilities/theme";
import DateInput from "./Input";
const { Fragment, useState } = React;

const isAndroid = Platform.OS === "android";

const {
  flexStyle,
  horizontalCenteredFlex,
  rowStyle,
  fullWidth
} = registeredStyles;

function DatePicker(props) {
  const [state, updateState] = useState({
    showIOSModal: false,
    date: undefined
  });

  const { showIOSModal, date } = state;

  const {
    startDate,
    maxDate,
    minDate,
    modalButtonText,
    modalOverlayStyle,
    modalStyle,
    modalButtonStyle,
    modalBtnContainer,
    style,
    isRtl,
    onDateChanged,
    onError,
    ...otherProps
  } = props;

  async function handlePressed() {
    if (isAndroid) {
      try {
        const { action } = await DatePickerAndroid.open({
          date: date || startDate
        });

        if (action !== DatePickerAndroid.dismissedAction) {
          updateState({
            ...state,
            date,
            startDate: date
          });

          if (onDateChanged) {
            onDateChanged(getDateObj());
          }
        }
      } catch (error) {
        onError && onError(error);
      }
    } else {
      return updateState({
        ...state,
        showIOSModal: true
      });
    }
  }

  function getDateObj() {
    return {
      date,
      year: date ? date.getFullYear() : "",
      day: date ? `${date.getDate()}`.padStart(2, "0") : "",
      month: date ? `${date.getMonth() + 1}`.padStart(2, "0") : ""
    };
  }

  function handleModalClose() {
    updateState({
      ...state,
      showIOSModal: false
    });

    if (onDateChanged) {
      onDateChanged(getDateObj());
    }
  }

  function handleDateChange(date) {
    updateState({
      ...state,
      date,
      startDate: date
    });
  }
  return (
    <Fragment>
      {DateInput({
        onPress: handlePressed,
        isRtl
      })}
      <Modal
        animationType="slide"
        transparent
        visible={showIOSModal}
        onRequestClose={handleModalClose}
      >
        <View
          style={[
            styles.overlay,
            flexStyle,
            horizontalCenteredFlex,
            modalOverlayStyle
          ]}
        >
          <View style={[styles.modal, fullWidth, modalStyle]}>
            <View
              style={[
                styles.modalBtnContainer,
                fullWidth,
                horizontalCenteredFlex,
                rowStyle,
                modalBtnContainer
              ]}
            >
              <Button
                style={modalButtonStyle}
                title={modalButtonText}
                onPress={handleModalClose}
              />
            </View>
            <DatePickerIOS
              mode="date"
              date={date || startDate}
              onDateChange={handleDateChange}
              maximumDate={maxDate}
              minimumDate={minDate}
              {...otherProps}
            />
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}

DatePicker.defaultProps = {
  startDate: new Date(),
  onError: undefined,
  onDateChanged: undefined,
  maxDate: undefined,
  minDate: undefined,
  modalButtonText: "Done"
};

export default DatePicker;
