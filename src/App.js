import {useEffect, useState} from 'react';
import {fetchPromDiff, fetchPromInfo} from './api';


function Header() {
    return(
        <div>
            <header className="hero is-success is-bold">
                <div className="hero-body">
                    <div class="container">
                        <h1 className="title is-3">
                            Atcoder Remainder
                     </h1>
                 </div>
                </div>
            </header>
        </div>
    );
}

function Nav() {
    return(
        <nav className="navbar" role="navigation" aria-label="main nabigation">
            <div className="navbar-brand">
                <input className="navbar-item" type="text" placeholder="Username"></input>
            </div>
        </nav>
    );
}

function ProblemSet(props) {

    return (
        <div>
        <div className="is-vertical-center" >       
        {props.array.map( (array, key) => {
            return  ( 
       
            <div className="card" style={{margin:'0.3em'}}>
            <div className="card-content" >
            <p class="title">
                <a href = {array.url} target="_black">
                {array.title + " diff:" + array.diff} 
                </a>
            </p>

            <footer class="card-footer">
                {/* <input  type = "button" value = "edit" className="card-footer-item" onClick ={() => props.editTask(key)}/> */}  
                <input  type = "button" value = "delete" className="card-footer-item" onClick={() => props.deleteTask(key)} />
            </footer>

            </div>
            </div>
            );
        })}
            </div>
            </div>        
        );
}

function Main() {
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

        fetchPromInfo().then((url1s) => {

            url1s.map((url1s) => {
                if(url1s.id === problem_Id_tmp) {
                    Name_tmp = url1s.title;
                    console.log(Name_tmp);
                }
            });

        }).then(() => {

            fetchPromDiff().then((url2s) => {
                diff_tmp = url2s[problem_Id_tmp]['difficulty'];
                console.log(url2s);
                console.log(diff_tmp);
            }).then(() => {
            const infoOnbect = {
                title:Name_tmp,
                url:problemUrl,
                id:problem_Id_tmp,
                contest:contest_tmp,
                diff:diff_tmp
            }
            
            console.log(infoOnbect.diff);
            tmp.unshift(infoOnbect);
            setProblems(tmp);
        });
        
    });

    }

    function deleteTask(key) {
        let tmp = problems.slice(0, problems.length);
        tmp.splice(key, 1);
        setProblems(tmp);
    }

    return(
        <main>
        <section className="section">
            <input className="input" type="text" placeholder="Problem URL" value = {problemUrl} onChange={handleChange} />
            <button className="button is-fullwidth is-success is-light" onClick={addProblem}>Add Problem</button>
            <section className="section">
                <ProblemSet array={problems} deleteTask={deleteTask}/>
            </section>
        </section>
        </main>
    );
}

function Footer() {
    return(
    <footer className="footer">
        <div className="content has-text-centered">
            <hr></hr>
                <p>2021&copy;kumastry</p>
                <p><a href = "kumastry2212@gmail.com">e-mail</a></p>
                <p><a href = "https://twitter.com/kumastry1">twitter</a></p>
        </div>
    </footer>
    );
}

function App() {
    return(
        <>
        <Header />
        <Nav />
        <Main />
        <Footer />
        </>
    );
}

export default App;