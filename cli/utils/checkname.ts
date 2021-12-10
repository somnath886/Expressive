export default function checkName(name: string, obj: any) {
  for (const key in obj) {
    if (name.toUpperCase() === key.split("_")[0].toUpperCase()) {
      return true;
    }
  }
  return false;
}
