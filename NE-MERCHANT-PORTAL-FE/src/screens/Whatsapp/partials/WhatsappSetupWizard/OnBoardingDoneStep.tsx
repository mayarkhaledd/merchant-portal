import React from "react";
import { Card, CardContent } from "@ejada/common/components/ui/card";
import { CheckCircle } from "lucide-react";

export const OnBoardingDoneStep: React.FC = () => (
  <Card className="max-w-3xl mx-auto border-2 border-[#e2e8f0] bg-[#f0fdf4]">
    <CardContent className="p-8 space-y-6 text-center">
      <CheckCircle className="h-16 w-16 text-[#22c55e] mx-auto" />
      <h2 className="text-2xl font-semibold text-[#22c55e]">All Done!</h2>
      <p className="text-[#166534]">
        Your WhatsApp Business Account is fully connected and ready to use.
      </p>
    </CardContent>
  </Card>
);
