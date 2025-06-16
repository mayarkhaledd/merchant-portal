// Remove empty values from an object
export function removeEmptyValues(data: object) {
  if (!data) return;
  return Object.entries(data)
    .filter(([value]) => {
      return value !== "";
    })
    .reduce((acc: { [key: string]: string }, [key, value]) => {
      acc[key as string] = value as string;
      return acc;
    }, {});
}
