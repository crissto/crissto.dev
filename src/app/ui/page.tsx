import { Container } from "@/components/Container";
import { FamilyFluidButton } from "@/components/ui/FamilyFluidButton";
import { LinearBlurHero } from "@/components/ui/LinearBlurHero";

export default function Page() {
  return (
    <Container className="mt-9">
      <div className="max-w-6xl flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Family Fluid Button</h1>
            <a
              className="text-zinc-500 hover:text-zinc-600 hover:underline"
              href="https://codesandbox.io/p/sandbox/framer-motion-familys-fluid-button-f68w5h?file=%2Fsrc%2Fstyles.css%3A6%2C1"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeSandbox Link
            </a>
          </div>
          <div>
            <FamilyFluidButton />
          </div>
        </section>
        <hr />
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Linear Blur Hero</h1>
            <p className="text-zinc-500">
              A linear blur hero component that animates in and out of the
              screen.
            </p>
            <a
              className="text-zinc-500 hover:text-zinc-600 hover:underline"
              href="https://codesandbox.io/p/sandbox/vlwkkd?file=%2Fsrc%2Fstyles.css%3A6%2C1"
              target="_blank"
              rel="noopener noreferrer"
            >
              CodeSandbox Link
            </a>
          </div>
          <div>
            <LinearBlurHero />
          </div>
        </section>
      </div>
    </Container>
  );
}
