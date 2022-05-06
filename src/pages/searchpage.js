import React , {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import fb from "../firebase";
const DB = fb.firestore();
const Blogslist = DB.collection('blogs');


const SearchPage = () => {
    const[blogs, Setblogs] = useState([]);
    const[search, setSearch] = useState('');
    const[Searchblogs, SetSearchblogs] = useState([]);
    useEffect(() =>{
        const unsubscribe = Blogslist.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            Setblogs(data);
          });
          return unsubscribe;
    }, []);

    const SearchBlog=(e)=>{
        e.preventDefault();
        
        SetSearchblogs(blogs.filter((blogs)=>
            blogs.Title.toLowerCase().includes(search.toLowerCase())||
            blogs.Body.toLowerCase().includes(search.toLowerCase())
        ));
    };

    const DeleteBlog = (id)=> {
        Blogslist.doc(id).delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };
    return(
        <div>
            <div>
                <form onSubmit={(e) => {SearchBlog(e)}}>
                    <input
                    onChange={(e)=>{setSearch(e.target.value)}}  />
                    <button type="submit">Search</button>
                </form>
            </div>
            {Searchblogs.map(blog=> (
                <div key={blog.id}>
                    <p>Title: {blog.Title}</p>
                    <p>Body: {blog.Body}</p>
                    <Link to={"/show/"+blog.id}>View</Link>
                    <Link to={"/EditBlog/"+blog.id}>Edit</Link>
                    <button 
                        onClick={()=> {DeleteBlog(blog.id)}} 
                    >delete</button>
                </div>
            ))}
        </div>
    );
};

export default SearchPage;