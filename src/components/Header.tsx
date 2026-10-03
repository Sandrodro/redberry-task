import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { useModal } from "../hooks/useModal";
import { Button } from "./core/Button";
import { LoginFormModal } from "./LoginFormModal";
import { Typography } from "./core/Typography";

export function Header() {
  const { user } = useAuth();
  const loginModal = useModal();

  return (
    <header className="flex items-center justify-end px-[60px] pb-[40px] pt-[30px]">
      {user ? (
        <Link to="/profile" className="text-white">
          <Typography variant="labelM">{user.username}</Typography>
        </Link>
      ) : (
        <div className="flex gap-3">
          <Button>Sign Up</Button>
          <Button variant="secondary" onClick={loginModal.open}>
            Log In
          </Button>
        </div>
      )}
      <LoginFormModal open={loginModal.isOpen} onClose={loginModal.close} />
    </header>
  );
}
