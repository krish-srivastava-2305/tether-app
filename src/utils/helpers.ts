/**
 * Utility functions for code generation and validation
 */

/**
 * Generate a random 8-character alphanumeric code
 */
export const generateTetherCode = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

/**
 * Validate if a code is properly formatted (8 alphanumeric characters)
 */
export const validateTetherCode = (code: string): boolean => {
    const codeRegex = /^[A-Z0-9]{8}$/;
    return codeRegex.test(code);
};

/**
 * Format time remaining from milliseconds to readable string
 */
export const formatTimeRemaining = (milliseconds: number): string => {
    if (milliseconds <= 0) return '0s remaining';

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m remaining`;
    } else if (minutes > 0) {
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s remaining`;
    } else {
        return `${seconds}s remaining`;
    }
};

/**
 * Format date timestamp to readable string
 */
export const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Get random partner name for demo purposes
 */
export const getRandomPartnerName = (): string => {
    const partnerNames = [
        'Taylor Swift', 'Emma Watson', 'Ryan Gosling', 'Zendaya',
        'Michael Jordan', 'Ariana Grande', 'Leonardo DiCaprio', 'Billie Eilish',
        'Chris Evans', 'Margot Robbie', 'The Weeknd', 'Dua Lipa',
        'John Doe', 'Jane Smith', 'Alex Johnson', 'Sam Wilson',
        'Casey Brown', 'Jordan Lee', 'Taylor Davis', 'Morgan White'
    ];

    return partnerNames[Math.floor(Math.random() * partnerNames.length)];
};
