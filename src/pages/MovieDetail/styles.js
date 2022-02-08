import {
    StyleSheet,
    Dimensions,
} from "react-native";


const styles = StyleSheet.create({
    item: {
        flexDirection: "column",
        flexWrap: "wrap",
        marginRight: 15,
    },
    poster: {
        width: 171,
        height: 255.5,
        borderRadius: 10,
        marginBottom: 10,
    },
    imagebg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',
    },
    allMovieContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        paddingLeft: 20,
        paddingTop: 20
    },
    allListText: {
        paddingLeft: 14,
        color: 'white',
        position: 'absolute',
        left: 2,
        bottom: 35,
        fontWeight: 'bold'
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
    headerText: {
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    ratingBadge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    movieInfoContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        paddingRight: 30
    },
    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    titleText: { 
        color: 'white',
        fontFamily: "poppins-sb",
        fontSize: 24,
        fontWeight: 'bold', 
        marginLeft: 20, 
        marginTop: 20 
    }
});

export default styles;