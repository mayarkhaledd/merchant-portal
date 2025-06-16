import { SystemOnboardingModals, SystemOnBoardingNavigation } from "./Partials";
import { SystemOnboardingTable } from "./Partials/SystemOnboardingTable";
import { SystemOnboaringProvider } from "./SystemOnboaringProvider";

export function SystemOnboarding() {
  return (
    <>
      <SystemOnboaringProvider>
        <SystemOnBoardingNavigation />
        <SystemOnboardingModals />
        <SystemOnboardingTable />
      </SystemOnboaringProvider>
    </>
  );
}
