export interface UseElementHookReturn<C = React.ElementType<unknown>, P = React.ComponentProps<C>> {
  id: string;
  element: React.ReactElement<P>;
  href: string;
  cssId: string;
  props: P;
  ref: React.RefObject<C>;
}