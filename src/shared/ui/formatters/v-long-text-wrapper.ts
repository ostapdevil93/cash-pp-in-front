import { CellComponent, UniversalFormatter, VLongText } from '@ebp/vue-ui-lib';
import { h } from 'vue';
import { generateUid } from '@ebp/utils';

export function VLongTextWrapper(cell: CellComponent) {
  const val = cell.getValue();
  const id = generateUid();
  return UniversalFormatter(h(VLongText, {
    value: val,
    column: cell.getColumn(),
    elementId: id,
  }));
}

export function VLongTextCreator(params?: Partial<InstanceType<typeof VLongText>['$props']>) {
  return (cell: CellComponent) => {
    const val = cell.getValue();
    const id = generateUid();
    return UniversalFormatter(h(VLongText, {
      value: val,
      column: cell.getColumn(),
      elementId: id,
      ...params,
    }));
  };
}
