export type OrigianlTable = {
  [key: string]: string;
};

export type TransformObject = {
  [key: string]: string;
};

const tranformObject = (data: OrigianlTable): TransformObject => {
  const transformed: TransformObject = {};
  Object.keys(data).forEach((key, i) => {
    transformed[`col_${i}`] = data[key];
  });

  return transformed;
};

export const transformArray = (data: OrigianlTable[]): TransformObject[] => {
  return data.map(tranformObject);
};
