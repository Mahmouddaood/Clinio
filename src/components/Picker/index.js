import React, { PureComponent } from "react";
import { Platform, ScrollView, TouchableOpacity } from "react-native";
import { registeredStyles } from "../../utilities/theme";
import styles from "./styles";
import PickerInput from "./inputView";
import IosView from "./IosView";
import Text from "../Text";
import Menu from "../Menu";

export default class PickerSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: props.initialValue,
      showPicker: false
    };
  }

  componentWillReceiveProps({ initialValue: nextValue }) {
    const { initialValue } = this.props;
    if (!initialValue && nextValue) {
      this.setState({ selectedItem: nextValue });
    }
  }

  showMenu = () => this._menu.show();
  hideMenu = () => this._menu.hide();
  setMenuRef = ref => (this._menu = ref);

  togglePicker = () => {
    const { showPicker } = this.state;
    this.setState({
      showPicker: !showPicker
    });
  };

  onValueChange = (value, index) => {
    if (index) {
      const { onSelect, items } = this.props;
      const selectedItem = { ...items[index], idx: index };
      this.setState(
        {
          selectedItem
        },
        () => onSelect && onSelect(selectedItem)
      );
    }
  };

  handleAndriodSelect = selectedItem => () => {
    const { onSelect } = this.props;
    return this.setState(
      {
        selectedItem
      },
      () => {
        this.hideMenu();
        return onSelect && onSelect(selectedItem);
      }
    );
  };

  renderAndroid() {
    const { selectedItem } = this.state;
    const { placeholder, isLoading, items, disabled, isRtl } = this.props;
    const enabled = items && items.length > 8;
    return (
      <Menu
        ref={this.setMenuRef}
        buttonContainerStyles={styles.buttonContainer}
        button={PickerInput({
          disabled,
          isLoading,
          placeholder,
          selectedItem,
          isRtl,
          togglePicker: this.showMenu
        })}
      >
        <ScrollView
          style={[registeredStyles.flexStyle, registeredStyles.fullWidth]}
          showsVerticalScrollIndicator={enabled}
          scrollEnabled={enabled}
        >
          {items &&
            items.map((item, idx) => this.renderListItems({ ...item, idx }))}
        </ScrollView>
      </Menu>
    );
  }

  renderListItems = item => {
    const { value, idx } = item;
    const { selectedItem } = this.state;
    const selected = selectedItem && selectedItem.idx === idx;
    return (
      <TouchableOpacity
        onPress={this.handleAndriodSelect(item)}
        style={[
          registeredStyles.flexStyle,
          registeredStyles.verticalCenteredFlex,
          styles.listItemStyle,
          selected && styles.selectedListItem
        ]}
        key={value}
      >
        {Text({
          style: styles.listItemTitle,
          children: value
        })}
      </TouchableOpacity>
    );
  };

  render() {
    if (Platform.OS === "ios") {
      return IosView({
        containerViewStyle: styles.buttonContainer,
        modalViewBottom: styles.modalViewBottom,
        togglePicker: this.togglePicker,
        onValueChange: this.onValueChange,
        ...this.state,
        ...this.props
      });
    }
    return this.renderAndroid();
  }
}
