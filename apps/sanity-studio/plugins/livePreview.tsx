import React, {useEffect, useState} from 'react'
import {DocumentActionComponent, DocumentActionsContext} from 'sanity'
import {Card, Stack, Button, Text} from '@sanity/ui'
import {EyeOpenIcon, CloseIcon} from '@sanity/icons'

// Component to show inline preview
export function InlinePreview({documentId}: {documentId: string}) {
  const cleanId = documentId.replace(/^drafts\./, '')
  const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
  const previewUrl = `${baseUrl}/preview/${cleanId}`

  return (
    <Card 
      tone="default" 
      padding={0}
      radius={2}
      shadow={1}
      style={{
        height: '600px',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <iframe
        src={previewUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="Live Preview"
      />
      <Card
        padding={2}
        radius={1}
        shadow={1}
        tone="primary"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}
      >
        <Text size={1} style={{color: 'white'}}>
          Live Preview
        </Text>
      </Card>
    </Card>
  )
}

// Custom field component that includes preview
export function PreviewField(props: any) {
  const [showPreview, setShowPreview] = useState(false)
  const documentId = props.document?._id

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      
      {documentId && (
        <>
          <Button
            icon={showPreview ? CloseIcon : EyeOpenIcon}
            mode="ghost"
            text={showPreview ? 'Hide Preview' : 'Show Preview'}
            onClick={() => setShowPreview(!showPreview)}
          />
          
          {showPreview && <InlinePreview documentId={documentId} />}
        </>
      )}
    </Stack>
  )
}