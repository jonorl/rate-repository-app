import { Picker } from '@react-native-picker/picker';

const SortMenu = ({ onSortChange }:any) => {
  return (
    <Picker
      onValueChange={(itemValue) => onSortChange(itemValue)}
      prompt="Select sorting principle..."
    >
      <Picker.Item label="Latest repositories" value="LATEST" />
      <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
      <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
    </Picker>
  );
};

export default SortMenu