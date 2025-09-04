export interface Rule {
  ruleType: number;
  id: string;
  isActive: boolean;
  createAt: string;
  createUserName: string;
  updateAt: string | null;
  updateUserName: string | null;
  isDeleted: boolean;
  deleteAt: string | null;
}

export interface ProductRule {
  productId: string;
  productName: string;
  sellerName: string;
  rules: Rule[];
}

export interface GetAllRulesResponse {
  data: ProductRule[];
  errorMessages: string[];
  isSuccessful: boolean;
  statusCode: number;
}

export interface CreateRuleRequest {
  ruleType: number;
  productId: string;
}

export interface CreateRuleResponse {
  data: string;
  errorMessages: string[] | null;
  isSuccessful: boolean;
  statusCode: number;
}
