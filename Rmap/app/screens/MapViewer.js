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

import BuildingsFirstFloors from '../floorplans/buildingsFirst.json';
import BuildingsSecondFloors from '../floorplans/buildingsSecond.json';
import BuildingsThirdFloors from '../floorplans/buildingsThird.json';

Icon.loadFont();
var prev_toggle = 0;
var display_building_name = true;

// * * * FUNCTION TO GET LOCATION APP PERMISSIONS AND USER LOCATION * * *
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

// * * * FUNCTIONS TO TOGGLE FLOORS * * *
function toggleOverlay(floor, buildingName, {setBuilding}) {
  if (prev_toggle == floor) {
    prev_toggle = 0;
    changeFloor(0, "", {setBuilding});
  }
  else {
    prev_toggle = floor;
    changeFloor(floor, buildingName, {setBuilding});
  }
};

function changeFloor(floor, buildingName, {setBuilding}) {
  if (floor == 0) {
    display_building_name = true;
    setBuilding([]);
  } else if (floor == 1) {
    setBuilding(BuildingsFirstFloors.features.filter(a => a.properties.building == buildingName));
  } else if (floor == 2) {
    setBuilding(BuildingsSecondFloors.features.filter(a => a.properties.building == buildingName));
  } else if (floor == 3) {
    setBuilding(BuildingsThirdFloors.features.filter(a => a.properties.building == buildingName));
  }
};

function MapViewer(props){
  const { modalOpen } = props.route.params;
  const [visibleBuilding, setBuilding] = useState([]);
  const [location, setLocation] = useState({coords: {longitude: 0, latitude:0}});
  const [zoom, setZoom] = useState(16.0);
  const [bounds, setBounds] = useState({northEast: {longitude: 1000, latitude:1000}, southWest: {longitude: -1000, latitude:-1000}});

  DeviceEventEmitter.addListener("event.toggleOverlay", (floor, buildingName) => toggleOverlay(floor, buildingName, {setBuilding}));
  //console.log(visibleBuilding);

  // Displays Home navigation
  React.useEffect(() => {
    if (props.route.params?.modalOpen) {
      props.navigation.navigate('Home');
    }
  }, [props.route.params?.modalOpen]);
  // Gets initial user location
  React.useEffect(() => {
    componentDidMount({setLocation});
  }, []);
  // Sets inital "zoom" (set to 19 to display all buildings upon starting the app)
  showBuildingNames(zoom);

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
        onRegionChangeComplete={async (region) => {
          const coords = await this.map.getCamera();
          const map_boundaries = await this.map.getMapBoundaries();
          setBounds(map_boundaries);
          setZoom(coords.zoom);
          //console.log(bounds)
          //console.log('coords', coords);
        }}
      >
        { // Call function to show all buildings first to always keep it "underneath" the classrooms
          displayBuildings(props, {setBuilding}, bounds)
        } 
        { // Call function to show all social buildings (no classrooms)
          displaySocials(props, {setBuilding}, bounds)
        } 
        { // Call function to show all parking lots
          displayParking(props, {setBuilding}, bounds)
        } 
        { // Iterate and display current json dataset (visibleBuilding)
          displayFloorsHallways(props, visibleBuilding, bounds)
        }
        {
          displayFloors(props, visibleBuilding, {setBuilding}, bounds)
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
function displayFloors(props, data, {setBuilding}, bounds) {
  return (data.map((b) => {
    if (b.geometry.type == "Polygon" && b.properties.room != "hallway") { // Displays rooms and their labels
      if (!withinViewBounds(b.geometry.coordinates[0], bounds)) { return; }
      var coords = b.geometry.coordinates[0].map((x) => ({latitude: x[1], longitude: x[0]}));
      var lat = getMiddleLat(b.geometry.coordinates[0]) - 0.00001;
      var long = getMiddleLong(b.geometry.coordinates[0]);
      // Display room number/name
      var marker = <Marker
                    coordinate={
                        {
                          latitude: lat, 
                          longitude: long
                        }
                      }
                    key={`marker${b.properties.type}${b.id}`}
                  >
                    <Text style={styles.label}>
                      {(b.properties.room != "undefined") ? b.properties.room : ""}
                    </Text>
                  </Marker>;
      // Display room shape
      var polygon = <Polygon
                      coordinates={coords}
                      key={`building-room${b.id}`}
                      strokeColor="#85805e"
                      fillColor={ (b.properties.room == "undefined") ? "#85805e" :"#fff6b3"}
                      strokeWidth={2}
                      tappable
                    />;
      return ( [polygon, marker]);
    } else if (b.geometry.type == "Point") { // Displays icons such as bathrooms, water, stairs, elevators, etc
      var iconProperties = getIconProperties(b.properties.type);
      var lat = b.geometry.coordinates[1];
      var long = b.geometry.coordinates[0];
      var marker = <Marker
                    coordinate={
                        {
                          latitude: lat, 
                          longitude: long
                        }
                      }
                    key={`${b.properties.type}${b.id}`}
                  >
                    <Image
                      source={iconProperties[0]}
                      style={{width: iconProperties[1], height: iconProperties[2], border: "solid", borderRadius:10}}
                      resizeMethod="resize"
                      resizeMode="center"
                    />
                  </Marker>;
      return marker;
    } else if (b.geometry.type == "LineString") { // Displays entrances to buildings (thick line)
      if (!withinViewBounds(b.geometry.coordinates, bounds)) { return; }
      var coords = b.geometry.coordinates.map((x) => ({latitude: x[1], longitude: x[0]}));
      var line = <Polyline
                  coordinates={coords}
                  key={`entrance-${b.id}`}
                  strokeColor={"#1b5180"}
                  strokeWidth={5}
                />;
      return line;
    }
    }
  ));
};

// Format icon properties based on the marker type (name)
function getIconProperties(name) {
  var img = "";
  var w = 20;
  var h = 20;
  if (name == "bathroom") {
    img = require('../assets/neutral.png');

    if (name.gender == "m") {
      img = require('../assets/mens.png');
    }
    else if (name.gender == "f") {
      img = require('../assets/women.png');
    }
  }
  else if (name == "elevator") {
    img = require('../assets/elevator.png');
  }
  else if (name == "stairs") {
    img = require('../assets/stairs.jpg');
  }
  else if (name == "water") {
    img = require('../assets/water.png');
  }
  else if (name == "Subway") {
    w = 30; h = 30;
    img = require('../assets/subway.png');
  }
  else if (name == "The Habit") {
    w = 30; h = 30;
    img = require('../assets/habit.png');
  }
  else if (name == "Coffee Bean") {
    w = 30; h = 30;
    img = require('../assets/coffee_bean.png');
  }
  else if (name == "Panda Express") {
    w = 30; h = 30;
    img = require('../assets/panda.png');
  }
  else if (name == "Chronic Tacos") {
    w = 30; h = 30;
    img = require('../assets/chronic.png');
  }
  else if (name == "Hibachi San Grill") {
    w = 30; h = 30;
    img = require('../assets/hibachi.png');
  }
  else if (name == "Halal Shack") {
    w = 30; h = 30;
    img = require('../assets/halal.png');
  }

  return [img, w, h];
}

// Displays hallways of current building floor
// (should be called before displayBuilding function to ensure it does not overlap classrooms)
function displayFloorsHallways(props, data, bounds) {
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
        />
        )
      }
    }
  ));
}

// * * * DISPLAY MAIN BUILDINGS * * *
function displayBuildings(props, {setBuilding}, bounds) {
  const [Buildings, setBuildings] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.4.25:4000/buildingData`)
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error(error));
  }, []);
  return (Buildings.map((b) => {
    if (b.geometry.type == "Polygon") {
      if (!withinViewBounds(b.geometry.coordinates[0], bounds)) { return; }
      var lat = getMiddleLat(b.geometry.coordinates[0]);
      var long = getMiddleLong(b.geometry.coordinates[0]);
      var polygon = <Polygon
                    coordinates= {b.geometry.coordinates[0].map((x) => 
                        ({latitude: x[1], longitude: x[0]}),
                      )
                    }
                    key={`building-${b.id}`}
                    strokeColor={"#6FA76A"}
                    fillColor={"#84BC7C"}
                    strokeWidth={2}
                    tappable
                    onPress={() => {
                                    toggleOverlay(0, "", {setBuilding});
                                    zoomInto(b);
                                    props.navigation.navigate('Details', {
                                                                          type: "building",
                                                                          building: b.properties.building,
                                                                          floors: b.properties.floors,
                                                                          color: "red"
                                                                          }
                                                              );}}
                  />;
      if (display_building_name ) { // At a close enough zoom, display the building's name
        var marker = <Marker
                      coordinate={
                          {latitude: lat, 
                            longitude: long
                          }
                        }
                      key={`marker${b.properties.type}${b.id}`}
                      onPress={() => {toggleOverlay(0, "", {setBuilding});
                                      zoomInto(b);
                                      props.navigation.navigate('Details', {
                                                                            type: "building",
                                                                            building: b.properties.building,
                                                                            floors: b.properties.floors,
                                                                            sheetColor:"#84BC7C",
                                                                            }
                                                                );
                                      display_building_name = false;
                                      display_class_number = true;
                                    }}
                    >
                      <Text style={styles.label}>
                        {display_building_name ? b.properties.building : ""}
                      </Text>
                    </Marker>;
        return ([polygon, marker]);
      }
      return (polygon);
      }
    }
  ));
};

function displaySocials(props, {setBuilding}, bounds) {
  const [Socials, setBuildings] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.4.25:4000/socialData`)
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error(error));
  }, []);
  return (Socials.map((b) => {
    if (b.geometry.type == "Polygon") {
      if (!withinViewBounds(b.geometry.coordinates[0], bounds)) { return; }
      var lat = getMiddleLat(b.geometry.coordinates[0]);
      var long = getMiddleLong(b.geometry.coordinates[0]);
      var polygon =  <Polygon
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
                                                                            building: b.properties.building,
                                                                            floors: b.properties.floors,
                                                                            sheetColor:"#F0AF24",
                                                                            }
                                                                );}}
                    />;
      if (display_building_name) { // At a close enough zoom, display the building's name
        var marker = <Marker
                    coordinate={
                        {
                          latitude: lat, 
                          longitude: long
                        }
                      }
                    key={`marker${b.properties.type}${b.id}`}
                  >
                    <Text style={styles.label}>
                      {display_building_name ? b.properties.building : ""}
                    </Text>
                  </Marker>;
        return ([polygon, marker]);
      }
      return (polygon);
      }
    }
  ));
};

function displayParking(props, {setBuilding}, bounds) {
  const [Parking, setBuildings] = useState([]);
  useEffect(() => {
    fetch(`http://192.168.4.25:4000/parkingData`)
      .then(response => response.json())
      .then(data => setBuildings(data))
      .catch(error => console.error(error));
  }, []);
  return (Parking.map((b) => {
    if (!withinViewBounds(b.geometry.coordinates[0], bounds)) { return; }
    if (b.geometry.type == "Polygon") {
      var lat = getMiddleLat(b.geometry.coordinates[0]);
      var long = getMiddleLong(b.geometry.coordinates[0]);
      var polygon = <Polygon
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
                                                                          building: b.properties.name,
                                                                          sheetColor:"#A286F1",
                                                                          }
                                                              );}}
                  />;
      if (display_building_name) { // At a close enough zoom, display the building's name
        var marker = <Marker
                    coordinate={
                        {
                          latitude: lat, 
                          longitude: long
                        }
                      }
                    key={`marker${b.properties.name}${b.id}`}
                  >
                    <Text style={styles.label}>
                      {display_building_name ? b.properties.name : ""}
                    </Text>
                  </Marker>;
        return ([polygon, marker]);
      }
      return (polygon);
      }
    }
  ));
};

// * * * RENDERING FUNCTIONS * * *
function withinViewBounds(coords, bounds) {
  for(point of coords) {
    if (bounds) {
      const long = point[0];
      const lat = point[1];
      const inView = (
        bounds.northEast.latitude >= lat &&
        lat >= bounds.southWest.latitude &&
        bounds.northEast.longitude >= long &&
        long >= bounds.southWest.longitude
      );
      if (inView) {
        return true;
      }
    }
  }
  return false;
}

function showBuildingNames(zoom) {
  if ((zoom >= 17.5) && (prev_toggle == 0)) {
    display_building_name = true;
  }
  else {
    display_building_name = false;
  }
}

// * * * MAP ZOOM FUNCTIONS * * *
export function zoomInto (b) { // Zoom into building "b"
  if(this.map) {
    try {
      this.map.animateToRegion({
        latitude: getMiddleLat(b.geometry.coordinates[0]) - 0.000215,
        longitude: getMiddleLong(b.geometry.coordinates[0]),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      })
    } catch (err) {
      console.error(err)
      return;
    }
  }
}

function zoomReset () { // Resets screen to original zoom
  if(this.map) {
    try {
      this.map.animateToRegion({
        latitude: 33.973362,
        longitude: -117.328158,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      })
    } catch (err) {
      console.error(err)
      return;
    }
  }
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
  },
  label: {
    border: "solid",
    padding: 2,
    borderRadius:10,
    fontSize: 12,
    backgroundColor:"#rgba(133, 128, 94, 0.5)",
    color:"white"
  }
});

export default MapViewer;