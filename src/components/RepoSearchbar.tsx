import { Searchbar } from 'react-native-paper';

interface RepoSearchbarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const RepoSearchbar = ({ value, onChangeText }: RepoSearchbarProps) => {
  // We removed local state because 'value' and 'onChangeText' come from the parent
  const handleClear = () => {
    onChangeText(''); 
  };

  return (
    <Searchbar
      placeholder="Search repo"
      onChangeText={onChangeText} 
      onClearIconPress={handleClear}
      value={value}
    />
  );
};

export default RepoSearchbar