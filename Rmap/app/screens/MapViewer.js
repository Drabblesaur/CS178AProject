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
import Socials from '../floorplans/social.json';
import Parking from '../floorplans/parking.json';
import BuildingsFirstFloors from '../floorplans/buildingsFirst.json';
import BuildingsSecondFloors from '../floorplans/buildingsSecond.json';
import BuildingsThirdFloors from '../floorplans/buildingsThird.json';

Icon.loadFont();
var prev_toggle = 0;

// Toggle between floors
function toggleOverlay(floor, {setBuilding}) {
  if (prev_toggle == floor) {
    prev_toggle = 0;
    changeFloor(0, {setBuilding});
  }
  else {
    prev_toggle = floor;
    changeFloor(floor, {setBuilding});
  }
};

function changeFloor(floor, {setBuilding}) {
  if (floor == 0) {
    setBuilding({"features": []});
  } else if (floor == 1) {
    setBuilding(BuildingsFirstFloors);
  } else if (floor == 2) {
    setBuilding(BuildingsSecondFloors);
  } else if (floor == 3) {
    setBuilding(BuildingsThirdFloors);
}
};

function MapViewer(props){
  const { modalOpen } = props.route.params;
  const [visibleBuilding, setBuilding] = useState({"features": []});
  var map = useRef(null)

  React.useEffect(() => {
    if (props.route.params?.modalOpen) {
      props.navigation.navigate('Home');
    }
    }, [props.route.params?.modalOpen]);
  
    return(
        <View style={styles.container}>
          <MapView
            ref={map => {this.map = map}}
            style={styles.mapStyle}
            customMapStyle={mapStyle}
            showsUserLocation = {true}
            showsMyLocationButton = {true}
            initialRegion={{ //Sets the initial view of the campus
              latitude: 33.973362,
              longitude: -117.328158,
              latitudeDelta: 0.007,
              longitudeDelta: 0.007,
            }}
          >

          {// Call function to show all buildings first to always keep it "underneath" the classrooms
            displayBuildings(props)
          } 
          {// Call function to show all social buildings (no classrooms)
            displaySocials(props)
          } 
          {// Call function to show all parking lots
            displayParking(props)
          } 
          {// Iterate and display current json dataset (visibleBuilding)
            displayFloors(props, {visibleBuilding}, {setBuilding})
          }

          {/* //TEST: Display SPROUL HALL's FIRST floor
            displaySingleBuildingFloor("Sproul Hall", BuildingsFirstFloors)
        */}
          
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
              <Pressable // FIRST FLOORS
                onPress={() => toggleOverlay(1, {setBuilding})}
                style={ styles.buttonsStyle }>
                <View>
                    <Text style={styles.pressableText}>1st</Text>
                </View>
              </Pressable>
              <Pressable // SECOND FLOORS
                onPress={() => toggleOverlay(2, {setBuilding})}
                style={ styles.buttonsStyle }>
                <View>
                    <Text style={styles.pressableText}>2nd</Text>
                </View>
              </Pressable>
              <Pressable // THIRD FLOORS
                onPress={() => toggleOverlay(3, {setBuilding})}
                style={ styles.buttonsStyle }>
                <View>
                    <Text style={styles.pressableText}>3rd</Text>
                </View>
              </Pressable>
              {/*
              <Pressable // TEST USER LOCATION
                onPress={() => this.map.animateToRegion({
                  latitude: 33.972775,
                  longitude: -117.329716,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                })}
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

// * * * DISPLAY FUNCTIONS * * *
function displayBuildings(props) {
  const routes = props.navigation.getState()?.routes;
  const r = routes[routes.length - 1];
  console.log(r);

  return (Buildings.features.map((b) => {
    if (b.geometry.type == "Polygon") {
      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
              ({latitude: x[1], longitude: x[0]}),
            )
          }
          key={`building-${b.id}`}
          strokeColor={"#466854"}
          fillColor={"#7ED3A1"}
          
          strokeWidth={2}
          tappable
          onPress={() => {zoomInto(b);
                          props.navigation.navigate('Details', {type: "building",
                                                                building: b.properties.building,
                                                                floors: b.properties.floors,
                                                                k: r.key
                                                                });}}
        />
        )
      }
    }
  ));
};

function displaySocials(props) {
  return (Socials.features.map((b) => {
    if (b.geometry.type == "Polygon") {
      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
              ({latitude: x[1], longitude: x[0]}),
            )
          }
          key={`building-${b.id}`}
          strokeColor={"#625C39"}
          fillColor={"#E7CA23"}
          
          strokeWidth={2}
          tappable
          onPress={() => {zoomInto(b);
                          props.navigation.navigate('Details', {type: "building",
                                                                building: b.properties.building
                                                                });}}
        />
        )
      }
    }
  ));
};

function displayParking(props) {
  return (Parking.features.map((b) => {
    if (b.geometry.type == "Polygon") {
      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
              ({latitude: x[1], longitude: x[0]}),
            )
          }
          key={`building-${b.id}`}
          strokeColor={"#3F3249"}
          fillColor={"#rgba(189, 146, 221, 0.5)"}
          
          strokeWidth={2}
          tappable
          onPress={() => {zoomInto(b);
                          props.navigation.navigate('Details', {type: "parking",
                                                                building: b.properties.name
                                                                });}}
        />
        )
      }
    }
  ));
};

function displayFloors(props, {visibleBuilding}, {setBuilding}) {
  var data = {"features": []};
  if (props.route.params.floors == 1) {
    data = BuildingsFirstFloors;
  } else if (props.route.params.floors == 2) {
    data = BuildingsSecondFloors;
  }
  else if (props.route.params.floors == 3) {
    data = BuildingsThirdFloors;
  }
  //toggleOverlay(props.route.params.floors, {setBuilding});

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
          onPress={() => {props.navigation.navigate('Details', {type: "room",
                                                                building: b.properties.building,
                                                                room: b.properties.room
                                                  });}}
        />
      )
    }
    else if (b.geometry.type == "Point") {
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

function zoomInto (b) {
  this.map.animateToRegion({
    latitude: getMiddleLat(b.geometry.coordinates[0]),
    longitude: getMiddleLong(b.geometry.coordinates[0]),
    latitudeDelta: 0.0018,
    longitudeDelta: 0.0018,
  })
}

function getMiddleLat(arr) {
  var mid = 0;

  for (var i = 0; i < arr.length; i++) {
    mid += arr[i][1];
  }

  return mid / arr.length;
}

function getMiddleLong(arr) {
  var mid = 0;

  for (var i = 0; i < arr.length; i++) {
    mid += arr[i][0];
  }

  return mid / arr.length;
}

// * * * STYLES * * *
const mapStyle=
[
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

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

export default MapViewer;