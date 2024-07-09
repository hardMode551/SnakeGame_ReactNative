import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle, Image } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { TileData } from '../utils/types';

// const tileImages = {
//   coin_1: require('../images/fruit/fruit_1.png'),
//   coin_2: require('../images/fruit/fruit_2.png'),
//   coin_3: require('../images/fruit/fruit_3.png'),
//   coin_4: require('../images/fruit/fruit_4.png'),
//   coin_5: require('../images/fruit/fruit_5.png'),
//   coin_6: require('../images/fruit/fruit_6.png'),
//   coin_7: require('../images/fruit/fruit_7.png'),
//   coin_8: require('../images/fruit/fruit_8.png')
// };

const tileImages = {
  Cat_1: require('../images/cat/Cat_1.png'),
  Cat_2: require('../images/cat/Cat_2.png'),
  Cat_3: require('../images/cat/Cat_3.png'),
  Cat_4: require('../images/cat/Cat_4.png'),
  Cat_5: require('../images/cat/Cat_5.png'),
  Cat_6: require('../images/cat/Cat_6.png'),
  Cat_7: require('../images/cat/Cat_7.png'),
  Cat_8: require('../images/cat/Cat_8.png')
};

interface TileProps {
  tile: TileData;
  onSwipe: (direction: 'left' | 'right' | 'up' | 'down') => void;
  isSelected: boolean;
}

const Tile: React.FC<TileProps> = ({ tile, onSwipe, isSelected }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }, [tile]);

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent;
    
    if (Math.abs(translationX) > 30 || Math.abs(translationY) > 30) {
      if (Math.abs(translationX) > Math.abs(translationY)) {
        onSwipe(translationX > 0 ? 'right' : 'left');
      } else {
        onSwipe(translationY > 0 ? 'down' : 'up');
      }
    }
  };

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
          source={tileImages[tile.type as keyof typeof tileImages]}
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',

    backgroundColor: 'grey',

    borderRadius: 5,
  },
});

export default Tile;