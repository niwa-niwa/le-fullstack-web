import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAuthContext } from "../../helpers/AuthContext";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useAuthContext();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(
          comments.filter((comment) => {
            return comment.id !== id && comment;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        alert("delete success");
        router.push("/");
      });
  };
  return (
    <Layout>
      <div className="postPage">
        <div className="leftSide">
          <div className="post" id="individual">
            <div className="title">{postObject.title}</div>
            <div className="body">{postObject.postText}</div>
            <div className="footer">
              {postObject.username}
              {authState.username === postObject.username && (
                <button
                  onClick={() => {
                    deletePost(postObject.id);
                  }}
                >
                  Delete Post
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="addCommentContainer">
            <input
              type="text"
              name=""
              id=""
              placeholder="Comment..."
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            <button onClick={addComment}>Add Comment</button>
          </div>
          <div className="listOfComments">
            {comments.map((comment, key) => {
              return (
                <div key={key} className="comment">
                  {comment.commentBody}
                  <label htmlFor="">Username: {comment.username}</label>
                  {authState.username === comment.username && (
                    <button
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      X
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
