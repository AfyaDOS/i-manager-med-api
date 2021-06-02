export function compareKeys(a: Record<any, any>, b: Record<any, any>) {
  return new Promise((resolve, reject) => {
    let aKeys = Object.keys(a).sort();
    let bKeys = Object.keys(b).sort();
    let missingKeys: string[] = [];

    console.log(JSON.stringify(a))

    if (aKeys.length !== bKeys.length) {
      Object.keys(aKeys).forEach((key, index) => {
        if (!Object.keys(bKeys)[index]) {
          missingKeys.push(key);
        }
      });
      return reject(
        new Error(`Dados ausentes, ${JSON.stringify(missingKeys)}`),
      );
    }

    if (JSON.stringify(aKeys) === JSON.stringify(bKeys)) {
      return resolve(true);
    }

    return reject(new Error('Dados não esperados.'));
  });
}
