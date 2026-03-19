import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

type AvatarSize = "sm" | "default" | "lg";

export type AppAvatarProps = {
  name: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  badgeClassName?: string;
};

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function AppAvatar({ name, src, alt, size = "default", badgeClassName }: AppAvatarProps) {
  return (
    <Avatar size={size}>
      {src && <AvatarImage src={src} alt={alt ?? name} />}
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
      {badgeClassName && <AvatarBadge className={badgeClassName} />}
    </Avatar>
  );
}

export type AppAvatarGroupProps = {
  people: Array<{ name: string; src?: string }>;
  overflowCount?: number;
  size?: AvatarSize;
};

export function AppAvatarGroup({ people, overflowCount = 0, size = "default" }: AppAvatarGroupProps) {
  return (
    <AvatarGroup>
      {people.map((person) => (
        <AppAvatar key={person.name} name={person.name} src={person.src} size={size} />
      ))}
      {overflowCount > 0 && <AvatarGroupCount>+{overflowCount}</AvatarGroupCount>}
    </AvatarGroup>
  );
}
