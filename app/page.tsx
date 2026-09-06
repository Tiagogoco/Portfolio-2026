import { Suspense } from 'react';
import { Site } from '@/components/site';

export default function Page() {
  return (
    <Suspense>
      <Site />
    </Suspense>
  );
}
