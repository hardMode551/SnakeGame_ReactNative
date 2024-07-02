import React from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface GemProps {
  imageSource: ImageSourcePropType;
  onPress: () => void;
}

const GemComponent: React.FC<GemProps> = ({ imageSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.gem} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gem: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#525053',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default GemComponent;
