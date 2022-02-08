import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import CastItem from "../../components/CastItem";
import CrewItem from "../../components/CrewItem";
import TrailerItem from "../../components/TrailerItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Apis } from '../../constant/Api'
import axios from 'axios';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import CircularProgress from "../../components/CircularProgress";

const deviceHeight = Dimensions.get("window").height;

function MovieDetail(props) {
    const isFocused = useIsFocused();

    const [list, setList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeMovieTrailerKey, setActiveMovieTrailerKey] = useState('');

    console.log('Detail Data',props)

    useEffect(() => {
        handleList();
      },[isFocused]);

    const handleList = async () => {
        try {
            const listData = [];
            const result = await axios.get(
                `${Apis.baseUrl}` + `${props.route.params.item[0].id}` + `/similar?${Apis.api}`
            );
              console.log('detail data>>>', `${Apis.baseUrl}` + `${props.route.params.item[0].id}` + `?${Apis.api}`);
            result.data.results.forEach((movie) => {
                listData.push({
                    id: movie.id,
                    title: movie.title,
                    image:
                        movie.poster_path == null
                            ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg"
                            : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
                    backdrop_path:
                        "http://image.tmdb.org/t/p/w500/" + movie.backdrop_path,
                    genre_ids: movie.genre_ids,
                    overview: movie.overview,
                    popularity: movie.popularity,
                    released: movie.release_date,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                    genres: movie.genres,
                })
            });
            setList(listData);
            // console.log('Result data>>>2', list);
        } catch (err) {
            console.log(err.message || "Unexpected Error!");
        }
    };

    const selectItem = async (item) => {
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
            console.log('Result data>>>', trailerResult);
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

            // setMovieDetail(movieData);
            console.log('Result data>>>2', movieData);
            props.navigation.navigate("MovieDetail", { item: movieData });

        } catch (err) {
            console.log(err.message || "Unexpected Error!");
        }
    }

    const saveFavourite = async (item) => {
        //AsyncStorage.clear();
        const value = await AsyncStorage.getItem('fav');
        console.log('val', JSON.parse(value));
        var newArrItem = [];
        
        console.log('Get Item', newArrItem);

        if(JSON.parse(value) !== null){
            var match = JSON.parse(value).find(element => element.id === item.id);
            
        }
        console.log('Pressed Item1', match);
        if (match === undefined){
            newArrItem.push(item);
        }
        var concatFav = newArrItem.concat(JSON.parse(value));

        var finalFav = concatFav.filter((element) => {
            return element !== null ;
        })
        
        AsyncStorage.setItem('fav', JSON.stringify(finalFav));
    }

    return (
        <ScrollView>
            <ImageBackground
                source={{ uri: props.route.params.item[0].uri}}
                style={styles.imagebg}
                blurRadius={10}>

                <Text style={styles.titleText}>{props.route.params.item[0].name}</Text>


                <Modal
                    style={{ position: "absolute", top: 0 }}
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false)
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#000",
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => setModalVisible(false)}
                        >
                            <View
                                style={{
                                    backgroundColor: "#222",
                                    width: 48,
                                    height: 48,
                                    position: "absolute",
                                    top: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    left: 20,
                                    borderRadius: 10,
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    size={20}
                                    color={"white"}
                                />
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{ width: "100%" }}>
                            <YoutubePlayer
                                play={true}
                                height={270}
                                videoId={activeMovieTrailerKey}
                            />
                        </View>
                    </View>
                </Modal>


                <View style={styles.allMovieContainer}>
                    <View style={styles.item}>
                        <Image
                            style={styles.poster}
                            source={{
                                uri: props.route.params.item[0].uri,
                            }}
                        />
                        {/* <Text style={styles.allListText}>Avengers</Text> */}
                    </View>
                </View>
                <View style={styles.movieInfoContainer}>
                    <View style={{ justifyContent: 'center',height:100,width:300 }}>
                        <Text style={styles.movieName}>{props.route.params.item[0].name}</Text>
                        <Text style={styles.movieStat}>{props.route.params.item[0].stat}</Text>
                    </View>
                    {/* <View
                        style={[
                            styles.ratingBadge,
                            {
                                backgroundColor: '#000',
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.rating,
                                { color: '#fff' },
                            ]}
                        >
                            {props.route.params.item[0].vote_average * 100 /10}%
                        </Text>
                    </View> */}
                     <View>
                        <CircularProgress percent={props.route.params.item[0].vote_average * 100 /10}/>
                    </View>

                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 14, marginBottom: 20 }}>
                    <Text style={{ color: 'white', opacity: 0.8, lineHeight: 20 }}>
                        {props.route.params.item[0].desc}
                    </Text>
                </View>

                <View style={{ flexWrap: "wrap", flexDirection: "row", paddingHorizontal: 20, marginBottom:20 }}>
                    {props.route.params.item[0].results.map((item, index) => {
                        return (
                            <TrailerItem
                                poster={props.route.params.item.uri}
                                key={index}
                                  onPressFunction={() => {
                                      setModalVisible(true);
                                      setActiveMovieTrailerKey(item.key);
                                  }}
                                data={item}
                                modalVisible={modalVisible}
                                itemIndex={index}
                            />
                        );
                    })}
                </View>

                <Text style={styles.headerText}>Cast</Text>
                <View>
                    {props.route.params.item[0].cast.map((cast, index) => {
                        return index < 4 ? (
                            <CastItem
                                cast={cast}
                                key={index}
                            />
                        ) : (
                            <View key={cast.id} />
                        );
                    })}
                </View>

                <Text style={styles.headerText}>Crew</Text>
                <ScrollView>
                    {props.route.params.item[0].crew.map((crew, index) => {
                        return index < 4 ? (
                            <CrewItem
                                crew={crew}
                                key={index}
                            />
                        ) : (
                            <View key={crew.id} />
                        );
                    })}
                </ScrollView>
                <Text style={styles.titleText}>Similar Movies</Text>

                <View style={styles.allMovieContainer}>
                    {list.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.item} key={item.id} onPress={() => selectItem(item)}>
                                <Image
                                    style={styles.poster}
                                    source={{
                                        uri: item.image,
                                    }}
                                />
                                <MaterialIcons name='library-add' size={30} color='white' style={styles.carouselIcon} onPress={() => saveFavourite(item)} />
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



export default MovieDetail;
