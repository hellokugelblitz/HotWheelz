import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ColorText = ({ percentage, extraText }) => {
  // Function to generate color based on percentage

  percentage = Math.min(100, Math.max(0, percentage));

  const generateColor = (percentage) => {
    const startColor = [255, 0, 0] // Green
    const middleColor = [255, 255, 0]; // Yellow
    const endColor = [0, 255, 0]; // Red

    let color = [];

    if (percentage <= 50) {
      const ratio = percentage / 50;
      for (let i = 0; i < startColor.length; i++) {
        color[i] = Math.round(startColor[i] + ratio * (middleColor[i] - startColor[i]));
      }
    } else {
      const ratio = (percentage - 50) / 50;
      for (let i = 0; i < middleColor.length; i++) {
        color[i] = Math.round(middleColor[i] + ratio * (endColor[i] - middleColor[i]));
      }
    }

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };

  // Calculate color based on percentage
  const textColor = generateColor(percentage);

  return (
    <View style={{flex:0.5, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <View style={{flex: 0.8, flexDirection:'row', backgroundColor: 'gray', width: '100%', padding:0, borderWidth: 2, borderColor: 'black'}}>
            <Text style={{flex:0.15,fontSize:16, position:'absolute', left:'45%', zIndex:1}}>
                {percentage}%
            </Text>
            <View style={{width:percentage + '%', backgroundColor: textColor, height: 20, alignItems: 'center', justifyContent: 'center'}}>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ColorText;
