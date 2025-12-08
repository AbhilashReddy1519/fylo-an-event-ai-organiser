'use client';

import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import React from 'react';

const ExplorePage = () => {
  const {data: currentUser} = useConvexQuery(api.users.getCurrentUser);

  const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery(
    api.explore.getFeaturedEvents, {limit: 5}
  );

  // console.log(data);
  return <></>;
};

export default ExplorePage;
