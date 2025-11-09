import axios from '@/utils/axios';
import { RULE_ENDPOINTS } from "../endpoints";
import {
    CreateRuleRequest,
    CreateRuleResponse,
    GetAllRulesResponse
} from '@/utils/types/Rule';


class RuleService {
  async createRule(ruleData: CreateRuleRequest): Promise<CreateRuleResponse> {
    try {
      const response = await axios.post<CreateRuleResponse>(
        RULE_ENDPOINTS.CREATE,
        ruleData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating rule:', error);
      throw error;
    }
  }

  async getAllRules(): Promise<GetAllRulesResponse> {
    try {
      const response = await axios.get<GetAllRulesResponse>(
        RULE_ENDPOINTS.GET_ALL
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching rules:', error);
      throw error;
    }
  }

  async deleteRule(id: string): Promise<{ isSuccessful: boolean; errorMessages?: string[] }> {
    try {
      const response = await axios.delete(`${RULE_ENDPOINTS.DELETE}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting rule:', error);
      throw error;
    }
  }

  // Gelecekte eklenebilecek metodlar için placeholder'lar
  // async getRuleById(id: string): Promise<Rule> { }
  // async updateRule(id: string, ruleData: Partial<Rule>): Promise<Rule> { }
}

export const ruleService = new RuleService();
export default ruleService;
