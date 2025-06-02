function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i)
    if (inputRange[i] >= input) break;

  return i - 1;
}

function baseInterpolate(
  input = 0,
  inputMin = 0,
  inputMax = 1,
  outputMin = 0,
  outputMax = 1
) {
  let result = input;

  if (outputMin === outputMax) return outputMin;
  if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax;

  // Input Range
  if (inputMin === -Infinity) result = -result;
  else if (inputMax === Infinity) result = result - inputMin;
  else result = (result - inputMin) / (inputMax - inputMin);

  // Output Range
  if (outputMin === -Infinity) result = -result;
  else if (outputMax === Infinity) result = result + outputMin;
  else result = result * (outputMax - outputMin) + outputMin;

  let clampMin = outputMin;
  let clampMax = outputMax;

  if (outputMax < outputMin) {
    clampMin = outputMax;
    clampMax = outputMin;
  }

  return clamp(result, clampMin, clampMax);
}

function interpolate(input = 0, inputRange = [0, 1], outputRange = [0, 1]) {
  const range = findRange(input, inputRange);

  return baseInterpolate(
    input,
    inputRange[range],
    inputRange[range + 1],
    outputRange[range],
    outputRange[range + 1]
  );
}

export { interpolate };
