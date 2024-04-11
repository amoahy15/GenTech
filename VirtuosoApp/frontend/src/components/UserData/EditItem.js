import React, {useState, useEffect, useRef} from 'react'
import { HiMiniPaintBrush } from "react-icons/hi2";

const EditItem = (props) => {

    const child = <HiMiniPaintBrush size = {25} />;
    const[open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
      const checkIfClickedOutside = (e) => {
          if (open && ref.current && !ref.current.contains(e.target)) {
              setOpen(false);
          }
      };

      document.addEventListener("mousedown", checkIfClickedOutside);

      return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }, [open]);

  return (
    <div ref = {ref}>
   
        <a className='icon-button' onClick={() => setOpen(!open)}>
             {child}
        </a>

         {open && props.children}
    </div>
  )
}

export default EditItem
