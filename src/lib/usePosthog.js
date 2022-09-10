import posthog from 'posthog-js'
import { useEffect, useState } from 'react'

const usePosthog = () => {
    const [posthogReady, setPosthogReady] = useState(false)
    const [posthogClient, setPosthog] = useState(null)

    useEffect(() => {
        if (!posthogClient) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_URL
            })

            setPosthogReady(true)
            setPosthog(posthog)
        }
    }, [posthogClient])

    return [posthogClient, posthogReady]
}

export default usePosthog
