import {useEffect, useState} from 'react';
import {fetchPromDiff, fetchPromInfo, fetchUesrsSub} from './api';
import {
    EmailIcon,
    TwitterIcon
} from 'react-share';

function Header() {
    return(
        <div>
            <header className="hero is-success is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-3">
                        AtCoder Reminder
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
                <p className="title">
                    <a href = {props.array.url} target="_black">

                        {props.array.contest + " " +props.array.title}<br/>
                        { "diff:" + props.array.diff + " submission:" + props.array.sub}<br/>
                    </a>
                </p>

                <p class="subtitle">
                    user:{props.array.user}
                </p>

                <footer className="card-footer">
                    {/* <input  type = "button" value = "edit" className="card-footer-item" onClick ={() => props.editTask(key)}/> */}  
                    <input  type = "button" value = "delete" className="card-footer-item" onClick={() => props.deleteTask(props.id)} />
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
                    return <Card array={array} id ={key} deleteTask={props.deleteTask} />
                })}
            </div>
        </div>        
    );
}

function Form(props) {
    const [problemUrl, setProblemUrl] = useState('');
    const [problems, setProblems] = useState([]);
    let userName_tmp = props.userName;
    console.log(userName_tmp);

    useEffect (() => {
        if(localStorage.array){ 
            const saveDate = JSON.parse(localStorage.array);
            setProblems(saveDate);
          }
        
    },[])

    useEffect (() => {
        localStorage.setItem('array', JSON.stringify(problems));
    },[problems])



    function handleChange(event) {
        setProblemUrl(event.target.value);
    }

    function addProblem(event) {
        console.log(props.userName);
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
                fetchPromDiff().then((url2) => {
                    diff_tmp = typeof(url2[problem_Id_tmp]) === 'undefined'?0:url2[problem_Id_tmp]['difficulty'];
                } ).then(() => {
                    console.log(userName_tmp);
                    fetchUesrsSub(userName_tmp).then((url3) => {
                        url3.map((url3) => {
                          
                            if(url3.problem_id === problem_Id_tmp) {
                                if(sub_tmp === 'nosub') {
                                    sub_tmp = url3.result;
                                } else if(sub_tmp !== 'AC' && url3.result === 'AC') {
                                    sub_tmp = url3.result;
                                } else if(sub_tmp !== 'AC') {
                                    if(sub_tmp !== 'WA' && url3.result === 'WA') {
                                        sub_tmp = url3.result;
                                    } else if(sub_tmp !== 'TLE' && url3.result === 'TLE') {
                                        sub_tmp = url3.result;
                                    } else {
                                        sub_tmp = url3.result;
                                    }
                                }
                            }
                        });

                    }).then(() => {
                        let userName_tmp = props.userName===''?'no user':props.userName;
                        const problem_Obj = {
                            title:Name_tmp,
                            url:problemUrl,
                            diff:diff_tmp,
                            problem_id:problem_Id_tmp,
                            contest:contest_tmp,
                            sub:sub_tmp,
                            user:userName_tmp
                        };

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

    function handlePress(event) {
        if(event.key === 'Enter') {
            addProblem();
        }
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
                <input className="input" type="text" placeholder="Problem URL" value = {problemUrl} onChange={handleChange} onKeyPress={handlePress} />
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

    useEffect(() => {
        if(localStorage.user) {
            const userName_localst = JSON.parse(localStorage.user);
            const userform_localst = document.getElementById('userform');
            userform.value = userName_localst;
            setUserName(userName_localst);
            console.log(userName_localst);
        }
    }, [])

    useEffect (() => {
        localStorage.setItem('user', JSON.stringify(userName));
    },[userName])

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main nabigation">
                <div className="navbar-brand">
                    <input className="navbar-item" id = 'userform' value = {userName} onChange={e => setUserName(e.target.value)} type="text" placeholder="Username"></input>
                </div>
            </nav>

            <Form userName = {userName}/>
        </div>
    );
}



function Footer() {
    return(
    <footer className="footer">
        <div className="content has-text-centered">
            <hr></hr>
                <p>2021&copy;kumastry</p>
              
                
     
                <div className="columns  is-centered">
                    <div className="column  is-narrow  ">
                        <a href="https://twitter.com/kumastry1" target="_black"><TwitterIcon size={48} round /></a>
                    </div>
                    
                    <div className="column  is-narrow">
                        <a href="mailto:kumastry2212@gmail.com"><EmailIcon size={48} round /></a>
                    </div>
                </div>
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