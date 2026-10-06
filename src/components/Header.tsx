import { Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/hooks/useAuthModal";
import { Button } from "./core/Button";
import { SearchField } from "./SearchField";
import { Typography } from "./core/Typography";

// Loaded on demand: the menu pulls in Radix, which a guest never needs.
const ProfileMenu = lazy(() =>
  import("./ProfileMenu").then((module) => ({ default: module.ProfileMenu })),
);

/** Holds the menu's place while it loads, so the header does not jump. */
const menuPlaceholder = <div aria-hidden className="h-10 w-30.25" />;

export function Header() {
  const { user, isLoading } = useAuth();
  const { openLogin, openSignUp } = useAuthModal();

  return (
    <header className="relative z-10 flex items-center justify-between bg-[linear-gradient(180deg,black_-212.35%,rgba(0,0,0,0.51)_32.09%,rgba(0,0,0,0)_93.93%)] px-15 pb-10 pt-7.5">
      <div className="flex items-center gap-9">
        <Link to="/" className="flex items-center gap-1.5">
          <Typography variant="h2" as="span">
            KINO
          </Typography>
          <Typography variant="h2" as="span" className="text-brand">
            XII
          </Typography>
        </Link>
        <Link to="/sessions">
          <Typography variant="overline">Sessions</Typography>
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <SearchField />
        {isLoading ? (
          menuPlaceholder
        ) : user ? (
          <Suspense fallback={menuPlaceholder}>
            <ProfileMenu user={user} />
          </Suspense>
        ) : (
          <div className="flex gap-3">
            <Button onClick={openSignUp}>Sign up</Button>
            <Button variant="secondary" onClick={() => openLogin()}>
              Log in
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
