// import React, { useState } from 'react'
// import { Box, Label, Input, Button } from '@adminjs/design-system'

// const UploadFile = (props) => {
//   const [file, setFile] = useState(null)

//   const handleUpload = async (e) => {
//     e.preventDefault()
//     if (!file) return

//     const formData = new FormData()
//     formData.append('file', file)
//     formData.append('mediaPathType', props.mediaPathType)
//     formData.append('bucketName', process.env.AWS_BUCKET_NAME)

//     try {
//       const response = await fetch('/api/admin/upload', {
//         method: 'POST',
//         body: formData,
//       })
//       const data = await response.json()

//       if (data.id) {
//         props.onChange(data.id)
//       }
//     } catch (error) {
//       console.error('Upload failed:', error)
//     }
//   }

//   return (
//     <Box>
//       <Label>Upload File</Label>
//       <Input
//         type="file"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <Button onClick={handleUpload}>Upload</Button>
//     </Box>
//   )
// }

// export default UploadFile