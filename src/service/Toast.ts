import { getLocalizedText } from "@/plugins/i18n";
import { toast } from "vuetify-sonner";

export const onError = (message: string) =>
  toast.error(message, {
    action: {
      label: getLocalizedText("toast.close"),
      onClick: () => toast.dismiss(),
    },
  });
