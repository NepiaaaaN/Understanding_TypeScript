// Validation
export interface Validatable {
  value: string | number;
  // 必須か判断
  required?: boolean;
  // 最小文字数
  minLength?: number;
  // 最大文字数
  maxLength?: number;
  // 最小値
  min?: number;
  // 最大値
  max?: number;
}

export const validate = (validatableInput: Validatable) => {
  let isValid = true;
  // 必須チェック
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // 最小文字数チェック
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  // 最大文字数チェック
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  // 最小値チェック
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  // 最大値チェック
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
};
