import { GetWhatsappOnboardingInterface } from "@ejada/types/api/whatsappInterface";

export interface WhatsappOnboardingContextType {
  params: GetWhatsappOnboardingInterface | null;
  isLoading: boolean;
  isError: boolean;
  refetch: (() => void) | undefined;
}
