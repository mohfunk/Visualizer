## Tweakable Variables

Tweakable Var
``` ts
let x: Tweakable;
```

## Enums

```ts
// ex.enum.ts
export enum ExEnum {
    Num1 = 0,
    Num2 = 1
}


// ex.ts
import { ExEnum } from './ex.enum.ts'

function test(num: ExEnum): number {
    return num
}

test(ExEnum.Num1);

// retuns 0
```


## Types

```ts
type Ex = { a: number, b: string, c: any};

function test(arg: Ex): string
{
    return Ex.b;
}
```
**Note**: Use Interfaces over types if the types is to be used in a file it
wasnt defined in.



## Classes
