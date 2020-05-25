import { Dimensions, ImageStyle, StyleSheet, PixelRatio, TextStyle, ViewStyle } from "react-native";

const { width, height } = Dimensions.get("window");

const dimensions = width < height ? width : height;

// const guidelineBaseWidth = 400;

let shouldScale = true;

export function scale(size: number, guidelineBaseWidth: number) {
  return PixelRatio.roundToNearestPixel((dimensions / guidelineBaseWidth * size));
}

export default {

  ...StyleSheet,

  create(styles, guidelineBaseWidth, disableScale = []) {

    const newStyles = {};

    for (const key in styles) {
    
      let style: ViewStyle | TextStyle | ImageStyle = styles[key];
      newStyles[key] = { ...style };

      for (const property in style) {
        const value = style[property];
        const name = String(newStyles[key][property]);

        if (typeof value === 'number' && !name.includes("flex") && !disableScale.includes(name) && shouldScale) {
          newStyles[key][property] = scale(value, guidelineBaseWidth);
        }
      }

    }

    return StyleSheet.create(newStyles);

  },

  createNoscaled: StyleSheet.create
  
};
