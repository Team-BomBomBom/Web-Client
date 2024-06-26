import { Pageable } from '@/types/paging';
import { StudyPage } from '@/types/study/study';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';

/**
 * 스터디 목록 API
 * querystring : page, size
 */
export default async function studies({
  page,
  size
}: Pageable): Promise<StudyPage> {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/studies`, {
      params: { page, size }
    })
    .then((response) => response.data);
}
