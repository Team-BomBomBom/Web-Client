'use client';

import StudyAbout from '@/components/study/dashboard/about';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import StudyDashBoard from '@/components/study/dashboard/dashboard';
import Spinner from '@/components/ui/spinner/spinner';
import getStudyDetails from '@/lib/api/study/get-details';
import { AlgorithmRound, StudyDetails } from '@/types/study/study-detail';

export default function StudyPage() {
  const params = useParams();
  const studyId = params.id.toString();

  const [details, setDetails] = useState<StudyDetails | undefined>();
  const [round, setRound] = useState<AlgorithmRound | undefined>();

  useEffect(() => {
    async function fetchStudyDetails() {
      try {
        const studyDetailsAndRound = await getStudyDetails(studyId);
        setDetails(studyDetailsAndRound.details);
        setRound(studyDetailsAndRound.round);
      } catch (error) {
        console.error('Failed to fetch study details:', error);
      }
    }
    fetchStudyDetails();
  }, [studyId]);

  if (!details || !round) {
    return <Spinner />;
  }
  return (
    <div className="flex space-x-4 justify-center">
      <StudyDashBoard details={details} round={round} setRound={setRound} />
      <StudyAbout details={details} users={round.users} />
    </div>
  );
}
