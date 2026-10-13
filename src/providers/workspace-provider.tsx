"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type WorkspaceContextType = {
  selectedOrganizationId: string | null;
  setSelectedOrganizationId: (id: string | null) => void;
  selectedClinicId: string | null;
  setSelectedClinicId: (id: string | null) => void;
  selectedWorkspaceId: string | null;
  setSelectedWorkspaceId: (id: string | null) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export function WorkspaceProvider({
  initialOrganizationId,
  initialClinicId,
  initialWorkspaceId,
  children,
}: {
  initialOrganizationId: string | null;
  initialClinicId: string | null;
  initialWorkspaceId: string | null;
  children: ReactNode;
}) {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(
    initialOrganizationId,
  );
  const [selectedClinicId, setSelectedClinicId] = useState(initialClinicId);
  const [selectedWorkspaceId, setSelectedWorkspaceId] =
    useState(initialWorkspaceId);

  return (
    <WorkspaceContext.Provider
      value={{
        selectedOrganizationId,
        setSelectedOrganizationId,
        selectedClinicId,
        setSelectedClinicId,
        selectedWorkspaceId,
        setSelectedWorkspaceId,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceProvider() {
  const context = useContext(WorkspaceContext);
  if (!context)
    throw new Error(
      "useWorkspaceProvider must be used within a WorkspaceProvider",
    );
  return context;
}
