import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Send,
  Loader2,
} from 'lucide-react';

type Message = {
  id: number;
  role: 'user' | 'agent';
  text: string;
};

type SpeechRecognitionEvent = {
  results: {
    length: number;
    [index: number]: {
      length: number;
      isFinal: boolean;
      [index: number]: { transcript: string };
    };
  };
  resultIndex: number;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onstart: (() => void) | null;
};

declare global {
  interface Window {
    SpeechRecognition?: { new (): SpeechRecognitionInstance };
    webkitSpeechRecognition?: { new (): SpeechRecognitionInstance };
  }
}

const AGENT_RESPONSES: Record<string, string> = {
  default: "Hi! I'm Aria, your AI assistant. Ask me about our AI chatbots, workflow automation, or data analysis services.",
  services: "I offer three services: AI Chatbots for 24/7 customer support, Workflow Automation to eliminate repetitive tasks, and AI Data Analysis for actionable insights. Which interests you?",
  pricing: "I'm currently taking the first three small-business projects at a starter rate. Reach out through the contact form for details!",
  demo: "I'd love to set up a demo! Scroll down to the contact section and fill out the form, or email hibathakur559@gmail.com directly.",
  contact: "You can email hibathakur559@gmail.com, message on WhatsApp at 03111323512, or use the contact form on this page. I respond within 24 hours!",
  hello: "Hello! Welcome to NexAI. I'm here to answer your questions about our AI services. What would you like to know?",
  thanks: "You're welcome! I'm always here if you need more info. Anything else I can help with?",
  ack: "Great! Let me know if you'd like to book a demo or have any questions about our AI services.",
  yes: "Awesome! You can book a demo by scrolling down to the contact form, or I can tell you more about our services. What would you prefer?",
  no: "No problem! I'm here whenever you need me. Feel free to ask about our AI chatbots, automation, or data analysis anytime.",
};

const ACKNOWLEDGMENTS = [
  'alright', 'okay', 'ok', 'got it', 'gotcha', 'understood', 'sure',
  'sounds good', 'makes sense', 'i see', 'right', 'cool', 'nice',
  'great', 'perfect', 'will do', 'roger', 'k', 'kk', 'fine',
];

const THANKS = ['thank', 'thanks', 'thank you', 'thx', 'appreciate', 'cheers', 'ty'];

const GREETINGS = ['hello', 'hey', 'hi ', 'hi!', 'hi,', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'];

function isOnlyWord(input: string, word: string): boolean {
  return input.trim() === word;
}

function getAgentResponse(input: string): string {
  const text = input.toLowerCase().trim();
  const words = text.replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);

  // Check greetings first — but only if it's actually a greeting, not a casual ack
  for (const g of GREETINGS) {
    if (text === g.trim() || text.startsWith(g + ' ') || text.startsWith(g + '!') || text.startsWith(g + ',')) {
      return AGENT_RESPONSES.hello;
    }
  }

  // Acknowledgments — short casual inputs that should NOT loop back to greeting
  if (words.length <= 3) {
    for (const ack of ACKNOWLEDGMENTS) {
      if (words.includes(ack)) return AGENT_RESPONSES.ack;
    }
    for (const t of THANKS) {
      if (words.includes(t)) return AGENT_RESPONSES.thanks;
    }
    if (words.includes('yes') || words.includes('yeah') || words.includes('yep') || words.includes('sure') || words.includes('please')) {
      return AGENT_RESPONSES.yes;
    }
    if (words.includes('no') || words.includes('nope') || words.includes('nah')) {
      return AGENT_RESPONSES.no;
    }
  }

  // Service-related keywords
  if (text.includes('service') || text.includes('what do you do') || text.includes('offer') || text.includes('help with') || text.includes('what can you do')) return AGENT_RESPONSES.services;
  if (text.includes('price') || text.includes('cost') || text.includes('plan') || text.includes('pricing') || text.includes('rate') || text.includes('how much')) return AGENT_RESPONSES.pricing;
  if (text.includes('demo') || text.includes('trial') || text.includes('try') || text.includes('book') || text.includes('schedule') || text.includes('meeting')) return AGENT_RESPONSES.demo;
  if (text.includes('contact') || text.includes('reach') || text.includes('email') || text.includes('phone') || text.includes('whatsapp') || text.includes('get in touch')) return AGENT_RESPONSES.contact;

  // Longer thanks buried in a sentence
  for (const t of THANKS) {
    if (text.includes(t)) return AGENT_RESPONSES.thanks;
  }

  // Default — but only for genuinely unrecognized questions, not casual acks
  return AGENT_RESPONSES.default;
}

export default function AvatarWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'agent', text: AGENT_RESPONSES.default },
  ]);
  const [inputText, setInputText] = useState('');
  const [interimText, setInterimText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageIdRef = useRef(1);
  const speakTimerRef = useRef<number | null>(null);

  const speak = useCallback(
    (text: string) => {
      if (isMuted || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1.05;
      utterance.volume = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [isMuted]
  );

  const addMessage = useCallback(
    (role: 'user' | 'agent', text: string, speakIt = false) => {
      const id = messageIdRef.current++;
      setMessages((prev) => [...prev, { id, role, text }]);
      if (speakIt) speak(text);
    },
    [speak]
  );

  const handleUserMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      addMessage('user', text);
      setInputText('');
      setIsThinking(true);

      const response = getAgentResponse(text);
      const delay = 600 + Math.random() * 600;
      speakTimerRef.current = window.setTimeout(() => {
        setIsThinking(false);
        addMessage('agent', response, true);
      }, delay);
    },
    [addMessage]
  );

  const initRecognition = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalText = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      if (interim) setInterimText(interim);
      if (finalText) {
        setInterimText('');
        handleUserMessage(finalText);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimText('');
    };

    recognition.onerror = (event: { error: string }) => {
      setIsListening(false);
      setInterimText('');
      if (event.error === 'not-allowed') {
        addMessage('agent', "I couldn't access your microphone. You can still type to chat with me!", true);
      }
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    return recognition;
  }, [handleUserMessage, addMessage]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        recognitionRef.current = initRecognition();
      }
      if (!recognitionRef.current) {
        addMessage('agent', "Speech recognition isn't supported in this browser, but you can still type to me!", true);
        return;
      }
      try {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        recognitionRef.current.start();
      } catch {
        // already started
      }
    }
  }, [isListening, initRecognition, addMessage]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (newMuted) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      return newMuted;
    });
  }, []);

  const handleSendText = () => {
    if (inputText.trim()) {
      handleUserMessage(inputText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimText, isThinking]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => speak(AGENT_RESPONSES.default), 400);
    }
  }, [isOpen, hasGreeted, speak]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
      if (speakTimerRef.current) clearTimeout(speakTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 group flex items-center gap-2.5 rounded-full bg-brand-500 px-4 py-3 shadow-2xl shadow-brand-500/40 hover:bg-brand-400 transition-all duration-300 hover:scale-105 animate-bounce-in"
          aria-label="Open AI assistant"
        >
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-brand-400 animate-pulse-ring" />
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-white font-semibold text-xs pr-0.5 hidden sm:block">
            Chat with Aria
          </span>
        </button>
      )}

      {/* Chat panel — solid background, compact */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-80 max-w-[22rem] animate-scale-in">
          <div
            className="rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[26rem] max-h-[calc(100vh-2.5rem)] border border-white/10"
            style={{ backgroundColor: '#131d2a' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-white/10"
              style={{ backgroundColor: '#0f172a' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 flex items-center justify-center ${isSpeaking ? 'animate-float' : ''}`}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2" style={{ borderColor: '#0f172a' }} />
                </div>
                <div>
                  <p className="text-white font-display font-semibold text-sm leading-tight">Aria</p>
                  <p className="text-ink-300 text-[11px] leading-tight">
                    {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : isThinking ? 'Thinking...' : 'AI Assistant'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMute}
                  className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-ink-300 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-ink-300 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 space-y-2.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed break-words ${
                      msg.role === 'user'
                        ? 'bg-brand-500 text-white rounded-br-md'
                        : 'text-ink-100 rounded-bl-md border border-white/10'
                    }`}
                    style={msg.role === 'agent' ? { backgroundColor: '#1e293b' } : {}}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Interim speech text */}
              {interimText && (
                <div className="flex justify-end animate-fade-in">
                  <div className="max-w-[85%] rounded-2xl px-3 py-2 text-[13px] bg-brand-500/40 text-white/70 rounded-br-md italic break-words">
                    {interimText}
                  </div>
                </div>
              )}

              {/* Thinking indicator */}
              {isThinking && (
                <div className="flex justify-start animate-fade-in">
                  <div className="rounded-2xl rounded-bl-md px-3 py-2.5 flex items-center gap-1.5 border border-white/10" style={{ backgroundColor: '#1e293b' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Voice waveform when listening */}
            {isListening && (
              <div className="px-3 py-1.5 flex items-center justify-center gap-0.5 bg-brand-500/10 border-t border-white/5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className="wave-bar w-0.5 rounded-full bg-brand-400"
                    style={{
                      height: '16px',
                      animationDelay: `${i * 80}ms`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Input area */}
            <div className="px-3 py-2.5 border-t border-white/10" style={{ backgroundColor: '#0f172a' }}>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleListening}
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? 'bg-accent-500 hover:bg-accent-400 animate-pulse'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  aria-label={isListening ? 'Stop listening' : 'Start listening'}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-white" />
                  )}
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? 'Listening...' : 'Type or speak...'}
                  disabled={isListening}
                  className="flex-1 min-w-0 bg-white/5 text-white text-[13px] rounded-full px-3 py-2 placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-brand-400/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSendText}
                  disabled={!inputText.trim() || isListening}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-500 hover:bg-brand-400 disabled:opacity-30 disabled:hover:bg-brand-500 flex items-center justify-center transition-all duration-300"
                  aria-label="Send message"
                >
                  {isThinking ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
