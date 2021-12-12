export interface FormDTO {
  title: string;
  description: string;
  formCode: string;
  steps: StepDTO[];
}

export interface StepDTO {
  id: string;
  title: string;
  type: 'GROUP' | 'ARRAY' | '';
  sections: SectionDTO[];
}

export interface SectionDTO {
  id: string;
  title: string;
  fields: FieldDTO[];
}

export interface FieldDTO {
  id: string;
  type: string;
  config: ConfigDTO;
  validators?: ValidatorDTO;
  rules?: RuleDTO[];
  enabled?: boolean;
}

export interface ConfigDTO {
  label: string;
  placeholder: string;
  value: string | number | boolean;
  options: OptionsDTO[];
  type: string;
}

export interface OptionsDTO {
  value: string;
  label: string;
}

export interface ValidatorDTO {
  required: boolean;
  requiredTrue: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: PatternDTO[];
  email?: boolean;
}

export interface PatternDTO {
  regex: string;
  error: string;
}

export interface RuleDTO {
  ruleType: string;
  dependentFieldCode: string[];
  strategyToCompare: string;
  valuesToCompare: string[];
}

//   {
//     "id": "",
//     "type": "",
//     "options": {
//       "label": "",
//       "placeholder": "",
//       "type": "",
//       "value": "",
//       "options": {
//         "id": "",
//         "value": ""
//       }
//     },
//     "validators": {
//       "readOnly": false,
//       "required": true,
//       "email": true,
//       "min": 10,
//       "max": 25,
//       "minLength": 20,
//       "maxLength": 30,
//       "patterns": [
//         {
//           "pattern": "",
//           "patternError": ""
//         }
//       ]
//     },
//     "rules": [
//       {
//         "ruleType": "",
//         "dependentFieldCode": [],
//         "strategyToCompare": "",
//         "valuesToCompare": []
//       }
//     ]
//   }
