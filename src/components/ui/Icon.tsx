import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface IconProps {
    name: keyof typeof Ionicons.glyphMap;
    size?: number;
    color?: string;
    style?: any;
}

export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color = '#000000',
    style
}) => {
    return (
        <Ionicons
            name={name}
            size={size}
            color={color}
            style={style}
        />
    );
};

// Predefined icon components for common use cases
export const HeartIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
    <Icon name="heart" {...props} />
);

export const PeopleIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
    <Icon name="people" {...props} />
);

export const TimeIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
    <Icon name="time-outline" {...props} />
);

export const CopyIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
    <Icon name="copy-outline" {...props} />
);

export const CheckIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
    <Icon name="checkmark" {...props} />
);

export const CloseIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
    <Icon name="close" {...props} />
);

export const ArrowBackIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
    <Icon name="arrow-back" {...props} />
);
