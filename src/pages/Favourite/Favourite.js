import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Apis } from '../../constant/Api'
import axios from 'axios';
import styles from './styles';


function Favorite(props) {

  const isFocused = useIsFocused();
  const [list, setList] = useState([]);

  useEffect(() => {
    getValue();
  }, [isFocused]);

  const getValue = async () => {
    try {
      const value = await AsyncStorage.getItem('fav');
      if (value !== null) {
        setList(JSON.parse(value));
        console.log(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  const onPressDetail = async (item) => {
    try {
      const movieData = [];
      const movieResult = await axios.get(
        `${Apis.baseUrl}` + item.id + `?${Apis.api}`
      );
      const creditResult = await axios.get(
        `${Apis.baseUrl}` + item.id + `/credits?${Apis.api}`
      );
      const trailerResult = await axios.get(
        `${Apis.baseUrl}` + item.id + `/videos?${Apis.api}`
      );
      var movie = movieResult.data;
      movieData.push({
        id: movie.id,
        name: movie.title,
        uri:
          movie.poster_path == null
            ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg"
            : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
        backdrop_path:
          "http://image.tmdb.org/t/p/w500/" + movie.backdrop_path,
        desc: movie.overview,
        genre_ids: movie.genre_ids,
        overview: movie.overview,
        popularity: movie.popularity,
        stat: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        genres: movie.genres,
        cast: creditResult.data.cast,
        crew: creditResult.data.crew,
        results: trailerResult.data.results
      });
      props.navigation.navigate("MovieDetail", { item: movieData, route: 'home' });

    } catch (err) {
      console.log(err.message || "Unexpected Error!");
    }
  }

  return (
    <ScrollView>
      <ImageBackground
        source={{ uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9' }}
        style={styles.imagebg}
        blurRadius={10}>

        <Text style={{ color: 'white', fontFamily: "poppins-sb", fontSize: 24, fontWeight: 'bold', marginLeft: 20, marginTop: 20 }}>Your Favourite Picks</Text>
        <View style={styles.allMovieContainer}>
          {list.length !== 0 && list.map((item, index) => {
            return (
              <TouchableOpacity style={styles.item} key={item.id}
                onPress={() => onPressDetail(item)}>
                <Image
                  style={styles.poster}
                  source={{
                    uri: item.image,
                  }}
                />
                <Text style={styles.allListText}>{item.title}</Text>
              </TouchableOpacity>
            )

          })
          }
        </View>
      </ImageBackground>

    </ScrollView>
  );
}



export default Favorite;
