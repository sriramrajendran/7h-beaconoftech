# Advanced Docker & ECS Deployment Patterns

> *"Containers are not just about packaging—they're about building portable, scalable systems."*  
> *Master Docker optimization and ECS deployment for production workloads.*

---

## 🎯 Overview

Docker and Amazon ECS form a powerful combination for containerized applications. This playbook covers advanced Docker optimization techniques, ECS architecture patterns, deployment strategies, and cost optimization approaches that I've learned from running production workloads at scale. We'll dive deep into multi-stage builds, networking patterns, and monitoring setups that actually work in the real world.

---

## Advanced Docker Patterns

### Multi-Stage Builds

Multi-stage builds are one of the most powerful techniques for optimizing Docker images. I've seen teams cut their image sizes by 70% just by implementing this pattern. The key is separating build-time dependencies from runtime dependencies, which is crucial for production deployments where image size directly impacts deployment speed and security.

Here's a practical example of a multi-stage Dockerfile for a Node.js application:

<details>
<summary>🔍 View Multi-Stage Dockerfile</summary>

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

**Key Points:**
- Multi-stage builds reduce final image size
- Non-root user for security
- Health checks for container monitoring
- Production environment variables
- Security audit fixes
- Proper file permissions

</details>

### ⚡ Image Optimization Techniques

#### **🔧 Base Image Selection**

| Base Image | Size | Use Case | Pros | Cons |
|------------|------|----------|------|------|
| **alpine** | ~5MB | Production | Minimal size | Limited packages |
| **slim** | ~40MB | Balanced | Good compatibility | Larger than alpine |
| **full** | ~900MB | Development | All tools available | Large size |

### ⚡ Layer Optimization

I learned this the hard way after watching deployment times crawl. The order of your layers matters more than you'd think. Here's what works based on my experience:

<details>
<summary>🔍 View Docker Layer Optimization</summary>

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

**Key Points:**
- Order layers from least to most frequently changed
- Combine related operations in single layers
- Clean up in same RUN command to reduce image size
- Leverage Docker layer caching for faster builds
- Minimize the number of layers

</details>

### 🔒 Security Hardening

Security in containers is non-negotiable. I've seen too many production breaches from basic security mistakes. Here's my security-first approach:

<details>
<summary>🔍 View Security-Focused Dockerfile</summary>

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

**Key Points:**
- Non-root user execution
- Minimal attack surface
- Secure file permissions
- Read-only filesystem where possible
- Capability dropping for enhanced security
- Proper cleanup of build artifacts

</details>

---

## 🏰 ECS Architecture Deep Dive

### 🏗️ ECS Components Overview

ECS can seem overwhelming at first, but it's actually quite straightforward once you understand the components. Let me break down what you need to know for production deployments:

<details>
<summary>🔍 View ECS Task Definition</summary>

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

**Key Points:**
- Fargate serverless compute engine
- Proper resource allocation (CPU/Memory)
- IAM role configuration for permissions
- Secrets Manager integration for sensitive data
- CloudWatch logging configuration
- Health checks for container monitoring
- Resource limits and ulimits for stability

</details>

### 🌐 Service Discovery Patterns

Service discovery is crucial when you have multiple services talking to each other. I've tried several approaches, and here's what actually works in production:

<details>
<summary>🔍 View ECS Service Discovery Configuration</summary>

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

**Key Points:**
- Cloud Map service discovery integration
- Private VPC configuration for security
- Health check grace period for deployment stability
- CodeDeploy controller for blue-green deployments
- Service registry for automatic DNS registration

</details>

#### **🌍 Cloud Map Service Discovery**

<details>
<summary>🔍 View Cloud Map Service Discovery Setup</summary>

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

**Key Points:**
- Private DNS namespace creation
- Service registration with health checking
- Instance attribute management
- TTL configuration for DNS caching
- Multi-value routing for load balancing

</details>

---

## Advanced Deployment Strategies

### Blue-Green Deployment

Blue-green deployments have saved me from production disasters more times than I can count. Here's how I implement them with ECS:

<details>
<summary>🔍 View Blue-Green Deployment Configuration</summary>

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

**Key Points:**
- Zero-downtime deployments with traffic shifting
- Lambda hooks for deployment automation
- Load balancer configuration for traffic routing
- Pre and post-deployment validation
- Automatic rollback capabilities

</details>

### Canary Deployment

Canary deployments let me test new versions with minimal risk. I use this pattern when I'm introducing major changes or performance improvements:

<details>
<summary>🔍 View Canary Deployment Implementation</summary>

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

**Key Points:**
- Gradual traffic shifting with canary deployments
- Performance monitoring during deployment
- Automatic rollback on failure detection
- Circuit breaker for deployment protection
- External deployment controller for custom logic

</details>

---

## Monitoring & Observability

### CloudWatch Integration

Monitoring is non-negotiable in production. Here's how I set up comprehensive monitoring for my ECS services:

<details>
<summary>🔍 View CloudWatch Agent Configuration</summary>

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

**Key Points:**
- Comprehensive metrics collection (CPU, disk, disk I/O)
- Structured log collection with proper grouping
- Configurable collection intervals
- Resource-specific monitoring
- ECS user permissions for security

</details>

### 🔍 Custom Metrics

CloudWatch is great, but sometimes you need application-specific metrics. Here's how I add custom metrics that actually matter for business intelligence:

<details>
<summary>🔍 View Custom Metrics Implementation</summary>

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

**Key Points:**
- Application-level metrics for business intelligence
- API performance tracking
- Error rate monitoring
- Automatic timestamp and dimension management
- Integration with Express middleware

</details>

### 🚨 Alerting Setup

Alerts are your early warning system. I've set up these patterns to catch issues before they impact users:

<details>
<summary>🔍 View CloudWatch Alarms Configuration</summary>

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

**Key Points:**
- Automated alerting for critical metrics
- Configurable thresholds and evaluation periods
- SNS integration for notification delivery
- Multiple alarm types for comprehensive monitoring
- Proper alarm descriptions for clarity

</details>

---

## Cost Optimization Strategies

### Resource Optimization

I've saved thousands of dollars in cloud costs by being smart about resource allocation. Here's my approach:

<details>
<summary>🔍 View Auto Scaling Configuration</summary>

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

**Key Points:**
- Auto scaling based on actual metrics
- Fargate Spot instances for cost savings
- CPU, memory, and request-based scaling
- Automated optimization with safety caps
- Real-time metric analysis

</details>

### 💡 Spot Instance Strategy

Spot instances can save you up to 70% on compute costs. I use this mixed strategy to balance cost and reliability:

<details>
<summary>🔍 View Mixed Instance Policy Configuration</summary>

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

**Key Points:**
- Fargate Spot instances offer significant cost savings (up to 70%)
- Mixed strategy balances cost and reliability
- Base FARGATE tasks ensure service stability
- Weighted distribution for optimal cost-performance ratio
- Automatic handling of Spot instance interruptions

</details>

---

## 🔧 Advanced Configuration

### 🌐 Networking Patterns

<details>
<summary>🔍 View VPC Configuration for ECS</summary>

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

**Key Points:**
- Proper VPC setup with public and private subnets
- Security groups for ECS service
- DNS support enabled for service discovery
- Private subnet for database/security
- Proper availability zone distribution

</details>

### 🔐 Security Best Practices

<details>
<summary>🔍 View IAM Roles for ECS Tasks</summary>

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

**Key Points:**
- Separate roles for task execution and task operations
- Least privilege principle applied
- Secrets Manager access for sensitive data
- S3 access with specific bucket scope
- Proper IAM role trust relationships

</details>

---

## Quick Reference

### Implementation Checklist

For Docker optimization, implement multi-stage builds to reduce image size and select base images based on your specific use case. Optimize layers for better caching and implement security hardening with non-root users. Add health checks for container monitoring and set resource limits to prevent resource abuse.

For ECS configuration, create task definitions with proper resource allocation and set up service discovery with Cloud Map. Configure networking with VPC and security groups, and establish IAM roles following the least privilege principle. Set up logging configuration with CloudWatch and implement auto scaling policies for cost optimization.

For deployment strategy, set up blue-green deployment and configure canary deployment options. Implement health checks and monitoring, establish rollback procedures for failures, automate traffic shifting, and add performance monitoring during deployment.

### Key Commands

<details>
<summary>🔍 View Essential Docker & ECS Commands</summary>

```bash
# Build optimized Docker image
docker build --target production -t app:latest .

# Push to ECR
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-west-2.amazonaws.com
docker tag app:latest 123456789012.dkr.ecr.us-west-2.amazonaws.com/app:latest
docker push 123456789012.dkr.ecr.us-west-2.amazonaws.com/app:latest

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service \
  --cluster my-cluster \
  --service-name my-service \
  --task-definition my-task:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345,subnet-67890],securityGroups=[sg-12345],assignPublicIp=DISABLED}"

# Update service
aws ecs update-service --cluster my-cluster --service my-service --desired-count 5

# Scale service
aws ecs update-service --cluster my-cluster --service my-service --desired-count 5
```

**Key Points:**
- Multi-stage Docker builds for optimization
- ECR authentication and image management
- Task definition registration
- Service creation with Fargate
- Network configuration for security
- Service scaling operations

</details>

### Common Pitfalls

Watch out for oversized Docker images that slow down deployments. Improper resource allocation leads to performance issues or wasted costs. Missing health checks cause silent failures. Poor networking configuration creates connectivity problems. Inadequate monitoring leaves you blind to issues. Weak security practices expose your applications to vulnerabilities.

Other common issues include large image sizes from unnecessary dependencies, missing health checks leading to unhealthy services, incorrect resource allocation causing performance issues, no monitoring making debugging difficult, poor networking configuration blocking communication, and missing rollback procedures for failed deployments.

---

*This playbook is part of the BeaconOfTech series. For more insights on container orchestration, check out our guides on gRPC implementation and real-time WebSocket architecture.*
