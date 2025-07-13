import { useTheme } from '@/hooks';
import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text, View } from 'react-native';

type Size = 'sm' | 'md' | 'lg' | 'xs';
type ButtonVariant = 'contained' | 'outlined' | 'text' | 'ghost-primary' | 'outlined-danger';

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: Size;
  className?: string;
  starIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
  textClassName?: string;
}

const variantStyles:any = {
  text: 'text-brand',
  contained: 'bg-orange-100 hover:opacity-60',
  outlined: 'bg-white-100 hover:opacity-50 border border-secondary-500',
  'outlined-danger': 'bg-white-100 hover:opacity-50 border border-red-500',
};

const variantSizes = {
  md: 'py-4 px-5',
  sm: 'py-2.5 px-4',
  lg: 'py-4 px-8',
  xs: 'py-0 px-2 ',
};

const buttonTextClass = {
  text: 'text-brand',
  contained: 'text-black-100 font-semibold',
  outlined: 'text-secondary-500',
  'outlined-danger': 'text-red-500',
  'ghost-primary': 'text-brand',
};

const buttonTextSizes = {
  md: 'text-base',
  sm: 'text-sm',
  lg: 'text-lg',
  xs: 'text-xs',
};

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  children,
  textClassName,
  isLoading,
  disabled,
  starIcon,
  endIcon,
  size = 'md',
  variant = 'contained',
  ...rest
}) => {
  const {
    theme: { colors },
  } = useTheme();
  const disabledClassName = disabled || isLoading ? 'bg-black-50' : '';
  const disabledTextClassName = disabled || isLoading ? 'text-black-100' : '';

  return (
    <Pressable
      className={`flex-row items-center justify-center space-x-2 rounded-full 
      active:opacity-80 
 ${variantSizes[size]} ${variantStyles[variant]} ${className} ${disabledClassName}`}
      disabled={disabled || isLoading}
      {...rest}>
      {starIcon && <View>{starIcon}</View>}
      <Text
        className={`${buttonTextClass[variant]} ${buttonTextSizes[size]} flex-row items-center justify-center text-center font-medium uppercase ${disabledTextClassName} ${textClassName}`}>
        {children}
      </Text>
      {endIcon && <View>{endIcon}</View>}
      {isLoading && (
        <ActivityIndicator
          color={variant === 'contained' ? colors.text : colors.text}
          className="ml-2"
        />
      )}
    </Pressable>
  );
};

export default Button;
