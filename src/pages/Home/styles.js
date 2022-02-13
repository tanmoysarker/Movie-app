import {
    StyleSheet,
    Dimensions,
} from "react-native";

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 30,
        // paddingHorizontal: 20,
    },
    item: {
        flexDirection: "column",
        flexWrap: "wrap",
        marginRight: 15,
        marginTop: 10,
    },
    poster: {
        width: deviceWidth / 2.3,
        height: 255.5,
        borderRadius: 10,
        marginBottom: 10,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        // zIndex: 3,
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#222124'
    },
    rectangle: {
        height: 40,
    },
    title: {
        fontSize: 22,
        fontFamily: "poppins-sb",
    },
    imagebg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',
    },
    carouselView: {
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    movieInfoContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 14
    },
    movieName: {
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 6
    },
    movieStat: {
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 0.8
    },
    carouselText: {
        paddingLeft: 14,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 2,
        fontWeight: 'bold'
    },
    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    allListText: {
        paddingLeft: 14,
        color: 'white',
        position: 'absolute',
        left: 2,
        bottom: 35,
        fontWeight: 'bold'
    },
    allMovieContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
    },
    titleText: {
        color: 'white',
        fontFamily: "poppins-sb",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20
    },
    rightButtonContainerStyle: {
        borderRadius: 25,
        right: 8,
        height: 30,
        top: 10,
        alignSelfs: "center",
        backgroundColor: "#383b42"
    },
});

export default styles;