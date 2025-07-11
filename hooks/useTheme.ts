import { ThemeContext } from '@/contexts';
import { useContext } from 'react';

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
