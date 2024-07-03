import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@mdi/react';
import { mdiContentCopy } from '@mdi/js';
import './App.css';

function App() {
  const [length,setLength] = useState(9);
  const [hasNumber,setHasNumber] = useState(false);
  const [hasCharacter,setHasCharacter] = useState(false);
  const [password,setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(hasNumber) str += "1234567890";
    if(hasCharacter) str += "!@#$%^&*()[]{}_-=+':;><?/.";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass);
  },[length,hasNumber,hasCharacter])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  },[length,hasNumber,hasCharacter])

  return (
    <>
      <div className="main container-fluid">
        <div className="input-group password-container mt-2">
          <input type="text" className="form-control pwd" placeholder="Password" value={password} readOnly ref={passwordRef}/>
          <span className="bg-primary text-white input-group-text" id="copy" onClick={copyPasswordToClipboard}>
            <Icon path={mdiContentCopy} size={1} /> 
            copy
          </span>
        </div>
        <div className="controls my-3">
          <input type="range" value={length} className="form-range" id="lengthRange" min={6} max={40} onChange={e => setLength(e.target.value)}/>
          <label htmlFor="lengthRange" className="form-label mb-0 me-3">Length({length})</label>
          <input type="checkbox" defaultChecked={hasNumber} className="form-check-input" id="numbers" onChange={() => setHasNumber(prev => !prev)}/>
          <label className="form-check-label me-3" htmlFor="numbers">Numbers</label>
          <input type="checkbox" defaultChecked={hasCharacter} className="form-check-input" id="characters" onChange={() => setHasCharacter(prev => !prev)}/>
          <label className="form-check-label" htmlFor="characters">Characters</label>
        </div>
      </div>        
    </>
  )
}

export default App;
