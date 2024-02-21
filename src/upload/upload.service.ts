import { Injectable } from '@nestjs/common';
// import { CreateUploadDto } from './dto/create-upload.dto';
// import { UpdateUploadDto } from './dto/update-upload.dto';
import * as qiniu from 'qiniu';
import * as path from 'path';

const CDN_PREFIX = 'http://cdn.image.gamerplay.store/';
const accessKey = 'i-NI73UWtGjKFTvnALykLofZNUe9QJB5pUTaENW3';
const secretKey = 'HXnkON704S_nIYjTkhkTkCbeEXiR1oJ6KeWjqvMS';
//要上传的空间
const bucket = 'games-poster';
// //上传到七牛后保存的文件名
// key = 'my-nodejs-logo.png'

// 配置机房信息，
const config = new qiniu.conf.Config();
// // 空间对应的机房
// config.zone = qiniu.zone.Zone_z0;

// // 上传是否使用cdn加速
// config.useCdnDomain = true;
const formUploader = new qiniu.form_up.FormUploader(config);

function uptoken(bucket: string): string {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: bucket,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken(mac);
}
function upload2Bucket(file: Express.Multer.File): Promise<string> {
  const extension = path.extname(file.originalname);
  const key = `${Date.now()}${extension}`;
  const putExtra = new qiniu.form_up.PutExtra();
  const uploadToken = uptoken(bucket);
  return new Promise((resolve, reject) => {
    formUploader.put(
      uploadToken,
      key,
      file.buffer,
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          const url = `${CDN_PREFIX}${respBody.key}`;
          resolve(url);
        } else {
          // console.log(respInfo.statusCode);
          // console.log(respBody);
        }
      },
    );
  });
}
@Injectable()
export class UploadService {
  uploadQiniu(createUploadDto: Express.Multer.File): Promise<string> {
    return upload2Bucket(createUploadDto);
    // return 'This action adds a new upload';
  }
  remove(key: string) {
    return `This action removes a #${key} upload`;
  }
}
