# TetherApp - React Native Implementation

A React Native app built with Expo that allows users to create time-bound connection codes and establish exclusive relationships.

## 🚀 Features

- **Generate Tether Codes**: Create 8-character alphanumeric codes with countdown timers
- **Enter Codes**: Connect with others by entering their codes
- **Relationship Management**: View connection status and end relationships
- **Persistent Storage**: Data persists across app restarts using AsyncStorage
- **Real-time Updates**: Live countdown timers and status updates

## 📱 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **AsyncStorage** for persistent data
- **Context API** for state management
- **Expo Linear Gradient** for beautiful UI
- **React Navigation** (via Expo Router)

## 🏗️ Project Structure

```
src/
├── components/
│   └── ui/           # Reusable UI components (Button, Card, Input, Icon)
├── screens/          # Screen components
│   └── TetherScreen.tsx
├── context/          # React Context for state management
│   └── TetherContext.tsx
├── utils/            # Utility functions
│   ├── storage.ts    # AsyncStorage helpers
│   └── helpers.ts    # Code generation, validation, formatting
├── types/            # TypeScript interfaces
│   └── index.ts
└── index.ts          # Main exports
```

## 🔧 Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on Android:
```bash
npm run android
```

## 🎯 Core Functionality

### Code Generation
- Generates random 8-character alphanumeric codes
- Codes expire after 60 seconds (configurable)
- Real-time countdown display
- Copy-to-clipboard functionality

### Code Entry
- Input validation for 8-character codes
- Special handling for demo scenarios
- Automatic relationship creation upon successful connection

### Relationship Management
- View active relationship status
- Partner information display
- Confirmation dialog for ending relationships
- Automatic cleanup of codes when in a relationship

### Persistent Storage
- Active codes stored with expiration times
- Relationship data persists across sessions
- Automatic cleanup of expired data

## 🎨 UI/UX Features

- **Gradient Backgrounds**: Beautiful purple/pink gradients
- **Responsive Design**: Works on various screen sizes
- **Loading States**: Visual feedback during async operations
- **Error Handling**: User-friendly error messages
- **Accessibility**: Proper contrast and touch targets

## 🔄 State Management

The app uses React Context (`TetherContext`) to manage:
- Active tether codes
- Relationship status
- Loading states
- User information

## 📦 Key Components

### TetherProvider
Context provider that wraps the app and provides state management.

### TetherScreen
Main screen component with all the UI and functionality.

### UI Components
- `Button`: Customizable button with variants and loading states
- `Card`: Container component with shadow and styling
- `Input`: Text input with label and error handling
- `Icon`: Wrapper for Expo vector icons

## 🚦 Usage Flow

1. **Generate Code**: User taps "Generate Code" to create a shareable code
2. **Share Code**: User shares the 8-character code with someone
3. **Enter Code**: Other user enters the code to establish connection
4. **Relationship**: Both users now see connected status
5. **End Relationship**: Either user can end the connection

## ⚙️ Configuration

### Timer Duration
Change code expiration time in `TetherContext.tsx`:
```typescript
const expiresAt = now + (60 * 1000); // 60 seconds
// Change to: now + (24 * 60 * 60 * 1000) for 24 hours
```

### Mock User
Update user information in `TetherContext.tsx`:
```typescript
const CURRENT_USER: User = {
  id: 'user_123',
  name: 'Alex Chen'
};
```

## 🔮 Future Enhancements

- Real backend integration
- User authentication
- Push notifications
- Advanced relationship features
- Social features
- Multiple connection types

---

Built with ❤️ using React Native and Expo
