import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Relationship, TetherCode, TetherContextType, User } from '../types';
import { formatTimeRemaining, generateTetherCode, getRandomPartnerName } from '../utils/helpers';
import { getData, removeData, STORAGE_KEYS, storeData } from '../utils/storage';

const CURRENT_USER: User = {
    id: 'user_123',
    name: 'Alex Chen'
};

const TetherContext = createContext<TetherContextType | undefined>(undefined);

interface TetherProviderProps {
    children: ReactNode;
}

export const TetherProvider: React.FC<TetherProviderProps> = ({ children }) => {
    const [activeCode, setActiveCode] = useState<TetherCode | null>(null);
    const [relationship, setRelationship] = useState<Relationship | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<string>('');

    // Load data from AsyncStorage on mount
    useEffect(() => {
        loadStoredData();
    }, []);

    // Update countdown timer
    useEffect(() => {
        if (!activeCode) {
            setTimeRemaining('');
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            const remaining = activeCode.expiresAt - now;

            if (remaining <= 0) {
                // Code expired
                setActiveCode(null);
                removeData(`${STORAGE_KEYS.TETHER_CODE}_${CURRENT_USER.id}`);
                setTimeRemaining('');
                return;
            }

            setTimeRemaining(formatTimeRemaining(remaining));
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000); // Update every second

        return () => clearInterval(interval);
    }, [activeCode]);

    const loadStoredData = async () => {
        try {
            // Load active code
            const savedCode = await getData(`${STORAGE_KEYS.TETHER_CODE}_${CURRENT_USER.id}`);
            if (savedCode && savedCode.expiresAt > Date.now()) {
                setActiveCode(savedCode);
            } else if (savedCode) {
                // Remove expired code
                await removeData(`${STORAGE_KEYS.TETHER_CODE}_${CURRENT_USER.id}`);
            }

            // Load relationship
            const savedRelationship = await getData(`${STORAGE_KEYS.TETHER_RELATIONSHIP}_${CURRENT_USER.id}`);
            if (savedRelationship) {
                setRelationship(savedRelationship);
            }
        } catch (error) {
            console.error('Error loading stored data:', error);
        }
    };

    const generateCode = async (): Promise<void> => {
        if (relationship) {
            Alert.alert('Error', "You're already in a relationship!");
            return;
        }

        setIsGenerating(true);

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const code = generateTetherCode();
            const now = Date.now();
            const expiresAt = now + (60 * 1000); // 60 seconds for demo (you can change this to 24 hours)

            const newCode: TetherCode = {
                code,
                createdAt: now,
                expiresAt,
                userId: CURRENT_USER.id,
                userName: CURRENT_USER.name
            };

            setActiveCode(newCode);
            await storeData(`${STORAGE_KEYS.TETHER_CODE}_${CURRENT_USER.id}`, newCode);

            Alert.alert('Success', 'Tether code generated! Share it with your connection.');
        } catch (error) {
            console.error('Error generating code:', error);
            Alert.alert('Error', 'Failed to generate code. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const enterCode = async (code: string): Promise<boolean> => {
        if (relationship) {
            Alert.alert('Error', "You're already in a relationship!");
            return false;
        }

        if (!code || code.length !== 8) {
            Alert.alert('Error', 'Please enter a valid 8-character code');
            return false;
        }

        setIsConnecting(true);

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Special case for 00000000 - show failure scenario
            if (code === '00000000') {
                Alert.alert('Connection Failed', 'Sorry, this person is already in a relationship.');
                return false;
            }

            // Generate a random partner name for demo purposes
            const partnerName = getRandomPartnerName();
            const partnerId = `demo_user_${Date.now()}`;

            // Create relationship
            const newRelationship: Relationship = {
                partnerId: partnerId,
                partnerName: partnerName,
                startDate: Date.now()
            };

            // Save relationship to AsyncStorage
            setRelationship(newRelationship);
            await storeData(`${STORAGE_KEYS.TETHER_RELATIONSHIP}_${CURRENT_USER.id}`, newRelationship);

            // Clean up any active codes
            if (activeCode) {
                await removeData(`${STORAGE_KEYS.TETHER_CODE}_${CURRENT_USER.id}`);
                setActiveCode(null);
            }

            Alert.alert('Success', `You're now connected with ${partnerName}!`);
            return true;

        } catch (error) {
            console.error('Error in enterCode:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
            return false;
        } finally {
            setIsConnecting(false);
        }
    };

    const endRelationship = async (): Promise<void> => {
        if (!relationship) return;

        try {
            // Remove relationship from AsyncStorage
            await removeData(`${STORAGE_KEYS.TETHER_RELATIONSHIP}_${CURRENT_USER.id}`);

            Alert.alert('Success', 'Connection ended. Both parties have been notified.');
            setRelationship(null);
        } catch (error) {
            console.error('Error ending relationship:', error);
            Alert.alert('Error', 'Failed to end relationship. Please try again.');
        }
    };

    const contextValue: TetherContextType = {
        // State
        activeCode,
        relationship,
        isGenerating,
        isConnecting,
        timeRemaining,

        // Actions
        generateCode,
        enterCode,
        endRelationship,

        // User
        currentUser: CURRENT_USER,
    };

    return (
        <TetherContext.Provider value={contextValue}>
            {children}
        </TetherContext.Provider>
    );
};

export const useTether = (): TetherContextType => {
    const context = useContext(TetherContext);
    if (context === undefined) {
        throw new Error('useTether must be used within a TetherProvider');
    }
    return context;
};
