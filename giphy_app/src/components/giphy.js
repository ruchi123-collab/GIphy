import React, {useEffect, useState}  from 'react';
import axios from 'axios';
import Loading from './Loading';
import Pagination from './Pagination';

function Giphy () {
    const [data,setData]= useState([]);
    const [search,setSearch]= useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage]= useState(1);
    const [itemsPerPage]= useState(10);
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem-itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem)
    useEffect(()=>{
        const fetchData= async()=>{
            setIsError(false)
            setIsLoading(true)
            try{

                const results = await axios("https://api.giphy.com/v1/gifs/trending",{
                params: {
                    api_key: "ztSBHTSPis6w9UvffHKemSPlgVxCJXGw",
                
                }
            });
            console.log(results)
            setData(results.data.data);
            }catch(error){
                setIsError(true)
                console.log(error)

            }
           
            
            setIsLoading(false)

        };
        fetchData()

    },[])
    const renderGifs= ()=>{
        if(isLoading){
            return <div className=""><Loading/></div>
        }
        return currentItems.map(el=>{
            return(
                <div key={el.id} className="gif">
                    <img src= {el.images.fixed_height.url} />
                </div>
            )
        })
    }
    const renderError=()=>{
        if (isError){
            return(
                <div className="alert-danger">unable to get gifs please try after sometime</div>
            )
        }
    
    }
    const handleSearchChange = (e) =>{
        setSearch(e.target.value);
    };
    const handleSubmit=  async(e) =>{
        e.preventDefault();
          setIsError(false);
          setIsLoading(true);
          try{
            const results= await axios("https://api.giphy.com/v1/gifs/search",{
                params:{
                    api_key: "ztSBHTSPis6w9UvffHKemSPlgVxCJXGw",
                    limit:10,
                    q: search
                }
            });
            setData(results.data.data);

          } catch(error){
            setIsError(true)
            console.log(error)
          }
        
            
            
            setIsLoading(false);    

    }
    const pageSelect= (pageNumber)=>{
        setCurrentPage(pageNumber)
    }
    return(
        <div className="abc">
            {renderError()}
            <form className="input-group">
                <img src = "logo1.jpg" width="150px" height="30px"  ></img>
                <input value ={search} onChange= {handleSearchChange} type="text" placeholder="@username+tag to search within a verified channel" style={{width:"600px",padding: "12px 20px",  margin: "20px 0" , marginLeft:"200px" }} />
                <button onClick={handleSubmit} type="submit" style={{width:"90px", padding: "12px 20px",  margin: "20px 0",backgroundColor:"blue"}} > Search</button>
                </form>
                <Pagination pageSelect={pageSelect} currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length}/>
                

       
        <div className="container gifs">
            {renderGifs()}
        </div>
        </div>
    )

}
export default Giphy;



