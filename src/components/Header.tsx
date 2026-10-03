import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { useModal } from "../hooks/useModal";
import { Button } from "./core/Button";
import { LoginFormModal } from "./LoginFormModal";
import { SignUpModal } from "./SignUpModal";
import { Typography } from "./core/Typography";

export function Header() {
  const { user } = useAuth();
  const loginModal = useModal();
  const signUpModal = useModal();

  return (
    <header className="flex items-center justify-end px-15 pb-10 pt-7.5">
      {user ? (
        <Link to="/profile" className="text-white">
          <Typography variant="labelM">{user.username}</Typography>
        </Link>
      ) : (
        <div className="flex gap-3">
          <Button onClick={signUpModal.open}>Sign Up</Button>
          <Button variant="secondary" onClick={loginModal.open}>
            Log In
          </Button>
        </div>
      )}
      <LoginFormModal open={loginModal.isOpen} onClose={loginModal.close} />
      <SignUpModal open={signUpModal.isOpen} onClose={signUpModal.close} />
    </header>
  );
}
