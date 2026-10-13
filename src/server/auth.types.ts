import type { auth } from '@/lib/auth';

export type AuthSession = typeof auth.$Infer.Session;

export type OrganizationMemberContext = {
  id: string;
  organizationId: string;
  userId: string | null;
  member: string;
  isActive: boolean;
};

export type AppVariables = {
  session: AuthSession;
  organizationMember: OrganizationMemberContext;
  userId: string | null;
  userType: string | null;
};

export type AppEnv = {
  Variables: AppVariables;
};
