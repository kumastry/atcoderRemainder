import {useEffect, useState} from 'react';


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
            <p class="title" id="edit">
                <a href = {`https://atcoder.jp/contests/${array.contest}/tasks/${array.problem}`} target="_black">
                {array.problem} 
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
    const [problemId, setProblemId] = useState('');
    const [problems, setProblems] = useState([])

    function handleChange(event) {
        setProblemId(event.target.value);
    }

    function addProblem(event) {
        let tmp = problems.slice(0, problems.length);
        const contestId = problemId.substr(0, problemId.length-2);
        tmp.unshift({problem:problemId, 
                           contest:contestId});
        const f = () => {
            console.log(problems.length);
            setProblems(tmp);
            console.log(problems.length);
        }                           
        
        f();
        setProblemId('');
    }

    function deleteTask(key) {
        let tmp = problems.slice(0, problems.length);
        tmp.splice(key, 1);
        setProblems(tmp);
    }

    return(
        <main>
        <section className="section">
            <input className="input" type="text" placeholder="Problem ID" value = {problemId} onChange={handleChange} />
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