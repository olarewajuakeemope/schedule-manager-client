# SCHEDULE MANAGER
SCHEDULE MANAGER is a mobile aplication for schedule management. The application is optimized for only phones and not for tablets. The application is currently ongoing and I will modify this part of the README and make it more detailed when I have handled all limitations listed below.

## Features

1. **Schedules**
   - Filter schedules by tags
   - Add start and end time to schedules
   - Add title, description, short description etc. to schedules

2. **Users**
  - Users can signup
  - Signed in users can create public schedules
  - Signed in users can view public schedules
  - Signed in users can create private schedules
  - Signed in users can create team schedules
  - Users can view public schedules
  - Signed in users can sign out

## Screenshots

IOS            |  ANDROID
:-------------------------:|:-------------------------:
![Alt home page](/screenshots/ios/1-home.png?raw=true "home page") |  ![Alt home page](/screenshots/android/1-home.png?raw=true "home page")
![Alt home page](/screenshots/ios/2-signup.png?raw=true "home page") |  ![Alt home page](/screenshots/android/2-signup.png?raw=true "home page")

## Limitations
1. Push notification is yet to be implemented
2. Minor bugs still present
3. Yet to implement addition of members to schedule
4. Info tab is yet to be implemented


## Technologies
Schedule Manager is implemented using a number of technologies, these include:
* react-native - Main tech to implement Android and Ios version of the Application
* Parse - Open-source library for building backend logic
* [node.js] - evented I/O for the backend


   [react-native]: https://facebook.github.io/react-native/>
   [node.js]: <http://nodejs.org>
   [parse]: <http://parseplatform.org/>

## Contributing
1. Fork this repository to your GitHub account
2. Clone the forked repository and cd into it
3. Install react-native globally

5. Install all dependencies by running this command below in your terminal/shell
    ````
    react-native install
    ````
6. Run the command below in your terminal/shell (runs in ios simulator)
    ```` 
    react-native run-ios
    ````
7. Run the command below in your terminal/shell (runs in android simulator)
    ````
    react-native run-android
    ````
    Feel free to join the development
8. Create your feature branch
9. Commit your changes
10. Push to the remote branch
11. Open a Pull Request



