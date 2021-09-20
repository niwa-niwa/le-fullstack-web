import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navigation from "../../components/Navigation";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, [id]);
  return (
    <>
      <Navigation />
      <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">
            <div className="title">{postObject.title}</div>
            <div className="body">{postObject.postText}</div>
            <div className="footer">{postObject.username}</div>
          </div>
        </div>
        <div className="rightSide"></div>
      </div>
    </>
  );
}
