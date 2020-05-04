export const rdsClusterIds: string[] = [
  'example-databasecluster-cjgj1234b829',
  'example-databasecluster-ba7f1234b829',
]

export const ecsServices: EcsService[] = [
  {
    cluster: 'my-cluster',
    service: 'my-cluster-resService-19NK1239TLLRW',
    desiredCount: 2,
  },
  {
    cluster: 'my-cluster',
    service: 'my-cluster-resService-BB7XZT1232X1',
    desiredCount: 2,
  },
]

export const autoScalingGroups: AutoScalingGroup[] = [
  {
    AutoScalingGroupName: 'my-bastion-asg-resAsg-GF31239SWNI5',
    MinSize: 1,
    DesiredCapacity: 1,
  },
]
