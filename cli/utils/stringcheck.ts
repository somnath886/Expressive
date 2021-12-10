export default function stringCheck(value: string) {
  return value.length > 0 && value.length < 15 && value.match(/[a-z]/i);
}
