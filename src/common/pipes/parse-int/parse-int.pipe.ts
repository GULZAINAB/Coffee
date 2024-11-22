import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val =parseInt(value,18);
    if(isNaN(val)){
      throw new BadRequestException(`validation failed."${val}"is not an int`)
    }
    return val;
  }
}
