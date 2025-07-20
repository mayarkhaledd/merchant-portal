import { useState } from "react";
import { Button } from "@ejada/common/components/ui/button";
import { Card, CardContent } from "@ejada/common/components/ui/card";
import { Input } from "@ejada/common/components/ui/input";
import { Label } from "@ejada/common/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ejada/common/components/ui/select";
import { Textarea } from "@ejada/common/components/ui/textarea";
import { Badge } from "@ejada/common/components/ui/badge";
import { Alert, AlertDescription } from "@ejada/common/components/ui/alert";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";
import {
  CheckCircle,
  Shield,
  FileText,
  Globe,
  CreditCard,
  Upload,
} from "lucide-react";
export const OnBoardingSecondStep: React.FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    website: "",
    description: "",
    address: "",
    industry: "",
    registrationNumber: "",
  });

  const [documents, setDocuments] = useState({
    businessCertificate: false,
    taxId: false,
    addressProof: false,
  });

  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "reviewing" | "approved"
  >("pending");

  const handleSubmitForReview = () => {
    setVerificationStatus("reviewing");
    setTimeout(() => {
      setVerificationStatus("approved");
    }, 3000);
  };

  return (
    <DesktopStepCard
      title="Business Verification"
      description="Provide your business information for Meta's verification process"
    >
      <div className="space-y-8">
        {verificationStatus === "pending" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Business Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#001081] mb-4">
                  Business Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-[#001081] font-medium">
                      Business Name <span className="text-[#ED696A]">*</span>
                    </Label>
                    <Input
                      placeholder="Your Business Name"
                      value={businessInfo.name}
                      onChange={(e: any) =>
                        setBusinessInfo({
                          ...businessInfo,
                          name: e.target.value,
                        })
                      }
                      className="h-12 border-2 border-[#e2e8f0] rounded-lg"
                    />
                  </div>

                  <div>
                    <Label className="text-[#001081] font-medium">
                      Website URL
                    </Label>
                    <Input
                      placeholder="https://yourbusiness.com"
                      value={businessInfo.website}
                      onChange={(e: any) =>
                        setBusinessInfo({
                          ...businessInfo,
                          website: e.target.value,
                        })
                      }
                      className="h-12 border-2 border-[#e2e8f0] rounded-lg"
                    />
                  </div>

                  <div>
                    <Label className="text-[#001081] font-medium">
                      Industry <span className="text-[#ED696A]">*</span>
                    </Label>
                    <Select
                      value={businessInfo.industry}
                      onValueChange={(value: any) =>
                        setBusinessInfo({ ...businessInfo, industry: value })
                      }
                    >
                      <SelectTrigger className="h-12 border-2 border-[#e2e8f0] rounded-lg">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-[#001081] font-medium">
                      Registration Number{" "}
                      <span className="text-[#ED696A]">*</span>
                    </Label>
                    <Input
                      placeholder="Business registration number"
                      value={businessInfo.registrationNumber}
                      onChange={(e: any) =>
                        setBusinessInfo({
                          ...businessInfo,
                          registrationNumber: e.target.value,
                        })
                      }
                      className="h-12 border-2 border-[#e2e8f0] rounded-lg"
                    />
                  </div>

                  <div>
                    <Label className="text-[#001081] font-medium">
                      Business Description{" "}
                      <span className="text-[#ED696A]">*</span>
                    </Label>
                    <Textarea
                      placeholder="Describe your business and what you do..."
                      value={businessInfo.description}
                      onChange={(e: any) =>
                        setBusinessInfo({
                          ...businessInfo,
                          description: e.target.value,
                        })
                      }
                      className="border-2 border-[#e2e8f0] rounded-lg min-h-[120px]"
                    />
                  </div>

                  <div>
                    <Label className="text-[#001081] font-medium">
                      Business Address <span className="text-[#ED696A]">*</span>
                    </Label>
                    <Textarea
                      placeholder="Complete business address"
                      value={businessInfo.address}
                      onChange={(e: any) =>
                        setBusinessInfo({
                          ...businessInfo,
                          address: e.target.value,
                        })
                      }
                      className="border-2 border-[#e2e8f0] rounded-lg min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#001081] mb-4">
                  Required Documents
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      key: "businessCertificate",
                      label: "Business Registration Certificate",
                      icon: FileText,
                      description: "Official business registration document",
                    },
                    {
                      key: "taxId",
                      label: "Tax Identification Document",
                      icon: CreditCard,
                      description: "Tax ID or EIN documentation",
                    },
                    {
                      key: "addressProof",
                      label: "Business Address Proof",
                      icon: Globe,
                      description: "Utility bill or lease agreement",
                    },
                  ].map(({ key, label, icon: Icon, description }) => (
                    <Card
                      key={key}
                      className="border-2 border-[#e2e8f0] hover:border-[#001081] transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <Icon className="w-6 h-6 text-[#001081] mt-1" />
                            <div>
                              <h4 className="font-semibold text-[#001081] mb-1">
                                {label}
                              </h4>
                              <p className="text-sm text-[#59595C] mb-3">
                                {description}
                              </p>
                              {documents[key as keyof typeof documents] && (
                                <Badge className="bg-[#22c55e] text-white">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Uploaded
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant={
                              documents[key as keyof typeof documents]
                                ? "outline"
                                : "default"
                            }
                            onClick={() =>
                              setDocuments({ ...documents, [key]: true })
                            }
                            className={
                              documents[key as keyof typeof documents]
                                ? "border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white"
                                : "bg-[#001081] hover:bg-[#000d5e]"
                            }
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {documents[key as keyof typeof documents]
                              ? "Replace"
                              : "Upload"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Alert className="border-[#001081] bg-[#f8fafc]">
                  <Shield className="h-5 w-5 text-[#001081]" />
                  <AlertDescription className="text-[#001081]">
                    <strong>Review Timeline:</strong> Meta typically takes 1-3
                    business days to review business verification requests.
                    You'll receive an email notification once complete.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleSubmitForReview}
                disabled={
                  !businessInfo.name ||
                  !businessInfo.description ||
                  !Object.values(documents).every(Boolean)
                }
                className="w-full max-w-md h-12 bg-[#001081] hover:bg-[#000d5e] font-medium"
              >
                Submit for Review
              </Button>
            </div>
          </div>
        )}

        {verificationStatus === "reviewing" && (
          <div className="text-center space-y-6 py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#001081] mx-auto"></div>
            <div>
              <h3 className="text-xl font-semibold text-[#001081] mb-2">
                Review in Progress
              </h3>
              <p className="text-[#59595C] max-w-md mx-auto">
                Meta is reviewing your business information. This usually takes
                1-3 business days. We'll send you an email notification once the
                review is complete.
              </p>
            </div>
          </div>
        )}

        {verificationStatus === "approved" && (
          <div className="text-center space-y-6 py-12">
            <CheckCircle className="w-20 h-20 text-[#22c55e] mx-auto" />
            <div>
              <h3 className="text-2xl font-semibold text-[#22c55e] mb-2">
                Business Verified!
              </h3>
              <p className="text-[#166534] max-w-md mx-auto">
                Your business has been successfully verified by Meta. You can
                now proceed to configure your API settings.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-2 border-[#001081] text-[#001081] hover:bg-[#001081] hover:text-white font-medium px-8"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={verificationStatus !== "approved"}
            className="bg-[#001081] hover:bg-[#000d5e] font-medium px-8"
          >
            Continue
          </Button>
        </div>
      </div>
    </DesktopStepCard>
  );
};
