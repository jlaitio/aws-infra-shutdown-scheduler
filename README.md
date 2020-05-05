# AWS Infrastructure shutdown scheduler

A simple scheduler to shut down and start up AWS infrastructure on a recurring scheduler using Serverless framework. Can be used to mitigate running costs on off hours.

Supported types of infrastructure:
- ECS service capacity (i.e. Fargate containers)
- RDS clusters
- Autoscaling group capacity

## Usage

1. Clone/fork the repository
2. Add necessary stack configuration in `serverless.yml` (such as VPC/subnet details if you cannot use the default VPC)
3. Modify cron timer defaults in `serverless.yml` (default: startup at 03 UTC MON-FRI and shutdown 18 UTC MON-FRI)
4. Rename `infra-config-example.ts` -> `infra-config.ts`
5. Configure your infrastructure details in `infra-config.ts`. Set `desiredCount`, `DesiredCapacity` and `MinSize` as the regular running values - the shutdown is going to set these to zero, and the startup back to the configured values.
6. `npm install`
7. Login into your AWS profile in your shell
8. `sls deploy`

If you want to manually start / shutdown the infrastructure (say, for working on something critical on a weekend) you can manually invoke the functions:

Start: `sls invoke -f startup`
Shutdown: `sls invoke -f shutdown`