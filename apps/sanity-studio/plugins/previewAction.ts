import {DocumentActionComponent} from 'sanity'
import {EyeOpenIcon} from '@sanity/icons'

export const previewAction: DocumentActionComponent = (props) => {
  const {published, draft} = props

  return {
    label: 'Open Preview',
    icon: EyeOpenIcon,
    onHandle: () => {
      // Get the document ID (prefer draft over published)
      const doc = draft || published
      if (!doc?._id) return

      // Remove drafts prefix
      const id = doc._id.replace(/^drafts\./, '')
      
      // Get base URL from environment or use localhost
      const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
      const previewUrl = `${baseUrl}/preview/${id}`

      // Open in new window with specific dimensions
      const width = 1200
      const height = 800
      const left = (window.screen.width - width) / 2
      const top = (window.screen.height - height) / 2

      window.open(
        previewUrl,
        'preview',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
      )
    },
    disabled: !draft && !published,
  }
}