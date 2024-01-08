import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertVariant = "success" | "default" | "destructive" | "warning";

export function AlertComponent({
  title = "",
  description = "",
  variant = "default" as AlertVariant,
}) {
  let icon = null;
  switch (variant) {
    case "success":
      icon = <CheckCircle className="h-4 w-4" />;
      break;
    case "warning":
      icon = <AlertTriangle className="h-4 w-4" />;
      break;
    case "destructive":
      icon = <AlertCircle className="h-4 w-4" />;
      break;
  }

  return (
    <Alert variant={variant}>
      {icon}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
