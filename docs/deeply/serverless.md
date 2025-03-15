# serverless

优势：

1. 开发者无需关心服务器运维，nodejs版本，操作系统环境，arm/x86架构等问题，只需关心代码逻辑。
2. 按量计费：调用次数 *计算时间* 内存大小。
3. 高性能，高并发（自动扩容），高可用（多可用区部署），高安全（权限控制 role vpc 安全组）。
4. 快速迭代：3天 => 5分钟 => 2分钟。
5. 生态健全：日志 监控 开箱即用，版本控制，CI CD, 数据库，静态资源存储
   1. 框架支持：express koa nestjs nextjs
6. 边缘部署

缺点：

1. 冷启动：第一次调用时，需要加载运行环境，会有一定的延迟 nodejs（800ms）。
2. 限制：最大执行时间 15分钟，内存 128MB-10GB，如何解决15分钟限制（分批处理 step function，异步调用）。
3. 强关联云厂商

## 应用场景

1. SSR
2. API（restful，graphql）
3. 前端的 错误性能 监控日志系统：serverless sqs kafka elk sql s3
4. 图片压缩 格式转换：<https://aws.amazon.com/cn/blogs/networking-and-content-delivery/image-optimization-using-amazon-cloudfront-and-aws-lambda/>
<https://github.com/aws-samples/lambda-edge-resizing-images-custom-origin>
5. AI gitlab codereview
   1. mr open to master webhook => api gateway => proxy lambda => nestjs lambda => aws bedrock
                                          aws-sdk invoke

## 服务厂商

1. aws：lambda，step function（所有语言都支持，自定义容器 docker）；lambda@edge（python，js）
2. cloudflare worker：js
3. google Cloud Function
4. 阿里云：FC / SAE / EdgeRoutine
5. 腾讯云
6. 华为云

## AWS

1. lambda：函数计算
2. api gateway
3. AWS WAF：web 应用防火墙
4. cloudfront：CDN
5. s3：对象存储
6. cloudwatch：监控 日志
7. codepipeline：CI CD

<https://aws.amazon.com/blogs>
<https://www.uber.com/en-IN/blog/engineering/>
<https://netflixtechblog.medium.com/>
cloudflare blog
enginneing at meta
apple tech blog
slack engineering blog

CI CD：
如何创建aws 云上资源

1. SAM：serverless application model: sam build; sam deploy  ./template.yaml
2. cloudformation：配置类型
3. CDK：cloud development kit：typescript python java c# c++, pnpm build, cdk deploy
4. terraform 跨云
