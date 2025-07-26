import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Clipboard,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import {
    ArrowBackIcon,
    CheckIcon,
    CopyIcon,
    HeartIcon,
    PeopleIcon,
    TimeIcon
} from '../components/ui/Icon';
import { Input } from '../components/ui/Input';
import { useTether } from '../context/TetherContext';
import { formatDate } from '../utils/helpers';

interface TetherAppProps {
    onBack?: () => void;
}

export const TetherApp: React.FC<TetherAppProps> = ({ onBack }) => {
    const {
        activeCode,
        relationship,
        isGenerating,
        isConnecting,
        timeRemaining,
        generateCode,
        enterCode,
        endRelationship,
        currentUser,
    } = useTether();

    const [enteredCode, setEnteredCode] = useState('');
    const [copied, setCopied] = useState(false);

    const handleEnterCode = async () => {
        const success = await enterCode(enteredCode.toUpperCase());
        if (success) {
            setEnteredCode('');
        }
    };

    const handleCopyCode = async () => {
        if (!activeCode) return;

        try {
            await Clipboard.setString(activeCode.code);
            setCopied(true);
            Alert.alert('Success', 'Code copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            Alert.alert('Error', 'Failed to copy code');
        }
    };

    const handleEndRelationship = () => {
        if (!relationship) return;

        Alert.alert(
            'End Connection',
            `Are you sure you want to end your connection with ${relationship.partnerName}? Both parties will be notified and you'll both be able to generate new codes.`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'End Connection',
                    style: 'destructive',
                    onPress: endRelationship,
                },
            ]
        );
    };

    return (
        <LinearGradient
            colors={['#FDF2F8', '#F3E8FF', '#EDE9FE']}
            style={styles.container}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#FDF2F8" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    {onBack && (
                        <TouchableOpacity onPress={onBack} style={styles.backButton}>
                            <ArrowBackIcon size={20} color="#6B7280" />
                        </TouchableOpacity>
                    )}
                    <View style={styles.headerTitle}>
                        <Text style={styles.titleText}>Tether</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>

                    {/* Relationship Status */}
                    {relationship ? (
                        <Card style={styles.relationshipCard}>
                            <CardContent style={styles.relationshipContent}>
                                <View style={styles.relationshipContent}>
                                    <View style={styles.relationshipIcon}>
                                        <HeartIcon size={32} color="#FFFFFF" />
                                    </View>

                                    <Text style={styles.relationshipTitle}>In a Relationship</Text>
                                    <Text style={styles.relationshipDescription}>
                                        You're in a relationship with{' '}
                                        <Text style={styles.partnerName}>{relationship.partnerName}</Text>{' '}
                                        since {formatDate(relationship.startDate)}.
                                    </Text>

                                    <Button
                                        title="End Relationship"
                                        onPress={handleEndRelationship}
                                        variant="danger"
                                        style={styles.endButton}
                                    />
                                </View>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {/* Generate Code Section */}
                            <Card style={styles.card}>
                                <CardContent>
                                    <View style={styles.sectionContent}>
                                        <View style={styles.sectionIcon}>
                                            <PeopleIcon size={24} color="#FFFFFF" />
                                            {/* <HeartIcon size={24} color="#FFFFFF" /> */}
                                        </View>
                                        <Text style={styles.sectionTitle}>Generate Your Code</Text>
                                        <Text style={styles.sectionDescription}>
                                            Create a unique code for someone special to enter
                                        </Text>
                                    </View>

                                    {activeCode ? (
                                        <View style={styles.codeSection}>
                                            <View style={styles.codeDisplay}>
                                                <View style={styles.codeRow}>
                                                    <Text style={styles.codeText}>{activeCode.code}</Text>
                                                    <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
                                                        {copied ? (
                                                            <CheckIcon size={20} color="#10B981" />
                                                        ) : (
                                                            <CopyIcon size={20} color="#6B7280" />
                                                        )}
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={styles.timerRow}>
                                                    <TimeIcon size={16} color="#6B7280" />
                                                    <Text style={styles.timerText}>{timeRemaining}</Text>
                                                </View>
                                            </View>

                                            <Button
                                                title="Generate New Code"
                                                onPress={generateCode}
                                                loading={isGenerating}
                                                variant="primary"
                                                style={styles.generateButton}
                                            />
                                        </View>
                                    ) : (
                                        <Button
                                            title="Generate Code"
                                            onPress={generateCode}
                                            loading={isGenerating}
                                            variant="primary"
                                            style={styles.generateButton}
                                        />
                                    )}
                                </CardContent>
                            </Card>

                            {/* Enter Code Section */}
                            <Card style={styles.card}>
                                <CardContent>
                                    <View style={styles.sectionContent}>
                                        <View style={[styles.sectionIcon, styles.purpleIcon]}>
                                            <HeartIcon size={24} color="#FFFFFF" />
                                            {/* <PeopleIcon size={24} color="#FFFFFF" /> */}
                                        </View>
                                        <Text style={styles.sectionTitle}>Enter a Code</Text>
                                        <Text style={styles.sectionDescription}>
                                            Enter someone's code to establish a connection
                                        </Text>
                                    </View>

                                    <View style={styles.enterCodeSection}>
                                        <Input
                                            label="Tether Code"
                                            value={enteredCode}
                                            onChangeText={(text) => setEnteredCode(text.toUpperCase())}
                                            placeholder="Enter 8-character code"
                                            maxLength={8}
                                            autoCapitalize="characters"
                                            style={styles.codeInput}
                                            editable={!isConnecting}
                                        />

                                        <Button
                                            title="Enter Code"
                                            onPress={handleEnterCode}
                                            loading={isConnecting}
                                            disabled={enteredCode.length !== 8}
                                            variant="primary"
                                            style={StyleSheet.flatten([styles.generateButton, styles.purpleButton])}
                                        />
                                    </View>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Info Section */}
                    <Card style={StyleSheet.flatten([styles.card, styles.infoCard])}>
                        <CardContent>
                            <View style={styles.infoHeader}>
                                <HeartIcon size={16} color="#EC4899" />
                                <Text style={styles.infoTitle}>How Tether Works</Text>
                            </View>

                            <View style={styles.infoList}>
                                <Text style={styles.infoItem}>• Create time-bound codes for secure pairing</Text>
                                <Text style={styles.infoItem}>• Share codes with trusted connections</Text>
                                <Text style={styles.infoItem}>• Maintain exclusive partnerships</Text>
                            </View>
                        </CardContent>
                    </Card>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(236, 72, 153, 0.1)',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
        gap: 20,
    },

    // Relationship Card
    relationshipCard: {
        backgroundColor: '#FEF7FF',
        borderColor: '#F3E8FF',
    },
    relationshipContent: {
        alignItems: 'center',
        gap: 16,
    },
    relationshipIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#8B5CF6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    relationshipTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
    },
    relationshipDescription: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
    },
    partnerName: {
        fontWeight: '600',
        color: '#EC4899',
    },
    endButton: {
        marginTop: 8,
    },

    // Cards
    card: {
        marginBottom: 16,
    },
    sectionContent: {
        alignItems: 'center',
        marginBottom: 20,
        gap: 8,
    },
    sectionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EC4899',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    purpleIcon: {
        backgroundColor: '#8B5CF6',
    },
    sectionTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    sectionDescription: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },

    // Code Section
    codeSection: {
        gap: 16,
    },
    codeDisplay: {
        backgroundColor: '#F3E8FF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        gap: 8,
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    codeText: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'monospace',
        color: '#1F2937',
        letterSpacing: 2,
    },
    copyButton: {
        padding: 4,
    },
    timerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timerText: {
        fontSize: 14,
        color: '#6B7280',
    },

    // Enter Code Section
    enterCodeSection: {
        gap: 16,
    },
    codeInput: {
        textAlign: 'center',
        // fontFamily: '',
        fontSize: 18,
        // letterSpacing: 2,
    },

    // Buttons
    generateButton: {
        marginTop: 4,
    },
    purpleButton: {
        backgroundColor: '#8B5CF6',
    },

    // Info Card
    infoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: '#E0E7FF',
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    infoList: {
        gap: 8,
    },
    infoItem: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
});
