import 'source-map-support/register'

import * as AWS from 'aws-sdk'
import * as config from './infra-config'

const RDS = new AWS.RDS()
const ECS = new AWS.ECS()
const AutoScaling = new AWS.AutoScaling()

export const shutdown = async (): Promise<any> => {
  return Promise.all([
    Promise.all(
      config.rdsClusterIds.map(id =>
        RDS.stopDBCluster({ DBClusterIdentifier: id })
          .promise()
          .catch(error => {
            console.error(`Could not shut down RDS cluster ${id}`, error)
          }),
      ),
    ),

    Promise.all(
      config.ecsServices.map(service =>
        ECS.updateService({ ...service, desiredCount: 0 })
          .promise()
          .catch(error => {
            console.error(`Could not ramp down ECS service ${service.service}`, error)
          }),
      ),
    ),

    Promise.all(
      config.autoScalingGroups.map(asg =>
        AutoScaling.updateAutoScalingGroup({ ...asg, DesiredCapacity: 0, MinSize: 0 })
          .promise()
          .catch(error => {
            console.error(`Could not ramp down ASG ${asg.AutoScalingGroupName}`, error)
          }),
      ),
    ),
  ])
}

export const startup = async (): Promise<any> => {
  return Promise.all([
    Promise.all(
      config.rdsClusterIds.map(id =>
        RDS.startDBCluster({ DBClusterIdentifier: id })
          .promise()
          .catch(error => {
            console.error(`Could not start RDS cluster ${id}`, error)
          }),
      ),
    ),

    Promise.all(
      config.ecsServices.map(service =>
        ECS.updateService(service)
          .promise()
          .catch(error => {
            console.error(`Could not ramp up ECS service ${service}`, error)
          }),
      ),
    ),

    Promise.all(
      config.autoScalingGroups.map(asg =>
        AutoScaling.updateAutoScalingGroup(asg)
          .promise()
          .catch(error => {
            console.error(`Could not ramp up ASG ${asg.AutoScalingGroupName}`, error)
          }),
      ),
    ),
  ])
}
