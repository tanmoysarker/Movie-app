import {
    StyleSheet,
    Dimensions,
} from "react-native";

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    item: {
      flexDirection: "column",
      flexWrap: "wrap",
      marginRight: 20,
      marginTop: 10,
    },
    poster: {
      width: 175,
      height: 255.5,
      borderRadius: 10,
      marginBottom: 10,
    },
    imagebg: {
      flex: 1,
      height: deviceHeight * 2,
      width: null,
      opacity: 1,
      justifyContent: 'flex-start',
    },
    allMovieContainer: {
      flexDirection: 'row',
      flexWrap: "wrap",
      paddingLeft: 20,
    },
    allListText: {
      paddingLeft: 14,
      color: 'white',
      position: 'absolute',
      left: 2,
      bottom: 35,
      fontWeight: 'bold'
    },
  });

  export default styles;