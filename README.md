# UCR Map Project

### Team Members: Brian Porter, Nick Lin, Jasmine Ojeda, Justin Chen, Johnny To

## Setup

First, run the Server:
```bash
cd server
# Load Packages & Dependencies
yarn
# Start Server
node index.js
# Control + c to exit
```
Then run the Front Application
```bash
cd Rmap
# Load Packages & Dependencies
yarn
# Run Application
yarn expo start
OR
yarn start

› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press w │ open web

› Press c | reload QR Code
› Press r │ reload app
› Press m │ toggle menu

› Press ? │ show all commands

# Control + d to exit
```

NOTE: To turn off server use Ctrl+C to exit server.

## Description

Final Vision: A mobile/web application that can be used to easily navigate the UCR campus.

Create a mobile/web application that allows people to navigate the UCR campus with ease. The current UCR map is difficult to navigate and unclear with its layout. The building names are vague and can be misleading, for example "Chass North" and "Chass South" or "Chung Hall" instead of "Winston Chung Hall", which a student who has never navigated on UCR before may get confused by. Then, even if students find the building their classes are in, they can still spend a lot of time looking for their classroom, sometimes going around the building multiple times. The improved UCR Map app we will create provides further details to help navigate to not only classes and buildings, but other locations in UCR that students may want to visit, such as the Botanic Gardens or the Orbach Library.

### Functions & Features

- Create a walking/biking route through inner campus
- Display locations of classes on the map
- Save course schedule
- Link to UCR course database
- Page to UCR resources
- Show hours of stores and shops
- Show campus events/times
- Zoom in and zoom out
- Ability to drop pins

### Possible Features if Time Permits

- See all classes that are taught in a specific classroom
- Study room reservation times
- Show alternative routes during large camp events to avoid large foot traffic
- Search for location

### Tools

- Front End + Mobile: React Native
- Back-end: Node.js, Express, MongoDB

### Possible Technologies

- MapBox SDK → Navigation system
- Sygic SDK  → Navigation System
- Google Maps → Navigation System
- UCR Building API → Building Info

### Scrum Schedule

- Monday : After class @ 6:00PM
- Tuesday: 2:00 PM
- Wednesday: 2:00 PM
- Thursday: 2:00 PM
- Friday: Before/After Class
