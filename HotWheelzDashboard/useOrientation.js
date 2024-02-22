import { useState, useEffect } from "react";
import {
  Orientation,
  getOrientationAsync,
  addOrientationChangeListener,
} from "expo-screen-orientation";

export default function useOrientation() {
  const [orientation, setOrientation] = useState(0);

  useEffect(() => {
    getOrientationAsync().then((value) => {
      setOrientation(value);
    });

    const subscription = addOrientationChangeListener((event) => {
      setOrientation(event.orientationInfo.orientation);
    });

    return () => {
      subscription.remove;
    };
  }, []);

  return orientation;
}