import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from "react-native";


function Chip(props) {

    console.log('Chips>>',props);
    // var check = props.selected.find(element => element.name === props.text);
    // console.log('Chips>>2',props.selected.find(element => element.name === props.text));
    return (
        <>
        {props.text === props.selectedGenreText ?
            <View style={{ height: 30, borderRadius: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: '#999999',margin: 5 }}>
                <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'red',justifyContent:'center',alignItems:'center' }}>
                    <Image
                        style={{ width: 25, height: 25, borderRadius: 15}}
                        source={props.imageSrc}
                    />
                </View>
                <Text style={{ textAlign: 'center', marginHorizontal: 15 , color:'#fff' }}>{props.text}</Text>
            </View>
            :
            <View style={{ height: 30, borderRadius: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f8f8',margin: 5 }}>
                <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: 'red',justifyContent:'center',alignItems:'center' }}>
                    <Image
                        style={{ width: 25, height: 25, borderRadius: 15}}
                        source={props.imageSrc}
                    />
                </View>
                <Text style={{ textAlign: 'center', marginHorizontal: 15}}>{props.text}</Text>
            </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'azure'
    },
    item: {
        flexDirection: "column",
        flexWrap: "wrap",
        marginRight: 10,
    },
    poster: {
        width: 171,
        height: 255.5,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default Chip;
