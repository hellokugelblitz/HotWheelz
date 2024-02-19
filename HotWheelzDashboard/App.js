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
// import * as Svg from 'react-native-svg';

// Constants for turn status
const IMAGE_SRC = "./assets/";
const OFF = "off";
const ON = "on";

// Import your image sources directly
import BPS_OFF from './assets/bps_off.png';
import BPS_ON from './assets/bps_on.png';
import LEFT_ARROW_OFF from './assets/arrows/left_off.png';
import LEFT_ARROW_ON from './assets/arrows/left_on.png';
import RIGHT_ARROW_OFF from './assets/arrows/right_off.png';
import RIGHT_ARROW_ON from './assets/arrows/right_on.png';


const LIGHT_TRANSITION_TIME = 300;

export default function App() {

  // State for current MPH
  const [currentSpeed, setCurrentSpeed] = useState(20);
  
  // BPS Indicator
  const [bpsFault, setBpsFault] = useState(OFF);
  const [bpsFaultState, setBpsFaultState] = useState(bpsFault);
  const bpsSrc = bpsFaultState === OFF ? BPS_OFF : BPS_ON;

  // Left Turn Signal Indicator
  const [leftArrow, setLeftArrow] = useState(OFF);
  const [leftArrowState, setLeftArrowState] = useState(leftArrow);
  const leftArrowSource = leftArrowState === OFF ? LEFT_ARROW_OFF : LEFT_ARROW_ON;

  // Right Turn Signal Indicator
  const [rightArrow, setRightArrow] = useState(ON);
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

  return (
    <View style={styles.container}>
      <View style={styles.speedometer}>
        <Speedometer
          value={currentSpeed}
          max={80}
          angle={160}
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

      <View style={styles.battery}>
        <View style={styles.battery_panel}> 
          <Text>Battery Statistics:</Text>
        </View>
      </View>

      <View style={styles.arrows}>
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
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8c8c8c',
    alignItems: 'center',
    paddingTop: 30,
    position: 'relative'
  },
  speedometer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 0,
    paddingTop: 20,
    padding: 0,
    width: '100%'
  },
  MPH: {
    marginTop: 0,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: -90,
    padding: 0,
    marginBottom: 0
  },
  battery: {
    flex: 0.4,
    width: '100%',
    alignItems: 'center'
  },
  battery_panel: {
    backgroundColor: '#d6d6d6',
    width: '90%',
    height: '100%',
    borderRadius: 15,
    padding: 12
  },
  arrows: {
    flex: 0.2,
    flexDirection: "row",
    marginTop: 0,
    paddingTop: 20
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
});
