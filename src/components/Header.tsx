import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { useModal } from "../hooks/useModal";
import { Button } from "./core/Button";
import { LoginFormModal } from "./LoginFormModal";
import { ProfileMenu } from "./ProfileMenu";
import { SearchField } from "./SearchField";
import { SignUpModal } from "./SignUpModal";
import { Typography } from "./core/Typography";

export function Header() {
  const { user, isLoading } = useAuth();
  const loginModal = useModal();
  const signUpModal = useModal();

  return (
    <header className="flex items-center justify-between bg-[linear-gradient(180deg,black_-212.35%,rgba(0,0,0,0.51)_32.09%,rgba(0,0,0,0)_93.93%)] px-15 pb-10 pt-7.5">
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
          <div aria-hidden className="h-10 w-30.25" />
        ) : user ? (
          <ProfileMenu user={user} />
        ) : (
          <div className="flex gap-3">
            <Button onClick={signUpModal.open}>Sign up</Button>
            <Button variant="secondary" onClick={loginModal.open}>
              Log in
            </Button>
          </div>
        )}
      </div>
      <LoginFormModal open={loginModal.isOpen} onClose={loginModal.close} />
      <SignUpModal open={signUpModal.isOpen} onClose={signUpModal.close} />
    </header>
  );
}
