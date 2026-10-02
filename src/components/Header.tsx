import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";
import { Typography } from "./Typography";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-[60px] pb-[40px] pt-[30px]">
      {user ? (
        <Link to="/profile" className="text-white">
          <Typography variant="labelM">{user.username}</Typography>
        </Link>
      ) : (
        <div className="flex gap-3">
          <Button>Sign Up</Button>
          <Button variant="secondary">Log In</Button>
        </div>
      )}
    </header>
  );
}
