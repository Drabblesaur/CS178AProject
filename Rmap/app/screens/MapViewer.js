import React, {Component, useState} from 'react';
import { Button, StyleSheet, Text, View, Image, SafeAreaView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {BottomSheetBackdrop,BottomSheetBackdropProps,} from '@gorhom/bottom-sheet';
import MapView, {Marker, Overlay} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

const UCRCOORD1 = [33.973311, -117.328205];
const UCRCOORD2 = [33.973378, -117.328108];

const SKYE_COORD1 = [33.974983757803216, -117.32906175571368];
const SKYE_COORD2 = [33.9758205938672, -117.32864056005334];
const SPROUL_COORD1 = [33.972357375536745, -117.33006897950474];
const SPROUL_COORD2 = [33.973186960425124, -117.3294313360745];
const WATKINS_COORD1 = [33.97223032141277, -117.32931341769752];
const WATKINS_COORD2 = [33.973244835362586, -117.32855643846719];
const CHASS_SOUTH_COORD1 = [33.974479656373006, -117.33084046063642];
const CHASS_SOUTH_COORD2 = [33.97512051004066, -117.33025715007692];


Icon.loadFont();
function MapViewer(props){
  const { modalOpen } = props.route.params;

  React.useEffect(() => {
    if (props.route.params?.modalOpen) {
      props.navigation.navigate('First');
    }
  }, [props.route.params?.modalOpen]);

    // Visibility states per floor plan, will toggle the opacity to 1 or 0
    const [visibleFirst, setVisibleFirst] = useState(0);
    const [visibleSecond, setVisibleSecond] = useState(0);
    // Arrays for floor plan visibility states
    const visible = [visibleFirst, visibleSecond];
    const setVisible = [setVisibleFirst, setVisibleSecond];

    // Toggles floor plan on and off based on "floor" (index for floor plan visibility arrays)
    const toggleOverlay = (floor) => {
      if (visible[floor] == 0) {
        setVisible[floor](1);
      } else {
        setVisible[floor](0);
      }

      for (var i = 0; i < visible.length; i++) {
        if (i != floor) {
          setVisible[i](0);
        }
      }
    };
  
    return(
        <View style={styles.container}>
          <MapView
          style={styles.mapStyle}
          initialRegion={{ //Sets the initial view of the campus
            latitude: 33.973362,
            longitude: -117.328158,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }}
          /*customMapStyle={mapStyle}*/>
            
          {/* Building floor overlays
              NOTE: Need to refactor, there are a lot of buildings on campus */}
          {/*
          <Overlay //Test, UCR logo
            image={require('../assets/UCR.png')}
            bounds={[UCRCOORD1, UCRCOORD2]}
            opacity={visibleFirst}
            hide={true}
          />
          */}
          <Overlay // SKYE HALL
            image={require('../assets/skye.png')}
            bounds={[SKYE_COORD1, SKYE_COORD2]}
            opacity={visibleFirst}
          />
          <Marker 
            coordinate={{
              latitude: 33.97537507374277,
              longitude: -117.32886487890542,
            }}
            title={'Skye Hall'}
          />
          <Overlay // SPROUL HALL, FIRST FLOOR
            image={require('../assets/sproul1.png')}
            bounds={[SPROUL_COORD1, SPROUL_COORD2]}
            opacity={visibleFirst}
          />
          <Overlay // SPROUL HALL, SECOND FLOOR
            image={require('../assets/sproul2.png')}
            bounds={[SPROUL_COORD1, SPROUL_COORD2]}
            opacity={visibleSecond}
          />
          <Overlay // WATKINS HALL, FIRST FLOOR
            image={require('../assets/watkins1.png')}
            bounds={[WATKINS_COORD1, WATKINS_COORD2]}
            opacity={visibleFirst}
          />
          <Overlay // WATKINS HALL, SECOND FLOOR
            image={require('../assets/watkins2.png')}
            bounds={[WATKINS_COORD1, WATKINS_COORD2]}
            opacity={visibleSecond}
          />
          <Overlay // CHASS SOUHT, FIRST FLOOR
            image={require('../assets/chasssouth1.png')}
            bounds={[CHASS_SOUTH_COORD1, CHASS_SOUTH_COORD2]}
            opacity={visibleFirst}
          />
          <Overlay // CHASS SOUHT, SECOND FLOOR
            image={require('../assets/chasssouth2.png')}
            bounds={[CHASS_SOUTH_COORD1, CHASS_SOUTH_COORD2]}
            opacity={visibleSecond}
          />

          {/* A test marker*/ /*
          <Marker 
            draggable
            coordinate={{
              latitude: 33.973362,
              longitude: -117.328158,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          /> */
          }
        </MapView>

        {/* Button container for toggling floor plans*/}
        <View style={ styles.buttonsContainer }>
            <Pressable // FIRST FLOORS
              onPress={() => toggleOverlay(0)}
              style={ styles.buttonsStyle }>
              <View>
                  <Text style={styles.pressableText}>1st</Text>
              </View>
            </Pressable>
            <Pressable // SECOND FLOORS
              onPress={() => toggleOverlay(1)}
              style={ styles.buttonsStyle }>
              <View>
                  <Text style={styles.pressableText}>2nd</Text>
              </View>
            </Pressable>
        </View>
          {/*<Button title ='go to Class' onPress={() => {props.navigation.navigate('Class');}}/>*/}
          <StatusBar/>
          <StatusBar/>
        </View>
    );
}

// Styling app in general
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonsContainer: {
    flexDirection: 'column',
    paddingVertical: 150,
    alignItems: 'flex-end',
  },
  buttonsStyle: {
    backgroundColor: '#478BFF',
    borderRadius: 10,
  },
  pressableText: {
    fontFamily : 'PoppinsMedium',
    fontSize: 18,
    color: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2.5,
    paddingBottom: 2.5,
  }
});

export default MapViewer;