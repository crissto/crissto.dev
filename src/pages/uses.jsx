import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Christian Stoyanov</title>
        <meta
          name="description"
          content="Software I use, gadgets I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Software I use, gadgets I love, and other things I recommend."
        intro="These are the gadgets and software I usually use. I don't have a fancy setup as I have been moving a lot but the setup works for me."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="16” MacBook Pro, M1 Pro, 32GB RAM (2022)">
              {`My work laptop. It's a beast.`}
            </Tool>
            <Tool title="13” MacBook Pro, i7, 32GB RAM (2020)">
              My personal laptop. Probably will update to a M1 in the near
              future.
            </Tool>
            <Tool title="2k 27” Monitor">
              I use a ViewSonic one because it fitted my needs at the time. It
              has USB-C charging which is cool. Will probably update to a better
              one.
            </Tool>
            <Tool title="Macbook Pro Keyboard and Trackpad">
              Yeah, I use the laptop keyboard and trackpad. It fits well my
              setup and I find it really comfy.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="VS Code">
              I have a bunch of extensions and at this point is the editor that
              makes me the fastest. I want to try Fleet and I sometimes use
              other stuff like nvim in the terminal or JetBrains stuff for
              specific Python stuff.
            </Tool>
            <Tool title="iTerm2">
              Not sure what brings vs the normal terminal but I like the minimal
              theme.
            </Tool>
            <Tool title="TablePlus">
              Great software for working with databases. Has saved me from
              building about a thousand admin interfaces for my various projects
              over the years.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Thinking">
            <Tool title="Pen and paper">
              Call me crazy but sometimes I just need to draw something real
              quick.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Raycast">
              I like that it brings a clipboard history tool. The shortcuts are
              nice too.
            </Tool>
            <Tool title="Rectangle">
              {`I know Raycast has this feature but I know the shortcuts and I'm used to it.`}
            </Tool>
            <Tool title="Cron">
              I have a lot of emails so having my calendar on only one app is
              amazing.
            </Tool>
            <Tool title="Mailstream">
              Same as Cron, having all mails in one place is really nice
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
