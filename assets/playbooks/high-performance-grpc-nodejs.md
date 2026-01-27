# Building High-Performance APIs with gRPC and Node.js

> *"Performance is not just about speed; it's about building systems that scale gracefully under load."*  
> *Master gRPC and Node.js to create lightning-fast, type-safe APIs.*

---

## 🎯 Overview

gRPC is a high-performance RPC framework that uses Protocol Buffers for serialization and HTTP/2 for transport. Combined with Node.js, it enables building extremely fast, type-safe APIs that outperform traditional REST APIs significantly. This playbook covers advanced gRPC patterns, streaming, error handling, and production deployment.

### 📚 What You'll Learn

- ✅ **gRPC Fundamentals**: Protocol Buffers, service definitions
- ✅ **Advanced Patterns**: Streaming, interceptors, middleware
- ✅ **Performance Optimization**: Connection pooling, load balancing
- ✅ **Error Handling**: Status codes, error propagation
- ✅ **Testing & Debugging**: Unit tests, monitoring
- ✅ **Production Deployment**: Docker, Kubernetes, monitoring

---

## 🏗️ gRPC Fundamentals

### 📋 Protocol Buffers

Protocol Buffers (protobuf) are gRPC's serialization format:

```protobuf
// user.proto
syntax = "proto3";

package user;

import "google/protobuf/timestamp.proto";
import "google/protobuf/empty.proto";

// User service definition
service UserService {
  rpc GetUser(GetUserRequest) returns (UserResponse);
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
  rpc CreateUser(CreateUserRequest) returns (UserResponse);
  rpc UpdateUser(UpdateUserRequest) returns (UserResponse);
  rpc DeleteUser(DeleteUserRequest) returns (google.protobuf.Empty);
  
  // Streaming operations
  rpc StreamUsers(ListUsersRequest) returns (stream UserResponse);
  rpc CreateUserStream(stream CreateUserRequest) returns (UserResponse);
  rpc UserChat(stream ChatMessage) returns (stream ChatMessage);
}

// Message definitions
message User {
  string id = 1;
  string email = 2;
  string name = 3;
  google.protobuf.Timestamp created_at = 4;
  google.protobuf.Timestamp updated_at = 5;
  repeated string roles = 6;
  map<string, string> metadata = 7;
}

message GetUserRequest {
  string user_id = 1;
  bool include_metadata = 2;
}

message CreateUserRequest {
  string email = 1;
  string name = 2;
  repeated string roles = 3;
  map<string, string> metadata = 4;
}

message ListUsersRequest {
  int32 page = 1;
  int32 page_size = 2;
  string filter = 3;
  string sort_by = 4;
}

message ListUsersResponse {
  repeated User users = 1;
  int32 total_count = 2;
  int32 page = 3;
  int32 page_size = 4;
}

message UserResponse {
  User user = 1;
  string message = 2;
}

message ChatMessage {
  string user_id = 1;
  string content = 2;
  google.protobuf.Timestamp timestamp = 3;
  string room_id = 4;
}
```

### 🔧 Generating gRPC Code

```bash
# Install gRPC tools
npm install @grpc/grpc-js @grpc/proto-loader

# Generate JavaScript code from proto
npx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./generated \
  --grpc_out=grpc_js:./generated \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  user.proto

# Generate TypeScript definitions
npx grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=grpc_js:./generated \
  user.proto
```

---

## 🚀 Advanced gRPC Patterns

### 🌊 Streaming Implementations

#### **📤 Server-Side Streaming**

```javascript
// Server-side streaming implementation
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load proto file
const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

class UserServiceImpl {
  async streamUsers(call, callback) {
    const { page, page_size, filter } = call.request;
    
    try {
      // Get users from database
      const users = await this.getUsersFromDB({ page, page_size, filter });
      
      // Stream each user
      for (const user of users) {
        const response = {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            created_at: {
              seconds: Math.floor(user.created_at.getTime() / 1000),
              nanos: (user.created_at.getTime() % 1000) * 1000000
            },
            roles: user.roles,
            metadata: user.metadata || {}
          },
          message: 'User streamed successfully'
        };
        
        call.write(response);
        
        // Add small delay to demonstrate streaming
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      call.end();
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: `Failed to stream users: ${error.message}`
      });
    }
  }
  
  async getUsersFromDB({ page, page_size, filter }) {
    // Database query implementation
    const offset = (page - 1) * page_size;
    const query = `
      SELECT * FROM users 
      WHERE ($1::text IS NULL OR name ILIKE $1 OR email ILIKE $1)
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;
    
    const values = [filter ? `%${filter}%` : null, page_size, offset];
    const result = await pool.query(query, values);
    
    return result.rows;
  }
}
```

#### **📥 Client-Side Streaming**

```javascript
// Client-side streaming implementation
async createUserStream() {
  const client = new userProto.UserService(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );
  
  const call = client.createUserStream((error, response) => {
    if (error) {
      console.error('Create user stream error:', error);
      return;
    }
    
    console.log('User created:', response.user);
  });
  
  // Stream multiple user creation requests
  const users = [
    { email: 'user1@example.com', name: 'User One', roles: ['user'] },
    { email: 'user2@example.com', name: 'User Two', roles: ['admin'] },
    { email: 'user3@example.com', name: 'User Three', roles: ['user'] }
  ];
  
  for (const userData of users) {
    const request = {
      email: userData.email,
      name: userData.name,
      roles: userData.roles,
      metadata: { source: 'batch_import' }
    };
    
    call.write(request);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  call.end();
}
```

#### **🔄 Bidirectional Streaming**

```javascript
// Bidirectional streaming for real-time chat
async userChat() {
  const client = new userProto.UserService(
    'localhost:50051',
    grpc.credentials.createInsecure()
  );
  
  const call = client.userChat();
  
  // Handle incoming messages
  call.on('data', (response) => {
    console.log(`Received message from ${response.user_id}: ${response.content}`);
  });
  
  call.on('error', (error) => {
    console.error('Chat stream error:', error);
  });
  
  call.on('end', () => {
    console.log('Chat stream ended');
  });
  
  // Send messages
  const messages = [
    { user_id: 'user1', content: 'Hello everyone!', room_id: 'general' },
    { user_id: 'user1', content: 'How is everyone doing?', room_id: 'general' }
  ];
  
  for (const message of messages) {
    const request = {
      ...message,
      timestamp: {
        seconds: Math.floor(Date.now() / 1000),
        nanos: (Date.now() % 1000) * 1000000
      }
    };
    
    call.write(request);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

### 🛡️ Interceptors and Middleware

```javascript
// Authentication interceptor
class AuthInterceptor {
  constructor(jwtSecret) {
    this.jwtSecret = jwtSecret;
  }
  
  async intercept(call, next) {
    const metadata = call.metadata.get('authorization');
    
    if (!metadata || metadata.length === 0) {
      call.callback({
        code: grpc.status.UNAUTHENTICATED,
        details: 'No authorization token provided'
      });
      return;
    }
    
    const token = metadata[0].replace('Bearer ', '');
    
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      call.user = decoded;
      
      // Add user context to call
      call.userContext = {
        userId: decoded.sub,
        roles: decoded.roles,
        permissions: decoded.permissions
      };
      
      return next(call);
    } catch (error) {
      call.callback({
        code: grpc.status.UNAUTHENTICATED,
        details: 'Invalid authorization token'
      });
    }
  }
}

// Logging interceptor
class LoggingInterceptor {
  intercept(call, next) {
    const start = Date.now();
    const method = call.method.path;
    
    console.log(`[${new Date().toISOString()}] Starting gRPC call: ${method}`);
    
    return next(call).then(response => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] Completed gRPC call: ${method} (${duration}ms)`);
      return response;
    }).catch(error => {
      const duration = Date.now() - start;
      console.error(`[${new Date().toISOString()}] Failed gRPC call: ${method} (${duration}ms) - ${error.message}`);
      throw error;
    });
  }
}

// Rate limiting interceptor
class RateLimitInterceptor {
  constructor(redisClient) {
    this.redis = redisClient;
  }
  
  async intercept(call, next) {
    const clientId = call.metadata.get('client-id')[0] || 'anonymous';
    const key = `rate_limit:${clientId}`;
    
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, 60); // 1 minute window
    }
    
    if (current > 100) { // 100 requests per minute
      call.callback({
        code: grpc.status.RESOURCE_EXHAUSTED,
        details: 'Rate limit exceeded'
      });
      return;
    }
    
    return next(call);
  }
}

// Apply interceptors to server
const server = new grpc.Server();
server.addService(userProto.UserService.service, new UserServiceImpl());

// Add interceptors
server.use(new AuthInterceptor(process.env.JWT_SECRET));
server.use(new LoggingInterceptor());
server.use(new RateLimitInterceptor(redisClient));
```

---

## ⚡ Performance Optimization

### 🔗 Connection Pooling

```javascript
// gRPC client with connection pooling
class GRPCClientPool {
  constructor(serviceUrl, options = {}) {
    this.serviceUrl = serviceUrl;
    this.options = options;
    this.pool = [];
    this.maxSize = options.maxSize || 10;
    this.minSize = options.minSize || 2;
    this.currentSize = 0;
    this.waitingQueue = [];
    
    this.initializePool();
  }
  
  async initializePool() {
    for (let i = 0; i < this.minSize; i++) {
      await this.createConnection();
    }
  }
  
  async createConnection() {
    if (this.currentSize >= this.maxSize) {
      return new Promise((resolve) => {
        this.waitingQueue.push(resolve);
      });
    }
    
    const client = new userProto.UserService(
      this.serviceUrl,
      grpc.credentials.createInsecure(),
      this.options
    );
    
    this.pool.push({
      client,
      inUse: false,
      createdAt: Date.now(),
      lastUsed: Date.now()
    });
    
    this.currentSize++;
    
    return client;
  }
  
  async getClient() {
    // Find available connection
    let connection = this.pool.find(conn => !conn.inUse);
    
    if (!connection) {
      if (this.currentSize < this.maxSize) {
        await this.createConnection();
        connection = this.pool.find(conn => !conn.inUse);
      } else {
        // Wait for available connection
        return new Promise((resolve) => {
          this.waitingQueue.push(resolve);
        });
      }
    }
    
    connection.inUse = true;
    connection.lastUsed = Date.now();
    
    return {
      client: connection.client,
      release: () => {
        connection.inUse = false;
        
        // Process waiting queue
        if (this.waitingQueue.length > 0) {
          const resolve = this.waitingQueue.shift();
          resolve(this.getClient());
        }
      }
    };
  }
  
  // Cleanup old connections
  cleanup() {
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes
    
    this.pool = this.pool.filter(connection => {
      if (!connection.inUse && (now - connection.lastUsed) > maxAge) {
        connection.client.close();
        this.currentSize--;
        return false;
      }
      return true;
    });
  }
}

// Usage
const clientPool = new GRPCClientPool('localhost:50051', {
  maxSize: 20,
  minSize: 5
});

// Cleanup periodically
setInterval(() => clientPool.cleanup(), 60000);
```

### ⚖️ Load Balancing

```javascript
// Load balancer for multiple gRPC servers
class GRPCLoadBalancer {
  constructor(servers, strategy = 'round-robin') {
    this.servers = servers;
    this.strategy = strategy;
    this.currentIndex = 0;
    this.healthStatus = new Map();
    
    // Initialize health status
    servers.forEach(server => {
      this.healthStatus.set(server.url, true);
    });
    
    this.startHealthChecks();
  }
  
  getServer() {
    const healthyServers = this.servers.filter(
      server => this.healthStatus.get(server.url)
    );
    
    if (healthyServers.length === 0) {
      throw new Error('No healthy servers available');
    }
    
    switch (this.strategy) {
      case 'round-robin':
        return this.roundRobin(healthyServers);
      case 'least-connections':
        return this.leastConnections(healthyServers);
      case 'random':
        return this.random(healthyServers);
      default:
        return this.roundRobin(healthyServers);
    }
  }
  
  roundRobin(servers) {
    const server = servers[this.currentIndex % servers.length];
    this.currentIndex++;
    return server;
  }
  
  leastConnections(servers) {
    return servers.reduce((min, server) => 
      (server.connections || 0) < (min.connections || 0) ? server : min
    );
  }
  
  random(servers) {
    return servers[Math.floor(Math.random() * servers.length)];
  }
  
  async startHealthChecks() {
    setInterval(async () => {
      for (const server of this.servers) {
        try {
          const client = new grpc.health.v1.Health(
            server.url,
            grpc.credentials.createInsecure()
          );
          
          await new Promise((resolve, reject) => {
            client.check({ service: '' }, (error, response) => {
              if (error) {
                reject(error);
              } else {
                resolve(response);
              }
            });
          });
          
          this.healthStatus.set(server.url, true);
        } catch (error) {
          this.healthStatus.set(server.url, false);
          console.error(`Health check failed for ${server.url}:`, error.message);
        }
      }
    }, 30000); // Check every 30 seconds
  }
}

// Usage with connection pool
const loadBalancer = new GRPCLoadBalancer([
  { url: 'localhost:50051', weight: 1 },
  { url: 'localhost:50052', weight: 1 },
  { url: 'localhost:50053', weight: 1 }
], 'least-connections');

class SmartClientPool {
  constructor() {
    this.pools = new Map();
  }
  
  async getClient() {
    const server = loadBalancer.getServer();
    
    if (!this.pools.has(server.url)) {
      this.pools.set(server.url, new GRPCClientPool(server.url));
    }
    
    const pool = this.pools.get(server.url);
    return pool.getClient();
  }
}
```

---

## 🛠️ Error Handling & Resilience

### 🚨 Custom Error Handling

```javascript
// Custom error codes and messages
const ErrorCodes = {
  USER_NOT_FOUND: {
    code: grpc.status.NOT_FOUND,
    message: 'User not found'
  },
  INVALID_INPUT: {
    code: grpc.status.INVALID_ARGUMENT,
    message: 'Invalid input provided'
  },
  PERMISSION_DENIED: {
    code: grpc.status.PERMISSION_DENIED,
    message: 'Permission denied'
  },
  RATE_LIMITED: {
    code: grpc.status.RESOURCE_EXHAUSTED,
    message: 'Rate limit exceeded'
  },
  INTERNAL_ERROR: {
    code: grpc.status.INTERNAL,
    message: 'Internal server error'
  }
};

class GRPCError extends Error {
  constructor(errorCode, details) {
    super(errorCode.message);
    this.code = errorCode.code;
    this.details = details || errorCode.message;
    this.name = 'GRPCError';
  }
}

// Error handling middleware
class ErrorHandlerInterceptor {
  intercept(call, next) {
    return next(call).catch(error => {
      if (error instanceof GRPCError) {
        call.callback({
          code: error.code,
          details: error.details
        });
        return;
      }
      
      if (error.code && error.details) {
        // Already a gRPC error
        call.callback(error);
        return;
      }
      
      // Convert to gRPC error
      console.error('Unexpected error:', error);
      call.callback({
        code: grpc.status.INTERNAL,
        details: 'An unexpected error occurred'
      });
    });
  }
}

// Usage in service implementation
class UserServiceImpl {
  async getUser(call, callback) {
    try {
      const { user_id } = call.request;
      
      if (!user_id) {
        throw new GRPCError(ErrorCodes.INVALID_INPUT, 'User ID is required');
      }
      
      const user = await this.findUserById(user_id);
      
      if (!user) {
        throw new GRPCError(ErrorCodes.USER_NOT_FOUND, `User ${user_id} not found`);
      }
      
      const response = {
        user: this.mapUserToProto(user),
        message: 'User retrieved successfully'
      };
      
      callback(null, response);
    } catch (error) {
      if (error instanceof GRPCError) {
        callback({
          code: error.code,
          details: error.details
        });
      } else {
        console.error('Error getting user:', error);
        callback({
          code: grpc.status.INTERNAL,
          details: 'Failed to retrieve user'
        });
      }
    }
  }
}
```

### 🔄 Retry and Circuit Breaker

```javascript
// Retry mechanism
class RetryInterceptor {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.retryableCodes = new Set([
      grpc.status.UNAVAILABLE,
      grpc.status.DEADLINE_EXCEEDED,
      grpc.status.RESOURCE_EXHAUSTED
    ]);
  }
  
  async intercept(call, next) {
    let lastError;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await next(call);
      } catch (error) {
        lastError = error;
        
        if (attempt === this.maxRetries || !this.retryableCodes.has(error.code)) {
          throw error;
        }
        
        // Exponential backoff
        const delay = this.retryDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.log(`Retrying gRPC call (attempt ${attempt + 1}/${this.maxRetries})`);
      }
    }
    
    throw lastError;
  }
}

// Circuit breaker implementation
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 60000;
    this.monitoringPeriod = options.monitoringPeriod || 10000;
    
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = 0;
    this.successCount = 0;
  }
  
  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF_OPEN';
        this.successCount = 0;
      } else {
        throw new GRPCError(ErrorCodes.INTERNAL, 'Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= 3) {
        this.state = 'CLOSED';
        this.failureCount = 0;
      }
    } else {
      this.failureCount = 0;
    }
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

// Circuit breaker interceptor
class CircuitBreakerInterceptor {
  constructor() {
    this.circuitBreakers = new Map();
  }
  
  intercept(call, next) {
    const method = call.method.path;
    
    if (!this.circuitBreakers.has(method)) {
      this.circuitBreakers.set(method, new CircuitBreaker());
    }
    
    const circuitBreaker = this.circuitBreakers.get(method);
    
    return circuitBreaker.execute(() => next(call));
  }
}
```

---

## 🧪 Testing & Debugging

### 🧪 Unit Testing

```javascript
// Testing gRPC services
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

describe('UserService', () => {
  let server;
  let client;
  
  beforeAll(async () => {
    // Start test server
    server = new grpc.Server();
    server.addService(userProto.UserService.service, new UserServiceImpl());
    
    const address = 'localhost:0';
    const port = await new Promise((resolve) => {
      server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
        resolve(port);
      });
    });
    
    server.start();
    
    // Create test client
    client = new userProto.UserService(
      `localhost:${port}`,
      grpc.credentials.createInsecure()
    );
  });
  
  afterAll(() => {
    server.forceShutdown();
  });
  
  describe('getUser', () => {
    it('should return user when found', (done) => {
      const request = { user_id: '123' };
      
      client.getUser(request, (error, response) => {
        expect(error).toBeNull();
        expect(response.user).toBeDefined();
        expect(response.user.id).toBe('123');
        expect(response.message).toBe('User retrieved successfully');
        done();
      });
    });
    
    it('should return NOT_FOUND when user does not exist', (done) => {
      const request = { user_id: '999' };
      
      client.getUser(request, (error, response) => {
        expect(error).toBeDefined();
        expect(error.code).toBe(grpc.status.NOT_FOUND);
        expect(error.details).toBe('User 999 not found');
        done();
      });
    });
    
    it('should return INVALID_ARGUMENT when user_id is missing', (done) => {
      const request = {};
      
      client.getUser(request, (error, response) => {
        expect(error).toBeDefined();
        expect(error.code).toBe(grpc.status.INVALID_ARGUMENT);
        expect(error.details).toBe('User ID is required');
        done();
      });
    });
  });
  
  describe('streamUsers', () => {
    it('should stream users correctly', (done) => {
      const request = { page: 1, page_size: 2 };
      const call = client.streamUsers(request);
      
      const responses = [];
      
      call.on('data', (response) => {
        responses.push(response);
      });
      
      call.on('end', () => {
        expect(responses).toHaveLength(2);
        expect(responses[0].user).toBeDefined();
        expect(responses[1].user).toBeDefined();
        done();
      });
      
      call.on('error', (error) => {
        done(error);
      });
    });
  });
});
```

### 🔍 Monitoring and Metrics

```javascript
// Metrics collection for gRPC
const prometheus = require('prom-client');

// Create metrics
const grpcRequestDuration = new prometheus.Histogram({
  name: 'grpc_request_duration_seconds',
  help: 'Duration of gRPC requests in seconds',
  labelNames: ['method', 'status_code']
});

const grpcRequestTotal = new prometheus.Counter({
  name: 'grpc_requests_total',
  help: 'Total number of gRPC requests',
  labelNames: ['method', 'status_code']
});

const grpcActiveConnections = new prometheus.Gauge({
  name: 'grpc_active_connections',
  help: 'Number of active gRPC connections'
});

// Metrics interceptor
class MetricsInterceptor {
  intercept(call, next) {
    const start = Date.now();
    const method = call.method.path;
    
    grpcActiveConnections.inc();
    
    return next(call).then(response => {
      const duration = (Date.now() - start) / 1000;
      
      grpcRequestDuration
        .labels(method, 'OK')
        .observe(duration);
      
      grpcRequestTotal
        .labels(method, 'OK')
        .inc();
      
      grpcActiveConnections.dec();
      
      return response;
    }).catch(error => {
      const duration = (Date.now() - start) / 1000;
      const statusCode = this.getGrpcStatusCode(error);
      
      grpcRequestDuration
        .labels(method, statusCode)
        .observe(duration);
      
      grpcRequestTotal
        .labels(method, statusCode)
        .inc();
      
      grpcActiveConnections.dec();
      
      throw error;
    });
  }
  
  getGrpcStatusCode(error) {
    if (error.code) {
      return this.getStatusCodeName(error.code);
    }
    return 'UNKNOWN';
  }
  
  getStatusCodeName(code) {
    const statusNames = {
      [grpc.status.OK]: 'OK',
      [grpc.status.CANCELLED]: 'CANCELLED',
      [grpc.status.UNKNOWN]: 'UNKNOWN',
      [grpc.status.INVALID_ARGUMENT]: 'INVALID_ARGUMENT',
      [grpc.status.DEADLINE_EXCEEDED]: 'DEADLINE_EXCEEDED',
      [grpc.status.NOT_FOUND]: 'NOT_FOUND',
      [grpc.status.ALREADY_EXISTS]: 'ALREADY_EXISTS',
      [grpc.status.PERMISSION_DENIED]: 'PERMISSION_DENIED',
      [grpc.status.UNAUTHENTICATED]: 'UNAUTHENTICATED',
      [grpc.status.RESOURCE_EXHAUSTED]: 'RESOURCE_EXHAUSTED',
      [grpc.status.FAILED_PRECONDITION]: 'FAILED_PRECONDITION',
      [grpc.status.ABORTED]: 'ABORTED',
      [grpc.status.OUT_OF_RANGE]: 'OUT_OF_RANGE',
      [grpc.status.UNIMPLEMENTED]: 'UNIMPLEMENTED',
      [grpc.status.INTERNAL]: 'INTERNAL',
      [grpc.status.UNAVAILABLE]: 'UNAVAILABLE',
      [grpc.status.DATA_LOSS]: 'DATA_LOSS'
    };
    
    return statusNames[code] || 'UNKNOWN';
  }
}

// Expose metrics endpoint
const express = require('express');
const metricsApp = express();

metricsApp.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});

metricsApp.listen(9090, () => {
  console.log('Metrics server listening on port 9090');
});
```

---

## 🐳 Production Deployment

### 🐳 Docker Configuration

```dockerfile
# Multi-stage Dockerfile for gRPC service
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate protobuf code
RUN npm run proto:generate

# Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S grpcuser -u 1001

WORKDIR /app

# Copy generated code and dependencies
COPY --from=builder --chown=grpcuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=grpcuser:nodejs /app/generated ./generated
COPY --from=builder --chown=grpcuser:nodejs /app/src ./src
COPY --from=builder --chown=grpcuser:nodejs /app/package*.json ./

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

USER grpcuser

EXPOSE 50051

CMD ["node", "src/server.js"]
```

### ☸️ Kubernetes Deployment

```yaml
# Kubernetes deployment for gRPC service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 50051
          name: grpc
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: jwt-secret
              key: secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          exec:
            command:
            - node
            - healthcheck.js
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - node
            - healthcheck.js
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 50051
    targetPort: 50051
    name: grpc
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: user-service-ingress
  annotations:
    nginx.ingress.kubernetes.io/backend-protocol: "GRPC"
spec:
  rules:
  - host: user-service.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 50051
```

---

## 🎯 Quick Reference

### 📋 Implementation Checklist

#### **🏗️ gRPC Setup**
- [ ] **Protocol buffer definitions** with proper service contracts
- [ ] **Code generation** for client and server stubs
- [ ] **Type definitions** for TypeScript support
- [ ] **Service implementation** with proper error handling
- [ ] **Streaming operations** for real-time communication
- [ ] **Interceptors** for cross-cutting concerns

#### **⚡ Performance Optimization**
- [ ] **Connection pooling** for client efficiency
- [ ] **Load balancing** across multiple instances
- [ ] **Circuit breaker** for fault tolerance
- [ ] **Retry mechanisms** with exponential backoff
- [ ] **Metrics collection** for monitoring
- [ ] **Health checks** for service availability

#### **🛡️ Production Ready**
- [ ] **Authentication and authorization** interceptors
- [ ] **Rate limiting** to prevent abuse
- [ ] **Comprehensive error handling** with proper status codes
- [ ] **Logging and monitoring** integration
- [ ] **Docker containerization** with multi-stage builds
- [ ] **Kubernetes deployment** with health probes

### 🔑 Key Performance Metrics

| Metric | Target | Monitoring |
|--------|--------|------------|
| **Response Time** | < 50ms (p95) | Prometheus + Grafana |
| **Throughput** | > 1000 req/s | gRPC metrics |
| **Error Rate** | < 0.1% | Error tracking |
| **Connection Pool** | 80% utilization | Connection metrics |
| **Memory Usage** | < 512MB per instance | Container metrics |
| **CPU Usage** | < 70% average | System metrics |

### ⚠️ Common Pitfalls

- **❌ Blocking operations** in gRPC handlers
- **❌ Missing error handling** causing silent failures
- **❌ No connection pooling** creating performance bottlenecks
- **❌ Improper streaming** causing memory leaks
- **❌ Missing health checks** making debugging difficult
- **❌ No monitoring** making optimization impossible

---

*This playbook is part of the BeaconOfTech series. For more insights on high-performance systems, check out our guides on Docker deployment patterns and real-time WebSocket architecture.*
