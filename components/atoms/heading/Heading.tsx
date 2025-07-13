import React from 'react';
import { Text, TextProps } from 'react-native';

type Size = 'sm' | 'md' | 'lg';

interface HeadingProps extends TextProps {
  variant?: Size;
  className?: string;
}

const variantStyles = {
  sm: 'text-base font-medium',
  md: 'text-lg font-medium',
  lg: 'text-4xl font-medium ',
};

export const Heading: React.FunctionComponent<HeadingProps> = ({
  variant = 'md',
  className,
  ...rest
}) => {

  console.log('============variantStyles[variant]========================');
  console.log(variantStyles[variant]);
  console.log('====================================');
  return (
    <Text
      className={`
      ${variantStyles[variant]}text-white-100 text-4xl ${className}`}
      {...rest}
    />
  );
};

export default Heading;
