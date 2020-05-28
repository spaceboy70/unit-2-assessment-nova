const React = require('react');


class Index extends React.Component {
    render() {
        const {toDos} = this.props;

        return(
            <div>
                <h1>To do List</h1>
                {toDos == 0 ? <div>
                                     <h2>There are no To Dos yet!</h2>
                                     <h2>________________________</h2> 
                                     <form action="/" method="POST">
                                         <input type="text" placeholder="new to do item" name="item"/><span/>
                                         <input type="submit" name="" value="Add To Do"/>
                                     </form>
                                </div>
                                 :  <div>                                    <h2>________________________</h2> 
                                 <form action="/" method="POST">
                                     <input type="text" placeholder="new to do item" name="item"/><span/>
                                     <input type="submit" name="" value="Add To Do"/>
                                 </form>  
                        <ul>
                            {
                                toDos.map((list)=>{
                                    return(
                                        <li>{list.item}  --  {list.done == false ? "not done" : "done"}
                                        <span/>
                                        <form action={`/${list._id}?_method=DELETE`} method="post" ><span/>
                                            <input type="submit" value="delete"/>
                                        </form>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        </div>

                }
                
            </div>
        )
    }
}



module.exports = Index