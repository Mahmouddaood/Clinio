import { Alert } from "react-native";

export default ({
  title = "wranning",
  msg = "couldn't get data",
  onPressOk = undefined,
  onCancel = undefined
}) =>
  Alert.alert(
    title,
    msg,
    [
      {
        text: "Okay",
        onPress: onPressOk
      },
      {
        text: "Cancel",
        onPress: onCancel
      }
    ],
    { cancelable: false }
  );
