import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  position: 'BL' | 'BR';
  title: string;
  onPress: () => void;
}

export const Fab: React.FC<Props> = ({ onPress, position, title }) => {
  const android = () => (
    <View style={styles[`fabLocation${position}`]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#28425B', false, 30)}
        onPress={onPress}>
        <View style={styles.fab}>
          <Text style={styles.fabText}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
  const ios = () => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles[`fabLocation${position}`]}
      onPress={onPress}>
      <View style={styles.fab}>
        <Text style={styles.fabText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return Platform.OS === 'ios' ? ios() : android();
};

const generalStyles = StyleSheet.create({
  fabLocationB: {
    position: 'absolute',
    bottom: 50,
  },
});

const styles = StyleSheet.create({
  fabLocationBR: {
    ...generalStyles.fabLocationB,
    right: 40,
  },
  fabLocationBL: {
    ...generalStyles.fabLocationB,
    left: 40,
  },
  fab: {
    backgroundColor: '#5856D6',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
