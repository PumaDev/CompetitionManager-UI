export function formatLowUpperProperties(obj: any, propertyName: string): string {
  const lower = obj[`lower${propertyName}`];
  const upper = obj[`upper${propertyName}`];
  if (!!lower && !!upper) {
    return `${lower}-${upper}`;
  } else if (!!lower && !upper) {
    return `${lower}+`
  } else if (!lower && !!upper) {
    return `-${upper}`
  } else {
    return '';
  }

}
