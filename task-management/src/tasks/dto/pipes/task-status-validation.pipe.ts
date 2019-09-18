import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // tslint:disable-next-line: no-console
    console.log(value, 'value');
    // tslint:disable-next-line: no-console
    console.log(metadata, 'metadata');
    return value;
  }
}
