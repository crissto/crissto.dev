import clsx from 'clsx'
import { forwardRef, ForwardRefExoticComponent, HTMLProps } from 'react'

type DivProps = HTMLProps<HTMLDivElement>

type ContainerType = ForwardRefExoticComponent<DivProps> & {
  Outer: typeof OuterContainer,
  Inner: typeof InnerContainer
}

const OuterContainer = forwardRef<HTMLDivElement, DivProps>(function OuterContainer(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

const InnerContainer = forwardRef<HTMLDivElement, DivProps>(function InnerContainer(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

export const Container = forwardRef<HTMLDivElement, DivProps>(function Container(
  { children, ...props },
  ref
) {
  return (
    <OuterContainer ref={ref as any} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  )
}) as ContainerType

Container.Outer = OuterContainer
Container.Inner = InnerContainer
