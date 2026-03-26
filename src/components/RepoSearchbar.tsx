import { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

interface RepoSearchbarProps {
  onDebouncedChange: (text: string) => void;
}

const RepoSearchbar = ({ onDebouncedChange }: RepoSearchbarProps) => {
  const [value, setValue] = useState('');
  const [debounced] = useDebounce(value, 500);

  useEffect(() => {
    onDebouncedChange(debounced);
  }, [debounced]);

  return (
    <Searchbar
      placeholder="Search repo"
      onChangeText={setValue}
      onClearIconPress={() => setValue('')}
      value={value}
    />
  );
};

export default RepoSearchbar;