export const OrganizationStatus = {
  active: 'active',
  archived: 'archived',
  trial: 'trial',
  suspended: 'suspended',
  pending: 'pending',
  paused: 'paused',
} as const;

export type OrganiationStatus =
  (typeof OrganizationStatus)[keyof typeof OrganizationStatus];

export const OrganizationStatuses = Object.values(
  OrganizationStatus,
) as [OrganiationStatus, ...OrganiationStatus[]];
