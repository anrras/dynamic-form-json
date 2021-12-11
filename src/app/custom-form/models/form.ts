export interface FormDTO {
  title: string;
  description: string;
  formCode: string;
  steps: StepDTO[];
}

export interface StepDTO {
  id: string;
  title: string;
  type: 'GROUP' | 'ARRAY';
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
  options: OptionsDTO;
  validators?: ValidatorDTO;
  rules?: RuleDTO[];
}

export interface OptionsDTO {
  label: string;
  placeholder: string;
  value: string | number | boolean;
  options: SelectDTO[];
  type: string;
}

export interface SelectDTO {
  value: string;
  label: string;
}

export interface ValidatorDTO {
  required: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  email?: boolean;
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
