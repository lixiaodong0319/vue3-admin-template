import MySourceSvg from '@/assets/svg/yuntun/fileType/download_list_file_my_resources.svg'
import FolderSvg from '@/assets/svg/yuntun/fileType/download_list_file_folder.svg'
import VideoSvg from '@/assets/svg/yuntun/fileType/download_list_file_video.svg'
import ImageSvg from '@/assets/svg/yuntun/fileType/download_list_file_pic.svg'
import AudioSvg from '@/assets/svg/yuntun/fileType/download_list_file_audio.svg'
import PdfSvg from '@/assets/svg/yuntun/fileType/download_list_file_pdf.svg'
import ArchiveSvg from '@/assets/svg/yuntun/fileType/download_list_file_archive.svg'
import DocxSvg from '@/assets/svg/yuntun/fileType/download_list_file_docx.svg'
import DefaultSvg from '@/assets/svg/yuntun/fileType/download_list_file_default.svg'
import DllSvg from '@/assets/svg/yuntun/fileType/download_list_file_dll.svg'
import ExeSvg from '@/assets/svg/yuntun/fileType/download_list_file_exe.svg'
import IsoSvg from '@/assets/svg/yuntun/fileType/download_list_file_iso.svg'
import PptxSvg from '@/assets/svg/yuntun/fileType/download_list_file_pptx.svg'
import TxtSvg from '@/assets/svg/yuntun/fileType/download_list_file_txt.svg'
import XlsxSvg from '@/assets/svg/yuntun/fileType/download_list_file_xlsx.svg'

export const TYPE_IMAGE = {
  mySource: MySourceSvg,
  folder: FolderSvg,
  video: VideoSvg,
  audio: AudioSvg,
  image: ImageSvg,
  pdf: PdfSvg,
  archive: ArchiveSvg,
  docx: DocxSvg,
  default: DefaultSvg,
  dll: DllSvg,
  exe: ExeSvg,
  iso: IsoSvg,
  pptx: PptxSvg,
  txt: TxtSvg,
  xlsx: XlsxSvg
}

export const tableData = [
  {
    id: 1,
    filename: '我的资源',
    size: 9.8,
    updateTime: '2024-09-01 13:13',
    type: 'mySource',
    children: [
      {
        id: 2,
        filename: '新建文件夹',
        size: 4.25,
        updateTime: '2024-09-01 13:13',
        type: 'folder',
        children: []
      },
      {
        id: 3,
        filename: '盗梦空间',
        size: 4.25,
        updateTime: '2024-09-01 13:13',
        type: 'video'
      }
    ]
  },
  {
    id: 4,
    filename: '新建文件夹',
    size: 1.5,
    updateTime: '2024-09-01 13:13',
    type: 'folder'
  },
  {
    id: 5,
    filename: '我的转存',
    size: 4.25,
    updateTime: '2024-09-01 13:13',
    type: 'folder'
  },
  {
    id: 6,
    filename: '人工智能大模型',
    size: 4.25,
    updateTime: '2024-09-01 13:13',
    type: 'pdf'
  }
]

export const columns: any = [
  {
    title: '文件名称',
    key: 'filename'
  },
  {
    title: '大小',
    key: 'size',
    width: 88,
    sortable: true
  },
  {
    title: '修改时间',
    width: 150,
    key: 'updateTime'
  }
]
