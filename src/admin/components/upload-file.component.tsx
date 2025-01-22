import React, { useState } from 'react'
// import { Box, Label, Input, Button } from '@adminjs/design-system'

const UploadFile = async (props) => {
  const { Box, Label, Input, Button } = await import('@adminjs/design-system');

  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('mediaPathType', props.mediaPathType)
    formData.append('bucketName', process.env.AWS_BUCKET_NAME)

    try {
      setUploadStatus('Uploading...')
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.id) {
        props.onChange(data.id)
        setUploadStatus('Upload successful')
      }
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadStatus('Upload failed')
    }
  }

  return (
    <Box>
      <Label>{props.label || 'Upload File'}</Label>
      <Input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <Button onClick={handleUpload}>Upload</Button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </Box>
  )
}

export default UploadFile