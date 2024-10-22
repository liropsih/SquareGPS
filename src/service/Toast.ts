import i18n from "@/plugins/i18n";
import { toast } from "vuetify-sonner";

export const onError = (message: string) =>
  toast.error(message, {
    action: {
      label: i18n.global.t("toast.close"),
      onClick: () => toast.dismiss(),
    },
  });
