import React from 'react';
import { Text, TextProps } from 'react-native';

type Size = 'sm' | 'md' | 'lg' | 'base';

interface ParagraphProps extends TextProps {
  variant?: Size;
  className?: string;
}

const variantStyles = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-4xl',
  base: 'text-base',
};

const Paragraph: React.FunctionComponent<ParagraphProps> = ({
  variant = 'base',
  className,
  ...rest
}) => {
  return <Text className={`${variantStyles[variant]} ${className}`} {...rest} />;
};

export default Paragraph;
