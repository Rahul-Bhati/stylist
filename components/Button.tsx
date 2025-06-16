import { TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native';
import React, { ReactNode } from 'react';
import { cn } from '@/utils/cn'; // Utility to merge classNames (explained below)

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  className?: string;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  textClassName='',
  onPress,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={cn(
        disabled ? 'opacity-50' : '', // Disabled state
        className // Custom styles
      )}
      accessibilityRole="button"
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className={cn(textClassName)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;