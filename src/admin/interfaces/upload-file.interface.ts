import { ActionContext, ActionResponse } from 'adminjs'

export interface UploadFileComponentProps {
  property: any
  record: any
  onChange: (value: any) => void
}

export interface UploadFileResponse extends ActionResponse {
  redirectUrl?: string
  notice?: {
    message: string
    type: 'success' | 'error'
  }
}