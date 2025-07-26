/**
 * TypeScript interfaces for the TetherApp
 */

export interface TetherCode {
    code: string;
    createdAt: number;
    expiresAt: number;
    userId: string;
    userName: string;
}

export interface Relationship {
    partnerId: string;
    partnerName: string;
    startDate: number;
}

export interface User {
    id: string;
    name: string;
}

export interface TetherContextType {
    // State
    activeCode: TetherCode | null;
    relationship: Relationship | null;
    isGenerating: boolean;
    isConnecting: boolean;
    timeRemaining: string;

    // Actions
    generateCode: () => Promise<void>;
    enterCode: (code: string) => Promise<boolean>;
    endRelationship: () => Promise<void>;

    // User
    currentUser: User;
}
