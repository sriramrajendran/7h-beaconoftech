# Building Real-Time LLM Based Chatbots with WebSockets

> *"Real-time communication is the heartbeat of modern applications."*  
> *Master WebSocket architecture to build responsive, interactive chatbot experiences.*

---

**Published:** January 2026  
**Reading Time:** 60 minutes  
**Category:** Full Stack Development  
**Tags:** #WebSockets #React #FastAPI #Python #LLM #LangGraph #OpenTelemetry #RealTime #Chatbots

---

## Overview

WebSockets provide full-duplex communication channels perfect for real-time chat applications. Unlike HTTP's request-response cycle, WebSockets maintain persistent connections enabling instant bidirectional messaging. After building several production chat systems, I've learned the patterns that work and the pitfalls to avoid. This playbook covers building production-ready chatbots with React UI, Python FastAPI backend, and advanced LLM orchestration using LangGraph.

### 🎯 Advanced Chatbot Architecture Overview

![Advanced Chatbot Architecture](/assets/images/advanced-chatbot-architecture.svg)

**Architecture Components:**
- **React Frontend**: Real-time chat interface with WebSocket client
- **FastAPI Backend**: Python-based WebSocket server with async support
- **LangGraph Orchestrator**: Main agent with state management and workflow control
- **Specialized Agents**: Multiple agents for customer data, orders, support, and analytics
- **Guard Rails**: Content filtering, PII detection, and rate limiting
- **Runtime Evals**: Response quality, hallucination checks, and safety scoring
- **Build Time Evals**: Model testing, prompt validation, and benchmark tests
- **OpenTelemetry**: Tracing, metrics, and observability
- **Customer Data APIs**: CRM, order management, and support ticket integrations
- **LLM Models**: GPT-4 Turbo, Claude 3.5, and custom models
- **Monitoring Stack**: Prometheus, Grafana, and Jaeger for observability

---

## WebSocket Architecture

Understanding WebSocket architecture is crucial before diving into implementation. The key difference from HTTP is that WebSockets maintain persistent connections, which changes everything about how you design your application.

### WebSocket vs HTTP

HTTP follows a request-response pattern where each interaction is stateless. The client makes a request, the server responds, and the connection closes. This works well for REST APIs and file serving, but it's inefficient for real-time communication.

WebSockets, on the other hand, establish a persistent connection that stays open for bidirectional communication. The initial handshake uses HTTP, but once established, it switches to the WebSocket protocol. This means much lower latency for ongoing communication since you don't have the overhead of HTTP headers for each message.

The direction of communication is another key difference. HTTP only allows client-to-server requests, while WebSockets support bidirectional messaging. This is essential for chat applications where the server needs to push messages to clients.

In terms of overhead, HTTP includes headers with every request, while WebSockets have minimal overhead after the initial handshake. This makes WebSockets much more efficient for high-frequency messaging.

### WebSocket Handshake Process

The WebSocket connection starts with an HTTP Upgrade request. The client sends a special request asking to upgrade from HTTP to WebSocket. If the server supports WebSockets, it responds with a 101 Switching Protocols status code.

Once the handshake is complete, the persistent WebSocket connection is established and bidirectional messaging begins. The connection can send text messages (JSON, plain text), binary messages (files, images), and control frames (ping/pong, close).

### Key Architecture Components

On the client side, you need a WebSocket client using either the browser's native WebSocket API or Socket.IO client. You'll also need a message queue to handle incoming and outgoing messages, UI components for the chat interface and typing indicators, and state management for connection status and message history.

The server side requires a WebSocket server using Socket.IO or native WebSocket server. You'll need a connection manager to track active connections, a message router to direct messages to appropriate handlers, and AI integration for LLM services that generate bot responses.

---

## FastAPI WebSocket Server Implementation

### Dependencies and Setup

For our Python-based WebSocket server, we'll use FastAPI with WebSockets support. This gives us async performance, type safety, and excellent documentation generation.

```bash
# Install required packages
pip install fastapi uvicorn websockets python-multipart
pip install langchain langgraph openai anthropic
pip install opentelemetry-api opentelemetry-sdk
pip install opentelemetry-instrumentation-fastapi
pip install prometheus-client
```

### FastAPI WebSocket Server

Here's the core FastAPI WebSocket server implementation with async support and proper error handling:

<details>
<summary>🔍 View FastAPI WebSocket Server</summary>

```python
# FastAPI WebSocket Server
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Set
import json
import asyncio
from contextlib import asynccontextmanager

# LangGraph imports
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage
from typing_extensions import TypedDict

# OpenTelemetry imports
from opentelemetry import trace
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# State definition for LangGraph
class ConversationState(TypedDict):
    messages: list
    user_id: str
    room_id: str
    context: dict
    metadata: dict

# Initialize FastAPI with lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    app.state.active_connections: Dict[str, WebSocket] = {}
    app.state.rooms: Dict[str, Set[str]] = {}
    app.state.langgraph_app = create_langgraph_app()
    yield
    # Shutdown
    pass

app = FastAPI(
    title="Advanced Chatbot API",
    description="Real-time chatbot with LangGraph orchestration",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenTelemetry setup
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

jaeger_exporter = JaegerExporter(
    agent_host_name="localhost",
    agent_port=6831,
)

span_processor = BatchSpanProcessor(jaeger_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

# WebSocket endpoint
@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    
    # Add connection
    connection_id = f"{room_id}_{id(websocket)}"
    app.state.active_connections[connection_id] = websocket
    
    if room_id not in app.state.rooms:
        app.state.rooms[room_id] = set()
    app.state.rooms[room_id].add(connection_id)
    
    with tracer.start_as_current_span("websocket_connection") as span:
        span.set_attribute("room_id", room_id)
        span.set_attribute("connection_id", connection_id)
        
        try:
            while True:
                # Receive message
                data = await websocket.receive_text()
                message_data = json.loads(data)
                
                # Process message through LangGraph
                response = await process_message(
                    message_data, 
                    room_id, 
                    connection_id,
                    app.state.langgraph_app
                )
                
                # Broadcast to room
                await broadcast_to_room(room_id, response, connection_id)
                
        except WebSocketDisconnect:
            # Cleanup
            if connection_id in app.state.active_connections:
                del app.state.active_connections[connection_id]
            if room_id in app.state.rooms:
                app.state.rooms[room_id].discard(connection_id)
                if not app.state.rooms[room_id]:
                    del app.state.rooms[room_id]

async def process_message(message_data: dict, room_id: str, connection_id: str, langgraph_app):
    """Process message through LangGraph with guard rails and evaluation"""
    with tracer.start_as_current_span("process_message") as span:
        span.set_attribute("room_id", room_id)
        span.set_attribute("message_type", message_data.get("type"))
        
        # Guard rails check
        guard_result = await apply_guard_rails(message_data.get("content", ""))
        if not guard_result["allowed"]:
            return {
                "type": "error",
                "content": "Message blocked by safety filters",
                "reason": guard_result["reason"]
            }
        
        # Process through LangGraph
        state = ConversationState(
            messages=[HumanMessage(content=message_data.get("content"))],
            user_id=connection_id,
            room_id=room_id,
            context={},
            metadata=message_data.get("metadata", {})
        )
        
        result = await langgraph_app.ainvoke(state)
        
        # Runtime evaluation
        eval_result = await evaluate_response(result["messages"][-1])
        
        return {
            "type": "ai_response",
            "content": result["messages"][-1].content,
            "evaluation": eval_result,
            "metadata": result.get("metadata", {})
        }

async def broadcast_to_room(room_id: str, message: dict, exclude_connection: str = None):
    """Broadcast message to all connections in room"""
    if room_id not in app.state.rooms:
        return
    
    message_str = json.dumps(message)
    tasks = []
    
    for connection_id in app.state.rooms[room_id]:
        if connection_id != exclude_connection:
            websocket = app.state.active_connections.get(connection_id)
            if websocket:
                tasks.append(websocket.send_text(message_str))
    
    if tasks:
        await asyncio.gather(*tasks, return_exceptions=True)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "active_connections": len(app.state.active_connections),
        "active_rooms": len(app.state.rooms)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

**Key Points:**
- Async FastAPI with WebSocket support for high performance
- Connection and room management with proper cleanup
- OpenTelemetry tracing for observability
- Health check endpoint for monitoring
- Type-safe message processing with error handling

</details>
    socket.on('typing_start', (roomId) => {
        socket.to(roomId).emit('user_typing', { userId: socket.id });
    });
    
    socket.on('typing_stop', (roomId) => {
        socket.to(roomId).emit('user_stop_typing', { userId: socket.id });
    });
    
    socket.on('disconnect', () => {
        connections.delete(socket.id);
        
        // Remove from all rooms
        for (const [roomId, users] of rooms.entries()) {
            if (users.has(socket.id)) {
                users.delete(socket.id);
                socket.to(roomId).emit('user_left', { userId: socket.id });
                
                // Clean up empty rooms
                if (users.size === 0) {
                    rooms.delete(roomId);
                }
            }
        }
        
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
});
```

**Key Points:**
- Real-time bidirectional communication
- Room-based messaging system
- Connection and session management
- AI integration for intelligent responses
- Proper cleanup on disconnect
- CORS configuration for cross-origin requests

</details>

### LLM Integration Setup

Adding AI capabilities to your chatbot is what makes it truly intelligent. Here's how I integrate OpenAI's API with proper context management:

<details>
<summary>🔍 View LLM Integration Code</summary>

```javascript
// LLM Service Integration
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function processWithLLM(message, roomId) {
    try {
        // Get conversation history for context
        const history = await getConversationHistory(roomId);
        
        // Create context-aware prompt
        const messages = [
            {
                role: "system",
                content: "You are a helpful AI assistant. Be concise and friendly."
            },
            ...history.slice(-5), // Last 5 messages for context
            {
                role: "user",
                content: message
            }
        ];
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 150,
            temperature: 0.7,
        });
        
        return completion.choices[0].message.content;
        
    } catch (error) {
        console.error('LLM processing error:', error);
        return "Sorry, I'm having trouble processing that right now.";
    }
}

async function getConversationHistory(roomId) {
    // Implement conversation history retrieval
    // This could be from Redis, database, or memory
    return [];
}
```

**Key Points:**
- Context-aware conversation management
- Limited history window for relevance
- Error handling for API failures
- Configurable model parameters
- Fallback responses for failures

</details>

---

## Building React Chat Interface

### Chat Component Structure

<details>
<summary>🔍 View React Chat Interface</summary>

```jsx
// ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

const ChatInterface = ({ roomId, userId }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [typingUsers, setTypingUsers] = useState(new Set());
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io(process.env.REACT_APP_SERVER_URL);
        setSocket(newSocket);

        // Connection events
        newSocket.on('connect', () => {
            setIsConnected(true);
            newSocket.emit('join_room', roomId);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
        });

        // Message events
        newSocket.on('new_message', (messageData) => {
            setMessages(prev => [...prev, messageData]);
        });

        newSocket.on('message_sent', (messageData) => {
            setMessages(prev => [...prev, messageData]);
        });

        // Typing events
        newSocket.on('user_typing', ({ userId: typingUserId }) => {
            if (typingUserId !== userId) {
                setTypingUsers(prev => new Set([...prev, typingUserId]));
            }
        });

        newSocket.on('user_stop_typing', ({ userId: typingUserId }) => {
            setTypingUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(typingUserId);
                return newSet;
            });
        });

        return () => {
            newSocket.disconnect();
        };
    }, [roomId, userId]);

    const handleSendMessage = (content, useAi = false) => {
        if (socket && isConnected) {
            socket.emit('send_message', {
                content,
                roomId,
                useAi
            });
        }
    };

    const handleTypingStart = () => {
        if (!isTyping && socket && isConnected) {
            setIsTyping(true);
            socket.emit('typing_start', roomId);
            
            // Clear existing timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            
            // Stop typing after 1 second of inactivity
            typingTimeoutRef.current = setTimeout(() => {
                handleTypingStop();
            }, 1000);
        }
    };

    const handleTypingStop = () => {
        if (isTyping && socket && isConnected) {
            setIsTyping(false);
            socket.emit('typing_stop', roomId);
            
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    };

    return (
        <div className="chat-interface">
            <div className="chat-header">
                <h3>Chat Room: {roomId}</h3>
                <div className="connection-status">
                    {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
                </div>
            </div>
            
            <MessageList messages={messages} currentUserId={userId} />
            
            {typingUsers.size > 0 && (
                <TypingIndicator users={typingUsers} />
            )}
            
            <MessageInput
                onSendMessage={handleSendMessage}
                onTypingStart={handleTypingStart}
                onTypingStop={handleTypingStop}
                disabled={!isConnected}
            />
        </div>
    );
};

export default ChatInterface;
```

**Key Points:**
- Real-time WebSocket connection management
- State management for messages and typing indicators
- Event-driven architecture for real-time updates
- Connection status display
- Automatic cleanup on unmount

</details>

### 💬 Message Components

<details>
<summary>🔍 View Message Components</summary>

```jsx
// MessageList.jsx
import React from 'react';
import Message from './Message';

const MessageList = ({ messages, currentUserId }) => {
    const messagesEndRef = React.useRef(null);

    React.useEffect(() => {
        // Auto-scroll to bottom on new messages
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <Message
                    key={`${message.userId}-${message.timestamp}-${index}`}
                    message={message}
                    isOwn={message.userId === currentUserId}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

// Message.jsx
import React from 'react';

const Message = ({ message, isOwn }) => {
    const time = new Date(message.timestamp).toLocaleTimeString();
    
    return (
        <div className={`message ${isOwn ? 'own' : 'other'} ${message.isAi ? 'ai' : ''}`}>
            <div className="message-content">
                <p>{message.content}</p>
                <div className="message-meta">
                    <span className="timestamp">{time}</span>
                    {message.isAi && <span className="ai-badge">🤖 AI</span>}
                </div>
            </div>
        </div>
    );
};

// TypingIndicator.jsx
import React from 'react';

const TypingIndicator = ({ users }) => {
    const userCount = users.size;
    
    if (userCount === 0) return null;
    
    const getTypingText = () => {
        if (userCount === 1) return 'Someone is typing...';
        if (userCount === 2) return 'Two people are typing...';
        return `${userCount} people are typing...`;
    };
    
    return (
        <div className="typing-indicator">
            <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span className="typing-text">{getTypingText()}</span>
        </div>
    );
};
```

**Key Points:**
- Auto-scrolling to latest messages
- Different styling for own vs other messages
- AI message identification
- Real-time typing indicators
- Component composition for reusability

</details>

---

## Production Patterns & Scalability

### Horizontal Scaling

<details>
<summary>🔍 View Redis Adapter for Scaling</summary>

```javascript
// Redis Adapter for Multi-Instance Scaling
const redis = require('socket.io-redis');
const Redis = require('ioredis');

// Configure Redis for socket.io
io.adapter(redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
}));

// Redis client for additional features
const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

// Store conversation history in Redis
async function saveMessage(roomId, message) {
    const key = `chat:${roomId}:messages`;
    await redisClient.lpush(key, JSON.stringify(message));
    await redisClient.ltrim(key, 0, 99); // Keep last 100 messages
}

async function getMessages(roomId) {
    const key = `chat:${roomId}:messages`;
    const messages = await redisClient.lrange(key, 0, -1);
    return messages.map(msg => JSON.parse(msg)).reverse();
}
```

**Key Points:**
- Multi-instance WebSocket scaling
- Redis for shared state management
- Message persistence across restarts
- Load balancing across instances
- Horizontal scaling capabilities

</details>

### 🛡️ Security Implementation

<details>
<summary>🔍 View Authentication Middleware</summary>

```javascript
// Authentication Middleware
const jwt = require('jsonwebtoken');

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId;
        socket.username = decoded.username;
        next();
    } catch (error) {
        next(new Error('Authentication error'));
    }
});

// Rate Limiting
const rateLimit = require('express-rate-limit');

const messageRateLimit = rateLimit({
    windowMs: 60000, // 1 minute
    max: 30, // 30 messages per minute
    message: 'Too many messages, please try again later.',
});

// Apply rate limiting to message endpoints
app.use('/api/messages', messageRateLimit);
```

**Key Points:**
- JWT-based authentication for WebSocket connections
- Rate limiting to prevent abuse
- Middleware pattern for security checks
- User session management
- API protection layers

</details>

### 🔍 Monitoring & Analytics

<details>
<summary>🔍 View Connection Monitoring Code</summary>

```javascript
// Connection Monitoring
const connectionStats = {
    totalConnections: 0,
    activeConnections: 0,
    roomsCount: 0,
    messagesPerMinute: 0
};

io.on('connection', (socket) => {
    connectionStats.totalConnections++;
    connectionStats.activeConnections++;
    
    socket.on('disconnect', () => {
        connectionStats.activeConnections--;
    });
});

// Message Analytics
setInterval(() => {
    const stats = {
        ...connectionStats,
        roomsCount: rooms.size,
        timestamp: new Date().toISOString()
    };
    
    // Send to monitoring service
    console.log('WebSocket Stats:', stats);
}, 60000); // Every minute
```

**Key Points:**
- Real-time connection tracking
- Performance metrics collection
- Room activity monitoring
- Automated reporting system
- Historical data analysis

</details>

---

## UI/UX Best Practices

### Responsive Design

<details>
<summary>🔍 View Chat Interface CSS Styles</summary>

```css
/* Chat Interface Styles */
.chat-interface {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.message-list {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-4);
    background: var(--bg-primary);
}

.message {
    margin-bottom: var(--space-3);
    animation: slideIn 0.3s ease-out;
}

.message.own {
    display: flex;
    justify-content: flex-end;
}

.message.other {
    display: flex;
    justify-content: flex-start;
}

.message.ai {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
}

.message-content {
    max-width: 70%;
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background: var(--card-bg);
    box-shadow: var(--shadow-sm);
}

.typing-indicator {
    display: flex;
    align-items: center;
    padding: var(--space-2);
    color: var(--text-light);
}

.typing-dots {
    display: flex;
    gap: 4px;
    margin-right: var(--space-2);
}

.typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
    animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 60%, 100% {
        transform: translateY(0);
    }
    30% {
        transform: translateY(-10px);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .message-content {
        max-width: 85%;
    }
    
    .chat-interface {
        height: 100vh;
        border-radius: 0;
    }
}
```

**Key Points:**
- Flexible layout for responsive design
- Smooth animations for message appearance
- Gradient styling for AI messages
- Mobile-first responsive approach
- Accessible color contrast and sizing
- Smooth scrolling behavior

</details>

---

## Testing & Debugging

### Unit Tests

<details>
<summary>🔍 View WebSocket Server Tests</summary>

```javascript
// WebSocket Server Tests
const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

describe('WebSocket Server', () => {
    let io, serverSocket, clientSocket;
    
    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on('connection', (socket) => {
                serverSocket = socket;
            });
            clientSocket.on('connect', done);
        });
    });
    
    afterAll(() => {
        io.close();
        clientSocket.close();
    });
    
    test('should handle message sending', (done) => {
        const messageData = {
            content: 'Hello World',
            roomId: 'test-room',
            useAi: false
        };
        
        serverSocket.on('send_message', (data) => {
            expect(data).toEqual(messageData);
            done();
        });
        
        clientSocket.emit('send_message', messageData);
    });
    
    test('should handle room joining', (done) => {
        const roomId = 'test-room';
        
        serverSocket.on('join_room', (data) => {
            expect(data).toBe(roomId);
            done();
        });
        
        clientSocket.emit('join_room', roomId);
    });
});
```

**Key Points:**
- WebSocket connection testing
- Real-time event testing
- Room functionality verification
- Error handling validation
- Cleanup and resource management

</details>

### 🔍 Debugging Tools

<details>
<summary>🔍 View Debug Mode Configuration</summary>

```javascript
// Debug Mode Configuration
if (process.env.NODE_ENV === 'development') {
    io.on('connection', (socket) => {
        console.log(`[DEBUG] Connection: ${socket.id}`);
        
        // Log all events
        const originalEmit = socket.emit;
        socket.emit = function(event, ...args) {
            console.log(`[DEBUG] Emit to ${socket.id}:`, event, args);
            originalEmit.apply(this, [event, ...args]);
        };
        
        const originalOn = socket.on;
        socket.on = function(event, callback) {
            console.log(`[DEBUG] Listen on ${socket.id}:`, event);
            return originalOn.call(this, event, (...args) => {
                console.log(`[DEBUG] Received on ${socket.id}:`, event, args);
                callback(...args);
            });
        };
    });
}
```

**Key Points:**
- Development-only debugging mode
- Event logging for troubleshooting
- Socket event tracking
- Real-time connection monitoring
- Performance analysis capabilities

</details>

---

## Quick Reference

### Implementation Checklist

For server setup, you'll need to install dependencies like express, socket.io, and cors. Configure CORS for client access and set up connection management to track users. Implement a room system for multi-user chat and add message handling with proper error management. Finally, configure LLM integration for AI responses.

For client implementation, initialize the socket connection with proper configuration. Create message components including the list, input, and typing indicators. Implement typing indicators for better UX and add connection status display. Handle reconnection logic and implement message history persistence.

For production readiness, add authentication middleware and implement rate limiting for message sending. Set up Redis adapter for multi-instance scaling and add monitoring and analytics. Configure error handling and logging, and set up health checks and monitoring.

### Key Code Patterns

```javascript
// Connection Management
const connections = new Map();
const rooms = new Map();

// Message Processing
socket.on('send_message', async (data) => {
    const response = useAi ? await processWithLLM(data) : data.content;
    socket.to(roomId).emit('new_message', response);
});

// Typing Indicators
socket.on('typing_start', () => {
    socket.to(roomId).emit('user_typing', { userId: socket.id });
});
```

### Common Pitfalls

Watch out for memory leaks from not cleaning up connections properly. Race conditions can cause message ordering issues. Missing error handling in LLM calls can crash your application. No rate limiting leads to spam and abuse. Poor reconnection logic creates bad user experience. Missing CORS configuration prevents clients from connecting.

---

*This playbook is part of the BeaconOfTech series. For more insights on real-time architecture, check out our guides on gRPC implementation and Docker deployment patterns.*
