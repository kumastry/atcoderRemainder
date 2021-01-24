import {useEffect, useState} from 'react';
import {fetchPromDiff, fetchPromInfo, fetchUesrsSub} from './api';


function Header() {
    return(
        <div>
            <header className="hero is-success is-bold">
                <div className="hero-body">
                    <div class="container">
                        <h1 className="title is-3">
                        Atcoder Reminder
                     </h1>
                 </div>
                </div>
            </header>
        </div>
    );
}


function Card(props) {
    console.log(props.array.sub);
    let background = '';
    console.log(props.array.sub);
    if(props.array.sub === 'AC') {
        background= "#c8e4cc";
    } else if (props.array.sub !== 'nosub'){
        background="#fcecbc";
    } else {
        background="#ffffff";
    }

    return(
        <div className="card" style={{ margin: "8px", backgroundColor:background,}}>
            <div className="card-content" >
                <p class="title">
                    <a href = {props.array.url} target="_black">
                        {props.array.title + " diff:" + props.array.diff + " submission:" + props.array.sub} 
                    </a>
                </p>

                <footer class="card-footer">
                    {/* <input  type = "button" value = "edit" className="card-footer-item" onClick ={() => props.editTask(key)}/> */}  
                    <input  type = "button" value = "delete" className="card-footer-item" onClick={() => props.deleteTask(props.key)} />
                </footer>
            </div>
        </div>
    );
}

function ProblemSet(props) {

    return (
        <div>
            <div className="is-vertical-center" >       
                {props.array.map( (array, key) => {
                    return <Card array={array} key ={key} deleteTask={props.deleteTask} />
                })}
            </div>
        </div>        
    );
}

function From(props) {
    const [problemUrl, setProblemUrl] = useState('');
    const [problems, setProblems] = useState([]);

    function handleChange(event) {
        setProblemUrl(event.target.value);
    }

    function addProblem(event) {
        let tmp = problems.slice(0, problems.length);

        const urlsplit = problemUrl.split('/');
        const problem_Id_tmp = urlsplit[urlsplit.length-1];
        const contest_tmp = urlsplit[urlsplit.length-3];

        let Name_tmp = '';
        let diff_tmp = 0;
        let sub_tmp = 'nosub';

        fetchPromInfo().then((url1s) => {

            url1s.map((url1s) => {
                if(url1s.id === problem_Id_tmp) {
                    Name_tmp = url1s.title;
                    console.log(Name_tmp);
                }
            });

        }).then(() => {

            if(Name_tmp !== '') {
                fetchPromDiff().then((url2s) => {
                    diff_tmp = url2s[problem_Id_tmp]['difficulty'];

                } ).then(() => {
                    fetchUesrsSub('kumastry').then((url3) => {
                        let ACflag = false;
                        url3.map((url3) => {
                            console.log(url3);
                            if(url3.problem_id === problem_Id_tmp) {
                                if(url3.result==='AC') {
                                    sub_tmp = url3.result;
                                    ACflag = true;
                                };
                            }
                        });
                        
                        if(ACflag === false) {
                            url3.map((url3) => {
                                console.log(url3);
                                if(url3.problem_id === problem_Id_tmp) {
                                    sub_tmp = url3.result;
                                }
                            });                            
                        }

                    }).then(() => {
                        const problem_Obj = {
                            title:Name_tmp,
                            url:problemUrl,
                            diff:diff_tmp,
                            problem_id:problem_Id_tmp,
                            contest:contest_tmp,
                            sub:sub_tmp
                        };

                        console.log(problem_Obj.sub);
                        console.log(sub_tmp);
                        tmp.unshift(problem_Obj);
                        setProblems(tmp);
                        
                    });
                });
            } else {
                alert("Problem Not Found");
            }
        });

        setProblemUrl('');
    }
    
    

    function deleteTask(key) {
        let tmp = problems.slice(0, problems.length);
        tmp.splice(key, 1);
        setProblems(tmp);
    }

    return(
        <div>
            <main>
            <section className="section">
                <input className="input" type="text" placeholder="Problem URL" value = {problemUrl} onChange={handleChange} />
                <button className="button is-fullwidth is-success is-light" onClick={addProblem}>Add Problem</button>
                <section className="section">
                    <ProblemSet array={problems} deleteTask={deleteTask}/>
                </section>
            </section>
            </main>
        </div>
    );
}

function Main() {
    const [userName, setUserName] = useState('');

    function KeyHandle() {

    }
    
    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main nabigation">
                <div className="navbar-brand">
                    <input className="navbar-item" id = 'userform' value = {userName} onChange={e => setUserName(e.target.value)} type="text" placeholder="Username" onKeyPress={KeyHandle}></input>
                </div>
            </nav>

            <From_hide userName = {userName}/>
        </div>
    );
}

function From_hide(props) {
    if(props.user !== null) {
        console.log("$$$$$");
        console.log(props.userName);
        return <From userName={props.userName} />
    } else {
        console.log("#####");
    }
}

function Footer() {
    return(
    <footer className="footer">
        <div className="content has-text-centered">
            <hr></hr>
                <p>2021&copy;kumastry</p>
                <p><a href = "https://twitter.com/kumastry1">twitter</a></p>
        </div>
    </footer>
    );
}

function App() {
    return(
        <>
        <Header />
        <Main />
        <Footer />
        </>
    );
}

export default App;