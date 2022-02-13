import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";


function CrewItem(props) {


  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: "http://image.tmdb.org/t/p/w342/" + props.crew.profile_path }}
      />
      <View style={styles.innerView}>
        <Text style={styles.nameText} >
          {props.crew.name}
        </Text>
        <Text style={styles.jobText}>
          {props.crew.job}
        </Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
     margin: 20,
     flexDirection: "row",
     marginVertical: 10,
  },
  img: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  innerView: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 10,
  },
  nameText: {
    color: '#fff',
    fontFamily: "poppins-l",
  },
  jobText: {
    color: '#fff',
    fontFamily: "poppins-l",
    fontSize: 12,
  }
});

export default CrewItem;
