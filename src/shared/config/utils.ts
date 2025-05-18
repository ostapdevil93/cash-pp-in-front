import { AxiosResponse } from '@ebp/mfe-utils';

export const AUTO_CONTROLS_ERROR_CODE = 422;

/**
 * Принимает объект и тип (в виде интерфейса или типа), и возвращает объект с заполненными недостающими ключами в соответствии с их типами
 */
export function replaceUndefinedWithTemplateValue<T>(obj: Partial<T>, template: T): T {
  const result: any = Array.isArray(template) ? [] : {};

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in template) {
    const templateValue = (template as any)[key];
    const objValue = (obj as any)[key];

    if (objValue === undefined || objValue === null) {
      if (Array.isArray(templateValue)) {
        result[key] = [];
      } else if (templateValue !== null && typeof templateValue === 'object') {
        result[key] = replaceUndefinedWithTemplateValue({}, templateValue);
      } else {
        result[key] = null;
      }
    } else if (
      templateValue !== null
      && typeof templateValue === 'object'
      && !Array.isArray(templateValue)
    ) {
      result[key] = replaceUndefinedWithTemplateValue(objValue, templateValue);
    } else {
      result[key] = objValue;
    }
  }

  return result;
}

/**
 * Считает сумму форматированных чисел
 */
export function sumFormattedNumbers(numbers: any[]): string {
  const sum = numbers.reduce<number>((acc, num) => {
    let parsed;
    if (typeof num === 'number') {
      parsed = num;
    } else if (num === null) {
      parsed = 0;
    } else {
      parsed = parseFloat(num);
    }
    return acc + (isNaN(parsed) ? 0 : parsed);
  }, 0);

  return sum.toFixed(2);
}

/**
 * Проверяет, есть ли сумма
 */
export function hasSumValue(num: any): boolean {
  let parsed;
  if (typeof num === 'number') {
    parsed = num;
  } else if (num === null) {
    parsed = 0;
  } else {
    parsed = parseFloat(num);
  }
  return (isNaN(parsed) ? 0 : parsed) > 0;
}

/**
 * Получает имя файла из заголовка ответа
 */
export const getFilenameFromHeaders = ({ headers }: AxiosResponse<File>) => {
  let filename = 'untitled';
  const disposition = headers['content-disposition'];
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }
  return filename;
};

/**
 * Преобразует тело запроса с поисковой строкой, записанной в виде 'request.searchField': value в объект { request: { searchField: value } }
 */
type AnyObject = Record<string, any>;

export function mergeFlattenedKeys(obj: AnyObject): AnyObject {
  const result: AnyObject = {};

  for (let i1 = 0; i1 < Object.entries(obj).length; i1++) {
    const [flatKey, value] = Object.entries(obj)[i1];
    if (value === '') {
      // eslint-disable-next-line no-continue
      continue;
    }
    const keys = flatKey.split('.');
    if (keys.length === 1) {
      // Если ключ не содержит ".", просто копируем как есть
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Рекурсивно обрабатываем вложенный объект
        result[keys[0]] = mergeFlattenedKeys(value);
      } else {
        result[keys[0]] = value;
      }
    } else {
      // Вложенные ключи
      let current = result;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (i === keys.length - 1) {
          current[key] = value;
        } else {
          if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
          }
          current = current[key];
        }
      }
    }
  }

  return result;
}
