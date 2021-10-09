import Layout from "../../components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/auth/basicinfo/${id}`)
        .then((response) => {
          console.log(response.data.username);
          setUsername(response.data.username);
        });

      axios
        .get(`http://localhost:3001/posts/byuserId/${id}`)
        .then((response) => {
          setListOfPosts(response.data);
        });
    }
  }, [id]);

  return (
    <Layout>
      <div className="profilePageContainer">
        <div className="basicInfo">
          <h1>Username:{username}</h1>
        </div>
        <div className="listOfPosts">
          {listOfPosts ? (
            listOfPosts.map((value, key) => {
              return (
                <div className="post" key={value.id}>
                  <div className="title">{value.title}</div>
                  <Link href="post/[id]" as={`/post/${value.id}`}>
                    <div className="body">{value.postText}</div>
                  </Link>
                  <div className="footer">
                    <div className="username">{value.username}</div>
                    <div className="buttons">
                      <label htmlFor="">{value.Likes.length}</label>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>表示する投稿はありません。</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
