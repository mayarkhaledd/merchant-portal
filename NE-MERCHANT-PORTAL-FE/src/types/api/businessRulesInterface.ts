import { ResponseInterface } from "./responseInterface";

export interface CreateBusinessRulePayload {
  action?: {
    actionCode?: string;
    actionStatus?: string;
    actionType?: string;
    activeEndDate?: string;
    activeStartDate?: string;
    conditionFormula?: string;
    notificationConfiguration?: {
      notificationConfigurationCode?: string;
      status?: string;
      variableName?: string;
      variableValue?: string;
    }[];
    notificationEventCode?: string;
    order?: number;
    pointExpirationPeriod?: number;
    pointRules?: {
      activeEndDate?: string;
      activeStartDate?: string;
      conditionFormula?: string;
      isDefault?: string;
      pointRuleCode: string; // Required
      pointRuleOrder?: number;
      pointRuleStatus?: string;
      pointsFormulaType?: string;
      pointsValue?: number;
      pointsValueFormula?: string;
    }[];
    pointType?: number;
  };
  partyCode?: string;
  productCode?: string;
  productEventCode?: string;
}
export interface CreateBusinessRuleResponse extends ResponseInterface<object> {}

export interface GetBusinessRulePayload {
  actionCode: string;
}
export interface GetBusinessRuleResponse
  extends ResponseInterface<{
    actionType?: string;
    activeStartDate?: string;
    conditionFormula?: string;
    actionStatus?: string;
    pointRules?: {
      activeStartDate?: string;
      conditionFormula?: string;
      isDefault?: string;
      pointRuleCode?: string;
      pointsFormulaType?: string;
      activeEndDate?: string;
      pointsValue?: number;
      pointRuleStatus?: string;
      pointsValueFormula?: string;
    }[];
    notificationConfiguration?: {
      notificationConfigurationCode?: string;
      variableName?: string;
      variableValue?: string;
      status?: string;
    }[];
    pointExpirationPeriod?: number;
    actionCode?: string;
    activeEndDate?: string;
    notificationEventCode?: string;
    order?: number;
  }> {}

export interface UpdateBusinessRulePayload extends CreateBusinessRulePayload {
  actionCode: string;
}
export interface UpdateBusinessRuleResponse extends ResponseInterface<object> {}
