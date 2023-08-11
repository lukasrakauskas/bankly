export const Avatar = ({ name }: { name: string }) => (
  <div className="avatar" aria-hidden="true">
    {name.charAt(0)}
  </div>
);
