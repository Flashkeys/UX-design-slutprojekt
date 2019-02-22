import React from "react";
import menuIcon from "./menu.svg";
import cancel from "./cancel.svg";

const Header = (props) => {         // React component without state. Statesless compoinent of functional component there is no "this"
  return (
    <header>
      <img tabIndex="0" onClick={() => props.showMenuFunc()} onKeyDown={(e) => e.keyCode === 13 ? props.showMenuFunc() : {}} src={menuIcon} alt="meny tag" /> {/* Adds onclick to icon and onkey down */}
      <h3 className="header">Quiz time</h3>
      <div className={`menu ${props.showMenu ? 'menu--shown' : 'menu--hidden'}`}>      {/* state of the index via props. Sets class to shown or hidden depending on the value */}
        <img tabIndex="0" className='close' onClick={() => props.showMenuFunc()} onKeyDown={(e) => e.keyCode === 13 ? props.showMenuFunc() : {}} src={cancel} alt="meny tag" />
        <div>     {/* Accesxes show menu from porps. props are everyhing that we send from a parrents. */}
          <h4>Quiz Master</h4>
          <p>Become the master of quizzes</p>
        </div>
        <ul>
          <li tabIndex="0" onClick={() => {       
            props.setCurrentPage("quiz");   
            props.showMenuFunc()
          }}
            onKeyDown={(e) => {                   // same as above but triggers on the key "Enter"
              if (e.keyCode === 13) {
                props.setCurrentPage("quiz")
                props.showMenuFunc()
              }
            }}
          ><div className='circle' /> Quiz</li> 
          <li tabIndex="0" onClick={() => {       // uppdates the current page onclick and hiddes the menu
            props.setCurrentPage("stats");
            props.showMenuFunc()
          }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {           // same as above but triggers on the key "Enter" 
                props.setCurrentPage("stats") 
                props.showMenuFunc()
              }
            }}
          ><div className='circle' /> Stats</li>
          <li tabIndex="0" onClick={() => {       // uppdates the current page onclick and hiddes the menu
            props.setCurrentPage("about");      
            props.showMenuFunc()
          }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {           // same as above but triggers on the key "Enter"
                props.setCurrentPage("about")
                props.showMenuFunc()
              }
            }}
          ><div className='circle' /> About</li>
        </ul>
      </div>
    </header >
  )
}

export default Header         // exports teh component so it can be inported somwhere else. 
