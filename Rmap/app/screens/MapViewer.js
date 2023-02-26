import React, {Component, useEffect, useRef, useState} from 'react';
import { 
  Image, 
  SafeAreaView, 
  Pressable, 
  Alert,
  Button,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  ToastAndroid,
  View,} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {BottomSheetBackdrop,BottomSheetBackdropProps,} from '@gorhom/bottom-sheet';
import MapView, {Marker, Overlay, Polygon, Polyline, Circle, Geojson} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

import Buildings from '../floorplans/buildings.json';
import BuildingsFirstFloors from '../floorplans/buildingsFirst.json';

Icon.loadFont();

// Toggle between floors
function toggleOverlay(floor, {setBuilding}) {
  if (floor == 0) {
    setBuilding({"features": []});
  } else if (floor == 1) {
    setBuilding(BuildingsFirstFloors);
  }
};

function MapViewer(props){
  const { modalOpen } = props.route.params;

  const [visibleBuilding, setBuilding] = useState({"features": []});

  React.useEffect(() => {
    if (props.route.params?.modalOpen) {
      props.navigation.navigate('Home');
    }
    }, [props.route.params?.modalOpen]);
  
    return(
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            //showsUserLocation = {true}
            //showsMyLocationButton = {true}
            initialRegion={{ //Sets the initial view of the campus
              latitude: 33.973362,
              longitude: -117.328158,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            }}
          >
           
          {// Call function to show all buildings first to always keep it "underneath" the classrooms
            displayBuildings()
          } 
          {// Iterate and display current json dataset (visibleBuilding)
            displayFloors({visibleBuilding})
          }
          {// Iterate and display current json dataset (visibleBuilding)
            displayIcons({visibleBuilding})
          }

          {/* //TEST: Display SPROUL HALL's FIRST floor
            displaySingleBuildingFloor("Sproul Hall", BuildingsFirstFloors)
        */}
          {
            //displaySingleBuildingFloor(props.params.display, props.params.buildingName, props.params.floorNumber,
              //                        {visibleBuilding}, {setBuilding})
          }
          
          {/*
            <Marker
              coordinate={{
                latitude: props.position.latitude,
                longitude: props.position.longitude
              }}
            />
            */}

          </MapView>

          {/* Button container for toggling floor plans for testing purposes*/}
          <View style={ styles.buttonsContainer }>
              <Pressable // BUILDINGS
                onPress={() => toggleOverlay(0, {setBuilding})}
                style={ styles.buttonsStyle }>
                <View>
                    <Text style={styles.pressableText}>Buildings</Text>
                </View>
              </Pressable>
              <Pressable // FIRST FLOORS
                onPress={() => toggleOverlay(1, {setBuilding})}
                style={ styles.buttonsStyle }>
                <View>
                    <Text style={styles.pressableText}>First</Text>
                </View>
              </Pressable>
              {/*
              <Pressable // TEST USER LOCATION
                onPress={() => getOneTimeLocation()}
                style={ styles.buttonsStyle }>
                <View>
                    <Text style={styles.pressableText}>User</Text>
                </View>
              </Pressable>
            */}
          </View>
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
    bottom: 90,
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

// DISPLAY FUNCTIONS
function displayBuildings() {
  return (Buildings.features.map((b) => {
    if (b.geometry.type == "Polygon") {
      var lineColor = "#00276b";
      var solidColor = "#adcbff";

      if (b.properties.type == "resource") {
        lineColor = "#345D3D";
        solidColor = "#9DCDA8";
      }
      else if (b.properties.type == "library") {
        lineColor = "#7A3B3B";
        solidColor = "#DC7A7A";
      }

      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
              ({latitude: x[1], longitude: x[0]}),
            )
          }
          key={`building-${b.id}`}
          strokeColor={lineColor}
          fillColor={solidColor}
          
          strokeWidth={2}
          tappable
          onPress={() => console.log(`${b.properties.building}`)}
        />
        )
      }
      }
    ));
};

function displayFloors({visibleBuilding}) {
  return (visibleBuilding.features.map((b) => {
    if (b.geometry.type == "Polygon") {
      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
              ({latitude: x[1], longitude: x[0]}),
            )
          }
          key={`building-room${b.id}`}
          strokeColor="#00276b"
          fillColor="#fff6b3"
          
          strokeWidth={2}
          tappable
          onPress={() => console.log(`${b.properties.building}, Room ${b.properties.room}`)}
        />
      )
    }
  }));
};

function displayIcons({visibleBuilding}) {
  return (visibleBuilding.features.map((b) => {
    if (b.geometry.type == "Point") {
      var img = require('../assets/bathroom.jpeg');

      if (b.properties.type == "bathroom") {
        img = require('../assets/bathroom.jpeg');
      }
      else if (b.properties.type == "elevator") {
        img = require('../assets/elevator.png');
      }
      else if (b.properties.type == "stairs") {
        img = require('../assets/stairs.jpg');
      }
      else if (b.properties.type == "water") {
        img = require('../assets/water.png');
      }

      return (
        <Marker
          tracksViewChanges={false}
          style={{width: 20, height: 20}}
          coordinate={
            {latitude: b.geometry.coordinates[1], 
              longitude: b.geometry.coordinates[0]
            }
            }
          key={`${b.properties.type}${b.id}`}
        >
          <Image
            source={img}
            style={{width: 20, height: 20}}
            resizeMethod="resize"
            resizeMode="center"
          />
        </Marker>
      )
    }
  }));
};

function displaySingleBuildingFloor(display, buildingName,floorNumber,
                                    {visibleBuilding}, {setBuilding}) {
  if (display) {
    toggleOverlay(floorNumber,{setBuilding});

    return (visibleBuilding.features.map((b) => {
      if ((b.geometry.type == "Polygon") && (b.properties.building == buildingName)) {
        return (
          <Polygon
            coordinates= {b.geometry.coordinates[0].map((x) => 
                ({latitude: x[1], longitude: x[0]}),
              )
            }
            key={`building-room${b.id}`}
            strokeColor="#00276b"
            fillColor="#fff6b3"
            
            strokeWidth={2}
            tappable
            onPress={() => console.log(`${b.properties.building}, Room ${b.properties.room}`)}
          />
        )
      }
      else if ((b.geometry.type == "Point") &&(b.properties.building == buildingName)) {
        var img = require('../assets/bathroom.jpeg');

        if (b.properties.type == "bathroom") {
          img = require('../assets/bathroom.jpeg');
        }
        else if (b.properties.type == "elevator") {
          img = require('../assets/elevator.png');
        }
        else if (b.properties.type == "stairs") {
          img = require('../assets/stairs.jpg');
        }
        else if (b.properties.type == "water") {
          img = require('../assets/water.png');
        }

        return (
          <Marker
            tracksViewChanges={false}
            style={{width: 20, height: 20}}
            coordinate={
              {latitude: b.geometry.coordinates[1], 
                longitude: b.geometry.coordinates[0]
              }
              }
            key={`${b.properties.type}${b.id}`}
          >
            <Image
              source={img}
              style={{width: 20, height: 20}}
              resizeMethod="resize"
              resizeMode="center"
            />
          </Marker>
        )
      }
    }));
  }

  return;
};

const mapStyle=
[
  {
    "featureType": "poi.business",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export default MapViewer;