import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Camera, Paperclip, Mic, Bell, Video } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  image?: string;
  isVideoCall?: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi! I'm excited about our upcoming styling session. Can't wait to get some fashion advice!",
    isUser: false,
    timestamp: '14:10',
  },
  {
    id: '2',
    text: "Hi there! I'm thrilled to be working with you too. May 15th is marked in my calendar. Is there anything specific you'd like to focus on during our session?",
    isUser: true,
    timestamp: '14:23',
  },
  {
    id: '3',
    text: "I have several examples of fashionable looks that I like. I want something like this",
    isUser: false,
    timestamp: '14:25',
  },
  {
    id: '4',
    text: "",
    isUser: false,
    timestamp: '14:25',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg',
  },
  {
    id: '5',
    text: "discuss everything in detail in our session. I will also take into account those wardrobe items you already have. See you tomorrow, bye!",
    isUser: true,
    timestamp: '16:10',
  },
  {
    id: '6',
    text: "Thanks, bye!",
    isUser: false,
    timestamp: '16:11',
  },
  {
    id: '7',
    text: "Hello, Maria! Are you ready to start our call?",
    isUser: true,
    timestamp: '09:58',
  },
  {
    id: '8',
    text: "Hello! Yes I'm ready!",
    isUser: false,
    timestamp: '09:58',
  },
  {
    id: '9',
    text: "I'm in great anticipation!",
    isUser: false,
    timestamp: '09:58',
  },
  {
    id: '10',
    text: "",
    isUser: true,
    timestamp: '10:00',
    isVideoCall: true,
  },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = (message: Message) => {
    if (message.isVideoCall) {
      return (
        <View key={message.id} style={styles.videoCallContainer}>
          <View style={styles.videoCallBubble}>
            <Video size={16} color="#FFFFFF" />
            <Text style={styles.videoCallText}>Video Call</Text>
          </View>
          <Text style={styles.messageTime}>{message.timestamp}</Text>
        </View>
      );
    }

    return (
      <View key={message.id} style={styles.messageContainer}>
        <View style={[
          styles.messageBubble,
          message.isUser ? styles.userMessage : styles.otherMessage
        ]}>
          {message.image && (
            <Image source={{ uri: message.image }} style={styles.messageImage} />
          )}
          {message.text && (
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.otherMessageText
            ]}>
              {message.text}
            </Text>
          )}
        </View>
        <Text style={[
          styles.messageTime,
          message.isUser ? styles.userMessageTime : styles.otherMessageTime
        ]}>
          {message.timestamp}
        </Text>
      </View>
    );
  };

  const renderDateSeparator = () => (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateSeparatorText}>TODAY</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Emily Johnson</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>00:01:23</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Bell size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Video size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.slice(0, 6).map(renderMessage)}
          {renderDateSeparator()}
          {messages.slice(6).map(renderMessage)}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color="#666666" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Message"
            placeholderTextColor="#666666"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={20} color="#666666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.micButton} onPress={sendMessage}>
            <Mic size={20} color="#666666" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userMessage: {
    backgroundColor: '#333333',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#FF6B47',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#FFFFFF',
  },
  messageImage: {
    width: 200,
    height: 250,
    borderRadius: 12,
    marginBottom: 8,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginTop: 4,
  },
  userMessageTime: {
    textAlign: 'right',
  },
  otherMessageTime: {
    textAlign: 'left',
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateSeparatorText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  videoCallContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  videoCallBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },
  videoCallText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    gap: 12,
  },
  attachButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    maxHeight: 100,
  },
  cameraButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});