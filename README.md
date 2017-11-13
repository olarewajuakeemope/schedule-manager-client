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
![Alt home page ios](/screenshots/ios/1-home.png?raw=true "home page ios") |  ![Alt home page android](/screenshots/android/1-home.png?raw=true "home page android")
![Alt Sign up ios](/screenshots/ios/2-signup.png?raw=true "Sign up ios") |  ![Alt Sign up android](/screenshots/android/2-signup.png?raw=true "Sign up android")
![Alt Signin ios](/screenshots/ios/3-signin.png?raw=true "Signin ios") |  ![Alt Signin android](/screenshots/android/3-signin.png?raw=true "Signin android")
![Alt Landing page ios](/screenshots/ios/4-landing.png?raw=true "Landing page ios") |  ![Alt Landing page android](/screenshots/android/4-landing.png?raw=true "Landing page android")
![Alt filter page ios](/screenshots/ios/5-filter.png?raw=true "filter page ios") |  ![Alt filter page android](/screenshots/android/5-filter.png?raw=true "filter page android")
![Alt create form ios](/screenshots/ios/6-create-form.png?raw=true "create form ios") |  ![Alt create form android](/screenshots/android/6-create-form.png?raw=true "create form android")
![Alt calendar form ios](/screenshots/ios/7-calendar-form.png?raw=true "calendar form ios") |  ![Alt calendar form android](/screenshots/android/7-calendar-form.png?raw=true "calendar form android")
![Alt info page ios](/screenshots/ios/8-info.png?raw=true "info page ios") |  ![Alt info page android](/screenshots/android/8-info.png?raw=true "info page android")
![Alt logout page ios](/screenshots/ios/9-logout.png?raw=true "logout page ios") |  ![Alt logout page android](/screenshots/android/9-logout.png?raw=true "logout page android")
![Alt detail page ios](/screenshots/ios/10-detail.png?raw=true "detail page ios") |  ![Alt detail page android](/screenshots/android/10-detail.png?raw=true "detail page android")
![Alt notification page ios](/screenshots/ios/11-notification.png?raw=true "notification page ios") |  ![Alt notification page android](/screenshots/android/11-notification.png?raw=true "notification page android")
![Alt navigation ios](/screenshots/ios/12-navigation.png?raw=true "navigation ios") |  ![Alt navigation android](/screenshots/android/12-navigation.png?raw=true "navigation android")
![Alt private ios](/screenshots/ios/13-private.png?raw=true "private ios") |  ![Alt private android](/screenshots/android/13-private.png?raw=true "private android")


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



