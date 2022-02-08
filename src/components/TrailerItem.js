import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";


const deviceWidth = Dimensions.get("window").width;
const posterWidth = (deviceWidth - 50) / 2;
const leftPosition = (posterWidth - 24) / 2;


function TrailerItem(props) {
  
  const marginValue = props.itemIndex % 2 == 0 ? 10 : 0;
  const thumbnail =
    "https://img.youtube.com/vi/" + props.data.key + "/hqdefault.jpg";


  return (
    <TouchableWithoutFeedback onPress={props.onPressFunction}>
      <View style={{ marginRight: marginValue, marginTop: 10 }}>
        <Image
          style={styles.image}
          source={require("../assests/play-button.png")}
        />
        <Image
          resizeMode={"cover"}
          style={styles.posterImage}
          source={{
            uri: thumbnail,
          }}
        />
        <Text
          style={styles.name}
        >
          {props.data.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 38,
    left: leftPosition,
    zIndex: 1,
    width: 24,
    height: 24,
  
  },
  posterImage: {
      width: posterWidth,
      height: 100,
      borderRadius: 20,
      marginBottom: 5,
  },
  name: {
    width: posterWidth,
    height: 100,
    borderRadius: 20,
    marginBottom: 5,
  }
});


export default TrailerItem;
