import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Animated,
    Dimensions,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Carousel from 'react-native-anchor-carousel';
import { Apis } from '../../constant/Api'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import CircularProgress from "../../components/CircularProgress";
import styles from './styles.js';

const deviceWidth = Dimensions.get("window").width;
const dummyImage = "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg";

function Home(props) {
    const searchRef = useRef(null)
    const dropdownController = useRef(null)
    const [isAnimating, setIsAnimating] = useState(false);
    const [iconName, setIconName] = useState('magnify');
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(24));
    const [queryResult, setQueryResult] = useState([]);
    const [list, setList] = useState([]);
    const [trendingList, setTrendingList] = useState([]);

    const [posts, setPosts] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);


    const [background, setBackground] = useState({
        uri: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
    })

    const [gallery, setgallery] = useState([]);

    const carouselRef = useRef(null);

    const customStyle = {
        width: fadeAnim,
    };

    const handleSelect = () => {
        setIsAnimating(true);

        fadeAnim._value != deviceWidth - 24
            ? Animated.timing(fadeAnim, {
                toValue: deviceWidth - 24,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setIconName("close");
                setIsAnimating(false);
            })
            : Animated.timing(fadeAnim, {
                toValue: 24,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setIconName("magnify");
                setIsAnimating(false);;
            });
    };
    const renderRectangle = () => {
        const customStyle = {
            width: fadeAnim,
        };

        return (
            <Animated.View style={[styles.rectangle, customStyle]}>
                <TouchableWithoutFeedback
                    style={{
                        width: 24,
                        height: 40,
                        justifyContent: "center",
                    }}
                    onPress={() => handleSelect()}
                >
                    <MaterialCommunityIcons
                        name={iconName}
                        color={'#222124'}
                        size={24}
                    />
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    };
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        carouselRef.current.scrollToIndex(index);
                        setBackground({
                            uri: item.image !== null ? item.image : null,
                            name: item.title,
                            stat: item.released,
                            desc: item.desc,
                            rating: item.vote_average
                        })
                    }
                    }
                >
                    <Image source={{ uri: item.image !== null ? item.image : null }} style={styles.carouselImage} />
                    <MaterialIcons name='library-add' size={30} color='white' style={styles.carouselIcon} onPress={() => saveFavourite(item)} />
                </TouchableOpacity>

            </View>

        )
    }

    const saveFavourite = async (item) => {
        const value = await AsyncStorage.getItem('fav');
        var newArrItem = [];


        if (JSON.parse(value) !== null) {
            var match = JSON.parse(value).find(element => element.id === item.id);

        }

        if (match === undefined) {
            newArrItem.push(item);
        }
        var concatFav = newArrItem.concat(JSON.parse(value));

        var finalFav = concatFav.filter((element) => {
            return element !== null;
        })

        AsyncStorage.setItem('fav', JSON.stringify(finalFav));
    }

    useEffect(() => {
        handleCarousels();
        handleList();
        handleTrendingList();
    }, []);


    const handleCarousels = async () => {
        setLoading(true);
        try {
            const data = [];
            const result = await axios.get(
                `${Apis.upcomingUrl}`
            );
            result.data.results.forEach((movie) => {
                data.push({
                    id: movie.id,
                    title: movie.title,
                    image:
                        movie.poster_path == null
                            ? dummyImage
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
            setgallery(data);
            setPosts(result.data);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const handleList = async () => {
        setLoading(true);
        try {
            const listData = [];
            const result = await axios.get(
                `${Apis.popularUrl}`
            );
            result.data.results.forEach((movie) => {
                listData.push({
                    id: movie.id,
                    title: movie.title,
                    image:
                        movie.poster_path == null
                            ? dummyImage
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
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const handleTrendingList = async () => {
        setLoading(true);
        try {
            const listData = [];
            const result = await axios.get(
                `${Apis.trendingUrl}`
            );
            result.data.results.forEach((movie) => {
                listData.push({
                    id: movie.id,
                    title: movie.title,
                    image:
                        movie.poster_path == null
                            ? dummyImage
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
            setTrendingList(listData);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    };

    const searchData = async (query) => {
        setLoading(true);
        try {
            const movieData = [];
            const searchResult = await axios.get(
                `${Apis.searchUrl}` + query
            );
            searchResult.data.results.forEach((movie) => {
                movieData.push({
                    id: movie.id,
                    title: movie.title,
                    image:
                        movie.poster_path == null
                            ? dummyImage
                            : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
                    backdrop_path:
                        "http://image.tmdb.org/t/p/w500/" + movie.backdrop_path,
                    genre_ids: movie.genre_ids,
                    overview: movie.overview,
                    popularity: movie.popularity,
                    stat: movie.release_date,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                    genres: movie.genres,
                })
            });
            setQueryResult(movieData);
        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
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
            var movie = movieResult.data;
            movieData.push({
                id: movie.id,
                name: movie.title,
                uri:
                    movie.poster_path == null
                        ? dummyImage
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
            props.navigation.navigate("MovieDetail", { item: movieData });

        } catch (err) {
            setError(err.message || "Unexpected Error!");
        } finally {
            setLoading(false);
        }
    }



    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={{ uri: background.uri !== null ? background.uri : null }}
                style={styles.imagebg}
                blurRadius={10}>
                <View style={styles.header}>
                    {!isAnimating && iconName == "magnify" ? (
                        <View
                            style={{
                                flexWrap: "wrap",
                                justifyContent: "center",
                                flexDirection: "row",
                            }}
                        >
                            <MaterialCommunityIcons
                                style={{ marginRight: 5 }}
                                name="movie"
                                color={'#00D080'}
                                size={30}
                            />
                            <Text
                                style={[
                                    styles.title,
                                    { color: '#fff' },
                                ]}
                            >
                                Movie Catalogue
                            </Text>
                        </View>
                    ) : (
                        <View />
                    )}
                    <View style={{ flexWrap: "wrap" }}>
                        {/* {renderRectangle} */}
                        <Animated.View style={[styles.rectangle, customStyle]}>
                            <TouchableWithoutFeedback
                                style={{
                                    width: 24,
                                    height: 40,
                                    justifyContent: "center",
                                }}
                                onPress={handleSelect}
                            >
                                <MaterialCommunityIcons
                                    name={iconName}
                                    color={'#00D080'}
                                    size={26}
                                />
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                </View>

                {!isAnimating && iconName == "close" ? (
                    <AutocompleteDropdown
                        ref={searchRef}
                        controller={(controller) => {
                            dropdownController.current = controller
                        }}
                        dataSet={queryResult}
                        onChangeText={searchData}
                        debounce={600}
                        suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
                        loading={isAnimating}
                        useFilter={false}
                        textInputProps={{
                            placeholder: "Type Movie Name ...",
                            autoCorrect: false,
                            autoCapitalize: "none",
                            style: {
                                borderRadius: 25,
                                backgroundColor: "#383b42",
                                color: "#fff",
                                paddingLeft: 18
                            }
                        }}
                        rightButtonsContainerStyle={styles.rightButtonContainerStyle}
                        inputContainerStyle={{
                            backgroundColor: "transparent"
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: "#383b42"
                        }}
                        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                        renderItem={(item, text) => (
                            <TouchableWithoutFeedback
                                onPress={() => selectItem(item)}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                    }}
                                >
                                    <Image
                                        style={{ width: 80, height: 100 }}
                                        source={{ uri: item.image }}
                                    />
                                    <View
                                        style={{
                                            flexWrap: "wrap",
                                            flexDirection: "column",
                                            marginLeft: 5,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ color: "#fff", padding: 15 }}>{item.title}</Text>
                                        <Text style={{ color: "#fff", padding: 15 }}>Rating: {item.vote_average}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        inputHeight={50}
                        showChevron={false}
                    />
                ) : (
                    <View />
                )}

                <View style={styles.carouselView}>
                    <Carousel style={styles.carousel}
                        data={gallery}
                        renderItem={renderItem}
                        itemWidth={200}
                        containerWidth={deviceWidth - 20}
                        separatorWidth={0}
                        ref={carouselRef}
                        inActiveOpacity={0.4}
                        onScrollEnd={(item) => setBackground({
                            uri: item.image !== null ? item.image : null,
                            name: item.title,
                            stat: item.released,
                            desc: item.desc,
                            rating: item.vote_average
                        })}
                    />

                </View>
                <View style={styles.movieInfoContainer}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.movieName}>{background.name}</Text>
                        <Text style={styles.movieStat}>{background.stat}</Text>

                    </View>
                    {background.rating !== undefined ?
                        <View>
                            <CircularProgress percent={Math.floor(background.rating * 100 / 10)} />
                        </View>
                        :
                        null
                    }

                </View>



                <Text style={styles.titleText}>Popular Movies</Text>

                <ScrollView style={styles.allMovieContainer} horizontal={true}>
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
                </ScrollView>

                <Text style={styles.titleText}>Trending Movies</Text>

                <ScrollView style={styles.allMovieContainer} horizontal={true}>
                    {trendingList.map((item, index) => {
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
                </ScrollView>
            </ImageBackground>
        </ScrollView>
    );
}



export default Home;
