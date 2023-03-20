import React, { useRef, useState, useEffect } from 'react';
import { 
  Image, 
  Pressable, 
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, {Marker, Polygon, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import * as Location from 'expo-location';

//import Buildings from '../floorplans/buildings.json';
//import Socials from '../floorplans/social.json';
//import Parking from '../floorplans/parking.json';
import BuildingsFirstFloors from '../floorplans/buildingsFirst.json';
import BuildingsSecondFloors from '../floorplans/buildingsSecond.json';
import BuildingsThirdFloors from '../floorplans/buildingsThird.json';

Icon.loadFont();
var prev_toggle = 0;

async function componentDidMount({setLocation}) {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    //console.log(location);
  } catch (error) {
    console.log(error);
  }
}

// Toggle between floors
function toggleOverlay(floor, buildingName, {setBuilding}) {
  if (prev_toggle == floor) {
    prev_toggle = 0;
    changeFloor(0, buildingName, {setBuilding});
  }
  else {
    prev_toggle = floor;
    changeFloor(floor, buildingName, {setBuilding});
  }
};

//function changeFloor(floor, buildingName) {
//  let filteredData = [];
//
//  if (toggle === 1) {
//    filteredData = buildingData.BuildingsFirstFloors.filter(a => a.properties.building === buildingName);
//  } else if (toggle === 2) {
//    filteredData = buildingData.BuildingsSecondFloors.filter(a => a.properties.building === buildingName);
//  } else if (toggle === 3) {
//    filteredData = buildingData.BuildingsThirdFloors.filter(a => a.properties.building === buildingName);
//  }
//
//  setBuilding(filteredData);
//}

function changeFloor(floor, buildingName, {setBuilding}) {
  if (prev_toggle == 0) {
    setBuilding([]);
  } else if (prev_toggle == 1) {
    setBuilding(BuildingsFirstFloors.features.filter(a => a.properties.building == buildingName));
  } else if (prev_toggle == 2) {
    setBuilding(BuildingsSecondFloors.features.filter(a => a.properties.building == buildingName));
  } else if (prev_toggle == 3) {
    setBuilding(BuildingsThirdFloors.features.filter(a => a.properties.building == buildingName));
  }
};

function MapViewer(props){
  const { modalOpen } = props.route.params;
  const [visibleBuilding, setBuilding] = useState([]);
  const [location, setLocation] = useState({coords: {longitude: 0, latitude:0}});
  var map = useRef(null);

  DeviceEventEmitter.addListener("event.toggleOverlay", (floor, buildingName) => toggleOverlay(floor, buildingName, {setBuilding}));
  
  React.useEffect(() => {
    console.log(visibleBuilding);
    if (props.route.params?.modalOpen) {
      props.navigation.navigate('Home');
    }
  }, [props.route.params?.modalOpen]);

  React.useEffect(() => {
    componentDidMount({setLocation});
  }, []);

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
        { // Call function to show all buildings first to always keep it "underneath" the classrooms
          displayBuildings(props, {setBuilding})
        } 
        { // Call function to show all social buildings (no classrooms)
          displaySocials(props, {setBuilding})
        } 
        { // Call function to show all parking lots
          displayParking(props, {setBuilding})
        } 
        { // Iterate and display current json dataset (visibleBuilding)
          displayFloorsHallways(props, visibleBuilding)
        }
        {
          displayFloors(props, visibleBuilding, {setBuilding})
        }
      </MapView>

      <View style={ styles.buttonsContainer }>
        <Pressable // Reset View button (TODO: please style this)
          onPress={() => zoomReset()}
          style={ styles.buttonsStyle }>
          <View>
            <Text style={styles.pressableText}>RESET</Text>
          </View>
        </Pressable>
      </View>

      <StatusBar/>
      <StatusBar/>
    </View>
  );
}

// * * * DISPLAY FUNCTIONS * * *

// Displays classrooms (Polygon) and facility markers (Point) of current building floor
function displayFloors(props, data, {setBuilding}) {
  return (data.map((b) => {
    if (b.geometry.type == "Polygon" && b.properties.room != "hallway") {
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
            onPress={() => {toggleOverlay(0, "", {setBuilding});
                            props.navigation.navigate('Details', {
                                                                  type: "room",
                                                                  building: b.properties.building,
                                                                  room: b.properties.room
                                                                  }
                                                      );}}
          />
        )
      } else if (b.geometry.type == "Point") {
        var img = require('../assets/bathroom.jpeg');

        if (b.properties.type == "bathroom") {
          img = require('../assets/neutral.png');

          if (b.properties.gender == "m") {
            img = require('../assets/mens.png');
          }
          else if (b.properties.gender == "f") {
            img = require('../assets/women.png');
          }
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
    }
  ));
};


// Displays hallways of current building floor
// (should be called before displayBuilding function to ensure it does not overlap classrooms)
function displayFloorsHallways(props, data) {
  return (data.map((b) => {
    if (b.geometry.type == "Polygon" && b.properties.room == "hallway") {
      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
                          ({latitude: x[1], 
                            longitude: x[0]}),)
                        }
          key={`hallway-${b.id}`}
          strokeColor={"#rgba(161, 207, 246, 0)"}
          fillColor={"#rgba(161, 207, 246, 1)"}
          strokeWidth={2}
          tappable
          onPress={() => {}}
        />
        )
      }
    }
  ));
}

function displayBuildings(props, {setBuilding}) {
  const [Buildings, setBuildings] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.105:4000/buildingData`)
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error(error));
  }, []);
  return (Buildings.map((b) => {
    if (b.geometry.type == "Polygon") {
      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
              ({latitude: x[1], longitude: x[0]}),
            )
          }
          key={`building-${b.id}`}
          strokeColor={"#6FA76A"}
          fillColor={"#84BC7C"}
          
          strokeWidth={2}
          tappable
          onPress={() => {toggleOverlay(0, "", {setBuilding});
                          zoomInto(b);
                          props.navigation.navigate('Details', {
                                                                type: "building",
                                                                building: b.properties.building,
                                                                floors: b.properties.floors,
                                                                }
                                                    );}}
        />
        )
      }
    }
  ));
};

function displaySocials(props, {setBuilding}) {
  const [Socials, setBuildings] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.105:4000/socialData`)
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error(error));
  }, []);
  return (Socials.map((b) => {
    if (b.geometry.type == "Polygon") {
      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
              ({latitude: x[1], longitude: x[0]}),
            )
          }
          key={`building-${b.id}`}
          strokeColor={"#DFA11D"}
          fillColor={"#FFBC2A"}
          
          strokeWidth={2}
          tappable
          onPress={() => {toggleOverlay(0, "", {setBuilding});
                          zoomInto(b);
                          props.navigation.navigate('Details', {
                                                                type: "building",
                                                                building: b.properties.building
                                                                }
                                                    );}}
        />
        )
      }
    }
  ));
};

function displayParking(props, {setBuilding}) {
  const [Parking, setBuildings] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.105:4000/parkingData`)
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error(error));
  }, []);
  return (Parking.map((b) => {
    if (b.geometry.type == "Polygon") {
      return (
        <Polygon
          coordinates= {b.geometry.coordinates[0].map((x) => 
              ({latitude: x[1], longitude: x[0]}),
            )
          }
          key={`building-${b.id}`}
          strokeColor={"#A286F1"}
          fillColor={"#rgba(189, 146, 221, 0.5)"}
          
          strokeWidth={2}
          tappable
          onPress={() => {toggleOverlay(0, "", {setBuilding});
                          zoomInto(b);
                          props.navigation.navigate('Details', {
                                                                type: "parking",
                                                                building: b.properties.name
                                                                }
                                                    );}}
        />
        )
      }
    }
  ));
};

// * * * MAP ZOOM FUNCTIONS * * *
export function zoomInto (b) { // Zoom into building "b"
  this.map.animateToRegion({
    latitude: getMiddleLat(b.geometry.coordinates[0]),
    longitude: getMiddleLong(b.geometry.coordinates[0]),
    latitudeDelta: 0.0018,
    longitudeDelta: 0.0018,
  })
}

function zoomReset () { // Resets screen to original zoom
  this.map.animateToRegion({
    latitude: 33.973362,
    longitude: -117.328158,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  })
}

function getMiddleLat(arr) { // Helper function for function zoomInto(b) (gets center of building b's latitude)
  var mid = 0;

  for (var i = 0; i < arr.length; i++) {
    mid += arr[i][1];
  }

  return mid / arr.length;
}

function getMiddleLong(arr) { // Helper function for function zoomInto(b) (gets center of building b's longitude)
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