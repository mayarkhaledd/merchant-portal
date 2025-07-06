import { WhatsappOnboardingProps } from "../../Whatsapp.types";

export const OnBoardingSecondStep: React.FC<WhatsappOnboardingProps> = ({
  allDoneFlag,
}) => {
  console.log(allDoneFlag);
  return (
    <h1 className="text-xl font-semibold mb-4">
      All set! Click Finish to start creating your notification templates.
    </h1>
  );
};
