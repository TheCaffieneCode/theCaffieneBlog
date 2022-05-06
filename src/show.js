import React , {useState} from "react";
import { useParams} from 'react-router-dom';
import fb from "./firebase";
import useAuthState from "./hooks";
import {v4 as uuidv4} from "uuid";
const DB =fb.firestore()
const Blogslist = DB.collection('blogs');

function LikeBlogButton({id, likes}) {
    const blogRef = DB.collection("blogs").doc(id)
    const {user} = useAuthState(fb.auth());
    const handleLikes=()=>{
        if (likes?.includes(user.uid)) {
            blogRef.update({
                likes: fb.firestore.FieldValue.arrayRemove(user.uid)
            });
        } else {
            blogRef.update({
                likes: fb.firestore.FieldValue.arrayUnion(user.uid)
            });
        }
    }
    return(
        <div>
            {likes?.includes(user.uid)
            ?<button onClick={handleLikes}>UnLike</button>
            :<button onClick={handleLikes}>Like</button>
            }  
        </div>
    );
}

const BlogView = ()=> {
    const {user, initializing} = useAuthState(fb.auth());
    const {id} = useParams();
    const[blogs, Setblogs] = useState([]);
    const[comment, setcomment]= useState("");
    const[commentList, setCommentList] = useState([]);
    Blogslist.doc(id).get().then((snapshot) => {
        const data = snapshot.data()
        const commentdata = snapshot.data().comments
        Setblogs({...data, id: id,});
        setCommentList(commentdata);

    });
    const body = blogs.Body

    const handleComment=(e)=>{
        if (e.key === "Enter") {
            Blogslist.doc(id).update({
                comments: fb.firestore.FieldValue.arrayUnion({
                    userid: user.uid,
                    username: user.displayName,
                    userImg: user.photoURL,
                    comment: comment,
                    createdAt :fb.firestore.Timestamp.fromDate(new Date()),
                    commentId : uuidv4(),
                })
            }).then(()=>{
                setcomment("");
            });
        }
    };
    if (initializing) {
        return 'loading...';
    }
    return(
        <div>
            <p>Title : { blogs.Title}</p>
            <div  dangerouslySetInnerHTML={{__html: body}} />

            <div className="mt-20">
                {user ?<LikeBlogButton
                id={blogs.id}
                likes={blogs.likes}
                />:null}
                <p>{blogs.likes
                ?<span>{blogs.likes.length}</span>
                :"0"
                }</p>
                
            </div>

            <div className="mt-20 ">
                {user
                ?<div className="flex">
                    <img className="w-12 h-12" src={user.photoURL} alt="user"/>
                    <input
                        type="text"
                        classname="w-full h-16 py-2 pl-4 border"
                        value={comment}
                        onChange={(e)=>{setcomment(e.target.value);}}
                        placeholder="type a comment..."
                        onKeyUp={(e)=>{handleComment(e);}}
                    />
                </div>
                :null}
                <div className="mt-10">
                    {commentList!==undefined && commentList.map((item)=>(
                        <div className="flex" key={item.commentId} >
                            <div>
                                <img src={item.userImg} alt=""/>
                            </div>
                            <div></div>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    );
};
export default BlogView;