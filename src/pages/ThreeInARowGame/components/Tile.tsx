import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle, Image, ImageSourcePropType } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { TileData } from '../utils/types';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { ImageSetKey, imageSets } from '../utils/imageSets';

interface TileProps {
  tile: TileData;
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void;
  isSelected: boolean;
}

const Tile: React.FC<TileProps> = ({ tile, onSwipe, isSelected }) => {
  const imageType = useAppSelector((state: RootState) => state.imageSets.currentImageType);
  const imageSrc = imageSets[imageType as ImageSetKey]?.[tile.type];

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }, [tile]);

  const onGestureEvent = React.useCallback((event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent;
    
    if (Math.abs(translationX) > 30 || Math.abs(translationY) > 30) {
      if (Math.abs(translationX) > Math.abs(translationY)) {
        onSwipe(translationX > 0 ? 'right' : 'left');
      } else {
        onSwipe(translationY > 0 ? 'down' : 'up');
      }
    }
  }, [onSwipe]);

  const tileStyle: ViewStyle = {
    borderWidth: isSelected ? 2 : 0,
    borderColor: 'green',
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          styles.tile,
          tileStyle,
          {
            transform: [
              { scale: scaleAnim },
              { translateX },
              { translateY },
            ],
          },
        ]}
      >
        <Image
          source={imageSrc}
          style={styles.image}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    margin: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',

    backgroundColor: 'grey',

    borderRadius: 5,
  },
});

export default React.memo(Tile);