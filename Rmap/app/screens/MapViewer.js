import React, {Component, useState} from 'react';
import { Button, StyleSheet, Text, View, Image, SafeAreaView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {BottomSheetBackdrop,BottomSheetBackdropProps,} from '@gorhom/bottom-sheet';
import MapView, {Marker, Overlay, Polygon, Polyline, Circle, Geojson} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

import Buildings from '../components/buildings.json';
import BuildingsFirstFloors from '../components/buildingsFirst.json';
const RADIUS = 1;

Icon.loadFont();

function MapViewer(props){
  const { modalOpen } = props.route.params;

  React.useEffect(() => {
    if (props.route.params?.modalOpen) {
      props.navigation.navigate('Home');
    }
  }, [props.route.params?.modalOpen]);

    // Visibility states per floor plan
    const [visibleBuilding, setBuilding] = useState(Buildings);

    // Toggle between floors
    const toggleOverlay = (floor) => {
      if (floor == 0) {
        setBuilding(Buildings);
      } else if (floor == 1) {
        setBuilding(BuildingsFirstFloors);
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
          >
            
          {// Function to iterate and display current json dataset (visibleBuilding)
            visibleBuilding.features.map((b) => {
              //console.log(b.geometry.type);
              if (b.geometry.type == "Polygon") {
                return (
                  <Polygon
                    coordinates= {b.geometry.coordinates[0].map((x) => 
                        ({latitude: x[1], longitude: x[0]}),
                      )
                    }
                    key={`building-${b.id}`}
                    strokeColor="red"
                    
                    strokeWidth={2}
                    tappable
                    onPress={() => console.log(`building-${b.id}`)}
                  />
                )
              }
              else if (b.geometry.type == "Point") {
                return (
                  <Circle
                    center= {{
                      latitude: b.geometry.coordinates[1], 
                      longitude: b.geometry.coordinates[0]
                    }
                    }
                    key={`classroom-${b.id}`}
                    strokeColor="red"
                    fillColor="blue"
                    strokeWidth={2}
                    radius = { RADIUS }
                    tappable
                    onPress={() => console.log(`classroom-${b.id}`)}
                  />
                )
              }
              else if (b.geometry.type == "LineString") {
                return (
                  <Polyline
                      coordinates= {b.geometry.coordinates.map((x) => 
                        ({latitude: x[1], longitude: x[0]}),
                      )
                    }
                    key={`line-${b.id}`}
                    strokeColor="red"
                    strokeWidth={2}
                  />
                )
              }
              }
            )
          }

        </MapView>

        {/* Button container for toggling floor plans*/}
        <View style={ styles.buttonsContainer }>
            <Pressable // BUILDINGS
              onPress={() => toggleOverlay(0)}
              style={ styles.buttonsStyle }>
              <View>
                  <Text style={styles.pressableText}>Buildings</Text>
              </View>
            </Pressable>
            <Pressable // FIRST FLOORS
              onPress={() => toggleOverlay(1)}
              style={ styles.buttonsStyle }>
              <View>
                  <Text style={styles.pressableText}>First</Text>
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
    //fontFamily : 'PoppinsMedium',
    fontSize: 18,
    color: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2.5,
    paddingBottom: 2.5,
  }
});

export default MapViewer;