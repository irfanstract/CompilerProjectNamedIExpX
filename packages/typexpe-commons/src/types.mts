














export interface Ll<out A = unknown>
{}

export interface LlNone extends Ll<never>
{}

export interface LlSome<out A> extends Ll<A>
{
  readonly head: A ;
  readonly tail: Ll<A> ;
}

export type LlItem<S extends Ll> = (
  S extends Ll<infer E> ?
  E : never
)




// export type NondelimitedRepeatString<out V extends string> = Ll ;









