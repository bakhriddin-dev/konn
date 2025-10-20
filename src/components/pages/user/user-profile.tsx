import { Loader } from "@/components/common";
import { useGetPublicProfileQuery } from "@/features/api/api-slice";
import { Navigate, useParams } from "react-router";

export const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { data: user, isLoading } = useGetPublicProfileQuery(username);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/not-found" replace />;
  }

  return <div>{user?.name}</div>;
};
