import { PermissionsAndroid } from "react-native";

function excAction() {
  return undefined;
}

export async function requestLocationPermission({
  onStart = excAction,
  onPermision = {
    onGranted: excAction,
    onDenied: excAction
  }
}) {
  try {
    onStart();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Please Enable Phone GPS",
        message: "Clinio App needs access your Location",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      onPermision.onGranted();
    } else {
      onPermision.onDenied();
    }
  } catch (err) {
    onPermision.onDenied();
  }
}

function getLocationFailed(err) {
  console.log("error failure", err);
}

export function getLocation(
  getLocationSuccess,
  getLocationFailure = getLocationFailed
) {
  navigator.geolocation.getCurrentPosition(
    getLocationSuccess,
    getLocationFailure,
    {
      enableHighAccuracy: true,
      maximumAge: 60 * 60 * 24,
      timeout: 200000
    }
  );
}
