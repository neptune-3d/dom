export function uniqueId(): string {
  return `${Date.now().toString(36)}-${(counter++).toString(36)}`;
}

let counter = 0;

export function camelToKebab(prop: string): string {
  return prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
