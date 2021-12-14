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
  maskConfig: MaskConfigDTO;
}

export interface ConfigDTO {
  label: string;
  placeholder: string;
  value: string | number | boolean;
  readonly: boolean;
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
  ruleType:
    | 'SHOW' //show/hide
    | 'ENABLED' //TOGGLE ENABLE/DISABLE
    | 'FILTER' //PARA LOS SELECT
    | 'REQUIRED' //VALIDATOR
    | 'BIRTHDAY' //VALIDATOR
    | 'PATRIMONIO'; //VALIDATOR
  dependentFieldCode: string[];
  strategyToCompare: 'VALUE' | 'OR' | 'AND';
  valuesToCompare: string[];
}

export interface MaskConfigDTO {
  mask: string;
  prefix: string;
  suffix: string;
  thousandSeparator: string;
}
