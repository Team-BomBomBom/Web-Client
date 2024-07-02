'use client';
import StudyCreateModal from '@/components/study/study-create-modal';
import StudyGrid from '@/components/study/study-grid';
import { Suspense, useState } from 'react';

export default function StudyList() {
  const [trigger, setTrigger] = useState(0);
  return (
    <div>
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">스터디 목록</h1>
          <StudyCreateModal
            showLatest={() => setTrigger(Date.now())}
          ></StudyCreateModal>
        </div>
        <Suspense>
          <StudyGrid trigger={trigger} />
        </Suspense>
      </div>
    </div>
  );
}
