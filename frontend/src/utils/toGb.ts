export function bitsToGb(bits: number) {
  return Math.floor((bits / 1_073_741_824) * 100) / 100;
}
