import React from "react";
import { Modal, Picker, TouchableOpacity, View } from "react-native";
import { registeredStyles, colors } from "../../utilities/theme";
import PickerInputView from "./inputView";

function IosView({
  containerViewStyle,
  togglePicker,
  onValueChange,
  selectedItem,
  showPicker,
  items,
  modalViewBottom,
  placeholder,
  ...otherProps
}) {
  return (
    <View style={[registeredStyles.flexStyle, containerViewStyle]}>
      {PickerInputView({
        togglePicker,
        selectedItem,
        placeholder,
        ...otherProps
      })}
      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        supportedOrientations={["portrait", "landscape"]}
        onRequestClose={togglePicker}
      >
        <TouchableOpacity
          style={[registeredStyles.flexStyle]}
          onPress={togglePicker}
        />
        <View style={[modalViewBottom, registeredStyles.verticalCenteredFlex]}>
          <Picker
            onValueChange={onValueChange}
            selectedValue={selectedItem ? selectedItem.value : undefined}
            shouldRasterizeIOS
          >
            {renderPickerItems(items, placeholder)}
          </Picker>
        </View>
      </Modal>
    </View>
  );
}

function renderPickerItems(items = [], placeholder) {
  const placeHolderObj = {
    label: placeholder,
    value: placeholder,
    id: "id"
  };
  return [placeHolderObj, ...items].map(({ value, label }, idx) => (
    <Picker.Item
      label={label}
      value={value}
      {...(!idx ? { color: colors.appPrimary } : null)}
      key={idx}
    />
  ));
}

export default IosView;
