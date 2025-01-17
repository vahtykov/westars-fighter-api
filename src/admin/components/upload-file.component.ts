import { BasePropertyComponent } from 'adminjs'
import { S3Service } from '../../infrastructure/external-services/s3.service'

const UploadFileComponent = {
  type: 'file-upload',
  isVisible: true,
  components: {
    edit: ({ property, record, onChange }) => {
      const handleChange = async (files) => {
        if (!files || !files.length) return

        const file = files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('mediaPathType', 'training_preview')
        formData.append('bucketName', process.env.AWS_BUCKET_NAME)

        try {
          const s3Service = new S3Service()
          const result = await s3Service.uploadFile(
            file,
            `trainings/${Date.now()}-${file.name}`,
            process.env.AWS_BUCKET_NAME
          )

          onChange(result.url)
        } catch (error) {
          console.error('Upload failed:', error)
        }
      }

      return {
        type: 'file',
        props: {
          onChange: handleChange,
          multiple: false,
          accept: 'image/*,video/*',
        },
      }
    },
    list: ({ property, record }) => {
      const value = record?.params[property.name]
      return value ? {
        type: 'string',
        value: value,
      } : null
    },
    show: ({ property, record }) => {
      const value = record?.params[property.name]
      return value ? {
        type: 'string',
        value: value,
      } : null
    },
  },
}

export default UploadFileComponent