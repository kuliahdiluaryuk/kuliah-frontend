import { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "@/types";

interface UserAvatarProps extends AvatarProps {
  user?: Pick<User, 'avatar' | 'name'> | null;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  className,
  ...props
}) => {
  return (
    <Avatar className={cn("rounded-[4px]", className)} {...props}>
      <AvatarImage
        src={user?.avatar ? user.avatar : ""}
        alt="Profile picture"
      />
      <AvatarFallback className="rounded-[4px]">
        <span className="sr-only">{user?.name}</span>
        <Icons.user />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
