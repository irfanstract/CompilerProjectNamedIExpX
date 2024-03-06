










declare type IKeyIn<out RT extends {}> = keyof RT ;

declare type IValueOf<out RT extends {}> = RT[keyof RT] ;





declare type IRepeatedString1<E> = `${E}` ;

declare type IRepeatedString2<E> = `${E}${"" | IRepeatedString1<E> }` ;

declare type IRepeatedString3<E> = `${E}${"" | IRepeatedString2<E> }` ;

declare type IRepeatedString4<E> = `${E}${"" | IRepeatedString3<E> }` ;

declare type IRepeatedString5<E> = `${E}${"" | IRepeatedString4<E> }` ;








