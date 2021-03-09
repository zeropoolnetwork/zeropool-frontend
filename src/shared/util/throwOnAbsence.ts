export const throwOnAbsence = (toCheck: any, errorMessage: string) => {
  if (!toCheck) {
    throw Error(errorMessage);
  }
}
