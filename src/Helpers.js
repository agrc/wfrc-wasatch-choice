export const toQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&')
    .replace(/%20/g, '+');
};

export const replaceAliasesWithFieldNames = (attributeObject, fieldInfos) => {
  const aliasToFieldName = {};
  fieldInfos.forEach((field) => {
    aliasToFieldName[field.alias] = field.name;
  });

  const newAttributes = {};
  Object.keys(attributeObject).forEach((alias) => {
    newAttributes[aliasToFieldName[alias]] = attributeObject[alias];
  });

  return newAttributes;
};
