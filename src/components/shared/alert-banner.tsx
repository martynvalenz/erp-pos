import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ReactNode } from "react";

const AlertBanner = ({
  title,
  description,
  variant = "default",
}: {
  title: string;
  description?: ReactNode;
  variant?: "default" | "destructive" | "info" | "warning" | "success";
}) => {
  return (
    <Alert variant={variant}>
      <CircleAlert />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default AlertBanner;
