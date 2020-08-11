import React from "react";
import PhoneInput from "react-native-phone-input";
import styles from "../Input/style";
import { StyleSheet } from "react-native";

const { PureComponent } = React;

export default class PhonePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pickerData: null,
      country: props.initialCountry
    };
  }

  phone = null;
  setRef = ref => (this.phone = ref);

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData()
    });
  }

  componentWillReceiveProps({ initialCountry: nextCountry }) {
    const { initialCountry } = this.props;
    if (nextCountry && initialCountry !== nextCountry) {
      this.setState({
        country: nextCountry
      });
    }
  }

  render() {
    const { country } = this.state;
    const { rtlStyle, isRtl, onChange } = this.props;
    return (
      <PhoneInput
        ref={this.setRef}
        initialCountry={country}
        style={[styles.inputStyle, rtlStyle]}
        offset={12}
        textStyle={isRtl && mainStyle.rtlTextStyle}
        flagStyle={mainStyle.flagStyle}
        onChangePhoneNumber={onChange}
      />
    );
  }
}

const mainStyle = StyleSheet.create({
  flagStyle: {
    width: 28,
    height: 19
  },
  rtlTextStyle: {
    textAlign: "right",
    marginRight: 10
  }
});
