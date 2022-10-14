import posthog from 'posthog-js'
import { type FormEvent,type SVGProps, useState } from 'react'

import { Button } from './Button'

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  check: HTMLInputElement
}

interface NewsletterFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<NewsletterFormElement>) => {
    posthog.capture('newsletter-submitted')
    event.preventDefault()

    const form = event.currentTarget
    const email = form.elements.email.value
    const checkbox = Boolean(form.elements.check.value)
    if (!email || !checkbox) {
      return
    }

    fetch('/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          setSubmitted(true)
        }
      })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>

      {submitted ? (
        <div className="mt-6 flex justify-center">
          <Button type="submit" className="ml-4 flex-none">
            Subscribed
          </Button>
        </div>
      ) : (
        <div className="mt-6 flex">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          />
          <Button type="submit" className="ml-4 flex-none">
            Subscribe
          </Button>
        </div>
      )}

      <input name="check" type="checkbox" hidden value="0" />
    </form>
  )
}
