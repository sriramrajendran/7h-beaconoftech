# Advanced Docker & ECS Deployment Patterns

> *"Containerization is not just about packaging; it's about creating portable, scalable, and resilient applications."*  
> *Master Docker and AWS ECS for production-ready deployments.*

---

## 🎯 Overview

Docker and Amazon ECS provide powerful container orchestration capabilities for modern applications. This playbook covers advanced deployment patterns including multi-stage builds, service discovery, blue-green deployments, and cost optimization strategies for production environments.

### 📚 What You'll Learn

- ✅ **Advanced Docker Patterns**: Multi-stage builds, optimization techniques
- ✅ **ECS Architecture**: Service definitions, task definitions, networking
- ✅ **Deployment Strategies**: Blue-green, canary, rolling updates
- ✅ **Service Discovery**: Container-to-container communication
- ✅ **Monitoring & Logging**: CloudWatch integration, health checks
- ✅ **Cost Optimization**: Resource management, scaling strategies

---

## 🐳 Advanced Docker Patterns

### 🏗️ Multi-Stage Builds

Multi-stage builds reduce image size by separating build-time dependencies from runtime dependencies:

```dockerfile
# Multi-stage Dockerfile for Node.js application
# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy only production dependencies
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Security best practices
RUN npm audit fix --audit-level moderate

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
```

### ⚡ Image Optimization Techniques

#### **🔧 Base Image Selection**

| Base Image | Size | Use Case | Pros | Cons |
|------------|------|----------|------|------|
| **alpine** | ~5MB | Production | Minimal size | Limited packages |
| **slim** | ~40MB | Balanced | Good compatibility | Larger than alpine |
| **full** | ~900MB | Development | All tools available | Large size |

#### **🗂️ Layer Optimization**

```dockerfile
# Optimize layer caching
# 1. Copy dependencies first (changes less often)
COPY package*.json ./
RUN npm ci --only=production

# 2. Copy source code (changes more often)
COPY . .

# 3. Build in single step
RUN npm run build && \
    npm prune --production && \
    npm cache clean --force

# 4. Clean up in same layer to reduce size
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### 🔒 Security Hardening

```dockerfile
# Security-focused Dockerfile
FROM node:18-alpine AS production

# Create non-root user with specific UID/GID
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Set secure working directory
WORKDIR /app

# Copy with correct ownership
COPY --chown=appuser:appgroup . .

# Remove unnecessary packages
RUN apk del --purge \
    && rm -rf /var/cache/apk/* \
    && rm -rf /tmp/*

# Set secure file permissions
RUN chmod -R 755 /app \
    && chmod -R 644 /app/*.js

USER appuser

# Read-only filesystem where possible
VOLUME ["/app/logs"]

# Limit capabilities
# Runtime: --cap-drop ALL --cap-add CHOWN --cap-add SETGID --cap-add SETUID
```

---

## 🏰 ECS Architecture Deep Dive

### 🏗️ ECS Components Overview

```yaml
# ECS Task Definition Example
{
  "family": "web-application",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  
  "containerDefinitions": [
    {
      "name": "web-app",
      "image": "123456789012.dkr.ecr.us-west-2.amazonaws.com/web-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-west-2:account:secret:db-url"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/web-application",
          "awslogs-region": "us-west-2",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      },
      "resourceLimits": {
        "cpu": 256,
        "memory": 512
      },
      "ulimits": [
        {
          "name": "nofile",
          "softLimit": 65536,
          "hardLimit": 65536
        }
      ]
    }
  ]
}
```

### 🌐 Service Discovery Patterns

#### **🔗 Internal Service Communication**

```yaml
# ECS Service with Service Discovery
{
  "serviceName": "user-service",
  "taskDefinition": "user-service:1",
  "desiredCount": 2,
  "launchType": "FARGATE",
  "networkConfiguration": {
    "awsvpcConfiguration": {
      "subnets": ["subnet-12345", "subnet-67890"],
      "securityGroups": ["sg-12345"],
      "assignPublicIp": "DISABLED"
    }
  },
  "serviceRegistries": [
    {
      "registryArn": "arn:aws:servicediscovery:us-west-2:account:service/user-service",
      "port": 8080,
      "containerName": "user-service",
      "containerPort": 8080
    }
  ],
  "healthCheckGracePeriodSeconds": 60,
  "deploymentController": {
    "type": "CODE_DEPLOY"
  }
}
```

#### **🌍 Cloud Map Service Discovery**

```bash
# Create Cloud Map namespace
aws servicediscovery create-private-dns-namespace \
  --name "internal.local" \
  --vpc "vpc-12345" \
  --description "Internal service discovery"

# Create service
aws servicediscovery create-service \
  --name "user-service" \
  --namespace-id "ns-12345" \
  --dns-config "RoutingPolicy=MULTIVALUE,DnsRecords={TTL=60}"

# Register service instance
aws servicediscovery register-instance \
  --service-id "srv-12345" \
  --instance-id "i-12345" \
  --attributes "AWS_INSTANCE_IPV4=10.0.1.100,AWS_INSTANCE_PORT=8080"
```

---

## 🚀 Advanced Deployment Strategies

### 🔄 Blue-Green Deployment

```yaml
# CodeDeploy AppSpec for Blue-Green
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: "arn:aws:ecs:region:account:task-definition/web-app:2"
        LoadBalancerInfo:
          ContainerName: "web-app"
          ContainerPort: 3000
Hooks:
  - BeforeInstall: "LambdaFunctionBeforeInstall"
  - AfterInstall: "LambdaFunctionAfterInstall"
  - BeforeAllowTraffic: "LambdaFunctionBeforeAllowTraffic"
  - AfterAllowTraffic: "LambdaFunctionAfterAllowTraffic"
```

```javascript
// Lambda function for traffic shifting
const AWS = require('aws-sdk');
const elbv2 = new AWS.ELBv2();

exports.handler = async (event) => {
    const listenerArn = process.env.LISTENER_ARN;
    const targetGroupArn = process.env.TARGET_GROUP_ARN;
    
    try {
        // Update listener to point to new target group
        await elbv2.modifyListener({
            ListenerArn: listenerArn,
            DefaultActions: [{
                Type: 'forward',
                TargetGroupArn: targetGroupArn
            }]
        }).promise();
        
        return { statusCode: 200 };
    } catch (error) {
        console.error('Error updating listener:', error);
        throw error;
    }
};
```

### 🎯 Canary Deployment

```yaml
# ECS Service with Canary Deployment
{
  "serviceName": "web-app",
  "deploymentConfiguration": {
    "deploymentCircuitBreaker": {
      "enable": true,
      "rollback": true
    },
    "maximumPercent": 200,
    "minimumHealthyPercent": 50
  },
  "deploymentController": {
    "type": "EXTERNAL"
  },
  "capacityProviderStrategy": [
    {
      "capacityProvider": "FARGATE",
      "weight": 1
    }
  ],
  "platformVersion": "LATEST"
}
```

```python
# Python script for canary deployment
import boto3
import time

class CanaryDeployment:
    def __init__(self, cluster, service):
        self.ecs = boto3.client('ecs')
        self.cloudwatch = boto3.client('cloudwatch')
        self.cluster = cluster
        self.service = service
        
    def deploy_canary(self, new_task_def, canary_percentage=10):
        """Deploy new version to canary percentage"""
        
        # Get current service info
        service_info = self.ecs.describe_services(
            cluster=self.cluster,
            services=[self.service]
        )['services'][0]
        
        current_count = service_info['desiredCount']
        canary_count = max(1, int(current_count * (canary_percentage / 100)))
        
        # Update service with new task definition
        self.ecs.update_service(
            cluster=self.cluster,
            service=self.service,
            taskDefinition=new_task_def,
            desiredCount=current_count
        )
        
        # Wait for deployment to stabilize
        self._wait_for_deployment()
        
        # Monitor canary performance
        if self._monitor_canary_performance(duration_minutes=10):
            self._promote_canary()
        else:
            self._rollback_deployment()
    
    def _monitor_canary_performance(self, duration_minutes=10):
        """Monitor canary deployment metrics"""
        end_time = time.time() + (duration_minutes * 60)
        
        while time.time() < end_time:
            # Check error rate
            error_rate = self._get_metric('ErrorRate', 'Average')
            response_time = self._get_metric('ResponseTime', 'Average')
            
            if error_rate > 5.0:  # 5% error rate threshold
                print(f"High error rate: {error_rate}%")
                return False
            
            if response_time > 1000:  # 1 second response time threshold
                print(f"High response time: {response_time}ms")
                return False
            
            time.sleep(30)  # Check every 30 seconds
        
        return True
    
    def _promote_canary(self):
        """Promote canary to 100% traffic"""
        print("Promoting canary to 100%")
        # Implementation for full promotion
    
    def _rollback_deployment(self):
        """Rollback to previous version"""
        print("Rolling back deployment")
        # Implementation for rollback
```

---

## 📊 Monitoring & Observability

### 📈 CloudWatch Integration

```yaml
# CloudWatch Agent Configuration
{
  "agent": {
    "metrics_collection_interval": 30,
    "run_as_user": "ecs-user"
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/app.log",
            "log_group_name": "/ecs/web-app",
            "log_stream_name": "{instance_id}",
            "timezone": "UTC"
          }
        ]
      }
    }
  },
  "metrics": {
    "metrics_collected": {
      "cpu": {
        "measurement": [
          "cpu_usage_idle",
          "cpu_usage_iowait",
          "cpu_usage_user",
          "cpu_usage_system"
        ],
        "metrics_collection_interval": 30
      },
      "disk": {
        "measurement": [
          "used_percent"
        ],
        "metrics_collection_interval": 30,
        "resources": [
          "*"
        ]
      },
      "diskio": {
        "measurement": [
          "io_time"
        ],
        "metrics_collection_interval": 30,
        "resources": [
          "*"
        ]
      }
    }
  }
}
```

### 🔍 Custom Metrics

```javascript
// Custom metrics in application
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch();

class MetricsCollector {
    constructor() {
        this.namespace = 'ECS/WebApp';
    }
    
    async publishMetric(metricName, value, unit = 'Count') {
        const params = {
            Namespace: this.namespace,
            MetricData: [
                {
                    MetricName: metricName,
                    Value: value,
                    Unit: unit,
                    Timestamp: new Date(),
                    Dimensions: [
                        {
                            Name: 'ServiceName',
                            Value: process.env.SERVICE_NAME || 'web-app'
                        },
                        {
                            Name: 'Environment',
                            Value: process.env.NODE_ENV || 'production'
                        }
                    ]
                }
            ]
        };
        
        try {
            await cloudwatch.putMetricData(params).promise();
            console.log(`Published metric: ${metricName} = ${value}`);
        } catch (error) {
            console.error('Error publishing metric:', error);
        }
    }
    
    // Track API response times
    trackApiResponse(endpoint, duration) {
        this.publishMetric(`ApiResponse_${endpoint}`, duration, 'Milliseconds');
    }
    
    // Track error rates
    trackError(errorType) {
        this.publishMetric(`Error_${errorType}`, 1, 'Count');
    }
    
    // Track business metrics
    trackUserAction(action) {
        this.publishMetric(`UserAction_${action}`, 1, 'Count');
    }
}

// Usage in Express app
const metrics = new MetricsCollector();

app.use((req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        metrics.trackApiResponse(req.route?.path || 'unknown', duration);
        
        if (res.statusCode >= 400) {
            metrics.trackError(`HTTP_${res.statusCode}`);
        }
    });
    
    next();
});
```

### 🚨 Alerting Setup

```yaml
# CloudWatch Alarms
Resources:
  HighErrorRateAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: "web-app-high-error-rate"
      AlarmDescription: "High error rate detected"
      MetricName: "ErrorRate"
      Namespace: "ECS/WebApp"
      Statistic: "Average"
      Period: 300
      EvaluationPeriods: 2
      Threshold: 5.0
      ComparisonOperator: "GreaterThanThreshold"
      AlarmActions:
        - !Ref SNSTopicArn
  
  HighResponseTimeAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: "web-app-high-response-time"
      AlarmDescription: "High response time detected"
      MetricName: "ResponseTime"
      Namespace: "ECS/WebApp"
      Statistic: "Average"
      Period: 300
      EvaluationPeriods: 2
      Threshold: 1000
      ComparisonOperator: "GreaterThanThreshold"
      AlarmActions:
        - !Ref SNSTopicArn
```

---

## 💰 Cost Optimization Strategies

### 🎯 Resource Optimization

```yaml
# Auto Scaling Configuration
{
  "serviceName": "web-app",
  "desiredCount": 2,
  "minCapacity": 1,
  "maxCapacity": 10,
  "defaultCapacityProviderStrategy": [
    {
      "capacityProvider": "FARGATE",
      "weight": 1
    },
    {
      "capacityProvider": "FARGATE_SPOT",
      "weight": 1,
      "base": 1
    }
  ],
  "deploymentConfiguration": {
    "maximumPercent": 200,
    "minimumHealthyPercent": 50
  }
}
```

```python
# Cost optimization script
import boto3
import math

class ECSCostOptimizer:
    def __init__(self, cluster_name):
        self.ecs = boto3.client('ecs')
        self.cloudwatch = boto3.client('cloudwatch')
        self.cluster = cluster_name
        
    def optimize_service_scaling(self, service_name):
        """Optimize service scaling based on metrics"""
        
        # Get current metrics
        cpu_utilization = self._get_metric('CPUUtilization', 'Average')
        memory_utilization = self._get_metric('MemoryUtilization', 'Average')
        request_count = self._get_metric('RequestCount', 'Sum')
        
        # Calculate optimal task count
        optimal_count = self._calculate_optimal_tasks(
            cpu_utilization, memory_utilization, request_count
        )
        
        # Update service if needed
        current_service = self.ecs.describe_services(
            cluster=self.cluster,
            services=[service_name]
        )['services'][0]
        
        current_count = current_service['desiredCount']
        
        if abs(optimal_count - current_count) >= 1:
            print(f"Updating {service_name} from {current_count} to {optimal_count}")
            self.ecs.update_service(
                cluster=self.cluster,
                service=service_name,
                desiredCount=optimal_count
            )
    
    def _calculate_optimal_tasks(self, cpu, memory, requests):
        """Calculate optimal number of tasks based on metrics"""
        
        # Base calculation on CPU utilization
        cpu_based = math.ceil(cpu / 70)  # Target 70% CPU utilization
        
        # Adjust for memory utilization
        memory_based = math.ceil(memory / 80)  # Target 80% memory utilization
        
        # Adjust for request count (assuming each task handles 100 req/min)
        request_based = math.ceil(requests / 6000)  # 100 req/min per task
        
        # Take the maximum of all calculations
        optimal = max(cpu_based, memory_based, request_based, 1)
        
        return min(optimal, 10)  # Cap at 10 tasks for cost control
    
    def _get_metric(self, metric_name, statistic, period=300):
        """Get CloudWatch metric"""
        
        response = self.cloudwatch.get_metric_statistics(
            Namespace='AWS/ECS',
            MetricName=metric_name,
            Dimensions=[
                {
                    'Name': 'ServiceName',
                    'Value': self.service_name
                },
                {
                    'Name': 'ClusterName',
                    'Value': self.cluster
                }
            ],
            StartTime=datetime.utcnow() - timedelta(minutes=10),
            EndTime=datetime.utcnow(),
            Period=period,
            Statistics=[statistic]
        )
        
        datapoints = response['Datapoints']
        if datapoints:
            return datapoints[-1][statistic]
        
        return 0
```

### 💡 Spot Instance Strategy

```yaml
# Mixed Instance Policy
{
  "capacityProviderStrategy": [
    {
      "capacityProvider": "FARGATE",
      "weight": 1,
      "base": 1  # Always keep 1 FARGATE task for stability
    },
    {
      "capacityProvider": "FARGATE_SPOT",
      "weight": 3  # Use 3x more spot instances for cost savings
    }
  ]
}
```

---

## 🔧 Advanced Configuration

### 🌐 Networking Patterns

```yaml
# VPC Configuration for ECS
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: ecs-vpc
  
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: public-subnet-1
  
  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: false
      Tags:
        - Key: Name
          Value: private-subnet-1
  
  SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: "ECS Task Security Group"
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 3000
          ToPort: 3000
          SourceSecurityGroupId: !Ref LoadBalancerSecurityGroup
```

### 🔐 Security Best Practices

```yaml
# IAM Roles for ECS Tasks
Resources:
  ECSTaskExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
      Policies:
        - PolicyName: SecretsManagerAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - secretsmanager:GetSecretValue
                Resource: !Sub "arn:aws:secretsmanager:${AWS::Region}:${AWS::AccountId}:secret:*"
  
  ECSTaskRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: S3Access
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - s3:GetObject
                  - s3:PutObject
                Resource: !Sub "arn:aws:s3:::${BucketName}/*"
```

---

## 🎯 Quick Reference

### 📋 Implementation Checklist

#### **🐳 Docker Optimization**
- [ ] **Multi-stage builds** to reduce image size
- [ ] **Base image selection** based on use case
- [ ] **Layer optimization** for better caching
- [ ] **Security hardening** with non-root users
- [ ] **Health checks** for container monitoring
- [ ] **Resource limits** to prevent resource abuse

#### **🏰 ECS Configuration**
- [ ] **Task definitions** with proper resource allocation
- [ ] **Service discovery** with Cloud Map
- [ ] **Networking setup** with VPC and security groups
- [ ] **IAM roles** with least privilege principle
- [ ] **Logging configuration** with CloudWatch
- [ ] **Auto scaling** policies for cost optimization

#### **🚀 Deployment Strategy**
- [ ] **Blue-green deployment** setup
- [ ] **Canary deployment** configuration
- [ ] **Health checks** and monitoring
- [ ] **Rollback procedures** for failures
- [ ] **Traffic shifting** automation
- [ ] **Performance monitoring** during deployment

### 🔑 Key Commands

```bash
# Build optimized Docker image
docker build --target production -t app:latest .

# Push to ECR
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-west-2.amazonaws.com
docker tag app:latest 123456789012.dkr.ecr.us-west-2.amazonaws.com/app:latest
docker push 123456789012.dkr.ecr.us-west-2.amazonaws.com/app:latest

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Update service
aws ecs update-service --cluster my-cluster --service my-service --task-definition my-task:1

# Scale service
aws ecs update-service --cluster my-cluster --service my-service --desired-count 5
```

### ⚠️ Common Pitfalls

- **❌ Large image sizes** from unnecessary dependencies
- **❌ Missing health checks** leading to unhealthy services
- **❌ Incorrect resource allocation** causing performance issues
- **❌ No monitoring** making debugging difficult
- **❌ Poor networking configuration** blocking communication
- **❌ Missing rollback procedures** for failed deployments

---

*This playbook is part of the BeaconOfTech series. For more insights on container orchestration, check out our guides on gRPC implementation and real-time WebSocket architecture.*
