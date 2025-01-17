import { ActionContext } from 'adminjs'
import { S3Service } from '../../infrastructure/external-services/s3.service'
import { UploadFileResponse } from '../interfaces/upload-file.interface'

export const useUploadFile = () => {
  const handleUpload = async (
    request: any,
    response: any,
    context: ActionContext
  ): Promise<UploadFileResponse> => {
    const { record, property } = context
    const s3Service = new S3Service()

    if (request.method === 'POST') {
      const { file, ...otherParams } = request.payload

      try {
        const uploadResult = await s3Service.uploadFile(
          file.buffer,
          `trainings/${Date.now()}-${file.originalname}`,
          process.env.AWS_BUCKET_NAME
        )

        record.params[property.name] = uploadResult.url
        await record.save()

        return {
          redirectUrl: context.h.recordActionUrl({
            resourceId: record.resource.id(),
            recordId: record.params.id || record.id(),
            actionName: 'show',
          }),
        }
      } catch (error) {
        return {
          notice: {
            message: 'Ошибка при загрузке файла',
            type: 'error',
          },
        }
      }
    }
    return {}
  }

  return { handleUpload }
}
