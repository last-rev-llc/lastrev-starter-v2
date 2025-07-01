import * as React from 'react'
import {useFormValue, PatchEvent, set} from 'sanity'

// Check if AI generation is enabled via environment variable
const AI_ENABLED = true //process.env.SANITY_STUDIO_ENABLE_AI_GENERATION === 'true'
const AI_API_URL =
  process.env.SANITY_STUDIO_AI_API_URL ||
  'https://lr-production.studio.theanswer.ai/api/v1/prediction/718c0507-d5e5-4a62-ba14-989c681c1b8e'

// Helper function to gather comprehensive page content for AI generation
export const gatherPageContent = (formValues: any) => {
  const content = formValues.content || []
  const references = formValues.references || []

  // Extract text content from structured content blocks
  const extractTextFromContent = (blocks: any[]): string => {
    if (!Array.isArray(blocks)) return ''

    return blocks
      .map((block: any) => {
        if (typeof block === 'string') return block
        if (block?._type === 'block' && block?.children) {
          return block.children.map((child: any) => child.text || '').join(' ')
        }
        if (block?.text) return block.text
        if (block?.title) return block.title
        if (block?.heading) return block.heading
        return ''
      })
      .filter(Boolean)
      .join(' ')
  }

  // Extract reference information
  const extractReferences = (refs: any[]): string => {
    if (!Array.isArray(refs)) return ''

    return refs
      .map((ref: any) => {
        const title = ref?.internalTitle || ref?.title || ''
        const summary = ref?.promoSummary || ref?.excerpt || ''
        return `${title} ${summary}`.trim()
      })
      .filter(Boolean)
      .join(' ')
  }

  return {
    title: formValues.internalTitle || formValues.title || formValues.name || '',
    slug: formValues.slug?.current || '',
    excerpt: formValues.excerpt || '',
    content: extractTextFromContent(content),
    references: extractReferences(references),
  }
}

// AI Content Generation Service
export const generateContentWithAI = async (
  fieldName: string,
  fieldType: string,
  fieldTitle: string,
  pageContent: any,
  currentValue?: string,
) => {
  if (!AI_ENABLED) {
    throw new Error('AI generation is disabled')
  }

  const prompt = createFieldPrompt(fieldName, fieldType, fieldTitle, pageContent, currentValue)

  const response = await fetch(AI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({question: prompt}),
  })

  if (!response.ok) {
    throw new Error('Failed to generate content')
  }

  const result = await response.json()
  const aiResponse = result.text || result.answer || result.response || ''

  return aiResponse.replace(/^["']|["']$/g, '').trim()
}

// Smart prompt generator based on field context
export const createFieldPrompt = (
  fieldName: string,
  fieldType: string,
  fieldTitle: string,
  pageContent: any,
  currentValue?: string,
) => {
  const baseContext = `
You are helping to generate content for a ${fieldTitle} field.
Page context:
- Title: ${pageContent.title || 'Untitled'}
- Slug: ${pageContent.slug || 'no-slug'}
- Excerpt: ${pageContent.excerpt || 'No excerpt'}
- Content: ${pageContent.content || 'No content'}
- References: ${pageContent.references || 'No references'}

Current value: ${currentValue || 'Empty'}
`

  // SEO specific fields
  if (fieldName === 'title' && fieldTitle === 'Title') {
    return (
      baseContext +
      `Generate an SEO-optimized title tag that:
- Is between 50-60 characters
- Includes relevant keywords naturally
- Is compelling and descriptive
- Accurately represents the page content
- Follows SEO best practices

Return only the title text, no additional formatting.`
    )
  }

  if (fieldName === 'description' && fieldTitle === 'Description') {
    return (
      baseContext +
      `Generate an SEO-optimized meta description that:
- Is between 150-160 characters
- Includes a clear call-to-action
- Contains relevant keywords naturally
- Summarizes the page content effectively
- Encourages clicks from search results

Return only the description text, no additional formatting.`
    )
  }

  // Open Graph specific fields
  if (fieldName === 'ogTitle') {
    return (
      baseContext +
      `Generate an Open Graph title for social media that:
- Is engaging and shareable (max 60 characters)
- May differ from SEO title for social impact
- Captures attention on social platforms
- Works well with social media preview cards

Return only the title text, no additional formatting.`
    )
  }

  if (fieldName === 'ogDescription') {
    return (
      baseContext +
      `Generate an Open Graph description for Facebook that:
- Is engaging and shareable (max 155 characters)
- Encourages clicks from social media
- Highlights the most interesting aspect of the content
- Works well in a social media context
- May be more conversational than SEO description

Return only the description text, no additional formatting.`
    )
  }

  // Twitter specific fields
  if (fieldName === 'twTitle') {
    return (
      baseContext +
      `Generate a Twitter card title that:
- Is concise and punchy (max 70 characters)
- Works well in Twitter's fast-paced environment
- May include relevant hashtags if appropriate
- Captures attention quickly
- Optimized for retweets and engagement

Return only the title text, no additional formatting.`
    )
  }

  if (fieldName === 'twDescription') {
    return (
      baseContext +
      `Generate a Twitter card description that:
- Is brief and engaging (max 200 characters)
- Complements the title effectively
- Encourages clicks and retweets
- Works well in Twitter's format
- May be more conversational or urgent

Return only the description text, no additional formatting.`
    )
  }

  if (fieldType === 'text' || fieldType === 'string') {
    return (
      baseContext +
      `Generate appropriate ${fieldTitle.toLowerCase()} content that:
- Is relevant to the page context
- Matches the purpose of a "${fieldTitle}" field
- Is concise and well-written
- Fits the content style and tone

Return only the content text, no additional formatting.`
    )
  }

  // Generic fallback
  return (
    baseContext +
    `Generate appropriate content for the "${fieldTitle}" field that:
- Is relevant to the page context
- Matches the expected format for this field type
- Is well-written and engaging
- Fits the overall content strategy

Return only the content, no additional formatting.`
  )
}

// Reusable AI field wrapper
// Usage: withAIGeneration(defineField({ name: 'title', type: 'string', title: 'Title' }))
export const withAIGeneration = (field: any) => {
  // If AI is disabled, return field as-is
  if (!AI_ENABLED) {
    return field
  }

  // Only add AI generation to text and string fields
  if (!['string', 'text'].includes(field.type)) {
    return field
  }

  return {
    ...field,
    components: {
      input: (props: any) => {
        const [isGenerating, setIsGenerating] = React.useState(false)
        const [suggestedContent, setSuggestedContent] = React.useState('')
        const [showSuggestion, setShowSuggestion] = React.useState(false)

        // Get form values for context
        const formDocument = useFormValue([])

        const generateContent = async () => {
          if (!formDocument) return

          setIsGenerating(true)
          try {
            const pageContent = gatherPageContent(formDocument)
            const generated = await generateContentWithAI(
              field.name,
              field.type,
              field.title,
              pageContent,
              props.value,
            )

            setSuggestedContent(generated)
            setShowSuggestion(true)
          } catch (error: any) {
            console.error('Error generating content:', error)
            alert(`Failed to generate content: ${error.message}`)
          } finally {
            setIsGenerating(false)
          }
        }

        const acceptSuggestion = () => {
          props.onChange(PatchEvent.from(set(suggestedContent)))
          setShowSuggestion(false)
          setSuggestedContent('')
        }

        const rejectSuggestion = () => {
          setShowSuggestion(false)
          setSuggestedContent('')
        }

        return React.createElement(
          'div',
          {},
          // Original field input
          props.renderDefault(props),
          // AI Generation Button
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
              },
            },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: generateContent,
                disabled: isGenerating,
                style: {
                  padding: '4px 8px',
                  fontSize: '11px',
                  border: '1px solid #7c3aed',
                  borderRadius: '3px',
                  background: isGenerating ? '#d1d5db' : '#7c3aed',
                  color: 'white',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  opacity: isGenerating ? 0.5 : 1,
                },
              },
              isGenerating ? '🤖 Generating...' : '🤖 Generate with AI',
            ),
          ),

          // Suggestion Box
          showSuggestion &&
            React.createElement(
              'div',
              {
                style: {
                  marginBottom: '12px',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  backgroundColor: '#f9fafb',
                },
              },
              React.createElement(
                'div',
                {
                  style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                    color: '#374151',
                  },
                },
                'AI Suggestion:',
              ),
              React.createElement(
                'div',
                {
                  style: {
                    marginBottom: '8px',
                    padding: '8px',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '13px',
                  },
                },
                suggestedContent,
              ),
              React.createElement(
                'div',
                {
                  style: {display: 'flex', gap: '8px'},
                },
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: acceptSuggestion,
                    style: {
                      padding: '4px 12px',
                      fontSize: '11px',
                      border: '1px solid #10b981',
                      borderRadius: '3px',
                      background: '#10b981',
                      color: 'white',
                      cursor: 'pointer',
                    },
                  },
                  '✓ Accept',
                ),
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: rejectSuggestion,
                    style: {
                      padding: '4px 12px',
                      fontSize: '11px',
                      border: '1px solid #ef4444',
                      borderRadius: '3px',
                      background: '#ef4444',
                      color: 'white',
                      cursor: 'pointer',
                    },
                  },
                  '✗ Reject',
                ),
              ),
            ),
        )
      },
    },
  }
}
