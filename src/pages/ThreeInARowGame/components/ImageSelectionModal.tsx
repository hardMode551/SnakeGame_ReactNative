import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ImageSetKey, imageSets } from '../utils/imageSets';

interface ImageSelectionModalProps {
  isVisible: boolean;
  onSelect: (imageType: ImageSetKey) => void;
  onClose: () => void;
}

const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({ isVisible, onSelect, onClose }) => {
  const imageSetKeys = Object.keys(imageSets) as ImageSetKey[];

  const renderItem = ({ item }: { item: ImageSetKey }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Choose Image Type</Text>
          <FlatList
            data={imageSetKeys}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '50%', // Ограничиваем высоту до 50% экрана
    width: '90%', // Устанавливаем ширину в 80% от ширины экрана
  },
  modalContent: {
    flex: 1,
    width: '100%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 40,
    minWidth: 100,
  },
});

export default ImageSelectionModal;