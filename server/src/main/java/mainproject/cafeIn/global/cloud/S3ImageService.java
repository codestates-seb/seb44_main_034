package mainproject.cafeIn.global.cloud;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import mainproject.cafeIn.global.exception.CustomException;
import mainproject.cafeIn.global.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLDecoder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3ImageService {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new CustomException(ErrorCode.FILE_CONVERT_FAIL));

        return upload(uploadFile, dirName);
    }

    private String upload(File uploadFile, String dirName) {

        String changeName = uploadFile.getName().replaceAll(" ","");
        String encodeName = URLEncoder.encode(changeName, StandardCharsets.UTF_8);
        String subName;
        if(encodeName != changeName) {
           int lengthByte = encodeName.getBytes(StandardCharsets.UTF_8).length;

           if(lengthByte > 900) {

               subName = encodeName.substring(0,900);
           } else {

               subName = encodeName;
           }

        } else {
            int lengthByte = encodeName.length();
            if(lengthByte > 900) {

                subName = encodeName.substring(0, 900);
            } else {

                subName = encodeName;
            }
        }

        log.info("subName: " + subName);
        String uuidName = UUID.randomUUID().toString();

        String fileName = dirName + "/" + uuidName+ "_" + subName;
        String uploadImageUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);

        return uploadImageUrl;
    }

    public String update(String imageUrl, MultipartFile multipartFile, String dirName) throws IOException {
        delete(dirName, imageUrl);

        return upload(multipartFile, dirName);
    }

    public void delete(String dirName, String imageUrl) {
        String fileName = extractFileNameFromUrl(imageUrl);
        log.info("deleteName : " + fileName);
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, dirName + fileName));
    }

    private String extractFileNameFromUrl(String imageUrl) {

        String decodeName = URLDecoder.decode(imageUrl, StandardCharsets.UTF_8);

        return decodeName.substring(decodeName.lastIndexOf("/"));
    }

    private String putS3(File uploadFile, String fileName) {

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentDisposition("attachment; filename*=UTF-8''" + fileName);

        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
                        .withMetadata(metadata)
        );

        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 정상적으로 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 않았습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

}
