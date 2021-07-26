import { useState, useRef } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);
  const ref = useRef(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Counter: {count}</button>
      <button onClick={() => ref.current++}>Ref: {ref.current}</button>
    </div>
  )
}


// const Example = () => {
//   const [screen, setScreen] = useState(null);

//   function getSize(){
//     if(window.innerWidth > 1400){
//       return 'Large'
//     }else
//     if(window.innerWidth < 768){
//       return 'Small'
//     }else{
//       return 'Medium'
//     }
//   }

//   // useEffect(() => {
//   //   setScreen(getSize());
//   // }, []);

//   useEffect(() => {
//     setScreen(getSize());
//     window.addEventListener('resize', () => setScreen(getSize()));

//     return () => window.removeEventListener('resize', setScreen(getSize()));
//   }, [screen]);

//   return (
//     <div>
//       The window size is { screen }
//     </div>
//   )
// }

// const Example = () => {
//   const [user, setUser] = useState('Farhod');

//   useEffect(() => {
//     const storedUser = window.localStorage.getItem('user');
//     if(storedUser){
//       setUser(storedUser);
//     }
//     return () => {}
//   }, []);

//   useEffect(() => {
//     window.localStorage.setItem('user', user);
//     console.log('rendered');

//     return () => {}
//   }, [user]);

//   return (
//     <div>
//       <select value={user} onChange={e => setUser(e.target.value)}>
//         <option value="Farhod">Farhod</option>
//         <option value="Akmal">Akmal</option>
//         <option value="Komil">Komil</option>
//       </select>
//     </div>
//   )
// };


// const greetings = ['Salom', 'Hello'];
// const Example = () => {

//   const [index, setIndex] = useState(0);
//   const [size, setSize] = useState(() => getSize());


//   function getSize(){
//     return {
//       width: window.innerWidth,
//       height: window.innerHeight
//     }
//   }

//   useEffect(() => {

//     const handleSize = () => {
//       setSize(getSize());
//     }

//     window.addEventListener('resize', handleSize);
//     document.title = greetings[index];
//     console.log('rendering');

//     return () => window.removeEventListener('resize', handleSize);
//   }, [index]);

//   function setTitle(){
//     setIndex(Math.floor(Math.random() * greetings.length))
//   };

//   return (
//     <div>
//       <button onClick={setTitle}>
//         Say Hello
//       </button>
//       <div>Width: {size.width}</div>
//       <div>Height: {size.height}</div>
//     </div>
//   )
// }

export default Example;