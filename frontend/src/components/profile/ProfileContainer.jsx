import { Card, Image } from "react-bootstrap";
import { accountAtom } from "../../model";
import { useAtomValue } from "jotai";

const ProfileContainer = () => {
  const profile = useAtomValue(accountAtom.profile);

  return (
    <Card className="w-100 text-center">
      <Card.Body className="d-grid gap-4 px-5 py-4">
        <Image
          src={profile.photo}
          roundedCircle
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
            aspectRatio: "1/1",
          }}
        />
        <Card.Text>
          <div className="mb-2">
            <h3>{profile.displayName}</h3>
            <span className="text-muted">@{profile.username}</span>
          </div>
          {profile.desc}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileContainer;
