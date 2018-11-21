import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBytimeFiter'
})
export class SortBytimeFiterPipe implements PipeTransform {

  transform(value: any[], args?: boolean): any {
    if(args==true)
    { 
     return value.sort((a:object,b:object):any=>{
       return a['CreateTime']-b['CreateTime'];
   
     })
    }
    else
    {
      return value.sort((a:object,b:object):any=>{
        return b['CreateTime']-a['CreateTime'];
      })
    }
  }

}
