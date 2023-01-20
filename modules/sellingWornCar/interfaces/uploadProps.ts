import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { IUpload } from "./stepsValues";

export interface IUploadProps {
    onChange?: (info: UploadChangeParam<UploadFile<any>>, attachType: string) => void
  }