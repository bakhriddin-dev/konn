import { Loader } from "@/components/common";
import { themes, ThemeType } from "@/constants/themes";
import { useGetPublicProfileQuery } from "@/features/api/api-slice";
import { Navigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { IconRenderer } from "@/components/common/icon-renderer/icon-renderer";

export const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { data: user, isLoading } = useGetPublicProfileQuery(username);

  const styles = themes.find((t) => t.id === user?.theme) || themes[2];

  if (isLoading) return <Loader />;
  if (!user) return <Navigate to="/not-found" replace />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen ${styles.bg} ${styles.text} flex items-center justify-center p-4`}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col min-h-[90dvh]">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center text-4xl overflow-hidden shadow-md">
            <img src={user?.avatar} alt={user?.name || "User"} />
          </div>
          <h1 className="text-2xl font-bold mb-2">{user?.name}</h1>
          {user?.bio && (
            <p className={`${styles.text} opacity-80 max-w-md mx-auto`}>{user.bio}</p>
          )}
        </motion.div>

        {/* Links */}
        <div className="space-y-4 flex-grow">
          {user?.links?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-xl border ${styles.linkBg} ${styles.linkBorder} ${styles.text} transition-all duration-200 hover:scale-[1.01] hover:${styles.linkBorder}/40 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconRenderer iconName={link.icon} className="w-5 h-5" />
                  <span className="font-medium">{link.title}</span>
                </div>
                <svg
                  className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`text-xs text-center ${styles.text} py-4 opacity-70 mt-auto`}
        >
          © 2025 <a href="https://konn.uz" className="hover:underline">konn.uz</a>
        </div>
      </div>
    </motion.div>
  );
};
