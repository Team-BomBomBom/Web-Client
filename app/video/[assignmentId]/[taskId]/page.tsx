'use client';
import VideoPlayer from '@/components/ui/player/video-player';
import getSignedCookies from '@/lib/api/video/get-cookie';
import getVideo from '@/lib/api/video/get-video';
import { User } from '@/types/user/user';
import { AssignmentInfo } from '@/types/video/cloudfront';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function VideoPlayerPage() {
  const params = useParams();
  console.log(params);
  const objectId = 'task/' + params['assignmentId'] + '/' + params['taskId'];
  const videoId = useSearchParams().get('id');

  const [assignment, setAssignment] = useState<AssignmentInfo | null>(null);

  const [uploader, setUploader] = useState<User | null>(null);
  const [src, setSource] = useState('');
  const thumnail =
    'https://devs-output-bucket.s3.ap-northeast-2.amazonaws.com/outputs/' +
    objectId +
    '/Default/Thumbnails/' +
    params['taskId'] +
    '.0000000.jpg';

  useEffect(() => {
    const domain = 'd2k9wcxfcmg2dn.cloudfront.net';
    getVideo(videoId!).then((res) => {
      console.log(res);
      setAssignment(res.assignmentResult);
      setUploader(res.profile);
    });
    getSignedCookies(objectId)
      .then((res) => {
        return res.signedUrl;
      })
      .then((signedUrl) =>
        setSource(
          'https://devs-output-bucket.s3.ap-northeast-2.amazonaws.com/outputs/' +
            objectId +
            '/Default/HLS/' +
            params['taskId'] +
            '.m3u8'
        )
      );
  }, [objectId]);
  return (
    <div className="container mx-auto px-4 py-8  min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <VideoPlayer
          src={src}
          poster={thumnail}
          title={assignment?.title ?? ''}
          description={assignment?.description ?? ''}
          uploaderName={uploader?.username ?? ''}
          uploaderAvatar="/placeholder.svg?height=50&width=50"
          views={88848}
          uploadDate="2024. 05. 07."
        />
      </div>
    </div>
  );
}
