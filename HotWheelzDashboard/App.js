import Speedometer, {
  Needle,
  Marks,
  Background,
  Indicator,
  Progress,
  Arc
} from 'react-native-cool-speedometer';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import ColorText from './components/ColorText';
import * as ScreenOrientation from 'expo-screen-orientation'


// Import your image sources directly
import BPS_OFF from './assets/bps_off.png';
import BPS_ON from './assets/bps_on.png';
import LEFT_ARROW_OFF from './assets/arrows/left_off.png';
import LEFT_ARROW_ON from './assets/arrows/left_on.png';
import RIGHT_ARROW_OFF from './assets/arrows/right_off.png';
import RIGHT_ARROW_ON from './assets/arrows/right_on.png';

// Constants for turn status
const IMAGE_SRC = "./assets/";
const OFF = "off";
const ON = "on";

// Constant for light transition time.
const LIGHT_TRANSITION_TIME = 300;

export default function App() {

  //Screen Orientation
  const [orientationIsLandscape,setOrientation] = useState(false);

  // State for current MPH
  const [currentSpeed, setCurrentSpeed] = useState(34);
  
  //Battery Stats
  const [charge, setCharge] = useState(78); // Battery remaining
  const [oneTemp, setOneTemp] = useState(19); // Degrees F
  const [twoTemp, setTwoTemp] = useState(19); // Degrees F
  const [current, setCurrent] = useState(20); // Amps
  const [power, setPower] = useState(1800); // Watts
  const [voltage, setVoltage] = useState(120); // Volts

  // BPS Indicator
  const [bpsFault, setBpsFault] = useState(OFF); // Use this
  const [bpsFaultState, setBpsFaultState] = useState(bpsFault);
  const bpsSrc = bpsFaultState === OFF ? BPS_OFF : BPS_ON;

  // Left Turn Signal Indicator
  const [leftArrow, setLeftArrow] = useState(OFF); // Use this
  const [leftArrowState, setLeftArrowState] = useState(leftArrow);
  const leftArrowSource = leftArrowState === OFF ? LEFT_ARROW_OFF : LEFT_ARROW_ON;

  // Right Turn Signal Indicator
  const [rightArrow, setRightArrow] = useState(OFF); // Use this
  const [rightArrowState, setRightArrowState] = useState(rightArrow);
  const rightArrowSource = rightArrowState === OFF ? RIGHT_ARROW_OFF : RIGHT_ARROW_ON;

  useEffect(() => {
    const interval = setInterval(() => {
      if (bpsFaultState === ON) {
        setBpsFaultState((prev) => (prev === OFF ? ON : OFF));
      }
      if (rightArrowState === ON) {
        setRightArrowState((prev) => (prev === OFF ? ON : OFF));
      }
      if (leftArrowState === ON) {
        setLeftArrowState((prev) => (prev === OFF ? ON : OFF));
      }
    }, LIGHT_TRANSITION_TIME);
    return () => clearInterval(interval);
  }, []);

  // Screen rotation https://plainenglish.io/blog/how-to-change-a-devices-screen-orientation-using-expo-in-react-native-af69c10032fb
  async function changeScreenOrientation(){
    if(orientationIsLandscape==true){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      console.log("change portrait");
    }
    else if(orientationIsLandscape==false){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      console.log("change portrait");
    }
  }
  const toggleOrientation=()=>{
    setOrientation(!orientationIsLandscape)
    changeScreenOrientation()
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      <View style={styles.top}>
        <Speedometer
          value={currentSpeed}
          max={80}
          angle={160}
          height={160}
          accentColor="orange"
        >
          
          <Background angle={180} />
          <Arc/>
          <Needle color="#FFFFFF"/>
          <Progress/>
          <Marks/> 
        </Speedometer>  
        <Text style={styles.MPH}>
            {currentSpeed} MPH
        </Text>
      </View>

      <View style={styles.middle}>
        <View style={styles.battery_panel}> 
          <View style={{flex:0.5}}>
            <Text style={styles.text_title}>Battery Charge:</Text>
            <ColorText 
              extraText={"Battery Charge:"}
              percentage={charge}>
            </ColorText>
          </View>
          <View style={{flex:1}}>
            <Text style={styles.text_title}>Battery Statistics:</Text>
            <Text style={styles.text_info}>Box One Temp: {oneTemp}°</Text>
            <Text style={styles.text_info}>Box Two Temp: {twoTemp}°</Text>
            <Text style={styles.text_info}>Current: {current} amps</Text>
            <Text style={styles.text_info}>Power: {power} watts</Text>
            <Text style={styles.text_info}>Voltage: {voltage} volts</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <Image
                style={styles.arrow}
                source={leftArrowSource}
                transition={LIGHT_TRANSITION_TIME}
                contentFit="contain"
          />
          <Image
                style={styles.bps}
                source={bpsSrc}
                transition={LIGHT_TRANSITION_TIME}
                contentFit="contain"
          />
          <Image
                style={styles.arrow}
                source={rightArrowSource}
                transition={LIGHT_TRANSITION_TIME}
                contentFit="contain"
          />
      </View>

      <StatusBar style={"dark"} />
    </View>

  );
}

const styles = StyleSheet.create({
  statusbar: {
    backgroundColor: "purple"
  },
  container: {
    flex: 1,
    backgroundColor: '#8c8c8c',
    alignItems: 'center',
    position: 'relative'
    
  },
  top: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    width: '100%',
    // backgroundColor: "purple",
    paddingBottom: 10
  },
  speedometer: {

  },
  MPH: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 0,
    // backgroundColor: "red",
  },
  middle: {
    flex: 1.2,
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
    alignItems: 'center',
    // backgroundColor: "blue"
  },
  battery_panel: {
    backgroundColor: '#d6d6d6',
    width: '90%',
    height: '100%',
    borderRadius: 15,
    padding: 12
  },
  bottom: {
    flex: 0.8,
    flexDirection: "row",
    marginTop: 0,
    justifyContent: 'top',
    // backgroundColor: "green"
  },
  arrow: {
    flex: 1,
    width: '40%',
    padding: 0
  },
  bps: {
    width: '15%',
    padding: 0
  },
  text_title: {
    flex: 0.3,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 0,
    textAlign: 'center'
  },
  text_info: {
    flex: 0.2,
    fontSize: 17,
    marginTop: 0,
    textAlign: 'center'
  }
});
