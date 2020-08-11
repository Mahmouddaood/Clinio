import { connect } from "react-redux";

export default function({
  getState,
  langProps,
  actionsDispatcher = null,
  setCountry
}) {
  return function(WrappedComponent) {
    function WithConnector(props) {
      return WrappedComponent({ ...props });
    }

    function mapStateToProps(state, ownProps) {
      const {
        langReducer: { lang, langType, country }
      } = state;

      let neededLangValues = null;

      const stateValues = getState ? getState(state, ownProps) : null;

      if (Array.isArray(langProps) && langProps.length > 0) {
        langProps.forEach(valueItemName => {
          neededLangValues = {
            ...neededLangValues,
            [valueItemName]: lang[valueItemName]
          };
        });
      }

      return {
        isRtl: langType === "ar",
        ...(setCountry ? { country } : null),
        ...(Boolean(neededLangValues) ? { lang: neededLangValues } : null),
        ...stateValues
      };
    }

    return connect(
      mapStateToProps,
      actionsDispatcher
    )(WithConnector);
  };
}
